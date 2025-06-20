import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGeeksforgeeks, SiLeetcode } from 'react-icons/si';
import { AiOutlineMail, AiOutlineGlobal, AiOutlineMessage, AiOutlineClose } from 'react-icons/ai';
import { DiCode, DiCss3, DiHtml5, DiJavascript, DiReact, DiPython } from 'react-icons/di';
import { SiTailwindcss, SiTypescript, SiNextdotjs } from 'react-icons/si';

const IconButton = ({ href, icon: Icon, color, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative group"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className={`p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10
                 hover:bg-white/10 transition-all duration-300 group-hover:border-white/20`}
    >
      <Icon className={`text-2xl sm:text-3xl ${color} drop-shadow-glow`} />
    </motion.div>
    <motion.span
      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-400/80
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      {label}
    </motion.span>
  </motion.a>
);

const CustomButton = ({ href, label, gradient, icon: Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-full sm:w-96 p-5 rounded-xl text-center font-semibold text-white/95 text-lg
              tracking-wide font-['Plus_Jakarta_Sans']
              bg-white/5 backdrop-blur-sm border border-white/10
              hover:bg-white/10 hover:border-white/20
              relative overflow-hidden group flex items-center justify-center gap-4
              shadow-lg hover:shadow-xl transition-all duration-300`}
    whileHover={{ 
      scale: 1.02,
      boxShadow: "0 8px 30px rgba(255, 255, 255, 0.1)"
    }}
    whileTap={{ scale: 0.98 }}
  >
    <motion.div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10"
    />
    {Icon && <span className="text-2xl relative z-10">{Icon()}</span>}
    <span className="tracking-wide relative z-10 text-white/90">{label}</span>
    <motion.div
      className="absolute right-6 opacity-0 group-hover:opacity-100 
                 transition-all duration-300 text-xl font-bold text-white/90"
    >
      →
    </motion.div>
  </motion.a>
);

