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
      <ParticleNetwork variant="landing" density={25} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream/20 via-badir-cream/80 to-badir-cream/30 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center text-center">
        <div ref={containerRef} className="relative">
          <animated.div style={{ transform }} className="py-12 px-8 md:py-16 md:px-16 backdrop-blur-sm bg-badir-cream/30 rounded-3xl shadow-2xl border border-badir-tan/30">
            {/* Tech-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-badir-rose rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-badir-rose rounded-br-xl" />
            
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="h-24 w-24 mx-auto mb-8 relative"
                initial={{ opacity: 0, rotateZ: -90 }}
                animate={{ opacity: 1, rotateZ: 0 }}
                transition={{ duration: 1.2 }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-badir-rose border-dotted animate-spin-slow" />
                <div className="absolute inset-2 rounded-full border-4 border-badir-tan" />
                <div className="absolute inset-4 rounded-full bg-badir-mocha flex items-center justify-center text-white text-3xl font-bold">B</div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-badir-mocha mb-6 tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="relative">
                  B<span className="text-badir-rose">adir</span>
                  <div className="absolute -top-2 -right-4 w-8 h-8 rounded-full bg-badir-rose/20 blur-lg" />
                </span>
              </motion.h1>
              
              <motion.h2 
                className="text-2xl md:text-4xl font-medium text-badir-rose mb-8 relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="relative">
                  Blockchain <span className="relative">Donation<span className="absolute -top-1 -right-2 w-2 h-2 bg-badir-tan rounded-full" /></span> Platform
                </span>
                <div className="h-px bg-gradient-to-r from-transparent via-badir-rose to-transparent mt-2" />
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-badir-mocha to-badir-rose bg-clip-text text-transparent font-medium">
                  Transparency, Trust, and Technology in Every Transaction
                </span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-badir-rose to-badir-tan rounded-full blur opacity-75" />
                <Button 
                  onClick={onStartClick}
                  className="relative px-10 py-5 h-auto text-lg bg-badir-rose text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg"
                >
                  <span className="mr-2">Begin Presentation</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </motion.div>
              
              {/* Tech decorative elements */}
              <div className="absolute bottom-8 left-8 w-20 h-5 flex space-x-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="h-full bg-badir-tan/40 rounded-sm flex-1"
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
