import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const CareerSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [selectedCareer, setSelectedCareer] = useState<number | null>(null);

  const careerData = [
    {
      id: 1,
      company: "TechCorp Solutions",
      role: "Senior Software Engineer",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading full-stack development of enterprise applications, mentoring junior developers, and architecting scalable cloud solutions.",
      achievements: [
        "Improved application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      id: 2,
      company: "InnovateLab",
      role: "Software Engineer",
      duration: "2020 - 2022",
      location: "Austin, TX",
      description: "Developed modern web applications using React and Node.js, collaborated with cross-functional teams to deliver high-quality products.",
      achievements: [
        "Built 3 major customer-facing applications",
        "Reduced bug reports by 60%",
        "Introduced automated testing practices"
      ]
    },
    {
      id: 3,
      company: "StartupXYZ",
      role: "Junior Developer",
      duration: "2019 - 2020",
      location: "Remote",
      description: "Started career building responsive web interfaces and learning best practices in software development.",
      achievements: [
        "Delivered first major project on time",
        "Learned 5 new technologies",
        "Contributed to open-source projects"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={nodeVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Career Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline SVG */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
            <svg width="4" height="100%" className="overflow-visible">
              <motion.path
                d="M 2 0 L 2 100%"
                stroke="url(#gradient)"
                strokeWidth="4"
                fill="none"
                variants={pathVariants}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Career nodes */}
          <div className="space-y-24">
            {careerData.map((career, index) => (
              <motion.div
                key={career.id}
                variants={nodeVariants}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Timeline node */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-900 z-10 cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
                />

                {/* Career card */}
                <motion.div
                  className={`glass p-6 rounded-lg w-full max-w-md cursor-pointer border border-cyan-400/20 ${
                    index % 2 === 0 ? 'mr-auto pr-12' : 'ml-auto pl-12'
                  }`}
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: 'rgba(6, 182, 212, 0.4)',
                    boxShadow: '0 10px 40px rgba(6, 182, 212, 0.2)'
                  }}
                  onClick={() => setSelectedCareer(selectedCareer === career.id ? null : career.id)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Briefcase className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{career.role}</h3>
                      <p className="text-cyan-400 font-medium">{career.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {career.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {career.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">{career.description}</p>
                  
                  <motion.div
                    className="mt-3 text-cyan-400 text-sm flex items-center gap-1"
                    whileHover={{ x: 5 }}
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal for career details */}
        <AnimatePresence>
          {selectedCareer && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCareer(null)}
            >
              <motion.div
                className="glass p-8 rounded-2xl max-w-2xl w-full border border-cyan-400/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {careerData
                  .filter(career => career.id === selectedCareer)
                  .map(career => (
                    <div key={career.id}>
                      <div className="flex items-start gap-3 mb-6">
                        <Briefcase className="w-8 h-8 text-cyan-400 mt-1" />
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-1">{career.role}</h3>
                          <p className="text-cyan-400 text-lg font-medium">{career.company}</p>
                          <div className="flex items-center gap-4 text-gray-400 mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {career.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {career.location}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 leading-relaxed">{career.description}</p>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {career.achievements.map((achievement, index) => (
                            <motion.li
                              key={index}
                              className="flex items-center gap-2 text-gray-300"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CareerSection;