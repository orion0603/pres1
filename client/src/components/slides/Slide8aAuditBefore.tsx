import React from 'react';
import { motion } from 'framer-motion';

const Slide8aAuditBefore = () => {
  return (
    <section id="slide8aAuditBefore" className="slide bg-badir-background">
      <div className="slide-container max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-badir-teal mb-2" data-aos="fade-up">
              Security Audit Results: Before
            </h2>
            
            <p className="text-xl text-badir-cream/90 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
              Initial security audit findings before implementing blockchain security measures
            </p>
          </div>
          <div className="hidden md:block w-24 h-24 opacity-20">
            <img 
              src="/images/ethereum-logo.png"
              alt="Ethereum Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <motion.div
          className="w-full bg-zinc-900 rounded-lg border border-zinc-700 shadow-[0_0_15px_rgba(67,176,175,0.25)] overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-3 bg-zinc-800 border-b border-zinc-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-base md:text-lg font-semibold text-white font-mono">Terminal - Slither Analysis</div>
            <div className="w-4"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="font-mono text-sm">
            <div className="bg-black p-2">
              <img 
                src="/images/image_1747776652507.png" 
                alt="Slither Analysis Results showing vulnerabilities" 
                className="w-full h-auto border border-zinc-700"
              />
            </div>
            
            <div className="p-5">
              <div className="my-4">
                <span className="text-red-500 font-bold text-lg animate-pulse">
                  3 VULNERABILITIES DETECTED
                </span>
              </div>
            
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-center mb-2">
                  <span className="text-red-500 font-bold mr-2">•</span>
                  <span className="text-red-500 font-bold">HIGH RISK</span>
                </div>
                <div className="text-red-300 ml-6 mb-3">
                  Reentrancy vulnerability detected in 'withdrawDonation' function
                </div>
                <div className="text-zinc-400 ml-6 text-xs bg-zinc-800 p-2 rounded">
                  <div>BadirDonation.sol:145:7</div>
                  <div>- The contract state is modified after an external call</div>
                  <div>- Consider using the Checks-Effects-Interactions pattern</div>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 font-bold mr-2">•</span>
                  <span className="text-yellow-500 font-bold">MEDIUM RISK</span>
                </div>
                <div className="text-yellow-300 ml-6 mb-3">
                  Unchecked external call return value in 'sendDonation' function
                </div>
                <div className="text-zinc-400 ml-6 text-xs bg-zinc-800 p-2 rounded">
                  <div>BadirDonation.sol:98:10</div>
                  <div>- The return value of an external call is not checked</div>
                  <div>- Use require() to validate return values</div>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-center mb-2">
                  <span className="text-blue-500 font-bold mr-2">•</span>
                  <span className="text-blue-500 font-bold">LOW RISK</span>
                </div>
                <div className="text-blue-300 ml-6 mb-3">
                  Integer overflow in donation tracking
                </div>
                <div className="text-zinc-400 ml-6 text-xs bg-zinc-800 p-2 rounded">
                  <div>BadirDonation.sol:58:14</div>
                  <div>- Integer arithmetic operation can overflow</div>
                  <div>- Consider using SafeMath or Solidity 0.8+ built-in overflow checks</div>
                </div>
              </div>
              
              <div className="text-red-400 font-bold mt-4">
                RECOMMENDATION: Contract needs security fixes before deployment
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide8aAuditBefore;