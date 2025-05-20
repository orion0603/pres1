import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';
import NavigationDots from './navigation/NavigationDots';
import { useSlideNavigation } from '@/hooks/useSlideNavigation';

// Import slides
import Slide1Landing from './slides/Slide1Landing';
import Slide2Motivation from './slides/Slide2Motivation';
import Slide3Blockchain from './slides/Slide3Blockchain';
import Slide3aBlockchainFeatures from './slides/Slide3aBlockchainFeatures';
import Slide4SmartContract from './slides/Slide4SmartContract';
import Slide5SmartContractDemo from './slides/Slide5SmartContractDemo';
import Slide6SmartContractCode from './slides/Slide6SmartContractCode';
import Slide7Deployment from './slides/Slide7Deployment';
import Slide8Security from './slides/Slide8Security';
import Slide9Attacks from './slides/Slide9Attacks';
import Slide10ThankYou from './slides/Slide10ThankYou';

const TOTAL_SLIDES = 11;

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
      <Slide5SmartContractDemo />
      <Slide6SmartContractCode />
      <Slide7Deployment />
      <Slide8Security />
      <Slide9Attacks />
      <Slide10ThankYou onReplayClick={() => navigateToSlide(1)} />
      
      {/* Mobile navigation arrows */}
      <div className="fixed bottom-4 right-4 flex space-x-2 md:hidden z-50">
        <button 
          onClick={navigatePrev}
          className="w-10 h-10 bg-badir-rose text-white rounded-full flex items-center justify-center shadow-lg"
          aria-label="Previous slide"
          disabled={activeSlide === 1}
        >
          <i className="fas fa-chevron-up"></i>
        </button>
        <button 
          onClick={navigateNext}
          className="w-10 h-10 bg-badir-rose text-white rounded-full flex items-center justify-center shadow-lg"
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
