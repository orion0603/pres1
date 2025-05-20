import { useEffect, useRef } from 'react';
import { random } from '@/lib/utils';
import { motion } from 'framer-motion';

interface HexagonGridProps {
  count?: number;
}

const HexagonGrid = ({ count = 20 }: HexagonGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Container is already established by this point, no need to modify
  }, [count]);
  
  // Create array of hexagons
  const hexagons = Array.from({ length: count }, (_, i) => {
    const size = random(40, 100);
    const colors = ['#D1C7BD', '#AC9C8D', '#72383D'];
    const color = colors[random(0, colors.length - 1)];
    
    return {
      id: i,
      size,
      color,
      x: random(0, 100),
      y: random(0, 100),
    };
  });
  
  return (
    <div ref={containerRef} className="hex-grid">
      {hexagons.map((hex) => (
        <motion.div
          key={hex.id}
          style={{
            position: 'absolute',
            width: hex.size,
            height: hex.size,
            backgroundColor: hex.color,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            opacity: 0.1,
            left: `${hex.x}%`,
            top: `${hex.y}%`,
          }}
          initial={{ opacity: 0.05, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            x: [random(-50, 50), random(-50, 50), random(-50, 50)],
            y: [random(-50, 50), random(-50, 50), random(-50, 50)],
            rotate: [random(-30, 30), random(-30, 30), random(-30, 30)],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            times: [0, 0.5, 1],
          }}
        />
      ))}
    </div>
  );
};

export default HexagonGrid;
