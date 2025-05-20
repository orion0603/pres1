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
  
  // DoS attack state
  const [showDoSProtection, setShowDoSProtection] = useState(false);
  const [distributing, setDistributing] = useState(false);
  
  // CEI pattern state
  const [ceiStep, setCeiStep] = useState(0);
  
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
  
  // Show CEI pattern protection
  const showCEIPattern = () => {
    setCeiStep(1);
    
    // Step 1: Checks
    setTimeout(() => {
      // Step 2: Effects (State Changes)
      setCeiStep(2);
      
      setTimeout(() => {
        // Step 3: Interactions (External Calls)
        setCeiStep(3);
        
        // Reset after demo
        setTimeout(() => {
          setCeiStep(0);
        }, 2000);
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
    // Attack the central node
    setCentralizedNodes([false, true, true, true, true]);
    
    setTimeout(() => {
      // All nodes fail because they depend on the central one
      setCentralizedNodes([false, false, false, false, false]);
    }, 1000);
  };
  
  const attackDecentralized = () => {
    // Attack multiple nodes
    setDecentralizedNodes([false, true, false, true, false, true, true, false, true]);
    
    setTimeout(() => {
      // Network continues to function with remaining nodes
      setDecentralizedNodes([false, true, false, true, false, true, true, false, true]);
    }, 1000);
  };
  
  // Reset network nodes
  const resetNetworks = () => {
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
          <TabsList className="grid grid-cols-5 mb-8 bg-badir-tan/20 p-1 rounded-lg">
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
            <TabsTrigger value="cei" className="data-[state=active]:bg-badir-rose data-[state=active]:text-white">
              <i className="fas fa-code mr-2"></i> CEI Pattern
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
                            className={`w-3 h-3 rounded-full ${reentrancyStep >= step ? 'bg-red-500' : 'bg-gray-300'}`}
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
                        <div className={`p-2 rounded-md border ${reentrancyStep >= 2 ? 'border-gray-300 bg-gray-100' : 'border-red-300 bg-red-50'}`}>
                          <p className="text-sm">
                            <span className="font-mono text-badir-mocha/70">withdraw()</span> 
                            <span className="font-mono ml-2 text-xs px-1 py-0.5 rounded bg-gray-200">Attacker → Contract</span>
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
                  <Button
                    onClick={showCEIPattern}
                    className="px-4 py-2 h-auto bg-green-600 text-white rounded-lg hover:bg-opacity-90 transition flex items-center text-sm"
                    disabled={ceiStep > 0}
                  >
                    <i className="fas fa-shield-alt mr-2"></i> Show CEI Pattern
                  </Button>
                </div>
                
                <div className="bg-badir-tan/30 rounded-lg px-4 py-2 border border-badir-tan/50">
                  <p className="text-sm text-badir-mocha">
                    <span className="font-semibold">Protection:</span> <span className="font-mono text-xs">Checks-Effects-Interactions Pattern</span>
                  </p>
                </div>
              </div>
              
              {/* CEI Pattern Animation */}
              {ceiStep > 0 && (
                <div className="mt-6 bg-badir-mocha/5 rounded-lg p-4 border border-badir-mocha/10">
                  <h4 className="text-lg font-semibold mb-2 text-badir-mocha">Checks-Effects-Interactions Pattern</h4>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className={`rounded-lg p-3 ${ceiStep >= 1 ? 'bg-badir-neon/20 border border-badir-neon/50' : 'bg-badir-tan/20 border border-badir-tan/40'}`}>
                      <h5 className="font-semibold flex items-center">
                        <span className="w-6 h-6 rounded-full bg-badir-neon text-badir-mocha flex items-center justify-center mr-2 text-xs">1</span>
                        Checks
                      </h5>
                      <p className="text-sm mt-2">Validate conditions first</p>
                      <pre className="text-xs mt-2 bg-badir-cream/70 p-2 rounded border border-badir-tan/30">{`// Verify the sender's balance
uint amount = balances[msg.sender];
require(amount > 0, "No balance");`}</pre>
                    </div>
                    
                    <div className={`rounded-lg p-3 ${ceiStep >= 2 ? 'bg-badir-neon/20 border border-badir-neon/50' : 'bg-badir-tan/20 border border-badir-tan/40'}`}>
                      <h5 className="font-semibold flex items-center">
                        <span className="w-6 h-6 rounded-full bg-badir-neon text-badir-mocha flex items-center justify-center mr-2 text-xs">2</span>
                        Effects
                      </h5>
                      <p className="text-sm mt-2">Update state before interactions</p>
                      <pre className="text-xs mt-2 bg-badir-cream/70 p-2 rounded border border-badir-tan/30">{`// Update state BEFORE transfers
balances[msg.sender] = 0;
// State is now updated`}</pre>
                    </div>
                    
                    <div className={`rounded-lg p-3 ${ceiStep >= 3 ? 'bg-badir-neon/20 border border-badir-neon/50' : 'bg-badir-tan/20 border border-badir-tan/40'}`}>
                      <h5 className="font-semibold flex items-center">
                        <span className="w-6 h-6 rounded-full bg-badir-neon text-badir-mocha flex items-center justify-center mr-2 text-xs">3</span>
                        Interactions
                      </h5>
                      <p className="text-sm mt-2">External calls come last</p>
                      <pre className="text-xs mt-2 bg-badir-cream/70 p-2 rounded border border-badir-tan/30">{`// External interactions LAST
(bool success, ) = msg.sender.call{
  value: amount
}("");`}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* 2. NoContract Modifier Tab */}
          <TabsContent value="nocontract" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-user-shield text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">NoContract Modifier Protection</h3>
              </div>
              
              <p className="mb-6">
                The NoContract modifier prevents contract-based attacks by verifying that the transaction origin (tx.origin) is the same as the message sender (msg.sender).
              </p>
              
              {/* Simulation area */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-badir-grey/10 rounded-xl p-4 relative h-80 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Contract Code</h4>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md mb-4 overflow-auto h-64">
                    <pre>{`// NoContract modifier checks if caller
// is a user and not a contract
modifier noContract() {
  require(
    tx.origin == msg.sender,
    "Contracts not allowed"
  );
  _;
}

// Protected function
function withdraw() 
  public 
  noContract 
{
  // Only direct transactions allowed
  // This prevents phishing contract attacks
  
  // Function implementation...
}`}</pre>
                  </div>
                </div>
                
                <div className="bg-badir-grey/10 rounded-xl p-4 h-80 border border-badir-tan/30 relative">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Terminal Output</h4>
                  
                  <div className="border border-badir-tan/30 rounded-lg p-3 bg-gray-900 text-gray-100 font-mono h-48 text-sm overflow-auto">
                    {noContractLogs.length === 0 ? (
                      <div className="text-gray-500 italic">// Terminal output will appear here...</div>
                    ) : (
                      noContractLogs.map((log, i) => (
                        <div key={i} className={`mb-1 ${log.includes("✓") ? "text-green-400" : log.includes("⨯") ? "text-red-400" : "text-gray-300"}`}>
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
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
              </div>
              
              <div className="bg-badir-tan/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Security Insight</h4>
                <p className="text-sm">
                  The NoContract modifier provides protection against phishing attacks where malicious contracts try to trick users into interacting with them. 
                  By checking if tx.origin (the original sender) matches msg.sender (the immediate caller), the contract can determine if it's being called 
                  directly by a user or through another contract.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* 3. Centralization vs Decentralization Tab */}
          <TabsContent value="centralization" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-network-wired text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">Centralization vs Decentralization</h3>
              </div>
              
              <p className="mb-6">
                This simulation demonstrates how centralized systems have a single point of failure, while decentralized systems can continue operating despite multiple node failures.
              </p>
              
              {/* Network visualizations */}
              <div className="grid grid-cols-2 gap-8 mb-6">
                {/* Centralized Network */}
                <div className="bg-badir-grey/10 rounded-xl p-4 h-80 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Centralized Network</h4>
                  
                  <div className="relative h-56">
                    {/* Central node */}
                    <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${centralizedNodes[0] ? 'bg-blue-500' : 'bg-red-500'} flex items-center justify-center text-white shadow-lg`}>
                      <i className="fas fa-server text-xl"></i>
                    </div>
                    
                    {/* Outer nodes */}
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i}
                        className={`absolute w-12 h-12 rounded-full ${centralizedNodes[i] ? 'bg-blue-400' : 'bg-red-400'} flex items-center justify-center text-white shadow-md transition-all duration-300`}
                        style={{
                          top: `${50 + 35 * Math.sin(i * Math.PI / 2)}%`,
                          left: `${50 + 35 * Math.cos(i * Math.PI / 2)}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <i className="fas fa-desktop"></i>
                      </div>
                    ))}
                    
                    {/* Connection lines */}
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={`line-${i}`}
                        className={`absolute top-1/2 left-1/2 h-0.5 ${centralizedNodes[0] && centralizedNodes[i] ? 'bg-blue-300' : 'bg-red-300'} origin-left`}
                        style={{
                          width: '35%',
                          transform: `rotate(${i * 90}deg)`
                        }}
                      ></div>
                    ))}
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-0 inset-x-0 text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${centralizedNodes.some(node => !node) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${centralizedNodes.some(node => !node) ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {centralizedNodes.every(node => node) ? 'Network Operational' : 
                         !centralizedNodes[0] ? 'Network Down - Central Failure' : 'Network Degraded'}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decentralized Network */}
                <div className="bg-badir-grey/10 rounded-xl p-4 h-80 border border-badir-tan/30">
                  <h4 className="text-lg font-semibold mb-4 text-badir-mocha">Decentralized Network</h4>
                  
                  <div className="relative h-56">
                    {/* Nodes placed in a grid-like pattern */}
                    {decentralizedNodes.map((active, i) => {
                      const row = Math.floor(i / 3);
                      const col = i % 3;
                      return (
                        <div 
                          key={i}
                          className={`absolute w-10 h-10 rounded-full ${active ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center text-white shadow-md transition-all duration-300`}
                          style={{
                            top: `${25 + row * 25}%`,
                            left: `${25 + col * 25}%`,
                            transform: 'translate(-50%, -50%)'
                          }}
                        >
                          <i className="fas fa-cube text-sm"></i>
                        </div>
                      );
                    })}
                    
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
                      {decentralizedNodes.map((_, i) => {
                        const row = Math.floor(i / 3);
                        const col = i % 3;
                        const connections = [];
                        
                        // Right connection
                        if (col < 2) {
                          connections.push(
                            <line 
                              key={`${i}-right`}
                              x1={`${25 + col * 25}%`} 
                              y1={`${25 + row * 25}%`} 
                              x2={`${25 + (col+1) * 25}%`} 
                              y2={`${25 + row * 25}%`} 
                              stroke={decentralizedNodes[i] && decentralizedNodes[i+1] ? '#10B981' : '#9CA3AF'} 
                              strokeWidth="1"
                            />
                          );
                        }
                        
                        // Bottom connection
                        if (row < 2) {
                          connections.push(
                            <line 
                              key={`${i}-bottom`}
                              x1={`${25 + col * 25}%`} 
                              y1={`${25 + row * 25}%`} 
                              x2={`${25 + col * 25}%`} 
                              y2={`${25 + (row+1) * 25}%`} 
                              stroke={decentralizedNodes[i] && decentralizedNodes[i+3] ? '#10B981' : '#9CA3AF'} 
                              strokeWidth="1"
                            />
                          );
                        }
                        
                        return connections;
                      })}
                    </svg>
                    
                    {/* Status indicator */}
                    <div className="absolute bottom-0 inset-x-0 text-center">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${decentralizedNodes.every(node => !node) ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${decentralizedNodes.every(node => !node) ? 'bg-red-500' : 'bg-green-500'}`}></span>
                        {decentralizedNodes.every(node => !node) ? 'Network Down' : 
                         decentralizedNodes.some(node => !node) ? 'Network Operational - Some Nodes Down' : 'Network Operational'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Control buttons */}
              <div className="flex justify-between">
                <div className="space-x-4">
                  <Button
                    onClick={attackCentralized}
                    className="bg-red-500 text-white"
                  >
                    <i className="fas fa-virus mr-2"></i> Attack Centralized
                  </Button>
                  <Button
                    onClick={attackDecentralized}
                    className="bg-red-500 text-white"
                  >
                    <i className="fas fa-virus mr-2"></i> Attack Decentralized
                  </Button>
                </div>
                <Button
                  onClick={resetNetworks}
                  className="bg-badir-mocha text-white"
                >
                  <i className="fas fa-redo mr-2"></i> Reset Networks
                </Button>
              </div>
              
              <div className="mt-6 bg-badir-tan/10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Security Insight</h4>
                <p className="text-sm">
                  Blockchain's decentralized architecture eliminates single points of failure. When some nodes are compromised, 
                  the network continues to operate with the remaining nodes, providing enhanced security and resilience.
                  This is why Badir utilizes decentralized blockchain technology for transparency and resilience.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* 4. DoS Attack Protection Tab */}
          <TabsContent value="dos" className="mt-0">
            <div className="bg-badir-sand/90 rounded-xl p-6 shadow-lg border border-badir-tan/30">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-ban text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">DoS Attack Protection</h3>
              </div>
              
              <p className="mb-6">
                This simulation demonstrates how the "Pull over Push" pattern protects against Denial of Service (DoS) attacks 
                by shifting the responsibility of withdrawing funds to recipients.
              </p>
              
              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Vulnerable Push Pattern */}
                <div className="bg-badir-sand/70 rounded-xl p-5 shadow-md border border-badir-rose/30 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-badir-rose/20 rounded-full flex items-center justify-center mr-2">
                        <i className="fas fa-arrow-circle-down text-badir-rose"></i>
                      </div>
                      <h4 className="text-lg font-semibold text-badir-mocha">Push Pattern</h4>
                    </div>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Vulnerable</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-3 mb-3 border border-gray-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Problem:</strong> Contract sends ETH to all recipients in a loop
                    </p>
                    <p className="text-sm text-gray-700">
                      If any recipient rejects the payment, <strong>all transfers fail</strong>
                    </p>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md mb-4 overflow-auto h-28">
                    <pre>{`function distributePayments() public {
  for(uint i = 0; i < recipients.length; i++) {
    // Vulnerable: One failure blocks everything
    payable(recipients[i]).transfer(amounts[i]);
    // All future recipients are blocked
  }
}`}</pre>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2">
                        <i className="fas fa-exclamation-triangle text-red-500 text-xs"></i>
                      </div>
                      <span className="text-sm font-medium text-red-700">DoS Attack Vector</span>
                    </div>
                    <p className="text-xs text-red-700 ml-7">
                      An attacker can create a contract that intentionally rejects payments, 
                      blocking fund distribution to all other recipients.
                    </p>
                  </div>
                  
                  {showDoSProtection && (
                    <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                        <div className="text-3xl text-red-500 mb-2">
                          <i className="fas fa-exclamation-triangle"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-badir-mocha">Transaction Failed</h4>
                        <p className="text-sm mt-2">
                          Attacker blocked all payments by rejecting their own transfer
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Safe Pull Pattern */}
                <div className="bg-white rounded-xl p-5 shadow-md border border-green-200 overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <i className="fas fa-arrow-circle-up text-green-600"></i>
                      </div>
                      <h4 className="text-lg font-semibold text-badir-mocha">Pull Pattern</h4>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Secure</span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-md p-3 mb-3 border border-gray-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Solution:</strong> Record available funds, let recipients withdraw
                    </p>
                    <p className="text-sm text-gray-700">
                      Each recipient is responsible for their own withdrawal
                    </p>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-gray-100 rounded-md mb-4 overflow-auto h-28">
                    <pre>{`// 1. Record funds (can't be blocked)
function recordPayments() public {
  for(uint i = 0; i < recipients.length; i++) {
    balances[recipients[i]] = amounts[i];
  }
}

// 2. Recipients withdraw individually
function withdraw() public {
  uint amount = balances[msg.sender];
  balances[msg.sender] = 0;
  payable(msg.sender).transfer(amount);
}`}</pre>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-center mb-2">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                        <i className="fas fa-shield-alt text-green-600 text-xs"></i>
                      </div>
                      <span className="text-sm font-medium text-green-700">DoS Protection</span>
                    </div>
                    <p className="text-xs text-green-700 ml-7">
                      If any recipient's withdrawal fails, it only affects that specific recipient.
                      All other recipients can still withdraw their funds successfully.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex justify-between">
                <Button
                  onClick={simulateDoSVulnerable}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  disabled={distributing}
                >
                  <i className="fas fa-play mr-2"></i> Simulate Attack on Push Pattern
                </Button>
                <Button
                  onClick={simulateDoSSafe}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                  disabled={distributing}
                >
                  <i className="fas fa-shield-alt mr-2"></i> Show Pull Pattern Protection
                </Button>
              </div>
              
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold mb-2 text-blue-800 flex items-center">
                  <i className="fas fa-info-circle mr-2"></i> Implementation in Badir
                </h4>
                <p className="text-sm text-blue-800">
                  Badir uses the Pull Pattern for all fund distributions. When charities are allocated funds from donations,
                  they must withdraw them through a secure claim process, ensuring that no single entity can block the
                  distribution of funds to all recipients.
                </p>
              </div>
            </div>
          </TabsContent>
          
          {/* 5. CEI Pattern Tab */}
          <TabsContent value="cei" className="mt-0">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="bg-badir-rose rounded-full p-3 mr-3 text-white">
                  <i className="fas fa-code text-xl"></i>
                </div>
                <h3 className="text-2xl font-semibold text-badir-mocha">Checks-Effects-Interactions Pattern</h3>
              </div>
              
              <p className="mb-6">
                The Checks-Effects-Interactions (CEI) pattern is a secure coding practice for Solidity contracts that helps prevent reentrancy and other attacks.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Vulnerable Contract */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-badir-mocha">Vulnerable Implementation</h4>
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Vulnerable</span>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-red-100 rounded-md overflow-auto h-64">
                    <pre>{`// ❌ Vulnerable to reentrancy
function withdraw() public {
  // Get the amount
  uint amount = balances[msg.sender];
  
  // ❌ WRONG ORDER: Interaction before effects
  // Interaction: Send ETH to user
  (bool success, ) = msg.sender.call{
    value: amount
  }("");
  require(success, "Transfer failed");
  
  // Effect: Update state AFTER interaction
  // Attacker can reenter before this update
  balances[msg.sender] = 0;
}`}</pre>
                  </div>
                </div>
                
                {/* Secure Contract */}
                <div className="bg-badir-grey/10 rounded-xl p-4 border border-badir-tan/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-badir-mocha">Secure Implementation</h4>
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Protected</span>
                  </div>
                  
                  <div className="font-mono text-sm p-3 bg-gray-900 text-green-100 rounded-md overflow-auto h-64">
                    <pre>{`// ✅ Protected with CEI pattern
function withdraw() public {
  // Checks: Verify conditions
  uint amount = balances[msg.sender];
  require(amount > 0, "No balance");
  
  // Effects: Update state BEFORE interactions
  // Even if the call below allows reentrancy,
  // the balance is already set to zero
  balances[msg.sender] = 0;
  
  // Interactions: External calls LAST
  (bool success, ) = msg.sender.call{
    value: amount
  }("");
  require(success, "Transfer failed");
}`}</pre>
                  </div>
                </div>
              </div>
              
              <div className="bg-badir-tan/10 rounded-lg p-4">
                <h4 className="text-lg font-semibold mb-3 text-badir-mocha">CEI Pattern Principles</h4>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded-lg border border-badir-tan/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-badir-mocha text-white flex items-center justify-center mr-2 text-xs">1</div>
                      <h5 className="font-semibold">Checks</h5>
                    </div>
                    <p className="text-xs">First, validate all preconditions and requirements.</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-badir-tan/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-badir-mocha text-white flex items-center justify-center mr-2 text-xs">2</div>
                      <h5 className="font-semibold">Effects</h5>
                    </div>
                    <p className="text-xs">Then, modify your contract's state variables.</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded-lg border border-badir-tan/20">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-badir-mocha text-white flex items-center justify-center mr-2 text-xs">3</div>
                      <h5 className="font-semibold">Interactions</h5>
                    </div>
                    <p className="text-xs">Finally, interact with other contracts or addresses.</p>
                  </div>
                </div>
                
                <p className="text-sm">
                  Following the CEI pattern ensures that all state changes are completed before any external calls are made, which prevents malicious contracts 
                  from exploiting partially-updated states. This is essential for functions that transfer ETH or tokens, as these transfers allow the recipient 
                  to execute code that could attempt to reenter the original function.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Slide9Attacks;
