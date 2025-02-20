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
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F] via-[#0A192F] to-[#112240] z-0">
        <div className="absolute inset-0 opacity-10 bg-grid-pattern animate-grid"></div>
      </div>
      
      {/* Content */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-4xl">
          <motion.h1 
            className="text-[#64FFDA] font-poppins text-lg mb-4 tracking-wider"
            variants={itemVariants}
          >
            <span className="inline-block animate-wave">👋</span> Hi, I'm
          </motion.h1>
          
          <motion.h2 
            className="text-[#CCD6F6] font-poppins font-bold text-5xl sm:text-6xl md:text-7xl mb-4 leading-tight"
            variants={itemVariants}
          >
            <span className="inline-block hover:text-[#64FFDA] transition-colors duration-300">
              Rakibul Hasan
            </span>
          </motion.h2>
          
          <motion.h3 
            className="text-[#8892B0] font-poppins font-bold text-3xl sm:text-4xl md:text-5xl mb-6 leading-relaxed"
            variants={itemVariants}
          >
            <span className="typing-text">Computer Science Student | Programmer | Educator</span>
          </motion.h3>
          
          <motion.p 
            className="text-[#8892B0] text-lg md:text-xl max-w-2xl mb-8 leading-relaxed"
            variants={itemVariants}
          >
            A passionate Computer Science student with expertise in programming, web development, and teaching. 
            I aim to create innovative solutions and inspire others through technology.
          </motion.p>

          {/* Social Links */}
          <motion.div 
            className="flex space-x-6"
            variants={itemVariants}
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors transform hover:scale-110"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div 
            className="mt-8"
            variants={itemVariants}
          >
            <Link
              href="#projects"
              className="group relative inline-block px-8 py-4 font-medium text-[#0A192F] transition-all duration-500"
            >
              <span className="absolute inset-0 bg-[#64FFDA] rounded transform -skew-x-12 group-hover:skew-x-12 transition-transform duration-500"></span>
              <span className="relative inline-block transform group-hover:scale-110 transition-transform duration-500">
                View My Work
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
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