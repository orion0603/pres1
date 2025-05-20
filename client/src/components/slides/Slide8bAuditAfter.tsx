import React from 'react';
import { motion } from 'framer-motion';

const Slide8bAuditAfter = () => {
  return (
    <section id="slide8bAuditAfter" className="slide bg-badir-background">
      <div className="slide-container max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <h2 className="text-4xl font-bold text-badir-teal" data-aos="fade-up">
            Security Audit Results: After
          </h2>
          <img src="/images/ethereum-logo.png" alt="Ethereum" className="w-8 h-8 ml-3" />
        </div>
        
        <p className="text-xl text-badir-cream/90 mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          Improved contract security after implementing all recommended measures
        </p>
        
        <motion.div
          className="w-full bg-zinc-900 rounded-lg border border-zinc-700 shadow-[0_0_15px_rgba(129,236,134,0.3)] overflow-hidden"
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
          
          {/* Terminal Content with Image */}
          <div className="font-mono text-sm">
            <div className="bg-black p-2">
              <img 
                src="/images/image_1747776690668.png" 
                alt="Slither Analysis Results showing no vulnerabilities" 
                className="w-full h-auto border border-zinc-700"
              />
            </div>
            
            <div className="p-5">
              <div className="my-4">
                <span className="text-green-400 font-bold text-lg">
                  0 VULNERABILITIES DETECTED
                </span>
              </div>
            
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-start">
                  <span className="text-green-400 font-bold mr-2 mt-0.5">✓</span>
                  <div>
                    <div className="text-green-400 font-bold">Reentrancy mitigated with noReentrant modifier</div>
                    <div className="text-zinc-400 text-xs mt-1 bg-zinc-800 p-2 rounded">
                      <div>BadirDonation.sol:145:7</div>
                      <div className="text-green-300">Fixed by implementing nonReentrant modifier from OpenZeppelin</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-start">
                  <span className="text-green-400 font-bold mr-2 mt-0.5">✓</span>
                  <div>
                    <div className="text-green-400 font-bold">External calls properly checked</div>
                    <div className="text-zinc-400 text-xs mt-1 bg-zinc-800 p-2 rounded">
                      <div>BadirDonation.sol:98:10</div>
                      <div className="text-green-300">Fixed by adding return value check and error handling</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <div className="flex items-start">
                  <span className="text-green-400 font-bold mr-2 mt-0.5">✓</span>
                  <div>
                    <div className="text-green-400 font-bold">SafeMath used to prevent overflows</div>
                    <div className="text-zinc-400 text-xs mt-1 bg-zinc-800 p-2 rounded">
                      <div>BadirDonation.sol:58:14</div>
                      <div className="text-green-300">Fixed by upgrading to Solidity 0.8+ with built-in overflow checks</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-green-400 font-bold mt-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                RECOMMENDATION: Contract ready for deployment
              </div>
              
              <div className="mt-8 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
                <div className="text-center text-green-400 font-bold">SECURITY AUDIT PASSED</div>
                <div className="text-center text-badir-cream text-xs mt-2">
                  All vulnerabilities have been addressed and the contract implements best security practices
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide8bAuditAfter;