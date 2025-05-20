import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide6aDeploymentIntro = () => {
  return (
    <section id="slide6a" className="slide relative overflow-hidden">
      {/* Background */}
      <ParticleNetwork variant="tech" density={15} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream to-badir-cream/90 -z-10" />
      
      <div className="slide-container flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-4xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-10">
            <motion.h2 
              className="text-5xl font-bold text-badir-mocha mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Smart Contract <span className="text-badir-rose">Deployment</span>
            </motion.h2>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-8"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-badir-tan/20">
            {/* Definition */}
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-3xl text-badir-mocha leading-relaxed font-medium mx-auto">
                "Deployment is the process of making a smart contract live on the blockchain network."
              </p>
            </motion.div>
            
            {/* Simple Deployment Illustration */}
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Contract */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white rounded-lg shadow-md border border-badir-rose/30 p-5 w-32 h-32 flex flex-col items-center justify-center">
                  <i className="fas fa-file-contract text-4xl text-badir-rose mb-3"></i>
                  <p className="text-sm font-medium text-badir-mocha">Smart Contract</p>
                </div>
              </motion.div>
              
              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <i className="fas fa-long-arrow-alt-right text-3xl text-badir-rose"></i>
              </motion.div>
              
              {/* Blockchain */}
              <motion.div
                className="flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative bg-white rounded-lg shadow-md border border-badir-rose/30 p-5 w-32 h-32 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="w-full h-full opacity-10"
                      animate={{ 
                        boxShadow: [
                          "0 0 0 0 rgba(246, 173, 173, 0)",
                          "0 0 0 10px rgba(246, 173, 173, 0.3)",
                          "0 0 0 20px rgba(246, 173, 173, 0)"
                        ]
                      }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </div>
                  <i className="fas fa-cubes text-4xl text-badir-rose mb-3"></i>
                  <p className="text-sm font-medium text-badir-mocha">Blockchain</p>
                </div>
              </motion.div>
              
              {/* Lock Icon */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-[40%] right-[30%] transform rotate-12 opacity-80"
              >
                <i className="fas fa-lock text-badir-rose text-xl"></i>
              </motion.div>
            </motion.div>
            
            {/* Key Points */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-badir-cream/30 rounded-lg p-5 border border-badir-tan/30 shadow-md">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-badir-rose/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-lock text-badir-rose"></i>
                  </div>
                  <h3 className="font-semibold text-badir-mocha">Immutable</h3>
                </div>
                <p className="text-badir-mocha/80 text-sm">
                  Once deployed, the contract cannot be changed, ensuring security and trust.
                </p>
              </div>
              
              <div className="bg-badir-cream/30 rounded-lg p-5 border border-badir-tan/30 shadow-md">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-badir-rose/10 rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-globe text-badir-rose"></i>
                  </div>
                  <h3 className="font-semibold text-badir-mocha">Accessible</h3>
                </div>
                <p className="text-badir-mocha/80 text-sm">
                  Anyone can interact with the deployed contract using its unique address.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide6aDeploymentIntro;