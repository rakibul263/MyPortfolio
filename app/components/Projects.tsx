"use client";

import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCodeBranch,
  FaTimes,
  FaExpand,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaMobile,
  FaCube,
  FaCode,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface RepoStats {
  stars: number;
  forks: number;
  watchers: number;
  views: number;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string | null;
  repoName: string;
  image: string;
  category: "frontend" | "backend" | "fullstack" | "mobile" | "other";
}

const projects: Project[] = [
  {
    title: "Roomie",
    description: "The roommate finder app",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "MongoDB",
    ],
    github: "https://github.com/rakibul263/Roomie",
    demo: "roomie-finder-bd.web.app/",
    repoName: "Roomie",
    image: "/images/projects/Roomie.png",
    category: "fullstack",
  },
  {
    title: "Obys Agency Clone",
    description: "Smooth animation website",
    technologies: ["GSAP", "TypeScript", "JavaScript", "TailwindCSS"],
    github: "https://github.com/rakibul263/obys-agency-clone",
    demo: "https://obys-agency-clone-by-empty-stack.netlify.app/",
    repoName: "Obys",
    image: "/images/projects/Obys.png",
    category: "frontend",
  },
  {
    title: "AppHub",
    description: "AppStore Clone For Auth",
    technologies: [
      "React",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "Firebase",
    ],
    github: "https://github.com/rakibul263/Roomie",
    demo: "https://app-store-79dbb.web.app/",
    repoName: "AppHub",
    image: "/images/projects/AppHub.png",
    category: "backend",
  },
  {
    title: "Portfolio",
    description: "A web application for Personal Portfolio",
    technologies: ["TypeScript", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/MyPortfolio",
    demo: "https://rakibulhasanshuvo.netlify.app/",
    repoName: "Portfolio",
    image: "/images/projects/portfolio.png",
    category: "fullstack",
  },
  {
    title: "DevBoard",
    description: "A web application for devBoard",
    technologies: ["HTML", "Tailwind", "DaisyUi", "JavaScript"],
    github: "https://github.com/rakibul263/Dev-Board",
    demo: "https://dev-board-01.netlify.app/",
    repoName: "dev-board",
    image: "/images/projects/devBoard.png",
    category: "frontend",
  },
  {
    title: "PH Tube",
    description: "A web application for PH TUBE",
    technologies: ["HTML", "Tailwind", "DaisyUi", "JavaScript"],
    github: "https://github.com/rakibul263/PH-TUBE",
    demo: "https://rakibul263.github.io/PH-TUBE/",
    repoName: "PH-TUBE",
    image: "/images/projects/ph-tube.png",
    category: "backend",
  },
  {
    title: "English Janala",
    description: "A web application for English-Janala",
    technologies: ["HTML", "Tailwind", "DaisyUi", "JavaScript"],
    github: "https://github.com/rakibul263/English-Janala",
    demo: "https://rakibul263.github.io/English-Janala/",
    repoName: "English-Janala",
    image: "/images/projects/english-janala.png",
    category: "backend",
  },
  {
    title: "Payoo Mobile Bank",
    description: "A web application for Payoo.",
    technologies: ["HTML", "Tailwind", "DaisyUi", "JavaScript"],
    github: "https://github.com/rakibul263/Payoo-Mobile-Bank",
    demo: "https://rakibul263.github.io/Payoo-Mobile-Bank/",
    repoName: "Payoo-Mobile-Bank",
    image: "/images/projects/payoo.png",
    category: "frontend",
  },
  {
    title: "Meal Explorer",
    description: "A web application for exploring meal recipes.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/Meal-Explorer",
    demo: "https://rakibul263.github.io/Meal-Explorer/",
    repoName: "Meal-Explorer",
    image: "/images/projects/meal-explorer.png",
    category: "frontend",
  },
  {
    title: "Nature Platter",
    description: "A nature-themed website design.",
    technologies: ["HTML", "CSS", "Tailwind CSS"],
    github: "https://github.com/rakibul263/Nature-Platter",
    demo: "https://rakibul263.github.io/Nature-Platter/",
    repoName: "Nature-Platter",
    image: "/images/projects/nature-platter.png",
    category: "frontend",
  },
  {
    title: "Biker Zone",
    description: "A website for bike enthusiasts.",
    technologies: ["HTML", "CSS", "Bootstrap"],
    github: "https://github.com/rakibul263/Biker-Zone",
    demo: "https://rakibul263.github.io/Biker-Zone/",
    repoName: "Biker-Zone",
    image: "/images/projects/biker-zone.png",
    category: "frontend",
  },
  {
    title: "Tea House",
    description: "A tea shop website design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/Tea-House",
    demo: "https://rakibul263.github.io/Tea-House/",
    repoName: "Tea-House",
    image: "/images/projects/tea-house.png",
    category: "frontend",
  },
  {
    title: "Penguin Fashion",
    description: "A fashion website built using Tailwind CSS.",
    technologies: ["HTML", "Tailwind CSS"],
    github: "https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind",
    demo: "https://github.com/rakibul263/Penguin-Fashion-Using-Tailwind/",
    repoName: "Penguin-Fashion-Using-Tailwind",
    image: "/images/projects/penguin-fashion.png",
    category: "frontend",
  },
  {
    title: "Kids School",
    description: "A school website design.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/Kids-School",
    demo: "https://rakibul263.github.io/Kids-School/",
    repoName: "Kids-School",
    image: "/images/projects/kids-school.png",
    category: "frontend",
  },
  {
    title: "Architects Horizon",
    description: "A website for architects.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/Architects-Horizon",
    demo: "https://rakibul263.github.io/Architects-Horizon/",
    repoName: "Architects-Horizon",
    image: "/images/projects/architects-horizon.png",
    category: "frontend",
  },
  {
    title: "Bangladesh 2.0",
    description: "A website showcasing Bangladesh's culture and heritage.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/BANGLADESH-2.0",
    demo: "https://rakibul263.github.io/BANGLADESH-2.0/",
    repoName: "BANGLADESH-2.0",
    image: "/images/projects/bangladesh.png",
    category: "frontend",
  },
  {
    title: "New Year Offer Portfolio",
    description: "A New Year-themed portfolio website.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/New-Year-Offer-Portfolio",
    demo: "https://rakibul263.github.io/New-Year-Offer-Portfolio/",
    repoName: "New-Year-Offer-Portfolio",
    image: "/images/projects/new-year-portfolio.png",
    category: "frontend",
  },
  {
    title: "Spotify Clone",
    description: "A clone of the Spotify web player.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/rakibul263/Spotify-Clone",
    demo: "https://rakibul263.github.io/Spotify-Clone/",
    repoName: "Spotify-Clone",
    image: "/images/projects/spotify-clone.png",
    category: "frontend",
  },
  {
    title: "Word Cloud",
    description: "A word cloud generator.",
    technologies: ["Python", "Django"],
    github: "https://github.com/rakibul263/Word-Cloud",
    demo: "https://github.com/rakibul263/Word-Cloud/blob/main/Screenshot.png",
    repoName: "Word-Cloud",
    image: "/images/projects/word-cloud.png",
    category: "backend",
  },
  {
    title: "Daffodil Bank",
    description: "A banking system simulation.",
    technologies: ["Python", "Django"],
    github: "https://github.com/rakibul263/Daffodil-Bank",
    demo: null,
    repoName: "Daffodil-Bank",
    image: "/images/projects/daffodil-bank.png",
    category: "backend",
  },
];

