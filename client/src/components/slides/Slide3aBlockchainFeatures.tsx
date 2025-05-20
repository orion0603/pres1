import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide3aBlockchainFeatures = () => {
  const features = [
    {
      icon: "fa-lock",
      title: "Immutability",
      description: "Once recorded, data cannot be altered or deleted, ensuring donation records remain permanent."
    },
    {
      icon: "fa-eye",
      title: "Transparency",
      description: "All transactions are public and verifiable by anyone, ensuring complete visibility."
    },
    {
      icon: "fa-network-wired",
      title: "Decentralization",
      description: "No single entity controls the network, making it resistant to corruption and censorship."
    },
    {
      icon: "fa-history",
      title: "Traceability",
      description: "Complete history of all donations is maintained, allowing for full audit trails."
    },
    {
      icon: "fa-shield-alt",
      title: "Security",
      description: "Cryptographic principles protect the data from manipulation and unauthorized access."
    },
    {
      icon: "fa-handshake",
      title: "Trust",
      description: "Donors can verify their funds are being used as intended through transparent transactions."
    }
  ];

  return (
    <section id="slide3a" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container flex flex-col justify-center items-center">
        <motion.div
          className="max-w-5xl mx-auto p-8 md:p-12 backdrop-blur-sm bg-white/30 rounded-2xl border border-badir-tan/30 shadow-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold text-badir-mocha mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Key Blockchain Features
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Understanding the revolutionary aspects that make blockchain ideal for donation platforms
            </motion.p>

            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                className="p-6 rounded-xl bg-gradient-to-br from-badir-sand/40 to-badir-cream/70 backdrop-blur-sm border border-badir-tan/30 shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-badir-rose/90 rounded-full p-3 text-white flex-shrink-0 shadow-md">
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-badir-mocha">{feature.title}</h4>
                    <p className="text-sm text-badir-mocha/90 mt-2">{feature.description}</p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-badir-tan/30">
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-badir-tan/20 h-1 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-badir-rose to-badir-tan rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1, delay: 0.4 + (i * 0.1) }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Technology Summary */}
          <motion.div
            className="mt-12 p-6 rounded-xl bg-badir-rose/10 border border-badir-rose/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <h3 className="text-xl font-semibold text-badir-mocha mb-4">Why Blockchain for Donations?</h3>
            <p className="text-badir-mocha/90">
              Blockchain technology creates an unprecedented level of transparency and trust in charitable giving.
              By leveraging these key features, Badir provides donors with complete confidence that their 
              contributions reach the intended recipients, while maintaining a permanent and tamper-proof record 
              of all transactions.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide3aBlockchainFeatures;