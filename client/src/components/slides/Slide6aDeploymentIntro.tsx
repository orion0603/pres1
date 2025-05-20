import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Terminal line component
const TerminalLine = ({ text, type, delay = 0, highlight = false }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);
  
  if (!visible) return null;
  
  if (type === 'spinner') {
    return (
      <div className="flex items-center">
        <motion.span 
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="inline-block mr-2 text-[#AC9C8D]"
        >
          ⌛
        </motion.span>
        <span>{text}</span>
      </div>
    );
  }
  
  if (type === 'success') {
    return (
      <div className="flex items-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-block mr-2 text-[#72383D] font-bold"
        >
          ✓
        </motion.span>
        <span className={highlight ? "font-bold text-[#72383D]" : ""}>{text}</span>
      </div>
    );
  }
  
  if (type === 'command') {
    return (
      <div className="flex items-start">
        <span className="inline-block mr-2 text-[#D1C7BD]">{'>'}</span>
        <span>{text}</span>
      </div>
    );
  }
  
  return <div>{text}</div>;
};

// Typing animation component
const TypeWriter = ({ text, delay = 0, onComplete = () => {} }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay);
    
    return () => clearTimeout(startTimer);
  }, [delay]);
  
  useEffect(() => {
    if (!started) return;
    
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, 40);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [displayedText, text, started, onComplete]);
  
  return (
    <div className="flex">
      <span className="inline-block mr-2 text-[#D1C7BD]">{'>'}</span>
      <span>{displayedText}</span>
      {displayedText.length < text.length && (
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block ml-0.5 w-2 h-4 bg-[#EFE9E1]"
        />
      )}
    </div>
  );
};

// Deployment Animation Component
const DeploymentAnimation = () => {
  const [stage, setStage] = useState(0);
  const [showAddress, setShowAddress] = useState(false);
  
  // Define the deployment process stages
  const nextStage = () => {
    setStage(prev => prev + 1);
  };
  
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-4xl">
        {/* Terminal Window */}
        <div className="bg-[#322D29] rounded-md overflow-hidden shadow-xl border border-badir-mocha/20 mx-auto">
          {/* Terminal Header */}
          <div className="bg-badir-mocha px-4 py-2 flex items-center">
            <div className="flex space-x-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-[#72383D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#AC9C8D]"></div>
              <div className="w-3 h-3 rounded-full bg-[#D1C7BD]"></div>
            </div>
            <div className="text-[#EFE9E1] text-sm font-medium">Smart Contract Deployment</div>
          </div>
          
          {/* Terminal Content */}
          <div 
            className="p-6 font-mono text-[#EFE9E1] h-[400px] overflow-auto"
            style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            <AnimatePresence>
              {/* Stage 0 - Compiling */}
              {stage >= 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stage === 0 ? (
                    <TypeWriter 
                      text="Compiling SmartContract.sol..." 
                      onComplete={() => setTimeout(nextStage, 800)}
                    />
                  ) : (
                    <TerminalLine type="command" text="Compiling SmartContract.sol..." />
                  )}
                </motion.div>
              )}
              
              {/* Stage 1 - Compilation Success */}
              {stage >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1"
                >
                  <TerminalLine type="success" text="Contract compiled successfully" highlight={true} />
                </motion.div>
              )}
              
              {/* Spacer */}
              {stage >= 2 && (
                <div className="h-4"></div>
              )}
              
              {/* Stage 2 - Network Connection */}
              {stage >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stage === 2 ? (
                    <TypeWriter 
                      text="Connecting to Ethereum network..." 
                      onComplete={() => setTimeout(nextStage, 800)}
                    />
                  ) : (
                    <TerminalLine type="command" text="Connecting to Ethereum network..." />
                  )}
                </motion.div>
              )}
              
              {/* Stage 3 - Connection Success */}
              {stage >= 3 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1"
                >
                  <TerminalLine type="success" text="Connected to Ganache (localhost:8545)" highlight={true} />
                </motion.div>
              )}
              
              {/* Spacer */}
              {stage >= 4 && (
                <div className="h-4"></div>
              )}
              
              {/* Stage 4 - Starting Deployment */}
              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stage === 4 ? (
                    <TypeWriter 
                      text="Deploying contract..." 
                      onComplete={() => setTimeout(nextStage, 800)}
                    />
                  ) : (
                    <TerminalLine type="command" text="Deploying contract..." />
                  )}
                </motion.div>
              )}
              
              {/* Stage 5 - Transaction Sent */}
              {stage >= 5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <TerminalLine 
                    type="spinner" 
                    text="Transaction sent: 0xa93f...2bd3" 
                  />
                </motion.div>
              )}
              
              {/* Stage 6 - Waiting for Confirmation */}
              {stage >= 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-1"
                >
                  <TerminalLine 
                    type="spinner" 
                    text="Waiting for confirmations..." 
                  />
                </motion.div>
              )}
              
              {/* Spacer */}
              {stage >= 7 && (
                <div className="h-4"></div>
              )}
              
              {/* Stage 7 - Deployment Success */}
              {stage >= 7 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2"
                >
                  <TerminalLine type="success" text="Smart contract deployed successfully!" highlight={true} />
                </motion.div>
              )}
              
              {/* Stage 8 - Contract Address */}
              {stage >= 8 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-2"
                >
                  <div className="flex">
                    <TerminalLine type="success" text="Contract address: " />
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-2 p-3 bg-[#D1C7BD] text-badir-mocha rounded-md border-l-4 border-[#72383D]"
                  >
                    <motion.div 
                      className="font-mono text-[#322D29] break-all font-bold"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(114, 56, 61, 0)",
                          "0 0 2px rgba(114, 56, 61, 0.5)",
                          "0 0 0px rgba(114, 56, 61, 0)"
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Legend */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 8 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-4 text-sm text-badir-mocha/80"
        >
          <span className="inline-block mx-3">
            <span className="text-[#72383D] font-bold">✓</span> Success
          </span>
          <span className="inline-block mx-3">
            <span className="text-[#AC9C8D]">⌛</span> Processing
          </span>
          <span className="inline-block mx-3">
            <span className="font-mono text-[#72383D]">0x...</span> Contract Address
          </span>
        </motion.div>
      </div>
    </div>
  );
};

// Auto-advance the stages
const AutoAdvanceDeployment = () => {
  const [stageNumber, setStageNumber] = useState(0);
  
  useEffect(() => {
    const delays = [0, 2000, 500, 2000, 500, 1000, 2000, 3000, 1000];
    
    if (stageNumber < 9) {
      const timer = setTimeout(() => {
        setStageNumber(prev => prev + 1);
      }, delays[stageNumber]);
      
      return () => clearTimeout(timer);
    }
  }, [stageNumber]);
  
  return <DeploymentAnimation stage={stageNumber} />;
};

const Slide6aDeploymentIntro = () => {
  return (
    <section id="slide6a" className="slide relative overflow-hidden">
      {/* Background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream to-badir-cream/90 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-5xl font-bold text-badir-mocha mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Smart Contract <span className="text-badir-rose">Deployment</span>
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            <motion.p
              className="text-xl text-badir-mocha/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              "The process of making a smart contract live on the blockchain network."
            </motion.p>
          </div>
          
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-badir-tan/20">
            {/* Interactive Animation */}
            <motion.div
              className="w-full" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ height: "calc(100vh - 300px)", minHeight: "460px" }}
            >
              <AutoAdvanceDeployment />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;