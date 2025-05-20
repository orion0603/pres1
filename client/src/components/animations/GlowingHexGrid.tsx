import React, { useEffect, useRef } from 'react';

interface GlowingHexGridProps {
  opacity?: number;
  color?: string;
  glowColor?: string;
  size?: number;
  speed?: number;
}

const GlowingHexGrid: React.FC<GlowingHexGridProps> = ({
  opacity = 0.2,
  color = '#43B0AF',
  glowColor = '#67FFF2',
  size = 1,
  speed = 0.5
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Hexagon parameters
    const hexSize = 30 * size;
    const hexHeight = hexSize * Math.sqrt(3);
    const hexWidth = hexSize * 2;
    const hexVertOffset = hexHeight * 0.75;
    const hexHorizOffset = hexWidth * 0.5;
    
    const columns = Math.ceil(canvas.width / hexHorizOffset) + 1;
    const rows = Math.ceil(canvas.height / hexVertOffset) + 1;
    
    // Create hexagons
    const hexagons: { x: number; y: number; phase: number; amplitude: number }[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * hexHorizOffset;
        const y = row * hexVertOffset + (col % 2 === 0 ? 0 : hexHeight / 2);
        
        hexagons.push({
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          amplitude: 0.5 + Math.random() * 0.5
        });
      }
    }
    
    // Draw a hexagon
    const drawHexagon = (
      ctx: CanvasRenderingContext2D, 
      x: number, 
      y: number, 
      size: number, 
      color: string, 
      glowColor: string,
      glowAmount: number
    ) => {
      const points = [];
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        points.push({
          x: x + size * Math.cos(angle),
          y: y + size * Math.sin(angle)
        });
      }
      
      // Draw glow
      if (glowAmount > 0.1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
        ctx.shadowBlur = 15 * glowAmount;
        ctx.shadowColor = glowColor;
        ctx.globalAlpha = glowAmount * 0.5 * opacity;
        ctx.strokeStyle = glowColor;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
      
      // Draw hexagon
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.closePath();
      ctx.globalAlpha = Math.min(0.15 * opacity, 0.2);
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.globalAlpha = Math.min(0.3 * opacity, 0.5);
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      ctx.globalAlpha = 1;
    };
    
    // Animation loop
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01 * speed;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      hexagons.forEach((hex) => {
        const glowAmount = Math.sin(time + hex.phase) * hex.amplitude;
        drawHexagon(ctx, hex.x, hex.y, hexSize, color, glowColor, glowAmount);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [opacity, color, glowColor, size, speed]);
  
  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity }}
    />
  );
};

export default GlowingHexGrid;