import { useEffect, useState, useCallback } from 'react';
import { scrollToElement } from '@/lib/utils';

export function useSlideNavigation(totalSlides: number) {
  const [activeSlide, setActiveSlide] = useState(1);

  const navigateToSlide = useCallback((slideNumber: number) => {
    if (slideNumber >= 1 && slideNumber <= totalSlides) {
      scrollToElement(`slide${slideNumber}`);
      setActiveSlide(slideNumber);
    }
  }, [totalSlides]);

  const navigateNext = useCallback(() => {
    navigateToSlide(Math.min(activeSlide + 1, totalSlides));
  }, [activeSlide, navigateToSlide, totalSlides]);

  const navigatePrev = useCallback(() => {
    navigateToSlide(Math.max(activeSlide - 1, 1));
  }, [activeSlide, navigateToSlide]);

  // Handle scroll events to update active slide
  useEffect(() => {
    const handleScroll = () => {
      const slides = Array.from({ length: totalSlides }, (_, i) => {
        const element = document.getElementById(`slide${i + 1}`);
        if (!element) return null;
        
        const rect = element.getBoundingClientRect();
        return {
          id: i + 1,
          top: rect.top,
          height: rect.height
        };
      }).filter(Boolean) as Array<{ id: number, top: number, height: number }>;
      
      // Find the current visible slide
      const viewportHeight = window.innerHeight;
      const currentSlide = slides.find(slide => {
        return slide.top <= viewportHeight / 3 && slide.top > -slide.height / 2;
      });
      
      if (currentSlide && currentSlide.id !== activeSlide) {
        setActiveSlide(currentSlide.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSlide, totalSlides]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        navigatePrev();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateNext, navigatePrev]);

  return {
    activeSlide,
    setActiveSlide,
    navigateToSlide,
    navigateNext,
    navigatePrev
  };
}
