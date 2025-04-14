import React, { useEffect, useRef, useState } from 'react';
import '../styles/Portfolio.css';

interface PortfolioItem {
  id: number;
  image: string;
  title: string;
}

const Portfolio: React.FC = () => {
  const grid1Ref = useRef<HTMLDivElement>(null);
  const grid2Ref = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const portfolioItems: PortfolioItem[] = [
    { id: 1, image: '/src/assets/gallery/1.png', title: '3D Design Project 1' },
    { id: 2, image: '/src/assets/gallery/2.png', title: 'Design Project 2' },
    { id: 3, image: '/src/assets/gallery/3.jpg', title: 'Project 3' },
    { id: 4, image: '/src/assets/gallery/4.jpg', title: '3D Design 4' },
    { id: 5, image: '/src/assets/gallery/5.png', title: '3D Project 5' },
    { id: 6, image: '/src/assets/gallery/6.jpg', title: 'Design Project 6' }
  ];

  const portfolioItems2: PortfolioItem[] = [
    { id: 7, image: '/src/assets/gallery/7.png', title: '3D Design 7' },
    { id: 8, image: '/src/assets/gallery/8.jpg', title: '3D Project 8' },
    { id: 9, image: '/src/assets/gallery/9.png', title: 'Design Project 9' },
    { id: 10, image: '/src/assets/gallery/10.png', title: '3D 10' },
    { id: 11, image: '/src/assets/gallery/11.jpg', title: '3D  Project 11' },
    { id: 12, image: '/src/assets/gallery/12.png', title: 'Design Project 12' }
  ];

  const galleryImages = [
    { src: '/src/assets/gallery/1.png', alt: 'Gallery Image 1' },
    { src: '/src/assets/gallery/2.png', alt: 'Gallery Image 2' },
    { src: '/src/assets/gallery/5.png', alt: 'Gallery Image 5' },
    { src: '/src/assets/gallery/7.png', alt: 'Gallery Image 7' },
    { src: '/src/assets/gallery/9.png', alt: 'Gallery Image 9' },
    { src: '/src/assets/gallery/10.png', alt: 'Gallery Image 10' },
    { src: '/src/assets/gallery/12.png', alt: 'Gallery Image 12' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      
      // Calculate how far through the section we've scrolled (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1, 
        (scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight)
      ));
      
      setScrollPosition(scrollProgress);
      
      // Apply transform based on scroll position
      if (grid1Ref.current) {
        // First grid: Move from left to right
        const translateX = -33.33 + (scrollProgress * 66.66);
        grid1Ref.current.style.transform = `translateX(${translateX}%)`;
      }
      
      if (grid2Ref.current) {
        // Second grid: Move from right to left
        const translateX = 33.33 - (scrollProgress * 66.66);
        grid2Ref.current.style.transform = `translateX(${translateX}%)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const handleItemIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.getAttribute('data-id') || '0');
          setVisibleItems(prev => [...new Set([...prev, id])]);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleItemIntersect, observerOptions);

    if (grid1Ref.current && grid2Ref.current) {
      // Observe each portfolio item in both grids
      const items1 = grid1Ref.current.querySelectorAll('.portfolio-item');
      const items2 = grid2Ref.current.querySelectorAll('.portfolio-item');
      
      items1.forEach(item => observer.observe(item));
      items2.forEach(item => observer.observe(item));
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const renderPortfolioItem = (item: PortfolioItem) => (
    <div 
      key={item.id} 
      className={`portfolio-item ${visibleItems.includes(item.id) ? 'visible' : ''}`}
      data-id={item.id}
    >
      <div className="portfolio-image-container">
        <img
          src={item.image}
          alt={item.title}
          className="portfolio-image"
          loading="lazy"
        />
        <div className="portfolio-overlay">
          <h3>{item.title}</h3>
          <div className="view-project">
            <span>View Project</span>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M7 17l5-5-5-5v10z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="portfolio-section" id="portfolio" ref={sectionRef}>
      <h2 className="section-title">Portfolio</h2>
      <div className="portfolio-container">
        <div className="portfolio-grid left-to-right" ref={grid1Ref}>
          {portfolioItems.map(renderPortfolioItem)}
        </div>
        <div className="portfolio-grid right-to-left" ref={grid2Ref}>
          {portfolioItems2.map(renderPortfolioItem)}
        </div>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((image, index) => (
          <div key={index} className={`gallery-item item-${index + 1}`}>
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio; 