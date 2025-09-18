import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GridBackground from '../components/GridBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import posts from '../data/posts';
import { useState } from 'react';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % post.images.length));
  const prevLightbox = () => setLightboxIndex((prev) => {
    const len = post.images ? post.images.length : 0;
    return (prev === null ? 0 : (prev - 1 + len) % len);
  });

  if (!post) {
    return (
      <div className="blog-page">
        <GridBackground />
        <Header />
        <div className="blog-container container">
          <main className="blog-main">
            <div style={{ padding: '2rem' }}>
              <h2>Post not found</h2>
              <p>The requested post does not exist.</p>
                <button className="back-button" onClick={() => navigate(-1)}>
                  Back
                </button>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <GridBackground />
      <Header />

      <div className="blog-container container">
        <main className="blog-main">
          <article className="blog-post" style={{ maxWidth: 900, margin: '2rem auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <button className="back-button" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/blog'))}>
                Back
              </button>
              <h1 className="post-title" style={{ margin: 0, flex: 1, textAlign: 'center' }}>{post.title}</h1>
            </div>
            <div className="post-meta">
              <time className="post-date" dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
              {post.tags && (
                <span className="post-tags-inline">
                  {post.tags.map((t) => (
                    <span key={t} className="post-tag">#{t}</span>
                  ))}
                </span>
              )}
            </div>

            <div className="post-body">
              {post.content.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {post.images && post.images.length > 0 && (
              <div className="post-gallery-section">
                <h2 className="gallery-title">Photo Gallery</h2>
                <div className="post-gallery">
                  {post.images.map((src, i) => (
                    <button key={i} className="gallery-thumb" onClick={() => openLightbox(i)}>
                      <img src={src} alt={`img-${i}`} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {lightboxIndex !== null && (
              <div className="lightbox" role="dialog" aria-modal="true">
                <button className="lightbox-close" onClick={closeLightbox}>×</button>
                <button className="lightbox-prev" onClick={prevLightbox}>‹</button>
                <img src={post.images[lightboxIndex]} alt={`lightbox-${lightboxIndex}`} />
                <button className="lightbox-next" onClick={nextLightbox}>›</button>
              </div>
            )}
          </article>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PostPage;
