import { Variants } from "framer-motion";

/**
 * Fade-in animation variants for layout entry.
 */
export const fadeIn = (direction: "up" | "down" | "left" | "right" | "none" = "none", duration = 0.4): Variants => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        ease: "easeOut" as const,
      },
    },
  };
};

/**
 * Stagger parent container variant.
 */
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

/**
 * Standard button/card hover scale variants.
 */
export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeInOut" as const },
  },
  tap: { scale: 0.98 },
};

/**
 * Glow effect breathing variants.
 */
export const pulseGlow = (glowColor = "rgba(99, 102, 241, 0.4)"): Variants => {
  return {
    idle: {
      boxShadow: `0 0 15px ${glowColor}`,
    },
    pulse: {
      boxShadow: [
        `0 0 10px ${glowColor}`,
        `0 0 25px ${glowColor}`,
        `0 0 10px ${glowColor}`,
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };
};
