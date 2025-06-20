import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../contexts/PostContext';
import { useAuth } from '../contexts/AuthContext';
import { FaCalendarAlt, FaUser, FaPaperPlane, FaTimes, FaEdit } from 'react-icons/fa';
import { format } from 'date-fns';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { post, loading, getPost, addComment, deleteComment, deletePost } = usePosts();
  const { user, isAuthenticated } = useAuth();
  const [comment, setComment] = useState('');

  useEffect(() => {
    getPost(id);
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await addComment(id, comment);
      setComment('');
    }
  };

  const handlePostDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
        const result = await deletePost(id);
        if (result.success) {
            navigate('/posts');
        }
    }
  };

  if (loading || !post) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail-card">
          {post.images && post.images.length > 0 && (
            <div className="post-detail-image">
              <img src={post.images[0].url} alt={post.title} />
            </div>
          )}
          <header className="post-detail-header">
            <h1 className="post-detail-title">{post.title}</h1>
            <div className="post-detail-meta">
              <Link to={`/users/${post.author._id}`} className="author-info">
                <img 
                  src={post.author.profilePicture || '/default-avatar.svg'} 
                  alt={post.author.firstName} 
                  className="author-avatar"
                />
                <span>{post.author.firstName} {post.author.lastName}</span>
              </Link>
              <span className="post-date">
                <FaCalendarAlt />
                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
              </span>
            </div>
            {user && (user._id === post.author._id || user.role === 'admin') && (
                <div className="post-actions">
                    <button onClick={handlePostDelete} className="btn btn-danger">
                        <FaTimes /> Delete Post
                    </button>
                </div>
            )}
          </header>
          <div
            className="post-detail-content"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </article>

        <section className="comments-section card">
          <h2>{post.commentCount} Answers</h2>
          {isAuthenticated ? (
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your answer..."
                rows="4"
              />
              <button type="submit" className="btn btn-primary">
                <FaPaperPlane /> Post Answer
              </button>
            </form>
          ) : (
            <p className="login-prompt">
              <Link to="/login">Log in</Link> to post an answer.
            </p>
          )}
          <div className="comments-list">
            {post.comments.map((c) => (
              <div key={c._id} className="comment-card">
                <div className="comment-author">
                  <Link to={`/users/${c.user._id}`} className="comment-author-link">
                    <img 
                      src={c.user.profilePicture || '/default-avatar.svg'} 
                      alt={c.user.firstName}
                      className="comment-avatar"
                    />
                    <div className="comment-author-info">
                      <strong>{c.user.firstName} {c.user.lastName}</strong>
                      <span className="comment-date">
                        {format(new Date(c.createdAt), 'PPpp')}
                      </span>
                    </div>
                  </Link>
                </div>
                <p className="comment-content">{c.content}</p>
                {user?._id === c.user._id && (
                    <button onClick={() => deleteComment(post._id, c._id)} className="delete-comment-btn">
                        <FaTimes />
                    </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail; 