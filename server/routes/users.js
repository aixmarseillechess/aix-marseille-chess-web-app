import express from 'express';
import { query, validationResult } from 'express-validator';
import User from '../models/User.js';
import Post from '../models/Post.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private (admin)
router.get('/', protect, admin, async (req, res) => {
  try {
    const { page = 1, limit = 20, search } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await User.countDocuments(query);
    
    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
    
  } catch (error) {
    console.error('Get users error:', error.message);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// @route   GET /api/users/:id
// @desc    Get user profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get user's posts
    const posts = await Post.find({ 
      author: req.params.id, 
      isPublished: true 
    })
    .select('title content category createdAt viewedBy comments')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
    
    // Add virtual fields manually since we're using .lean()
    const postsWithVirtuals = posts.map(post => ({
      ...post,
      viewCount: post.viewedBy ? post.viewedBy.length : 0,
      commentCount: post.comments ? post.comments.length : 0
    }));
    
    res.json({
      user,
      posts: postsWithVirtuals
    });
    
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// @route   PUT /api/users/:id
// @desc    Update user (admin or self)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if user is updating themselves or is admin
    if (user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }
    
    const { firstName, lastName, bio, profilePicture, chessRating, role } = req.body;
    
    const updateData = {
      firstName,
      lastName,
      bio,
      profilePicture,
      chessRating
    };
    
    // Only admins can change roles
    if (req.user.role === 'admin' && role) {
      updateData.role = role;
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');
    
    res.json({
      message: 'User updated successfully',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('Update user error:', error.message);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Failed to update user' });
  }
});

// @route   PUT /api/users/:id/status
// @desc    Toggle user active status (admin only)
// @access  Private (admin)
router.put('/:id/status', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent admin from deactivating themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot deactivate your own account' });
    }
    
    user.isActive = !user.isActive;
    await user.save();
    
    res.json({
      message: user.isActive ? 'User activated' : 'User deactivated',
      isActive: user.isActive
    });
    
  } catch (error) {
    console.error('Toggle user status error:', error.message);
    res.status(500).json({ message: 'Failed to toggle user status' });
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete user (admin only)
// @access  Private (admin)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }
    
    // Delete user's posts
    await Post.deleteMany({ author: req.params.id });
    
    // Delete user
    await User.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'User deleted successfully' });
    
  } catch (error) {
    console.error('Delete user error:', error.message);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});

// @route   GET /api/users/:id/posts
// @desc    Get user's posts
// @access  Public
router.get('/:id/posts', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const user = await User.findById(req.params.id);
    
    if (!user || !user.isActive) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const posts = await Post.find({ 
      author: req.params.id, 
      isPublished: true 
    })
    .populate('author', 'username firstName lastName profilePicture')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    
    const total = await Post.countDocuments({ 
      author: req.params.id, 
      isPublished: true 
    });
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
    
  } catch (error) {
    console.error('Get user posts error:', error.message);
    res.status(500).json({ message: 'Failed to fetch user posts' });
  }
});

export default router; 