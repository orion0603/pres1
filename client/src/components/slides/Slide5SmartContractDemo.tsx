import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { delay, generateTxHash } from '@/lib/utils';

const Slide5SmartContractDemo = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0.5);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionProgress, setTransactionProgress] = useState(0);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  
  // Connect wallet simulation
  const connectWallet = async () => {
    if (walletConnected) return;
    
    setIsLoading(true);
    await delay(1500);
    setWalletConnected(true);
    setIsLoading(false);
  };
  
  // Donation simulation
  const processDonation = async () => {
    setIsLoading(true);
    setShowTransaction(true);
    setTransactionMessage('Preparing transaction...');
    
    // Generate transaction hash
    const txHash = generateTxHash();
    setTransactionHash(txHash);
    
    // Simulate transaction progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setTransactionProgress(progress);
      
      if (progress === 30) {
        setTransactionMessage('Transaction submitted to the network...');
      }
      
      if (progress === 70) {
        setTransactionMessage('Transaction confirmed! Recording donation on blockchain...');
      }
      
      if (progress === 100) {
        clearInterval(interval);
        setTransactionMessage(`Successfully donated ${donationAmount} ETH! Thank you for your contribution.`);
        setTransactionComplete(true);
        
        // Reset after 5 seconds
        setTimeout(() => {
          setShowTransaction(false);
          setTransactionProgress(0);
          setTransactionMessage('');
          setTransactionHash('');
          setTransactionComplete(false);
          setIsLoading(false);
        }, 5000);
      }
    }, 300);
  };
  
  return (
    <section id="slide5" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Smart Contract Demo
        </h2>
        
        <p className="text-xl text-badir-mocha mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          Experience how a donation works on the Badir platform. This is a simulation of the blockchain interaction process.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Connect Wallet */}
          <motion.div 
            className="bg-badir-sand rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-badir-rose text-white text-2xl font-bold mb-2">1</div>
              <h3 className="text-xl font-semibold">Connect Wallet</h3>
            </div>
            <div className="mb-6">
              <p className="text-sm mb-4">Connect your Ethereum wallet to interact with the Badir donation smart contract.</p>
              <Button
                onClick={connectWallet}
                disabled={walletConnected || isLoading}
                className={`w-full py-3 h-auto rounded-lg font-medium flex items-center justify-center ${walletConnected ? 'bg-green-600' : 'bg-badir-mocha'}`}
              >
                {isLoading && !walletConnected ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Connecting...
                  </>
                ) : walletConnected ? (
                  <>
                    <i className="fas fa-check-circle mr-2"></i> Connected
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6 mr-2 rounded-sm" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="40" height="40" rx="4" fill="#F6851B"/>
                      <path d="M19.586 8L19.294 9.002V24.626L19.586 24.918L26.916 20.574L19.586 8Z" fill="#E4761B"/>
                      <path d="M19.586 8L12.255 20.574L19.586 24.918V17.045V8Z" fill="#F6851B"/>
                      <path d="M19.586 26.431L19.423 26.628V31.79L19.586 32.218L26.922 22.091L19.586 26.431Z" fill="#E4761B"/>
                      <path d="M19.586 32.218V26.431L12.255 22.091L19.586 32.218Z" fill="#F6851B"/>
                      <path d="M19.586 24.918L26.916 20.574L19.586 17.045V24.918Z" fill="#F6851B"/>
                      <path d="M12.255 20.574L19.586 24.918V17.045L12.255 20.574Z" fill="#E4761B"/>
                    </svg>
                    Connect MetaMask
                  </>
                )}
              </Button>
            </div>
            <div className="bg-badir-cream bg-opacity-50 rounded-lg p-4 border border-badir-tan">
              <div className="flex items-center mb-2">
                <i className="fas fa-info-circle text-badir-rose mr-2"></i>
                <span className="font-medium text-sm">Wallet Status</span>
              </div>
              <p className="text-sm">
                {walletConnected ? (
                  <span className="text-green-600 font-medium">Connected</span>
                ) : (
                  "Disconnected"
                )}
              </p>
              <p className="text-xs mt-2 text-badir-mocha">
                {walletConnected ? "Address: 0x71a5c4e4a8e4decb40b1cb7906819efa5c2b3bd" : "Address: —"}
              </p>
            </div>
          </motion.div>
          
          {/* Step 2: Donation Information */}
          <motion.div 
            className="bg-badir-sand rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-badir-rose text-white text-2xl font-bold mb-2">2</div>
              <h3 className="text-xl font-semibold">Enter Donation</h3>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="donationAmount">
                Donation Amount (ETH)
              </label>
              <div className="relative">
                <Input
                  id="donationAmount"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(parseFloat(e.target.value))}
                  className="w-full p-3 pr-12 rounded-lg border border-badir-grey focus:border-badir-rose focus:ring-1 focus:ring-badir-rose outline-none"
                />
                <div className="absolute right-3 top-3 text-badir-mocha font-medium">ETH</div>
              </div>
              <p className="text-xs mt-2 text-badir-mocha">Minimum donation: 0.1 ETH</p>
            </div>
            <div className="bg-badir-cream bg-opacity-50 rounded-lg p-4 border border-badir-tan">
              <div className="flex items-center mb-2">
                <i className="fas fa-hand-holding-heart text-badir-rose mr-2"></i>
                <span className="font-medium text-sm">Your Impact</span>
              </div>
              <p className="text-sm">
                Your donation will help provide essential supplies and support to families in Gaza.
              </p>
            </div>
          </motion.div>
          
          {/* Step 3: Confirmation */}
          <motion.div 
            className="bg-badir-sand rounded-xl p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-badir-rose text-white text-2xl font-bold mb-2">3</div>
              <h3 className="text-xl font-semibold">Confirm & Send</h3>
            </div>
            <div className="mb-6">
              <p className="text-sm mb-4">
                Review your donation details and confirm to execute the smart contract transaction.
              </p>
              <Button
                onClick={processDonation}
                disabled={!walletConnected || isLoading}
                className={`w-full py-3 h-auto rounded-lg font-medium ${transactionComplete ? 'bg-green-600' : 'bg-badir-rose'}`}
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Processing...
                  </>
                ) : transactionComplete ? (
                  <>
                    <i className="fas fa-check-circle mr-2"></i> Donation Complete
                  </>
                ) : (
                  "Send Donation"
                )}
              </Button>
            </div>
            <div className="bg-badir-cream bg-opacity-50 rounded-lg p-4 border border-badir-tan">
              <div className="flex items-center mb-2">
                <i className="fas fa-shield-alt text-badir-rose mr-2"></i>
                <span className="font-medium text-sm">Transaction Security</span>
              </div>
              <p className="text-sm">
                Your donation is secured by blockchain technology, ensuring it reaches the intended recipients.
              </p>
            </div>
          </motion.div>
        </div>
        
        {/* Transaction status area */}
        {showTransaction && (
          <motion.div 
            className="mt-12 bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-badir-mocha mb-4">Transaction Status</h3>
            <div className="flex items-center">
              <Progress value={transactionProgress} className="w-full bg-badir-grey rounded-full h-4 mr-4" />
              <span className="text-sm font-medium whitespace-nowrap">{transactionProgress}%</span>
            </div>
            <div className="mt-6 p-4 bg-badir-sand bg-opacity-30 rounded-lg border border-badir-sand">
              <p className={`text-badir-mocha ${transactionComplete ? 'text-green-600 font-medium' : ''}`}>
                {transactionMessage}
              </p>
              {transactionHash && (
                <p className="font-mono text-xs mt-2 break-all">
                  {transactionHash}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Slide5SmartContractDemo;
