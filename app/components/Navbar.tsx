'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      className="fixed w-full bg-[#0A192F]/90 backdrop-blur-sm z-50 py-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-[#64FFDA] font-poppins font-bold text-2xl relative group">
              <span className="relative z-10">Rakibul Hasan</span>
              <motion.span
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#64FFDA] group-hover:w-full transition-all duration-300"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors relative group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#64FFDA] group-hover:w-full transition-all duration-300"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.a
              href="https://www.linkedin.com/ambry/?x-li-ambry-ep=AQKQRdOteEO0-gAAAZUkqc7vT5glmJLl9F2cRUsKWyki2NlGPOoq1PpKdUvCcE1Rs97S77UonbrlDYOEbvmdH6Hv4kHkZqRLNFeYuWnCZPsULhgbvWM3dxlwAvyV-g6oqWvVP2jfH3JjVlD3sDVDHitO3iDqKnyry0pUmJwD59yYGiURk7Z8Cx-f2d2aCDV5nT5bFAuf1NHkaZIzg2KYOtCEpSKP5dpNbTgITDybNFjU3qlrIKYvxy0W4myUx79yO-2eL2ySxdDMFGwbtLzxi9XfdIwqkYMHozPC9Q3oO1_6WfpcQ-hxRgibfg1Pg6i9oY3-a0w37mBbuybQdwB0TSqnPIArdWqDVyV9GW1WJEj1xEklt2odRkowT0_TUTmfXDogccpPVqe1Qwp5McGO5Y06v3EZjhhDTjkuFwuNpcZWMmFoYu-0bJgriQwY2ytA6Qn6h5j2X2G84oEwmfj6iP4SIk5RUTYRCjBHEXR7Jb_bonqooqQnhcks7xeAKkvxSpQBOeNC-nflQSBm7p2BKt_kYGy22DzsgWbE720GkfPCpBc-8gDbjNqyYl_jIuF0_txpu9E&x-ambry-um-filename=Profile.pdf"
              className="relative overflow-hidden group bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Download Resume</span>
              <motion.div
                className="absolute inset-0 bg-[#0A192F] transform origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute inset-0 flex items-center justify-center text-[#64FFDA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Download Resume
              </motion.span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-[#CCD6F6]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 bg-[#0A192F] rounded-lg p-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                  >
                    <Link
                      href={item.href}
                      className="text-[#CCD6F6] hover:text-[#64FFDA] transition-colors block"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.a
                  href="https://www.linkedin.com/ambry/?x-li-ambry-ep=AQKQRdOteEO0-gAAAZUkqc7vT5glmJLl9F2cRUsKWyki2NlGPOoq1PpKdUvCcE1Rs97S77UonbrlDYOEbvmdH6Hv4kHkZqRLNFeYuWnCZPsULhgbvWM3dxlwAvyV-g6oqWvVP2jfH3JjVlD3sDVDHitO3iDqKnyry0pUmJwD59yYGiURk7Z8Cx-f2d2aCDV5nT5bFAuf1NHkaZIzg2KYOtCEpSKP5dpNbTgITDybNFjU3qlrIKYvxy0W4myUx79yO-2eL2ySxdDMFGwbtLzxi9XfdIwqkYMHozPC9Q3oO1_6WfpcQ-hxRgibfg1Pg6i9oY3-a0w37mBbuybQdwB0TSqnPIArdWqDVyV9GW1WJEj1xEklt2odRkowT0_TUTmfXDogccpPVqe1Qwp5McGO5Y06v3EZjhhDTjkuFwuNpcZWMmFoYu-0bJgriQwY2ytA6Qn6h5j2X2G84oEwmfj6iP4SIk5RUTYRCjBHEXR7Jb_bonqooqQnhcks7xeAKkvxSpQBOeNC-nflQSBm7p2BKt_kYGy22DzsgWbE720GkfPCpBc-8gDbjNqyYl_jIuF0_txpu9E&x-ambry-um-filename=Profile.pdf"
                  className="bg-[#64FFDA] text-[#0A192F] px-4 py-2 rounded text-center hover:bg-[#64FFDA]/90 transition-all duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
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