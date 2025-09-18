import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import GridBackground from './components/GridBackground';
import Intro from './components/Intro';
import About from './components/About';
import ProjectsSection from './components/ProjectsSection';
import Header from './components/Header';
import Footer from './components/Footer';

// Main App component
const App = () => {
  const [subtitleText, setSubtitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(180);

  // State for fade-in animations
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const aboutRef = useRef(null);
  const [introHidden, setIntroHidden] = useState(false);
  const projectsRef = useRef(null);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);

  // The phrases for the subtitle to be typed out
  const subtitlePhrases = [
    'Computer Science Student',
    'Aspiring Software Engineer',
  ];

  // The core typing logic for the subtitle
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % subtitlePhrases.length;
      const fullText = subtitlePhrases[i];

      setSubtitleText(
        isDeleting
          ? fullText.substring(0, subtitleText.length - 1)
          : fullText.substring(0, subtitleText.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && subtitleText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && subtitleText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [subtitleText, isDeleting, loopNum, typingSpeed, subtitlePhrases]);

  // Logic for fade-in-on-scroll animation
  useEffect(() => {
    if (!aboutRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
  }, [aboutRef]);

  // Hide intro when scrolling down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIntroHidden(y > 20); // hide after small scroll threshold
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observe Projects header to fade it in when it scrolls into view
  useEffect(() => {
    if (!projectsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsProjectsVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(projectsRef.current);
    return () => obs.disconnect();
  }, [projectsRef]);

  const projects = [
    {
      title: "Commit4Good",
      description: "I developed a full-stack volunteer platform during a 36-hour hackathon that enables nonprofits to connect with skilled volunteers by utilizing REST APIs and a Mongoose-based user profiling system. The platform was designed with a dual-impact model—lowering barriers for new developers to gain real-world experience while providing nonprofits with affordable technical support. Upon completing this project after a grueling all-nighter, I pitched the impact of this project to an 8-judge panel.",
      link: "https://github.com/Jimboni-tech/hophacks",
      tech: "React, Node.js, Express, Vite, MongoDB",
      image: "/commit4good.png",
    },
    {
      title: "Entropy-Based Hybrid Retrieval",
      description: "I helped design a hybrid retrieval system that combines sparse (BM25) and dense (FAISS) methods, enhanced with normalized Shannon entropy for adaptive reweighting. The system outperformed baselines on TriviaQA (+7.6% LLM-as-a-Judge) and HotPotQA (+0.5%) and contributed to a paper accepted at ICML VecDB.",
      link: "https://openreview.net/forum?id=bwGaZOVo0c",
      tech: "Python, FAISS, BM25, PyTorch",
      image: "/entropy.png",
    },
    {
      title: "Reddit RAG Pipeline",
      description: "I built a Retrieval-Augmented Generation (RAG) system using Reddit data, improving query relevance through semantic similarity ranking and token-aware truncation for LLaMA-3 inference. The system deployed a 4-bit quantized LLaMA-3 model via the Ollama API, enabling grounded responses across 50K+ Reddit posts.",
      link: "https://github.com/Jimboni-tech/reddit-rag",
      tech: "Python, PyTorch, Hugging Face, Ollama, Pandas",
      image: "/redditrag.png"
    },
    {
      title: "OnyxScript",
      description: "I developed a creator platform that generates AI-assisted video scripts with integrated mindmap editing and teleprompter features. By implementing an AI autofill function, the platform reduced average script creation time by 50% and was tested by over 50 beta users.",
      link: "https://www.onyxscript.com/",
      tech: "React, Node.js, Express, MongoDB",
      image: "/onyxscript.png",
    },
    {
      title: "Reddit Sentiment vs. Bitcoin Volatility",
      description: "I analyzed 35K+ Reddit posts alongside Bitcoin market data using sentiment analysis and statistical testing. The study found evidence that Bitcoin volatility Granger-causes Reddit sentiment with ~95% confidence.",
      link: "https://github.com/Jimboni-tech/The-Evolving-Relationship-Between-Public-Sentiment-and-Bitcoin-Market-Volatility",
      tech: "Python, Pandas, NumPy, NLTK",
      image: "/sentiment.png",
    },
    {
      title: "School Sign-In/Sign-Out System",
      description: "After realizing how annoying it was to have to walk all the way to the main office at my high school, I built a digital sign-in/sign-out platform to streamline student entry and exit tracking. After presenting this project to my school officials, it was successfully integrated into the school website's workflow, and it improved accessibility while reducing manual record-keeping across the school ecosystem.",
      link: "https://github.com/Jimboni-tech/popcs-siso",
      tech: "React, JavaScript, CSS",
      image: "/siso.png",
    }
  ];

  return (
    <div className="container">
      <GridBackground />
      
      <Header />

      <Intro />
      <About />
      <ProjectsSection projects={projects} />
  <Footer />
      
      <style>{`
        :root {
          --bg: #f6fbf6; /* light background */
          --panel: #ffffff; /* card / section background */
          --text: #805428ff; /* UPDATED: Tree Brown for main text */
          --muted: #836953; /* UPDATED: Lighter brown for muted text */
          --accent: #2aa86a; /* green accent */
          --accent-600: #1f8f4a;
          --card: rgba(42,168,106,0.06);
        }

  /* General styles */
  html { scroll-behavior: smooth; scroll-padding-top: 100px; }
  body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            background-color: var(--bg);
            color: var(--text); /* Default text color is now brown */
        }

        /* Container styles */
        .container {
          display: flex;
          flex-direction: column;
          align-items: stretch; /* allow children to span full width */
          justify-content: flex-start;
          min-height: 100vh;
          padding-top: 100vh; /* push all content below the first viewport */
          font-family: monospace;
          text-align: center;
          position: relative;
          z-index: 1;
          background: transparent;
          width: 100%;
        }

        /* About section styles */
        .about-section {
          background-color: transparent; /* removed panel background */
        }

        /* Projects section styles */
        .projects-section {
          background-color: transparent !important;
        }

        /* Intro section styles */
        .intro-section {
          height: 60vh; /* visible header area */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 0; /* Remove default padding */
          padding-bottom: 0;
          margin-bottom: 0; /* Removed margin */
          position: fixed; /* keep visible on initial load */
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          background: linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.0));
          color: var(--text);
        }

        /* Header (social icons) - fixed and always visible */
        .site-header {
          position: fixed;
          top: 0; /* always at top */
          left: 0;
          right: 0;
          z-index: 90;
          background: rgba(255,255,255,0.06); /* near-transparent background for legibility */
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-bottom: 1px solid rgba(10, 30, 20, 0.04);
        }

        .site-header .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 1.25rem;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .intro-section.intro-hidden {
          opacity: 0;
          transform: translateY(-30px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }

        /* Title styles */
        .title {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 800; /* font-extrabold */
          margin-bottom: 1rem; /* mb-4 */
          text-shadow: 0 2px 0 rgba(255,255,255,0.6);
          color: #54371aff;
        }

        @media (min-width: 640px) {
          .title {
            font-size: 4rem; /* sm:text-6xl */
          }
        }

        /* Blinking cursor styles */
        .blinking-cursor {
          content: '';
          display: inline-block;
          height: 1.2em; 
          width: 2px;
          background-color: var(--text);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        /* Subtitle styles */
        .subtitle {
          font-size: 1.125rem; /* text-lg */
          font-weight: 300; /* font-light */
          color: var(--accent); /* muted text */
          position: relative;
        }

        @media (min-width: 640px) {
          .subtitle {
            font-size: 1.25rem; /* sm:text-xl */
          }
        }

        /* Keyframes for blinking cursor */
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Updated About section styles */
        .about-section {
          margin-top: 200px;
          width: 100%; /* Changed from 100vw to prevent overflow */
          min-height: 60vh;
          padding: 0;
          margin-bottom: 10rem; /* increased gap below About */
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          will-change: opacity, transform;
        }

        .about-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .about-grid {
          width: 100%;
          max-width: 1400px; /* Constrain content width for readability */
          margin: 0 auto; /* Center the container */
          display: grid;
          grid-template-columns: 1fr; /* Set to a single column */
          gap: 1rem; /* Reduced gap as title is now absolute */
          align-items: start;
          padding: 0 2rem; /* Add horizontal padding */
          box-sizing: border-box; /* Include padding in width calculation */
        }

        .projects-container {
          margin-top: 1rem;
        }

        /* Section title positioning (scoped to each section) */
        :root {
          --section-left: 5rem; /* Increased left margin for section titles */
        }
        
        .section-title {
          font-size: 3rem;
          font-weight: 700;
          position: absolute;
          left: var(--section-left); /* Align with the new padding */
          top: 1.25rem;
          margin: 0;
          color: var(--color);
          scroll-margin-top: 120px; /* offset anchors so titles are visible below the fixed header */
          z-index: 5;
          pointer-events: none;
          text-align: left;
        }


        /* Place section titles top-left and ensure content sits below */
        .about-section,
        .projects-section {
          position: relative; /* scope absolute .section-title to each section */
          padding-top: 6rem; /* space for title */
        }

        .about-content {
          padding: 0;
        }

        /* About subsection blocks */
        .about-block {
          margin-bottom: 1.25rem;
          text-align: left;
        }

        .about-block-title {
          font-size: 1.125rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--accent-600);
        }
        
        .about-rows {
          display: grid;
          grid-template-rows: auto auto;
          gap: 1.75rem;
          grid-column: 1 / -1; /* Ensure it spans the single column in the grid */
        }

        .about-row-top {
          display: grid;
          grid-template-columns: 1fr; /* Stacks sections vertically */
          gap: 1.5rem 2rem;
          align-items: start;
        }

        .about-row-bottom {
          display: grid;
          grid-template-columns: 1fr; /* Stacks sections vertically */
          gap: 1.5rem 2rem;
          align-items: start;
        }
        
        .about-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: var(--muted);
          text-align: left;
          margin: 0;
        }
        
        .pet-row {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .pet-thumbs {
          display: flex;
          flex-direction: row; 
          gap: 1rem;
          margin-left: auto; 
        }

        .pet-thumb {
          width: 200px;
          height: 250px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid rgba(10,30,20,0.06);
        }

        /* Helper to force images to stretch and fill their container */
        .pet-thumb-fill {
          object-fit: fill !important;
        }

        @media (max-width: 1200px) {
          .pet-thumb {
            width: 160px;
            height: 160px;
          }
        }
        
        @media (max-width: 800px) {
          .pet-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .pet-thumbs {
            flex-direction: row;
            margin-left: 0;
            margin-top: 1rem;
          }

          .pet-thumb {
            width: 96px;
            height: 96px;
          }
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 0 1rem; /* Adjust padding for smaller screens */
          }
          
          .section-title {
            position: relative;
            top: 0;
            left: 0;
            margin-bottom: 1rem;
            padding-left: 0; /* Remove padding if any */
          }

          .about-text {
            font-size: 1.25rem;
          }
        }
        
        /* Projects section styles */
        .projects-section {
          width: 100%; /* Use 100% instead of 100vw */
          padding: 10rem 0 4rem; /* more top padding to separate from About */
          display: flex;
          flex-direction: column;
          align-items: stretch;
          box-sizing: border-box;
          margin-top: 500px;
        }

        /* Projects title should be aligned top-left of the section, not full-width */
        .projects-title {
          display: inline-block;
          text-align: left;
          margin: 0 0 2rem 0;
          font-size: 3.25rem;
          color: var(--text);
          transform: none; /* ensure no extra translate from fade-in */
          width: auto;
        }

        .projects-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding: 0 2rem; /* align content with about-grid */
          max-width: 1600px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .projects-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
        }

        .project-container {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          min-height: auto;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1);
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-left: 70px;
        }

        .project-container.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-content {
          flex: 1;
          text-align: left;
          padding: 0;
        }

        /* Right-side image area for each project (flex child) */
        .project-image {
          flex: 0 0 360px; /* larger fixed width column on the right */
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--panel);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 26px rgba(10,30,20,0.06);
          border: 1px solid rgba(10,30,20,0.04);
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .project-image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(42,168,106,0.06), rgba(10,30,20,0.02));
        }

        /* Intermediate breakpoint for medium screens */
        @media (max-width: 1200px) {
          .project-image {
            flex: 0 0 300px;
            height: 200px;
          }
        }

        .project-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text);
          position: relative;
        }

        .project-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.35rem;
          width: 48px;
          height: 3px;
          background: var(--accent);
        }

        .project-description {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
          margin-bottom: 0.5rem;
        }

        .project-tech {
          font-size: 0.95rem;
          color: var(--accent-600);
          margin-bottom: 0.5rem;
        }

        .project-link {
          display: inline-block;
          color: var(--accent-600);
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.25rem 0;
          position: relative;
        }

        .project-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--accent-600);
          transition: width 0.25s ease;
        }

        .project-link:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .project-container {
            flex-direction: column !important;
            gap: 0.75rem;
            padding-right: 1rem; /* small padding retained */
            margin-left: 0;
            align-items: stretch;
          }

          .project-image {
            width: 100%;
            height: 260px;
            flex: 0 0 auto;
            order: 2; /* place after content when stacked */
          }
          
          .project-content {
            padding: 0.5rem 0;
          }
        }

        /* Fade-in animation styles */
        .fade-in-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1);
          will-change: opacity, transform;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .social-icons {
          display: flex;
          gap: 1rem;
          z-index: 100;
          margin-top: 10px;
        }

        .site-nav {
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }

        .nav-link {
          color: var(--text);
          text-decoration: none;
          font-weight: 600;
          padding: 0.35rem 0.5rem;
          border-radius: 6px;
          transition: background-color 0.18s ease, transform 0.12s ease;
        }

        .nav-link:hover {
          background: rgba(42,168,106,0.06);
          transform: translateY(-2px);
          color: var(--accent-600);
        }

        .social-icon {
          color: #54371aff;
          font-size: 1.8rem;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          color: var(--accent-600);
        }

        @media (max-width: 768px) {
          .social-icons {
            top: 1rem;
            left: 1rem;
          }

          .social-icon {
            font-size: 1.5rem;
          }
        }

        /* Footer / Nature band */
        .nature-footer {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          background: transparent;
          position: relative;
          z-index: 2;
          padding: 0;
          overflow: hidden;
        }

        .nature-footer svg { display: block; }

        .footer-text {
          text-align: center;
          color: #54371aff;
          font-size: 1.05rem;
          font-weight: 600;
          margin-top: -2.25rem;
          margin-bottom: 1.5rem;
          letter-spacing: 0.02em;
        }

        @media (max-width: 600px) {
          .footer-text { font-size: 0.95rem; margin-top: -1.25rem; }
        }
      `}</style>
    </div>
  );
};

export default App;