import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from 'react-icons/fa';
import { DiJavascript, DiMongodb } from 'react-icons/di';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFirebase } from 'react-icons/si';

const FloatingIcon = ({ Icon, className, animate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <motion.div
      className={`absolute text-purple-500/25 ${className}`} // Changed from /20 to /25
      animate={{
        ...animate,
        x: [0, (mousePosition.x * 0.02), 0],
        y: [0, (mousePosition.y * 0.02), 0],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <Icon className="w-12 h-12 md:w-16 md:h-16 opacity-25" /> {/* Changed from opacity-20 to opacity-25 */}
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 lg:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-6 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-8 max-w-6xl mx-auto">
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-white max-w-lg"
          >
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Harivallabha Sai Surishetty
              </span>
            </h1>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                1000,
                'Coder',
                1000,
                'Programmer',
                1000,
              ]}
              wrapper="h3"
              repeat={Infinity}
              className="text-2xl md:text-2xl lg:text-3xl text-gray-300 mb-6"
            />
            <p className="text-gray-400 mb-8 max-w-lg">
              I Design Ideas, I Craft Solutions, I Break Limits and I prove that I Live To Create (I DO).
            </p>
            <div className="flex gap-4">
              <motion.a
                href="/links"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-purple-600 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Visit Profiles
              </motion.a>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/vallabhatech" // Replace with your GitHub URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-purple-600 rounded-lg hover:bg-purple-600/10 transition-all group"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -10, 10, 0],
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="w-6 h-6 text-white group-hover:text-purple-500 transition-colors" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/vallabhatech/" // Replace with your LinkedIn URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-purple-600 rounded-lg hover:bg-purple-600/10 transition-all group"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -10, 10, 0],
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLinkedin className="w-6 h-6 text-white group-hover:text-purple-500 transition-colors" />
                </motion.a>
              </div>
            </div>
          </motion.div>
          
          {/* Profile Image with hover effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex justify-center items-center lg:justify-center"
          >
            <motion.div 
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Animated gradient background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-30"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Profile image */}
              <motion.img
                src="/profile-comp.jpg"
                alt="Profile"
                className="relative z-10 rounded-full w-full h-full object-cover transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-purple-500/50"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Floating Tech Icons - Optimized Selection */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingIcon 
          Icon={FaReact} 
          className="top-[20%] right-[25%]"
          animate={{ 
            y: [0, -30, 0], 
            rotate: [0, 360],
            scale: [1, 1.1, 1]
          }}
        />
        <FloatingIcon 
          Icon={DiJavascript} 
          className="bottom-1/4 left-[20%]"
          animate={{ y: [0, -50, 0], rotate: [0, 15, 0] }}
        />
        <FloatingIcon 
          Icon={SiNextdotjs} 
          className="top-[35%] left-[25%]"
          animate={{ y: [-25, 25], rotate: [0, 360] }}
        />
        <FloatingIcon 
          Icon={SiTypescript} 
          className="bottom-[35%] right-[30%]"
          animate={{ 
            y: [0, -25, 0],
            x: [0, -15, 0],
            rotate: [0, 20, 0] 
          }}
        />
        <FloatingIcon 
          Icon={FaNodeJs} 
          className="top-[40%] right-[20%]"
          animate={{ 
            y: [0, -40, 0], 
            x: [0, 20, 0],
            rotate: [0, -15, 0] 
          }}
        />
        <FloatingIcon 
          Icon={DiMongodb} 
          className="bottom-[25%] left-[30%]"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 10, 0] 
          }}
        />
        <FloatingIcon 
          Icon={SiTailwindcss} 
          className="top-[25%] left-[15%]"
          animate={{ y: [-30, 30], rotate: [-20, 20] }}
        />
        <FloatingIcon 
          Icon={SiFirebase} 
          className="bottom-[30%] right-[15%]"
          animate={{ scale: [1, 1.3, 1], rotate: [0, -360] }}
        />
      </div>

      {/* Remove or adjust the existing floating elements if needed */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;
