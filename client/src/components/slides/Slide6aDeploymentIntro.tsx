import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide6aDeploymentIntro = () => {
  const deploymentSteps = [
    {
      step: 1,
      title: "What is Deployment?",
      icon: "fa-rocket",
      description: "Deployment is the process of making a smart contract live on the blockchain network. Once deployed, the contract becomes permanent and accessible to users.",
      code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BadirDonation {
  // Contract code here
}`,
      tags: ["Permanent", "Immutable", "Accessible"],
      details: [
        { icon: "fa-cube", title: "Blockchain Network", description: "The distributed ledger where the contract lives permanently" },
        { icon: "fa-gas-pump", title: "Gas Fees", description: "Cost paid to miners for processing the deployment transaction" },
        { icon: "fa-file-contract", title: "Contract Address", description: "Unique identifier for accessing the deployed contract" },
        { icon: "fa-code-branch", title: "Version Control", description: "Managing contract iterations before final deployment" }
      ]
    },
    {
      step: 2,
      title: "Why Does It Matter?",
      icon: "fa-lock",
      description: "Deployed smart contracts are immutable, meaning their code cannot be changed, ensuring trust and security for all users interacting with the contract.",
      code: `// ⚠️ Warning: Once deployed, this cannot be modified
// Plan carefully and audit before deployment

// Deploy script will send this exact code to blockchain
// No "upgrades" or "patches" possible after deployment`,
      tags: ["Security", "Trust", "Transparency"],
      details: [
        { icon: "fa-shield-alt", title: "Security", description: "No one can alter the contract's logic, protecting users from malicious changes" },
        { icon: "fa-handshake", title: "Trust", description: "Donors can verify that the contract behavior will remain consistent" },
        { icon: "fa-gavel", title: "Compliance", description: "Creates a permanent record of the contract's terms for auditing" },
        { icon: "fa-exclamation-triangle", title: "Warning", description: "\"Deploy once, deploy right. There's no delete button on the blockchain.\"" }
      ]
    },
    {
      step: 3,
      title: "Our Deployment Process",
      icon: "fa-cogs",
      description: "We use Hardhat, an Ethereum development environment, to compile and deploy our donation smart contract to the blockchain network.",
      code: `const hre = require("hardhat");

async function main() {
  console.log("Deploying Donation contract...");

  // Get the contract factory
  const Donation = await hre.ethers.getContractFactory("Donation");
  
  // Use charity address
  const charityAddress = "0x814EED06116D50b17b1d04bE5200b9699aa918e0"; 
  
  // Deploy the contract with your charity address
  const donation = await Donation.deploy(charityAddress);

  // Wait for deployment
  await donation.waitForDeployment();
  
  // Get the deployed contract address
  const deployedAddress = await donation.getAddress();
  
  console.log("Donation contract deployed to:", deployedAddress);
}`,
      tags: ["Hardhat", "Ethers.js", "Ethereum"],
      details: [
        { icon: "fa-file-code", title: "Compile Contract", description: "Convert Solidity code to bytecode" },
        { icon: "fa-sliders-h", title: "Initialize Parameters", description: "Set the charity address for the contract" },
        { icon: "fa-paper-plane", title: "Submit Transaction", description: "Send deployment transaction to the network" },
        { icon: "fa-clock", title: "Wait for Confirmation", description: "Transaction is mined into a block on the blockchain" },
        { icon: "fa-key", title: "Contract Address", description: "Receive unique address for future interactions" }
      ]
    }
  ];

  return (
    <section id="slide6a" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Smart Contract Deployment
        </h2>
        
        <p className="text-xl text-badir-mocha mb-8 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Understanding how we make our smart contract accessible on the blockchain
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
                    <h3 className="text-xl font-semibold text-badir-mocha">{step.title}</h3>
                  </div>
                  
                  <p className="text-badir-mocha mb-4">{step.description}</p>
                  
                  {/* Code section */}
                  <div className={`rounded-lg p-3 mb-4 ${
                    index % 2 === 0 ? 'bg-badir-mocha' : 'bg-gray-900'
                  }`}>
                    <pre className={`text-xs ${
                      index % 2 === 0 ? 'text-badir-grey' : 'text-white/80'
                    }`}>{step.code}</pre>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-badir-sand px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Expandable details */}
                  <div className="mt-4 pt-4 border-t border-badir-tan/30">
                    <h4 className="font-semibold text-badir-mocha mb-3 flex items-center">
                      <i className="fas fa-list-ul text-badir-rose mr-2"></i>
                      Key Points
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-badir-rose/20 rounded-full flex items-center justify-center text-badir-rose mr-3">
                            <i className={`fas ${detail.icon}`}></i>
                          </div>
                          <div>
                            <h5 className="font-medium text-badir-mocha text-sm">{detail.title}</h5>
                            <p className="text-xs text-badir-mocha/70">{detail.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Timeline node */}
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

export default Slide6aDeploymentIntro;