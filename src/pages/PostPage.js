import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GridBackground from '../components/GridBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';
import localPosts from '../data/posts';
import { useState, useEffect, useRef } from 'react';
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

  // preconnect to external image host (speeds up TLS handshake / DNS)
  useEffect(() => {
    if (!post || !post.images || post.images.length === 0) return;
    try {
      const first = post.images[0];
      if (!first || !first.startsWith('http')) return;
      const host = new URL(first).origin;
      const preId = 'preconnect-img-host';
      if (!document.getElementById(preId)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = host;
        link.crossOrigin = '';
        link.id = preId;
        document.head.appendChild(link);

        const dns = document.createElement('link');
        dns.rel = 'dns-prefetch';
        dns.href = host;
        dns.id = preId + '-dns';
        document.head.appendChild(dns);
      }
    } catch (e) {
      // ignore malformed urls
    }
  }, [post]);

  // Small progressive image component: shows a blurred thumbnail background immediately,
  // then loads the full image when the element is near the viewport. Uses IntersectionObserver
  // to avoid loading images off-screen and swaps in the full-res image when ready.
  const ProgressiveImage = ({ thumb, src, alt, sizes, srcSet, eager, fit = 'cover' }) => {
    const [fullLoaded, setFullLoaded] = useState(false);
    const [inView, setInView] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
      if (eager) {
        setInView(true);
        return;
      }
      const el = imgRef.current;
      if (!el || typeof IntersectionObserver === 'undefined') {
        setInView(true);
        return;
      }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      }, { rootMargin: '200px' });
      io.observe(el);
      return () => io.disconnect();
    }, [eager]);

    useEffect(() => {
      if (!inView) return;
      const img = new Image();
      if (srcSet) img.srcset = srcSet;
      img.src = src;
      img.onload = () => setFullLoaded(true);
      img.onerror = () => setFullLoaded(false);
    }, [inView, src, srcSet]);

    const wrapperStyle = {
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: thumb ? `url(${thumb})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    const blurStyle = {
      filter: fullLoaded ? 'blur(0px)' : 'blur(12px)',
      transition: 'filter 300ms ease, opacity 300ms ease',
    };

    return (
      <div ref={imgRef} style={wrapperStyle} className="progressive-image" aria-hidden={alt ? 'false' : 'true'}>
        <img
          src={fullLoaded ? src : thumb || src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          style={
            fit === 'cover'
              ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 1, ...blurStyle }
              : { width: '100%', height: '100%', objectFit: 'contain', display: 'block', opacity: 1, ...blurStyle }
          }
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={eager ? 'high' : 'auto'}
        />
      </div>
    );
  };

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
                        <ProgressiveImage
                          thumb={thumb}
                          src={src}
                          srcSet={`${thumb} 600w, ${src} 1200w`}
                          sizes="(max-width: 700px) 90vw, 33vw"
                          alt={`img-${globalIndex}`}
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
                <div className="lightbox-inner">
                  <button className="lightbox-prev inner" onClick={prevLightbox} aria-label="Previous image">‹</button>
                  <div className="lightbox-content">
                    <ProgressiveImage
                      thumb={getThumbSrc(post.images[lightboxIndex])}
                      src={post.images[lightboxIndex]}
                      srcSet={`${getThumbSrc(post.images[lightboxIndex])} 600w, ${post.images[lightboxIndex]} 2000w`}
                      sizes="100vw"
                      alt={`lightbox-${lightboxIndex}`}
                      eager={true}
                      fit="contain"
                    />
                  </div>
                  <button className="lightbox-next inner" onClick={nextLightbox} aria-label="Next image">›</button>
                </div>
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