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
    <div className="relative h-[400px] w-full">
      {/* Step 1: Smart Contract */}
      <motion.div 
        className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: step >= 0 ? 1 : 0, 
          y: step >= 0 ? 0 : 50,
          x: step >= 2 ? -100 : '-50%'
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-lg border-2 border-badir-rose w-[180px] h-[200px] p-4 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-badir-rose/10 rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-file-contract text-2xl text-badir-rose"></i>
          </div>
          <h4 className="font-medium text-badir-mocha text-center">Smart Contract</h4>
          <p className="text-xs text-center text-badir-mocha/70 mt-2">Ready for deployment</p>
        </div>
      </motion.div>

      {/* Step 2: Deployment Arrow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, width: 0 }}
        animate={{ 
          opacity: step >= 1 ? 1 : 0,
          width: step >= 1 ? 100 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <div className="h-1 bg-badir-rose flex-grow"></div>
          <div className="text-badir-rose -mt-1">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </motion.div>

      {/* Step 3: Blockchain */}
      <motion.div 
        className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ 
          opacity: step >= 2 ? 1 : 0, 
          y: step >= 2 ? 0 : 50,
          x: step >= 2 ? 100 : '50%'
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((block) => (
              <div key={block} className="mx-1">
                <motion.div 
                  className="bg-badir-rose/20 w-16 h-16 rounded-lg flex items-center justify-center shadow-md border border-badir-rose/30"
                  animate={{ 
                    y: [0, -5, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5,
                    delay: block * 0.2
                  }}
                >
                  <i className="fas fa-cube text-badir-rose"></i>
                </motion.div>
                {block < 3 && (
                  <div className="w-4 h-0.5 bg-badir-rose/50 mx-auto mt-2"></div>
                )}
              </div>
            ))}
          </div>
          <motion.div 
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-badir-rose rounded-full p-2 shadow-md"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: step >= 4 ? 1 : 0, 
              scale: step >= 4 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-check text-white"></i>
          </motion.div>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm font-medium text-badir-mocha">Blockchain</p>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-lg overflow-hidden text-green-400 font-mono text-sm"
        initial={{ height: 0 }}
        animate={{ height: showTerminal ? 150 : 0 }}
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
        <pre className="p-2 text-xs whitespace-pre-wrap overflow-y-auto h-[120px]">
          {terminalText}
        </pre>
      </motion.div>

      {/* Contract Address Display */}
      {contractAddress && (
        <motion.div
          className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm rounded-lg border border-badir-rose/30 p-3 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : -20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 bg-badir-rose/10 rounded-full flex items-center justify-center mr-2">
              <i className="fas fa-globe-americas text-badir-rose"></i>
            </div>
            <div>
              <p className="text-xs text-badir-mocha/70">Contract Address:</p>
              <p className="font-mono text-xs text-badir-mocha">{contractAddress}</p>
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
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-5xl font-bold tech-gradient-text mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Smart Contract Deployment
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-badir-tan/30">
            {/* Definition */}
            <motion.div
              className="mb-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-2xl text-badir-mocha/90 leading-relaxed font-medium">
                "Deployment is the process of making a smart contract live on the blockchain network. Once deployed, the contract becomes permanent and accessible to users."
              </p>
              <div className="flex justify-center mt-4">
                <div className="mx-auto w-20 h-1 bg-badir-rose/50 rounded-full"></div>
              </div>
            </motion.div>
            
            {/* Why It Matters */}
            <motion.div
              className="mb-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-center mb-3">
                <div className="bg-badir-rose/10 rounded-full p-3 text-badir-rose">
                  <i className="fas fa-lock text-lg"></i>
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
              <h3 className="text-xl font-semibold text-badir-mocha text-center mb-6">Deployment Simulation</h3>
              <DeploymentAnimation />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;