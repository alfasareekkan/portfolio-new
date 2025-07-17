import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    window.addEventListener('mousemove', handleMouseMove);
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 hidden lg:block">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      {/* Trailing circle */}
      <motion.div
        className={`absolute border-2 border-cyan-400/50 rounded-full transition-all duration-300 ${
          isHovering ? 'w-12 h-12 border-cyan-400' : 'w-8 h-8'
        }`}
        style={{
          left: mousePosition.x - (isHovering ? 24 : 16),
          top: mousePosition.y - (isHovering ? 24 : 16),
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      />
    </div>
  );
};

export default CustomCursor;