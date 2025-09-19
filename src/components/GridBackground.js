import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const gridCanvasRef = useRef(null); // offscreen canvas for the static grid
  const rafRef = useRef(null);
  const lastDrawRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // create offscreen grid canvas
    const gridCanvas = document.createElement('canvas');
    gridCanvasRef.current = gridCanvas;
    const gridCtx = gridCanvas.getContext('2d');

    // Set canvas size and (re)render static grid into offscreen canvas
    const setCanvasSize = () => {
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      canvas.width = w;
      canvas.height = h;
      gridCanvas.width = w;
      gridCanvas.height = h;

      // draw static grid once into gridCanvas
      drawStaticGrid(gridCtx, w, h);
    };

    const drawStaticGrid = (gctx, width, height) => {
      gctx.clearRect(0, 0, width, height);
      const gridSize = 50;

      // Main grid lines
      gctx.strokeStyle = 'rgba(128, 150, 93, 0.18)';
      gctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSize) {
        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x, height);
        gctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        gctx.beginPath();
        gctx.moveTo(0, y);
        gctx.lineTo(width, y);
        gctx.stroke();
      }

      // Subtle inner glow lines
      gctx.strokeStyle = 'rgba(144, 166, 112, 0.1)';
      gctx.lineWidth = 0.5;
      for (let x = 0; x < width; x += gridSize) {
        gctx.beginPath();
        gctx.moveTo(x + 0.5, 0);
        gctx.lineTo(x + 0.5, height);
        gctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        gctx.beginPath();
        gctx.moveTo(0, y + 0.5);
        gctx.lineTo(width, y + 0.5);
        gctx.stroke();
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Track mouse position
    const handleMouseMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Track scroll to reduce rendering while user scrolls
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 140);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop: copy pre-rendered grid then draw small aura when not scrolling
    const fps = 40; // cap at 40fps
    const frameInterval = 1000 / fps;

    const draw = (t) => {
      if (!lastDrawRef.current) lastDrawRef.current = t;
      const dt = t - lastDrawRef.current;
      if (dt < frameInterval) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastDrawRef.current = t;

      // draw the cached static grid quickly
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(gridCanvasRef.current, 0, 0);

      // skip aura while scrolling to save CPU and avoid jank
      if (!isScrollingRef.current) {
        const { x, y } = cursorRef.current;
        // small safety: only draw if coordinates are valid
        if (typeof x === 'number' && typeof y === 'number') {
          const radius = 80;
          const primaryRGB = '47,179,45';

          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
          gradient.addColorStop(0, `rgba(${primaryRGB},0.6)`);
          gradient.addColorStop(0.45, `rgba(${primaryRGB},0.28)`);
          gradient.addColorStop(1, `rgba(${primaryRGB},0)`);

          const prevComposite = ctx.globalCompositeOperation;
          ctx.globalCompositeOperation = 'lighter';
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();

          const outer = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 1.1);
          outer.addColorStop(0, `rgba(${primaryRGB},0.12)`);
          outer.addColorStop(1, `rgba(${primaryRGB},0)`);
          ctx.fillStyle = outer;
          ctx.beginPath();
          ctx.arc(x, y, radius * 1.1, 0, Math.PI * 2);
          ctx.fill();

          ctx.globalCompositeOperation = prevComposite;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'transparent'
      }}
    />
  );
};

export default GridBackground;