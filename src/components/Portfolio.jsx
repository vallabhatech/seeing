import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineExternalLink, HiEye } from 'react-icons/hi';
import { FiGithub } from 'react-icons/fi';
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import react_portfolio from "../assets/react-portfolio.png"
import pathgenie from "../assets/pathgenie.png"
import finwise from "../assets/finwise.png"
import portdev from "../assets/portdev.png"
import intellica from "../assets/intellica.png"
import effisense from "../assets/effisense.png"

const projects = [
    {
      img: effisense,
      title: "Effisense",
      description: "Experience the future of productivity with AI-powered task scheduling, smart prioritization, and intelligent workload balancing.",
      technologies: ["React", "Google API", "GROQ", "Appwrite", "TailwindCSS", "Recharts"],
      links: {
        site: "https://effisense.ayush-sharma.in/",
      },
    },
    {
      img: finwise,
      title: "Finwise",
      description: "AI Powered Financial Advisor for personalized financial recommendations.",
      technologies: ["React", "Gemini", "GROQ", "Appwrite", "TailwindCSS", "Grow"],
      links: {
        site: "https://finwise.ayush-sharma.in/",
        github:"https://github.com/glucon-d/finwise",
      },
    },
    {
      img: pathgenie,
      title: "Pathgenie",
      description: "AI powered career guidance platform for personalized career recommendations.",
      technologies: ["React", "Gemini", "Appwrite", "TailwindCSS", "Groq", "Llama 3.3"],
      links: {
        site: "https://pathgenie.ayush-sharma.in/",
        github:"https://github.com/glucon-d/pathgenie",
      },
    },
    {
      img: intellica,
      title: "Intellica",
      description: "AI powered learning platform for personalized learning experience.",
      technologies: ["React", "Gemini", "Appwrite", "TailwindCSS"],
      links: {
        site: "https://intellica.ayush-sharma.in/",
        github:"https://github.com/cyberboyayush/intellica",
      },
    },
    {
      img: portdev,
      title: "PortDev",
      description: "Create Devloper Portfolio in Minutes.",
      technologies: ["React", "Firebase", "TailwindCSS", "Framer Motion"],
      links: {
        site: "https://portdevv.vercel.app/",
        github:"https://github.com/cyberboyayush/portdev",
      },
    },
    {
      img: react_portfolio,
      title: "React Portfolio",
      description: "Personal Portfolio Website using React Js",
      technologies: ["React", "TailwindCSS", "Framer Motion", "Particles.js"],
      links: {
        site: "https://cyberboyayush.in/",
        github: "https://github.com/cyberboyayush/React-Portfolio",
      },
    },
  ]

