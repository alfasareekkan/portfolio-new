import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, BookOpen } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'career', icon: Briefcase, label: 'Career' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
    { id: 'blog', icon: BookOpen, label: 'Blog' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className="fixed bottom-4 sm:bottom-8 left-0 right-0 z-50 flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="glass px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-cyan-400/30 backdrop-blur-md w-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeSection === id;
            
            return (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative p-3 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-cyan-400 bg-cyan-400/20' 
                    : 'text-gray-400 hover:text-cyan-300 hover:bg-cyan-400/10'
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Tooltip */}
                <div className="hidden sm:block">
                  <motion.div
                    className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="glass px-2 py-1 rounded text-xs text-white whitespace-nowrap border border-cyan-400/30">
                      {label}
                    </div>
                    <div className="w-2 h-2 bg-gray-800 border-r border-b border-cyan-400/30 transform rotate-45 mx-auto -mt-1"></div>
                  </motion.div>
                </div>

                {/* Mobile label */}
                <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className={`text-xs transition-opacity duration-200 ${
                    isActive ? 'opacity-100 text-cyan-400' : 'opacity-0'
                  }`}>
                    {label}
                  </div>
                </div>

                {/* Glow effect for active item */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/20 blur-lg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.2, opacity: 1 }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;