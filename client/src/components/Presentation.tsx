import { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import NavigationDots from './navigation/NavigationDots';
import CyberBackgroundAnimation from './animations/CyberBackgroundAnimation';
import TechElements from './animations/TechElements';
import GlowingHexGrid from './animations/GlowingHexGrid';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';

// Import slides
import Slide1Landing from './slides/Slide1Landing';
import Slide2Motivation from './slides/Slide2Motivation';
import Slide3Blockchain from './slides/Slide3Blockchain';
import Slide3aBlockchainFeatures from './slides/Slide3aBlockchainFeatures';
import Slide4SmartContract from './slides/Slide4SmartContract';
import Slide6SmartContractCode from './slides/Slide6SmartContractCode';
import Slide5SmartContractDemo from './slides/Slide5SmartContractDemo';
import Slide6aDeploymentIntro from './slides/Slide6aDeploymentIntro';
import Slide7Deployment from './slides/Slide7Deployment';
import Slide8Security from './slides/Slide8Security';
import Slide9Attacks from './slides/Slide9Attacks';
import Slide10ThankYou from './slides/Slide10ThankYou';

const TOTAL_SLIDES = 12;

const Presentation = () => {
  const { activeSlide, navigateToSlide, navigateNext, navigatePrev } = useSlideNavigation(TOTAL_SLIDES);

  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
    });
  }, []);

  return (
    <div className="presentation-container">
      <div className="fixed inset-0 z-0">
        <CyberBackgroundAnimation variant={activeSlide % 3 === 0 ? "particles" : activeSlide % 3 === 1 ? "grid" : "network"} />
        <GlowingHexGrid opacity={0.15} color="#43B0AF" glowColor="#67FFF2" size={0.8} speed={0.3} />
      </div>
      
      {/* Decorative tech elements throughout the presentation */}
      <TechElements variant="circuit" position="top-right" opacity={0.15} color="#43B0AF" scale={1.2} />
      <TechElements variant="nodes" position="bottom-left" opacity={0.1} color="#67FFF2" scale={1.5} />
      <TechElements variant="data" position="top-left" opacity={0.12} color="#81EC86" scale={0.8} />
      
      <NavigationDots 
        activeSlide={activeSlide} 
        totalSlides={TOTAL_SLIDES} 
        onDotClick={navigateToSlide} 
      />
      
      <Slide1Landing onStartClick={() => navigateToSlide(2)} />
      <Slide2Motivation />
      <Slide3Blockchain />
      <Slide3aBlockchainFeatures />
      <Slide4SmartContract />
      <Slide6SmartContractCode />
      <Slide5SmartContractDemo />
      <Slide6aDeploymentIntro />
      <Slide7Deployment />
      <Slide8Security />
      <Slide9Attacks />
      <Slide10ThankYou onReplayClick={() => navigateToSlide(1)} />
      
      {/* Mobile navigation arrows */}
      <div className="fixed bottom-4 right-4 flex space-x-2 md:hidden z-50">
        <button 
          onClick={navigatePrev}
          className="w-10 h-10 bg-badir-tan text-white rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(103,255,242,0.5)] hover:shadow-[0_0_15px_rgba(103,255,242,0.7)] transition-all duration-300"
          aria-label="Previous slide"
          disabled={activeSlide === 1}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <button 
          onClick={navigateNext}
          className="w-10 h-10 bg-badir-tan text-white rounded-sm flex items-center justify-center shadow-[0_0_10px_rgba(103,255,242,0.5)] hover:shadow-[0_0_15px_rgba(103,255,242,0.7)] transition-all duration-300"
          aria-label="Next slide"
          disabled={activeSlide === TOTAL_SLIDES}
        >
          <i className="fas fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
};

export default Presentation;
