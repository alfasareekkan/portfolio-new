import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Heart, Zap, Target } from 'lucide-react';

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS',
    'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'GraphQL', 'Next.js'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const photoVariants = {
    hidden: { x: 50, opacity: 0, scale: 0.8 },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* Left column - Content */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div>
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Passionate software engineer with a love for creating innovative digital solutions. 
                I thrive on transforming complex problems into elegant, user-friendly applications 
                that make a real difference in people's lives.
              </p>
              <p>
                With expertise spanning full-stack development, cloud architecture, and modern 
                frameworks, I bring ideas to life through clean code and thoughtful design. 
                My journey in technology is driven by curiosity and a commitment to continuous learning.
              </p>
            </motion.div>
          </div>

          {/* Philosophy icons */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {[
              { icon: Brain, text: "Continuous Learning" },
              { icon: Heart, text: "Passionate Development" },
              { icon: Zap, text: "Performance Focus" },
              { icon: Target, text: "Goal Oriented" }
            ].map(({ icon: Icon, text }, index) => (
              <motion.div
                key={index}
                className="glass p-4 rounded-lg flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="w-6 h-6 text-cyan-400" />
                <span className="text-sm font-medium">{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column - Photo and Skills */}
        <motion.div variants={photoVariants} className="space-y-8">
          {/* Profile photo placeholder */}
          <motion.div
            className="relative mx-auto w-64 h-64 rounded-2xl glass overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center">
              <div className="text-6xl">👨‍💻</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
          </motion.div>

          {/* Skills section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-4 text-center text-cyan-400">Core Technologies</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="glass px-4 py-2 rounded-full text-sm font-medium border border-cyan-400/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ 
                    scale: 1.1, 
                    borderColor: 'rgba(6, 182, 212, 0.6)',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;