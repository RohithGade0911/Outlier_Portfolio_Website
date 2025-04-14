import React, { useEffect, useRef, useState } from 'react';
import '../styles/ClientReviews.css';

const ClientReviews: React.FC = () => {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [leftColumnVisible, setLeftColumnVisible] = useState(false);
  const [rightColumnVisible, setRightColumnVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  const testimonials = [
    { id: 1, image: '/src/assets/testimonials/1.png', name: 'John Doe', company: 'Tech Corp', quote: 'Amazing work! Really brought our vision to life.' },
    { id: 2, image: '/src/assets/testimonials/2.png', name: 'Jane Smith', company: 'Design Studio', quote: 'Exceptional attention to detail and creativity.' },
    { id: 3, image: '/src/assets/testimonials/3.png', name: 'Mike Johnson', company: 'Creative Agency', quote: 'A true professional with outstanding skills.' },
    { id: 4, image: '/src/assets/testimonials/4.png', name: 'Sarah Brown', company: 'Marketing Firm', quote: 'Delivered beyond our expectations.' },
    { id: 5, image: '/src/assets/testimonials/5.png', name: 'David Wilson', company: 'Startup Inc', quote: 'Innovative solutions and great communication.' },
    { id: 6, image: '/src/assets/testimonials/6.png', name: 'Emily Davis', company: 'Media Group', quote: 'Highly recommend for any design project.' },
    { id: 7, image: '/src/assets/testimonials/7.png', name: 'Alex Turner', company: 'Digital Solutions', quote: 'Outstanding work and professional service.' }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === leftColumnRef.current) {
            setLeftColumnVisible(true);
          } else if (entry.target === rightColumnRef.current) {
            setRightColumnVisible(true);
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (leftColumnRef.current) {
      observer.observe(leftColumnRef.current);
    }
    if (rightColumnRef.current) {
      observer.observe(rightColumnRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const reviewsSection = document.getElementById('reviews');
      
      if (reviewsSection) {
        const sectionTop = reviewsSection.offsetTop;
        const sectionHeight = reviewsSection.offsetHeight;
        
        // Calculate how far through the section we've scrolled (0 to 1)
        const scrollProgress = Math.max(0, Math.min(1, 
          (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));
        
        setReviewsVisible(scrollProgress > 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="client-reviews-section" id="reviews">
      <h2 className="client-reviews-title">Client Reviews</h2>
      <div className="reviews-container">
        <div 
          className={`reviews-column left-column ${leftColumnVisible ? 'visible' : ''}`} 
          ref={leftColumnRef}
        >
          {testimonials.slice(0, Math.ceil(testimonials.length / 2)).map(testimonial => (
            <div key={testimonial.id} className={`review-card ${reviewsVisible ? 'visible' : ''}`}>
              <img src={testimonial.image} alt={testimonial.name} className="reviewer-image" />
              <div className="review-content">
                <h3>{testimonial.name}</h3>
                <p className="company">{testimonial.company}</p>
                <p className="quote">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
        <div 
          className={`reviews-column right-column ${rightColumnVisible ? 'visible' : ''}`} 
          ref={rightColumnRef}
        >
          {testimonials.slice(Math.ceil(testimonials.length / 2)).map(testimonial => (
            <div key={testimonial.id} className={`review-card ${reviewsVisible ? 'visible' : ''}`}>
              <img src={testimonial.image} alt={testimonial.name} className="reviewer-image" />
              <div className="review-content">
                <h3>{testimonial.name}</h3>
                <p className="company">{testimonial.company}</p>
                <p className="quote">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientReviews; 