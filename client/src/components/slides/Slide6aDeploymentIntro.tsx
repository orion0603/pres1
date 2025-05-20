import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const DeploymentAnimation = () => {
  const [step, setStep] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalText, setTerminalText] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  const terminalLines = [
    '> npx hardhat run --network ethereum deploy.js',
    'Compiling contract...',
    'Contract compiled successfully!',
    'Deploying contract to Ethereum network...',
    'Waiting for confirmation...',
    '✓ Transaction mined in block #16428790',
    'Contract deployed successfully!',
    'Contract address: 0x814EED06116D50b17b1d04bE5200b9699aa918e0'
  ];

  useEffect(() => {
    // Start the animation after component mounts
    const timer1 = setTimeout(() => setStep(1), 1000);
    const timer2 = setTimeout(() => setStep(2), 2000);
    const timer3 = setTimeout(() => {
      setStep(3);
      setShowTerminal(true);
      animateTerminal();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const animateTerminal = async () => {
    for (let i = 0; i < terminalLines.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTerminalText(prev => prev + terminalLines[i] + '\n');
      
      // Extract contract address from last line
      if (i === terminalLines.length - 1) {
        setContractAddress('0x814EED06116D50b17b1d04bE5200b9699aa918e0');
        setStep(4);
      }
    }
  };

  return (
    <div className="relative h-[300px] w-full mx-auto max-w-3xl bg-gradient-to-b from-badir-cream/20 to-white/30 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-badir-mocha/10 overflow-hidden">
      {/* Connection lines */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="h-0.5 bg-gradient-to-r from-badir-sand via-badir-rose to-badir-sand/50 w-full"></div>
      </motion.div>

      {/* Step 1: Smart Contract */}
      <motion.div 
        className="absolute top-1/2 left-[20%] transform -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: step >= 0 ? 1 : 0, 
          x: step >= 2 ? '-30%' : '-50%'
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="bg-white rounded-lg shadow-lg border border-badir-rose/50 w-[140px] h-[160px] p-4 flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-badir-rose/10 rounded-full flex items-center justify-center mb-3 shadow-inner">
            <i className="fas fa-file-contract text-xl text-badir-rose"></i>
          </div>
          <h4 className="font-medium text-badir-mocha text-center">Smart Contract</h4>
          <p className="text-xs text-center text-badir-mocha/70 mt-1">Ready for deployment</p>
        </div>
      </motion.div>

      {/* Step 2: Deployment Arrow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 z-20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: step >= 1 ? 1 : 0,
          scale: step >= 1 ? 1 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center justify-center bg-gradient-to-r from-badir-rose/50 to-badir-rose rounded-full p-2 shadow-md"
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <i className="fas fa-arrow-right text-white"></i>
        </motion.div>
        <p className="text-xs text-center text-badir-mocha/60 mt-1 font-medium">Deploying</p>
      </motion.div>

      {/* Step 3: Blockchain */}
      <motion.div 
        className="absolute top-1/2 right-[20%] transform translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: step >= 2 ? 1 : 0,
          x: step >= 2 ? '30%' : '50%'
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col items-center">
            {[1, 2, 3].map((block) => (
              <motion.div 
                key={block} 
                className="w-32 h-12 border border-badir-sand/50 shadow-sm flex items-center justify-center"
                style={{
                  backgroundColor: block === 1 ? 'rgba(255, 233, 213, 0.9)' : 
                                  block === 2 ? 'rgba(255, 226, 199, 0.9)' : 
                                  'rgba(254, 215, 188, 0.9)'
                }}
                animate={{ 
                  y: [0, -3, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  delay: block * 0.2,
                  ease: "easeInOut"
                }}
              >
                <div className="flex items-center">
                  <i className="fas fa-cube text-badir-mocha/80 mr-2"></i>
                  <span className="text-xs font-mono text-badir-mocha/70">Block #{16428790 - (3-block)}</span>
                </div>
              </motion.div>
            ))}
            <motion.div 
              className="absolute -top-4 right-0 bg-green-500 text-white rounded-full p-1 shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: step >= 4 ? 1 : 0, 
                scale: step >= 4 ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <i className="fas fa-check text-xs"></i>
            </motion.div>
          </div>
          <div className="text-center mt-3">
            <p className="text-sm font-medium text-badir-mocha">Blockchain</p>
          </div>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div 
        className="absolute bottom-2 left-0 right-0 mx-4 bg-gray-900 rounded-lg overflow-hidden text-green-400 font-mono text-xs"
        initial={{ height: 0 }}
        animate={{ height: showTerminal ? 110 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-1 border-b border-gray-700 bg-gray-800 flex items-center">
          <div className="flex items-center space-x-1 ml-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-2 text-xs text-gray-400">Deployment Terminal</span>
        </div>
        <pre className="p-2 text-xs whitespace-pre-wrap overflow-y-auto h-[80px]">
          {terminalText}
        </pre>
      </motion.div>

      {/* Contract Address Display */}
      {contractAddress && (
        <motion.div
          className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg border border-green-300 p-3 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
              <i className="fas fa-globe-americas text-green-600"></i>
            </div>
            <div>
              <p className="text-xs text-badir-mocha/70 mb-0.5">Contract Address:</p>
              <p className="font-mono text-xs text-badir-mocha bg-gray-100 rounded px-1 py-0.5">{contractAddress}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Slide6aDeploymentIntro = () => {
  return (
    <section id="slide6a" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream to-badir-cream/90 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
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
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-badir-tan/20">
            {/* Definition */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-badir-rose/20 rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-rocket text-2xl text-badir-rose"></i>
                </div>
              </div>
              <p className="text-2xl text-badir-mocha leading-relaxed font-medium max-w-2xl mx-auto">
                "Deployment is the process of making a smart contract live on the blockchain network. Once deployed, the contract becomes permanent and accessible to users."
              </p>
              <div className="flex justify-center mt-5">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent via-badir-rose to-transparent rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Why It Matters */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-badir-rose/10 rounded-full flex items-center justify-center shadow-inner">
                  <i className="fas fa-lock text-xl text-badir-rose"></i>
                </div>
              </div>
              <p className="text-lg text-badir-mocha/90 max-w-2xl mx-auto">
                <span className="font-semibold">Why It Matters:</span> Deployed smart contracts are immutable, meaning their code cannot be changed, ensuring trust and security for all users.
              </p>
            </motion.div>
            
            {/* Deployment Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-badir-mocha text-center mb-8 flex items-center justify-center">
                <i className="fas fa-play-circle text-badir-rose mr-2"></i>
                Deployment Simulation
              </h3>
              <DeploymentAnimation />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;