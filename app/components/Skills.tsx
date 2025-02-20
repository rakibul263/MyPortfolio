'use client';

import { FaCode, FaLaptopCode, FaTools, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: FaCode,
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    title: 'Web Development',
    icon: FaLaptopCode,
    skills: ['HTML', 'CSS', 'JavaScript', 'Django'],
  },
  {
    title: 'Tools',
    icon: FaTools,
    skills: ['Microsoft Office', 'PowerPoint', 'Excel'],
  },
  {
    title: 'Soft Skills',
    icon: FaUserFriends,
    skills: ['Team Leadership', 'Problem-Solving', 'Communication'],
  },
];

const Skills = () => {
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

  const progressVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3,
      },
    }),
  };

  return (
    <section id="skills" className="section-padding bg-[#0A192F] overflow-hidden">
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
          Skills & Expertise
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
              className="bg-[#112240] p-6 rounded-lg transform transition-all duration-300 hover:shadow-xl hover:shadow-[#64FFDA]/10 relative overflow-hidden group"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              
              <motion.div 
                className="flex items-center mb-4 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <motion.div
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.2,
                    transition: { duration: 0.6 }
                  }}
                  className="text-[#64FFDA] transform transition-all duration-300"
                >
                  <category.icon className="w-6 h-6 mr-3" />
                </motion.div>
                <h3 className="text-[#CCD6F6] text-xl font-bold group-hover:text-[#64FFDA] transition-colors duration-300">
                  {category.title}
                </h3>
              </motion.div>
              
              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill} 
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.2) + (skillIndex * 0.1) }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-[#8892B0] group-hover:text-[#64FFDA] transition-colors duration-300">
                        {skill}
                      </span>
                    </div>
                    <div className="h-2 bg-[#0A192F] rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#64FFDA] to-[#4CD6B9] rounded-full relative"
                        variants={progressVariants}
                        custom={Math.random() * 30 + 70}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["0%", "200%"],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills; 