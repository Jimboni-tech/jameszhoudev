import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import posts from '../data/posts';

const Blog = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="blog" className="site-section blog-section">

      <div className="blog-list">
        {posts.map((p) => (
          <article key={p.id} className="blog-post">
            <h3 className="post-title">{p.title}</h3>
            <div className="post-meta">
              <time className="post-date" dateTime={p.date}>{new Date(p.date).toLocaleDateString()}</time>
              {p.tags && (
                <span className="post-tags-inline">
                  {p.tags.map((t) => (
                    <span key={t} className="post-tag">#{t}</span>
                  ))}
                </span>
              )}
            </div>
            <p className="post-excerpt">{p.description}</p>

            <div className={`post-content ${openId === p.id ? 'open' : ''}`}>
              <div className="post-body">
                {p.content.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 'auto' }}>
              <Link to={`/blog/${p.id}`} className="post-toggle">
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;
