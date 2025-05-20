import { useRef, useEffect } from 'react';

interface ParticleNetworkProps {
  variant?: 'landing' | 'tech';
  density?: number;
  color?: string[];
}

const ParticleNetwork = ({ 
  variant = 'tech', 
  density = 30,
  color = ['#D1C7BD', '#AC9C8D', '#72383D']
}: ParticleNetworkProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Create particles
    let particles: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];
    
    const createParticles = () => {
      particles = [];
      const particleCount = variant === 'landing' ? density * 1.5 : density;
      
      for (let i = 0; i < particleCount; i++) {
        const size = variant === 'landing' 
          ? Math.random() * 15 + 20 // Larger for landing
          : Math.random() * 3 + 1;  // Smaller for tech
        
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const colorIndex = Math.floor(Math.random() * color.length);
        
        const speedFactor = variant === 'landing' ? 0.05 : 0.2;
        const speedX = (Math.random() - 0.5) * speedFactor;
        const speedY = (Math.random() - 0.5) * speedFactor;
        
        particles.push({
          x, y, size,
          color: color[colorIndex],
          speedX, speedY
        });
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        
        if (variant === 'landing') {
          // Hexagon shape for landing
          const a = p.size;
          ctx.moveTo(p.x + a * Math.cos(0), p.y + a * Math.sin(0));
          for (let i = 1; i < 6; i++) {
            ctx.lineTo(p.x + a * Math.cos(i * 2 * Math.PI / 6), p.y + a * Math.sin(i * 2 * Math.PI / 6));
          }
          ctx.closePath();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.2;
          ctx.fill();
        } else {
          // Simple circle for tech variant
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.3;
          ctx.fill();
        }
      }
      
      // Draw connections
      ctx.globalAlpha = 0.15;
      ctx.strokeStyle = variant === 'landing' ? '#AC9C8D' : '#72383D';
      ctx.lineWidth = variant === 'landing' ? 0.8 : 0.4;
      
      const connectionDistance = variant === 'landing' ? 150 : 100;
      
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
          );
          
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    // Initialize
    setCanvasSize();
    createParticles();
    animate();
    
    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      createParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [variant, density, color]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 -z-10"
      style={{ opacity: variant === 'landing' ? 0.7 : 0.4 }}
    />
  );
};

export default ParticleNetwork;