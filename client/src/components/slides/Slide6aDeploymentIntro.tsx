import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Deployment Terminal Animation
const DeploymentAnimation = () => {
  const [lines, setLines] = useState<{text: string; status: 'typing' | 'complete' | 'spinner'; highlight?: boolean}[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContractAddress, setShowContractAddress] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  // The deployment log lines
  const deploymentLines = [
    { text: '> Compiling SmartContract.sol...', status: 'typing' },
    { text: '✓ Contract compiled successfully', status: 'complete', highlight: true },
    { text: '', status: 'complete' }, // Empty line for spacing
    { text: '> Connecting to Ethereum network...', status: 'typing' },
    { text: '✓ Connected to Ganache (localhost:8545)', status: 'complete', highlight: true },
    { text: '', status: 'complete' }, // Empty line for spacing
    { text: '> Deploying contract...', status: 'typing' },
    { text: '⌛ Transaction sent: 0xa93f...2bd3', status: 'spinner' },
    { text: '⌛ Waiting for confirmations...', status: 'spinner' },
    { text: '', status: 'complete' }, // Empty line for spacing
    { text: '✓ Smart contract deployed at:', status: 'complete', highlight: true }
  ];

  // Simulates typing effect
  useEffect(() => {
    if (currentLineIndex >= deploymentLines.length) return;
    
    const currentLine = deploymentLines[currentLineIndex];
    
    if (currentLine.status === 'typing' || currentLine.status === 'complete') {
      if (currentText.length < currentLine.text.length) {
        setIsTyping(true);
        const timeout = setTimeout(() => {
          setCurrentText(currentLine.text.substring(0, currentText.length + 1));
        }, 30); // Typing speed
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const newLines = [...lines, { ...currentLine, text: currentText }];
        setLines(newLines);
        setCurrentText('');
        
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
        }, currentLine.highlight ? 500 : 200); // Pause longer on highlighted lines
        
        return () => clearTimeout(timeout);
      }
    } else if (currentLine.status === 'spinner') {
      setIsTyping(false);
      const newLines = [...lines, { ...currentLine }];
      setLines(newLines);
      setCurrentText('');
      
      // For spinner lines, wait longer to simulate processing
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 1500);
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentText, lines]);
  
  // Show the contract address after all lines are typed
  useEffect(() => {
    if (currentLineIndex === deploymentLines.length) {
      const timeout = setTimeout(() => {
        setShowContractAddress(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex]);
  
  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentText]);

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
            ref={terminalRef}
            className="p-4 font-mono text-[#EFE9E1] h-80 overflow-y-auto"
            style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            {/* Previously completed lines */}
            {lines.map((line, index) => (
              <div key={index} className={`mb-1 ${line.highlight ? 'font-bold' : ''}`}>
                {line.status === 'spinner' ? (
                  <div className="flex items-center">
                    <motion.span 
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block mr-1 text-[#AC9C8D]"
                    >
                      {line.text.includes('Transaction') ? '⌛' : '⏳'}
                    </motion.span>
                    <span>{line.text.replace(/^[⌛⏳]\s/, '')}</span>
                  </div>
                ) : (
                  <div className={line.text.startsWith('✓') ? 'text-[#72383D] font-semibold' : ''}>
                    {line.text}
                  </div>
                )}
              </div>
            ))}
            
            {/* Currently typing line */}
            {isTyping && (
              <div className={`mb-1 ${currentLineIndex < deploymentLines.length && deploymentLines[currentLineIndex].highlight ? 'font-bold' : ''}`}>
                {currentText}
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-2 h-4 ml-0.5 bg-[#EFE9E1]"
                />
              </div>
            )}
            
            {/* Contract address display box */}
            {showContractAddress && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-2 p-3 bg-[#D1C7BD] text-badir-mocha rounded-md border-l-4 border-[#72383D]"
              >
                <div className="font-bold mb-1 text-[#322D29]">Contract Address:</div>
                <motion.div 
                  className="font-mono text-[#322D29] break-all"
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
            )}
          </div>
        </div>
        
        {/* Legend */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: showContractAddress ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-4 text-sm text-badir-mocha/80"
        >
          <span className="inline-block mx-2">
            <span className="text-[#72383D] font-bold">✓</span> Success
          </span>
          <span className="inline-block mx-2">
            <span className="text-[#AC9C8D]">⌛</span> Processing
          </span>
          <span className="inline-block mx-2">
            <span className="font-mono text-[#72383D]">0x...</span> Address on Blockchain
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const Slide6aDeploymentIntro = () => {
  return (
    <section id="slide6a" className="slide relative overflow-hidden">
      {/* Background */}
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
              <p className="text-3xl text-badir-mocha leading-relaxed font-medium mx-auto">
                "Deployment is the process of making a smart contract live on the blockchain network."
              </p>
            </motion.div>
            
            {/* Interactive Animation */}
            <motion.div
              className="w-full" 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ height: "calc(100vh - 350px)", minHeight: "400px" }}
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