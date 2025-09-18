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
    let revealTimer = null;
    let lastY = window.scrollY || window.pageYOffset;
    let ticking = false;

    const clampScrollIfNeeded = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;

      if (scrollTop > maxScroll) {
        // Use simple scrollTo to avoid referencing undefined globals
        try {
          window.scrollTo({ top: maxScroll, behavior: 'auto' });
        } catch (e) {
          window.scrollTo(0, maxScroll);
        }
      }
    };

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;

      // If scrolling down past threshold, hide immediately
      if (y > lastY && y > 20) {
        setIntroHidden(true);
        if (revealTimer) {
          clearTimeout(revealTimer);
          revealTimer = null;
        }
      }

      // If scrolling up, delay the reveal slightly so it doesn't pop
      if (y < lastY) {
        if (revealTimer) clearTimeout(revealTimer);
        // Delay showing intro for 300ms after user stops scrolling up
        revealTimer = setTimeout(() => {
          // Only reveal if we're near the top (avoid revealing mid-page)
          if ((window.scrollY || window.pageYOffset) < 120) {
            setIntroHidden(false);
          }
        }, 300);
      }

      lastY = y;

      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          clampScrollIfNeeded();
          ticking = false;
        });
      }
    };

    const onResize = () => {
      // After resize, ensure we're not beyond the document bottom
      requestAnimationFrame(clampScrollIfNeeded);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (revealTimer) clearTimeout(revealTimer);
    };
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
    </div>
  );
};

export default App;