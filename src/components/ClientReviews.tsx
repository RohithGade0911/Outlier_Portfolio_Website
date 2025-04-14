import React, { useEffect, useRef } from 'react';
import '../styles/ClientReviews.css';
import reviewsData from '../data/client-reviews.json';

// Import testimonial images
import testimonial1 from '../assets/testimonials/1.png';
import testimonial2 from '../assets/testimonials/2.png';
import testimonial3 from '../assets/testimonials/3.png';
import testimonial4 from '../assets/testimonials/4.png';
import testimonial5 from '../assets/testimonials/5.png';
import testimonial6 from '../assets/testimonials/6.png';
import testimonial7 from '../assets/testimonials/7.png';

interface Review {
  id: number;
  name: string;
  company: string;
  quote: string;
  photo: string;
}

const ClientReviews: React.FC = () => {
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  // Map of testimonial images
  const testimonialImages = {
    1: testimonial1,
    2: testimonial2,
    3: testimonial3,
    4: testimonial4,
    5: testimonial5,
    6: testimonial6,
    7: testimonial7,
    8: testimonial1 // Reusing first image for the last review
  };

  // Split reviews into left and right columns with 4 cards each
  const leftReviews = reviewsData.reviews.slice(0, 4);
  const rightReviews = reviewsData.reviews.slice(4, 8);

  // Create a continuous loop by adding the first card to the end of each set
  const leftColumnReviews = [...leftReviews, leftReviews[0]];
  const rightColumnReviews = [...rightReviews, rightReviews[0]];

  // Log the number of reviews to verify
  useEffect(() => {
    console.log('Left column reviews:', leftColumnReviews.length);
    console.log('Right column reviews:', rightColumnReviews.length);
  }, []);

  return (
    <section className="client-reviews-section" id="client-reviews">
      <div className="client-reviews-container">
        <h2 className="client-reviews-title client">CLIENT</h2>
        <div className="reviews-column left-column" ref={leftColumnRef}>
          {leftColumnReviews.map((review: Review, index: number) => (
            <div key={`${review.id}-${index}`} className="review-card">
              <div className="review-content">
                <div className="review-photo">
                  <img src={testimonialImages[review.id as keyof typeof testimonialImages]} alt={review.name} loading="lazy" />
                </div>
                <p className="review-quote">"{review.quote}"</p>
              </div>
              <div className="review-author">
                <div className="review-name">{review.name}</div>
                <div className="review-company">{review.company}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reviews-column right-column" ref={rightColumnRef}>
          {rightColumnReviews.map((review: Review, index: number) => (
            <div key={`${review.id}-${index}`} className="review-card">
              <div className="review-content">
                <div className="review-photo">
                  <img src={testimonialImages[review.id as keyof typeof testimonialImages]} alt={review.name} loading="lazy" />
                </div>
                <p className="review-quote">"{review.quote}"</p>
              </div>
              <div className="review-author">
                <div className="review-name">{review.name}</div>
                <div className="review-company">{review.company}</div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="client-reviews-title reviews">REVIEWS</h2>
      </div>
    </section>
  );
};

export default ClientReviews; 