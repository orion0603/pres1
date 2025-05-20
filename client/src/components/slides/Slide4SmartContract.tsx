import { motion } from 'framer-motion';

const Slide4SmartContract = () => {
  const features = [
    {
      icon: "fa-robot",
      title: "Self-Executing",
      description: "Automatically executes when conditions are met without human intervention"
    },
    {
      icon: "fa-shield-alt",
      title: "Immutable",
      description: "Cannot be changed once deployed, ensuring consistent execution"
    },
    {
      icon: "fa-handshake",
      title: "Trustless",
      description: "No need to trust intermediaries; the code enforces the rules"
    },
    {
      icon: "fa-globe",
      title: "Transparent",
      description: "Code is visible to all participants, ensuring transparency"
    }
  ];

  return (
    <section id="slide4" className="slide bg-badir-cream">
      <div className="slide-container">
        <h2 className="text-4xl font-bold text-badir-mocha mb-6" data-aos="fade-up">
          What is a Smart Contract?
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Definition and features */}
          <div>
            <motion.div 
              className="bg-badir-sand rounded-xl p-8 shadow-lg mb-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-badir-mocha">Definition</h3>
              <p className="text-lg">
                A smart contract is self-executing code that automatically enforces and executes the terms of an agreement when predetermined conditions are met.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-badir-tan rounded-xl p-8 shadow-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-badir-cream">Key Features</h3>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: false }}
                  >
                    <div className="bg-badir-rose rounded-full p-2 mr-3 text-white mt-1 flex-shrink-0">
                      <i className={`fas ${feature.icon} text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-badir-cream">{feature.title}</h4>
                      <p className="text-badir-cream text-sm">{feature.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Right side: Visual diagram */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg h-full">
              <h3 className="text-2xl font-semibold mb-6 text-badir-mocha text-center">
                How Smart Contracts Work
              </h3>
              
              {/* Smart contract flow visualization */}
              <div className="relative mb-8">
                {/* User donation */}
                <motion.div 
                  className="bg-badir-cream rounded-lg p-4 mb-3 text-center border border-badir-sand"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: false }}
                >
                  <i className="fas fa-user-circle text-badir-rose text-2xl mb-2"></i>
                  <p className="font-medium">User sends donation</p>
                </motion.div>
                
                {/* Arrow down */}
                <motion.div 
                  className="flex justify-center my-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: false }}
                >
                  <i className="fas fa-arrow-down text-badir-rose"></i>
                </motion.div>
                
                {/* Condition check */}
                <motion.div 
                  className="bg-badir-rose text-white rounded-lg p-4 mb-3 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: false }}
                >
                  <p className="font-medium">If donation ≥ 0.1 ETH</p>
                </motion.div>
                
                {/* Arrow branches */}
                <motion.div 
                  className="flex justify-between my-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  viewport={{ once: false }}
                >
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col items-center">
                      <i className="fas fa-arrow-down text-badir-rose"></i>
                      <span className="text-xs mt-1 text-badir-mocha">Yes</span>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="flex flex-col items-center">
                      <i className="fas fa-arrow-down text-badir-grey"></i>
                      <span className="text-xs mt-1 text-badir-mocha">No</span>
                    </div>
                  </div>
                </motion.div>
                
                {/* Results */}
                <motion.div 
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-green-100 rounded-lg p-4 text-center border border-green-300">
                    <i className="fas fa-check-circle text-green-600 text-xl mb-2"></i>
                    <p className="font-medium text-sm">Accept donation and update ledger</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-300">
                    <i className="fas fa-undo text-gray-600 text-xl mb-2"></i>
                    <p className="font-medium text-sm">Return funds to sender</p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="bg-badir-sand bg-opacity-30 rounded-lg p-4 border border-badir-sand"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                viewport={{ once: false }}
              >
                <h4 className="font-medium text-badir-mocha mb-2">Example Contract Rule</h4>
                <div className="bg-badir-mocha rounded p-3">
                  <pre className="text-badir-cream text-xs">{`function donate() public payable {
  require(msg.value >= 0.1, 
    "Minimum donation is 0.1 ETH");
  
  // Record donation
  donations[msg.sender] += msg.value;
  totalDonations += msg.value;
  
  emit DonationReceived(
    msg.sender, msg.value);
}`}</pre>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Slide4SmartContract;
