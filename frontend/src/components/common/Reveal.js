import React from 'react';
import { motion } from 'framer-motion';

// Staggered container for sequencing children nicely
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08
    }
  }
};

// Soft upward fade-in
export const revealUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Slight zoom-in for cards/images
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

// Wrapper that triggers animation when in view
export const Reveal = ({ as = motion.div, variants = revealUp, children, ...rest }) => {
  const Comp = as;
  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

export default Reveal;


