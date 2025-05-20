import { motion } from 'framer-motion';
import HexagonGrid from '../animations/HexagonGrid';
import { Button } from '@/components/ui/button';

interface Slide1LandingProps {
  onStartClick: () => void;
}

const Slide1Landing = ({ onStartClick }: Slide1LandingProps) => {
  return (
    <section id="slide1" className="slide relative overflow-hidden bg-badir-cream">
      <HexagonGrid count={30} />
      
      <div className="slide-container flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-badir-mocha mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Badir
        </motion.h1>
        
        <motion.h2 
          className="text-2xl md:text-4xl font-medium text-badir-rose mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Blockchain Donation Platform for Gaza
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl mb-16 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transparency, Trust, and Technology in Every Transaction
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button 
            onClick={onStartClick}
            className="px-8 py-4 h-auto text-lg bg-badir-rose text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg"
          >
            Begin Presentation
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide1Landing;
