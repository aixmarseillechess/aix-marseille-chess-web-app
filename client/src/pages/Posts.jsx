import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import { FaSearch, FaEye, FaHeart, FaComment, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import './Posts.css';

const Posts = () => {
  const { posts, loading, totalPosts, currentPage, getPosts, deletePost } = usePosts();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPageState, setCurrentPageState] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    getPosts(currentPageState, postsPerPage, searchTerm);
  }, [currentPageState, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPageState(1);
    getPosts(1, postsPerPage, searchTerm);
  };

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
    }
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="posts-page">
      <div className="container">
        {/* Header */}
        <div className="posts-header">
          <h1>Chess Club Posts</h1>
          <p>Discover strategies, tournament updates, and chess insights from our community</p>
        </div>

        {/* Search and Actions */}
        <div className="posts-actions">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-group">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </form>

          {isAuthenticated && (
            <Link to="/create-post" className="btn btn-primary">
              Create Post
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="posts-grid">
              {posts.map((post) => (
                <article key={post._id} className="post-card" onClick={() => handleCardClick(post._id)}>
                  {post.images && post.images.length > 0 && (
                    <div className="post-image">
                      <img src={post.images[0].url} alt={post.title} />
                    </div>
                  )}
                  <div className="post-content">
                    <div className="post-meta">
                      <Link 
                        to={`/users/${post.author?._id}`} 
                        className="author-link"
                        onClick={handleActionClick}
                      >
                        <img 
                          src={post.author?.profilePicture || '/default-avatar.svg'} 
                          alt={post.author?.firstName}
                          className="author-avatar"
                        />
                        <span className="post-author">
                          {post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Anonymous'}
                        </span>
                      </Link>
                      <span className="post-date">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <h3 className="post-title">
                      {post.title}
                    </h3>
                    <p className="post-excerpt">
                      {post.content.length > 120 
                        ? `${post.content.substring(0, 120)}...` 
                        : post.content
                      }
                    </p>
                    <div className="post-stats">
                      <span className="post-stat">
                        <FaEye /> {post.viewCount || 0}
                      </span>
                      <span className="post-stat">
                        <FaComment /> {post.commentCount || 0}
                      </span>
                    </div>
                  </div>
                  {user && (user._id === post.author?._id || user.role === 'admin') && (
                    <button 
                        className="post-card-delete-btn"
                        onClick={(e) => handleDelete(e, post._id)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="delete-icon"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                  )}
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPageState - 1)}
                  disabled={currentPageState === 1}
                  className="pagination-btn"
                >
                  <FaChevronLeft />
                  Previous
                </button>

                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`pagination-number ${currentPageState === page ? 'active' : ''}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPageState + 1)}
                  disabled={currentPageState === totalPages}
                  className="pagination-btn"
                >
                  Next
                  <FaChevronRight />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="no-posts">
            <div className="no-posts-content">
              <h3>No posts found</h3>
              <p>
                {searchTerm 
                  ? `No posts match "${searchTerm}". Try a different search term.`
                  : 'No posts have been created yet.'
                }
              </p>
              {isAuthenticated && (
                <Link to="/create-post" className="btn btn-primary">
                  Create First Post
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts; 