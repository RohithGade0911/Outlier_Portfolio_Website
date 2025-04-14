import React, { useRef, useEffect } from 'react';
import '../styles/Partners.css';

// Import partner logos using dynamic imports
const partnerLogos = [
  { id: 1, src: '/src/assets/partners/partner-1.png', alt: 'Partner 1' },
  { id: 2, src: '/src/assets/partners/partner-2.png', alt: 'Partner 2' },
  { id: 3, src: '/src/assets/partners/partner-3.png', alt: 'Partner 3' },
  { id: 4, src: '/src/assets/partners/partner-4.png', alt: 'Partner 4' },
  { id: 5, src: '/src/assets/partners/partner-5.png', alt: 'Partner 5' },
  { id: 7, src: '/src/assets/partners/partner-7.png', alt: 'Partner 7' },
  { id: 8, src: '/src/assets/partners/partner-8.png', alt: 'Partner 8' },
  { id: 9, src: '/src/assets/partners/partner-9.png', alt: 'Partner 9' },
  { id: 10, src: '/src/assets/partners/partner-10.png', alt: 'Partner 10' },
  { id: 11, src: '/src/assets/partners/partner-11.png', alt: 'Partner 11' },
  { id: 12, src: '/src/assets/partners/partner-12.png', alt: 'Partner 12' },
  { id: 13, src: '/src/assets/partners/partner-13.png', alt: 'Partner 13' },
  { id: 14, src: '/src/assets/partners/partner-14.png', alt: 'Partner 14' }
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