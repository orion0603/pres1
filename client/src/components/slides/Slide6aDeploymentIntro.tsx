import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Simplified deployment animation component
const DeploymentAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1000),
      setTimeout(() => setStep(2), 2500),
      setTimeout(() => setStep(3), 4000),
      setTimeout(() => setStep(4), 5500),
      setTimeout(() => setStep(5), 7000),
      setTimeout(() => setShowSummary(true), 8500)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-badir-sand/90 backdrop-blur-sm rounded-xl border-2 border-badir-tan/30 shadow-xl p-8 relative">
        {/* Simple grid background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#72383D" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Deployment flow path - enhanced progress bar */}
        <div className="relative w-full h-16 my-16 z-10">
          <div className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 bg-gray-200 rounded-full shadow-inner"></div>
          
          <motion.div 
            className="absolute inset-0 h-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-badir-tan via-badir-rose to-badir-rose rounded-full origin-left shadow-md"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step / 5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          ></motion.div>
          
          {/* Step markers */}
          {[1, 2, 3, 4, 5].map((markerStep) => (
            <motion.div
              key={markerStep}
              className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center
                ${step >= markerStep ? 'bg-badir-rose text-white' : 'bg-white text-gray-400 border-2 border-gray-300'}`}
              style={{ left: `${(markerStep - 1) * 25}%` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: step >= markerStep ? 1 : 0.8, 
                opacity: 1,
                boxShadow: step >= markerStep ? "0 0 15px rgba(114, 56, 61, 0.6)" : "0 2px 5px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.5, delay: 0.1 * markerStep }}
            >
              {step > markerStep ? (
                <i className="fas fa-check text-base"></i>
              ) : (
                <span className="text-base font-medium">{markerStep}</span>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Step labels with details */}
        <div className="relative w-full flex justify-between mb-16 z-10">
          {[
            { 
              label: "Contract Compilation", 
              icon: "fa-file-code",
              details: "Converting Solidity code to bytecode that runs on Ethereum Virtual Machine"
            },
            { 
              label: "Network Connection", 
              icon: "fa-network-wired",
              details: "Connecting to Ethereum network via RPC endpoint (Ganache, Infura, etc.)"
            },
            { 
              label: "Transaction Preparation", 
              icon: "fa-cogs",
              details: "Creating transaction with bytecode, gas limits, and signing with private key"
            },
            { 
              label: "Blockchain Processing", 
              icon: "fa-cube",
              details: "Miners validate transaction and include it in a new block on the chain"
            },
            { 
              label: "Deployment Confirmation", 
              icon: "fa-check-circle",
              details: "Contract confirmed on blockchain with unique address for future interactions"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="w-40 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: step >= idx + 1 ? 1 : 0.4, 
                y: 0,
                scale: step === idx + 1 ? [1, 1.05, 1] : 1
              }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * (idx + 1),
                scale: { repeat: step === idx + 1 ? Infinity : 0, duration: 1.5 }
              }}
            >
              <div 
                className={`w-20 h-20 rounded-full mb-3 flex items-center justify-center shadow-md
                  ${step >= idx + 1 ? 'bg-badir-rose/20 border-2 border-badir-rose/30' : 'bg-gray-100 border border-gray-200'}`}
              >
                <i className={`fas ${item.icon} text-3xl ${step >= idx + 1 ? 'text-badir-rose' : 'text-gray-400'}`}></i>
              </div>
              <div className={`text-base font-medium mb-1 ${step >= idx + 1 ? 'text-badir-mocha' : 'text-gray-400'}`}>
                {item.label}
              </div>
              <div className={`text-xs px-1 ${step >= idx + 1 ? 'text-badir-mocha/80' : 'text-gray-400'}`}>
                {item.details}
              </div>
              {step === idx + 1 && (
                <motion.div 
                  className="w-3 h-3 bg-badir-rose rounded-full mt-2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Animated blockchain blocks */}
        <div className="w-full flex justify-center mt-4 mb-10">
          <div className="flex space-x-6">
            {[0, 1, 2, 3, 4].map((blockIndex) => (
              <motion.div
                key={blockIndex}
                className={`flex flex-col items-center`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: step >= 3 ? 1 : 0,
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.3 * blockIndex },
                }}
              >
                <motion.div 
                  className={`w-20 h-20 flex items-center justify-center rounded-lg shadow-md
                    ${step >= 4 && blockIndex === 0 
                      ? 'bg-badir-neon/20 border-2 border-badir-neon/50' 
                      : 'bg-badir-cream/70 border border-badir-tan/30'}`}
                  animate={{ 
                    y: step >= 3 
                      ? (blockIndex % 2 === 0 ? [0, -12, 0] : [0, -8, 0]) 
                      : 0
                  }}
                  transition={{ 
                    y: { 
                      repeat: Infinity, 
                      duration: 2 + (blockIndex * 0.3), 
                      delay: blockIndex * 0.2,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <i className={`fas fa-cube text-2xl ${step >= 4 && blockIndex === 0 ? 'text-green-600' : 'text-badir-mocha/80'}`}></i>
                </motion.div>
                <div className="mt-2 text-xs font-mono">
                  {step >= 4 && blockIndex === 0 ? (
                    <span className="text-green-600 font-bold">NEW BLOCK</span>
                  ) : (
                    <span className="text-badir-mocha/70">#{(16428790 - blockIndex).toString().slice(-6)}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Flying data packets - more visible */}
        <AnimatePresence>
          {step >= 3 && step < 5 && (
            <>
              {[0, 1, 2].map((packetIndex) => (
                <motion.div
                  key={`packet-${packetIndex}`}
                  className={`absolute z-20 rounded-lg border-2 flex items-center justify-center p-1
                    ${step >= 4 ? 'border-green-400 bg-green-50' : 'border-badir-rose bg-badir-rose/10'}`}
                  initial={{ 
                    left: '45%', 
                    top: '35%',
                    opacity: 0,
                    scale: 0.8,
                    width: '36px',
                    height: '36px'
                  }}
                  animate={{ 
                    left: ['45%', '55%', '65%', '75%'],
                    top: ['35%', '35%', '35%', '35%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1.2, 1.2, 0.8],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: packetIndex * 0.7,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  exit={{ opacity: 0 }}
                >
                  <i className={`fas fa-code text-base ${step >= 4 ? 'text-green-600' : 'text-badir-rose'}`}></i>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Contract deployment summary card at the bottom */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSummary ? 1 : 0, y: showSummary ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-badir-cream/90 rounded-lg border-2 border-badir-neon/50 p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-badir-neon/20 flex items-center justify-center mr-3 shadow-md">
                <i className="fas fa-check-circle text-badir-neon text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-badir-mocha">Contract Successfully Deployed</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-badir-mocha/70 mb-2">Contract Address:</div>
                <motion.div
                  className="font-mono text-sm bg-badir-neon/10 p-3 rounded-md border-2 border-badir-neon/30 shadow-sm text-badir-mocha"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(22, 163, 74, 0)",
                      "0 0 10px rgba(22, 163, 74, 0.3)",
                      "0 0 0 rgba(22, 163, 74, 0)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546
                </motion.div>
              </div>
              
              <div>
                <div className="text-sm font-medium text-badir-mocha/70 mb-2">Deployment Summary:</div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-3 bg-badir-sand/10 p-3 rounded-md border border-badir-sand/30 shadow-sm">
                  <div className="text-sm font-medium text-badir-mocha/80">Network:</div>
                  <div className="text-sm text-badir-mocha">Ganache (8545)</div>
                  
                  <div className="text-sm font-medium text-badir-mocha/80">Gas Used:</div>
                  <div className="text-sm text-badir-mocha">138,241 units</div>
                  
                  <div className="text-sm font-medium text-badir-mocha/80">Deployer:</div>
                  <div className="text-sm text-badir-mocha font-mono">0xAbC4...f290</div>
                  
                  <div className="text-sm font-medium text-badir-mocha/80">Status:</div>
                  <div className="text-sm text-green-600 font-semibold flex items-center">
                    <i className="fas fa-check-circle mr-1"></i> Confirmed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Slide6aDeploymentIntro: React.FC = () => {
  return (
    <section id="slide6a" className="slide relative overflow-hidden w-full h-full">
      {/* Background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream to-badir-cream/90 -z-10" />
      
      <div className="slide-container w-full h-full flex flex-col">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-1 mt-0 pt-1">
            <h2 className="text-2xl font-bold text-badir-mocha">
              Smart Contract <span className="text-badir-rose">Deployment</span>
            </h2>
            <div className="h-0.5 w-28 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto" />
          </div>
          
          <div className="w-full flex-1 flex items-center justify-center">
            {/* Visual Deployment Animation */}
            <motion.div
              className="w-full h-full" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DeploymentAnimation />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;