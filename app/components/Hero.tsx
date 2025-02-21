'use client';

import Link from 'next/link';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  const socialLinks = [
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/in/rakibul263',
      label: 'LinkedIn'
    },
    {
      icon: FaGithub,
      href: 'https://github.com/rakibul263',
      label: 'GitHub'
    },
    {
      icon: FaFacebook,
      href: 'https://facebook.com/rakibul263',
      label: 'Facebook'
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/rakibul263',
      label: 'Instagram'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-[#0A192F] relative overflow-hidden">
      {/* Background gradient with animated pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#0A192F] z-0">
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjNjRGRkRBIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] animate-float"></div>
      </div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-[#64FFDA] font-mono text-lg mb-4 tracking-wider flex items-center gap-3"
            variants={itemVariants}
          >
            <span className="inline-block animate-wave">👋</span>
            <span className="typing-cursor">Hi, I'm</span>
          </motion.div>
          
          <motion.h2 
            className="text-[#CCD6F6] font-poppins font-bold text-5xl sm:text-6xl md:text-7xl mb-4 leading-tight bg-clip-text"
            variants={itemVariants}
          >
            <span className="inline-block hover:text-[#64FFDA] transition-all duration-500 cursor-pointer transform hover:translate-x-2">
              Rakibul Hasan
            </span>
          </motion.h2>
          
          <motion.h3 
            className="text-[#8892B0] font-poppins font-bold text-3xl sm:text-4xl md:text-5xl mb-8 leading-relaxed"
            variants={itemVariants}
          >
            <span className="gradient-text">CSE Student | Problem Solver | Full-Stack Developer</span>
          </motion.h3>
          
          <motion.p 
            className="text-[#8892B0] text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light"
            variants={itemVariants}
          >
            A passionate Computer Science student with expertise in programming, web development, and teaching. 
            I craft elegant solutions and inspire others through innovative technology.
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex space-x-6 mb-12"
            variants={itemVariants}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCD6F6] hover:text-[#64FFDA] transition-all duration-300 transform hover:scale-110 relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#64FFDA]">
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex gap-6 items-center"
            variants={itemVariants}
          >
            <Link
              href="#projects"
              className="group relative inline-flex items-center gap-2 px-8 py-4 font-medium transition-all duration-500 overflow-hidden rounded-md"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] to-[#4CD6B9] transition-all duration-500"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#4CD6B9] to-[#64FFDA] opacity-0 group-hover:opacity-100 transition-all duration-500"></span>
              <span className="relative z-10 text-[#0A192F] font-bold group-hover:text-[#0A192F] transition-all duration-500 flex items-center">
                View My Work
                <motion.svg 
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
              <span className="absolute inset-0 transform scale-0 group-hover:scale-100 transition-transform duration-500 bg-gradient-to-r from-[#64FFDA]/20 to-transparent blur-xl"></span>
            </Link>
            
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 font-medium text-[#64FFDA] transition-all duration-500 border border-[#64FFDA] rounded hover:bg-gradient-to-r hover:from-[#64FFDA]/10 hover:to-[#4CD6B9]/10 hover:border-[#4CD6B9] hover:text-[#4CD6B9] hover:shadow-lg hover:shadow-[#64FFDA]/10"
            >
              <span className="relative inline-block transform group-hover:translate-x-1 transition-transform duration-500">
                Contact Me
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[#64FFDA] text-sm font-mono">Scroll Down</span>
        <svg
          className="w-6 h-6 text-[#64FFDA]"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero; 