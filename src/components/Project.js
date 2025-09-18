import React, { useEffect, useRef } from 'react';

const Project = ({ project, index }) => {
  const ref = useRef(null);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.18 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`project-container fade-in-section ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.12}s`, minHeight: 'auto', padding: '1rem 0' }}
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.tech}</p>
        <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
          View Project
        </a>
      </div>
    </div>
  );
};

export default Project;