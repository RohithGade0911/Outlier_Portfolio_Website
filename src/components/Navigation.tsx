import React, { useState, useEffect } from 'react';
import '../styles/Navigation.css';
import '../styles/fonts.css';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // First scroll to home section
    const homeSection = document.querySelector('#home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
      // Wait for the scroll animation to complete before refreshing
      setTimeout(() => {
        window.location.reload();
      }, 500); // Wait for 1 second to allow the scroll animation to complete
    }
  };

  useEffect(() => {
    // Check if we need to scroll to home after refresh
    const shouldScrollToHome = sessionStorage.getItem('scrollToHome');
    if (shouldScrollToHome) {
      // Clear the flag
      sessionStorage.removeItem('scrollToHome');
      // Scroll to home section
      const homeSection = document.querySelector('#home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <nav className={`navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <a href="#home" onClick={handleLogoClick} data-text="RG">RG</a>
      </div>
      
      <div className="nav-items">
        {navItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector(item.href);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      <button 
        className="mobile-menu-button"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector(item.href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navigation; 