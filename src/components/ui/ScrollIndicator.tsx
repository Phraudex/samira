"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrollIndicator({
  label = "Découvrir",
  className = "",
  style = {},
}: ScrollIndicatorProps) {
  return (
    <div
      className={`flex flex-col items-center gap-2 ${className}`}
      style={style}
    >
      {label && (
        <span
          className="font-body font-medium uppercase select-none pointer-events-none"
          style={{
            fontSize: "9px",
            letterSpacing: "3px",
            color: "rgba(255, 255, 255, 0.25)",
          }}
        >
          {label}
        </span>
      )}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          style={{ color: "rgba(255, 255, 255, 0.3)" }}
        />
      </motion.div>
    </div>
  );
}
