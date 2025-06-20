import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import CodingStats from './components/CodingStats';
import LinksPage from './components/LinksPage';
import { motion, useScroll, useSpring } from "framer-motion";
import Loading from './components/Loading';

const MainContent = () => (
  <>
    <Hero />
    <Skills />
    <Portfolio />
    <CodingStats />
    <Contact />
  </>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Pre-load any critical resources here
    const preloadResources = async () => {
      try {
        // Simulate resource loading
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error('Loading error:', error);
        setLoading(false); // Ensure content shows even if there's an error
      }
    };

    preloadResources();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#0f0f0f]">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-purple-600 origin-left z-50"
          style={{ scaleX }}
        />
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}