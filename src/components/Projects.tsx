import React, { useEffect, useRef, useState } from 'react';
import '../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  images: {
    main: string;
    side1: string;
    side2: string;
  };
}

const Projects: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isTransitioningRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const scrollThresholdRef = useRef(0);
  const lastScrollDirectionRef = useRef<'up' | 'down' | null>(null);
  const lastScrollTimeRef = useRef(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Project 1',
      images: {
        main: '/src/assets/projects/1.1.png',
        side1: '/src/assets/projects/1.2.png',
        side2: '/src/assets/projects/1.3.png'
      }
    },
    {
      id: 2,
      title: 'Project 2',
      images: {
        main: '/src/assets/projects/2.1.png',
        side1: '/src/assets/projects/2.2.png',
        side2: '/src/assets/projects/2.3.png'
      }
    },
    {
      id: 3,
      title: 'Project 3',
      images: {
        main: '/src/assets/projects/3.1.png',
        side1: '/src/assets/projects/3.2.png',
        side2: '/src/assets/projects/3.3.png'
      }
    }
  ];

  const transitionToCard = (index: number) => {
    if (isTransitioningRef.current) return;
    
    isTransitioningRef.current = true;
    setActiveCard(index);
    setScrollProgress(index / (projects.length - 1));
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1000); // Match this with your CSS transition duration
  };

  const handleScroll = (e: WheelEvent) => {
    if (isLocked) {
      e.preventDefault();
      
      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTimeRef.current;
      
      // Ignore rapid scroll events (less than 300ms apart)
      if (timeSinceLastScroll < 300) return;
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      
      // Reset threshold if direction changed
      if (direction !== lastScrollDirectionRef.current) {
        scrollThresholdRef.current = 0;
        lastScrollDirectionRef.current = direction;
      }
      
      // Accumulate scroll amount
      scrollThresholdRef.current += Math.abs(e.deltaY);
      
      // Only change card if threshold is met
      if (scrollThresholdRef.current > 100) {
        if (direction === 'down' && activeCard < projects.length - 1) {
          transitionToCard(activeCard + 1);
        } else if (direction === 'up' && activeCard > 0) {
          transitionToCard(activeCard - 1);
        }
        
        // Reset threshold and update last scroll time
        scrollThresholdRef.current = 0;
        lastScrollTimeRef.current = now;
      }
    }
  };

  useEffect(() => {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLocked(true);
            document.body.style.overflow = 'hidden';
          } else {
            setIsLocked(false);
            document.body.style.overflow = '';
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(projectsSection);

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', handleScroll);
      document.body.style.overflow = '';
    };
  }, [activeCard]);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-content">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card ${index === activeCard ? 'active' : ''} ${
                index < activeCard ? 'previous' : index > activeCard ? 'next' : ''
              }`}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <button className="view-project-btn">View Project</button>
              </div>
              <div className="project-images">
                <div className="main-image">
                  <img src={project.images.main} alt={`${project.title} Main`} />
                </div>
                <div className="side-images">
                  <img src={project.images.side1} alt={`${project.title} Side 1`} />
                  <img src={project.images.side2} alt={`${project.title} Side 2`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="scroll-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${scrollProgress * 100}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Projects; 