"use client";

import { motion } from "framer-motion";
import { fadeUp, blurIn, viewportConfig, easings } from "@/lib/animations";

interface ChapterHeaderProps {
  number: number;
  title: string;
  align?: "center" | "left";
}

export default function ChapterHeader({ number, title, align = "center" }: ChapterHeaderProps) {
  const alignClass = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <div className={`flex flex-col ${alignClass} mb-12 lg:mb-16`}>
      <motion.p
        className="font-body font-semibold uppercase"
        style={{ fontSize: "10px", letterSpacing: "3px", color: "#A981FF", marginBottom: "14px" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        Chapitre {number}
      </motion.p>

      <motion.h2
        className="font-display font-normal text-white"
        style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          lineHeight: "1.1",
          letterSpacing: "-0.02em",
          marginBottom: "24px",
        }}
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.15, duration: 0.8, ease: easings.cinematic }}
      >
        {title}
      </motion.h2>

      <motion.div
        style={{ width: "60px", height: "1px", background: "#7B45F0" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.3, duration: 0.6, ease: easings.cinematic }}
      />
    </div>
  );
}
