import { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Slide9Attacks = () => {
  // State for current tab
  const [activeTab, setActiveTab] = useState("reentrancy");
  
  // Reentrancy attack state
  const [reentrancyStep, setReentrancyStep] = useState(0);
  const [contractBalance, setContractBalance] = useState(10);
  const [attackerBalance, setAttackerBalance] = useState(0);
  const reentrancyControls = useAnimation();
  
  // NoContract modifier state
  const [noContractLogs, setNoContractLogs] = useState<string[]>([]);
  const [showNoContractProtection, setShowNoContractProtection] = useState(false);
  
  // Centralization state
  const [centralizedNodes, setCentralizedNodes] = useState<boolean[]>([true, true, true, true, true]);
  const [decentralizedNodes, setDecentralizedNodes] = useState<boolean[]>([true, true, true, true, true, true, true, true, true]);
  const [centralAttack, setCentralAttack] = useState(false);
  const [decentralAttack, setDecentralAttack] = useState(false);
  
  // DoS attack state
  const [showDoSProtection, setShowDoSProtection] = useState(false);
  const [distributing, setDistributing] = useState(false);
  
  // Reentrancy attack simulation
  const simulateReentrancyAttack = async () => {
    setReentrancyStep(1);
    await reentrancyControls.start({
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    });
    
    // Step 2: First withdrawal
    setTimeout(() => {
      setReentrancyStep(2);
      setContractBalance(prev => prev - 1);
      
      // Step 3: Re-enter before balance update
      setTimeout(() => {
        setReentrancyStep(3);
        
        // Step 4: Second withdrawal
        setTimeout(() => {
          setReentrancyStep(4);
          setContractBalance(prev => prev - 1);
          setAttackerBalance(prev => prev + 2);
          
          // Reset after demo
          setTimeout(() => {
            setReentrancyStep(0);
            setContractBalance(10);
            setAttackerBalance(0);
          }, 3000);
        }, 1500);
      }, 1500);
    }, 1500);
  };
  
  // NoContract modifier simulation
  const simulateNoContractProtection = () => {
    // Clear previous logs
    setNoContractLogs([]);
    
    // Add log messages for legitimate user
    setNoContractLogs(prev => [...prev, "➤ User transaction received..."]);
    
    setTimeout(() => {
      setNoContractLogs(prev => [...prev, "➤ Checking tx.origin == msg.sender"]);
      
      setTimeout(() => {
        setNoContractLogs(prev => [...prev, "✓ Validation passed: Direct user call"]);
        
        setTimeout(() => {
          setNoContractLogs(prev => [...prev, "✓ Function executed successfully"]);
        }, 1000);
      }, 1000);
    }, 1000);
  };
  
  const simulateNoContractAttack = () => {
    // Clear previous logs
    setNoContractLogs([]);
    
    // Add log messages for malicious contract
    setNoContractLogs(prev => [...prev, "➤ Contract transaction received..."]);
    
    setTimeout(() => {
      setNoContractLogs(prev => [...prev, "➤ Checking tx.origin == msg.sender"]);
      
      setTimeout(() => {
        setNoContractLogs(prev => [...prev, "⨯ Validation failed: tx.origin ≠ msg.sender"]);
        
        setTimeout(() => {
          setNoContractLogs(prev => [...prev, "⨯ Transaction reverted: NoContract modifier"]);
          setShowNoContractProtection(true);
          
          setTimeout(() => {
            setShowNoContractProtection(false);
          }, 2000);
        }, 1000);
      }, 1000);
    }, 1000);
  };
  
  // Centralization attack simulation
  const attackCentralized = () => {
    if (centralAttack) return; // Prevent multiple attacks
    
    setCentralAttack(true);
    // First attack the central node
    setCentralizedNodes([false, true, true, true, true]);
    
    // Then after a delay, show all nodes failing
    setTimeout(() => {
      setCentralizedNodes([false, false, false, false, false]);
    }, 1000);
  };
  
  const attackDecentralized = () => {
    if (decentralAttack) return; // Prevent multiple attacks
    
    setDecentralAttack(true);
    // Attack multiple nodes but network remains functional
    setDecentralizedNodes([
      false, // Node 0 attacked
      true,
      false, // Node 2 attacked
      true, 
      false, // Node 4 attacked
      true,
      true,
      false, // Node 7 attacked
      true
    ]);
  };
  
  // Reset network nodes
  const resetNetworks = () => {
    setCentralAttack(false);
    setDecentralAttack(false);
    setCentralizedNodes([true, true, true, true, true]);
    setDecentralizedNodes([true, true, true, true, true, true, true, true, true]);
  };
  
  // DoS attack simulation
  const simulateDoSVulnerable = () => {
    setDistributing(true);
    
    setTimeout(() => {
      setShowDoSProtection(true);
      
      setTimeout(() => {
        setShowDoSProtection(false);
        setDistributing(false);
      }, 2000);
    }, 2000);
  };
  
  const simulateDoSSafe = () => {
    setDistributing(true);
    
    setTimeout(() => {
      setDistributing(false);
    }, 2000);
  };
  
  return (
    <section id="slide9" className="slide bg-badir-cream relative overflow-hidden">
      <div className="slide-container h-full">
        <h2 className="text-4xl font-bold text-badir-mocha mb-4">
          Blockchain Security Attacks
        </h2>
        
        <p className="text-lg text-badir-mocha mb-6 max-w-4xl mx-auto">
          Understanding potential vulnerabilities helps us build stronger defenses. Explore interactive simulations of common blockchain attack vectors.
        </p>
        
        <Tabs defaultValue="reentrancy" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8 bg-badir-tan/20 p-1 rounded-lg">
            <TabsTrigger value="reentrancy" className="data-[state=active]:bg-badir-rose data-[state=active]:text-white">
              <i className="fas fa-sync-alt mr-2"></i> Reentrancy
            </TabsTrigger>
            <TabsTrigger value="nocontract" className="data-[state=active]:bg-badir-rose data-[state=active]:text-white">
              <i className="fas fa-user-shield mr-2"></i> NoContract
            </TabsTrigger>
            <TabsTrigger value="centralization" className="data-[state=active]:bg-badir-rose data-[state=active]:text-white">
              <i className="fas fa-network-wired mr-2"></i> Centralization
            </TabsTrigger>
            <TabsTrigger value="dos" className="data-[state=active]:bg-badir-rose data-[state=active]:text-white">
              <i className="fas fa-ban mr-2"></i> DoS Attack
            </TabsTrigger>
          </TabsList>
          
          {/* 1. Reentrancy Attack Tab */}
          <TabsContent value="reentrancy" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-sync-alt text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">Reentrancy Attack Simulation</h3>
              </div>
              
              <p className="mb-6">
                This attack occurs when a malicious contract repeatedly calls the vulnerable function before the first call completes, draining funds through repeated withdrawals.
              </p>
              
              {/* Reentrancy Attack Diagram */}
              <div className="flex justify-center mb-6">
                <div className="max-w-md">
                  <img 
                    src="/images/image_1747777912912.png"
                    alt="Reentrancy Attack Flow Diagram"
                    className="w-full h-auto rounded-lg shadow-md border border-badir-tan/30"
                  />
                </div>
              </div>
              
              {/* Simulation area */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-badir-grey/10 rounded-xl p-4 relative h-80 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Vulnerable Contract</h4>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md mb-4 overflow-auto h-40">
                    <pre>{`function withdraw() public {
  uint amount = balances[msg.sender];
  
  // Vulnerable: Sends ETH before
  // updating the balance
  (bool success, ) = msg.sender.call{
    value: amount
  }("");
  
  // State updated too late
  balances[msg.sender] = 0;
}`}</pre>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-badir-tan/20 rounded-md">
                    <div>
                      <p className="text-sm font-semibold">Contract Balance:</p>
                      <p className="text-2xl font-mono text-badir-mocha">{contractBalance} ETH</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">Attacker Balance:</p>
                      <p className="text-2xl font-mono text-badir-mocha">{attackerBalance} ETH</p>
                    </div>
                  </div>
                  
                  {/* Execution flow indicator */}
                  {reentrancyStep > 0 && (
                    <div className="absolute inset-x-0 bottom-5 flex justify-center">
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4].map((step) => (
                          <div 
                            key={step}
                            className={`w-3 h-3 rounded-full ${reentrancyStep >= step ? 'bg-badir-rose' : 'bg-badir-tan/40'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="bg-badir-grey/10 rounded-xl p-4 h-80 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Execution Stack</h4>
                  
                  <div className="border border-badir-tan/30 rounded-lg h-60 p-3 bg-badir-cream/90 relative overflow-hidden">
                    <motion.div 
                      animate={reentrancyControls}
                      initial={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      {reentrancyStep >= 1 && (
                        <div className={`p-2 rounded-md border ${reentrancyStep >= 2 ? 'border-badir-tan/40 bg-badir-cream/50' : 'border-badir-rose/30 bg-badir-rose/10'}`}>
                          <p className="text-sm">
                            <span className="font-mono text-badir-mocha/70">withdraw()</span> 
                            <span className="font-mono ml-2 text-xs px-1 py-0.5 rounded bg-badir-tan/30 text-badir-mocha">Attacker → Contract</span>
                          </p>
                        </div>
                      )}
                      
                      {reentrancyStep >= 2 && (
                        <div className="p-2 rounded-md border border-green-300 bg-green-50">
                          <p className="text-sm">
                            <span className="font-mono text-badir-mocha/70">call()</span> 
                            <span className="font-mono ml-2 text-xs px-1 py-0.5 rounded bg-gray-200">1 ETH Transfer</span>
                          </p>
                        </div>
                      )}
                      
                      {reentrancyStep >= 3 && (
                        <div className={`p-2 rounded-md border ${reentrancyStep >= 4 ? 'border-gray-300 bg-gray-100' : 'border-red-300 bg-red-50'}`}>
                          <p className="text-sm">
                            <span className="font-mono text-badir-mocha/70">withdraw()</span> 
                            <span className="font-mono ml-2 text-xs px-1 py-0.5 rounded bg-gray-200">Re-entered!</span>
                            <span className="text-red-500 ml-2">⚠</span>
                          </p>
                        </div>
                      )}
                      
                      {reentrancyStep >= 4 && (
                        <div className="p-2 rounded-md border border-green-300 bg-green-50">
                          <p className="text-sm">
                            <span className="font-mono text-badir-mocha/70">call()</span> 
                            <span className="font-mono ml-2 text-xs px-1 py-0.5 rounded bg-gray-200">1 ETH Transfer</span>
                          </p>
                        </div>
                      )}
                    </motion.div>
                    
                    <div className="absolute inset-x-0 bottom-0 py-2 text-center">
                      {reentrancyStep === 3 && (
                        <p className="text-red-500 text-sm animate-pulse">Contract is re-entered before balance update! <i className="fas fa-exclamation-triangle"></i></p>
                      )}
                      {reentrancyStep === 4 && (
                        <p className="text-red-500 text-sm"><i className="fas fa-exclamation-triangle"></i> Attacker exploited reentrancy to withdraw twice!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <Button
                    onClick={simulateReentrancyAttack}
                    className="px-4 py-2 h-auto bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
                    disabled={reentrancyStep > 0}
                  >
                    <i className="fas fa-play mr-2"></i> Simulate Attack
                  </Button>
                </div>
                
                <div className="bg-badir-tan/30 rounded-lg px-4 py-2 border border-badir-tan/50">
                  <p className="text-sm text-badir-mocha">
                    <span className="font-semibold">Protection:</span> <span className="font-mono text-xs">nonReentrant Modifier</span>
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* 2. NoContract Modifier Tab */}
          <TabsContent value="nocontract" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-user-shield text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">NoContract Modifier</h3>
              </div>
              
              <p className="mb-6">
                This security measure prevents contract phishing attacks by ensuring only direct user transactions are allowed, not calls from malicious contracts.
              </p>
              
              {/* NoContract Attack Diagram */}
              <div className="flex justify-center mb-6">
                <div className="max-w-md">
                  <img 
                    src="/images/nocontract-diagram.png"
                    alt="No Contract Attack Diagram"
                    className="w-full h-auto rounded-lg shadow-md border border-badir-tan/30"
                  />
                </div>
              </div>
              
              <div className="relative bg-badir-grey/10 rounded-xl p-4 mb-6 border border-badir-tan/30">
                {/* Code example */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-badir-mocha">NoContract Modifier</h4>
                    <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md overflow-auto h-48">
                      <pre>{`// Prevents calls from contracts
modifier noContract() {
  // Ensures caller is not a contract
  require(
    tx.origin == msg.sender,
    "No contracts allowed"
  );
  _;
}

// Function with protection
function transfer(address to, uint amount) 
  public 
  noContract  // ← Protection applied
{
  // Only direct user calls allowed
  // Contract calls rejected
}`}</pre>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Runtime Logs</h4>
                    <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md overflow-auto h-48">
                      {noContractLogs.length === 0 ? (
                        <div className="text-gray-500 italic">Click a button below to see execution logs...</div>
                      ) : (
                        <div className="space-y-2">
                          {noContractLogs.map((log, idx) => (
                            <div key={idx} className={`
                              ${log.includes("✓") ? "text-green-400" : ""} 
                              ${log.includes("⨯") ? "text-red-400" : ""}
                              ${log.includes("➤") ? "text-blue-400" : ""}
                            `}>
                              {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex space-x-4">
                  <Button 
                    onClick={simulateNoContractProtection} 
                    className="bg-green-600 text-white"
                  >
                    <i className="fas fa-user mr-2"></i> User Transaction
                  </Button>
                  <Button 
                    onClick={simulateNoContractAttack} 
                    className="bg-red-500 text-white"
                  >
                    <i className="fas fa-robot mr-2"></i> Contract Transaction
                  </Button>
                </div>
                
                {/* Protection overlay */}
                <AnimatePresence>
                  {showNoContractProtection && (
                    <motion.div 
                      className="absolute inset-0 bg-badir-rose/20 backdrop-blur-sm flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="bg-badir-cream/90 rounded-lg p-4 shadow-lg max-w-xs text-center border border-badir-tan/30">
                        <div className="text-3xl text-badir-rose mb-2">
                          <i className="fas fa-shield-alt"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-badir-mocha">Contract Call Blocked</h4>
                        <p className="text-sm mt-2">
                          The NoContract modifier detected and blocked a contract-based attack attempt.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="text-yellow-500 mr-3">
                    <i className="fas fa-info-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha mb-1">Security Note</h4>
                    <p className="text-sm text-badir-mocha/80">
                      While the noContract modifier helps against simple phishing attacks, it's not a complete solution. Advanced projects should also implement multisig wallets, timelock mechanisms, and comprehensive security reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* 3. Centralization Tab */}
          <TabsContent value="centralization" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-network-wired text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">Centralization Risks</h3>
              </div>
              
              <p className="mb-6">
                Centralized systems have single points of failure while decentralized networks remain resilient even when multiple nodes are compromised.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Centralized Network */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-center text-badir-mocha">Centralized Network</h4>
                  
                  <div className="relative h-60 border border-badir-tan/30 rounded-lg bg-badir-cream/80 flex items-center justify-center">
                    <div className="relative">
                      {/* Central node */}
                      <div className={`w-16 h-16 rounded-full ${centralizedNodes[0] ? 'bg-badir-rose' : 'bg-gray-400'} shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white z-10`}>
                        <i className="fas fa-database text-2xl"></i>
                      </div>
                      
                      {/* Satellite nodes */}
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i}
                          className={`w-12 h-12 rounded-full ${centralizedNodes[i] ? 'bg-badir-tan' : 'bg-gray-400'} absolute flex items-center justify-center text-white`}
                          style={{
                            top: `${50 + 35 * Math.sin(i * Math.PI / 2)}%`,
                            left: `${50 + 35 * Math.cos(i * Math.PI / 2)}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <i className="fas fa-laptop text-lg"></i>
                        </div>
                      ))}
                      
                      {/* Connection lines */}
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={`line-${i}`}
                          className={`absolute top-1/2 left-1/2 h-0.5 ${centralizedNodes[0] && centralizedNodes[i] ? 'bg-badir-mocha/40' : 'bg-gray-300/40'} z-0`}
                          style={{
                            width: '35%',
                            transformOrigin: '0 0',
                            transform: `rotate(${i * 90}deg)`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      onClick={attackCentralized} 
                      className="bg-red-500 text-white"
                      disabled={centralAttack}
                    >
                      {centralAttack ? (
                        <>
                          <i className="fas fa-times-circle mr-2"></i> System Down
                        </>
                      ) : (
                        <>
                          <i className="fas fa-bolt mr-2"></i> Attack Central Node
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Decentralized Network */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-center text-badir-mocha">Decentralized Network</h4>
                  
                  <div className="relative h-60 border border-badir-tan/30 rounded-lg bg-badir-cream/80 p-4">
                    <div className="w-full h-full relative">
                      {/* Generate grid of nodes */}
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                        const row = Math.floor(i / 3);
                        const col = i % 3;
                        return (
                          <div 
                            key={i}
                            className={`w-10 h-10 rounded-full ${decentralizedNodes[i] ? 'bg-badir-rose' : 'bg-gray-400'} absolute flex items-center justify-center text-white`}
                            style={{
                              top: `${20 + row * 30}%`,
                              left: `${20 + col * 30}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <i className="fas fa-microchip text-xs"></i>
                          </div>
                        );
                      })}
                      
                      {/* Horizontal connection lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => {
                        const row = Math.floor(i / 3);
                        const col = i % 3;
                        // Only draw connection if there's a node next to it in the same row
                        if (col < 2) {
                          return (
                            <div 
                              key={`h-${i}`}
                              className={`absolute h-0.5 w-[25%] ${decentralizedNodes[i] && decentralizedNodes[i+1] ? 'bg-badir-mocha/40' : 'bg-gray-300/40'}`}
                              style={{
                                top: `${20 + row * 30}%`,
                                left: `${20 + col * 30 + 5}%`,
                              }}
                            ></div>
                          );
                        }
                        return null;
                      })}
                      
                      {/* Vertical connection lines */}
                      {[0, 1, 2, 3, 4, 5].map((i) => {
                        const row = Math.floor(i / 3);
                        const col = i % 3;
                        // Only draw connection if there's a node below it
                        if (row < 2) {
                          return (
                            <div 
                              key={`v-${i}`}
                              className={`absolute w-0.5 h-[25%] ${decentralizedNodes[i] && decentralizedNodes[i+3] ? 'bg-badir-mocha/40' : 'bg-gray-300/40'}`}
                              style={{
                                top: `${20 + row * 30 + 5}%`,
                                left: `${20 + col * 30}%`,
                              }}
                            ></div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button 
                      onClick={attackDecentralized} 
                      className="bg-red-500 text-white"
                      disabled={decentralAttack}
                    >
                      {decentralAttack ? (
                        <>
                          <i className="fas fa-check-circle mr-2"></i> System Still Running
                        </>
                      ) : (
                        <>
                          <i className="fas fa-bolt mr-2"></i> Attack Multiple Nodes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={resetNetworks} 
                  className="bg-badir-mocha text-white"
                  disabled={!centralAttack && !decentralAttack}
                >
                  <i className="fas fa-redo mr-2"></i> Reset Networks
                </Button>
              </div>
              
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex">
                  <div className="text-green-500 mr-3">
                    <i className="fas fa-check-circle text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha mb-1">Blockchain Advantage</h4>
                    <p className="text-sm text-badir-mocha/80">
                      Badir Donation Platform utilizes blockchain's decentralized architecture to ensure the platform remains operational even if some nodes are compromised. This eliminates single points of failure and increases overall system reliability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* 4. DoS Attack Tab */}
          <TabsContent value="dos" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-ban text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">Denial of Service (DoS) Prevention</h3>
              </div>
              
              <p className="mb-6">
                Smart contracts are vulnerable to DoS attacks when they depend on external calls that can be manipulated to fail or stall operations.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Vulnerable Implementation */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30 relative">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-badir-mocha">Vulnerable Pattern</h4>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Vulnerable</span>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-red-100 rounded-md overflow-auto h-48">
                    <pre>{`// Vulnerable: Loops through all beneficiaries
function distributeRewards() public {
  // Must process ALL beneficiaries 
  // in a single transaction
  for(uint i = 0; i < beneficiaries.length; i++) {
    // If ANY transfer fails, entire 
    // function reverts
    beneficiaries[i].transfer(
      rewards[beneficiaries[i]]
    );
  }
}

// Attack: Add a malicious recipient that
// always rejects payments
function attack() public {
  // Add malicious contract that 
  // reverts on payment
  beneficiaries.push(new MaliciousContract());
  // Now distributeRewards() will always fail!
}`}</pre>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      onClick={simulateDoSVulnerable}
                      className="bg-red-500 text-white flex items-center"
                      disabled={distributing}
                    >
                      {distributing ? (
                        <>
                          <span className="mr-2 animate-spin">
                            <i className="fas fa-circle-notch"></i>
                          </span>
                          Distributing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-play mr-2"></i>
                          Simulate Distribution
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {/* Error overlay */}
                  <AnimatePresence>
                    {showDoSProtection && (
                      <motion.div 
                        className="absolute inset-0 bg-red-500/90 rounded-xl flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="text-white text-center p-4">
                          <div className="text-4xl mb-3">
                            <i className="fas fa-exclamation-triangle"></i>
                          </div>
                          <h4 className="text-xl font-bold mb-2">Transaction Failed</h4>
                          <p className="text-sm max-w-xs mx-auto">
                            Distribution failed because recipient #12 rejected the payment, blocking all other distributions.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Secure Implementation */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-badir-mocha">Secure Pattern: Pull Payments</h4>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Protected</span>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-green-100 rounded-md overflow-auto h-48">
                    <pre>{`// Secure: Use Pull Payments pattern
// Let recipients withdraw their own funds

// 1. SECURE: Update balances internally
function updateRewards() public {
  for(uint i = 0; i < beneficiaries.length; i++) {
    pendingRewards[beneficiaries[i]] = 
      calculateReward(beneficiaries[i]);
  }
}

// 2. SECURE: Each user withdraws separately
function withdrawReward() public {
  uint amount = pendingRewards[msg.sender];
  pendingRewards[msg.sender] = 0;
  // Even if this fails, it only affects one user
  msg.sender.transfer(amount);
}`}</pre>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      onClick={simulateDoSSafe}
                      className="bg-green-600 text-white flex items-center"
                      disabled={distributing}
                    >
                      {distributing ? (
                        <>
                          <span className="mr-2 animate-spin">
                            <i className="fas fa-circle-notch"></i>
                          </span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-play mr-2"></i>
                          Simulate Safe Distribution
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex">
                  <div className="text-blue-500 mr-3">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha mb-1">Best Practice: Pull Over Push</h4>
                    <p className="text-sm text-badir-mocha/80">
                      The Badir Donation Platform uses a Pull Payment pattern where recipients withdraw funds themselves rather than having the contract send funds directly. This architecture prevents malicious recipients from blocking payments to others and increases system resilience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Slide9Attacks;