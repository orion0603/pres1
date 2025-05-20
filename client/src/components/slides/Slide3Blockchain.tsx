import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const Slide3Blockchain = () => {
  const blockchainRef = useRef<HTMLDivElement>(null);
  
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

  useEffect(() => {
    // Add horizontal scroll with mouse wheel for blockchain visualization
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
    <section id="slide3" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Visualizing Blockchain
        </h2>
        
        <p className="text-xl text-badir-mocha mb-12 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          Each donation is recorded as a block in a transparent, immutable chain—creating a permanent, public ledger of all transactions.
        </p>
        
        {/* Blockchain Visualization */}
        <div className="overflow-x-auto pb-6" ref={blockchainRef}>
          <div className="flex flex-nowrap space-x-4 min-w-max">
            {/* Genesis Block */}
            <motion.div 
              className="blockchain-block bg-badir-sand rounded-xl p-6 shadow-md w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <div className="text-center mb-2">
                <div className="bg-badir-rose inline-block rounded-full p-2 mb-2 text-white">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <h4 className="font-semibold">Genesis Block</h4>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                <p className="font-mono"><span className="text-badir-rose">Hash:</span> 0000abc...</p>
                <p className="font-mono"><span className="text-badir-rose">Prev:</span> None</p>
                <p className="mt-2 text-center text-xs">(Platform Creation)</p>
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <i className="fas fa-long-arrow-alt-right text-badir-rose text-2xl"></i>
            </motion.div>
            
            {/* Block 1 */}
            <motion.div 
              className="blockchain-block bg-badir-sand rounded-xl p-6 shadow-md w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <div className="text-center mb-2">
                <div className="bg-badir-rose inline-block rounded-full p-2 mb-2 text-white">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <h4 className="font-semibold">Block #1</h4>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                <p className="font-mono"><span className="text-badir-rose">Hash:</span> 0000def...</p>
                <p className="font-mono"><span className="text-badir-rose">Prev:</span> 0000abc...</p>
                <p className="mt-2">Donation: 0.5 ETH</p>
                <p>From: 0x71a...3bd</p>
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              viewport={{ once: false }}
            >
              <i className="fas fa-long-arrow-alt-right text-badir-rose text-2xl"></i>
            </motion.div>
            
            {/* Block 2 */}
            <motion.div 
              className="blockchain-block bg-badir-sand rounded-xl p-6 shadow-md w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
            >
              <div className="text-center mb-2">
                <div className="bg-badir-rose inline-block rounded-full p-2 mb-2 text-white">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <h4 className="font-semibold">Block #2</h4>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                <p className="font-mono"><span className="text-badir-rose">Hash:</span> 0000ghi...</p>
                <p className="font-mono"><span className="text-badir-rose">Prev:</span> 0000def...</p>
                <p className="mt-2">Donation: 1.2 ETH</p>
                <p>From: 0x82b...47f</p>
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              viewport={{ once: false }}
            >
              <i className="fas fa-long-arrow-alt-right text-badir-rose text-2xl"></i>
            </motion.div>
            
            {/* Block 3 */}
            <motion.div 
              className="blockchain-block bg-badir-sand rounded-xl p-6 shadow-md w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
            >
              <div className="text-center mb-2">
                <div className="bg-badir-rose inline-block rounded-full p-2 mb-2 text-white">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <h4 className="font-semibold">Block #3</h4>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                <p className="font-mono"><span className="text-badir-rose">Hash:</span> 0000jkl...</p>
                <p className="font-mono"><span className="text-badir-rose">Prev:</span> 0000ghi...</p>
                <p className="mt-2">Donation: 0.8 ETH</p>
                <p>From: 0x93c...52e</p>
              </div>
            </motion.div>
            
            {/* Arrow */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              viewport={{ once: false }}
            >
              <i className="fas fa-long-arrow-alt-right text-badir-rose text-2xl"></i>
            </motion.div>
            
            {/* New Block */}
            <motion.div 
              className="blockchain-block bg-badir-rose bg-opacity-20 border-2 border-dashed border-badir-rose rounded-xl p-6 shadow-md w-64 flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false }}
            >
              <div className="text-center mb-2">
                <div className="bg-badir-rose inline-block rounded-full p-2 mb-2 text-white">
                  <i className="fas fa-cube text-xl"></i>
                </div>
                <h4 className="font-semibold">New Block</h4>
              </div>
              <div className="bg-white bg-opacity-60 rounded-lg p-3 text-sm">
                <p className="font-mono"><span className="text-badir-rose">Hash:</span> Calculating...</p>
                <p className="font-mono"><span className="text-badir-rose">Prev:</span> 0000jkl...</p>
                <p className="mt-2">Donation: ? ETH</p>
                <p>From: ?</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-12 max-w-3xl" data-aos="fade-up">
          <h3 className="text-2xl font-semibold text-badir-mocha mb-4">Key Blockchain Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-badir-sand rounded-lg p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <i className={`fas ${feature.icon} text-badir-rose mr-2`}></i>
                  <span className="font-medium">{feature.title}</span>
                </div>
                <p className="text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide3Blockchain;
