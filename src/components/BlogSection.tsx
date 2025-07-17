import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Calendar, Clock, ArrowUpRight } from 'lucide-react';

const BlogSection = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const blogPosts = [
    {
      id: 1,
      title: "Building Scalable React Applications with Modern Architecture",
      excerpt: "Exploring best practices for structuring large-scale React applications with proper state management, component architecture, and performance optimization techniques.",
      coverImage: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishDate: "2024-01-15",
      readTime: "8 min read",
      category: "React",
      link: "#"
    },
    {
      id: 2,
      title: "The Future of Web Development: AI Integration and Beyond",
      excerpt: "Discover how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user experiences and predictive analytics.",
      coverImage: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishDate: "2024-01-08",
      readTime: "12 min read",
      category: "AI & Tech",
      link: "#"
    },
    {
      id: 3,
      title: "Optimizing Performance in Modern JavaScript Applications",
      excerpt: "Deep dive into performance optimization techniques including code splitting, lazy loading, and advanced bundling strategies for faster web applications.",
      coverImage: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishDate: "2024-01-01",
      readTime: "10 min read",
      category: "Performance",
      link: "#"
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
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'React': 'from-blue-400 to-blue-600',
      'AI & Tech': 'from-purple-400 to-purple-600',
      'Performance': 'from-green-400 to-green-600',
    };
    return colors[category] || 'from-cyan-400 to-cyan-600';
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
          Latest Blog Posts
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Sharing insights on modern web development, software engineering best practices, 
            and the latest trends in technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="glass rounded-2xl overflow-hidden border border-cyan-400/20 group"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02, 
                borderColor: 'rgba(6, 182, 212, 0.4)',
                boxShadow: '0 20px 60px rgba(6, 182, 212, 0.2)'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Cover image */}
              <div className="relative overflow-hidden h-48">
                <motion.img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>

                {/* Read more icon */}
                <motion.div
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.publishDate)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <motion.a
                  href={post.link}
                  className="inline-flex items-center gap-2 text-cyan-400 font-medium text-sm hover:text-cyan-300 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <BookOpen className="w-4 h-4" />
                  Read Article
                  <ArrowUpRight className="w-3 h-3" />
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all posts button */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpen className="w-5 h-5" />
            View All Posts
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Newsletter signup */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl border border-cyan-400/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-3">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to get notified about new blog posts and tech insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogSection;