"use client";

import React from "react";
import { motion } from "framer-motion";
import { fadeUp, blurIn, viewportConfig } from "@/lib/animations";

interface AnimatedTextProps {
  children: React.ReactNode;
  variant?: "fadeUp" | "blurIn";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function AnimatedText({
  children,
  variant = "fadeUp",
  className = "",
  style = {},
  delay = 0,
}: AnimatedTextProps) {
  const selectedVariant = variant === "blurIn" ? blurIn : fadeUp;

  return (
    <motion.div
      className={className}
      style={style}
      variants={selectedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
