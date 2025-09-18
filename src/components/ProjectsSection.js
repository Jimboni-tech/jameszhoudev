import React, { useEffect, useRef, useState } from 'react';
import Project from './Project';

const ProjectsSection = ({ projects }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <div className="projects-section">
      <h2
        ref={ref}
        className={`section-title projects-title fade-in-section ${visible ? 'is-visible' : ''}`}
      >
        Projects
      </h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <Project key={index} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsSection;
