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
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-sm rounded-xl border border-badir-tan/20 shadow-lg p-6 relative">
        {/* Simple grid background */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#72383D" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Deployment flow path - simple straight line */}
        <div className="relative w-full h-8 my-16 z-10">
          <div className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-gray-200"></div>
          
          <motion.div 
            className="absolute inset-0 h-1 top-1/2 -translate-y-1/2 bg-badir-rose origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step / 5 }}
            transition={{ duration: 0.5 }}
          ></motion.div>
          
          {/* Step markers */}
          {[1, 2, 3, 4, 5].map((markerStep) => (
            <motion.div
              key={markerStep}
              className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center
                ${step >= markerStep ? 'bg-badir-rose text-white' : 'bg-white text-gray-400 border border-gray-300'}`}
              style={{ left: `${(markerStep - 1) * 25}%` }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: step >= markerStep ? 1 : 0.8, 
                opacity: 1,
                boxShadow: step >= markerStep ? "0 0 10px rgba(114, 56, 61, 0.5)" : "none"
              }}
              transition={{ duration: 0.5, delay: 0.1 * markerStep }}
            >
              {step > markerStep ? (
                <i className="fas fa-check text-sm"></i>
              ) : (
                <span className="text-sm">{markerStep}</span>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Step labels */}
        <div className="relative w-full flex justify-between mb-12 z-10">
          {[
            { label: "Contract Compilation", icon: "fa-file-code" },
            { label: "Network Connection", icon: "fa-network-wired" },
            { label: "Transaction Preparation", icon: "fa-cogs" },
            { label: "Blockchain Processing", icon: "fa-cube" },
            { label: "Deployment Confirmation", icon: "fa-check-circle" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className={`w-36 text-center flex flex-col items-center ${idx === 0 ? '' : idx === 4 ? '' : ''}`}
              style={{ marginLeft: idx === 0 ? '0' : '', marginRight: idx === 4 ? '0' : '' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: step >= idx + 1 ? 1 : 0.5, 
                y: 0,
              }}
              transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
            >
              <div 
                className={`w-16 h-16 rounded-full mb-2 flex items-center justify-center
                  ${step >= idx + 1 ? 'bg-badir-rose/10' : 'bg-gray-100'}`}
              >
                <i className={`fas ${item.icon} text-2xl ${step >= idx + 1 ? 'text-badir-rose' : 'text-gray-400'}`}></i>
              </div>
              <div className={`text-sm font-medium ${step >= idx + 1 ? 'text-badir-mocha' : 'text-gray-400'}`}>
                {item.label}
              </div>
              {step === idx + 1 && (
                <motion.div 
                  className="w-2 h-2 bg-badir-rose rounded-full mt-2"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Animated blocks at the bottom */}
        <div className="w-full flex justify-center mt-2 mb-8">
          <div className="flex space-x-4">
            {[0, 1, 2, 3, 4].map((blockIndex) => (
              <motion.div
                key={blockIndex}
                className={`w-16 h-16 flex items-center justify-center rounded-lg border 
                  ${step >= 4 && blockIndex === 0 ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: step >= 3 ? 1 : 0,
                  y: step >= 3 ? (blockIndex % 2 === 0 ? [0, -8, 0] : [0, -4, 0]) : 0
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  y: { repeat: Infinity, duration: 2, delay: blockIndex * 0.2 }
                }}
              >
                <i className="fas fa-cube text-xl text-badir-mocha/70"></i>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Flying data packets */}
        <AnimatePresence>
          {step >= 3 && step < 5 && (
            <>
              {[0, 1, 2].map((packetIndex) => (
                <motion.div
                  key={`packet-${packetIndex}`}
                  className="absolute z-20 w-6 h-6 rounded-full border-2 border-badir-rose flex items-center justify-center"
                  initial={{ 
                    left: '50%', 
                    top: '40%',
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{ 
                    left: ['50%', '60%', '70%', '80%'],
                    top: ['40%', '40%', '40%', '40%'],
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1.2, 1, 0.8],
                    backgroundColor: 'rgba(114, 56, 61, 0.1)'
                  }}
                  transition={{ 
                    duration: 2,
                    delay: packetIndex * 0.6,
                    repeat: Infinity,
                    repeatDelay: 0.5
                  }}
                  exit={{ opacity: 0 }}
                >
                  <i className="fas fa-code text-sm text-badir-rose"></i>
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
          <div className="bg-white rounded-lg border border-green-200 p-4 shadow-md">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <i className="fas fa-check-circle text-green-600"></i>
              </div>
              <h3 className="text-lg font-medium text-badir-mocha">Contract Successfully Deployed</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-badir-mocha/70 mb-1">Contract Address:</div>
                <motion.div
                  className="font-mono text-sm bg-badir-sand/10 p-2 rounded border border-badir-sand/30"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 rgba(114, 56, 61, 0)",
                      "0 0 5px rgba(114, 56, 61, 0.3)",
                      "0 0 0 rgba(114, 56, 61, 0)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546
                </motion.div>
              </div>
              
              <div>
                <div className="text-sm text-badir-mocha/70 mb-1">Deployment Summary:</div>
                <div className="grid grid-cols-2 gap-2 bg-badir-sand/10 p-2 rounded border border-badir-sand/30">
                  <div className="text-sm text-badir-mocha/70">Network:</div>
                  <div className="text-sm text-badir-mocha">Ganache (8545)</div>
                  
                  <div className="text-sm text-badir-mocha/70">Gas Used:</div>
                  <div className="text-sm text-badir-mocha">138,241 units</div>
                  
                  <div className="text-sm text-badir-mocha/70">Deployer:</div>
                  <div className="text-sm text-badir-mocha font-mono">0xAbC4...f290</div>
                  
                  <div className="text-sm text-badir-mocha/70">Status:</div>
                  <div className="text-sm text-green-600 font-medium">Confirmed</div>
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