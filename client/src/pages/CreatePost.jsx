import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import { FaUpload, FaTimes, FaChess, FaEye, FaEyeSlash } from 'react-icons/fa';
import './CreatePost.css';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  const { createPost } = usePosts();
  const { user } = useAuth();
  const navigate = useNavigate();

  const categories = [
    { value: 'general', label: 'General Discussion' },
    { value: 'strategy', label: 'Chess Strategy' },
    { value: 'tournament', label: 'Tournament Updates' },
    { value: 'training', label: 'Training & Lessons' },
    { value: 'news', label: 'Chess News' },
    { value: 'analysis', label: 'Game Analysis' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        alert(`${file.name} is not a valid image type. Please use JPEG, PNG, GIF, or WebP.`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`${file.name} is too large. Please use images under 5MB.`);
        return false;
      }
      
      return true;
    });

    if (validFiles.length + images.length > 5) {
      alert('You can upload a maximum of 5 images per post.');
      return;
    }

    setImages(prev => [...prev, ...validFiles]);

    // Create preview URLs
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => [...prev, {
          url: e.target.result,
          name: file.name
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 2) {
      newErrors.content = 'Content must be at least 2 characters';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      console.log('Submitting post data:', {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        imagesCount: images.length
      });

      const postData = {
        ...formData,
        images: images
      };

      const result = await createPost(postData);
      
      if (result.success) {
        navigate(`/posts/${result.post._id}`);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('Create post error:', error);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <div className="container">
        <div className="create-post-header">
          <h1>Create New Post</h1>
          <p>Share your chess insights, strategies, or updates with the community</p>
        </div>

        {errors.general && (
          <div className="error-message">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="title">Post Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={errors.title ? 'error' : ''}
              placeholder="Enter a compelling title for your post"
              maxLength={100}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
            <small className="char-count">{formData.title.length}/100</small>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-text">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={errors.content ? 'error' : ''}
              placeholder="Write your post content here. You can include chess notation, strategies, analysis, or any chess-related content."
              rows={12}
            />
            {errors.content && <span className="error-text">{errors.content}</span>}
            <small className="char-count">{formData.content.length} characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="images">Images (Optional)</label>
            <div className="image-upload-area">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
              <div className="upload-placeholder">
                <FaUpload className="upload-icon" />
                <p>Click to upload images or drag and drop</p>
                <small>Maximum 5 images, 5MB each (JPEG, PNG, GIF, WebP)</small>
              </div>
            </div>
            
            {previewImages.length > 0 && (
              <div className="image-previews">
                <h4>Selected Images ({previewImages.length}/5)</h4>
                <div className="preview-grid">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="image-preview">
                      <img src={preview.url} alt={preview.name} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                      >
                        <FaTimes />
                      </button>
                      <span className="image-name">{preview.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/posts')}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Creating Post...
                </>
              ) : (
                <>
                  <FaChess />
                  Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost; 