const Projects = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [repoStats, setRepoStats] = useState<Record<string, RepoStats>>({});
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Projects", icon: FaCode },
    { id: "frontend", name: "Frontend", icon: FaLaptopCode },
    { id: "backend", name: "Backend", icon: FaServer },
    { id: "fullstack", name: "Full Stack", icon: FaDatabase },
    { id: "mobile", name: "Mobile", icon: FaMobile },
    { id: "other", name: "Other", icon: FaCube },
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const fetchStats = async () => {
      const stats: Record<string, RepoStats> = {};
      for (const project of projects) {
        try {
          const response = await fetch(
            `/api/github-stats?repo=${project.repoName}`
          );
          const data = await response.json();
          stats[project.repoName] = data;
        } catch (error) {
          console.error(`Error fetching stats for ${project.repoName}:`, error);
          stats[project.repoName] = {
            stars: 0,
            forks: 0,
            watchers: 0,
            views: 0,
          };
        }
      }
      setRepoStats(stats);
    };

    fetchStats();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section
      id="projects"
      className="section-padding bg-[#0A192F] py-20 overflow-hidden relative"
    >
      {/* Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-[#64FFDA]/5 rounded-full blur-3xl -top-48 -right-48 animate-pulse"></div>
        <div className="absolute w-[500px] h-[500px] bg-[#4CD6B9]/5 rounded-full blur-3xl -bottom-48 -left-48 animate-pulse delay-1000"></div>
        <div className="absolute w-96 h-96 bg-[#64FFDA]/10 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-blob"></div>
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl font-bold text-[#CCD6F6] mb-4 inline-block relative"
            variants={itemVariants}
          >
            Featured Projects
            <motion.span
              className="absolute bottom-0 left-0 w-full h-1 bg-[#64FFDA]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.h2>
          <p className="text-[#8892B0] text-lg max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for
            development
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={itemVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-500 border-2 backdrop-blur-sm ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-[#64FFDA] via-[#4CD6B9] to-[#64FFDA] text-[#0A192F] border-[#64FFDA] shadow-xl shadow-[#64FFDA]/30 transform scale-105"
                  : "bg-[#112240]/80 text-[#8892B0] border-[#233554] hover:text-[#64FFDA] hover:border-[#64FFDA] hover:bg-[#233554]/90 hover:shadow-xl hover:shadow-[#64FFDA]/20"
              } group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#64FFDA]/10 before:via-[#4CD6B9]/10 before:to-[#64FFDA]/10 before:translate-x-[-100%] hover:before:translate-x-0 before:transition before:duration-500 before:ease-out`}
              whileHover={{
                scale: selectedCategory === category.id ? 1.05 : 1.08,
                transition: {
                  duration: 0.3,
                  ease: [0.43, 0.13, 0.23, 0.96],
                },
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <category.icon
                className={`w-6 h-6 transition-all duration-500 relative z-10 ${
                  selectedCategory === category.id
                    ? "rotate-0 scale-110 text-[#0A192F]"
                    : "text-[#64FFDA] group-hover:rotate-12"
                }`}
              />
              <span className="font-semibold tracking-wider relative z-10">
                {category.name}
              </span>
              {selectedCategory === category.id && (
                <motion.span
                  className="ml-2 bg-[#0A192F] text-[#64FFDA] px-4 py-1 rounded-lg text-sm font-bold tracking-wider shadow-inner relative z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    mass: 1,
                  }}
                >
                  {filteredProjects.length}
                </motion.span>
              )}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{
                y: -12,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="bg-[#112240] rounded-2xl overflow-hidden group transform transition-all duration-500 hover:shadow-2xl hover:shadow-[#64FFDA]/20 border-2 border-[#233554] hover:border-[#64FFDA]"
            >
              <div className="p-8 h-full flex flex-col relative backdrop-blur-sm bg-[#112240]/90 group">
                {/* Project Image with Preview */}
                <motion.div
                  className="relative w-full h-56 mb-6 rounded-xl overflow-hidden cursor-pointer transform-gpu shadow-lg"
                  onClick={() => setSelectedProject(project)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={(e: any) => {
                      e.target.src = "/images/projects/project-placeholder.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-[#0A192F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1.2 }}
                      className="bg-[#64FFDA] p-4 rounded-xl shadow-lg"
                    >
                      <FaExpand className="text-[#0A192F] w-8 h-8" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Project Title and Stats */}
                <div className="flex flex-col mb-6">
                  <motion.h3
                    className="text-2xl font-bold mb-3 group-hover:text-[#64FFDA] transition-colors duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* GitHub Stats */}
                  <div className="flex items-center space-x-6 mb-3">
                    <motion.div
                      className="flex items-center space-x-2 text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaStar className="text-yellow-400 w-5 h-5" />
                      <span className="text-sm font-semibold">
                        {repoStats[project.repoName]?.stars || 0}
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-center space-x-2 text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaCodeBranch className="text-[#64FFDA] w-5 h-5" />
                      <span className="text-sm font-semibold">
                        {repoStats[project.repoName]?.forks || 0}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Project Description */}
                <motion.p
                  className="text-[#8892B0] mb-8 relative z-10 group-hover:text-[#A8B2D1] transition-colors duration-300 flex-grow text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {project.description}
                </motion.p>

                {/* Technologies */}
                <motion.div
                  className="flex flex-wrap gap-3 mb-8 relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {project.technologies.map((tech) => (
                    <motion.span
                      key={tech}
                      className="relative overflow-hidden bg-[#233554]/80 text-[#64FFDA] px-4 py-2 rounded-lg text-sm font-mono font-medium hover:bg-[#64FFDA]/10 transition-all duration-300 transform hover:scale-105 shadow-md border border-[#233554] hover:border-[#64FFDA]/50 group backdrop-blur-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA]/5 to-[#4CD6B9]/5 transform transition-transform duration-500 -translate-x-full group-hover:translate-x-0" />
                      <span className="relative z-10">{tech}</span>
                    </motion.span>
                  ))}
                </motion.div>

                {/* Project Links */}
                <motion.div
                  className="flex items-center space-x-6 relative z-10 mt-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 relative overflow-hidden bg-gradient-to-r from-[#64FFDA] via-[#4CD6B9] to-[#64FFDA] text-[#0A192F] py-4 px-8 rounded-xl font-bold text-center transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:shadow-[#64FFDA]/30 flex items-center justify-center space-x-3 border-2 border-transparent hover:border-[#64FFDA] group before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#4CD6B9] before:via-[#64FFDA] before:to-[#4CD6B9] before:translate-x-[-100%] hover:before:translate-x-0 before:transition before:duration-500 before:ease-out isolate"
                      whileHover={{
                        scale: 1.05,
                        transition: {
                          duration: 0.3,
                          ease: [0.43, 0.13, 0.23, 0.96],
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center gap-3 group-hover:text-[#0A192F] transition-colors duration-300">
                        <FaExternalLinkAlt className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        <span className="tracking-wider">Live Preview</span>
                      </span>
                    </motion.a>
                  )}
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden flex items-center justify-center w-16 h-16 rounded-xl bg-[#233554]/80 text-[#CCD6F6] hover:text-[#64FFDA] transition-all duration-500 hover:shadow-xl hover:shadow-[#64FFDA]/20 border-2 border-[#233554] hover:border-[#64FFDA] group backdrop-blur-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#64FFDA]/10 before:via-[#4CD6B9]/10 before:to-[#64FFDA]/10 before:translate-x-[-100%] hover:before:translate-x-0 before:transition before:duration-500 before:ease-out"
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: {
                        duration: 0.5,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      },
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="View on GitHub"
                  >
                    <FaGithub className="w-7 h-7 relative z-10 transition-transform duration-300" />
                  </motion.a>
                </motion.div>

                {/* Category Badge */}
                <motion.span
                  className="absolute top-6 right-6 bg-[#233554] text-[#64FFDA] px-4 py-2 rounded-lg text-sm font-mono font-medium border border-[#64FFDA]/30 shadow-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.category}
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-[#8892B0] text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/90 backdrop-blur-sm"
              onClick={() => {
                if (!isZoomed) setSelectedProject(null);
                setIsZoomed(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full bg-[#112240] rounded-xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image Container */}
                <div
                  className={`relative ${
                    isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                >
                  <div
                    className={`relative transition-all duration-300 ease-in-out ${
                      isZoomed ? "h-[80vh]" : "aspect-video"
                    }`}
                  >
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className={`object-contain transition-all duration-300 ${
                        isZoomed ? "scale-110" : "scale-100"
                      }`}
                      quality={100}
                      onError={(e: any) => {
                        e.target.src =
                          "/images/projects/project-placeholder.png";
                      }}
                    />
                  </div>
                </div>

                {/* Project Info Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#112240] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-[#CCD6F6] mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-[#8892B0] mb-4">
                    {selectedProject.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-[#233554] text-[#64FFDA] px-3 py-1 rounded-full text-sm font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {selectedProject.demo && (
                      <motion.a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#64FFDA] text-[#0A192F] py-2 px-4 rounded-md font-medium text-center hover:bg-[#4CD6B9] transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Visit Live Site
                      </motion.a>
                    )}
                    <motion.a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-[#64FFDA] text-[#64FFDA] py-2 px-4 rounded-md font-medium text-center hover:bg-[#64FFDA]/10 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Source Code
                    </motion.a>
                  </div>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 text-[#64FFDA] p-2 rounded-full bg-[#233554] hover:bg-[#64FFDA]/20 transition-colors duration-300"
                  onClick={() => {
                    setSelectedProject(null);
                    setIsZoomed(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes className="w-6 h-6" />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </section>
  );
};

export default Projects;
