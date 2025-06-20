import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../utils/axios';
import { FaUser, FaEnvelope, FaChess, FaFileAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import './UserProfile.css';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/users/${id}`);
        setUser(res.data.user);
        setPosts(res.data.posts);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message container">{error}</div>;
  }

  if (!user) {
    return <div className="container">User not found.</div>;
  }

  return (
    <div className="user-profile-page">
      <div className="container">
        <header className="user-profile-header card">
          <div className="user-profile-avatar">
            <img
              src={user.profilePicture || '/default-avatar.svg'}
              alt={`${user.firstName} ${user.lastName}`}
            />
          </div>
          <div className="user-profile-info">
            <h1>{user.firstName} {user.lastName}</h1>
            <p className="username"><FaUser /> @{user.username}</p>
            <p className="email-info"><FaEnvelope /> {user.email}</p>
            <p className="elo-info"><FaChess /> ELO: {user.chessRating || 'Unrated'}</p>
          </div>
          <div className="user-profile-bio">
            <p>{user.bio || 'This user has not written a bio yet.'}</p>
          </div>
        </header>

        <main className="user-posts-section">
          <h2><FaFileAlt /> Recent Posts</h2>
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map(post => (
                <Link to={`/posts/${post._id}`} key={post._id} className="post-card-link">
                    <article className="post-card">
                        <div className="post-content">
                            <h3 className="post-title">{post.title}</h3>
                            <p className="post-date">
                                {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                            </p>
                        </div>
                    </article>
                </Link>
              ))
            ) : (
              <p>This user has not made any posts yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile; 