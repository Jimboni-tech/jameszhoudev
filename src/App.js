import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import Project from './components/Project';
import GridBackground from './components/GridBackground';

// Main App component
const App = () => {
  const [subtitleText, setSubtitleText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(180);

  // State for fade-in animations
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [projectVisibility, setProjectVisibility] = useState(Array(5).fill(false));

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
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the element is visible
    };

    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId === 'about-section') {
            setIsAboutVisible(true);
          } else if (sectionId.startsWith('project-')) {
            const projectIndex = parseInt(sectionId.split('-')[1], 10) - 1;
            setProjectVisibility(prev => {
              const newVisibility = [...prev];
              newVisibility[projectIndex] = true;
              return newVisibility;
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []); // Run only once on mount

  const projects = [
    {
    title: "Entropy-Based Hybrid Retrieval",
    description: "Aided in designing a retrieval system combining sparse (BM25) and dense (FAISS) methods, reweighted with normalized Shannon entropy. Outperformed baselines on TriviaQA (+7.6% LLM-as-a-Judge) and HotPotQA (+0.5%), and contributed to a paper accepted at ICML VecDB.",
    link: "https://openreview.net/forum?id=bwGaZOVo0c",
    tech: "Python, FAISS, BM25, PyTorch",
    image: '/1.png'
  },
  {
    
    title: "Reddit RAG Pipeline",
    description: "Built a Retrieval-Augmented Generation system using Reddit data, improving query relevance with semantic similarity ranking and token-aware truncation for LLaMA-3 inference. Deployed a 4-bit quantized LLaMA-3 model via Ollama API to enable grounded responses on 50K+ Reddit posts.",
    link: "https://github.com/Jimboni-tech/reddit-rag",
    tech: "Python, PyTorch, Hugging Face, Ollama, Pandas"
  },
  {
    title: "OnyxScript",
    description: "Developed a creator platform that generates AI-assisted video scripts with mindmap editing and teleprompter features. Implemented AI autofill that reduced average script creation time by 50%, reaching 50+ beta testers.",
    link: "https://www.onyxscript.com/",
    tech: "React, Node.js, Express, MongoDB",
    image: '/3.png'
  },
  {
    title: "Reddit Sentiment vs. Bitcoin Volatility",
    description: "Analyzed 35K+ Reddit posts alongside Bitcoin market data using sentiment analysis and statistical testing. Found evidence that Bitcoin volatility Granger-causes Reddit sentiment with ~95% confidence.",
    link: "https://github.com/Jimboni-tech/The-Evolving-Relationship-Between-Public-Sentiment-and-Bitcoin-Market-Volatility",
    tech: "Python, Pandas, NumPy, NLTK",
    image: '/4.png'
  },
  
  {
  title: "School Sign-In/Sign-Out System",
  description: "Developed a digital sign-in/sign-out platform that streamlined student entry and exit tracking, improving accessibility and reducing manual record-keeping in the school ecosystem.",
  link: "#",
  tech: "React, JavaScript, CSS",
  image: '/5.png'
}
];

  return (
    <div className="container">
      <GridBackground />
      
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

      <div className="intro-section">
        <h1 className="title">
          James Zhou
        </h1>
        <p className="subtitle" style={{ minHeight: '1.5em' }}>
          {subtitleText}
          <span className="blinking-cursor"></span>
        </p>
      </div>

      <div
        id="about-section"
        className={`about-section fade-in-section ${isAboutVisible ? 'is-visible' : ''}`}
      >
        <div className="about-grid">
          <h2 className="section-title">About</h2>
          <div className="about-content">
            <p className="about-text">
              Hi! I’m a computer science student at the University of Maryland with a strong interest in software engineering, systems, and machine learning. I enjoy tackling challenging problems and finding clear, practical solutions through code, especially when those solutions have real-world impact. I care about building things that are efficient and easy to understand, and I’m motivated by the chance to keep learning, collaborate with others, and create technology that genuinely makes a difference.
            </p>
          </div>
        </div>
      </div>

      <div className="projects-section">
        <h2 className="section-title projects-title">Projects</h2>
        <div className="projects-container">
          {projects.map((project, index) => (
            <Project
              key={index}
              project={project}
              index={index}
              isVisible={projectVisibility[index]}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        /* General styles */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            background-color: #000;
            color: #fff;
        }

        /* Container styles */
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          min-height: 100vh;
          font-family: monospace;
          text-align: center;
          position: relative;
          z-index: 1;
          background: transparent;
        }

        /* About section styles */
        .about-section {
          background-color: transparent !important;
        }

        /* Projects section styles */
        .projects-section {
          background-color: transparent !important;
        }

        /* Intro section styles */
        .intro-section {
          height: 60vh; /* Reduced from 80vh */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 0; /* Remove default padding */
          padding-bottom: 0;
          margin-bottom: 0; /* Removed margin */
        }

        /* Title styles */
        .title {
          font-size: 2.25rem; /* text-4xl */
          font-weight: 800; /* font-extrabold */
          margin-bottom: 1rem; /* mb-4 */
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
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
          background-color: #fff;
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        /* Subtitle styles */
        .subtitle {
          font-size: 1.125rem; /* text-lg */
          font-weight: 300; /* font-light */
          color: #d1d5db; /* text-gray-300 */
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
          width: 100%;
          min-height: 60vh;
          padding: 4rem 2rem;
          background-color: #0c0c0c;
          margin-bottom: 2rem;
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
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(200px, 1fr) 2fr;
          gap: 4rem;
          align-items: start;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 700;
          text-align: left;
          position: sticky;
          top: 2rem;
        }

        .about-content {
          padding: 0;
        }

        .about-text {
          font-size: 1.5rem;
          line-height: 1.8;
          color: #d1d5db;
          text-align: left;
          margin: 0;
        }

        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .section-title {
            position: relative;
            top: 0;
          }

          .about-text {
            font-size: 1.25rem;
          }
        }
        
        /* Projects section styles */
        .projects-section {
          width: 100%;
          padding: 4rem 2rem;
          background-color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .projects-title {
          text-align: center;
          margin-bottom: 4rem;
          position: relative;
          font-size: 3.5rem;
        }

        .projects-container {
          width: 100%;
          max-width: 1400px;
          display: flex;
          flex-direction: column;
          gap: 8rem;
        }

        @media (max-width: 768px) {
          .projects-title {
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
        }

        .project-container {
          display: flex;
          align-items: center;
          gap: 4rem;
          min-height: 400px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s cubic-bezier(0.17, 0.55, 0.55, 1);
          background-color: rgba(0, 0, 0, 0.3); /* subtle dark background for readability */
          border-radius: 12px;
          backdrop-filter: blur(5px); /* optional: adds slight blur effect */
        }

        .project-container.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .project-content {
          flex: 1;
          text-align: left;
          padding: 2rem;
        }

        .project-image {
          flex: 1;
          height: 400px;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder {
          width: 100%;
          height: 100%;
          background: rgba(26, 26, 26, 0.3); /* make placeholder more transparent */
          transition: transform 0.3s ease;
        }

        .project-container:hover .image-placeholder {
          transform: scale(1.05);
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: contain; /* Changed from cover to contain */
          transition: transform 0.3s ease;
          background-color: transparent; /* remove background color */
        }

        .project-container:hover .project-img {
          transform: scale(1.05);
        }

        .project-title {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #fff;
          position: relative;
        }

        .project-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -0.5rem;
          width: 60px;
          height: 4px;
          background: #63b3ed;
        }

        .project-description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #a0a0a0;
          margin-bottom: 2rem;
        }

        .project-tech {
          font-size: 1rem;
          color: #63b3ed;
          margin-bottom: 2rem;
        }

        .project-link {
          display: inline-block;
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          padding: 0.5rem 0;
          position: relative;
        }

        .project-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #63b3ed;
          transition: width 0.3s ease;
        }

        .project-link:hover::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .project-container {
            flex-direction: column !important;
            gap: 2rem;
          }
          
          .project-content {
            padding: 1rem;
          }
          
          .project-image {
            height: 250px;
          }
        }

        /* Fade-in animation styles */
        .fade-in-section {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1);
          will-change: opacity, transform;
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .social-icons {
          position: fixed;
          top: 2rem;
          left: 2rem;
          display: flex;
          gap: 1rem;
          z-index: 100;
        }

        .social-icon {
          color: white;
          font-size: 1.8rem;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          color: #63b3ed;
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
      `}</style>
    </div>
  );
};

export default App;
