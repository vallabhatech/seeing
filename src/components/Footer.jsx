import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative mt-20">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r 
                    from-transparent via-purple-500/50 to-transparent" />

      {/* Glass background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-purple-900/30 
                    backdrop-blur-sm -z-10" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <motion.h3
              animate={{
                backgroundPosition: ['0%', '200%'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 
                       bg-[200%_auto] bg-clip-text text-transparent"
            >
            Harivallabha Sai Surishetty
            </motion.h3>
            <p className="text-gray-400 text-sm">
              Crafting Digital Experiences with Passion
            </p>
          </div>

          {/* Copyright Section */}
          <div className="text-center md:text-right">
            <motion.div 
              className="flex items-center justify-center md:justify-end gap-2 text-gray-400"
            >
              Made with{' '}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-purple-500"
              >
                <FaHeart />
              </motion.span>
              {' '}by VallabhaTech
            </motion.div>
            <p className="mt-2 text-sm text-gray-500">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"
      />
    </footer>
  );
};

export default Footer;