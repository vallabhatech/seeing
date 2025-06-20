import React from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f0f]">
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-purple-500 mb-4"
        >
          <FaCode className="w-16 h-16" />
        </motion.div>
        
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mt-4 text-purple-500 text-sm font-medium"
        >
          Loading Hai Ji..
        </motion.p>
      </div>
    </div>
  );
};

export default Loading;
