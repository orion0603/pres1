import { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Slide9Attacks = () => {
  // State for reentrancy attack demo
  const [reentrancyProtectionVisible, setReentrancyProtectionVisible] = useState(false);
  const reentrancyControls = useAnimation();
  const attackerControls = useAnimation();
  const attackArrowControls = useAnimation();
  
  // State for front-running attack demo
  const [frontRunProtectionVisible, setFrontRunProtectionVisible] = useState(false);
  const legitimateTxControls = useAnimation();
  const attackerTxControls = useAnimation();

  // Simulate reentrancy attack
  const simulateReentrancyAttack = async () => {
    // Move attacker contract to connect with smart contract
    await attackerControls.start({
      x: 100,
      y: -50,
      transition: { duration: 1 }
    });
    
    // Show attack arrow
    await attackArrowControls.start({
      width: '150px',
      height: '4px',
      backgroundColor: '#ef4444',
      transition: { duration: 0.5 }
    });
    
    // Reset after animation
    setTimeout(async () => {
      await Promise.all([
        attackerControls.start({ x: 0, y: 0, transition: { duration: 0.5 } }),
        attackArrowControls.start({ width: 0, height: 0, transition: { duration: 0.3 } })
      ]);
    }, 1500);
  };

  // Show reentrancy protection
  const showReentrancyProtection = () => {
    setReentrancyProtectionVisible(true);
    setTimeout(() => {
      setReentrancyProtectionVisible(false);
    }, 3000);
  };

  // Simulate front-running attack
  const simulateFrontRunAttack = async () => {
    // Show attacker transaction and make it overtake the legitimate one
    await attackerTxControls.start({ opacity: 1 });
    
    // Move both transactions with the attacker overtaking the legitimate one
    await Promise.all([
      legitimateTxControls.start({ x: 250, transition: { duration: 1.5, delay: 0.5 } }),
      attackerTxControls.start({ x: 250, transition: { duration: 0.8 } })
    ]);
    
    // Reset after animation
    setTimeout(async () => {
      await Promise.all([
        legitimateTxControls.start({ x: 0, transition: { duration: 0.5 } }),
        attackerTxControls.start({ x: 0, opacity: 0, transition: { duration: 0.5 } })
      ]);
    }, 2000);
  };

  // Show front-running protection
  const showFrontRunProtection = () => {
    setFrontRunProtectionVisible(true);
    setTimeout(() => {
      setFrontRunProtectionVisible(false);
    }, 3000);
  };

  return (
    <section id="slide9" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Simulated Attacks
        </h2>
        
        <p className="text-xl text-badir-mocha mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          Understanding potential vulnerabilities helps us build stronger defenses. Let's explore how Badir is protected against common attack vectors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Attack 1: Reentrancy */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-500 rounded-full p-3 mr-3 text-white">
                <i className="fas fa-repeat text-xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-badir-mocha">Reentrancy Attack</h3>
            </div>
            
            <p className="mb-6">
              This attack occurs when a contract function is repeatedly called before the first execution is complete, potentially draining funds.
            </p>
            
            {/* Attack animation container */}
            <div className="relative h-64 bg-badir-grey bg-opacity-20 rounded-xl overflow-hidden mb-6">
              <div className="w-full h-full p-4">
                {/* Smart Contract */}
                <div className="absolute top-4 left-4 right-4 h-16 bg-badir-sand rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-medium">Badir Smart Contract</p>
                    <p className="text-sm">Balance: 10 ETH</p>
                  </div>
                </div>
                
                {/* Attacker */}
                <motion.div 
                  animate={attackerControls}
                  className="absolute bottom-4 left-4 w-40 h-16 bg-red-100 border-2 border-red-400 rounded-lg flex items-center justify-center shadow-md"
                >
                  <div className="text-center">
                    <p className="font-medium text-red-500">Attacker Contract</p>
                    <p className="text-sm">Balance: 0 ETH</p>
                  </div>
                </motion.div>
                
                {/* User */}
                <div className="absolute bottom-4 right-4 w-40 h-16 bg-green-100 border-2 border-green-400 rounded-lg flex items-center justify-center shadow-md">
                  <div className="text-center">
                    <p className="font-medium text-green-600">Legitimate User</p>
                    <p className="text-sm">Balance: 1 ETH</p>
                  </div>
                </div>
                
                {/* Attack arrow */}
                <motion.div 
                  animate={attackArrowControls}
                  className="absolute left-24 bottom-24 w-0 h-0 bg-red-500"
                ></motion.div>
              </div>
              
              {/* Protection overlay */}
              <motion.div 
                className="absolute inset-0 bg-badir-rose bg-opacity-20 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: reentrancyProtectionVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-lg p-4 max-w-xs text-center shadow-lg">
                  <i className="fas fa-shield-alt text-badir-rose text-3xl mb-2"></i>
                  <p className="font-medium">Protected by Checks-Effects-Interactions Pattern</p>
                  <p className="text-sm mt-2">State changes are completed before external calls</p>
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={simulateReentrancyAttack}
                className="px-4 py-2 h-auto bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
              >
                <i className="fas fa-play mr-2"></i> Simulate Attack
              </Button>
              <Button
                onClick={showReentrancyProtection}
                className="px-4 py-2 h-auto bg-badir-rose text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
              >
                <i className="fas fa-shield-alt mr-2"></i> Show Protection
              </Button>
            </div>
            
            <div className="bg-badir-tan bg-opacity-20 rounded-lg p-3 mt-4 text-xs">
              <p className="text-badir-mocha mb-2 font-medium">Protection in Badir:</p>
              <pre className="text-badir-mocha">// Update state before external calls
donations[msg.sender] += msg.value;
totalDonations += msg.value;

// THEN emit events or make external calls
emit DonationReceived(...);</pre>
            </div>
          </motion.div>
          
          {/* Attack 2: Front-running */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-500 rounded-full p-3 mr-3 text-white">
                <i className="fas fa-bolt text-xl"></i>
              </div>
              <h3 className="text-2xl font-semibold text-badir-mocha">Front-running Attack</h3>
            </div>
            
            <p className="mb-6">
              Occurs when an attacker sees a pending transaction and submits their own with higher gas fees to be processed first, gaining an unfair advantage.
            </p>
            
            {/* Attack animation container */}
            <div className="relative h-64 bg-badir-grey bg-opacity-20 rounded-xl overflow-hidden mb-6">
              <div className="w-full h-full p-4">
                {/* Mempool visualization */}
                <div className="absolute top-4 left-4 right-4 h-16 bg-badir-mocha rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-medium text-white">Ethereum Mempool</p>
                    <p className="text-sm text-badir-grey">Pending Transactions</p>
                  </div>
                </div>
                
                {/* Transaction queue */}
                <div className="absolute top-24 left-4 right-4 h-32">
                  {/* Legitimate Tx */}
                  <motion.div 
                    animate={legitimateTxControls}
                    className="absolute top-4 left-4 w-64 h-16 bg-green-100 border-2 border-green-400 rounded-lg flex items-center p-3 shadow-md"
                  >
                    <div>
                      <p className="font-medium text-green-600">User Transaction</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs mr-2">Gas Price:</span>
                        <span className="text-xs font-mono bg-green-200 px-1 rounded">20 Gwei</span>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Attacker Tx */}
                  <motion.div 
                    animate={attackerTxControls}
                    initial={{ opacity: 0 }}
                    className="absolute top-4 left-4 w-64 h-16 bg-red-100 border-2 border-red-400 rounded-lg flex items-center p-3 shadow-md"
                  >
                    <div>
                      <p className="font-medium text-red-500">Attacker Transaction</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs mr-2">Gas Price:</span>
                        <span className="text-xs font-mono bg-red-200 px-1 rounded">50 Gwei</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Protection overlay */}
              <motion.div 
                className="absolute inset-0 bg-badir-rose bg-opacity-20 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: frontRunProtectionVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-lg p-4 max-w-xs text-center shadow-lg">
                  <i className="fas fa-lock text-badir-rose text-3xl mb-2"></i>
                  <p className="font-medium">Protected by Non-time-sensitive Operations</p>
                  <p className="text-sm mt-2">Donation amounts are fixed by sender, making front-running ineffective</p>
                </div>
              </motion.div>
            </div>
            
            <div className="flex justify-between">
              <Button
                onClick={simulateFrontRunAttack}
                className="px-4 py-2 h-auto bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
              >
                <i className="fas fa-play mr-2"></i> Simulate Attack
              </Button>
              <Button
                onClick={showFrontRunProtection}
                className="px-4 py-2 h-auto bg-badir-rose text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
              >
                <i className="fas fa-shield-alt mr-2"></i> Show Protection
              </Button>
            </div>
            
            <div className="bg-badir-tan bg-opacity-20 rounded-lg p-3 mt-4 text-xs">
              <p className="text-badir-mocha mb-2 font-medium">Protection in Badir:</p>
              <pre className="text-badir-mocha">// Fixed donation amounts
// No price-sensitive operations
// No first-come-first-served limited resources

// Each donation is independent
function donate() public payable {
  // No advantage to front-running
}</pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Slide9Attacks;
