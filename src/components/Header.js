import React from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="social-icons">
          <a
            href="https://github.com/Jimboni-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jimmy-z-2007xz/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://drive.google.com/file/d/1sFiD0-wD7oy2i32mDssojGlQD5eC522n/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Download Resume"
          >
            <FaFileAlt />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
