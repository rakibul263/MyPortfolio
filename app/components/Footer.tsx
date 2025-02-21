'use client';

import { useEffect, useState } from 'react';
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

  return (
    <footer className="bg-[#0A192F] py-8 border-t border-[#64FFDA]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          {/* Visitor Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 bg-[#112240] px-4 py-2 rounded-full border border-[#233554] shadow-lg"
          >
            <FaUsers className="text-[#64FFDA] w-5 h-5" />
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
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-[#64FFDA] font-mono font-bold"
                  >
                    {visitorCount.toLocaleString()}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#CCD6F6] hover:text-[#64FFDA] transition-all duration-300"
                aria-label={link.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p 
            className="text-[#8892B0] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © {new Date().getFullYear()} Rakibul Hasan. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 