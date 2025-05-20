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
      color: "#00D474" // badir-rose (now green)
    },
    {
      id: "block1",
      name: "Block #1",
      hash: "0000def...",
      prev: "0000abc...",
      details: null,
      amount: 0.5,
      from: "0x71a...3bd",
      color: "#00A7E1" // badir-tan (now blue)
    },
    {
      id: "block2",
      name: "Block #2",
      hash: "0000ghi...",
      prev: "0000def...",
      details: null,
      amount: 1.2,
      from: "0x82b...47f",
      color: "#00A7E1" // badir-tan (now blue)
    },
    {
      id: "block3",
      name: "Block #3",
      hash: "0000jkl...",
      prev: "0000ghi...",
      details: null,
      amount: 0.8,
      from: "0x93c...52e",
      color: "#00A7E1" // badir-tan (now blue)
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
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container flex flex-col h-full justify-center">
        <motion.div 
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-5xl font-bold tech-gradient-text mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Visualizing Blockchain
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.p 
              className="text-xl text-badir-mocha mb-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Each donation is recorded as a block in a transparent, immutable chain—creating a permanent, public ledger of all transactions.
            </motion.p>
          </div>
          
          {/* Enhanced diagram instructions */}
          <motion.div
            className="bg-badir-sand/90 backdrop-blur-sm rounded-xl p-4 mb-8 max-w-3xl mx-auto text-center shadow-md border border-badir-tan/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-1 text-badir-mocha">
              <i className="fas fa-info-circle text-badir-rose mr-2 text-lg"></i>
              <h3 className="font-medium">How Blockchain Works</h3>
            </div>
            <p className="text-sm text-badir-mocha">
              Blocks are linked through cryptographic hashes, creating an unbreakable chain of transactions.
              <span className="ml-1 text-badir-rose font-medium">Hover over each block to see details</span> and
              <span className="ml-1 text-badir-rose font-medium">scroll horizontally</span> to view the entire chain.
            </p>
          </motion.div>
          
          {/* Interactive blockchain visualization - optimized for full screen */}
          <div className="w-full overflow-x-auto pb-10 px-4" ref={blockchainRef}>            
            <div className="flex flex-nowrap space-x-6 min-w-max py-8 px-4 justify-center">
              {blocks.map((block, index) => (
                <div key={block.id} className="flex items-center">
                  {/* Block */}
                  <animated.div 
                    style={getSpringProps(index)}
                    className={`blockchain-block p-6 w-80 flex-shrink-0 rounded-xl shadow-lg relative`}
                    onMouseEnter={() => setActiveBlock(index)}
                    onMouseLeave={() => setActiveBlock(null)}
                  >
                    <div className={`absolute inset-0 rounded-xl ${block.dashed ? 'border-2 border-dashed border-badir-rose' : ''}`} 
                         style={{ backgroundColor: block.color, opacity: 0.2 }} 
                    />
                    
                    <div className={`absolute top-0 left-0 h-3 w-full rounded-t-xl`} 
                         style={{ backgroundColor: block.color, opacity: 0.7 }} 
                    />
                    
                    <div className="relative z-10 backdrop-blur-sm bg-badir-sand/40 rounded-lg p-6">
                      <div className="flex items-center mb-5">
                        <div className="bg-badir-rose rounded-full p-3 mr-4 text-badir-mocha flex items-center justify-center w-14 h-14 shadow-md">
                          <i className="fas fa-cube text-lg"></i>
                        </div>
                        <div>
                          <h4 className="font-bold text-badir-mocha text-xl">{block.name}</h4>
                          {block.id === "new" && (
                            <motion.span 
                              className="text-sm text-badir-rose font-medium"
                              animate={controls}
                            >
                              Mining in progress...
                            </motion.span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-badir-sand/60 backdrop-blur-sm rounded-lg p-5 font-mono text-sm shadow-md">
                        <div className="flex justify-between mb-3">
                          <span className="text-badir-rose font-bold">Hash:</span>
                          <span className="text-badir-mocha">{block.hash}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span className="text-badir-rose font-bold">Prev:</span>
                          <span className="text-badir-mocha">{block.prev}</span>
                        </div>
                        
                        {block.amount !== null && (
                          <div className="mt-4 pt-4 border-t border-badir-tan/30">
                            <div className="flex justify-between mb-2">
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
                          <div className="mt-4 pt-4 border-t border-badir-tan/30 text-center font-medium">
                            {block.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </animated.div>
                  
                  {/* Arrow connector (except after last block) */}
                  {index < blocks.length - 1 && (
                    <motion.div 
                      className="flex items-center px-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: false }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-3 bg-badir-rose rounded-full blur-md opacity-30"></div>
                        <i className="fas fa-long-arrow-alt-right text-badir-rose text-4xl relative"></i>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-2 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex items-center text-sm text-badir-mocha/80">
              <div className="w-3 h-3 rounded-full bg-badir-rose mr-2"></div>
              <span>Genesis Block</span>
            </div>
            <div className="flex items-center text-sm text-badir-mocha/80">
              <div className="w-3 h-3 rounded-full bg-badir-tan mr-2"></div>
              <span>Confirmed Donations</span>
            </div>
            <div className="flex items-center text-sm text-badir-mocha/80">
              <div className="w-3 h-3 border border-dashed border-badir-rose rounded-full mr-2"></div>
              <span>Block in Progress</span>
            </div>
            <div className="flex items-center text-sm text-badir-mocha/80">
              <i className="fas fa-link text-badir-rose text-xs mr-2"></i>
              <span>Hash-Based Link</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide3Blockchain;
