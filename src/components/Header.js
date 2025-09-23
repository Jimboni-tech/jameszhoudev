import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleHome = (e) => {
    e.preventDefault();
    const el = document.getElementById('intro');

    if (location.pathname !== '/') {
      navigate('/');
      // after navigation, scroll to top and reveal intro
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (el) el.classList.remove('intro-hidden');
      }, 150);
      return;
    }

    // already on home: existing behavior
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!el) return;

    if ((window.scrollY || window.pageYOffset) === 0) {
      el.classList.remove('intro-hidden');
      return;
    }

    const onScroll = () => {
      if ((window.scrollY || window.pageYOffset) === 0) {
        el.classList.remove('intro-hidden');
        window.removeEventListener('scroll', onScroll);
        clearTimeout(fallback);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    const fallback = setTimeout(() => {
      el.classList.remove('intro-hidden');
      window.removeEventListener('scroll', onScroll);
    }, 1200);
  };

  const handleNavTo = (id) => (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToId(id), 150);
    } else {
      scrollToId(id);
    }
  };

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
        <MobileNav handleHome={handleHome} handleNavTo={handleNavTo} />
      </div>
    </header>
  );
};

const MobileNav = ({ handleHome, handleNavTo }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((v) => !v);

  return (
    <>
      <button
        className="mobile-menu-button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={toggle}
      >
        <span className={`hamburger ${open ? 'is-open' : ''}`} />
      </button>

      <nav className={`site-nav ${open ? 'open' : ''}`} aria-label="Main navigation">
        <a href="#intro" className="nav-link" onClick={(e) => { setTimeout(() => setOpen(false), 0); handleHome(e); }}>Home</a>
        <a href="#about-section" className="nav-link" onClick={(e) => { setTimeout(() => setOpen(false), 0); handleNavTo('about-section')(e); }}>About</a>
        <a href="#projects-section" className="nav-link" onClick={(e) => { setTimeout(() => setOpen(false), 0); handleNavTo('projects-section')(e); }}>Projects</a>
        <a href="/blog" className="nav-link" onClick={() => setOpen(false)}>Blog</a>
      </nav>
    </>
  );
};

export default Header;
