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

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#intro" className="nav-link" onClick={(e) => {
            e.preventDefault();
            // Scroll to the very top, then make the intro visible only after scrolling finishes
            const el = document.getElementById('intro');
            // Start smooth scroll
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (!el) return;

            // If already at top, show intro immediately
            if ((window.scrollY || window.pageYOffset) === 0) {
              el.classList.remove('intro-hidden');
              return;
            }

            // Otherwise wait until the scroll reaches top. Use a scroll listener
            const onScroll = () => {
              if ((window.scrollY || window.pageYOffset) === 0) {
                el.classList.remove('intro-hidden');
                window.removeEventListener('scroll', onScroll);
                clearTimeout(fallback);
              }
            };

            window.addEventListener('scroll', onScroll, { passive: true });

            // Fallback: if scrollend isn't detected within 1200ms, show intro anyway
            const fallback = setTimeout(() => {
              el.classList.remove('intro-hidden');
              window.removeEventListener('scroll', onScroll);
            }, 1200);
          }}>Home</a>

          <a href="#about-section" className="nav-link" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('about-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>About</a>

          <a href="#projects-section" className="nav-link" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('projects-section');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>Projects</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
