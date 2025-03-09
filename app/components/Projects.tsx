'use client';

import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaTimes, FaExpand, FaLaptopCode, FaServer, FaDatabase, FaMobile, FaCube, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  views: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  repoName: string;
  image: string;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
}

const projects: Project[] = [
  {
    title: 'Portfolio',
    description: 'A web application for Personal Portfolio',
    technologies: ['TypeScript', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/MyPortfolio',
    demo: 'https://rakibulhasanshuvo.netlify.app/',
    repoName: 'Portfolio',
    image: '/images/projects/portfolio.png',
    category: 'fullstack'
  },
  {
    title: 'DevBoard',
    description: 'A web application for devBoard',
    technologies: ['HTML', 'Tailwind', 'DaisyUi', 'JavaScript'],
    github: 'https://github.com/rakibul263/Dev-Board',
    demo: 'https://dev-board-01.netlify.app/',
    repoName: 'dev-board',
    image: '/images/projects/devBoard.png',
    category: 'frontend'
  },
  {
    title: 'Payoo Mobile Bank',
    description: 'A web application for Payoo.',
    technologies: ['HTML', 'Tailwind', 'DaisyUi', 'JavaScript'],
    github: 'https://github.com/rakibul263/Payoo-Mobile-Bank',
    demo: 'https://rakibul263.github.io/Payoo-Mobile-Bank/',
    repoName: 'Payoo-Mobile-Bank',
    image: '/images/projects/payoo.png',
    category: 'frontend'
  },
  {
    title: 'Meal Explorer',
    description: 'A web application for exploring meal recipes.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Meal-Explorer',
    demo: 'https://rakibul263.github.io/Meal-Explorer/',
    repoName: 'Meal-Explorer',
    image: '/images/projects/meal-explorer.png',
    category: 'frontend'
  },
  {
    title: 'Nature Platter',
    description: 'A nature-themed website design.',
    technologies: ['HTML', 'CSS', 'Tailwind CSS'],
    github: 'https://github.com/rakibul263/Nature-Platter',
    demo: 'https://rakibul263.github.io/Nature-Platter/',
    repoName: 'Nature-Platter',
    image: '/images/projects/nature-platter.png',
    category: 'frontend'
  },
  {
    title: 'Biker Zone',
    description: 'A website for bike enthusiasts.',
    technologies: ['HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/rakibul263/Biker-Zone',
    demo: 'https://rakibul263.github.io/Biker-Zone/',
    repoName: 'Biker-Zone',
    image: '/images/projects/biker-zone.png',
    category: 'frontend'
  },
  {
    title: 'Tea House',
    description: 'A tea shop website design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Tea-House',
    demo: 'https://rakibul263.github.io/Tea-House/',
    repoName: 'Tea-House',
    image: '/images/projects/tea-house.png',
    category: 'frontend'
  },
  {
    title: 'Penguin Fashion',
    description: 'A fashion website built using Tailwind CSS.',
    technologies: ['HTML', 'Tailwind CSS'],
    github: 'https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind',
    demo: 'https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind/',
    repoName: 'Penguin-Fashion-Using-Tailwind',
    image: '/images/projects/penguin-fashion.png',
    category: 'frontend'
  },
  {
    title: 'Kids School',
    description: 'A school website design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Kids-School',
    demo: 'https://rakibul263.github.io/Kids-School/',
    repoName: 'Kids-School',
    image: '/images/projects/kids-school.png',
    category: 'frontend'
  },
  {
    title: 'Architects Horizon',
    description: 'A website for architects.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Architects-Horizon',
    demo: 'https://rakibul263.github.io/Architects-Horizon/',
    repoName: 'Architects-Horizon',
    image: '/images/projects/architects-horizon.png',
    category: 'frontend'
  },
  {
    title: 'Bangladesh 2.0',
    description: "A website showcasing Bangladesh's culture and heritage.",
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/BANGLADESH-2.0',
    demo: 'https://rakibul263.github.io/BANGLADESH-2.0/',
    repoName: 'BANGLADESH-2.0',
    image: '/images/projects/bangladesh.png',
    category: 'frontend'
  },
  {
    title: 'New Year Offer Portfolio',
    description: 'A New Year-themed portfolio website.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/New-Year-Offer-Portfolio',
    demo: 'https://rakibul263.github.io/New-Year-Offer-Portfolio/',
    repoName: 'New-Year-Offer-Portfolio',
    image: '/images/projects/new-year-portfolio.png',
    category: 'frontend'
  },
  {
    title: 'Spotify Clone',
    description: 'A clone of the Spotify web player.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Spotify-Clone',
    demo: 'https://rakibul263.github.io/Spotify-Clone/',
    repoName: 'Spotify-Clone',
    image: '/images/projects/spotify-clone.png',
    category: 'frontend'
  },
  {
    title: 'Word Cloud',
    description: 'A word cloud generator.',
    technologies: ['Python', 'Django'],
    github: 'https://github.com/rakibul263/Word-Cloud',
    demo: 'https://github.com/rakibul263/Word-Cloud/blob/main/Screenshot.png',
    repoName: 'Word-Cloud',
    image: '/images/projects/word-cloud.png',
    category: 'backend'
  },
  {
    title: 'Daffodil Bank',
    description: 'A banking system simulation.',
    technologies: ['Python', 'Django'],
    github: 'https://github.com/rakibul263/Daffodil-Bank',
    demo: null,
    repoName: 'Daffodil-Bank',
    image: '/images/projects/daffodil-bank.png',
    category: 'backend'
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [repoStats, setRepoStats] = useState<Record<string, RepoStats>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Projects', icon: FaCode },
    { id: 'frontend', name: 'Frontend', icon: FaLaptopCode },
    { id: 'backend', name: 'Backend', icon: FaServer },
    { id: 'fullstack', name: 'Full Stack', icon: FaDatabase },
    { id: 'mobile', name: 'Mobile', icon: FaMobile },
    { id: 'other', name: 'Other', icon: FaCube }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  useEffect(() => {
    const fetchStats = async () => {
      const stats: Record<string, RepoStats> = {};
      for (const project of projects) {
        try {
          const response = await fetch(`/api/github-stats?repo=${project.repoName}`);
          const data = await response.json();
          stats[project.repoName] = data;
        } catch (error) {
          console.error(`Error fetching stats for ${project.repoName}:`, error);
          stats[project.repoName] = { stars: 0, forks: 0, watchers: 0, views: 0 };
        }
      }
      setRepoStats(stats);
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="section-padding bg-[#0A192F] py-20 overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2 
            className="text-4xl font-bold text-[#CCD6F6] mb-4 inline-block relative"
            variants={itemVariants}
          >
            Featured Projects
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-[#64FFDA]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h2>
          <p className="text-[#8892B0] text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#64FFDA] text-[#0A192F] shadow-lg shadow-[#64FFDA]/20'
                  : 'bg-[#112240] text-[#8892B0] hover:text-[#64FFDA] hover:bg-[#233554]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <motion.span
                  className="ml-2 bg-[#0A192F] text-[#64FFDA] px-2 py-1 rounded-full text-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {filteredProjects.length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="bg-[#112240] rounded-xl overflow-hidden group transform transition-all duration-300 hover:shadow-2xl hover:shadow-[#64FFDA]/10 border border-[#233554] hover:border-[#64FFDA]/50"
            >
              <div className="p-6 h-full flex flex-col relative">
                {/* Project Image with Preview */}
                <motion.div 
                  className="relative w-full h-48 mb-4 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e: any) => {
                      e.target.src = '/images/projects/project-placeholder.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaExpand className="text-[#64FFDA] w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300" />
                  </div>
                </motion.div>

                {/* Project Title and Stats */}
                <div className="flex flex-col mb-4">
                  <motion.h3 
                    className="text-[#CCD6F6] text-xl font-bold mb-2 group-hover:text-[#64FFDA] transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  {/* GitHub Stats */}
                  <div className="flex items-center space-x-4 mb-3">
                    <motion.div 
                      className="flex items-center space-x-1 text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaStar className="text-yellow-400 w-4 h-4" />
                      <span className="text-sm">
                        {repoStats[project.repoName]?.stars || 0}
                      </span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center space-x-1 text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaCodeBranch className="text-[#64FFDA] w-4 h-4" />
                      <span className="text-sm">
                        {repoStats[project.repoName]?.forks || 0}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Project Description */}
                <motion.p 
                  className="text-[#8892B0] mb-6 relative z-10 group-hover:text-[#A8B2D1] transition-colors duration-300 flex-grow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {project.description}
                </motion.p>
                
                {/* Technologies */}
                <motion.div 
                  className="flex flex-wrap gap-2 mb-6 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#233554] text-[#64FFDA] px-3 py-1 rounded-full text-sm font-mono hover:bg-[#64FFDA]/10 transition-all duration-300 transform hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
                {/* Project Links */}
                <motion.div 
                  className="flex items-center space-x-4 relative z-10 mt-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#64FFDA] text-[#0A192F] py-2 px-4 rounded-md font-medium text-center hover:bg-[#4CD6B9] transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                      <span>Live Preview</span>
                    </motion.a>
                  )}
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#233554] text-[#CCD6F6] hover:text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View on GitHub"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                </motion.div>

                {/* Category Badge */}
                <motion.span
                  className="absolute top-4 right-4 bg-[#233554] text-[#64FFDA] px-3 py-1 rounded-full text-sm font-mono"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.category}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#8892B0] text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/90 backdrop-blur-sm"
              onClick={() => {
                if (!isZoomed) setSelectedProject(null);
                setIsZoomed(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full bg-[#112240] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                     onClick={() => setIsZoomed(!isZoomed)}>
                  <div className={`relative transition-all duration-300 ease-in-out ${
                    isZoomed ? 'h-[80vh]' : 'aspect-video'
                  }`}>
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className={`object-contain transition-all duration-300 ${
                        isZoomed ? 'scale-110' : 'scale-100'
                      }`}
                      quality={100}
                      onError={(e: any) => {
                        e.target.src = '/images/projects/project-placeholder.png';
                      }}
                    />
                  </div>
                </div>

                {/* Project Info Overlay */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#112240] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-[#CCD6F6] mb-2">{selectedProject.title}</h3>
                  <p className="text-[#8892B0] mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#233554] text-[#64FFDA] px-3 py-1 rounded-full text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {selectedProject.demo && (
                      <motion.a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#64FFDA] text-[#0A192F] py-2 px-4 rounded-md font-medium text-center hover:bg-[#4CD6B9] transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Visit Live Site
                      </motion.a>
                    )}
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-[#64FFDA] text-[#64FFDA] py-2 px-4 rounded-md font-medium text-center hover:bg-[#64FFDA]/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Source Code
                    </motion.a>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 text-[#64FFDA] p-2 rounded-full bg-[#233554] hover:bg-[#64FFDA]/20 transition-colors duration-300"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsZoomed(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects; 
