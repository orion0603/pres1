import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide4aSmartContractExample = () => {
  return (
    <section id="slide4a" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div 
          className="max-w-5xl mx-auto tech-border p-8 md:p-12 tech-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-4xl font-bold tech-gradient-text mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Breaking Down Our Smart Contract
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Understanding the key components that enable secure donations on the blockchain
            </motion.p>

            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          {/* Smart Contract Components */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Donate Function */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl font-semibold text-badir-mocha mb-4 tech-highlight inline-block">Donate Function</h3>
              
              <div className="bg-gray-900 text-gray-100 p-5 rounded-xl shadow-md font-mono text-sm mb-4 flex-grow">
                <div className="flex items-center text-xs text-white/60 mb-3 border-b border-white/10 pb-2">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-green-500 mr-1.5"></div>
                  <span>BadirDonation.sol (partial)</span>
                </div>
                <pre className="language-solidity">
                  <code className="text-white/90">{`// Function to make a donation with a message
function donate(string memory _message) 
    external 
    payable 
{
    // Ensure donation amount is greater than zero
    require(msg.value > 0, "Donation must be greater than 0");
    
    // Add donation amount to total
    totalDonations += msg.value;
    
    // Store donation details in the array
    donations.push(Donation({
        donor: msg.sender,
        amount: msg.value,
        timestamp: block.timestamp,
        message: _message
    }));
    
    // Emit event for blockchain tracking
    emit DonationReceived(
        msg.sender, 
        msg.value, 
        _message
    );
}`}</code>
                </pre>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-badir-tan/30 shadow-sm">
                <h4 className="font-bold text-badir-rose mb-3 flex items-center">
                  <i className="fas fa-code mr-2"></i>
                  Key Elements
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-check-circle"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">payable:</span> Allows function to receive ETH cryptocurrency</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-check-circle"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">require:</span> Ensures donation amount is valid before proceeding</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-check-circle"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">msg.sender:</span> The donor's Ethereum address (automatically captured)</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-check-circle"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">emit:</span> Records donation permanently in the blockchain event log</p>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Access Control */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col h-full"
            >
              <h3 className="text-2xl font-semibold text-badir-mocha mb-4 tech-highlight inline-block">Access Control</h3>
              
              <div className="bg-gray-900 text-gray-100 p-5 rounded-xl shadow-md font-mono text-sm mb-4 flex-grow">
                <div className="flex items-center text-xs text-white/60 mb-3 border-b border-white/10 pb-2">
                  <div className="flex-shrink-0 w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                  <span>BadirDonation.sol (partial)</span>
                </div>
                <pre className="language-solidity">
                  <code className="text-white/90">{`// Set contract owner during contract creation
constructor() {
    owner = msg.sender;
}

// Create a modifier for admin-only functions
modifier onlyOwner() {
    require(msg.sender == owner, 
           "Only owner can call this function");
    _;
}

// Function to distribute funds to recipients
function distributeFunds(
    address payable _recipient, 
    uint256 _amount
) external onlyOwner {
    require(
        _amount <= address(this).balance, 
        "Insufficient contract balance"
    );
    
    // Transfer funds to the recipient
    _recipient.transfer(_amount);
    
    // Record the distribution on the blockchain
    emit FundsDistributed(_recipient, _amount);
}`}</code>
                </pre>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-badir-tan/30 shadow-sm">
                <h4 className="font-bold text-badir-rose mb-3 flex items-center">
                  <i className="fas fa-shield-alt mr-2"></i>
                  Security Features
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-lock"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">onlyOwner modifier:</span> Restricts fund distribution to the authorized administrator only</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-lock"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">Validation checks:</span> Prevents overdrawing from the contract's balance</p>
                  </li>
                  <li className="flex items-start">
                    <div className="text-badir-rose mr-2 mt-1 flex-shrink-0"><i className="fas fa-lock"></i></div>
                    <p className="text-badir-mocha/90"><span className="font-medium">Event logs:</span> Every distribution is permanently recorded for auditing and transparency</p>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-badir-tan/30">
                  <h5 className="font-semibold text-badir-mocha mb-2">Why It Matters</h5>
                  <p className="text-sm text-badir-mocha/90">
                    This structure ensures that only the legitimate platform administrator can distribute funds, 
                    providing security while maintaining full transparency of all transactions on the blockchain.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide4aSmartContractExample;