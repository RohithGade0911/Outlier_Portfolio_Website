import React, { useEffect, useRef } from 'react';
import '../styles/Services.css';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

const services: ServiceItem[] = [
  {
    id: "01",
    title: "BRAND IDENTITY",
    description: "Design of custom logos, typography, and brand visuals tailored to specific client goals, perfect for startups, rebrands, and campaigns."
  },
  {
    id: "02",
    title: "MARKETING DESIGN",
    description: "Design of custom logos, typography, and brand visuals tailored to specific client goals, perfect for startups, rebrands, and campaigns."
  },
  {
    id: "03",
    title: "WEB & APP DESIGN",
    description: "Design of custom logos, typography, and brand visuals tailored to specific client goals, perfect for startups, rebrands, and campaigns."
  },
  {
    id: "04",
    title: "SOCIAL MEDIA GRAPHICS",
    description: "Design of custom logos, typography, and brand visuals tailored to specific client goals, perfect for startups, rebrands, and campaigns."
  }
];


const Services: React.FC = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const serviceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const animationTriggered = useRef<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!servicesRef.current || animationTriggered.current) return;
      
      const servicesSection = servicesRef.current;
      const sectionTop = servicesSection.offsetTop;
      const sectionHeight = servicesSection.offsetHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if the section is in view
      if (scrollPosition + windowHeight * 0.8 > sectionTop && 
          scrollPosition < sectionTop + sectionHeight) {
        
        animationTriggered.current = true;
        
        // Animate the title first
        if (titleRef.current) {
          titleRef.current.classList.add('visible');
        }
        
        // Animate each service item sequentially after a delay
        setTimeout(() => {
          serviceItemsRef.current.forEach((item, index) => {
            if (item) {
              const delay = index * 300; // 300ms delay between each item
              setTimeout(() => {
                item.classList.add('visible');
              }, delay);
            }
          });
        }, 500); // Start service items animation 500ms after title
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the section is already in view
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="services-section" ref={servicesRef}>
      <div className="services-container">
        <h2 className="services-title" ref={titleRef}>SERVICES</h2>
        <div className="services-list">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="service-item"
              ref={el => serviceItemsRef.current[index] = el}
            >
              <div className="service-number">{service.id}</div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 