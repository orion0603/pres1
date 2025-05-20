import { motion } from 'framer-motion';

const Slide7Deployment = () => {
  const deploymentSteps = [
    {
      step: 1,
      title: "Write in Solidity",
      icon: "fa-file-code",
      description: "Smart contracts are written in Solidity, the primary language for Ethereum development.",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BadirDonation {
  // Contract code here
}`,
      tags: ["Solidity", "VSCode", "Remix IDE"]
    },
    {
      step: 2,
      title: "Test Locally",
      icon: "fa-vial",
      description: "Local blockchain testing with Ganache to validate smart contract functionality.",
      code: `$ npx hardhat test
  Contract: BadirDonation
    ✓ should accept valid donations
    ✓ should reject donations below minimum
    ✓ should track donor history correctly
    ✓ owner should be able to withdraw funds`,
      tags: ["Ganache", "Hardhat", "JavaScript"]
    },
    {
      step: 3,
      title: "Deploy with Hardhat",
      icon: "fa-rocket",
      description: "After thorough testing, we deploy to Ethereum testnets and finally mainnet using Hardhat.",
      code: `$ npx hardhat run scripts/deploy.js --network goerli
Deploying BadirDonation...
BadirDonation deployed to: 0x123...abc`,
      tags: ["Hardhat", "Ethers.js", "Goerli Testnet"]
    },
    {
      step: 4,
      title: "Interact via Web3.py",
      icon: "fa-laptop-code",
      description: "Our backend services use Web3.py to interact with the deployed contract and provide APIs for the frontend.",
      code: `from web3 import Web3

# Connect to Ethereum node
w3 = Web3(Web3.HTTPProvider('...'))

# Load contract ABI and address
contract = w3.eth.contract(
  address=CONTRACT_ADDRESS, 
  abi=CONTRACT_ABI
)

# Get donation stats
total = contract.functions.getTotalDonations().call()`,
      tags: ["Web3.py", "Python", "API"]
    }
  ];

  return (
    <section id="slide7" className="slide bg-badir-background relative overflow-hidden">
      {/* Animated Tech Background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-badir-teal/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-badir-neon/5 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Circuit lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-badir-teal/10" 
              style={{
                height: '1px',
                width: `${20 + Math.random() * 30}%`,
                left: `${Math.random() * 80}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="slide-container relative z-10">
        <div className="flex items-center">
          <i className="fas fa-server text-badir-teal text-2xl mr-3 animate-pulse"></i>
          <h2 className="text-4xl font-bold text-badir-teal mb-6" data-aos="fade-up">
            Deployment Workflow
          </h2>
        </div>
        
        <div className="flex items-center mb-8">
          <div className="w-1 h-8 bg-badir-teal/30 mr-3"></div>
          <p className="text-xl text-badir-teal/90 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
            How we develop, test, and deploy the Badir smart contract to ensure security and reliability.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline line with tech nodes */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full flex flex-col items-center">
            <div className="w-1 flex-1 bg-gradient-to-b from-badir-teal/80 to-badir-teal/30"></div>
            
            {/* Tech nodes */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="absolute w-4 h-4 bg-badir-teal rounded-full left-1/2 transform -translate-x-1/2"
                style={{ top: `${i * 20}%` }}
              >
                <div className="absolute inset-0 rounded-full bg-badir-teal animate-ping opacity-25"></div>
                <div className="absolute -left-1 -top-1 w-6 h-6 border border-badir-teal/30 rounded-full"></div>
              </div>
            ))}
          </div>
          
          {deploymentSteps.map((step, index) => (
            <motion.div 
              key={index}
              className={`relative mb-12 ${index === deploymentSteps.length - 1 ? 'mb-0' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className={`flex items-center justify-center ${
                index % 2 === 0 
                ? 'md:justify-end md:w-1/2 pr-4 md:pr-8' 
                : 'md:justify-start md:w-1/2 md:ml-auto pl-4 md:pl-8'
              }`}>
                <div className="bg-badir-mocha/90 border border-badir-teal/30 rounded-xl p-6 shadow-[0_0_30px_rgba(67,176,175,0.1)] backdrop-blur-sm max-w-md">
                  <div className="flex items-center mb-4 relative">
                    {/* Tech circle effect */}
                    <div className="absolute -left-2 -top-2 w-14 h-14 border border-badir-teal/30 rounded-full animate-[spin_8s_linear_infinite]"></div>
                    
                    <div className="bg-badir-rose relative rounded-full p-3 mr-4 text-white z-10 shadow-[0_0_15px_rgba(67,176,175,0.3)]">
                      <i className={`fas ${step.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-badir-cream flex items-center">
                      {step.title}
                      <span className="ml-2 text-xs bg-badir-neon/20 border border-badir-neon/40 px-2 py-0.5 rounded text-badir-neon">
                        <i className="fas fa-code-branch mr-1"></i>v1.{step.step}
                      </span>
                    </h3>
                  </div>
                  <p className="text-badir-cream/90 mb-4">{step.description}</p>
                  <div className={`rounded-lg p-3 relative overflow-hidden group ${
                    index % 2 === 0 ? 'bg-badir-background/80 border border-badir-teal/30' : 'bg-badir-background/95 border border-badir-teal/30'
                  }`}>
                    {/* Tech circuit background */}
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute bg-badir-teal" 
                          style={{
                            height: '1px',
                            width: `${30 + Math.random() * 40}%`,
                            left: `${Math.random() * 70}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 180}deg)`,
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Animated corner bracket */}
                    <div className="absolute top-1 left-1 text-badir-teal/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-less-than"></i>
                    </div>
                    <div className="absolute bottom-1 right-1 text-badir-teal/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="fas fa-greater-than"></i>
                    </div>
                    
                    <pre className="text-xs text-badir-cream relative z-10">{step.code}</pre>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-badir-teal/20 border border-badir-teal/30 text-badir-cream px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-badir-rose rounded-full w-8 h-8 flex items-center justify-center text-white font-bold z-10">
                {step.step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slide7Deployment;
