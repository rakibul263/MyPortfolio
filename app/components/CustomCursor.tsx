'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;

    const updateMousePosition = (e: MouseEvent) => {
      // Update position immediately without animation for real-time tracking
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    try {
      window.addEventListener('mousemove', updateMousePosition, { passive: true });
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);

      const interactiveElements = document.querySelectorAll('a, button, input, textarea');
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => setIsHovering(true));
        element.addEventListener('mouseleave', () => setIsHovering(false));
      });

      return () => {
        window.removeEventListener('mousemove', updateMousePosition);
        document.removeEventListener('mouseenter', handleMouseEnter);
        document.removeEventListener('mouseleave', handleMouseLeave);
        
        interactiveElements.forEach(element => {
          element.removeEventListener('mouseenter', () => setIsHovering(true));
          element.removeEventListener('mouseleave', () => setIsHovering(false));
        });
      };
    } catch (error) {
      console.error('Error in CustomCursor:', error);
      return () => {};
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
          style={{
            x: mousePosition.x - (isHovering ? 32 : 16),
            y: mousePosition.y - (isHovering ? 32 : 16),
          }}
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: 1,
          }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "tween",
            duration: 0.1,
            ease: "linear",
            scale: {
              type: "spring",
              stiffness: 800,
              damping: 35
            }
          }}
        >
          <motion.div 
            className="relative w-full h-full"
            animate={{
              rotate: isHovering ? 180 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
          >
            <div className="absolute inset-0 bg-[#64FFDA] rounded-full opacity-30" />
            <div className="absolute inset-2 bg-[#64FFDA] rounded-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomCursor; 