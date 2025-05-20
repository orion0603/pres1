import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleNetwork from '../animations/ParticleNetwork';

const Slide5SmartContractDemo = () => {
  // Sample donation data for transparency verification
  const donationHistory = [
    { 
      donor: '0x8a21...93f1', 
      amount: 1.25, 
      timestamp: '2 hours ago',
      message: 'Sending hope and support to Gaza. Stay strong!',
      status: 'Confirmed' 
    },
    { 
      donor: '0x3b48...72c9', 
      amount: 0.75, 
      timestamp: '5 hours ago',
      message: 'For medical supplies',
      status: 'Confirmed' 
    },
    { 
      donor: '0x71a5...23bd', 
      amount: 2.0, 
      timestamp: '7 hours ago',
      message: 'For food and water',
      status: 'Distributed' 
    },
    { 
      donor: '0xc934...12f4', 
      amount: 0.5, 
      timestamp: '1 day ago',
      message: '',
      status: 'Distributed' 
    },
    { 
      donor: '0x5e72...b8d1', 
      amount: 3.2, 
      timestamp: '2 days ago',
      message: 'For emergency relief efforts',
      status: 'Distributed' 
    },
    { 
      donor: '0x947f...22a7', 
      amount: 0.3, 
      timestamp: '3 days ago',
      message: 'Hope this helps someone in need',
      status: 'Distributed' 
    }
  ];

  return (
    <section id="slide5" className="slide relative overflow-hidden">
      {/* Tech background */}
      <ParticleNetwork variant="tech" density={15} color={['#38B6FF', '#00A7E1', '#00D474']} />
      <div className="absolute inset-0 bg-gradient-to-b from-badir-cream via-badir-cream to-badir-cream/80 -z-10" />
      
      <div className="slide-container">
        <motion.div
          className="max-w-6xl mx-auto tech-border p-6 md:p-8 bg-badir-sand/90 backdrop-blur-sm rounded-lg border border-badir-tan/30 shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <motion.h2 
              className="text-5xl font-bold tech-gradient-text mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
            >
              Blockchain Transparency
            </motion.h2>
            
            <motion.p 
              className="text-xl text-badir-mocha mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
            >
              Real-time verification of donations through immutable blockchain records
            </motion.p>
            
            <motion.div 
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-badir-rose to-transparent mx-auto mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 128 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-badir-sand/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-badir-tan/20"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-2xl font-semibold text-badir-mocha">Donation Verification Portal</h3>
              <div className="flex items-center bg-badir-rose/10 text-badir-rose rounded-full px-5 py-2 text-sm font-medium">
                <i className="fas fa-database mr-2"></i>
                <span>Live Blockchain Data</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <motion.div
                className="bg-gradient-to-br from-badir-cream/50 to-badir-sand/90 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm border border-badir-tan/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="text-3xl font-bold text-badir-mocha mb-2">8.0 ETH</div>
                <div className="text-sm text-badir-mocha/90">Total Donations</div>
                <div className="h-1 w-16 bg-badir-rose rounded-full mt-3"></div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-badir-cream/50 to-badir-sand/90 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm border border-badir-tan/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="text-3xl font-bold text-badir-mocha mb-2">6.0 ETH</div>
                <div className="text-sm text-badir-mocha/90">Funds Distributed</div>
                <div className="h-1 w-16 bg-badir-tan rounded-full mt-3"></div>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-badir-cream/50 to-badir-sand/90 rounded-xl p-5 flex flex-col items-center justify-center text-center shadow-sm border border-badir-tan/30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="text-3xl font-bold text-badir-mocha mb-2">2.0 ETH</div>
                <div className="text-sm text-badir-mocha/90">Available Balance</div>
                <div className="h-1 w-16 bg-badir-neon rounded-full mt-3"></div>
              </motion.div>
            </div>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-badir-mocha">Verified Donations</h4>
                <div className="flex items-center text-sm text-badir-mocha/70">
                  <i className="fas fa-sync-alt mr-2"></i>
                  <span>Last updated: 2 minutes ago</span>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-xl border border-badir-tan/30 shadow-md">
                <table className="min-w-full divide-y divide-badir-tan/30">
                  <thead className="bg-gradient-to-r from-badir-cream/50 to-badir-sand/30">
                    <tr>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-badir-mocha uppercase tracking-wider">Donor Address</th>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-badir-mocha uppercase tracking-wider">Amount (ETH)</th>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-badir-mocha uppercase tracking-wider">Message</th>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-badir-mocha uppercase tracking-wider">Time</th>
                      <th scope="col" className="px-5 py-3 text-left text-xs font-semibold text-badir-mocha uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-badir-sand/70 divide-y divide-badir-tan/30">
                    {donationHistory.map((donation, index) => (
                      <tr key={index} className="hover:bg-badir-tan/20 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-mono text-badir-mocha">{donation.donor}</td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-badir-mocha">{donation.amount} ETH</td>
                        <td className="px-5 py-4 text-sm text-badir-mocha/90 truncate max-w-[200px]">
                          {donation.message || <span className="text-badir-mocha/50 italic">No message</span>}
                        </td>
                        <td className="px-5 py-4 whitespace-nowrap text-sm text-badir-mocha/70">{donation.timestamp}</td>
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            donation.status === 'Confirmed' 
                              ? 'bg-badir-tan/70 text-badir-mocha' 
                              : 'bg-badir-rose/70 text-badir-mocha'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="bg-badir-mocha/5 p-5 rounded-xl border border-badir-mocha/10">
                <div className="flex items-center mb-3">
                  <i className="fas fa-search text-badir-rose mr-3 text-lg"></i>
                  <h4 className="font-semibold text-badir-mocha text-lg">Verification</h4>
                </div>
                <p className="text-sm text-badir-mocha/80 mb-3">
                  All transactions are permanently recorded on the Ethereum blockchain and can be verified
                  using block explorers like Etherscan by searching for the contract address:
                </p>
                <div className="bg-badir-cream p-3 rounded-lg font-mono text-sm text-badir-tan break-all border border-badir-tan/20">
                  0x18d4e5F8d7A46cEff9FE74f0A5F2C4e3c5aB91B3
                </div>
              </div>
              
              <div className="bg-badir-mocha/5 p-5 rounded-xl border border-badir-mocha/10">
                <div className="flex items-center mb-3">
                  <i className="fas fa-chart-pie text-badir-rose mr-3 text-lg"></i>
                  <h4 className="font-semibold text-badir-mocha text-lg">Fund Distribution</h4>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-badir-mocha/80">Medical Supplies</span>
                    <span className="font-medium text-badir-mocha">55%</span>
                  </div>
                  <div className="w-full h-2 bg-badir-cream rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-badir-rose rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '55%' }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-badir-mocha/80">Food & Water</span>
                    <span className="font-medium text-badir-mocha">30%</span>
                  </div>
                  <div className="w-full h-2 bg-badir-cream rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-badir-tan rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '30%' }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-badir-mocha/80">Shelter & Protection</span>
                    <span className="font-medium text-badir-mocha">15%</span>
                  </div>
                  <div className="w-full h-2 bg-badir-cream rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-badir-neon rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: '15%' }}
                      transition={{ duration: 1, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide5SmartContractDemo;
