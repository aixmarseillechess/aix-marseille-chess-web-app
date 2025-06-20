import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from '../utils/axios.js';
import toast from 'react-hot-toast';

// Create context
const PostContext = createContext();

// Initial state
const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  totalPosts: 0,
  currentPage: 1,
  postsPerPage: 10
};

// Action types
const POST_ACTIONS = {
  GET_POSTS: 'GET_POSTS',
  GET_POST: 'GET_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
  SET_LOADING: 'SET_LOADING',
  POST_ERROR: 'POST_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_POST: 'CLEAR_POST'
};

// Reducer
const postReducer = (state, action) => {
  switch (action.type) {
    case POST_ACTIONS.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPosts: action.payload.totalPosts,
        currentPage: action.payload.currentPage,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => 
          post._id === action.payload._id ? action.payload : post
        ),
        post: state.post && state.post._id === action.payload._id ? action.payload : state.post,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        post: state.post && state.post._id === action.payload ? null : state.post,
        loading: false,
        error: null
      };
    
    case POST_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    
    case POST_ACTIONS.POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case POST_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    
    case POST_ACTIONS.CLEAR_POST:
      return {
        ...state,
        post: null
      };
    
    default:
      return state;
  }
};

// Provider component
function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // Get all posts
  const getPosts = async (page = 1, limit = 10, search = '') => {
    dispatch({ type: POST_ACTIONS.SET_LOADING });
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      if (search) {
        params.append('search', search);
      }
      
      const res = await axios.get(`/api/posts?${params}`);
      dispatch({
        type: POST_ACTIONS.GET_POSTS,
        payload: {
          posts: res.data.posts,
          totalPosts: res.data.totalPosts,
          currentPage: page
        }
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch posts';
      dispatch({
        type: POST_ACTIONS.POST_ERROR,
        payload: message
      });
      toast.error(message);
    }
  };

  // Get single post
  const getPost = async (id) => {
    dispatch({ type: POST_ACTIONS.SET_LOADING });
    try {
      const res = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: POST_ACTIONS.GET_POST,
        payload: res.data.post
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch post';
      dispatch({
        type: POST_ACTIONS.POST_ERROR,
        payload: message
      });
      toast.error(message);
    }
  };

  // Create post
  const createPost = async (postData) => {
    dispatch({ type: POST_ACTIONS.SET_LOADING });
    try {
      console.log('PostContext: Creating post with data:', {
        title: postData.title,
        content: postData.content,
        category: postData.category,
        imagesCount: postData.images ? postData.images.length : 0
      });

      const formData = new FormData();
      
      // Add text fields
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('category', postData.category || 'general');
      
      // Add images if any
      if (postData.images && postData.images.length > 0) {
        postData.images.forEach((image, index) => {
          formData.append('images', image);
        });
      }
      
      console.log('PostContext: FormData prepared, sending request...');
      
      const res = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('PostContext: Post created successfully:', res.data);
      
      dispatch({
        type: POST_ACTIONS.CREATE_POST,
        payload: res.data.post
      });
      
      toast.success('Post created successfully!');
      return { success: true, post: res.data.post };
      
    } catch (error) {
      console.error('PostContext: Create post error:', error);
      const message = error.response?.data?.message || 'Failed to create post';
      dispatch({
        type: POST_ACTIONS.POST_ERROR,
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update post
  const updatePost = async (id, postData) => {
    dispatch({ type: POST_ACTIONS.SET_LOADING });
    try {
      const res = await axios.put(`/api/posts/${id}`, postData);
      dispatch({
        type: POST_ACTIONS.UPDATE_POST,
        payload: res.data.post
      });
      toast.success('Post updated successfully!');
      return { success: true, post: res.data.post };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update post';
      dispatch({
        type: POST_ACTIONS.POST_ERROR,
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete post
  const deletePost = async (id) => {
    dispatch({ type: POST_ACTIONS.SET_LOADING });
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({
        type: POST_ACTIONS.DELETE_POST,
        payload: id
      });
      toast.success('Post deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete post';
      dispatch({
        type: POST_ACTIONS.POST_ERROR,
        payload: message
      });
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Add comment
  const addComment = async (postId, comment) => {
    try {
      const res = await axios.post(`/api/posts/${postId}/comments`, { content: comment });
      // Refresh the post to get updated comments
      await getPost(postId);
      toast.success('Comment added successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add comment';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete comment
  const deleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
      // Refresh the post to get updated comments
      await getPost(postId);
      toast.success('Comment deleted successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete comment';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: POST_ACTIONS.CLEAR_ERROR });
  };

  // Clear current post
  const clearPost = () => {
    dispatch({ type: POST_ACTIONS.CLEAR_POST });
  };

  const value = {
    posts: state.posts,
    post: state.post,
    loading: state.loading,
    error: state.error,
    totalPosts: state.totalPosts,
    currentPage: state.currentPage,
    postsPerPage: state.postsPerPage,
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    addComment,
    deleteComment,
    clearError,
    clearPost
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

// Custom hook to use posts context
function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}

export { PostContext, PostProvider, usePosts }; 