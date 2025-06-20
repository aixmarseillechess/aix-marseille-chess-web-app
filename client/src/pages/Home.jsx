import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostContext';
import { FaChess, FaUsers, FaTrophy, FaCalendar, FaArrowRight, FaEye, FaComment, FaGraduationCap, FaBook } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import './Home.css';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const { posts, getPosts } = usePosts();
  const navigate = useNavigate();

  useEffect(() => {
    // Get featured posts (latest 3 posts)
    getPosts(1, 3);
  }, []);

  const handleCardClick = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleAuthorClick = (e) => {
      e.stopPropagation();
  };

  const stats = [
    { icon: FaUsers, value: '150+', label: 'Active Members' },
    { icon: FaTrophy, value: '25+', label: 'Tournaments Won' },
    { icon: FaCalendar, value: '10+', label: 'Years of Excellence' },
    { icon: FaChess, value: '1000+', label: 'Games Played' }
  ];

  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to <span className="highlight">Aix-Marseille Chess</span>
              </h1>
              <p className="hero-subtitle">
                The official chess club of Aix-Marseille University. 
                Join our community of chess enthusiasts, improve your game, 
                and participate in exciting tournaments.
              </p>
              <div className="hero-buttons">
                {isAuthenticated ? (
                  <Link to="/create-post" className="btn btn-primary btn-lg">
                    Create Post
                  </Link>
                ) : (
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Join Our Club
                  </Link>
                )}
                <Link to="/posts" className="btn btn-secondary btn-lg">
                  Read Posts
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="chess-board">
                <FaChess className="hero-chess-icon" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <stat.icon />
                </div>
                <div className="stat-content">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="featured-posts">
        <div className="container">
          <div className="section-header">
            <h2>Latest Posts</h2>
            <Link to="/posts" className="view-all-link">
              View All Posts <FaArrowRight />
            </Link>
          </div>
          
          {featuredPosts.length > 0 ? (
            <div className="posts-grid">
              {featuredPosts.map((post) => (
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
                        onClick={handleAuthorClick}
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
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
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
                </article>
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <FaChess className="no-posts-icon" />
              <h3>No posts yet</h3>
              <p>Be the first to share something with the chess community!</p>
              {isAuthenticated && (
                <Link to="/create-post" className="btn btn-primary">
                  Create First Post
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join the Chess Community?</h2>
            <p>
              Connect with fellow chess enthusiasts, share strategies, 
              and participate in exciting tournaments.
            </p>
            <div className="cta-buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    Register Now
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    Login
                  </Link>
                </>
              ) : (
                <Link to="/create-post" className="btn btn-primary btn-lg">
                  Create Your First Post
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="resources-preview">
        <div className="container">
          <div className="section-header">
            <h2>Chess Resources</h2>
            <p>Improve your game with our comprehensive chess resources</p>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <FaChess className="resource-icon" />
              <h3>Chess Rules</h3>
              <p>Learn the fundamentals and advanced rules of chess</p>
              <Link to="/resources" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="resource-card">
              <FaCalendar className="resource-icon" />
              <h3>Tournament Schedule</h3>
              <p>Stay updated with upcoming tournaments and events</p>
              <Link to="/resources" className="btn btn-secondary">
                View Schedule
              </Link>
            </div>
            <div className="resource-card">
              <FaGraduationCap className="resource-icon" />
              <h3>Training Materials</h3>
              <p>Access study materials and training resources</p>
              <Link to="/resources" className="btn btn-secondary">
                Get Materials
              </Link>
            </div>
            <div className="resource-card">
              <FaBook className="resource-icon" />
              <h3>Chess Literature</h3>
              <p>Discover classic and modern chess books</p>
              <Link to="/resources" className="btn btn-secondary">
                Browse Books
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 