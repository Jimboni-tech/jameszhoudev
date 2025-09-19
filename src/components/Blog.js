import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import localPosts from '../data/posts';
import { fetchPosts } from '../lib/supabase';

const Blog = () => {
  const [openId, setOpenId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const remote = await fetchPosts();
      if (!mounted) return;
      if (remote && Array.isArray(remote) && remote.length > 0) {
        setPosts(remote);
      } else {
        setPosts(localPosts);
      }
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, []);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) {
    return <section id="blog" className="site-section blog-section"><div style={{ padding: '2rem' }}>Loading posts…</div></section>;
  }

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
                {(p.content || '').split('\n').map((line, i) => (
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
