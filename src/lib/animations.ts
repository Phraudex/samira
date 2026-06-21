import type { Variants } from "framer-motion";

// Easings
export const easings = {
  default: [0.4, 0, 0.2, 1],
  enter: [0, 0, 0.2, 1],
  exit: [0.4, 0, 1, 1],
  spring: [0.34, 1.56, 0.64, 1],
  cinematic: [0.22, 1, 0.36, 1],
} as const;

// Durations (ms)
export const durations = {
  micro: 0.15,
  short: 0.3,
  medium: 0.5,
  long: 0.8,
  cinematic: 1.2,
} as const;

// Scroll-triggered entrance animations
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easings.cinematic },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.cinematic },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: easings.cinematic },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easings.cinematic },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easings.default },
  },
};

// Stagger container — use with stagger children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Viewport config for whileInView
export const viewportConfig = {
  once: true,
  amount: 0.2,
} as const;

// Glass card hover
export const glassCardHover = {
  rest: { boxShadow: "0 8px 32px rgba(10,5,21,0.4)" },
  hover: {
    boxShadow: "0 16px 48px rgba(123,69,240,0.15)",
    transition: { duration: 0.3, ease: easings.default },
  },
};

// Floating breath animation (end screen)
export const breathe: Variants = {
  animate: {
    scale: [1, 1.012, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
