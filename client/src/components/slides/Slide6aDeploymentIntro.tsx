import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

// Animation component for the deployment process
const DeploymentAnimation = () => {
  const [step, setStep] = useState(0);
  const [contractCode, setContractCode] = useState('');
  const [deploymentComplete, setDeploymentComplete] = useState(false);
  
  // Code snippet that appears letter by letter
  const fullCode = `contract Donation {
  address public charity;
  
  constructor(address _charity) {
    charity = _charity;
  }
  
  function donate() public payable {
    // transfer to charity
  }
}`;

  // Typewriter effect for code
  useEffect(() => {
    if (step < 1) return;
    
    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < fullCode.length) {
        setContractCode(fullCode.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeWriter);
        if (step === 1) {
          setTimeout(() => setStep(2), 800);
        }
      }
    }, 30);
    
    return () => clearInterval(typeWriter);
  }, [step]);
  
  // Control animation steps
  useEffect(() => {
    // Start typing code
    const timer1 = setTimeout(() => setStep(1), 1000);
    
    // After deploying (initiated in step 2), move to completion
    const timer3 = step === 2 ? setTimeout(() => {
      setDeploymentComplete(true);
      setStep(3);
    }, 2500) : null;
    
    return () => {
      clearTimeout(timer1);
      if (timer3) clearTimeout(timer3);
    };
  }, [step]);
  
  return (
    <div className="mx-auto w-full max-w-3xl h-[280px] relative overflow-hidden rounded-xl bg-gradient-to-r from-badir-cream/10 to-white/40 backdrop-blur-sm border border-badir-tan/30 shadow-lg">
      {/* Contract */}
      <motion.div 
        className="absolute left-10 top-1/2 -translate-y-1/2 w-[180px] bg-white rounded-lg shadow-lg overflow-hidden border border-badir-rose/20"
        initial={{ x: -50, opacity: 0 }}
        animate={{ 
          x: step >= 2 ? -120 : 0,
          opacity: 1,
          scale: step >= 2 ? 0.8 : 1,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="bg-gray-900 text-white text-xs py-1 px-3 font-mono flex items-center">
          <div className="mr-2 flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <span>Donation.sol</span>
        </div>
        <pre className="p-3 text-xs font-mono text-gray-800 whitespace-pre-wrap h-[200px] overflow-y-auto">
          {contractCode || "// Smart Contract"}
        </pre>
      </motion.div>
      
      {/* Deployment Animation */}
      <motion.div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 2 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Code packets animating toward blockchain */}
        {step >= 2 && !deploymentComplete && (
          <>
            <motion.div 
              className="absolute w-6 h-6 bg-badir-rose/20 rounded-md border border-badir-rose/40 flex items-center justify-center"
              initial={{ x: -100, y: 0 }}
              animate={{ x: 100, y: 0 }}
              transition={{ 
                duration: 1.2,
                ease: "easeOut",
                repeat: deploymentComplete ? 0 : Infinity,
                repeatType: "loop",
                repeatDelay: 0.3
              }}
            >
              <i className="fas fa-code text-xs text-badir-rose"></i>
            </motion.div>
            <motion.div 
              className="absolute w-6 h-6 bg-badir-rose/20 rounded-md border border-badir-rose/40 flex items-center justify-center"
              initial={{ x: -100, y: 0 }}
              animate={{ x: 100, y: 0 }}
              transition={{ 
                duration: 1.2,
                delay: 0.4,
                ease: "easeOut",
                repeat: deploymentComplete ? 0 : Infinity,
                repeatType: "loop",
                repeatDelay: 0.3
              }}
            >
              <i className="fas fa-code text-xs text-badir-rose"></i>
            </motion.div>
          </>
        )}
        
        {/* Deploy button */}
        <motion.button
          className={`px-5 py-2 rounded-full font-medium text-sm ${
            step >= 2 ? 'bg-green-500 text-white' : 'bg-badir-rose text-white'
          } shadow-md flex items-center`}
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={step === 1 ? { y: [0, -3, 0] } : {}}
          transition={{ repeat: step === 1 ? Infinity : 0, duration: 1 }}
          onClick={() => step === 1 && setStep(2)}
          disabled={step !== 1}
        >
          {step < 2 ? (
            <>
              <i className="fas fa-rocket mr-2"></i>
              Deploy Contract
            </>
          ) : deploymentComplete ? (
            <>
              <i className="fas fa-check mr-2"></i>
              Deployed!
            </>
          ) : (
            <>
              <motion.div 
                className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              />
              Deploying...
            </>
          )}
        </motion.button>
      </motion.div>
      
      {/* Blockchain */}
      <motion.div 
        className="absolute right-10 top-1/2 -translate-y-1/2"
        initial={{ x: 50, opacity: 0 }}
        animate={{ 
          x: 0,
          opacity: 1,
          scale: deploymentComplete ? 1.05 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="relative w-[180px] h-[220px] bg-white rounded-lg p-3 shadow-lg border border-badir-rose/20 flex flex-col">
          <div className="text-center mb-3 font-medium text-badir-mocha">Blockchain</div>
          
          {/* Blockchain blocks */}
          <div className="flex-1 overflow-hidden">
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((block) => (
                <motion.div 
                  key={block}
                  className={`p-2 rounded-md ${
                    deploymentComplete && block === 1 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-gray-50 border border-gray-200'
                  } flex items-center`}
                  initial={{ x: 0 }}
                  animate={
                    deploymentComplete && block === 1 
                      ? { 
                          backgroundColor: ["#f0fdf4", "#dcfce7", "#f0fdf4"],
                          boxShadow: ["0 0 0 rgba(34, 197, 94, 0)", "0 0 8px rgba(34, 197, 94, 0.5)", "0 0 0 rgba(34, 197, 94, 0)"] 
                        }
                      : {}
                  }
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  <div className="w-8 h-8 bg-badir-rose/10 mr-2 rounded-md flex items-center justify-center">
                    <i className="fas fa-cube text-badir-rose/80"></i>
                  </div>
                  <div className="text-xs text-badir-mocha/80 overflow-hidden">
                    {deploymentComplete && block === 1 
                      ? <div className="font-mono truncate">0x814EED06...</div>
                      : <div>Block #{16428790 - (block-1)}</div>
                    }
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Contract successfully deployed message */}
      {deploymentComplete && (
        <motion.div 
          className="absolute bottom-3 left-0 right-0 mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block px-4 py-2 bg-green-50 border border-green-200 rounded-full text-sm text-green-700 font-medium">
            <i className="fas fa-check-circle mr-2"></i>
            Contract successfully deployed to the blockchain
          </div>
        </motion.div>
      )}
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
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DeploymentAnimation />
            </motion.div>
            
            {/* Key Points */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-badir-cream/30 rounded-lg p-5 border border-badir-tan/30 shadow-md">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-badir-rose/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-lock text-badir-rose"></i>
                  </div>
                  <h3 className="font-semibold text-badir-mocha">Immutable</h3>
                </div>
                <p className="text-badir-mocha/80 text-sm">
                  Once deployed, the contract cannot be changed, ensuring security and trust.
                </p>
              </div>
              
              <div className="bg-badir-cream/30 rounded-lg p-5 border border-badir-tan/30 shadow-md">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-badir-rose/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-globe text-badir-rose"></i>
                  </div>
                  <h3 className="font-semibold text-badir-mocha">Accessible</h3>
                </div>
                <p className="text-badir-mocha/80 text-sm">
                  Anyone can interact with the deployed contract using its unique address.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;