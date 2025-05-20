import { cn } from '@/lib/utils';

interface NavigationDotsProps {
  activeSlide: number;
  totalSlides: number;
  onDotClick: (slideNumber: number) => void;
}

const NavigationDots = ({ activeSlide, totalSlides, onDotClick }: NavigationDotsProps) => {
  return (
    <div className="nav-dots hidden md:flex">
      {Array.from({ length: totalSlides }, (_, i) => (
        <div
          key={i}
          className={cn("nav-dot", i + 1 === activeSlide && "active")}
          onClick={() => onDotClick(i + 1)}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
