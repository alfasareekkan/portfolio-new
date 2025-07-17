import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Star, GitFork, ExternalLink, Calendar } from 'lucide-react';

const GitHubSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState(0);

  // Mock data for demonstration
  const mockRepos = [
    {
      id: 1,
      name: "awesome-react-portfolio",
      description: "A modern, responsive portfolio website built with React and Framer Motion",
      language: "TypeScript",
      stargazers_count: 124,
      forks_count: 32,
      updated_at: "2024-01-15T10:30:00Z",
      html_url: "#",
      topics: ["react", "typescript", "portfolio", "framer-motion"]
    },
    {
      id: 2,
      name: "task-management-api",
      description: "RESTful API for task management with authentication and real-time updates",
      language: "JavaScript",
      stargazers_count: 89,
      forks_count: 21,
      updated_at: "2024-01-12T14:20:00Z",
      html_url: "#",
      topics: ["nodejs", "express", "mongodb", "websocket"]
    },
    {
      id: 3,
      name: "ai-chat-bot",
      description: "Intelligent chatbot with natural language processing capabilities",
      language: "Python",
      stargazers_count: 156,
      forks_count: 43,
      updated_at: "2024-01-10T09:15:00Z",
      html_url: "#",
      topics: ["python", "ai", "nlp", "chatbot"]
    },
    {
      id: 4,
      name: "data-visualization-dashboard",
      description: "Interactive dashboard for data visualization with D3.js and React",
      language: "JavaScript",
      stargazers_count: 67,
      forks_count: 18,
      updated_at: "2024-01-08T16:45:00Z",
      html_url: "#",
      topics: ["react", "d3js", "dashboard", "visualization"]
    }
  ];

  useEffect(() => {
    // In a real application, you would fetch from GitHub API
    // For demo purposes, we'll use mock data
    setRepos(mockRepos);
    setContributions(347);
  }, []);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Python: '#3572a5',
      Java: '#b07219',
      React: '#61dafb',
    };
    return colors[language] || '#6b7280';
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
          GitHub Showcase
        </motion.h2>

        {/* GitHub stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="glass p-6 rounded-2xl text-center border border-cyan-400/20">
            <Github className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{repos.length}</div>
            <div className="text-gray-400">Public Repositories</div>
          </div>
          
          <div className="glass p-6 rounded-2xl text-center border border-cyan-400/20">
            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
            </div>
            <div className="text-gray-400">Total Stars</div>
          </div>
          
          <div className="glass p-6 rounded-2xl text-center border border-cyan-400/20">
            <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{contributions}</div>
            <div className="text-gray-400">Contributions</div>
          </div>
        </motion.div>

        {/* Pinned repositories */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">Featured Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                className="glass p-6 rounded-2xl border border-cyan-400/20 group"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: 'rgba(6, 182, 212, 0.4)',
                  boxShadow: '0 10px 40px rgba(6, 182, 212, 0.2)'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {repo.name}
                    </h4>
                  </div>
                  <motion.a
                    href={repo.html_url}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400 hover:text-cyan-400" />
                  </motion.a>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </div>
                  </div>
                  <div>
                    Updated {formatDate(repo.updated_at)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contribution graph simulation */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-cyan-400 mb-8 text-center">Contribution Activity</h3>
          <div className="glass p-6 rounded-2xl border border-cyan-400/20">
            <div className="grid grid-cols-53 gap-1 overflow-x-auto">
              {Array.from({ length: 365 }, (_, i) => {
                const intensity = Math.floor(Math.random() * 5);
                const colors = [
                  'bg-gray-800',
                  'bg-green-900/50',
                  'bg-green-700/70',
                  'bg-green-500/80',
                  'bg-green-400'
                ];
                return (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${colors[intensity]}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ delay: (i * 0.002), duration: 0.3 }}
                    whileHover={{ scale: 1.2 }}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((level) => {
                  const colors = [
                    'bg-gray-800',
                    'bg-green-900/50',
                    'bg-green-700/70',
                    'bg-green-500/80',
                    'bg-green-400'
                  ];
                  return (
                    <div key={level} className={`w-3 h-3 rounded-sm ${colors[level]}`} />
                  );
                })}
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GitHubSection;