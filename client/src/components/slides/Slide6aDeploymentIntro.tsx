import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Simple terminal animation that types out the deployment process
const DeploymentTerminal: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // The exact terminal content specified
  const deploymentScript = [
    '> Compiling SmartContract.sol...',
    '✓ Contract compiled successfully',
    '',
    '> Connecting to Ethereum network...',
    '✓ Connected to local test blockchain (Ganache)',
    '',
    '> Preparing deployment...',
    '✓ ABI and Bytecode loaded',
    '',
    '> Deploying smart contract to blockchain...',
    ' Sending transaction from 0xAbC4...f290',
    ' Waiting for 3 block confirmations...',
    '',
    '✓ Contract successfully deployed!',
    '',
    ' Contract Address:',
    '0x9eAe9b64A0Ce8cfa9C535506dADcC3b06D330546',
    '',
    ' Deployment Summary:',
    '- Network: Ganache Localhost 8545',
    '- Gas Used: 138,241 units',
    '- Deployer: 0xAbC4...f290',
    '- Status: Confirmed'
  ];

  // Auto-scroll to the bottom as new content appears
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Handle typing one line at a time
  useEffect(() => {
    if (currentIndex < deploymentScript.length) {
      const targetLine = deploymentScript[currentIndex];
      let typingSpeed = 40;
      
      // Full line has been typed, move to next line
      if (currentLine === targetLine) {
        const timeout = setTimeout(() => {
          setOutput(prev => [...prev, currentLine]);
          setCurrentLine("");
          setCurrentIndex(prev => prev + 1);
        }, currentLine.startsWith('✓') ? 800 : 
           currentLine.includes('Waiting') ? 1500 : 
           currentLine.trim() === '' ? 200 : 500);
        
        return () => clearTimeout(timeout);
      }
      
      // Type one character at a time
      const nextChar = targetLine.charAt(currentLine.length);
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + nextChar);
      }, typingSpeed);
      
      return () => clearTimeout(timeout);
    } else if (currentIndex === deploymentScript.length && !isComplete) {
      setIsComplete(true);
    }
  }, [currentLine, currentIndex, deploymentScript, isComplete]);

  // Format a line with appropriate styling
  const formatLine = (line: string, index: number) => {
    if (line.startsWith('✓')) {
      return <div key={index} className="text-[#72383D] font-bold">{line}</div>;
    } else if (line.startsWith('>')) {
      return <div key={index} className="text-[#BBBBBB]">{line}</div>;
    } else if (line.includes('Waiting') || line.includes('0xAbC4')) {
      return <div key={index} className="text-[#AC9C8D]">{line}</div>;
    } else if (line.startsWith('0x9eAe')) {
      return <div key={index} className="text-[#72383D] font-bold">{line}</div>;
    } else if (line.includes('Contract Address:')) {
      return <div key={index} className="font-bold">{line}</div>;
    } else if (line.includes('Deployment Summary:')) {
      return <div key={index} className="font-bold mt-2">{line}</div>;
    } else if (line.startsWith('-')) {
      return <div key={index} className="text-[#EFE9E1] ml-2">{line}</div>;
    }
    return <div key={index}>{line}</div>;
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-full max-w-4xl">
        {/* Terminal Window */}
        <div className="bg-[#322D29] rounded-lg overflow-hidden shadow-xl border border-badir-mocha/20 mx-auto">
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
            className="p-6 font-mono text-[#EFE9E1] h-[400px] overflow-auto"
            style={{ fontSize: '0.95rem', lineHeight: '1.75' }}
          >
            <div className="whitespace-pre-wrap">
              {/* Previously typed lines */}
              {output.map((line, index) => formatLine(line, index))}
              
              {/* Currently typing line */}
              {!isComplete && formatLine(currentLine, output.length)}
              
              {/* Blinking cursor */}
              {!isComplete && (
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block ml-0.5 w-2 h-4 bg-[#EFE9E1]"
                />
              )}
            </div>
            
            {/* Contract Address Highlight Box */}
            {isComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-4 bg-[#D1C7BD] text-badir-mocha rounded-md border-l-4 border-[#72383D]"
              >
                <div className="font-bold mb-1 text-[#322D29]">Contract Address:</div>
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
            )}
          </div>
        </div>
        
        {/* Legend */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-4 text-sm text-badir-mocha/80"
        >
          <span className="inline-block mx-3">
            <span className="text-[#72383D] font-bold">✓</span> Success
          </span>
          <span className="inline-block mx-3">
            <span className="text-[#AC9C8D]">⏳</span> Processing
          </span>
          <span className="inline-block mx-3">
            <span className="font-mono text-[#72383D]">0x...</span> Contract Address
          </span>
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
              <DeploymentTerminal />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;