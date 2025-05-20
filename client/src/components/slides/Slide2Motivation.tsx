import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const Slide2Motivation = () => {
  const motivations = [
    {
      icon: "fa-eye-slash",
      title: "Lack of Transparency",
      description: "Traditional donation systems often lack clear tracking of funds, making it difficult for donors to see where their money goes."
    },
    {
      icon: "fa-heart-broken",
      title: "Donor Trust Erosion",
      description: "High-profile scandals and mismanagement of funds have led to decreased trust in humanitarian aid organizations."
    },
    {
      icon: "fa-hands-helping",
      title: "Gaza Crisis Response",
      description: "Inspired by the urgent need for secure aid distribution during the humanitarian crisis in Gaza, ensuring help reaches those in need."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="slide2" className="slide bg-badir-cream">
      <div className="slide-container">
        <motion.h2 
          className="text-4xl font-bold text-badir-mocha mb-12"
          data-aos="fade-up"
        >
          Project Motivation
        </motion.h2>
        
        <div className="bg-badir-tan rounded-2xl shadow-lg p-8 md:p-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            {motivations.map((motivation, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-badir-cream rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start mb-4">
                  <div className="bg-badir-rose rounded-full p-3 mr-4 text-white">
                    <i className={`fas ${motivation.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-badir-mocha">
                    {motivation.title}
                  </h3>
                </div>
                <p className="text-badir-mocha">
                  {motivation.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Slide2Motivation;
