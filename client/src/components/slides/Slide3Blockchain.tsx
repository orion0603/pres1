import { motion, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide3Blockchain = () => {
  const blockchainRef = useRef<HTMLDivElement>(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const controls = useAnimation();
  
  // Block data
  const blocks = [
    {
      id: "genesis",
      name: "Genesis Block",
      hash: "0000abc...",
      prev: "None",
      details: "(Platform Creation)",
      amount: null,
      from: null,
      color: "#72383D" // badir-rose
    },
    {
      id: "block1",
      name: "Block #1",
      hash: "0000def...",
      prev: "0000abc...",
      details: null,
      amount: 0.5,
      from: "0x71a...3bd",
      color: "#AC9C8D" // badir-tan
    },
    {
      id: "block2",
      name: "Block #2",
      hash: "0000ghi...",
      prev: "0000def...",
      details: null,
      amount: 1.2,
      from: "0x82b...47f",
      color: "#AC9C8D" // badir-tan
    },
    {
      id: "block3",
      name: "Block #3",
      hash: "0000jkl...",
      prev: "0000ghi...",
      details: null,
      amount: 0.8,
      from: "0x93c...52e",
      color: "#AC9C8D" // badir-tan
    },
    {
      id: "new",
      name: "New Block",
      hash: "Calculating...",
      prev: "0000jkl...",
      details: null,
      amount: null,
      from: null,
      color: "transparent",
      dashed: true
    }
  ];
  
  // Blockchain visualization only - features moved to separate slide

  // Block hover animations
  const getSpringProps = (index: number) => useSpring({
    transform: activeBlock === index 
      ? 'scale(1.05) translateY(-10px)' 
      : 'scale(1) translateY(0)',
    boxShadow: activeBlock === index 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.2)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    config: { mass: 1, tension: 350, friction: 26 }
  });

  // Hash calculation animation
  useEffect(() => {
    const animate = async () => {
      await controls.start({
        opacity: [0, 1, 0],
        transition: { duration: 2, repeat: Infinity }
      });
    };
    animate();
  }, [controls]);

  // Horizontal scroll handling
  useEffect(() => {
    const element = blockchainRef.current;
    if (!element) return;
    
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };
    
    element.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      element.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <section id="slide3" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={20} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div 
          className="max-w-5xl mx-auto tech-border p-8 md:p-12 tech-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold tech-gradient-text mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Visualizing Blockchain
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Each donation is recorded as a block in a transparent, immutable chain—creating a permanent, public ledger of all transactions.
            </motion.p>

            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          {/* Interactive blockchain visualization - enhanced for clarity */}
          <div className="overflow-x-auto pb-6 mb-8" ref={blockchainRef}>
            <div className="flex justify-center mb-4">
              <div className="px-4 py-2 bg-badir-rose/10 border border-badir-rose/20 rounded-full text-sm text-badir-mocha">
                <i className="fas fa-mouse-pointer mr-1"></i> Scroll horizontally to view all blocks
              </div>
            </div>
            
            <div className="flex flex-nowrap space-x-4 min-w-max py-8 px-4">
              {blocks.map((block, index) => (
                <div key={block.id} className="flex items-center">
                  {/* Block */}
                  <animated.div 
                    style={getSpringProps(index)}
                    className={`blockchain-block p-5 w-72 flex-shrink-0 rounded-xl shadow-lg relative`}
                    onMouseEnter={() => setActiveBlock(index)}
                    onMouseLeave={() => setActiveBlock(null)}
                  >
                    <div className={`absolute inset-0 rounded-xl ${block.dashed ? 'border-2 border-dashed border-badir-rose' : ''}`} 
                         style={{ backgroundColor: block.color, opacity: 0.2 }} 
                    />
                    
                    <div className={`absolute top-0 left-0 h-2 w-full rounded-t-xl`} 
                         style={{ backgroundColor: block.color, opacity: 0.7 }} 
                    />
                    
                    <div className="relative z-10 backdrop-blur-sm bg-badir-cream/50 rounded-lg p-5">
                      <div className="flex items-center mb-4">
                        <div className="bg-badir-rose rounded-full p-2 mr-3 text-white flex items-center justify-center w-12 h-12 shadow-md">
                          <i className="fas fa-cube text-base"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-badir-mocha text-lg">{block.name}</h4>
                          {block.id === "new" && (
                            <motion.span 
                              className="text-xs text-badir-rose font-medium"
                              animate={controls}
                            >
                              Mining in progress...
                            </motion.span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 font-mono text-sm shadow-sm">
                        <div className="flex justify-between mb-2">
                          <span className="text-badir-rose font-bold">Hash:</span>
                          <span>{block.hash}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span className="text-badir-rose font-bold">Prev:</span>
                          <span>{block.prev}</span>
                        </div>
                        
                        {block.amount !== null && (
                          <div className="mt-3 pt-3 border-t border-badir-tan/30">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">ETH:</span>
                              <span>{block.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium">From:</span>
                              <span>{block.from}</span>
                            </div>
                          </div>
                        )}
                        
                        {block.details && (
                          <div className="mt-3 pt-3 border-t border-badir-tan/30 text-center font-medium">
                            {block.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </animated.div>
                  
                  {/* Arrow connector (except after last block) */}
                  {index < blocks.length - 1 && (
                    <motion.div 
                      className="flex items-center px-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: false }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-2 bg-badir-rose rounded-full blur-md opacity-30"></div>
                        <i className="fas fa-long-arrow-alt-right text-badir-rose text-3xl relative"></i>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Blockchain explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-badir-sand/30 to-badir-cream/60 backdrop-blur-sm border border-badir-tan/30 mt-8"
          >
            <h3 className="text-2xl font-semibold text-badir-mocha mb-4 tech-highlight inline-block">How Blockchain Works</h3>
            <p className="text-badir-mocha/90 mb-3">
              A blockchain is a chain of blocks, each containing transaction data that is cryptographically linked to the previous block. 
              For the Badir platform, each transaction represents a donation that is:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-badir-mocha/90">
              <li><span className="font-medium">Verified</span> by multiple computers in the network</li>
              <li><span className="font-medium">Sealed</span> with a unique cryptographic hash</li>
              <li><span className="font-medium">Linked</span> to all previous transactions</li>
              <li><span className="font-medium">Permanent</span> and cannot be modified or deleted</li>
            </ul>
            <div className="flex justify-end mt-2">
              <div className="text-sm text-badir-rose/80 italic">
                Hover over each block to see details
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide3Blockchain;