const ProjectButton = ({ href, icon, label, primary = true }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ 
      scale: 1.05,
      y: -2,
      boxShadow: primary ? "0 15px 30px -5px rgba(147, 51, 234, 0.4)" : "0 10px 20px -5px rgba(30, 30, 60, 0.25)"
    }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
             ${primary 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500' 
                : 'bg-white/10 hover:bg-white/15 border border-purple-500/30'}
             font-medium text-xs sm:text-sm text-white
             shadow-lg ${primary ? 'shadow-purple-900/30' : 'shadow-black/20'}
             hover:shadow-xl ${primary ? 'hover:shadow-purple-600/30' : 'hover:shadow-purple-900/20'}
             backdrop-blur-md z-50
             group transition-all duration-300 ease-out`}
  >
    <span className="text-base sm:text-lg group-hover:scale-110 transition-transform text-white">
      {icon}
    </span>
    <span className="text-white">{label}</span>
  </motion.a>
);

const TechTag = ({ tech }) => (
  <span className="px-2 py-1 text-xs font-medium rounded-md 
                  bg-purple-900/40 text-purple-300 
                  border border-purple-700/30
                  backdrop-blur-sm whitespace-nowrap">
    {tech}
  </span>
);

const ProjectCard = ({ project, index, isHovered, onHover }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleInteraction = () => {
    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  const showOverlay = isTouchDevice ? isActive : isHovered;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isTouchDevice && onHover(index)} 
      onHoverEnd={() => !isTouchDevice && onHover(null)}
      onClick={handleInteraction}
      className={`group relative rounded-3xl overflow-hidden
                 bg-gradient-to-br from-purple-900/30 to-purple-800/20
                 backdrop-blur-sm
                 border border-purple-500/20
                 hover:border-purple-500/50
                 shadow-xl shadow-purple-950/20
                 hover:shadow-2xl hover:shadow-purple-800/20
                 transition-all duration-500
                 ${isTouchDevice ? 'cursor-pointer' : 'cursor-auto'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-30">
        <motion.div 
          animate={{ rotate: showOverlay ? 45 : 0 }}
          className="bg-purple-800/70 rounded-full p-1.5 sm:p-2 backdrop-blur-md border border-purple-600/30"
        >
          <HiOutlineExternalLink className="text-purple-200 text-sm sm:text-lg" />
        </motion.div>
      </div>
      
      <div className="relative h-[350px] sm:h-[380px] overflow-hidden">
        {/* Project Image Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#14003d]/90 to-[#14001f]/90 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMTAwJSIgeDI9IjAlIiB5Mj0iMCUiIGlkPSJncmlkIj48c3RvcCBzdG9wLWNvbG9yPSIjODgzM2ZmIiBzdG9wLW9wYWNpdHk9Ii4wMiIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiM4ODMzZmYiIHN0b3Atb3BhY2l0eT0iLjAyIiBvZmZzc2V0PSIxMDAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" opacity-10></div>
        </div>
        
        <motion.div
          className="w-full h-full flex items-center justify-center p-4 z-10 relative"
          initial={{ scale: 1 }}
          whileHover={!isTouchDevice && { scale: 1.03 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent opacity-30 z-10"></div>
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-contain max-h-[70%] rounded-lg shadow-lg shadow-purple-950/20 z-20"
            loading="lazy"
          />
        </motion.div>
        
        {/* Project Details Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showOverlay ? 1 : 0,
            y: showOverlay ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t 
                     from-[#030014]/95 via-[#030014]/90 to-[#030014]/70
                     flex flex-col justify-end p-5 sm:p-7
                     backdrop-blur-[4px] z-20"
        >
          <div className="max-w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3
                        bg-gradient-to-r from-purple-300 to-pink-300 
                        bg-clip-text text-transparent">
              {project.title}
            </h3>
            <p className="text-gray-300 mb-4 sm:mb-5 text-sm sm:text-base line-clamp-3">
              {project.description}
            </p>
            
            <div className="mb-5 sm:mb-6">
              <p className="text-purple-300 text-xs mb-2 font-medium flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-purple-500 rounded-full"></span>
                BUILT WITH
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 max-w-full">
                {project.technologies.map((tech, i) => (
                  <TechTag key={i} tech={tech} />
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {project.links.site && (
                <ProjectButton 
                  href={project.links.site} 
                  icon={<HiEye />} 
                  label="Live Demo" 
                  primary={true}
                />
              )}
              {project.links.github && (
                <ProjectButton 
                  href={project.links.github} 
                  icon={<FiGithub />} 
                  label="View Code" 
                  primary={false}
                />
              )}
            </div>
          </div>
        </motion.div>

        {/* Project Title Banner (Visible when overlay is hidden) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#030014] via-[#030014]/80 to-transparent z-10"
          initial={{ opacity: 1 }}
          animate={{ opacity: showOverlay ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-end justify-between">
            <h3 className="text-xl sm:text-2xl font-bold
                          bg-gradient-to-r from-purple-300 to-pink-300 
                          bg-clip-text text-transparent">
              {project.title}
            </h3>
            <div className="flex space-x-2">
              {project.links.site && (
                <a href={project.links.site} target="_blank" rel="noopener noreferrer" 
                   className="p-1.5 rounded-full bg-purple-800/50 text-white hover:bg-purple-700/60 transition-colors"
                   onClick={e => e.stopPropagation()}>
                  <HiEye className="text-lg" />
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                   className="p-1.5 rounded-full bg-purple-800/50 text-white hover:bg-purple-700/60 transition-colors"
                   onClick={e => e.stopPropagation()}>
                  <FiGithub className="text-lg" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: { value: "#9333ea" },
      links: {
        enable: true,
        color: "#9333ea",
        opacity: 0.1,
        width: 1,
        distance: 150
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      },
      opacity: {
        value: 0.3,
        random: true,
        anim: {
          enable: true,
          speed: 0.5,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 2,
        random: true
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse"
        }
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-6" id="portfolio">
      <Particles
        id="portfolioParticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-[1400px] mx-auto"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-900/30 text-purple-400 
                      text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-purple-700/30"
          >
            My Work
          </motion.span>
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4
                      bg-gradient-to-r from-purple-300 to-pink-300
                      bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base md:text-lg">
            Explore my latest work—a showcase of creativity, technical skill, and passion for building innovative solutions.
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isHovered={hoveredProject === index}
                onHover={setHoveredProject}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a 
            href="https://github.com/cyberboyayush" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full 
                      bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                      hover:from-purple-600/30 hover:to-pink-600/30
                      text-purple-300 hover:text-purple-200
                      border border-purple-500/30 hover:border-purple-500/50
                      transition-all duration-300 group text-sm sm:text-base"
          >
            <span>View more on GitHub</span>
            <FiGithub className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Portfolio;