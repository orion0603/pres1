import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import ParticleNetwork from '../animations/ParticleNetwork';
import TechCircuitBackground from '../animations/TechCircuitBackground';
import { useSpring, animated } from 'react-spring';

interface Slide1LandingProps {
  onStartClick: () => void;
}

const Slide1Landing = ({ onStartClick }: Slide1LandingProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // 3D hover effect using react-spring
  const { transform } = useSpring({
    transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${-mousePosition.x * 2}deg)`,
    config: { mass: 5, tension: 350, friction: 40 }
  });

  // Track mouse movement for 3D effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; 
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="slide1" className="slide relative overflow-hidden">
      {/* Multiple layered backgrounds for depth */}
      <TechCircuitBackground />
      <ParticleNetwork variant="landing" density={35} color={['#67FFF2', '#43B0AF', '#81EC86']} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream/10 via-badir-cream/90 to-badir-cream/20 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center text-center">
        <div ref={containerRef} className="relative">
          <animated.div 
            style={{ transform }} 
            className="py-12 px-8 md:py-16 md:px-16 tech-card backdrop-blur-sm bg-badir-sand/70 border-t-2 border-r border-l border-b border-badir-tan/30 rounded-sm shadow-[0_5px_20px_rgba(0,0,0,0.5)]"
          >
            {/* Tech-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-badir-neon rounded-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-badir-rose rounded-none" />
            
            <div className="max-w-3xl mx-auto">
              {/* University Logo */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <img 
                  src="/assets/university-logo.png" 
                  alt="University Logo" 
                  className="h-28 mx-auto"
                />
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-badir-mocha mb-6 tracking-tight cyber-heading"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative">
                  B<span className="text-badir-neon drop-shadow-[0_0_10px_rgba(103,255,242,0.8)]">adir</span>
                  <div className="absolute -top-2 -right-4 w-8 h-8 rounded-full bg-badir-neon/20 blur-xl" />
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl font-medium text-badir-tan mb-8 relative uppercase tracking-wider"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="relative">
                  Blockchain <span className="relative">Donation<span className="absolute -top-1 -right-2 w-2 h-2 bg-badir-neon rounded-none animate-pulse" /></span> Platform
                </span>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-badir-neon to-transparent mt-2 shadow-[0_0_10px_rgba(103,255,242,0.7)]" />
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-badir-neon to-badir-rose bg-clip-text text-transparent font-medium drop-shadow-sm">
                  Transparency, Trust, and Technology in Every Transaction
                </span>
              </motion.p>
              
              {/* Team Information */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="py-3 px-5 bg-badir-sand/80 border-l-2 border-badir-neon inline-block">
                  <h3 className="text-lg font-semibold mb-2 text-badir-mocha">By</h3>
                  <ul className="text-sm space-y-1 text-badir-mocha/90 font-mono">
                    <li>AFNAN MOHAMMAD ISMAIL ALSHATER</li>
                    <li>LEEDIA NEMER SALEEM ALNEMRI</li>
                    <li>YARA OSAMA A. AL-AQARBAH</li>
                  </ul>
                  <div className="h-px bg-badir-tan/40 my-2" />
                  <p className="text-sm text-badir-mocha/90">Supervised by</p>
                  <p className="text-sm text-badir-neon font-medium">Dr. Musab Al Ghadi</p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-badir-neon to-badir-tan rounded-sm blur opacity-75" />
                <Button 
                  onClick={onStartClick}
                  className="relative px-10 py-5 h-auto text-lg bg-badir-tan uppercase tracking-wider text-white rounded-sm font-medium border-t border-badir-neon shadow-[0_0_15px_rgba(103,255,242,0.5)] hover:shadow-[0_0_25px_rgba(103,255,242,0.7)] transition-all duration-300"
                >
                  <span className="mr-2">Begin Presentation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </motion.div>
              
              {/* Tech decorative elements */}
              <div className="absolute bottom-8 left-8 w-28 h-5 flex space-x-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="h-full bg-badir-neon/50 rounded-none flex-1 shadow-[0_0_5px_rgba(103,255,242,0.5)]"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ delay: 0.8 + (i * 0.1), duration: 0.4 }}
                  />
                ))}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
};

export default Slide1Landing;
