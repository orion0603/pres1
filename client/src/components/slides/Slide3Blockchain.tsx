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
  
  const features = [
    {
      icon: "fa-lock",
      title: "Immutability",
      description: "Once recorded, data cannot be altered or deleted, ensuring donation records remain permanent."
    },
    {
      icon: "fa-eye",
      title: "Transparency",
      description: "All transactions are public and verifiable by anyone, ensuring complete visibility."
    },
    {
      icon: "fa-network-wired",
      title: "Decentralization",
      description: "No single entity controls the network, making it resistant to corruption and censorship."
    },
    {
      icon: "fa-history",
      title: "Traceability",
      description: "Complete history of all donations is maintained, allowing for full audit trails."
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
          
          {/* Interactive blockchain visualization */}
          <div className="overflow-x-auto pb-6 mb-12" ref={blockchainRef}>
            <div className="flex flex-nowrap space-x-2 min-w-max py-8">
              {blocks.map((block, index) => (
                <div key={block.id} className="flex items-center">
                  {/* Block */}
                  <animated.div 
                    style={getSpringProps(index)}
                    className={`blockchain-block p-5 w-64 flex-shrink-0 rounded-xl shadow-md relative`}
                    onMouseEnter={() => setActiveBlock(index)}
                    onMouseLeave={() => setActiveBlock(null)}
                  >
                    <div className={`absolute inset-0 rounded-xl ${block.dashed ? 'border-2 border-dashed border-badir-rose' : ''}`} 
                         style={{ backgroundColor: block.color, opacity: 0.2 }} 
                    />
                    
                    <div className={`absolute top-0 left-0 h-2 w-full rounded-t-xl`} 
                         style={{ backgroundColor: block.color, opacity: 0.6 }} 
                    />
                    
                    <div className="relative z-10 backdrop-blur-sm bg-badir-cream/40 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-badir-rose/90 rounded-full p-2 mr-3 text-white flex items-center justify-center w-10 h-10">
                          <i className="fas fa-cube text-sm"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-badir-mocha">{block.name}</h4>
                          {block.id === "new" && (
                            <motion.span 
                              className="text-xs text-badir-rose"
                              animate={controls}
                            >
                              Mining in progress...
                            </motion.span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 font-mono text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="text-badir-rose">Hash:</span>
                          <span>{block.hash}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span className="text-badir-rose">Prev:</span>
                          <span>{block.prev}</span>
                        </div>
                        
                        {block.amount !== null && (
                          <div className="mt-2 pt-2 border-t border-badir-tan/30">
                            <div className="flex justify-between">
                              <span>ETH:</span>
                              <span>{block.amount}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>From:</span>
                              <span>{block.from}</span>
                            </div>
                          </div>
                        )}
                        
                        {block.details && (
                          <div className="mt-2 pt-2 border-t border-badir-tan/30 text-center">
                            {block.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </animated.div>
                  
                  {/* Arrow connector (except after last block) */}
                  {index < blocks.length - 1 && (
                    <motion.div 
                      className="flex items-center px-2"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      viewport={{ once: false }}
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 bg-badir-rose rounded-full blur-sm opacity-30"></div>
                        <i className="fas fa-long-arrow-alt-right text-badir-rose text-2xl relative"></i>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Key blockchain features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl p-6 bg-gradient-to-br from-badir-sand/30 to-badir-cream/60 backdrop-blur-sm border border-badir-tan/30"
          >
            <h3 className="text-2xl font-semibold text-badir-mocha mb-6 tech-highlight inline-block">Key Blockchain Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <motion.div 
                  key={i}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (i * 0.1) }}
                  viewport={{ once: false, amount: 0.5 }}
                >
                  <div className="bg-badir-rose/90 rounded-full p-3 text-white flex-shrink-0 shadow-md">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{feature.title}</h4>
                    <p className="text-sm text-badir-mocha/90">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide3Blockchain;
