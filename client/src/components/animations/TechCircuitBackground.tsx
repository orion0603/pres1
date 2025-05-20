import { useRef, useEffect } from 'react';

const TechCircuitBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    };

    // Create the circuit pattern
    const drawBackground = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background color
      ctx.fillStyle = 'rgba(239, 233, 225, 0.8)'; // Slightly transparent badir-cream
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid settings
      const cellSize = 80;
      const dotSize = 2;
      const lineWidth = 1;

      // Draw grid points and lines
      ctx.fillStyle = 'rgba(114, 56, 61, 0.6)'; // badir-rose with opacity
      ctx.strokeStyle = 'rgba(172, 156, 141, 0.3)'; // badir-tan with opacity
      ctx.lineWidth = lineWidth;

      // Calculate grid dimensions
      const cols = Math.ceil(canvas.width / cellSize) + 1;
      const rows = Math.ceil(canvas.height / cellSize) + 1;

      // Generate points in a grid
      const points = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add some randomness to the grid
          const offsetX = (Math.random() - 0.5) * cellSize * 0.5;
          const offsetY = (Math.random() - 0.5) * cellSize * 0.5;
          
          // Only include points with a certain probability
          if (Math.random() > 0.4) {
            points.push({
              x: i * cellSize + offsetX,
              y: j * cellSize + offsetY,
              neighbors: []
            });
          }
        }
      }

      // Find neighbors for each point (connect closest points)
      points.forEach(point => {
        const distances = points
          .filter(p => p !== point)
          .map(p => ({
            point: p,
            distance: Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2))
          }))
          .sort((a, b) => a.distance - b.distance);
        
        // Connect to 2-3 closest neighbors
        const neighborCount = Math.floor(Math.random() * 2) + 2;
        point.neighbors = distances.slice(0, neighborCount).map(d => d.point);
      });

      // Draw the connections and nodes
      points.forEach(point => {
        // Draw the connections
        ctx.beginPath();
        point.neighbors.forEach(neighbor => {
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(neighbor.x, neighbor.y);
        });
        ctx.stroke();
        
        // Draw the node point
        ctx.beginPath();
        ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasionally draw larger circuit nodes
        if (Math.random() > 0.9) {
          ctx.fillStyle = 'rgba(114, 56, 61, 0.3)';
          ctx.beginPath();
          ctx.arc(point.x, point.y, dotSize * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(114, 56, 61, 0.6)';
        }
      });
    };

    // Initialize
    window.addEventListener('resize', resize);
    resize();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-20 opacity-50"
    />
  );
};

export default TechCircuitBackground;