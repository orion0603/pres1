import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

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
    <section id="slide4" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} color={['#38B6FF', '#00A7E1', '#00D474']} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="text-4xl font-bold tech-gradient-text mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              What is a Smart Contract?
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-10"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          {/* Definition */}
          <motion.div 
            className="bg-badir-sand/80 backdrop-blur-sm rounded-xl p-8 shadow-lg mb-12 transform transition-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-badir-mocha">Definition</h3>
            <p className="text-lg leading-relaxed">
              A smart contract is self-executing code that automatically enforces and executes the terms of an agreement when predetermined conditions are met. It operates on blockchain technology and eliminates the need for intermediaries while ensuring trust, security, and transparency.
            </p>
          </motion.div>
          
          {/* Key Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-badir-mocha text-center">Key Features</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-badir-sand/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-badir-tan/30 transform transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  viewport={{ once: false }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-badir-rose rounded-full p-4 mr-4 text-badir-mocha flex-shrink-0 w-12 h-12 flex items-center justify-center shadow-md">
                      <i className={`fas ${feature.icon} text-lg`}></i>
                    </div>
                    <h4 className="font-semibold text-lg text-badir-mocha">{feature.title}</h4>
                  </div>
                  <p className="text-badir-mocha/90 pl-16">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide4SmartContract;
