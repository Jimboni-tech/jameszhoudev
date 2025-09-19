import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GridBackground from '../components/GridBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import localPosts from '../data/posts';
import { useState, useEffect } from 'react';
import { fetchPostById } from '../lib/supabase';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const remote = await fetchPostById(id);
      if (!mounted) return;
      if (remote) setPost(remote);
      else setPost(localPosts.find((p) => p.id === id) || null);
      setLoading(false);
    }
    load();
    return () => { mounted = false; };
  }, [id]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [galleryPage, setGalleryPage] = useState(0);
  const pageSize = 3;

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % post.images.length));
  const prevLightbox = () => setLightboxIndex((prev) => {
    const len = post.images ? post.images.length : 0;
    return (prev === null ? 0 : (prev - 1 + len) % len);
  });

  // preload all images in background (non-blocking)
  useEffect(() => {
    if (!post || !post.images) return;
    const loaders = post.images.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    return () => {
      // hint to browser we don't need references anymore
      loaders.length = 0;
    };
  }, [post]);

  // prefer thumbnail path for gallery thumbs (public/thumbs/...)
  const getThumbSrc = (src) => {
    if (!src) return src;
    // normalize leading slash
    if (src.startsWith('/')) return `/thumbs${src}`;
    return `thumbs/${src}`;
  };

  // preload first full-size image for faster lightbox open / perceived performance
  useEffect(() => {
    if (!post || !post.images || post.images.length === 0) return;
    const first = post.images[0];
    const linkId = 'preload-first-image';
    let link = document.getElementById(linkId);
    if (!link) {
      link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.id = linkId;
      document.head.appendChild(link);
    }
    link.href = first;

    return () => {
      const l = document.getElementById(linkId);
      if (l) l.remove();
    };
  }, [post]);

  if (!post) {
    if (loading) {
      return (
        <div className="blog-page">
          <GridBackground />
          <Header />
          <div className="blog-container container">
            <main className="blog-main">
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Loading post…</h2>
                <p style={{ color: 'rgba(0,0,0,0.45)' }}>Fetching content — this may take a moment.</p>
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
      {lightboxIndex === null && <Header />}

      <div className="blog-container container">
        <main className="blog-main">
          <article className="blog-post" style={{ maxWidth: 900, margin: '2rem auto' }}>
            <div className="post-header" style={{ marginBottom: '0.5rem' }}>
              <button className="back-button post-back" onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/blog'))}>
                Back
              </button>
              <h1 className="post-title">{post.title}</h1>
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
                  {post.images.slice(galleryPage * pageSize, galleryPage * pageSize + pageSize).map((src, i) => {
                    const globalIndex = galleryPage * pageSize + i;
                    const thumb = getThumbSrc(src);
                    return (
                      <button key={globalIndex} className="gallery-thumb" onClick={() => openLightbox(globalIndex)}>
                        <img
                          src={thumb}
                          srcSet={`${thumb} 600w, ${src} 1200w`}
                          sizes="(max-width: 700px) 90vw, 33vw"
                          alt={`img-${globalIndex}`}
                          loading="lazy"
                          decoding="async"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = src; }}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="gallery-controls">
                  <button
                    className="gallery-nav back-button"
                    onClick={() => setGalleryPage((p) => Math.max(0, p - 1))}
                    disabled={galleryPage === 0}
                  >
                    Back
                  </button>
                  <span className="gallery-page-indicator">{galleryPage + 1} / {Math.ceil(post.images.length / pageSize)}</span>
                  <button
                    className="gallery-nav back-button"
                    onClick={() => setGalleryPage((p) => Math.min(Math.ceil(post.images.length / pageSize) - 1, p + 1))}
                    disabled={(galleryPage + 1) * pageSize >= post.images.length}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {lightboxIndex !== null && (
              <div className="lightbox" role="dialog" aria-modal="true">
                <button className="lightbox-close" onClick={closeLightbox}>×</button>
                <button className="lightbox-prev" onClick={prevLightbox}>‹</button>
                <img src={post.images[lightboxIndex]} alt={`lightbox-${lightboxIndex}`} loading="lazy" decoding="async" />
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
