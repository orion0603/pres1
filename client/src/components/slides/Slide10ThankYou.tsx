import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface Slide10ThankYouProps {
  onReplayClick: () => void;
}

const Slide10ThankYou = ({ onReplayClick }: Slide10ThankYouProps) => {
  const teamMembers = [
    {
      name: "Yara",
      role: "Student"
    },
    {
      name: "Afnan",
      role: "Student"
    },
    {
      name: "Leedia",
      role: "Student"
    }
  ];

  return (
    <section id="slide10" className="slide bg-badir-cream">
      <div className="slide-container">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold text-badir-mocha mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            Thank You
          </motion.h2>
          
          <motion.p 
            className="text-xl text-badir-mocha mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: false }}
          >
            For exploring Badir – Transparency Through Blockchain
          </motion.p>
          
          <motion.div 
            className="bg-badir-tan bg-opacity-40 rounded-2xl p-8 shadow-lg mb-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <h3 className="text-2xl font-semibold text-badir-mocha mb-6">Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: false }}
                >
                  <div className="w-20 h-20 bg-badir-sand rounded-full mx-auto mb-3 flex items-center justify-center">
                    <i className="fas fa-user text-badir-rose text-2xl"></i>
                  </div>
                  <h4 className="font-semibold text-badir-mocha">{member.name}</h4>
                  <p className="text-sm text-badir-mocha">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: false }}
          >
            <Button
              className="px-6 py-3 h-auto bg-badir-mocha text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md flex items-center"
            >
              <i className="fab fa-github mr-2"></i> GitHub Repository
            </Button>
            <Button
              onClick={onReplayClick}
              className="px-6 py-3 h-auto bg-badir-rose text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-md flex items-center"
            >
              <i className="fas fa-redo mr-2"></i> Replay Presentation
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Slide10ThankYou;
