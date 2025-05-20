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
              Smart Contract Example
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              A practical example of how a donation smart contract works for the Badir platform
            </motion.p>

            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          {/* Smart Contract Example */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solidity Code */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-badir-mocha mb-4 tech-highlight inline-block">Solidity Code</h3>
              <div className="bg-gray-900 text-gray-100 p-5 rounded-xl shadow-md font-mono text-sm overflow-auto" style={{ maxHeight: '400px' }}>
                <pre className="language-solidity">
                  <code>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BadirDonation {
    address public owner;
    uint256 public totalDonations;
    
    // Structure to hold donation information
    struct Donation {
        address donor;
        uint256 amount;
        uint256 timestamp;
        string message;
    }
    
    // Array to track all donations
    Donation[] public donations;
    
    // Events for tracking activities
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        string message
    );
    
    event FundsDistributed(
        address indexed recipient,
        uint256 amount
    );
    
    constructor() {
        owner = msg.sender;
    }
    
    // Only owner modifier
    modifier onlyOwner() {
        require(msg.sender == owner, 
               "Only owner can call this function");
        _;
    }
    
    // Fallback function to receive ETH
    receive() external payable {
        totalDonations += msg.value;
        donations.push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            message: ""
        }));
        
        emit DonationReceived(
            msg.sender, 
            msg.value, 
            ""
        );
    }
    
    // Function to make a donation with a message
    function donate(string memory _message) 
        external 
        payable 
    {
        require(msg.value > 0, "Donation must be greater than 0");
        
        totalDonations += msg.value;
        donations.push(Donation({
            donor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp,
            message: _message
        }));
        
        emit DonationReceived(
            msg.sender, 
            msg.value, 
            _message
        );
    }
    
    // Function to distribute funds to a recipient
    function distributeFunds(address payable _recipient, uint256 _amount)
        external
        onlyOwner
    {
        require(_amount <= address(this).balance, 
               "Insufficient contract balance");
        
        _recipient.transfer(_amount);
        
        emit FundsDistributed(_recipient, _amount);
    }
    
    // Function to get total number of donations
    function getDonationsCount() 
        external 
        view 
        returns (uint256) 
    {
        return donations.length;
    }
    
    // Function to get donation details by index
    function getDonation(uint256 _index)
        external
        view
        returns (
            address donor,
            uint256 amount,
            uint256 timestamp,
            string memory message
        )
    {
        require(_index < donations.length, "Donation doesn't exist");
        
        Donation memory donation = donations[_index];
        return (
            donation.donor,
            donation.amount,
            donation.timestamp,
            donation.message
        );
    }
}`}</code>
                </pre>
              </div>
            </motion.div>
            
            {/* Explanation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold text-badir-mocha mb-4 tech-highlight inline-block">How It Works</h3>
              
              <div className="space-y-5">
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-sm">
                  <h4 className="font-bold text-badir-rose mb-2">1. Donation Storage</h4>
                  <p className="text-badir-mocha/90">The contract stores each donation's details including the donor's address, amount, timestamp, and optional message in a structured array.</p>
                </div>
                
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-sm">
                  <h4 className="font-bold text-badir-rose mb-2">2. Donation Functions</h4>
                  <p className="text-badir-mocha/90">Users can donate by either sending ETH directly to the contract or by using the <code className="bg-gray-200 px-1 rounded">donate()</code> function which also allows adding a message.</p>
                </div>
                
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-sm">
                  <h4 className="font-bold text-badir-rose mb-2">3. Fund Distribution</h4>
                  <p className="text-badir-mocha/90">Only the contract owner (Badir platform) can distribute the collected funds to recipients in Gaza through the <code className="bg-gray-200 px-1 rounded">distributeFunds()</code> function.</p>
                </div>
                
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-sm">
                  <h4 className="font-bold text-badir-rose mb-2">4. Transparency</h4>
                  <p className="text-badir-mocha/90">All donations and distributions emit events that are permanently recorded on the blockchain and can be queried by anyone, ensuring complete transparency.</p>
                </div>
                
                <div className="p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-sm">
                  <h4 className="font-bold text-badir-rose mb-2">5. Data Access</h4>
                  <p className="text-badir-mocha/90">View functions allow anyone to query donation information and verify the platform's activities without needing to modify the blockchain state.</p>
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