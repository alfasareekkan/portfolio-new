import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectsSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
      image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "TypeScript", "Socket.io", "PostgreSQL", "Redis"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "A comprehensive analytics dashboard with interactive charts, real-time data visualization, and customizable reporting features.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["Next.js", "D3.js", "Python", "FastAPI", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "AI Chat Application",
      description: "An intelligent chat application powered by AI with natural language processing, context awareness, and multi-language support.",
      image: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Python", "OpenAI API", "WebSocket", "Docker"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

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

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
        >
          Featured Projects
        </motion.h2>

        {/* 3D Carousel */}
        <div className="relative h-96 md:h-[500px] perspective-1000">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject}
                className="absolute w-full max-w-4xl"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Project image */}
                  <motion.div
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden rounded-2xl glass border border-cyan-400/20">
                      <img
                        src={projects[currentProject].image}
                        alt={projects[currentProject].title}
                        className="w-full h-64 lg:h-80 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <div className="flex gap-4">
                          <motion.a
                            href={projects[currentProject].liveUrl}
                            className="glass px-4 py-2 rounded-full text-cyan-400 border border-cyan-400/30 flex items-center gap-2"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                          >
                            <Play className="w-4 h-4" />
                            Live Demo
                          </motion.a>
                          <motion.a
                            href={projects[currentProject].githubUrl}
                            className="glass px-4 py-2 rounded-full text-cyan-400 border border-cyan-400/30 flex items-center gap-2"
                            whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Project details */}
                  <motion.div
                    className="space-y-6"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2">
                        {projects[currentProject].title}
                      </h3>
                      {projects[currentProject].featured && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-cyan-400 bg-cyan-400/20 rounded-full border border-cyan-400/30">
                          Featured Project
                        </span>
                      )}
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed">
                      {projects[currentProject].description}
                    </p>

                    <div>
                      <h4 className="text-lg font-semibold text-cyan-400 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[currentProject].technologies.map((tech, index) => (
                          <motion.span
                            key={tech}
                            className="glass px-3 py-1 rounded-full text-sm border border-cyan-400/20"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={projects[currentProject].liveUrl}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </motion.a>
                      <motion.a
                        href={projects[currentProject].githubUrl}
                        className="flex items-center gap-2 px-6 py-3 glass border border-cyan-400/30 rounded-full text-cyan-400"
                        whileHover={{ scale: 1.05, y: -2, borderColor: 'rgba(6, 182, 212, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <motion.button
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-400/30 z-10"
              whileHover={{ scale: 1.1, borderColor: 'rgba(6, 182, 212, 0.6)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-400/30 z-10"
              whileHover={{ scale: 1.1, borderColor: 'rgba(6, 182, 212, 0.6)' }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Project indicators */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-3 mt-8"
        >
          {projects.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProject 
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectsSection;