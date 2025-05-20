import { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '@/components/ui/slider';

const Slide8Security = () => {
  const [ownerAccess, setOwnerAccess] = useState('owner');
  const [donationAmount, setDonationAmount] = useState(0.5);
  
  // Handle donation limit validation
  const isValidDonation = donationAmount >= 0.1 && donationAmount <= 100;
  const donationMessage = isValidDonation 
    ? "Valid amount: Transaction would succeed" 
    : donationAmount < 0.1 
      ? "Invalid amount: Below minimum of 0.1 ETH" 
      : "Invalid amount: Exceeds maximum of 100 ETH";
  
  const securityMechanisms = [
    {
      title: "onlyOwner",
      subtitle: "Restricts access to admin functions",
      content: (
        <>
          <p className="mb-6 text-sm">Only the contract owner (deployer) can access critical functions like fund withdrawal or parameter updates.</p>
          
          {/* Demo toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Access Simulation:</span>
              <select 
                value={ownerAccess}
                onChange={(e) => setOwnerAccess(e.target.value)}
                className="bg-badir-sand bg-opacity-30 border border-badir-sand rounded p-1 text-sm"
              >
                <option value="owner">Contract Owner</option>
                <option value="user">Regular User</option>
              </select>
            </div>
            
            <div className="bg-badir-grey bg-opacity-20 rounded-lg p-4 text-sm">
              <p className="flex items-center">
                {ownerAccess === 'owner' ? (
                  <>
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Access granted: Can withdraw funds</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-times-circle text-red-500 mr-2"></i>
                    <span>Access denied: Only the owner can withdraw funds</span>
                  </>
                )}
              </p>
            </div>
          </div>
          
          <div className="bg-badir-tan bg-opacity-20 rounded-lg p-3 text-xs">
            <pre className="text-badir-mocha">{`modifier onlyOwner() {
  require(msg.sender == owner);
  _;
}`}</pre>
          </div>
        </>
      )
    },
    {
      title: "withinDonationLimits",
      subtitle: "Enforces donation amount boundaries",
      content: (
        <>
          <p className="mb-6 text-sm">Prevents both dust attacks (too small amounts) and potential money laundering (excessive amounts).</p>
          
          {/* Demo range */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Donation Amount (ETH):</span>
              <output className="text-sm font-mono">{donationAmount.toFixed(1)}</output>
            </div>
            
            <Slider 
              value={[donationAmount]} 
              min={0} 
              max={120} 
              step={0.5}
              onValueChange={(value) => setDonationAmount(value[0])}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-badir-mocha mt-1">
              <span>0</span>
              <span className="text-badir-rose font-medium">Min: 0.1</span>
              <span className="text-badir-rose font-medium">Max: 100</span>
              <span>120</span>
            </div>
            
            <div className="bg-badir-grey bg-opacity-20 rounded-lg p-4 mt-4 text-sm">
              <p className="flex items-center">
                {isValidDonation ? (
                  <i className="fas fa-check-circle text-green-500 mr-2"></i>
                ) : (
                  <i className="fas fa-times-circle text-red-500 mr-2"></i>
                )}
                <span>{donationMessage}</span>
              </p>
            </div>
          </div>
          
          <div className="bg-badir-tan bg-opacity-20 rounded-lg p-3 text-xs">
            <pre className="text-badir-mocha">{`require(
  msg.value >= 0.1 && 
  msg.value <= 100
);`}</pre>
          </div>
        </>
      )
    },
    {
      title: "Transaction Logs",
      subtitle: "Public and viewable by anyone",
      content: (
        <>
          <p className="mb-6 text-sm">All transactions are permanently recorded on the blockchain and can be audited by donors, recipients, and oversight organizations.</p>
          
          {/* Demo log viewer */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Recent Transactions:</span>
              <span className="text-xs bg-badir-sand px-2 py-1 rounded-full">Etherscan</span>
            </div>
            
            <div className="bg-badir-grey bg-opacity-20 rounded-lg p-3 h-32 overflow-y-auto text-xs font-mono">
              <div className="mb-2 pb-2 border-b border-badir-grey">
                <div className="flex justify-between">
                  <span>Tx: 0x73f...a8b</span>
                  <span>1.2 ETH</span>
                </div>
                <div className="text-badir-mocha opacity-70">From: 0x631...59d → Badir</div>
              </div>
              <div className="mb-2 pb-2 border-b border-badir-grey">
                <div className="flex justify-between">
                  <span>Tx: 0x45d...c7e</span>
                  <span>0.5 ETH</span>
                </div>
                <div className="text-badir-mocha opacity-70">From: 0x912...f3a → Badir</div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span>Tx: 0x89b...d2f</span>
                  <span>2.0 ETH</span>
                </div>
                <div className="text-badir-mocha opacity-70">From: 0x777...e4c → Badir</div>
              </div>
            </div>
          </div>
          
          <div className="bg-badir-tan bg-opacity-20 rounded-lg p-3 text-xs">
            <pre className="text-badir-mocha">emit DonationReceived(
  msg.sender, msg.value, block.timestamp
);</pre>
          </div>
        </>
      )
    }
  ];

  return (
    <section id="slide8" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Security Mechanisms in Badir
        </h2>
        
        <p className="text-xl text-badir-mocha mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          Multiple layers of security ensure the integrity of the platform and protect donations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityMechanisms.map((mechanism, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="bg-badir-rose p-4">
                <h3 className="text-xl font-semibold text-white">{mechanism.title}</h3>
                <p className="text-white text-sm">{mechanism.subtitle}</p>
              </div>
              <div className="p-6">
                {mechanism.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slide8Security;
