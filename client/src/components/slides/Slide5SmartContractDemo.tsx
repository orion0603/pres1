import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { delay, generateTxHash, formatEth } from '@/lib/utils';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide5SmartContractDemo = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [donationAmount, setDonationAmount] = useState(0.5);
  const [showTransaction, setShowTransaction] = useState(false);
  const [transactionProgress, setTransactionProgress] = useState(0);
  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [transactionMessage, setTransactionMessage] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('donate'); // 'donate' or 'verify'
  
  // Sample donation data for transparency verification
  const donationHistory = [
    { 
      donor: '0x8a21...93f1', 
      amount: 1.25, 
      timestamp: '2 hours ago',
      message: 'Sending hope and support to Gaza. Stay strong!',
      status: 'Confirmed' 
    },
    { 
      donor: '0x3b48...72c9', 
      amount: 0.75, 
      timestamp: '5 hours ago',
      message: 'For medical supplies',
      status: 'Confirmed' 
    },
    { 
      donor: '0x71a5...23bd', 
      amount: 2.0, 
      timestamp: '7 hours ago',
      message: 'For food and water',
      status: 'Distributed' 
    },
    { 
      donor: '0xc934...12f4', 
      amount: 0.5, 
      timestamp: '1 day ago',
      message: '',
      status: 'Distributed' 
    },
  ];
  
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
        setTransactionMessage('Executing contract function donate()...');
      }
      
      if (progress === 50) {
        setTransactionMessage('Transaction submitted to Ethereum network...');
      }
      
      if (progress === 70) {
        setTransactionMessage('Smart contract validating donation...');
      }
      
      if (progress === 90) {
        setTransactionMessage('Recording donation in blockchain ledger...');
      }
      
      if (progress === 100) {
        clearInterval(interval);
        setTransactionMessage(`Successfully donated ${donationAmount} ETH! Transaction recorded on the blockchain.`);
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
    <section id="slide5" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div
          className="max-w-6xl mx-auto tech-border p-6 md:p-8 tech-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-6">
            <motion.h2 
              className="text-4xl font-bold tech-gradient-text mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              CryptoCare Relief Fund
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              A transparent aid distribution system powered by blockchain technology
            </motion.p>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />

            {/* Tab Selection */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex bg-badir-cream/50 rounded-full p-1 backdrop-blur-sm">
                <button
                  onClick={() => setActiveTab('donate')}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === 'donate'
                      ? 'bg-badir-rose text-white shadow-md'
                      : 'text-badir-mocha hover:bg-badir-tan/20'
                  }`}
                >
                  Make Donation
                </button>
                <button
                  onClick={() => setActiveTab('verify')}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    activeTab === 'verify'
                      ? 'bg-badir-rose text-white shadow-md'
                      : 'text-badir-mocha hover:bg-badir-tan/20'
                  }`}
                >
                  Verify Donations
                </button>
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {activeTab === 'donate' ? (
              <motion.div
                key="donate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Smart Contract Visualization */}
                  <div className="col-span-1 md:col-span-3 mb-4">
                    <div className="bg-gray-900 rounded-xl p-5 shadow-lg text-white/90 font-mono text-sm overflow-hidden">
                      <div className="flex items-center mb-4 text-xs text-white/60">
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                        <span className="ml-2">CryptoCareRelief.sol</span>
                      </div>
                      <pre className="overflow-x-auto">
                        <code>{`contract CryptoCareRelief {
    address public admin;
    uint256 public totalDonations;
    uint256 public totalDistributed;
    
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;
    }
    
    struct Distribution {
        address recipient;
        uint256 amount;
        uint256 timestamp;
        string purpose;
    }
    
    Donation[] public donations;
    Distribution[] public distributions;
    
    event DonationReceived(address indexed donor, uint256 amount, string message);
    event FundsDistributed(address indexed recipient, uint256 amount, string purpose);
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    constructor() {
        admin = msg.sender;
    }
    
    function donate(string memory _message) external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");
        
        totalDonations += msg.value;
        
        donations.push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            message: _message
        }));
        
        emit DonationReceived(msg.sender, msg.value, _message);
    }
    
    function distributeFunds(address payable _recipient, uint256 _amount, string memory _purpose) 
        external 
        onlyAdmin 
    {
        require(_amount <= address(this).balance, "Insufficient funds in contract");
        
        totalDistributed += _amount;
        _recipient.transfer(_amount);
        
        distributions.push(Distribution({
            recipient: _recipient,
            amount: _amount,
            timestamp: block.timestamp,
            purpose: _purpose
        }));
        
        emit FundsDistributed(_recipient, _amount, _purpose);
    }
    
    // Various getter functions for transparency
    function getDonationCount() external view returns (uint256) {
        return donations.length;
    }
    
    function getDistributionCount() external view returns (uint256) {
        return distributions.length;
    }
    
    function getDonationDetails(uint256 _index) external view returns (
        address donor,
        uint256 amount, 
        uint256 timestamp,
        string memory message
    ) {
        require(_index < donations.length, "Invalid donation index");
        Donation memory donation = donations[_index];
        return (donation.donor, donation.amount, donation.timestamp, donation.message);
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}`}</code>
                      </pre>
                    </div>
                  </div>
                  
                  {/* Step 1: Connect Wallet */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-badir-tan/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: false }}
                  >
                    <div className="mb-4 flex items-center">
                      <div className="bg-badir-rose rounded-full p-3 text-white mr-4 flex-shrink-0">
                        <i className="fas fa-wallet text-lg"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-badir-mocha">Connect Wallet</h3>
                    </div>
                    
                    <p className="text-badir-mocha/80 mb-6">
                      Connect your Ethereum wallet to interact with the CryptoCareRelief smart contract.
                    </p>
                    
                    <Button
                      onClick={connectWallet}
                      disabled={walletConnected || isLoading}
                      className={`w-full py-6 h-auto rounded-lg font-medium flex items-center justify-center ${walletConnected ? 'bg-green-600 hover:bg-green-700' : 'bg-badir-mocha hover:bg-badir-mocha/90'} transition-all`}
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
                    
                    <div className="mt-4 bg-badir-cream/40 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-badir-mocha">Status:</span>
                        <span className={`text-sm ${walletConnected ? 'text-green-600 font-medium' : 'text-badir-mocha/60'}`}>
                          {walletConnected ? "Connected" : "Not Connected"}
                        </span>
                      </div>
                      {walletConnected && (
                        <div className="mt-2 pt-2 border-t border-badir-tan/30">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-badir-mocha/80">Address:</span>
                            <span className="font-mono text-badir-mocha">0x71a5...3bd</span>
                          </div>
                          <div className="flex justify-between items-center text-sm mt-1">
                            <span className="text-badir-mocha/80">Network:</span>
                            <span className="text-badir-mocha">Ethereum Mainnet</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  {/* Step 2: Donation Information */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-badir-tan/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: false }}
                  >
                    <div className="mb-4 flex items-center">
                      <div className="bg-badir-rose rounded-full p-3 text-white mr-4 flex-shrink-0">
                        <i className="fas fa-hand-holding-heart text-lg"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-badir-mocha">Donation Details</h3>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2 text-badir-mocha" htmlFor="donationAmount">
                        Amount (ETH)
                      </label>
                      <div className="relative">
                        <Input
                          id="donationAmount"
                          type="number"
                          min="0.1"
                          step="0.1"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(parseFloat(e.target.value) || 0)}
                          className="w-full p-4 pr-14 rounded-lg border border-badir-tan focus:border-badir-rose focus:ring-1 focus:ring-badir-rose outline-none text-lg font-medium"
                        />
                        <div className="absolute right-4 top-4 text-badir-mocha font-medium">ETH</div>
                      </div>
                      <p className="text-xs mt-2 text-badir-mocha/60">
                        Current value: ~${(donationAmount * 3465).toFixed(2)} USD
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-badir-mocha" htmlFor="donorMessage">
                        Add a message (optional)
                      </label>
                      <div className="relative">
                        <Input
                          id="donorMessage"
                          type="text"
                          placeholder="Your message of support"
                          value={donorMessage}
                          onChange={(e) => setDonorMessage(e.target.value)}
                          className="w-full p-4 rounded-lg border border-badir-tan focus:border-badir-rose focus:ring-1 focus:ring-badir-rose outline-none"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-badir-rose/10 rounded-lg border border-badir-rose/30">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-chart-pie text-badir-rose mr-2"></i>
                        <span className="font-medium text-badir-mocha">Fund Allocation</span>
                      </div>
                      <div className="flex items-center mb-1">
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                        <span className="ml-2 text-sm font-medium whitespace-nowrap">55%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-badir-mocha/70 mt-3">
                        <div>Medical: 55%</div>
                        <div>Food: 30%</div>
                        <div>Shelter: 15%</div>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Step 3: Confirmation */}
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-badir-tan/20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: false }}
                  >
                    <div className="mb-4 flex items-center">
                      <div className="bg-badir-rose rounded-full p-3 text-white mr-4 flex-shrink-0">
                        <i className="fas fa-file-contract text-lg"></i>
                      </div>
                      <h3 className="text-xl font-semibold text-badir-mocha">Execute Contract</h3>
                    </div>
                    
                    <div className="mb-6">
                      <div className="bg-gray-100 rounded-lg p-4 mb-6 font-mono text-sm">
                        <div className="text-gray-500 mb-1">// Contract Function Call</div>
                        <div className="text-badir-mocha">
                          CryptoCareRelief.<span className="text-purple-600">donate</span>{`(`}
                          <span className="text-green-600">"{donorMessage}"</span>
                          {`)`}
                        </div>
                        <div className="text-gray-500 mt-1">// Value: {donationAmount} ETH</div>
                      </div>
                      
                      <Button
                        onClick={processDonation}
                        disabled={!walletConnected || isLoading || donationAmount <= 0}
                        className={`w-full py-6 h-auto rounded-lg font-medium ${
                          transactionComplete 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-badir-rose hover:bg-badir-rose/90'
                        } transition-all shadow-md text-white`}
                      >
                        {isLoading ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i> Processing Transaction...
                          </>
                        ) : transactionComplete ? (
                          <>
                            <i className="fas fa-check-circle mr-2"></i> Donation Complete
                          </>
                        ) : (
                          <>
                            <i className="fas fa-paper-plane mr-2"></i> Execute Smart Contract
                          </>
                        )}
                      </Button>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-badir-mocha/5 border border-badir-mocha/20">
                      <div className="flex items-center mb-2">
                        <i className="fas fa-shield-alt text-badir-rose mr-2"></i>
                        <span className="font-medium text-badir-mocha">Smart Contract Security</span>
                      </div>
                      <ul className="text-sm text-badir-mocha/70 space-y-1">
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-1.5 mt-0.5"></i>
                          <span>Audited by DefiSafety & OpenZeppelin</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-1.5 mt-0.5"></i>
                          <span>Multi-signature fund management</span>
                        </li>
                        <li className="flex items-start">
                          <i className="fas fa-check-circle text-green-500 mr-1.5 mt-0.5"></i>
                          <span>Fully transparent on-chain transactions</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
                
                {/* Transaction status area */}
                <AnimatePresence>
                  {showTransaction && (
                    <motion.div 
                      className="mt-8 bg-white rounded-xl p-6 shadow-xl border border-badir-rose/20"
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-xl font-semibold text-badir-mocha mb-4 flex items-center">
                        <i className={`fas fa-${transactionComplete ? 'check-circle text-green-600' : 'clock text-badir-rose'} mr-2`}></i>
                        Transaction Status
                      </h3>
                      
                      <div className="mb-6">
                        <div className="flex items-center">
                          <Progress 
                            value={transactionProgress} 
                            className="w-full h-3 bg-gray-200 rounded-full mr-4"
                          />
                          <span className="text-sm font-medium whitespace-nowrap w-12">{transactionProgress}%</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-100 rounded-lg p-4 md:col-span-2">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-medium text-badir-mocha">Status:</span>
                            <span className={`${transactionComplete ? 'text-green-600' : 'text-badir-rose'} font-medium`}>
                              {transactionComplete ? 'Confirmed' : 'In Progress'}
                            </span>
                          </div>
                          <p className="text-badir-mocha mb-3">
                            {transactionMessage}
                          </p>
                          {transactionHash && (
                            <div className="font-mono text-xs p-2 bg-white rounded border border-gray-200 break-all">
                              <div className="text-gray-500 mb-1">Transaction Hash:</div>
                              {transactionHash}
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-100 rounded-lg p-4">
                          <h4 className="font-medium text-badir-mocha mb-2">Transaction Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Amount:</span>
                              <span>{donationAmount} ETH</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Gas Fee:</span>
                              <span>~0.0032 ETH</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Contract:</span>
                              <span className="font-mono">0x18d4...</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Function:</span>
                              <span className="font-mono">donate()</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-badir-tan/20"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-badir-mocha">Donation Transparency</h3>
                  <div className="flex items-center bg-badir-rose/10 text-badir-rose rounded-full px-4 py-1.5 text-sm">
                    <i className="fas fa-database mr-2"></i>
                    <span>Live Blockchain Data</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-badir-cream/30 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-badir-mocha mb-1">4.5 ETH</div>
                    <div className="text-sm text-badir-mocha/70">Total Donations</div>
                  </div>
                  <div className="bg-badir-cream/30 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-badir-mocha mb-1">2.5 ETH</div>
                    <div className="text-sm text-badir-mocha/70">Funds Distributed</div>
                  </div>
                  <div className="bg-badir-cream/30 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                    <div className="text-3xl font-bold text-badir-mocha mb-1">2.0 ETH</div>
                    <div className="text-sm text-badir-mocha/70">Available Balance</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-badir-mocha mb-3">Recent Donations</h4>
                  <div className="overflow-hidden rounded-lg border border-badir-tan/30">
                    <table className="min-w-full divide-y divide-badir-tan/30">
                      <thead className="bg-badir-cream/50">
                        <tr>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-badir-mocha uppercase tracking-wider">Donor</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-badir-mocha uppercase tracking-wider">Amount</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-badir-mocha uppercase tracking-wider">Message</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-badir-mocha uppercase tracking-wider">Time</th>
                          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-badir-mocha uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-badir-tan/30">
                        {donationHistory.map((donation, index) => (
                          <tr key={index} className="hover:bg-badir-cream/10">
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">{donation.donor}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm">{donation.amount} ETH</td>
                            <td className="px-4 py-3 text-sm truncate max-w-[200px]">
                              {donation.message || <span className="text-gray-400 italic">No message</span>}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-badir-mocha/70">{donation.timestamp}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                donation.status === 'Confirmed' 
                                  ? 'bg-blue-100 text-blue-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {donation.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="bg-badir-mocha/5 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-badir-mocha mb-2">Verification</h4>
                  <p className="text-sm text-badir-mocha/70">
                    All transactions are permanently recorded on the Ethereum blockchain and can be verified
                    using block explorers like Etherscan by searching for the contract address:
                    <span className="font-mono text-badir-rose ml-1">0x18d4e5F8d7A46cEff9FE74f0A5F2C4e3c5aB91B3</span>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide5SmartContractDemo;