const FloatingIcon = ({ Icon, className }) => (
  <motion.div
    className={`absolute text-white/5 ${className}`}
    animate={{
      y: ["0%", "100%", "0%"],
      x: ["0%", "100%", "0%"],
      rotate: [0, 360],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: Math.random() * 15 + 25,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon className="w-16 h-16 md:w-20 md:h-20" />
  </motion.div>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '0d328fdf-f462-44c9-ad9b-3b0df1fc64ad',
          from_name: formData.email,
          email: formData.email,
          message: formData.message,
          subject: `New message from ${formData.email}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send');
      }
    } catch (error) {
      setStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <motion.div
      className="w-full max-w-lg mx-auto p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.h3 
        className="text-2xl font-semibold text-white/90 mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Send me a message
      </motion.h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <label className="text-sm text-white/70 mb-2 block">Your Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            placeholder="name@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                     text-white/90 placeholder-white/30 focus:outline-none focus:border-purple-500/50
                     transition-all duration-300 backdrop-blur-sm"
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="relative group">
          <label className="text-sm text-white/70 mb-2 block">Message</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
            placeholder="Your message here..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3
                     text-white/90 placeholder-white/30 focus:outline-none focus:border-purple-500/50
                     transition-all duration-300 backdrop-blur-sm resize-none"
            required
            disabled={isSubmitting}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80
                   text-white font-medium tracking-wide
                   transition-all duration-300 relative overflow-hidden group
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:from-purple-600 hover:to-pink-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {status === 'sending' ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⭕
                </motion.span>
                Sending...
              </>
            ) : 'Send Message'}
          </span>
        </motion.button>

        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-center ${
              status === 'success' 
                ? 'bg-green-500/20 text-green-400' 
                : status === 'error'
                ? 'bg-red-500/20 text-red-400'
                : 'bg-purple-500/20 text-purple-400'
            }`}
          >
            {status === 'success' 
              ? '✅ Message sent successfully!' 
              : status === 'error'
              ? '❌ Failed to send message. Please try again.'
              : '⏳ Sending message...'}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

const FloatingContactButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="fixed bottom-6 right-6 pl-3 pr-5 py-3 rounded-full 
               bg-gradient-to-r from-purple-600/30 to-pink-600/30
               border border-purple-500/50 backdrop-blur-md
               group flex items-center gap-2
               shadow-lg shadow-purple-500/20
               hover:shadow-xl hover:shadow-purple-500/30
               transition-all duration-300 z-50
               scale-90"
    whileHover={{ scale: 0.95 }}
    whileTap={{ scale: 0.85 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm">
      <AiOutlineMessage className="text-lg text-white group-hover:text-purple-300 transition-colors" />
    </div>
    <span className="text-xs font-medium text-white/90 group-hover:text-white">Message Me</span>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                 opacity-0 group-hover:opacity-100 transition-all duration-300 blur"
    />
  </motion.button>
);

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-[#0a0a1f] rounded-2xl border border-purple-500/20 w-full max-w-lg
                     relative backdrop-blur-xl shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 
                     hover:bg-white/10 transition-colors"
          >
            <AiOutlineClose className="text-xl text-white/70 hover:text-white" />
          </button>
          <ContactForm />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const LinksPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: i => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    }),
    hover: {
      y: -5,
      color: '#9333ea',
      transition: {
        duration: 0.2
      }
    }
  };

  const nameAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    hover: {
      scale: 1.2,
      color: "#9333EA",
      transition: { duration: 0.2 }
    }
  };

  const name = "Harivallabha Sai Surishetty".split("");

  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Grid Background */}
      <div className="fixed inset-0 bg-[#0a0a1f]">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f0a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Radial Gradient Mask */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -left-1/4 -top-1/4 w-[50%] h-[50%] bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 rounded-full"
          animate={{
            x: [50, 150, 50],
            y: [50, 150, 50],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ filter: 'blur(100px)' }}
        />
        
        <motion.div
          className="absolute -right-1/4 -bottom-1/4 w-[50%] h-[50%] bg-gradient-to-l from-blue-500/30 to-purple-500/30 rounded-full"
          animate={{
            x: [-50, -150, -50],
            y: [-50, -150, -50],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ filter: 'blur(100px)' }}
        />

        {/* Shimmer Effect Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="w-[10px] h-[200%] bg-white/5 rotate-[-45deg]"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* Floating Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <FloatingIcon Icon={DiReact} className="top-[10%] left-[15%]" />
        <FloatingIcon Icon={DiJavascript} className="top-[20%] right-[10%]" />
        <FloatingIcon Icon={DiPython} className="bottom-[30%] left-[20%]" />
        <FloatingIcon Icon={DiHtml5} className="top-[40%] right-[25%]" />
        <FloatingIcon Icon={DiCss3} className="bottom-[15%] right-[15%]" />
        <FloatingIcon Icon={SiTailwindcss} className="top-[60%] left-[10%]" />
        <FloatingIcon Icon={SiTypescript} className="bottom-[40%] right-[30%]" />
        <FloatingIcon Icon={DiCode} className="top-[30%] left-[30%]" />
        <FloatingIcon Icon={SiNextdotjs} className="bottom-[20%] left-[25%]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        <motion.div
          className="max-w-2xl mx-auto pt-24 pb-16 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Profile Section */}
          <motion.div 
            className="flex flex-col items-center mb-16"
            variants={itemVariants}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              <motion.img
                src="/profile-comp.png"
                alt="Profile"
                className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-purple-500/30
                         relative z-10 bg-[#0f0f0f] object-cover"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                  }
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.1}
              />
              <motion.div
                className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl z-0"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </div>

            {/* Name Animation */}
            <motion.div
              className="relative z-20 flex flex-wrap justify-center gap-[0.2em] pt-6 pb-2"
              variants={nameAnimation}
              initial="hidden"
              animate="visible"
            >
              {"Ayush".split("").map((letter, index) => (
                <motion.span
                  key={`first-${index}`}
                  variants={letterAnimation}
                  whileHover="hover"
                  className="text-4xl sm:text-5xl font-extrabold text-white cursor-default font-['Outfit']
                           tracking-tight"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                className="text-4xl sm:text-5xl font-bold text-white mx-2 cursor-default"
                variants={letterAnimation}
              >
                {" "}
              </motion.span>
              {"Sharma".split("").map((letter, index) => (
                <motion.span
                  key={`last-${index}`}
                  variants={letterAnimation}
                  whileHover="hover"
                  className="text-4xl sm:text-5xl font-extrabold text-white cursor-default font-['Outfit']
                           tracking-tight"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <motion.p
              className="text-gray-400 text-center text-sm sm:text-base font-medium tracking-wide"
              variants={itemVariants}
            >
              Full Stack Developer | Programmer | Coder
            </motion.p>
          </motion.div>

          {/* Enhanced content entrance animations */}
          <motion.div
            className="flex justify-center gap-6 mb-12"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { 
                opacity: 1, 
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <IconButton
              href="mailto:connect@vallabha1243"
              icon={AiOutlineMail}
              color="text-rose-400/90"
              label="Email"
            />
            <IconButton
              href="https://github.com/vallabhatech"
              icon={FaGithub}
              color="text-violet-400/90"
              label="GitHub"
            />
            <IconButton
              href="https://leetcode.com/vallabhatech/"
              icon={SiLeetcode}
              color="text-amber-400/90"
              label="LeetCode"
            />
            <IconButton
              href="https://linkedin.com/in/vallabhatech"
              icon={FaLinkedin}
              color="text-sky-400/90"
              label="LinkedIn"
            />
            <IconButton
              href="https://auth.geeksforgeeks.org/user/vallahbatech"
              icon={SiGeeksforgeeks}
              color="text-emerald-400/90"
              label="GFG"
            />
          </motion.div>

          {/* Enhanced buttons animation */}
          <motion.div 
            className="flex flex-col items-center gap-6"
            variants={{
              hidden: { opacity: 0 },
              show: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.5
                }
              }
            }}
          >
            <CustomButton
              href="https://github.com/vallabhtech?tab=repositories"
              label="GitHub Repositories"
              icon={() => <span>📝</span>}
            />
            <CustomButton
              href="https://portdevv.vercel.app"
              label="Checkout Portdev"
              icon={() => <span>💼</span>}
            />
            <CustomButton
              href="https://linkedin.com/in/vallabhatech"
              label="Connect with me on LinkedIn"
              icon={() => <FaLinkedin />}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Contact Button and Modal */}
      <FloatingContactButton onClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Glass Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#0a0a1f]/50 to-[#0a0a1f]/80" />
    </div>
  );
};

export default LinksPage;
