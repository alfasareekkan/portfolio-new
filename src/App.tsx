import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CareerSection from './components/CareerSection';
import ProjectsSection from './components/ProjectsSection';
import BlogSection from './components/BlogSection';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  const sections = [
    { id: 'home', component: HeroSection },
    { id: 'about', component: AboutSection },
    { id: 'career', component: CareerSection },
    { id: 'projects', component: ProjectsSection },
    { id: 'blog', component: BlogSection },
  ];

  return (
    <div className="relative bg-gray-900 text-white overflow-x-hidden">
      <CustomCursor />
      
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Main content */}
      <main>
        {sections.map(({ id, component: Component }) => (
          <SectionWrapper
            key={id}
            id={id}
            onInView={() => setActiveSection(id)}
          >
            <Component />
          </SectionWrapper>
        ))}
      </main>

      <Navigation activeSection={activeSection} />
    </div>
  );
}

function SectionWrapper({ id, children, onInView }: { 
  id: string; 
  children: React.ReactNode; 
  onInView: () => void; 
}) {
  const { ref, inView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <section
      ref={ref}
      id={id}
      className="min-h-screen flex items-center justify-center px-4 py-8"
    >
      {children}
    </section>
  );
}

export default App;