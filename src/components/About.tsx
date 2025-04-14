import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import aboutImage1 from '../assets/about/image1.png';
import aboutImage2 from '../assets/about/image2.png';
import aboutImage3 from '../assets/about/image3.png';
import aboutImage4 from '../assets/about/image4.png';

const About: React.FC = () => {
  const leftElementsRef = useRef<HTMLDivElement>(null);
  const rightElementsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textLinesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [textLinesRevealed, setTextLinesRevealed] = useState<boolean[]>([false, false, false, false]);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [decorativeElementsVisible, setDecorativeElementsVisible] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      
      // Check if the section is in view (at least 20% visible)
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const sectionHeight = sectionRect.height;
      
      // Calculate how much of the section is visible
      const visiblePercentage = Math.min(
        100,
        Math.max(
          0,
          ((windowHeight - sectionTop) / sectionHeight) * 100
        )
      );
      
      // Only consider the section "in view" when at least 20% is visible
      const isInView = visiblePercentage > 20;
      
      // Update section in view state
      setSectionInView(isInView);
      
      // Only trigger animations when section is in view
      if (isInView) {
        // Handle decorative elements visibility
        if (!decorativeElementsVisible) {
          setDecorativeElementsVisible(true);
        }
        
        // Handle title reveal animation
        if (titleRef.current && !titleRevealed) {
          setTitleRevealed(true);
        }
        
        // Handle text lines reveal animation
        if (textLinesRef.current) {
          const textLines = textLinesRef.current.querySelectorAll('p');
          
          textLines.forEach((line, index) => {
            const lineRect = line.getBoundingClientRect();
            const lineInView = lineRect.top < windowHeight * 0.8 && lineRect.bottom > 0;
            
            if (lineInView && !textLinesRevealed[index]) {
              setTextLinesRevealed(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          });
          
          // Check if all text lines are revealed to show the button
          if (textLinesRevealed.every(revealed => revealed)) {
            setButtonVisible(true);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [titleRevealed, textLinesRevealed, decorativeElementsVisible]);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-content">
          <h2 
            className={`about-title ${titleRevealed ? 'revealed' : ''}`} 
            ref={titleRef}
          >
            ABOUT ME
          </h2>
          <div className="about-text" ref={textLinesRef}>
            <p className={textLinesRevealed[0] ? 'revealed' : ''}>
            With over five years in graphic design,
            </p>
            <p className={textLinesRevealed[1] ? 'revealed' : ''}>
            I specialize in visual identity, print design, and digital assets.            </p>
            <p className={textLinesRevealed[2] ? 'revealed' : ''}>
            I partner with bold brands to craft striking, story-driven visuals.
            </p>
            <p className={textLinesRevealed[3] ? 'revealed' : ''}>
            Let’s design what makes you unforgettable.
            </p>
          </div>
          <button className={`contact-button ${buttonVisible ? 'visible' : ''}`}>
            CONTACT ME
          </button>
        </div>
        
        <div className={`decorative-elements ${decorativeElementsVisible ? 'visible' : ''}`}>
          <div className="left-elements" ref={leftElementsRef}>
            <img src={aboutImage1} alt="Decorative element" className="decorative-element top-left" />
          </div>
          <div className="right-elements" ref={rightElementsRef}>
            <img src={aboutImage3} alt="Decorative element" className="decorative-element top-right" />
            <img src={aboutImage4} alt="Decorative element" className="decorative-element bottom-right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 