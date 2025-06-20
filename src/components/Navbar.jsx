import React, { useState, useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import 'boxicons';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleNav = () => setNav(!nav);
    const closeNav = () => setNav(false);

    // Manual scroll fix
    const handleScroll = (section) => {
        closeNav();
        setTimeout(() => {
            const target = document.getElementById(section);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 300);
    };

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <motion.div 
            className={`fixed top-0 left-0 w-full z-[40] transition-all duration-300 ${
                scrolled ? 'bg-[#030014]/80 backdrop-blur-md' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Gradient line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div className='max-w-[1300px] mx-auto flex justify-between items-center px-4 md:px-12 h-20'>
                {/* Logo with reload functionality */}
                <motion.a 
                    href="/"
                    onClick={handleLogoClick}
                    className="relative group flex items-center cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <box-icon name='code-alt' color='#ffffff'></box-icon>
                    <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
                        CyberBoyAyush
                    </span>
                    <motion.div
                        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-30 blur transition duration-500"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.a>

                {/* Desktop Menu */}
                <ul className='hidden md:flex items-center gap-8'>
                    {["about", "portfolio", "contact"].map((section, index) => (
                        <motion.li 
                            key={section}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ScrollLink
                                to={section}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="relative text-gray-300 hover:text-purple-400 transition-colors duration-300 group"
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full" />
                            </ScrollLink>
                        </motion.li>
                    ))}
                    <motion.li
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.a
                            href="/links"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                                     border border-purple-500 rounded-xl hover:from-purple-600/30 hover:to-pink-600/30"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Visit Profiles
                            <motion.div
                                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur transition duration-500"
                            />
                        </motion.a>
                    </motion.li>
                </ul>

                {/* Mobile Menu Button */}
                <motion.div 
                    onClick={() => setNav(!nav)} 
                    className='md:hidden z-50 cursor-pointer text-gray-200 hover:text-purple-400 transition-colors'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {nav ? (
                        <AiOutlineClose size={25} className="text-gray-200" />
                    ) : (
                        <AiOutlineMenu size={25} className="text-gray-200" />
                    )}
                </motion.div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {nav && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                            onClick={() => setNav(false)}
                        />
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <motion.div
                    className={`fixed right-0 top-0 w-[300px] h-screen bg-[#030014] z-40 p-8
                              border-l border-purple-500/20 backdrop-blur-lg`}
                    initial={{ x: '100%' }}
                    animate={{ x: nav ? 0 : '100%' }}
                    transition={{ type: "spring", damping: 20 }}
                >
                    <ul className='space-y-8 mt-20'>
                        {["about", "portfolio", "contact"].map((section, index) => (
                            <motion.li 
                                key={section}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ScrollLink
                                    to={section}
                                    smooth={true}
                                    offset={-70}
                                    duration={500}
                                    onClick={() => setNav(false)}
                                    className="text-2xl text-gray-300 hover:text-purple-400 transition-colors duration-300 block"
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </ScrollLink>
                            </motion.li>
                        ))}
                        <motion.li
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <motion.a
                                href="/links"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setNav(false)}
                                className="inline-block px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 
                                         border border-purple-500 rounded-xl hover:from-purple-600/30 hover:to-pink-600/30"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Visit Profiles
                            </motion.a>
                        </motion.li>
                    </ul>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Navbar;