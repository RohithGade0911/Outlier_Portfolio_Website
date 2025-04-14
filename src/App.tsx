import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Partners from './components/Partners';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import ClientReviews from './components/ClientReviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="partners">
          <Partners />
        </section>
        <section id="portfolio">
          <Portfolio />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="testimonials">
          <ClientReviews />
        </section>
        <section id="contact">
          <Contact />
        </section>
        <Footer />
      </main>
    </div>
  );
}

export default App; 