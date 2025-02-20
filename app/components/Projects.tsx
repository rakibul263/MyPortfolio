'use client';

import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    title: 'Meal Explorer',
    description: 'A web application for exploring meal recipes.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Meal-Explorer',
    demo: 'https://rakibul263.github.io/Meal-Explorer/',
  },
  {
    title: 'Nature Platter',
    description: 'A nature-themed website design.',
    technologies: ['HTML', 'CSS', 'Tailwind CSS'],
    github: 'https://github.com/rakibul263/Nature-Platter',
    demo: 'https://rakibul263.github.io/Nature-Platter/',
  },
  {
    title: 'Biker Zone',
    description: 'A website for bike enthusiasts.',
    technologies: ['HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/rakibul263/Biker-Zone',
    demo: 'https://rakibul263.github.io/Biker-Zone/',
  },
  {
    title: 'Tea House',
    description: 'A tea shop website design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Tea-House',
    demo: 'https://rakibul263.github.io/Tea-House/',
  },
  {
    title: 'Penguin Fashion',
    description: 'A fashion website built using Tailwind CSS.',
    technologies: ['HTML', 'Tailwind CSS'],
    github: 'https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind',
    demo: 'https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind',
  },
  {
    title: 'Kids School',
    description: 'A school website design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Kids-School',
    demo: 'https://rakibul263.github.io/Kids-School/',
  },
  {
    title: 'Architects Horizon',
    description: 'A website for architects.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Architects-Horizon',
    demo: 'https://rakibul263.github.io/Architects-Horizon/',
  },
  {
    title: 'Bangladesh 2.0',
    description: "A website showcasing Bangladesh's culture and heritage.",
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/BANGLADESH-2.0',
    demo: 'https://rakibul263.github.io/BANGLADESH-2.0/',
  },
  {
    title: 'New Year Offer Portfolio',
    description: 'A New Year-themed portfolio website.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/New-Year-Offer-Portfolio',
    demo: 'https://rakibul263.github.io/New-Year-Offer-Portfolio/',
  },
  {
    title: 'Spotify Clone',
    description: 'A clone of the Spotify web player.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/rakibul263/Spotify-Clone',
    demo: 'https://rakibul263.github.io/Spotify-Clone/',
  },
  {
    title: 'Word Cloud',
    description: 'A word cloud generator.',
    technologies: ['Python', 'Django'],
    github: 'https://github.com/rakibul263/Word-Cloud',
    demo: 'https://github.com/rakibul263/Word-Cloud/blob/main/Screenshot.png',
  },
  {
    title: 'Daffodil Bank',
    description: 'A banking system simulation.',
    technologies: ['Python', 'Django'],
    github: 'https://github.com/rakibul263/Daffodil-Bank',
    demo: null,
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
    <section id="projects" className="section-padding bg-[#0A192F] overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-4xl font-bold text-[#CCD6F6] mb-12 text-center sm:text-left"
          variants={itemVariants}
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="bg-[#112240] rounded-lg overflow-hidden group transform transition-all duration-300 hover:shadow-xl hover:shadow-[#64FFDA]/10"
            >
              <div className="p-6 relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                  animate={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                
                <motion.h3 
                  className="text-[#CCD6F6] text-xl font-bold mb-2 group-hover:text-[#64FFDA] transition-colors duration-300 relative z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-[#8892B0] mb-4 relative z-10 group-hover:text-[#A8B2D1] transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {project.description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-[#0A192F] text-[#64FFDA] px-3 py-1 rounded-full text-sm hover:bg-[#64FFDA]/10 transition-all duration-300 transform hover:scale-105"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="flex space-x-4 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#CCD6F6] hover:text-[#64FFDA] transition-all duration-300"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="w-6 h-6" />
                  </motion.a>
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#CCD6F6] hover:text-[#64FFDA] transition-all duration-300"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects; 