import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="nature-footer" role="contentinfo">
      <svg
        viewBox="0 0 1440 240"
        width="100%"
        height="240"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mountainGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#63d68b" />
            <stop offset="100%" stopColor="#1f8f4a" />
          </linearGradient>
        </defs>

        {/* Lush foreground ridge */}
        <path d="M0,180 C200,80 400,220 720,160 C1040,100 1240,200 1440,150 V240 H0 Z" fill="#2aa86a" />

        {/* Mid mountain band */}
        <path d="M0,200 C300,110 600,230 900,140 C1200,50 1440,160 1440,160 V240 H0 Z" fill="url(#mountainGradient)" opacity="0.95" />

        {/* Distant darker ridge */}
        <path d="M0,220 C480,140 960,240 1440,180 V240 H0 Z" fill="#1f8f4a" opacity="0.85" />
      </svg>

      <div className="footer-text">
        <div>James Zhou © {year}</div>
      </div>
    </footer>
  );
};

export default Footer;
