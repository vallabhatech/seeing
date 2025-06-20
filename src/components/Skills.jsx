import React, { useState, useEffect } from "react"
import { DiHtml5, DiCss3, DiJavascript1, DiReact, DiNodejsSmall, DiMongodb, DiJava, DiPython, DiGit } from "react-icons/di"
import { SiTailwindcss, SiCplusplus, SiTensorflow, SiFigma, SiFirebase, SiAppwrite, SiGoogle } from "react-icons/si"
import { FaBrain } from "react-icons/fa"
import { motion } from "framer-motion"
import { Particles } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

// Combined all skills into a single array
const skills = [
  { name: 'HTML5', icon: <DiHtml5 />, color: 'text-[#E34F26]', bgColor: 'bg-[#E34F26]/10' },
  { name: 'CSS3', icon: <DiCss3 />, color: 'text-[#1572B6]', bgColor: 'bg-[#1572B6]/10' },
  { name: 'JavaScript', icon: <DiJavascript1 />, color: 'text-[#F7DF1E]', bgColor: 'bg-[#F7DF1E]/10' },
  { name: 'React', icon: <DiReact />, color: 'text-[#61DAFB]', bgColor: 'bg-[#61DAFB]/10' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-[#06B6D4]', bgColor: 'bg-[#06B6D4]/10' },
  { name: 'Node.js', icon: <DiNodejsSmall />, color: 'text-[#339933]', bgColor: 'bg-[#339933]/10' },
  { name: 'MongoDB', icon: <DiMongodb />, color: 'text-[#47A248]', bgColor: 'bg-[#47A248]/10' },
  { name: 'Firebase', icon: <SiFirebase />, color: 'text-[#FFCA28]', bgColor: 'bg-[#FFCA28]/10' },
  { name: 'Appwrite', icon: <SiAppwrite />, color: 'text-[#F02E65]', bgColor: 'bg-[#F02E65]/10' },
  { name: 'Python', icon: <DiPython />, color: 'text-[#3776AB]', bgColor: 'bg-[#3776AB]/10' },
  { name: 'Java', icon: <DiJava />, color: 'text-[#007396]', bgColor: 'bg-[#007396]/10' },
  { name: 'C++', icon: <SiCplusplus />, color: 'text-[#00599C]', bgColor: 'bg-[#00599C]/10' },
  { name: 'TensorFlow', icon: <SiTensorflow />, color: 'text-[#FF6F00]', bgColor: 'bg-[#FF6F00]/10' },
  { name: 'Gemini', icon: <SiGoogle />, color: 'text-[#4285F4]', bgColor: 'bg-[#4285F4]/10' },
  { name: 'Llama', icon: <FaBrain />, color: 'text-[#19AEFF]', bgColor: 'bg-[#19AEFF]/10' },
  { name: 'Git', icon: <DiGit />, color: 'text-[#F05032]', bgColor: 'bg-[#F05032]/10' },
  { name: 'Figma', icon: <SiFigma />, color: 'text-[#F24E1E]', bgColor: 'bg-[#F24E1E]/10' },
];

const TechCard = ({ item, index }) => {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  const handleInteraction = () => {
    if (isTouchDevice) {
      setIsActive(!isActive);
    }
  };

  const isAnimated = isTouchDevice ? isActive : undefined; // undefined will allow hover on desktop

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={!isTouchDevice ? { y: -5, scale: 1.05 } : undefined}
      animate={isAnimated ? { y: -5, scale: 1.05 } : { y: 0, scale: 1 }}
      onClick={handleInteraction}
      className={`relative group p-5 rounded-2xl backdrop-blur-sm
                border border-white/10 ${item.bgColor}
                hover:border-white/20 transition-all duration-300
                flex flex-col items-center gap-3 cursor-pointer
                shadow-lg hover:shadow-xl hover:${item.bgColor.replace('/10', '/20')}
                `}
    >
      <motion.div
        whileHover={!isTouchDevice ? { rotate: 360 } : undefined}
        animate={isAnimated ? { rotate: 360 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
        className={`text-4xl md:text-5xl ${item.color}`}
      >
        {item.icon}
      </motion.div>
      <span className={`font-medium ${item.color} text-sm md:text-base text-center`}>
        {item.name}
      </span>
      
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 -z-10 rounded-2xl transition-opacity duration-500
                   ${item.bgColor} ${isAnimated || !isTouchDevice ? 'opacity-50 blur-xl' : 'opacity-0'}`}
      />
    </motion.div>
  );
};

const Skills = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 80000
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
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      },
      opacity: {
        value: 0.2,
        random: true
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
          mode: "bubble"
        }
      },
      modes: {
        bubble: {
          distance: 150,
          size: 4,
          opacity: 0.5
        }
      }
    }
  };

  return (
    <div className="relative min-h-screen py-20 px-4 sm:px-6" id="skills">
      {/* Particles Background */}
      <Particles
        id="skillsParticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-900/30 text-purple-400 
                      text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-purple-700/30"
          >
            My Toolkit
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            I love working with these technologies to build amazing digital experiences.
            Always exploring, learning, and pushing boundaries.
          </p>
        </motion.div>

        {/* Single Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {skills.map((item, index) => (
              <TechCard key={index} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
