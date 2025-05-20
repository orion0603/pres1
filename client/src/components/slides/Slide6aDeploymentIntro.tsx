import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide6aDeploymentIntro = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const steps = [
    {
      number: 1,
      title: "What is Deployment?",
      description: "Deployment is the process of making a smart contract live on the blockchain network. Once deployed, the contract becomes permanent and accessible to users.",
      icon: "fa-rocket"
    },
    {
      number: 2,
      title: "Why Does It Matter?",
      description: "Deployed smart contracts are immutable, meaning their code cannot be changed, ensuring trust and security for all users interacting with the contract.",
      icon: "fa-lock"
    },
    {
      number: 3,
      title: "Our Deployment Process",
      description: "We use Hardhat, an Ethereum development environment, to compile and deploy our donation smart contract to the blockchain network.",
      icon: "fa-cogs"
    }
  ];
  
  const handleStepClick = (stepNumber: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveStep(stepNumber);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  return (
    <section id="slide6a" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div
          className="max-w-6xl mx-auto"
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
            
            <motion.p 
              className="text-xl text-badir-mocha mb-4 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Understanding how we make our smart contract accessible on the blockchain
            </motion.p>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left side: Step selector */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-badir-tan/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-badir-mocha mb-6">Deployment Steps</h3>
                
                {steps.map((step) => (
                  <motion.div
                    key={step.number}
                    className={`flex items-start p-4 rounded-lg mb-4 cursor-pointer transition-all ${
                      activeStep === step.number 
                      ? 'bg-badir-rose text-white shadow-md' 
                      : 'bg-badir-cream/50 text-badir-mocha hover:bg-badir-sand/30'
                    }`}
                    onClick={() => handleStepClick(step.number)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 ${
                      activeStep === step.number ? 'bg-white' : 'bg-badir-rose'
                    } rounded-full flex items-center justify-center text-${
                      activeStep === step.number ? 'badir-rose' : 'white'
                    } mr-4 font-bold text-lg`}>
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{step.title}</h4>
                      <p className={`text-sm ${activeStep === step.number ? 'text-white/90' : 'text-badir-mocha/70'}`}>
                        Click to learn more
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Right side: Step content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeStep}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-badir-tan/30 h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-badir-rose rounded-full flex items-center justify-center text-white text-2xl mr-6 shadow-md">
                    <i className={`fas ${steps[activeStep - 1].icon}`}></i>
                  </div>
                  <h3 className="text-2xl font-semibold text-badir-mocha">{steps[activeStep - 1].title}</h3>
                </div>
                
                {activeStep === 1 && (
                  <p className="text-2xl text-badir-mocha/90 mb-8 leading-relaxed text-center font-medium">
                    "Deployment is the process of making a smart contract live on the blockchain network. Once deployed, the contract becomes permanent and accessible to users."
                  </p>
                )}
                
                {activeStep === 2 && (
                  <p className="text-lg text-badir-mocha/90 mb-8 leading-relaxed">
                    {steps[activeStep - 1].description}
                  </p>
                )}
                
                {activeStep === 3 && (
                  <p className="text-lg text-badir-mocha/90 mb-8 leading-relaxed">
                    {steps[activeStep - 1].description}
                  </p>
                )}
                
                {activeStep === 1 && (
                  <div className="flex justify-center">
                    <div className="mx-auto w-20 h-1 bg-badir-rose/50 rounded-full"></div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="space-y-6">
                    <div className="bg-badir-sand/20 rounded-xl p-6 border border-badir-tan/20">
                      <h4 className="font-semibold text-badir-mocha mb-4">Why Immutability Matters</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <i className="fas fa-shield-alt text-badir-rose mt-1 mr-3"></i>
                          <span className="text-badir-mocha/90">
                            <span className="font-medium">Security:</span> Once deployed, no one can alter the contract's logic, protecting users from malicious changes.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-handshake text-badir-rose mt-1 mr-3"></i>
                          <span className="text-badir-mocha/90">
                            <span className="font-medium">Trust:</span> Donors can verify that the contract behavior will remain consistent throughout its lifetime.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-gavel text-badir-rose mt-1 mr-3"></i>
                          <span className="text-badir-mocha/90">
                            <span className="font-medium">Compliance:</span> Creates a permanent record of the contract's terms, useful for auditing and legal purposes.
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-badir-mocha/5 rounded-xl p-6 border border-badir-mocha/10 text-center">
                      <div className="font-medium text-badir-mocha mb-2">Permanent Storage Warning</div>
                      <p className="text-sm text-badir-mocha/80 italic">
                        "Deploy once, deploy right. There's no delete button on the blockchain."
                      </p>
                    </div>
                  </div>
                )}
                
                {activeStep === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gray-900 rounded-lg p-5 font-mono text-sm text-white/90 overflow-x-auto shadow-md">
                      <div className="flex items-center mb-3 border-b border-white/10 pb-2">
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                        <span className="ml-2 text-xs text-white/60">deploy.js</span>
                      </div>
                      <pre className="text-white/80">
{`const hre = require("hardhat");

async function main() {
  console.log("Deploying Donation contract...");

  // Get the contract factory
  const Donation = await hre.ethers.getContractFactory("Donation");
  
  // Use charity address
  const charityAddress = "0x814EED06116D50b17b1d04bE5200b9699aa918e0"; 
  
  console.log("Using charity address:", charityAddress);
  
  // Deploy the contract with your charity address
  const donation = await Donation.deploy(charityAddress);

  // Wait for deployment
  await donation.waitForDeployment();
  
  // Get the deployed contract address
  const deployedAddress = await donation.getAddress();
  
  console.log("Donation contract deployed to:", deployedAddress);
}`}
                      </pre>
                    </div>
                    
                    <div className="bg-badir-sand/20 rounded-xl p-6 border border-badir-tan/20">
                      <h4 className="font-semibold text-badir-mocha mb-4 flex items-center">
                        <i className="fas fa-terminal text-badir-rose mr-2"></i>
                        Deployment Steps
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-badir-rose/90 text-white flex items-center justify-center mr-3 shadow-sm font-medium">1</div>
                          <div className="text-badir-mocha/90 text-sm">
                            <span className="font-medium">Compile Contract:</span> Convert Solidity code to bytecode
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-badir-rose/90 text-white flex items-center justify-center mr-3 shadow-sm font-medium">2</div>
                          <div className="text-badir-mocha/90 text-sm">
                            <span className="font-medium">Initialize Parameters:</span> Set the charity address
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-badir-rose/90 text-white flex items-center justify-center mr-3 shadow-sm font-medium">3</div>
                          <div className="text-badir-mocha/90 text-sm">
                            <span className="font-medium">Submit Transaction:</span> Send deployment transaction to network
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-badir-rose/90 text-white flex items-center justify-center mr-3 shadow-sm font-medium">4</div>
                          <div className="text-badir-mocha/90 text-sm">
                            <span className="font-medium">Wait for Confirmation:</span> Transaction is mined into a block
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-badir-rose/90 text-white flex items-center justify-center mr-3 shadow-sm font-medium">5</div>
                          <div className="text-badir-mocha/90 text-sm">
                            <span className="font-medium">Contract Address:</span> Receive unique address for interaction
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;