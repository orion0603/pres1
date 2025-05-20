import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Visual animated deployment process component for full page
const DeploymentAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [contractReady, setContractReady] = useState(false);
  const [networkReady, setNetworkReady] = useState(false);
  const [prepReady, setPrepReady] = useState(false);
  const [sendingTx, setSendingTx] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  // Animation timing slightly accelerated
  useEffect(() => {
    const timers = [
      setTimeout(() => { setStep(1); setContractReady(true); }, 1000),
      setTimeout(() => { setStep(2); setNetworkReady(true); }, 2500),
      setTimeout(() => { setStep(3); setPrepReady(true); }, 4000),
      setTimeout(() => { setStep(4); setSendingTx(true); }, 5500),
      setTimeout(() => { setStep(5); setDeployed(true); }, 8000),
      setTimeout(() => { setShowSummary(true); }, 9500)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Background grid pattern */}
      <div className="absolute inset-0 z-10">
        <svg width="100%" height="100%" className="opacity-20">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(114, 56, 61, 0.3)" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Main animated deployment flow path */}
      <div className="w-full h-full relative flex-1">
        <svg className="absolute inset-0 z-20" width="100%" height="100%" preserveAspectRatio="none">
          <motion.path
            d="M 5%,50% C 20%,30% 35%,70% 50%,50% S 80%,30% 95%,50%"
            fill="none"
            stroke="#72383D"
            strokeWidth="3"
            strokeDasharray="8,8"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 0.2, 0.4, 0.6, 0.8, 1],
              strokeDashoffset: [0, -16]
            }}
            transition={{ 
              pathLength: { 
                duration: 10, 
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                ease: "easeInOut" 
              },
              strokeDashoffset: {
                repeat: Infinity,
                duration: 1,
                ease: "linear"
              }
            }}
          />
        </svg>
        
        {/* Step 1: Smart Contract Compilation */}
        <motion.div 
          className="absolute top-[45%] left-[5%] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={`w-48 h-48 rounded-xl ${contractReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 ${contractReady ? 'border-badir-rose/30' : 'border-gray-200'} transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${contractReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: contractReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: contractReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-file-code text-3xl ${contractReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha text-lg">Smart Contract</h4>
            <motion.div 
              className="mt-3 py-1 px-4 rounded-full bg-badir-rose/10 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: contractReady ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-badir-rose">✓</span> Compiled
            </motion.div>
          </div>
        </motion.div>
        
        {/* Step 2: Network Connection */}
        <motion.div 
          className="absolute top-[30%] left-[27%] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className={`w-48 h-48 rounded-xl ${networkReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 ${networkReady ? 'border-badir-rose/30' : 'border-gray-200'} transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${networkReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: networkReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: networkReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-network-wired text-3xl ${networkReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha text-lg">Blockchain Network</h4>
            <motion.div 
              className="mt-3 py-1 px-4 rounded-full bg-badir-rose/10 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: networkReady ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-badir-rose">✓</span> Connected
            </motion.div>
          </div>
        </motion.div>
        
        {/* Step 3: Preparing Deployment */}
        <motion.div 
          className="absolute top-[48%] left-[50%] z-30 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 2.5 }}
        >
          <div className={`w-48 h-48 rounded-xl ${prepReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 ${prepReady ? 'border-badir-rose/30' : 'border-gray-200'} transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${prepReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: prepReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: prepReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-cogs text-3xl ${prepReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha text-lg">ABI & Bytecode</h4>
            <motion.div 
              className="mt-3 py-1 px-4 rounded-full bg-badir-rose/10 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: prepReady ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-badir-rose">✓</span> Prepared
            </motion.div>
          </div>
        </motion.div>
        
        {/* Step 4: Deploy Contract */}
        <motion.div 
          className="absolute top-[30%] left-[73%] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 4 }}
        >
          <div className={`w-48 h-48 rounded-xl ${deployed ? 'bg-white' : sendingTx ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 ${deployed ? 'border-green-300' : sendingTx ? 'border-yellow-300' : 'border-gray-200'} transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${deployed ? 'bg-green-100' : sendingTx ? 'bg-yellow-100' : 'bg-gray-200'}`}
              animate={{ 
                scale: deployed ? [1, 1.1, 1] : sendingTx ? [1, 1.05, 1] : 1,
                rotate: sendingTx && !deployed ? 360 : 0
              }}
              transition={{ 
                duration: deployed ? 1 : 2, 
                repeat: deployed ? Infinity : sendingTx ? Infinity : 0, 
                repeatType: "reverse",
                ease: "linear"
              }}
            >
              <i className={`${deployed ? 'fas fa-check-circle' : sendingTx ? 'fas fa-spinner fa-spin' : 'fas fa-cube'} text-3xl ${deployed ? 'text-green-500' : sendingTx ? 'text-yellow-500' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha text-lg">Deployment</h4>
            <motion.div 
              className="mt-3 py-1 px-4 rounded-full bg-green-100 text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: deployed ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-green-600">✓</span> Confirmed
            </motion.div>
          </div>
        </motion.div>
        
        {/* Step 5: Contract on Blockchain */}
        <motion.div 
          className="absolute top-[50%] left-[95%] z-30 -translate-x-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: deployed ? 1 : 0, y: deployed ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 7.5 }}
        >
          <div className="w-48 rounded-xl bg-white shadow-lg flex flex-col items-center justify-center p-4 border-2 border-green-300">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
              <i className="fas fa-link text-3xl text-green-500"></i>
            </div>
            <h4 className="font-medium text-center text-badir-mocha text-lg">On-Chain</h4>
            <div className="mt-2 text-center">
              <div className="text-xs text-badir-mocha/70">Contract Address:</div>
              <motion.div 
                className="font-mono text-xs p-1 bg-badir-sand/10 rounded mt-1 border border-badir-sand/30"
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(114, 56, 61, 0)",
                    "0 0 5px rgba(114, 56, 61, 0.3)",
                    "0 0 0 rgba(114, 56, 61, 0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                0x9eAe...D330546
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Blockchain blocks animation - showed in middle bottom */}
        <motion.div 
          className="absolute bottom-[25%] left-[50%] -translate-x-1/2 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 4 }}
        >
          <div className="flex space-x-3">
            {[0, 1, 2, 3, 4].map((blockIndex) => (
              <motion.div 
                key={blockIndex}
                className={`flex flex-col items-center justify-center p-2 rounded-lg ${blockIndex === 0 && deployed ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'}`}
                animate={{ 
                  y: blockIndex % 2 === 0 ? [0, -10, 0] : [0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2 + (blockIndex * 0.3),
                  delay: blockIndex * 0.2
                }}
              >
                <div className="w-12 h-12 bg-badir-sand/30 rounded-md flex items-center justify-center mb-1">
                  <i className="fas fa-cube text-badir-mocha/80 text-xl"></i>
                </div>
                <div className="text-xs font-mono">
                  {blockIndex === 0 && deployed ? (
                    <div className="text-green-700 font-semibold">Latest</div>
                  ) : (
                    <div className="text-badir-mocha/70">#{(16428790 - blockIndex).toString().slice(-4)}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Data packets animation - flying along the path */}
        <AnimatePresence>
          {sendingTx && (
            <>
              {[0, 1, 2, 3].map((packetIndex) => (
                <motion.div
                  key={`packet-${packetIndex}`}
                  className="absolute z-20 rounded-full flex items-center justify-center"
                  initial={{ 
                    left: '50%', 
                    top: '50%',
                    opacity: 0,
                    scale: 0.8,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'rgba(114, 56, 61, 0.2)',
                    borderColor: 'rgba(114, 56, 61, 0.4)',
                    borderWidth: '2px'
                  }}
                  animate={{ 
                    left: ['50%', '73%', '85%', '95%'],
                    top: ['50%', '30%', '40%', '50%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1.2, 1, 0.8],
                    backgroundColor: deployed ? 'rgba(34, 197, 94, 0.2)' : 'rgba(114, 56, 61, 0.2)',
                    borderColor: deployed ? 'rgba(34, 197, 94, 0.4)' : 'rgba(114, 56, 61, 0.4)'
                  }}
                  transition={{ 
                    duration: 2,
                    delay: packetIndex * 0.5,
                    repeat: deployed ? 0 : Infinity,
                    repeatDelay: 1
                  }}
                  exit={{ opacity: 0 }}
                >
                  <i className={`fas fa-code text-sm ${deployed ? 'text-green-500' : 'text-badir-rose'}`}></i>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Contract deployment summary (shown at the end) */}
        <motion.div 
          className="absolute bottom-5 left-0 right-0 px-8 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSummary ? 1 : 0, y: showSummary ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-badir-tan/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <i className="fas fa-check-circle text-green-600 text-lg"></i>
              </div>
              <h4 className="font-semibold text-badir-mocha text-xl">Contract Successfully Deployed</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="font-mono text-sm bg-badir-sand/10 rounded p-3 border border-badir-sand/30">
                <div className="text-sm text-badir-mocha/70 mb-2 font-sans">Contract Address:</div>
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(114, 56, 61, 0)",
                      "0 0 5px rgba(114, 56, 61, 0.3)",
                      "0 0 0 rgba(114, 56, 61, 0)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="break-all"
                >
                  0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546
                </motion.div>
              </div>
              
              <div className="bg-badir-sand/10 rounded p-3 border border-badir-sand/30">
                <div className="text-sm text-badir-mocha/70 mb-2">Deployment Summary:</div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                  <div className="text-badir-mocha/70">Network:</div>
                  <div className="text-badir-mocha">Ganache (8545)</div>
                  
                  <div className="text-badir-mocha/70">Gas Used:</div>
                  <div className="text-badir-mocha">138,241 units</div>
                  
                  <div className="text-badir-mocha/70">Deployer:</div>
                  <div className="text-badir-mocha font-mono">0xAbC4...f290</div>
                  
                  <div className="text-badir-mocha/70">Status:</div>
                  <div className="text-green-600 font-medium">Confirmed</div>
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
      
      <div className="slide-container flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-6xl"
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
            {/* Visual Deployment Animation */}
            <motion.div
              className="w-full" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ height: "calc(100vh - 300px)", minHeight: "500px" }}
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