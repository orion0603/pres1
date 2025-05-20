import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Slide6SmartContractCode = () => {
  const [activeSection, setActiveSection] = useState('donate');
  
  const sections = {
    donate: {
      title: "donate() Function",
      tag: "Core Functionality",
      code: `function donate() public payable {
  // Ensure donation meets minimum requirement
  require(msg.value >= 0.1, 
    "Minimum donation is 0.1 ETH");
    
  // Ensure donation is within limits
  require(msg.value <= 100,
    "Maximum donation is 100 ETH");
    
  // Record donation in mapping
  donations[msg.sender] += msg.value;
  
  // Update total donations
  totalDonations += msg.value;
  
  // Emit event for tracking
  emit DonationReceived(
    msg.sender, 
    msg.value,
    block.timestamp
  );
}`,
      explanation: [
        "Accepts ETH payments with `payable` modifier",
        "Validates donation amount (0.1-100 ETH)",
        "Records donation in persistent storage",
        "Emits event for off-chain tracking"
      ]
    },
    onlyOwner: {
      title: "onlyOwner Modifier",
      tag: "Access Control",
      code: `// Define owner at contract creation
address public owner;

constructor() {
  owner = msg.sender;
}

// Define access control modifier
modifier onlyOwner() {
  require(
    msg.sender == owner,
    "Only the owner can call this function"
  );
  _;
}

// Example of protected function
function withdrawFunds(uint256 amount) 
  public 
  onlyOwner 
{
  require(
    amount <= address(this).balance,
    "Insufficient contract balance"
  );
  
  payable(owner).transfer(amount);
  
  emit FundsWithdrawn(amount);
}`,
      explanation: [
        "Restricts sensitive functions to contract creator only",
        "Prevents unauthorized access to admin functions",
        "Protects withdrawal functions from attackers",
        "The `_;` continues execution if check passes"
      ]
    },
    limits: {
      title: "withinDonationLimits Modifier",
      tag: "Validation",
      code: `// Set donation limits
uint256 public constant MIN_DONATION = 0.1;
uint256 public constant MAX_DONATION = 100;

// Donation limits modifier
modifier withinDonationLimits(uint256 amount) {
  require(
    amount >= MIN_DONATION,
    "Donation below minimum amount"
  );
  require(
    amount <= MAX_DONATION,
    "Donation exceeds maximum amount"
  );
  _;
}

// Applying the modifier
function donate() 
  public 
  payable 
  withinDonationLimits(msg.value) 
{
  // Record donation
  donations[msg.sender] += msg.value;
  totalDonations += msg.value;
  
  emit DonationReceived(
    msg.sender, msg.value, block.timestamp
  );
}`,
      explanation: [
        "Prevents dust attacks (tiny transactions)",
        "Caps maximum donation size for security",
        "Reusable across multiple functions",
        "Constants save gas compared to variables"
      ]
    },
    getTotal: {
      title: "getTotalDonations() Function",
      tag: "View Function",
      code: `// State variables
uint256 public totalDonations;
mapping(address => uint256) public donations;

// View function to get total donations
function getTotalDonations() 
  public 
  view 
  returns (uint256) 
{
  return totalDonations;
}

// Get individual donor history
function getDonorContributions(address donor) 
  public 
  view 
  returns (uint256) 
{
  return donations[donor];
}

// Get contract balance (implicit)
function getContractBalance() 
  public 
  view 
  returns (uint256) 
{
  return address(this).balance;
}`,
      explanation: [
        "`view` functions don't modify state",
        "Free to call (no gas fees)",
        "Enables frontend to display statistics",
        "Provides transparency for donors"
      ]
    }
  };
  
  const { title, tag, code, explanation } = sections[activeSection as keyof typeof sections];
  
  return (
    <section id="slide6" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          Breaking Down Our Smart Contract
        </h2>
        
        <p className="text-xl text-badir-mocha mb-8 max-w-3xl" data-aos="fade-up" data-aos-delay="100">
          The Badir donation platform is powered by a carefully crafted Ethereum smart contract. Let's explore the key components:
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Code Nav Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-badir-mocha rounded-xl p-4 shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <h3 className="text-lg font-medium text-white mb-4">Contract Components</h3>
              <ul className="space-y-2">
                {Object.keys(sections).map((section) => (
                  <li key={section}>
                    <button 
                      className={cn(
                        "w-full text-left py-2 px-3 rounded text-sm font-medium transition-colors",
                        activeSection === section 
                          ? "bg-badir-rose text-white" 
                          : "bg-badir-sand text-badir-mocha hover:bg-badir-sand/80"
                      )}
                      onClick={() => setActiveSection(section)}
                    >
                      {section === 'donate' && 'donate()'}
                      {section === 'onlyOwner' && 'onlyOwner'}
                      {section === 'limits' && 'withinDonationLimits'}
                      {section === 'getTotal' && 'getTotalDonations()'}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Code Display Area */}
          <div className="lg:col-span-4">
            <motion.div 
              className="bg-white rounded-xl p-6 shadow-lg"
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-badir-mocha">{title}</h3>
                <span className="text-xs bg-badir-rose text-white py-1 px-2 rounded">{tag}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Code block */}
                <div className="md:col-span-2">
                  <div className="bg-badir-mocha rounded-lg p-4">
                    <pre className="code-block text-badir-grey text-sm">{code}</pre>
                  </div>
                </div>
                
                {/* Explanation */}
                <div className="md:col-span-1">
                  <div className="bg-badir-sand bg-opacity-30 rounded-lg p-4 h-full">
                    <h4 className="font-medium text-badir-mocha mb-3">
                      {activeSection === 'donate' && 'Function Breakdown'}
                      {activeSection === 'onlyOwner' && 'Security Explanation'}
                      {activeSection === 'limits' && 'Limits Explanation'}
                      {activeSection === 'getTotal' && 'View Functions'}
                    </h4>
                    <ul className="space-y-3 text-sm">
                      {explanation.map((item, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 * i }}
                        >
                          <i className={`fas ${activeSection === 'donate' ? 'fa-check-circle' : 
                                          activeSection === 'onlyOwner' ? 'fa-lock' : 
                                          activeSection === 'limits' ? 'fa-shield-alt' : 
                                          'fa-eye'} text-badir-rose mt-1 mr-2`}></i>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/`([^`]+)`/g, '<code class="bg-badir-sand px-1 rounded">$1</code>') }}></span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide6SmartContractCode;
