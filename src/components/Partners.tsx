import React, { useRef, useEffect } from 'react';
import '../styles/Partners.css';

// Import partner logos
import partner1 from '../assets/partners/partner-1.png';
import partner2 from '../assets/partners/partner-2.png';
import partner3 from '../assets/partners/partner-3.png';
import partner4 from '../assets/partners/partner-4.png';
import partner5 from '../assets/partners/partner-5.png';
import partner7 from '../assets/partners/partner-7.png';
import partner8 from '../assets/partners/partner-8.png';
import partner9 from '../assets/partners/partner-9.png';
import partner10 from '../assets/partners/partner-10.png';
import partner11 from '../assets/partners/partner-11.png';
import partner12 from '../assets/partners/partner-12.png';
import partner13 from '../assets/partners/partner-13.png';
import partner14 from '../assets/partners/partner-14.png';

// Create array of partner logos
const partnerLogos = [
  { id: 1, src: partner1, alt: 'Partner 1' },
  { id: 2, src: partner2, alt: 'Partner 2' },
  { id: 3, src: partner3, alt: 'Partner 3' },
  { id: 4, src: partner4, alt: 'Partner 4' },
  { id: 5, src: partner5, alt: 'Partner 5' },
  { id: 7, src: partner7, alt: 'Partner 7' },
  { id: 8, src: partner8, alt: 'Partner 8' },
  { id: 9, src: partner9, alt: 'Partner 9' },
  { id: 10, src: partner10, alt: 'Partner 10' },
  { id: 11, src: partner11, alt: 'Partner 11' },
  { id: 12, src: partner12, alt: 'Partner 12' },
  { id: 13, src: partner13, alt: 'Partner 13' },
  { id: 14, src: partner14, alt: 'Partner 14' }
];

const Partners: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Clone the first set of logos and append them to the end for seamless looping
    const firstSet = carousel.querySelectorAll('.partner-logo-container');
    const cloneSet = Array.from(firstSet).map(item => item.cloneNode(true));
    cloneSet.forEach(item => carousel.appendChild(item));

    // Set up the animation
    const animate = () => {
      if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
        // When we've scrolled halfway (through the original set), reset to the beginning
        carousel.scrollLeft = 0;
      } else {
        // Scroll by a small amount
        carousel.scrollLeft += 1;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationRef.current = requestAnimationFrame(animate);

    // Clean up
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="partners-section">
      <div className="carousel-container">
        <div 
          className="partners-carousel" 
          ref={carouselRef}
        >
          {/* Partner logos */}
          {partnerLogos.map((logo) => (
            <div key={logo.id} className="partner-logo-container">
              <img 
                src={logo.src} 
                alt={logo.alt}
                className="partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners; 