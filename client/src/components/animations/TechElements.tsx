import React from 'react';
import { motion } from 'framer-motion';

interface TechElementsProps {
  variant?: 'circuit' | 'nodes' | 'data';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  scale?: number;
  opacity?: number;
  color?: string;
}

const TechElements: React.FC<TechElementsProps> = ({
  variant = 'circuit',
  position = 'top-right',
  scale = 1,
  opacity = 0.15,
  color = '#43B0AF'
}) => {
  // Calculate position classes
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  // Render circuit pattern
  if (variant === 'circuit') {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} w-64 h-64 pointer-events-none z-0`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity, scale }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transform: `scale(${scale})` }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10,20 L50,20" stroke={color} strokeWidth="1.5" />
          <path d="M50,20 L50,80" stroke={color} strokeWidth="1.5" />
          <path d="M50,80 L100,80" stroke={color} strokeWidth="1.5" />
          <path d="M100,80 L100,130" stroke={color} strokeWidth="1.5" />
          <path d="M100,130 L150,130" stroke={color} strokeWidth="1.5" />
          
          <circle cx="10" cy="20" r="3" fill={color} />
          <circle cx="50" cy="20" r="3" fill={color} />
          <circle cx="50" cy="80" r="3" fill={color} />
          <circle cx="100" cy="80" r="3" fill={color} />
          <circle cx="100" cy="130" r="3" fill={color} />
          <circle cx="150" cy="130" r="3" fill={color} />
          
          <path d="M130,20 L180,20" stroke={color} strokeWidth="1.5" />
          <path d="M130,20 L130,60" stroke={color} strokeWidth="1.5" />
          <path d="M180,20 L180,60" stroke={color} strokeWidth="1.5" />
          <path d="M130,60 L180,60" stroke={color} strokeWidth="1.5" />
          
          <circle cx="130" cy="20" r="3" fill={color} />
          <circle cx="180" cy="20" r="3" fill={color} />
          <circle cx="130" cy="60" r="3" fill={color} />
          <circle cx="180" cy="60" r="3" fill={color} />
          
          <path d="M20,100 L20,170" stroke={color} strokeWidth="1.5" />
          <path d="M20,170 L70,170" stroke={color} strokeWidth="1.5" />
          <path d="M70,170 L70,130" stroke={color} strokeWidth="1.5" />
          
          <circle cx="20" cy="100" r="3" fill={color} />
          <circle cx="20" cy="170" r="3" fill={color} />
          <circle cx="70" cy="170" r="3" fill={color} />
          <circle cx="70" cy="130" r="3" fill={color} />
          
          <path d="M130,170 L180,170" stroke={color} strokeWidth="1.5" />
          <path d="M155,170 L155,140" stroke={color} strokeWidth="1.5" />
          
          <circle cx="130" cy="170" r="3" fill={color} />
          <circle cx="180" cy="170" r="3" fill={color} />
          <circle cx="155" cy="140" r="3" fill={color} />
        </svg>
      </motion.div>
    );
  }

  // Render nodes pattern
  if (variant === 'nodes') {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} w-64 h-64 pointer-events-none z-0`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity, scale }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transform: `scale(${scale})` }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connected nodes pattern */}
          <g>
            <circle cx="40" cy="40" r="6" fill={color} fillOpacity="0.3" />
            <circle cx="40" cy="40" r="3" fill={color} />
            
            <circle cx="100" cy="30" r="8" fill={color} fillOpacity="0.2" />
            <circle cx="100" cy="30" r="4" fill={color} />
            
            <circle cx="160" cy="50" r="5" fill={color} fillOpacity="0.25" />
            <circle cx="160" cy="50" r="2.5" fill={color} />
            
            <circle cx="30" cy="100" r="7" fill={color} fillOpacity="0.15" />
            <circle cx="30" cy="100" r="3.5" fill={color} />
            
            <circle cx="90" cy="110" r="10" fill={color} fillOpacity="0.1" />
            <circle cx="90" cy="110" r="5" fill={color} />
            
            <circle cx="150" cy="90" r="6" fill={color} fillOpacity="0.2" />
            <circle cx="150" cy="90" r="3" fill={color} />
            
            <circle cx="50" cy="160" r="4" fill={color} fillOpacity="0.3" />
            <circle cx="50" cy="160" r="2" fill={color} />
            
            <circle cx="120" cy="170" r="8" fill={color} fillOpacity="0.15" />
            <circle cx="120" cy="170" r="4" fill={color} />
            
            <circle cx="170" cy="140" r="5" fill={color} fillOpacity="0.25" />
            <circle cx="170" cy="140" r="2.5" fill={color} />
            
            <path d="M40,40 L100,30" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M100,30 L160,50" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M160,50 L150,90" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M150,90 L90,110" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M90,110 L30,100" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M30,100 L40,40" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M90,110 L120,170" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M120,170 L170,140" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M170,140 L150,90" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M30,100 L50,160" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
            <path d="M50,160 L120,170" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          </g>
        </svg>
      </motion.div>
    );
  }

  // Render data flow pattern
  if (variant === 'data') {
    return (
      <motion.div
        className={`absolute ${positionClasses[position]} w-64 h-64 pointer-events-none z-0`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity, scale }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transform: `scale(${scale})` }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Binary data flow */}
          <g opacity={opacity * 2}>
            <text x="10" y="20" fill={color} style={{ font: '12px monospace' }}>01100101</text>
            <text x="60" y="40" fill={color} style={{ font: '10px monospace' }}>10110011</text>
            <text x="120" y="25" fill={color} style={{ font: '11px monospace' }}>10010110</text>
            <text x="30" y="60" fill={color} style={{ font: '9px monospace' }}>11010101</text>
            <text x="90" y="70" fill={color} style={{ font: '12px monospace' }}>01011100</text>
            <text x="140" y="55" fill={color} style={{ font: '10px monospace' }}>10110001</text>
            <text x="10" y="90" fill={color} style={{ font: '11px monospace' }}>10100111</text>
            <text x="70" y="110" fill={color} style={{ font: '9px monospace' }}>11001010</text>
            <text x="130" y="95" fill={color} style={{ font: '12px monospace' }}>01001101</text>
            <text x="25" y="130" fill={color} style={{ font: '10px monospace' }}>10111000</text>
            <text x="85" y="145" fill={color} style={{ font: '11px monospace' }}>01101001</text>
            <text x="145" y="135" fill={color} style={{ font: '9px monospace' }}>11000110</text>
            <text x="15" y="165" fill={color} style={{ font: '12px monospace' }}>01011011</text>
            <text x="75" y="180" fill={color} style={{ font: '10px monospace' }}>10101100</text>
            <text x="135" y="170" fill={color} style={{ font: '11px monospace' }}>11010010</text>
            
            {/* Data streams */}
            <motion.path 
              d="M30,10 Q70,30 50,50 T80,90 Q120,70 160,100" 
              stroke={color} 
              strokeWidth="1" 
              strokeDasharray="4 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
              fill="none"
            />
            
            <motion.path 
              d="M10,50 Q40,80 90,60 T130,120 Q160,140 180,110" 
              stroke={color} 
              strokeWidth="1" 
              strokeDasharray="3 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "loop", delay: 1 }}
              fill="none"
            />
            
            <motion.path 
              d="M20,120 Q60,100 100,130 T140,90 Q180,70 190,150" 
              stroke={color} 
              strokeWidth="1" 
              strokeDasharray="5 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 2 }}
              fill="none"
            />
          </g>
        </svg>
      </motion.div>
    );
  }

  return null;
};

export default TechElements;