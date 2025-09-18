import React, { useEffect, useRef, useState } from 'react';

const About = () => {
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
      { threshold: 0.2 }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);

  // Inline style for green highlighted text
  const highlightStyle = {
    color: 'var(--accent-600)',
    fontWeight: '500',
  };

  return (
    <div
      id="about-section"
      ref={ref}
      className={`about-section fade-in-section ${visible ? 'is-visible' : ''}`}
    >
      <div className="about-grid">
        <h2 className="section-title">About</h2>

        <div className="about-rows">
          <div className="about-row about-row-top">
            <section className="about-block about-brief">
              <h3 className="about-block-title">Who I Am</h3>
              <p className="about-text">
                Hi, I'm James (Jimmy) Zhou — a computer science student at the University of Maryland. I'm currently interested in <span style={highlightStyle}>software development</span> and <span style={highlightStyle}>machine learning research</span>.
              </p>
            </section>

            <section className="about-block about-interests">
              <h3 className="about-block-title">Personal Interests</h3>
              <p className="about-text">
                I enjoy listening to music, <span style={highlightStyle}>science-based lifting</span>, cooking (and eating), reading, and watching anime. I also enjoy posting on my <span style={highlightStyle}>blog</span>!
              </p>
            </section>

            <section className="about-block about-passions">
              <h3 className="about-block-title">Future</h3>
              <p className="about-text">
                In the future, I would like to obtain a <span style={highlightStyle}>post-graduate degree</span> in computer science or machine learning. I love research and the idea of discovery, so I'm pretty sure I want to continue in academia. However, I also enjoy <span style={highlightStyle}>building applications</span> (especially at hackathons), so I am not 100% sure about what I want to happen in my future. <br />
                <br />
                Before I turn 30, I would like to <span style={highlightStyle}>backpack around eastern Europe</span> and, hopefully, climb as many mountains as I can. Nature in general is a gift from Earth, so I would like to genuinely explore it at least once before I am physically unable to.
              </p>
            </section>
          </div>

          <div className="about-row about-row-bottom">
            <section className="about-block about-pets">
              <h3 className="about-block-title">Pets</h3>
              <div className="pet-row">
                <p className="about-text">
                  I have two pets: a cat (Star) and a dog (Sky). I love Star SO MUCH, but Sky is chunky and a little smelly so I like him a little less.
                  <br />
                  <br />
                  Star is around 6 years old, and Sky is 4 years old. I'm not sure what breed Star is because we adopted him from a shelter, but Sky is a <span style={highlightStyle}>Cavalier King Charles Spaniel</span>.
                </p>
                <div className="pet-thumbs">
                  <img className="pet-thumb pet-thumb-fill" src="/sky.png" alt="dog" />
                  <img className="pet-thumb pet-thumb-fill" src="/star.png" alt="cat" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;