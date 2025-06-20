import React from 'react';
import { Link } from 'react-router-dom';
import { FaChess, FaGithub, FaTwitter, FaInstagram, FaEnvelope, FaDiscord } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <FaChess className="footer-logo" />
              <h3>Aix-Marseille Chess</h3>
            </div>
            <p className="footer-description">
              The official chess club of Aix-Marseille University. 
              Join our community of chess enthusiasts and improve your game.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/aixmarseillechess/" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://discord.gg/pKe6MFZq" className="social-link" aria-label="Discord">
                <FaDiscord />
              </a>
              <a href="mailto:chess@univ-amu.fr" className="social-link" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/posts">Posts</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li>
                <Link to="/resources">Chess Resources</Link>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Chess Rules
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Tournament Schedule
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Training Materials
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <div className="contact-info">
              <p>
                <strong>Address:</strong><br />
                Aix-Marseille University<br />
                Campus Saint-Charles<br />
                13001 Marseille, France
              </p>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:chess@univ-amu.fr">chess@univ-amu.fr</a>
              </p>
              <p>
                <strong>Meeting Times:</strong><br />
                Tuesdays & Thursdays<br />
                18:00 - 21:00
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Aix-Marseille Chess Club. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 