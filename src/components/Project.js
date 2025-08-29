import React, { useEffect, useRef } from 'react';

const Project = ({ project, index }) => {
  const projectRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(projectRef.current);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => {
      if (projectRef.current) {
        observer.unobserve(projectRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={projectRef}
      className={`project-container ${isVisible ? 'is-visible' : ''}`}
      style={{ 
        flexDirection: isEven ? 'row' : 'row-reverse',
        transitionDelay: `${index * 0.2}s`
      }}
    >
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tech">Tech Stack: {project.tech}</p>
        <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
      <div className="project-image">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="project-img"
          />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>
    </div>
  );
};

export default Project;