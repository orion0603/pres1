import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Visual animated deployment process component
const DeploymentAnimation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [contractReady, setContractReady] = useState(false);
  const [networkReady, setNetworkReady] = useState(false);
  const [prepReady, setPrepReady] = useState(false);
  const [sendingTx, setSendingTx] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  // Speed up the animation for better user experience
  useEffect(() => {
    const timers = [
      setTimeout(() => { setStep(1); setContractReady(true); }, 800),
      setTimeout(() => { setStep(2); setNetworkReady(true); }, 2000),
      setTimeout(() => { setStep(3); setPrepReady(true); }, 3200),
      setTimeout(() => { setStep(4); setSendingTx(true); }, 4400),
      setTimeout(() => { setStep(5); setDeployed(true); }, 6000),
      setTimeout(() => { setShowSummary(true); }, 7000)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);
  
  return (
    <div className="h-full w-full">
      <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-badir-cream/10 to-white/40 backdrop-blur-sm border border-badir-tan/20 overflow-hidden">
        {/* Blockchain network visualization */}
        <div className="absolute inset-0 z-10">
          <svg width="100%" height="100%" className="opacity-20">
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(114, 56, 61, 0.3)" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Dynamic path for the deployment process */}
        <svg className="absolute inset-0 z-20" width="100%" height="100%">
          <motion.path
            d="M 100,200 Q 250,100 450,200 T 720,100"
            fill="none"
            stroke="#72383D"
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 0.25, 0.5, 0.75, 1],
              opacity: 1 
            }}
            transition={{ 
              duration: 12, 
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: "easeInOut" 
            }}
          />
        </svg>
        
        {/* Step 1: Compiling Contract */}
        <motion.div 
          className="absolute top-[200px] left-[100px] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className={`w-36 h-36 rounded-lg ${contractReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-3 border-2 border-badir-tan/30 transition-all duration-500`}>
            <motion.div 
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${contractReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: contractReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: contractReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-file-code text-2xl ${contractReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha">Smart Contract</h4>
            <motion.div 
              className="mt-2 py-1 px-3 rounded-full bg-badir-rose/10 text-xs font-medium"
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
          className="absolute top-[100px] left-[370px] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <div className={`w-44 h-48 rounded-lg ${networkReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 border-badir-tan/30 transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${networkReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: networkReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: networkReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-network-wired text-2xl ${networkReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha">Ethereum Network</h4>
            <motion.div 
              className="mt-2 py-1 px-3 rounded-full bg-badir-rose/10 text-xs font-medium"
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
          className="absolute top-[200px] left-[480px] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 3.5 }}
        >
          <div className={`w-44 h-48 rounded-lg ${prepReady ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 border-badir-tan/30 transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${prepReady ? 'bg-badir-rose/10' : 'bg-gray-200'}`}
              animate={{ scale: prepReady ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 1, repeat: prepReady ? Infinity : 0, repeatType: "reverse" }}
            >
              <i className={`fas fa-cogs text-2xl ${prepReady ? 'text-badir-rose' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha">ABI & Bytecode</h4>
            <motion.div 
              className="mt-2 py-1 px-3 rounded-full bg-badir-rose/10 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: prepReady ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-badir-rose">✓</span> Loaded
            </motion.div>
          </div>
        </motion.div>
        
        {/* Step 4: Deploy Contract */}
        <motion.div 
          className="absolute top-[100px] left-[720px] z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 6 }}
        >
          <div className={`w-44 h-48 rounded-lg ${deployed ? 'bg-white' : 'bg-gray-100'} shadow-lg flex flex-col items-center justify-center p-4 border-2 border-badir-tan/30 transition-all duration-500`}>
            <motion.div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${deployed ? 'bg-badir-rose/10' : sendingTx ? 'bg-yellow-100' : 'bg-gray-200'}`}
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
              <i className={`${deployed ? 'fas fa-check-circle' : sendingTx ? 'fas fa-sync-alt' : 'fas fa-cube'} text-2xl ${deployed ? 'text-green-500' : sendingTx ? 'text-yellow-500' : 'text-gray-400'}`}></i>
            </motion.div>
            <h4 className="font-medium text-center text-badir-mocha">Deployment</h4>
            <motion.div 
              className="mt-2 py-1 px-3 rounded-full bg-green-100 text-xs font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: deployed ? 1 : 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-green-600">✓</span> Confirmed
            </motion.div>
          </div>
        </motion.div>
        
        {/* Blockchain blocks animation */}
        <motion.div 
          className="absolute top-[350px] left-[480px] z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0 }}
          transition={{ duration: 0.7, delay: 4 }}
        >
          <div className="flex flex-col space-y-1">
            {[0, 1, 2].map((blockIndex) => (
              <motion.div 
                key={blockIndex}
                className={`flex items-center space-x-2 p-2 rounded-md ${blockIndex === 0 && deployed ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200'}`}
                animate={{ 
                  y: blockIndex === 0 ? [0, -3, 0] : 
                     blockIndex === 1 ? [0, -2, 0] : 
                     [0, -1, 0] 
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  delay: blockIndex * 0.3
                }}
              >
                <div className="w-8 h-8 bg-badir-sand/30 rounded-md flex items-center justify-center">
                  <i className="fas fa-cube text-badir-mocha/80"></i>
                </div>
                <div className="text-xs">
                  {blockIndex === 0 && deployed ? (
                    <div className="font-mono text-green-700 font-semibold">New Block</div>
                  ) : (
                    <div className="text-badir-mocha/70">Block #{16428790 - blockIndex}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Data packets animation */}
        <AnimatePresence>
          {sendingTx && !deployed && (
            <>
              {[0, 1, 2].map((packetIndex) => (
                <motion.div
                  key={`packet-${packetIndex}`}
                  className="absolute z-20 w-5 h-5 rounded-sm bg-badir-rose/30 border border-badir-rose flex items-center justify-center"
                  initial={{ 
                    left: 200, 
                    top: 200,
                    opacity: 0
                  }}
                  animate={{ 
                    left: [200, 450, 720],
                    top: [200, 150, 100],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: packetIndex * 0.6,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                  exit={{ opacity: 0 }}
                >
                  <i className="fas fa-code text-[10px] text-badir-rose"></i>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
        
        {/* Contract Address & Summary */}
        <motion.div 
          className="absolute bottom-10 left-0 right-0 px-6 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showSummary ? 1 : 0, y: showSummary ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-badir-tan/20">
            <div className="flex items-center mb-1">
              <div className="w-5 h-5 bg-badir-rose/10 rounded-full flex items-center justify-center mr-2">
                <i className="fas fa-check-circle text-green-600 text-xs"></i>
              </div>
              <h4 className="font-semibold text-badir-mocha text-sm">Contract Successfully Deployed</h4>
            </div>
            
            <div className="grid grid-cols-2 gap-x-4">
              <motion.div 
                className="font-mono text-xs break-all bg-badir-sand/10 rounded p-2 border border-badir-sand/30"
                animate={{ 
                  boxShadow: [
                    "0 0 0 rgba(114, 56, 61, 0)",
                    "0 0 5px rgba(114, 56, 61, 0.3)",
                    "0 0 0 rgba(114, 56, 61, 0)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="text-xs text-badir-mocha/70 mb-1">Contract Address:</div>
                <div className="text-[10px]">0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546</div>
              </motion.div>
              
              <div className="bg-badir-sand/10 rounded p-2 border border-badir-sand/30 text-xs">
                <div className="text-xs text-badir-mocha/70 mb-1">Deployment Summary:</div>
                <div className="grid grid-cols-2 gap-x-1 gap-y-1 text-[10px]">
                  <div className="text-badir-mocha/70">Network:</div>
                  <div className="text-badir-mocha">Ganache</div>
                  
                  <div className="text-badir-mocha/70">Gas Used:</div>
                  <div className="text-badir-mocha">138,241</div>
                  
                  <div className="text-badir-mocha/70">Deployer:</div>
                  <div className="text-badir-mocha font-mono">0xAbC4...</div>
                  
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
    <section id="slide6a" className="slide relative overflow-hidden">
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