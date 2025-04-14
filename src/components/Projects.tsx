import React, { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/Projects.css';
// Import project images
import project1Main from '../assets/projects/1.1.png';
import project1Side1 from '../assets/projects/1.2.png';
import project1Side2 from '../assets/projects/1.3.png';
import project2Main from '../assets/projects/2.1.png';
import project2Side1 from '../assets/projects/2.2.png';
import project2Side2 from '../assets/projects/2.3.png';
import project3Main from '../assets/projects/3.1.png';
import project3Side1 from '../assets/projects/3.2.jpg';
import project3Side2 from '../assets/projects/3.3.jpg';

interface Project {
  id: number;
  client: string;
  mainImage: string;
  sideImages: string[];
  projectUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    client: "Execution - Drama",
    mainImage: project1Main,
    sideImages: [project1Side1, project1Side2],
    projectUrl: "#project-skyline"
  },
  {
    id: 2,
    client: "On Top",
    mainImage: project2Main,
    sideImages: [project2Side1, project2Side2],
    projectUrl: "#project-pixelforge"
  },
  {
    id: 3,
    client: "Everyone's Favourite",
    mainImage: project3Main,
    sideImages: [project3Side1, project3Side2],
    projectUrl: "#project-metaform"
  }
];

// Throttle function to limit how often a function can be called
const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): T => {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  } as T;
};

const Projects: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const scrollThresholdRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);
  const scrollDirectionRef = useRef<'up' | 'down'>('down');
  const scrollVelocityRef = useRef(0);
  const lastScrollTimestampRef = useRef(0);

  // Function to handle card transitions with a buffer threshold
  const transitionToCard = useCallback((newActiveCard: number) => {
    if (isTransitioningRef.current) return;
    
    // Add a larger buffer threshold to prevent rapid changes
    const buffer = 0.2; // 20% buffer
    const currentProgress = activeCard / (projects.length - 1);
    const newProgress = newActiveCard / (projects.length - 1);
    
    // Only transition if we've moved beyond the buffer threshold
    if (Math.abs(newProgress - currentProgress) < buffer && 
        Math.abs(newActiveCard - activeCard) === 1) {
      return;
    }
    
    isTransitioningRef.current = true;
    setActiveCard(newActiveCard);
    
    // Update scroll progress
    const progress = (newActiveCard / (projects.length - 1)) * 100;
    setScrollProgress(progress);
    
    // Reset transition lock after animation completes
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 600); // Reduced from 800ms to 600ms for faster transitions
  }, [activeCard]);

  // Calculate which card should be active based on scroll position
  const calculateActiveCard = useCallback(() => {
    if (!sectionRef.current || !wrapperRef.current) return;
    
    const section = sectionRef.current;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollPosition = window.scrollY;
    
    // Check if we're in the projects section
    const isInProjectsSection = scrollPosition >= sectionTop && 
                               scrollPosition < sectionTop + sectionHeight - viewportHeight;
    
    if (isInProjectsSection) {
      // Calculate which card should be active based on scroll position
      const sectionProgress = Math.max(0, Math.min(1, 
        (scrollPosition - sectionTop) / (sectionHeight - viewportHeight)
      ));
      
      // Calculate scroll velocity (pixels per millisecond)
      const now = Date.now();
      const timeDelta = now - lastScrollTimestampRef.current;
      const scrollDelta = scrollPosition - lastScrollYRef.current;
      
      if (timeDelta > 0) {
        scrollVelocityRef.current = Math.abs(scrollDelta) / timeDelta;
      }
      
      // Determine scroll direction
      if (scrollDelta > 0) {
        scrollDirectionRef.current = 'down';
      } else if (scrollDelta < 0) {
        scrollDirectionRef.current = 'up';
      }
      
      // Adjust threshold based on scroll velocity
      // For fast scrolling, reduce the threshold to make it more responsive
      const baseThreshold = 50; // Increased from 30 to 80 pixels
      const velocityFactor = Math.min(1, 1 / (scrollVelocityRef.current * 8)); // Reduced from 10 to 8
      const adjustedThreshold = baseThreshold * velocityFactor;
      
      // Only change cards if we've scrolled enough
      if (Math.abs(scrollDelta) < adjustedThreshold) {
        return;
      }
      
      // Calculate new active card based on scroll position and direction
      let newActiveCard;
      
      if (scrollDirectionRef.current === 'down') {
        // When scrolling down, move to next card
        newActiveCard = Math.min(activeCard + 1, projects.length - 1);
      } else {
        // When scrolling up, move to previous card
        newActiveCard = Math.max(activeCard - 1, 0);
      }
      
      // For very fast scrolling, we can skip cards
      if (scrollVelocityRef.current > 0.5) { // Increased from 0.5 to 0.8
        // Calculate how many cards to skip based on velocity
        const skipCount = Math.min(
          Math.floor(scrollVelocityRef.current * 1.5), // Reduced from 2 to 1.5
          projects.length - 1
        );
        
        if (scrollDirectionRef.current === 'down') {
          newActiveCard = Math.min(activeCard + skipCount, projects.length - 1);
        } else {
          newActiveCard = Math.max(activeCard - skipCount, 0);
        }
      }
      
      if (newActiveCard !== activeCard) {
        transitionToCard(newActiveCard);
      }
      
      // Update scroll progress for the progress bar
      setScrollProgress(sectionProgress * 100);
      lastScrollYRef.current = scrollPosition;
      lastScrollTimestampRef.current = now;
    }
  }, [activeCard, transitionToCard]);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    // Cancel any pending animation frame
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    
    // Schedule a new animation frame
    rafIdRef.current = requestAnimationFrame(() => {
      calculateActiveCard();
    });
  }, [calculateActiveCard]);

  // Throttled version of the scroll handler
  const throttledHandleScroll = useCallback(
    throttle(() => {
      handleScroll();
    }, 50), // Reduced throttle time to 50ms for better responsiveness
    [handleScroll]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [throttledHandleScroll, handleScroll]);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <h2 className="projects-title">PROJECTS</h2>
      
      <div className="projects-wrapper" ref={wrapperRef}>
        <div className="projects-container" ref={containerRef}>
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`project-card ${index === activeCard ? 'active' : index === activeCard + 1 ? 'next' : index === activeCard - 1 ? 'previous' : ''}`}
            >
              <div className="project-header">
                <div className="project-info">
                  <span className="project-number">Project {project.id}</span>
                  <h3 className="project-client">{project.client}</h3>
                </div>
                <a href={project.projectUrl} className="live-project-button">View Project</a>
              </div>
              
              <div className="project-images-container">
                <div className="project-main-image">
                  <img src={project.mainImage} alt={`${project.client} main`} />
                </div>
                <div className="project-side-images">
                  <div className="project-side-image">
                    <img src={project.sideImages[0]} alt={`${project.client} side 1`} />
                  </div>
                  <div className="project-side-image">
                    <img src={project.sideImages[1]} alt={`${project.client} side 2`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      

    </section>
  );
};

export default Projects; 