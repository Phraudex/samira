"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeUp, blurIn, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";
import FloralDecor from "./ui/FloralDecor";

export default function EndScreen() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        minHeight: "100dvh",
        background: "#060309",
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-label="Fin"
    >
      {/* Background soft ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(123, 69, 240, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Floral decorations — subtle corner flowers with very low opacity */}
      <FloralDecor
        color="#7B45F0"
        size={180}
        className="absolute top-[-30px] left-[-30px]"
        style={{ opacity: 0.03 }}
      />
      <FloralDecor
        color="#E8729F"
        size={200}
        className="absolute bottom-[-40px] right-[-40px]"
        style={{ opacity: 0.03 }}
      />

      {/* Photo */}
      <motion.div
        className="relative z-[1]"
        style={{
          width: "min(320px, 75vw)",
          aspectRatio: "9/14",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow:
            "0 24px 64px rgba(10,5,21,0.6), 0 8px 24px rgba(52,17,126,0.15)",
        }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
      >
        <Image
          src={content.end.image}
          alt="Samira"
          fill
          className="object-cover"
          sizes="320px"
          style={{ objectPosition: "center 20%" }}
        />
      </motion.div>

      {/* Text */}
      <motion.h2
        className="relative z-[1] font-display font-light text-white text-center mt-10 lg:mt-12"
        style={{
          fontSize: "clamp(36px, 6vw, 52px)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        transition={{ delay: 0.2, duration: 0.8, ease: easings.cinematic }}
      >
        <motion.span
          animate={{
            scale: [1, 1.015, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ display: "inline-block" }}
        >
          {content.end.message}
        </motion.span>
      </motion.h2>
    </section>
  );
}
