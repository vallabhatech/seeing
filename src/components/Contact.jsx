import React, { useState, useEffect } from "react";
import {
  AiFillLinkedin,
  AiOutlineMail,
  AiOutlineTwitter,
} from "react-icons/ai";
import { FiGithub, FiSend, FiUser, FiMail, FiMessageSquare } from "react-icons/fi";
import { motion } from "framer-motion";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const StatsCard = ({ number, label, icon }) => {
  const [count, setCount] = useState(0);
  const targetNumber = parseInt(number);

  useEffect(() => {
    let startTime;
    let animationFrameId;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / 2000; // 2 seconds duration

      if (progress < 1) {
        setCount(Math.min(Math.floor(targetNumber * progress), targetNumber));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationFrameId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`stats-${label}`);
    if (element) observer.observe(element);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetNumber, label]);

  return (
    <motion.div
      id={`stats-${label}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-purple-900/40 to-purple-800/30
               border border-purple-500/30 p-6 rounded-xl text-center
               hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]
               transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500"/>
      {icon && (
        <div className="absolute -right-4 -top-4 text-purple-500/20 text-7xl opacity-30 group-hover:opacity-40 transition-opacity">
          {icon}
        </div>
      )}
      <motion.h4 className="text-3xl sm:text-4xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text mb-1">
        {count}
        {number.includes("+") ? "+" : ""}
      </motion.h4>
      <p className="text-purple-300 text-sm relative z-10">{label}</p>
    </motion.div>
  );
};

const FormInput = ({ type, placeholder, name, icon }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400">
      {icon}
    </div>
    <motion.input
      whileFocus={{ scale: 1.01 }}
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20
               py-3 pl-10 pr-4 text-gray-100 placeholder:text-gray-400
               focus:border-purple-400 focus:outline-none focus:ring-2 
               focus:ring-purple-500/20 transition-all duration-300
               backdrop-blur-sm"
      required
    />
  </div>
);

const FormTextarea = ({ placeholder, name }) => (
  <div className="relative">
    <div className="absolute left-4 top-4 text-purple-400">
      <FiMessageSquare />
    </div>
    <motion.textarea
      whileFocus={{ scale: 1.01 }}
      placeholder={placeholder}
      name={name}
      rows="4"
      className="w-full rounded-xl border border-purple-500/30 bg-purple-900/20
               py-3 pl-10 pr-4 text-gray-100 placeholder:text-gray-400
               focus:border-purple-400 focus:outline-none focus:ring-2 
               focus:ring-purple-500/20 transition-all duration-300
               backdrop-blur-sm resize-none"
      required
    />
  </div>
);

const Contact = () => {
  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  const particlesConfig = {
    particles: {
      number: {
        value: 30,
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
        speed: 0.6,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out"
      },
      opacity: {
        value: 0.2,
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
    <div className="relative min-h-screen py-20 px-4 sm:px-6" id="contact">
      <Particles
        id="contactParticles"
        init={particlesInit}
        options={particlesConfig}
        className="absolute inset-0 -z-10"
      />

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-[1200px] mx-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-900/30 text-purple-400 
                      text-xs sm:text-sm font-medium mb-3 sm:mb-4 border border-purple-700/30"
          >
            Get In Touch
          </motion.span>
          
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent mb-4"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
          >
            Have a project in mind or want to collaborate? I'd love to hear from
            you and bring your ideas to life!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div
              className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 backdrop-blur-sm
                          border border-purple-500/30 p-6 sm:p-8 rounded-3xl
                          transform hover:-translate-y-1 transition-all duration-300
                          hover:shadow-[0_0_30px_rgba(147,51,234,0.3)] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 
                            group-hover:opacity-100 transition-opacity duration-500"/>
              
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
               Always open to new opportunities, collaborations, or meaningful conversations in tech. Let’s connect and build something impactful.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              {[
                {
                  icon: <FiGithub />,
                  href: "https://github.com/vallabhatech",
                  label: "GitHub",
                  color: "from-purple-500/80 to-purple-700/80",
                },
                {
                  icon: <AiFillLinkedin />,
                  href: "https://linkedin.com/in/vallabhatech",
                  label: "LinkedIn",
                  color: "from-blue-500/80 to-blue-700/80",
                },
                {
                  icon: <AiOutlineTwitter />,
                  href: "https://twitter.com/sai577",
                  label: "Twitter",
                  color: "from-sky-500/80 to-sky-700/80",
                },
                {
                  icon: <AiOutlineMail />,
                  href: "mailto:connect@vallabha1243",
                  label: "Email",
                  color: "from-pink-500/80 to-pink-700/80",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-gradient-to-br ${social.color}
                           border border-white/20 p-5 rounded-2xl
                           text-white text-2xl sm:text-3xl
                           shadow-lg shadow-purple-900/20 hover:shadow-xl hover:shadow-purple-800/30
                           transition-all duration-300 flex items-center justify-center`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <motion.div
              className="grid grid-cols-2 gap-4 sm:gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="show"
            >
              <StatsCard number="20+" label="Projects Completed" icon={<FiSend />} />
              <StatsCard number="3+" label="Years Experience" icon={<FiUser />} />
            </motion.div>
          </motion.div>

          <motion.form
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            action="https://formspree.io/f/xanwyqok"
            method="POST"
            className="bg-gradient-to-br from-purple-900/40 to-purple-800/30 backdrop-blur-sm
                     border border-purple-500/30 p-6 sm:p-8 rounded-3xl
                     hover:shadow-[0_0_30px_rgba(147,51,234,0.3)]
                     transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500"/>
            
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Send Me a Message
            </h3>
            
            <div className="space-y-5">
              <FormInput type="text" placeholder="Your Name" name="name" icon={<FiUser />} />
              <FormInput type="email" placeholder="Your Email" name="email" icon={<FiMail />} />
              <FormTextarea placeholder="Your Message" name="message" />

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 sm:py-4 rounded-xl text-white font-medium
                         bg-gradient-to-r from-purple-600 to-pink-600
                         hover:from-purple-500 hover:to-pink-500
                         transform transition-all duration-300
                         shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-600/40
                         flex items-center justify-center gap-2"
              >
                <FiSend className="text-lg" />
                <span className="text-white">Send Message</span>
              </motion.button>
              
              <p className="text-sm text-gray-400 text-center mt-4">
                I'll get back to you as soon as possible!
              </p>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
