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
    <section id="slide7" className="slide bg-badir-background">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-cream mb-6" data-aos="fade-up">
          Deployment Workflow
        </h2>
        
        <p className="text-xl text-badir-cream/90 mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          How we develop, test, and deploy the Badir smart contract to ensure security and reliability.
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-badir-tan"></div>
          
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
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-md">
                  <div className="flex items-center mb-4">
                    <div className="bg-badir-rose rounded-full p-3 mr-4 text-white">
                      <i className={`fas ${step.icon} text-xl`}></i>
                    </div>
                    <h3 className="text-xl font-semibold text-badir-cream">{step.title}</h3>
                  </div>
                  <p className="text-badir-cream/90 mb-4">{step.description}</p>
                  <div className={`rounded-lg p-3 ${
                    index % 2 === 0 ? 'bg-badir-mocha' : 'bg-badir-grey bg-opacity-20'
                  }`}>
                    <pre className={`text-xs ${
                      index % 2 === 0 ? 'text-badir-grey' : 'text-badir-mocha'
                    }`}>{step.code}</pre>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {step.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-badir-sand px-2 py-1 rounded-full text-xs font-medium">
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
