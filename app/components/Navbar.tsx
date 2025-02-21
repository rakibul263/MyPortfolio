'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Online Judges', href: '#online-judges' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const navVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.2
      }
    }
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      className={`fixed w-full backdrop-blur-md z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#0A192F]/95 shadow-lg' 
          : 'py-5 bg-[#0A192F]/80'
      }`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link href="/" className="font-poppins font-bold text-2xl relative group flex items-center">
              <span className="relative z-10 flex items-center">
                <span className="text-[#64FFDA] mr-[2px]">Raki</span>
                <span className="text-[#CCD6F6]">bul</span>
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#64FFDA] to-[#CCD6F6] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  initial={false}
                />
              </span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="relative px-4"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 relative group py-2 text-sm font-medium"
                >
                  <span className="relative z-10">
                    {item.label}
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-[#64FFDA] origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1SPOUTxffLU6nBy6_Es7WLHQdwrWSNMK8/view?usp=sharing"
              className="relative overflow-hidden group px-6 py-3 rounded-md bg-gradient-to-r from-[#64FFDA] to-[#4CD6B9] text-[#0A192F] font-bold transition-all duration-500 ml-4 transform hover:scale-105 hover:shadow-xl hover:shadow-[#64FFDA]/20"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform duration-300">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Resume</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="relative w-6 h-5">
              <span className={`absolute left-0 w-full h-[2px] bg-[#64FFDA] transform transition-all duration-300 ${isMenuOpen ? 'top-2 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 w-full h-[2px] bg-[#64FFDA] top-2 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 w-full h-[2px] bg-[#64FFDA] transform transition-all duration-300 ${isMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`} />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-[#112240] rounded-lg p-4 shadow-xl border border-[#233554]"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div className="flex flex-col space-y-3">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="group"
                  >
                    <Link
                      href={item.href}
                      className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors block py-2 px-4 rounded-md hover:bg-[#64FFDA]/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="https://drive.google.com/file/d/1SPOUTxffLU6nBy6_Es7WLHQdwrWSNMK8/view?usp=sharing"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#64FFDA] to-[#4CD6B9] text-[#0A192F] font-bold px-6 py-3 rounded-md transition-all duration-500 mt-2 transform hover:scale-105 hover:shadow-xl hover:shadow-[#64FFDA]/20 relative overflow-hidden group"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Resume</span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 