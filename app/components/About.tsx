'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaCode, FaGraduationCap, FaPuzzlePiece, FaChalkboardTeacher } from 'react-icons/fa';

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Smooth spring animations for mouse movement
  const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      setMousePosition({ x: moveX * 0.01, y: moveY * 0.01 });
      
      // Update cursor position for glow effect
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (clientX - rect.left) / rect.width;
        const y = (clientY - rect.top) / rect.height;
        setCursorPosition({ x, y });
        mouseX.set(x * 100);
        mouseY.set(y * 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        duration: 1.2,
      },
    },
  };

  const quickFacts = [
    {
      icon: FaGraduationCap,
      text: "Computer Science Student at Daffodil International University",
      color: "#64FFDA"
    },
    {
      icon: FaCode,
      text: "Passionate about Web Development",
      color: "#63B3ED"
    },
    {
      icon: FaPuzzlePiece,
      text: "Love to solve programming problems",
      color: "#F687B3"
    },
    {
      icon: FaChalkboardTeacher,
      text: "Enjoy teaching and sharing knowledge",
      color: "#68D391"
    }
  ];

  const glowStyle = {
    background: useMotionTemplate`
      radial-gradient(
        circle at ${mouseX}% ${mouseY}%,
        rgba(100, 255, 218, 0.15) 0%,
        rgba(100, 255, 218, 0.05) 25%,
        rgba(10, 25, 47, 0) 50%
      )
    `,
  };

  return (
    <section id="about" className="section-padding min-h-screen bg-[#0A192F] relative overflow-hidden scroll-smooth py-20">
      {/* Enhanced animated background grid with parallax */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
        }}
      />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2 
          className="text-6xl font-bold mb-16 text-center sm:text-left"
          variants={itemVariants}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#64FFDA] via-[#63B3ED] to-[#F687B3]">
            About Me
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content with enhanced animations */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.p 
              className="text-[#8892B0] text-xl leading-relaxed prose prose-invert hover:text-[#CCD6F6] transition-colors duration-300"
              variants={itemVariants}
            >
              Hello! I'm <span className="text-[#64FFDA] font-semibold">Rakibul Hasan</span>, a passionate Computer Science student with a deep love for programming and technology. 
              My journey in the world of coding began with a simple "Hello World" program, and since then, 
              I've been on an exciting adventure of learning and creating.
            </motion.p>

            <motion.p 
              className="text-[#8892B0] text-xl leading-relaxed prose prose-invert hover:text-[#CCD6F6] transition-colors duration-300"
              variants={itemVariants}
            >
              I specialize in web development and have experience with various programming languages and frameworks. 
              My goal is to create elegant, efficient solutions that make a positive impact on people's lives.
            </motion.p>

            <motion.div 
              className="bg-[#112240] p-8 rounded-xl shadow-2xl backdrop-blur-lg bg-opacity-80 border border-[#233554] hover:border-[#64FFDA] transition-all duration-500"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3 className="text-[#64FFDA] font-semibold mb-8 text-2xl">Quick Facts About Me:</h3>
              <ul className="space-y-6">
                {quickFacts.map((fact, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center space-x-4 group"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: fact.color + '20' }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <fact.icon className="w-6 h-6" style={{ color: fact.color }} />
                    </motion.div>
                    <span className="text-[#8892B0] group-hover:text-[#CCD6F6] transition-colors duration-300 flex-1">
                      {fact.text}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Enhanced Image section with modern animations */}
          <motion.div 
            className="relative group perspective-1000"
            variants={imageVariants}
            ref={imageRef}
            style={{ 
              y: imageY,
              scale: imageScale,
              rotate: imageRotate,
            }}
          >
            <motion.div 
              className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ 
                scale: 1.05,
                rotateX: mousePosition.y * 0.5,
                rotateY: mousePosition.x * 0.5,
              }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.5
              }}
            >
              {/* Dynamic glow effect */}
              <motion.div 
                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={glowStyle}
              />

              {/* Glassmorphism container */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#64FFDA]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
              
              <Image
                src="/profile.png"
                alt="Rakibul Hasan"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-2xl object-cover transition-all duration-700 
                         scale-[1.01] group-hover:scale-110 
                         filter saturate-[0.85] contrast-[1.1] group-hover:saturate-[1.15]
                         group-hover:contrast-[1.15] group-hover:brightness-110"
              />

              {/* Animated border effect */}
              <motion.div 
                className="absolute inset-0 border-2 border-[#64FFDA]/30 rounded-2xl"
                style={{
                  translateX: mousePosition.x * 2,
                  translateY: mousePosition.y * 2,
                }}
                whileHover={{ borderWidth: "3px", borderColor: "rgba(100, 255, 218, 0.5)" }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              />

              {/* Enhanced shine effect */}
              <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-30"
                initial={false}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#64FFDA]/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                    transition: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "linear",
                    },
                  }}
                />
              </motion.div>

              {/* Multi-layered gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-[#64FFDA]/10 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#64FFDA]/20 via-transparent to-[#0A192F]/30 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-all duration-500 z-20" />
            </motion.div>

            {/* Enhanced background glow */}
            <motion.div 
              className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 -z-10 blur-2xl"
              style={{
                background: `radial-gradient(circle at ${cursorPosition.x * 100}% ${cursorPosition.y * 100}%, rgba(100, 255, 218, 0.15), rgba(100, 255, 218, 0.05), transparent)`,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 
