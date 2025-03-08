'use client';

import { useEffect, useState, useCallback } from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram, FaUsers } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://linkedin.com/in/rakibul263',
    label: 'LinkedIn',
  },
  {
    icon: FaGithub,
    href: 'https://github.com/rakibul263',
    label: 'GitHub',
  },
  {
    icon: FaFacebook,
    href: 'https://facebook.com/rakibul263',
    label: 'Facebook',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com/rakibul263',
    label: 'Instagram',
  },
];

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisitorCount = async () => {
      try {
        const response = await fetch('/api/visitor-count');
        const data = await response.json();
        setVisitorCount(data.count);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching visitor count:', error);
        setIsLoading(false);
      }
    };

    fetchVisitorCount();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Generate random number within a range
  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  // Generate particles with different properties
  const generateParticles = useCallback((count: number) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      size: random(2, 6),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5),
      opacity: random(0.3, 0.7)
    }));
  }, []);

  return (
    <footer className="bg-[#0A192F] py-12 relative overflow-hidden">
      {/* Enhanced background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated mesh lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <pattern
            id="mesh-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 20 0 L 20 40 M 0 20 L 40 20"
              stroke="#64FFDA"
              strokeWidth="0.5"
              initial={{ strokeDasharray: 0, strokeDashoffset: 0 }}
              animate={{ strokeDasharray: [0, 20], strokeDashoffset: [-10, 10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'linear',
              }}
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#mesh-pattern)" />
        </svg>

        {/* Enhanced floating particles */}
        {generateParticles(30).map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#64FFDA]"
            style={{
              width: particle.size,
              height: particle.size,
            }}
            initial={{
              x: random(0, typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: random(0, typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0,
            }}
            animate={{
              x: [null, `${random(-100, 100)}%`],
              y: [null, `${random(-100, 100)}%`],
              opacity: [0, particle.opacity, 0],
            }}
            transition={{
              duration: random(15, 30),
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Glowing orbs with blur effect */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(100,255,218,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: ['-25%', '25%', '-25%'],
            y: ['-25%', '25%', '-25%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Animated gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#64FFDA]/50 to-transparent" />
      
      {/* Glass effect container */}
      <motion.div 
        className="container mx-auto px-4 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center space-y-8">
          {/* Visitor Counter with glass effect */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 bg-[#112240]/80 px-6 py-3 rounded-full 
                     border border-[#233554] shadow-lg backdrop-blur-sm
                     hover:shadow-[#64FFDA]/10 hover:bg-[#112240]/90 
                     transition-all duration-300"
          >
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <FaUsers className="text-[#64FFDA] w-5 h-5" />
            </motion.div>
            <div className="flex items-center">
              <span className="text-[#8892B0] mr-2">Visitors:</span>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-16 h-6 bg-[#233554] rounded animate-pulse"
                  />
                ) : (
                  <motion.span
                    key="count"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                    }}
                    className="text-[#64FFDA] font-mono font-bold"
                  >
                    {visitorCount.toLocaleString()}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Links with glass effect */}
          <motion.div 
            variants={itemVariants}
            className="flex space-x-8"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 bg-[#112240]/80 backdrop-blur-sm 
                         rounded-full hover:bg-[#233554]/90 transition-all duration-300
                         hover:shadow-lg hover:shadow-[#64FFDA]/10"
                aria-label={link.label}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 } 
                }}
              >
                <link.icon className="w-6 h-6 text-[#CCD6F6] group-hover:text-[#64FFDA] transition-colors duration-300" />
                <motion.span
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#64FFDA] text-[#0A192F] 
                           text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 pointer-events-none"
                  initial={{ y: -10 }}
                  animate={{ y: 0 }}
                >
                  {link.label}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright section */}
          <motion.div
            variants={itemVariants}
            className="text-center relative z-10"
          >
            <motion.p 
              className="text-[#8892B0]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              © {new Date().getFullYear()} Rakibul Hasan. All rights reserved.
            </motion.p>
            <motion.div
              className="text-[#64FFDA]/60 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 
