import { useEffect, useState } from "react";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", updateCursor);
    return () => window.removeEventListener("mousemove", updateCursor);
  }, []);

  return (
    <div 
      className="hidden lg:block fixed w-5 h-5 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mix-blend-screen"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        animation: 'gradient 3s ease infinite'
      }}
    />
  );
};

export default Cursor;