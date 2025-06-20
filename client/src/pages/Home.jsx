import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../contexts/PostContext';
import { FaChess, FaUsers, FaTrophy, FaCalendar, FaArrowRight, FaEye, FaComment, FaGraduationCap, FaBook } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
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
    { icon: FaUsers, value: '150+', label: t('home.stats.activeMembers') },
    { icon: FaTrophy, value: '25+', label: t('home.stats.tournamentsWon') },
    { icon: FaCalendar, value: '10+', label: t('home.stats.yearsOfExcellence') },
    { icon: FaChess, value: '1000+', label: t('home.stats.gamesPlayed') }
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
                {t('home.hero.title')} <span className="highlight">{t('home.hero.highlight')}</span>
              </h1>
              <p className="hero-subtitle">
                {t('home.hero.subtitle')}
              </p>
              <div className="hero-buttons">
                {isAuthenticated ? (
                  <Link to="/create-post" className="btn btn-primary btn-lg">
                    {t('navigation.createPost')}
                  </Link>
                ) : (
                  <Link to="/register" className="btn btn-primary btn-lg">
                    {t('home.hero.joinClub')}
                  </Link>
                )}
                <Link to="/posts" className="btn btn-secondary btn-lg">
                  {t('home.hero.readPosts')}
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
            <h2>{t('home.featuredPosts.title')}</h2>
            <Link to="/posts" className="view-all-link">
              {t('home.featuredPosts.viewAll')} <FaArrowRight />
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
                            {post.author ? `${post.author.firstName} ${post.author.lastName}` : t('common.anonymous')}
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
              <h3>{t('home.featuredPosts.noPosts')}</h3>
              <p>{t('home.featuredPosts.noPostsMessage')}</p>
              {isAuthenticated && (
                <Link to="/create-post" className="btn btn-primary">
                  {t('home.featuredPosts.createFirstPost')}
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
            <h2>{t('home.cta.title')}</h2>
            <p>
              {t('home.cta.subtitle')}
            </p>
            <div className="cta-buttons">
              {!isAuthenticated ? (
                <>
                  <Link to="/register" className="btn btn-primary btn-lg">
                    {t('home.cta.registerNow')}
                  </Link>
                  <Link to="/login" className="btn btn-secondary btn-lg">
                    {t('navigation.login')}
                  </Link>
                </>
              ) : (
                <Link to="/create-post" className="btn btn-primary btn-lg">
                  {t('home.cta.createFirstPost')}
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
            <h2>{t('home.resources.title')}</h2>
            <p>{t('home.resources.subtitle')}</p>
          </div>
          <div className="resources-grid">
            <div className="resource-card">
              <FaChess className="resource-icon" />
              <h3>{t('home.resources.chessRules.title')}</h3>
              <p>{t('home.resources.chessRules.description')}</p>
              <Link to="/resources" className="btn btn-secondary">
                {t('home.resources.chessRules.button')}
              </Link>
            </div>
            <div className="resource-card">
              <FaCalendar className="resource-icon" />
              <h3>{t('home.resources.tournamentSchedule.title')}</h3>
              <p>{t('home.resources.tournamentSchedule.description')}</p>
              <Link to="/resources" className="btn btn-secondary">
                {t('home.resources.tournamentSchedule.button')}
              </Link>
            </div>
            <div className="resource-card">
              <FaGraduationCap className="resource-icon" />
              <h3>{t('home.resources.trainingMaterials.title')}</h3>
              <p>{t('home.resources.trainingMaterials.description')}</p>
              <Link to="/resources" className="btn btn-secondary">
                {t('home.resources.trainingMaterials.button')}
              </Link>
            </div>
            <div className="resource-card">
              <FaBook className="resource-icon" />
              <h3>{t('home.resources.chessLiterature.title')}</h3>
              <p>{t('home.resources.chessLiterature.description')}</p>
              <Link to="/resources" className="btn btn-secondary">
                {t('home.resources.chessLiterature.button')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 