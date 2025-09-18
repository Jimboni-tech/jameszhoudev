import React, { useEffect, useState } from 'react';

const Intro = () => {
  const subtitlePhrases = ['Computer Science Student', 'Aspiring Software Engineer'];
  const [subtitleText, setSubtitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // hide intro on small scroll (keeps behavior local to Intro)
  useEffect(() => {
    const onScroll = () => {
      const el = document.querySelector('.intro-section');
      if (!el) return;
      const y = window.scrollY || window.pageYOffset;
      if (y > 20) el.classList.add('intro-hidden');
      else el.classList.remove('intro-hidden');
    };

    // Run once on mount to hide intro if the page is already scrolled
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // typing effect
  useEffect(() => {
    const i = loopNum % subtitlePhrases.length;
    const fullText = subtitlePhrases[i];

    const handle = setTimeout(() => {
      setSubtitleText(prev => {
        const updated = isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1);
        return updated;
      });

      if (!isDeleting && subtitleText === fullText) {
        setTimeout(() => setIsDeleting(true), 1200);
      } else if (isDeleting && subtitleText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);

    return () => clearTimeout(handle);
  }, [subtitleText, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="intro-section">
      <h1 className="title">James Zhou</h1>
      <p className="subtitle" style={{ minHeight: '1.5em' }}>
        {subtitleText}
        <span className="blinking-cursor" />
      </p>
    </div>
  );
};

export default Intro;
