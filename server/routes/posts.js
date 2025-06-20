import express from 'express';
import { body, validationResult, query } from 'express-validator';
import multer from 'multer';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { protect, admin, optionalAuth } from '../middleware/auth.js';
import { uploadImage, deleteImage } from '../config/cloudinary.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Get all posts (public)
router.get('/', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50'),
  query('category').optional().isIn(['tournament', 'training', 'news', 'analysis', 'general']),
  query('search').optional().trim()
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = { isPublished: true };
    
    if (req.query.category) {
      query.category = req.query.category;
    }

    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Get posts with author information
    const posts = await Post.find(query)
      .populate('author', 'firstName lastName profilePicture')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Post.countDocuments(query);

    // Track unique views and update posts
    if (req.user) {
        const userId = req.user._id;
        const postIdsToUpdate = [];

        // Manually update the posts object and collect IDs for DB update
        posts.forEach(post => {
            const hasViewed = post.viewedBy.some(viewerId => viewerId.equals(userId));

            if (!hasViewed) {
                postIdsToUpdate.push(post._id);
                post.viewedBy.push(userId); // Update in-memory object
            }
        });

        // Update the database for the posts that were newly viewed
        if (postIdsToUpdate.length > 0) {
            await Post.updateMany(
                { _id: { $in: postIdsToUpdate } },
                { $addToSet: { viewedBy: userId } }
            );
        }
    }

    // Manually calculate virtuals since we are using .lean()
    posts.forEach(post => {
        post.viewCount = post.viewedBy.length;
        post.commentCount = post.comments.length;
    });

    res.json({
      posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalPosts: total,
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get single post (public)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName profilePicture bio')
      .populate('comments.user', 'firstName lastName profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (!post.isPublished) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Add user to viewedBy list if they haven't viewed it before
    if (req.user && !post.viewedBy.includes(req.user._id)) {
        post.viewedBy.push(req.user._id);
        await post.save();
    }

    res.json({ post });

  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Create new post (authenticated users only)
router.post('/', protect, upload.array('images', 5), [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title is required and must be less than 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content is required and must be less than 10000 characters'),
  body('category')
    .optional()
    .isIn(['general', 'strategy', 'tournament', 'training', 'news', 'analysis'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each tag must be between 1 and 30 characters')
], async (req, res) => {
  try {
    console.log('Post creation request received:', {
      body: req.body,
      files: req.files ? req.files.length : 0,
      user: req.user._id
    });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content, category, tags } = req.body;

    // Handle image uploads if any
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      // Check if Cloudinary is configured
      if (!process.env.CLOUDINARY_API_KEY) {
        console.log('Cloudinary not configured, skipping image upload');
        // Continue without images
      } else {
        try {
          uploadedImages = await Promise.all(
            req.files.map(async (file) => {
              const uploadResult = await uploadImage(
                file.buffer, 
                'aix-marseille-chess/posts',
                file.mimetype
              );
              return {
                url: uploadResult.url,
                publicId: uploadResult.publicId,
                caption: ''
              };
            })
          );
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          return res.status(400).json({ 
            message: 'Failed to upload images. Please try again.' 
          });
        }
      }
    }

    // Create new post
    const post = new Post({
      title,
      content,
      category: category || 'general',
      tags: tags || [],
      images: uploadedImages,
      author: req.user._id
    });

    await post.save();

    // Populate author information
    await post.populate('author', 'firstName lastName profilePicture');

    res.status(201).json({
      message: 'Post created successfully',
      post
    });

  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Update post (author or admin only)
router.put('/:id', protect, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Content must be less than 10000 characters'),
  body('category')
    .optional()
    .isIn(['tournament', 'training', 'news', 'analysis', 'general'])
    .withMessage('Invalid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update fields
    const { title, content, category, tags, isPublished } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (isPublished !== undefined) post.isPublished = isPublished;

    await post.save();
    await post.populate('author', 'firstName lastName profilePicture');

    res.json({
      message: 'Post updated successfully',
      post
    });

  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Failed to update post' });
  }
});

// Delete post (author or admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete images from Cloudinary
    if (post.images && post.images.length > 0) {
      await Promise.all(
        post.images.map(image => deleteImage(image.publicId))
      );
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Failed to delete post' });
  }
});

// Add comment to post
router.post('/:id/comments', protect, [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.addComment(req.user._id, req.body.content);
    await post.populate('comments.user', 'firstName lastName profilePicture');

    const newComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });

  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// Delete comment from post
router.delete('/:id/comments/:commentId', protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user is comment author or admin
    if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await post.removeComment(req.params.commentId);

    res.json({ message: 'Comment deleted successfully' });

  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

// Get featured posts
router.get('/featured/featured', async (req, res) => {
  try {
    const featuredPosts = await Post.find({ 
      featured: true, 
      isPublished: true 
    })
    .populate('author', 'firstName lastName profilePicture')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

    res.json({ posts: featuredPosts });

  } catch (error) {
    console.error('Get featured posts error:', error);
    res.status(500).json({ message: 'Failed to fetch featured posts' });
  }
});

// @route   PUT /api/posts/:id/pin
// @desc    Pin/unpin a post (admin only)
// @access  Private (admin)
router.put('/:id/pin', protect, admin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.isPinned = !post.isPinned;
    await post.save();
    
    res.json({
      message: post.isPinned ? 'Post pinned' : 'Post unpinned',
      isPinned: post.isPinned
    });
    
  } catch (error) {
    console.error('Pin post error:', error.message);
    res.status(500).json({ message: 'Failed to pin/unpin post' });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size is 5MB.' 
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        message: 'Too many files. Maximum is 5 files.' 
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        message: 'Unexpected file field.' 
      });
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return res.status(400).json({ 
      message: 'Only image files are allowed.' 
    });
  }
  
  next(error);
});

export default router; 