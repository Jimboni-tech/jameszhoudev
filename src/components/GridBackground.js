import React, { useEffect, useRef } from 'react';

const GridBackground = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Track mouse position
    const handleMouseMove = (e) => {
      cursorRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Draw grid and cursor effect
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid with a lighter, earthy sage green
      ctx.strokeStyle = 'rgba(128, 150, 93, 0.18)'; // Lighter, earthy green
      ctx.lineWidth = 1; // Thinner lines
      
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Subtle inner glow with an even lighter green
      ctx.strokeStyle = 'rgba(144, 166, 112, 0.1)'; // Very light earthy green
      ctx.lineWidth = 0.5; // Thinner glow lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(canvas.width, y + 0.5);
        ctx.stroke();
      }
      
      // Draw cursor effect
      const { x, y } = cursorRef.current;
      const radius = 100;
      
      // Create gradient for cursor effect with the new green
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(128, 150, 93, 0.2)');
      gradient.addColorStop(1, 'rgba(128, 150, 93, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      
      requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
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