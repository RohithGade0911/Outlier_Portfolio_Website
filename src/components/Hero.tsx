import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import heroImage from '../assets/pixar_3d.png';

const Hero: React.FC = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage of viewport
      const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      
      // Apply transform with a subtle movement (max 20px in any direction)
      const moveX = xPercent * 20;
      const moveY = yPercent * 20;
      
      imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Hi, I'm ROH</h1>
        </div>
        <p className="hero-subtitle">
        A enthusiastic graphic artist who makes digital experiences that look good and work well!</p>
        <div className="hero-buttons">
          <a href="#portfolio" className="primary-button">My Works</a>
        </div>
        <img 
          ref={imageRef}
          src={heroImage} 
          alt="3D Character" 
          className="hero-image" 
        />
      </div>
    </section>
  );
};

export default Hero; 