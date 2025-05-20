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
          
          {/* Right side: Smart Contract Benefits */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <div className="bg-white rounded-xl p-8 shadow-lg h-full flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-6 text-badir-mocha text-center">
                Benefits for Donation Platforms
              </h3>
              
              <div className="space-y-6">
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-badir-rose rounded-full p-3 text-white flex-shrink-0 mr-4">
                    <i className="fas fa-money-bill-wave"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha">Reduced Costs</h4>
                    <p className="text-sm text-badir-mocha/80">Elimination of intermediaries reduces processing fees and administrative costs</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-badir-rose rounded-full p-3 text-white flex-shrink-0 mr-4">
                    <i className="fas fa-university"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha">Direct Transfer</h4>
                    <p className="text-sm text-badir-mocha/80">Funds move directly from donors to recipients without traditional banking delays</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-badir-rose rounded-full p-3 text-white flex-shrink-0 mr-4">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha">Real-time Tracking</h4>
                    <p className="text-sm text-badir-mocha/80">Donors can track their contributions in real-time from donation to distribution</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  viewport={{ once: false }}
                >
                  <div className="bg-badir-rose rounded-full p-3 text-white flex-shrink-0 mr-4">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-badir-mocha">Increased Trust</h4>
                    <p className="text-sm text-badir-mocha/80">Automatic execution builds donor confidence that funds reach intended recipients</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Slide4SmartContract;
