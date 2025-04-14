import React from 'react';
import '../styles/Footer.css';
import characterImage from '../assets/pixar_3d.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-logo">
          <h2 className="logo-text">ROHITH GADE</h2>
        </div>
        
        <div className="footer-columns">
          <div className="footer-column">
            <h3 className="column-title">SOCIAL</h3>
            <ul className="footer-links">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3 className="column-title">CONTACT</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:rohithgade0911@gmail.com">rohithgade0911@gmail.com</a>
              </li>
              <li>
                <a href="tel:+17745182092">+1 (774) 518-2092</a>
              </li>
              <li className="address">
                Boston, MA 90210
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-copyright">
        <p>&copy; {new Date().getFullYear()} Rohith Gade. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 