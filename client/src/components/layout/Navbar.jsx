import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { FaChess, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaPlus } from 'react-icons/fa';
import LanguageSwitcher from '../LanguageSwitcher';
import './Navbar.css';

const Navbar = () => {
  const { t } = useTranslation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <FaChess className="logo-icon" />
            <span className="logo-text">Aix-Marseille Chess</span>
          </Link>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {t('navigation.home')}
          </Link>
          <Link 
            to="/posts" 
            className={`navbar-link ${isActive('/posts') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {t('navigation.posts')}
          </Link>
          <Link 
            to="/resources" 
            className={`navbar-link ${isActive('/resources') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            {t('navigation.resources')}
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/create-post" 
              className={`navbar-link ${isActive('/create-post') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <FaPlus className="icon-sm" />
              {t('navigation.createPost')}
            </Link>
          )}
        </div>

        <div className="navbar-auth">
          <LanguageSwitcher />
          
          {isAuthenticated ? (
            <div className="user-menu">
              <button 
                className="user-menu-button"
                onClick={toggleDropdown}
                aria-label="User menu"
              >
                {user?.profilePicture ? (
                  <img 
                    src={user.profilePicture} 
                    alt={user.name} 
                    className="user-avatar"
                  />
                ) : (
                  <FaUser className="user-icon" />
                )}
                <span className="user-name">{user?.name}</span>
              </button>
              
              {isDropdownOpen && (
                <div className="user-dropdown">
                  <Link 
                    to="/profile" 
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    <FaUser className="dropdown-icon" />
                    {t('navigation.profile')}
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <FaCog className="dropdown-icon" />
                      {t('navigation.admin')}
                    </Link>
                  )}
                  
                  <button 
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    {t('navigation.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">
                {t('navigation.login')}
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                {t('navigation.register')}
              </Link>
            </div>
          )}
        </div>

        <button 
          className="navbar-toggle"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 