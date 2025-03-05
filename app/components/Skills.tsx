'use client';

import { FaCode, FaLaptopCode, FaTools, FaServer, FaBrain, FaLaptop, FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaNode, FaDatabase, FaGitAlt, FaGithub, FaMicrosoft, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';
import { SiTailwindcss, SiBootstrap, SiDjango, SiMysql, SiSqlite, SiCplusplus, SiC, SiVisualstudiocode, SiCanva, SiCisco, SiIntellijidea, SiNotion, SiArduino } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useState } from 'react';

const skillCategories = [
  {
    title: 'Frontend Development',
    category: 'frontend',
    icon: FaLaptopCode,
    description: 'Building responsive and interactive user interfaces',
    skills: [
      { name: 'HTML', level: 95, color: '#E34F26', icon: FaHtml5 },
      { name: 'CSS', level: 90, color: '#1572B6', icon: FaCss3Alt },
      { name: 'Tailwind CSS', level: 88, color: '#38B2AC', icon: SiTailwindcss },
      { name: 'Bootstrap', level: 85, color: '#7952B3', icon: SiBootstrap },
      { name: 'JavaScript', level: 90, color: '#F7DF1E', icon: FaJs },
      { name: 'React.js', level: 85, color: '#61DAFB', icon: FaReact },
      { name: 'JavaFX', level: 80, color: '#E76F00', icon: FaJava },
    ]
  },
  {
    title: 'Backend Development',
    category: 'backend',
    icon: FaServer,
    description: 'Building server-side applications and APIs',
    skills: [
      { name: 'Node.js', level: 80, color: '#339933', icon: FaNode },
      { name: 'Django', level: 75, color: '#092E20', icon: SiDjango },
      { name: 'Python', level: 85, color: '#3776AB', icon: FaPython },
      { name: 'MySQL', level: 82, color: '#4479A1', icon: SiMysql },
      { name: 'SQLite', level: 80, color: '#003B53', icon: SiSqlite },
    ]
  },
  {
    title: 'Programming Languages',
    category: 'languages',
    icon: FaCode,
    description: 'Languages used for programming',
    skills: [
      { name: 'C', level: 85, color: '#555555', icon: SiC },
      { name: 'C++', level: 88, color: '#F34B7D', icon: SiCplusplus },
      { name: 'Java', level: 82, color: '#007396', icon: FaJava },
      { name: 'Python', level: 85, color: '#3776AB', icon: FaPython },
      { name: 'JavaScript', level: 90, color: '#F7DF1E', icon: FaJs },
    ]
  },
  {
    title: 'Computer Science',
    category: 'cs',
    icon: FaBrain,
    description: 'Fundamentals of computer science',
    skills: [
      { name: 'Data Structures', level: 90, color: '#214252', icon: FaDatabase },
      { name: 'Algorithms', level: 85, color: '#214252', icon: FaCode },
      { name: 'Cisco Networking', level: 75, color: '#214252', icon: SiCisco },
    ]
  },
  {
    title: 'Development Tools',
    category: 'dev-tools',
    icon: FaTools,
    description: 'Tools used for development',
    skills: [
      { name: 'VS Code', level: 90, color: '#007ACC', icon: SiVisualstudiocode },
      { name: 'IntelliJ IDEA', level: 85, color: '#FE315D', icon: SiIntellijidea },
      { name: 'Git', level: 88, color: '#F05032', icon: FaGitAlt },
      { name: 'GitHub', level: 85, color: '#181717', icon: FaGithub },
      { name: 'MySQL Workbench', level: 82, color: '#4479A1', icon: SiMysql },
      { name: 'Arduino', level: 75, color: '#00979D', icon: SiArduino },
    ]
  },
  {
    title: 'Professional Tools',
    category: 'tools',
    icon: FaLaptop,
    description: 'Tools used in professional environments',
    skills: [
      { name: 'MS Office', level: 92, color: '#F15A24', icon: FaMicrosoft },
      { name: 'PowerPoint', level: 90, color: '#C43A2B', icon: FaFilePowerpoint },
      { name: 'Excel', level: 88, color: '#217346', icon: FaFileExcel },
      { name: 'Canva', level: 85, color: '#0055FF', icon: SiCanva },
      { name: 'Notion', level: 88, color: '#000000', icon: SiNotion },
    ]
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

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

  const categories = ['all', 'frontend', 'backend', 'languages', 'cs', 'dev-tools', 'tools'];

  const filteredCategories = selectedCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.category === selectedCategory);

  return (
    <section id="skills" className="section-padding bg-[#0A192F] overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2 
            className="text-4xl font-bold text-[#CCD6F6] mb-4"
            variants={itemVariants}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p
            className="text-[#8892B0] text-lg"
            variants={itemVariants}
          >
            A comprehensive overview of my technical skills and proficiency levels
          </motion.p>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full capitalize transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-[#64FFDA] text-[#0A192F] font-medium shadow-lg shadow-[#64FFDA]/20'
                  : 'bg-[#112240] text-[#8892B0] hover:text-[#64FFDA] hover:bg-[#233554]'
              }`}
            >
              {category === 'cs' ? (
                <>
                  <FaBrain className="text-lg" />
                  <span>Computer Science</span>
                </>
              ) : (
                <>
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </>
              )}
            </motion.button>
          ))}
        </div>

        <div className="space-y-16">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-8">
                <category.icon className="text-[#64FFDA] text-3xl" />
                <div>
                  <h3 className="text-2xl font-semibold text-[#CCD6F6]">
                    {category.title}
                  </h3>
                  <p className="text-[#8892B0] mt-1">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    className="bg-[#112240] p-6 rounded-lg shadow-lg hover:shadow-[#64FFDA]/10 
                              transform transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <skill.icon className="text-2xl" style={{ color: skill.color }} />
                      <h4 className="text-xl font-semibold text-[#CCD6F6]">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="w-full bg-[#233554] rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        style={{ backgroundColor: skill.color }}
                        className="h-2.5 rounded-full relative"
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
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
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-sm text-[#8892B0]">
                        {skill.level}%
                      </span>
                      {hoveredSkill === skill.name && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[#64FFDA] text-sm"
                        >
                          {getSkillLevel(skill.level)}
                        </motion.span>
                      )}
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

// Helper functions
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'frontend':
      return <FaLaptopCode className="text-lg" />;
    case 'backend':
      return <FaServer className="text-lg" />;
    case 'languages':
      return <FaCode className="text-lg" />;
    case 'dev-tools':
      return <FaTools className="text-lg" />;
    case 'tools':
      return <FaLaptop className="text-lg" />;
    default:
      return null;
  }
};

const getSkillLevel = (level: number): string => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Intermediate';
  return 'Beginner';
};

export default Skills; 
