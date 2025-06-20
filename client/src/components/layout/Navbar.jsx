import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaChess, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaPlus } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
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
            Home
          </Link>
          <Link 
            to="/posts" 
            className={`navbar-link ${isActive('/posts') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Posts
          </Link>
          <Link 
            to="/resources" 
            className={`navbar-link ${isActive('/resources') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Resources
          </Link>
          
          {isAuthenticated && (
            <Link 
              to="/create-post" 
              className={`navbar-link ${isActive('/create-post') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <FaPlus className="icon-sm" />
              Create Post
            </Link>
          )}
        </div>

        <div className="navbar-auth">
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
                    Profile
                  </Link>
                  
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <FaCog className="dropdown-icon" />
                      Admin
                    </Link>
                  )}
                  
                  <button 
                    className="dropdown-item logout-button"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="dropdown-icon" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
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