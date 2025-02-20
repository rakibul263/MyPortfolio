'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
    <section id="about" className="section-padding bg-[#0A192F] relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern animate-grid opacity-5"></div>
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-4xl font-bold text-[#CCD6F6] mb-12 text-center sm:text-left text-gradient"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.p 
              className="text-[#8892B0] text-lg leading-relaxed hover-underline"
              variants={itemVariants}
            >
              Hello! I'm Rakibul Hasan, a passionate Computer Science student with a deep love for programming and technology. 
              My journey in the world of coding began with a simple "Hello World" program, and since then, 
              I've been on an exciting adventure of learning and creating.
            </motion.p>

            <motion.p 
              className="text-[#8892B0] text-lg leading-relaxed hover-underline"
              variants={itemVariants}
            >
              I specialize in web development and have experience with various programming languages and frameworks. 
              My goal is to create elegant, efficient solutions that make a positive impact on people's lives.
            </motion.p>

            <motion.div 
              className="bg-[#112240] p-6 rounded-lg glow-effect"
              variants={itemVariants}
            >
              <h3 className="text-[#64FFDA] font-semibold mb-4">Quick Facts About Me:</h3>
              <ul className="space-y-3 text-[#8892B0]">
                <motion.li 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-[#64FFDA]">▹</span>
                  <span>Computer Science Student at Daffodil International University</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-[#64FFDA]">▹</span>
                  <span>Passionate about Web Development</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-[#64FFDA]">▹</span>
                  <span>Love to solve programming problems</span>
                </motion.li>
                <motion.li 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-[#64FFDA]">▹</span>
                  <span>Enjoy teaching and sharing knowledge</span>
                </motion.li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Image section */}
          <motion.div 
            className="relative group"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-full max-w-md mx-auto aspect-square rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image
                src="/profile.png"
                alt="Rakibul Hasan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#64FFDA] opacity-20 group-hover:opacity-0 transition-opacity duration-300"></div>
              <div className="absolute inset-0 border-2 border-[#64FFDA] rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 