"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, blurIn, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[6];

function FloralSVG({ color, size = 120 }: { color: string; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const petalRx = size * 0.14;
  const petalRy = size * 0.28;
  const petalCy = size * 0.22;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx={cx}
          cy={petalCy}
          rx={petalRx}
          ry={petalRy}
          fill={color}
          transform={`rotate(${deg} ${cx} ${cy})`}
          opacity="0.75"
        />
      ))}
      <circle cx={cx} cy={cy} r={size * 0.11} fill={color} opacity="0.9" />
    </svg>
  );
}

export default function Chapter8() {
  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "#040208" }}
      aria-labelledby="ch8-title"
    >
      {/* Dramatic ambient — darker, more conclusive */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(52,17,126,0.1) 0%, transparent 70%)",
        }}
      />

      {/* Floral — violet top-left */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: "3%", left: "2%", opacity: 0.08 }}
      >
        <FloralSVG color="#7B45F0" size={150} />
      </div>

      {/* Floral — rose bottom-right */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: "2%", right: "1%", opacity: 0.06 }}
      >
        <FloralSVG color="#E8729F" size={120} />
      </div>

      <div
        className="relative z-[1] px-5 lg:px-20"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <ChapterHeader number={8} title={chapter.title} />

        {/* Main photo — P02, dramatic overlay */}
        <motion.div
          className="relative mx-auto mb-10"
          style={{ maxWidth: "520px" }}
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div
            className="relative w-full"
            style={{
              height: "clamp(320px, 60vw, 520px)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow:
                "0 24px 80px rgba(4,2,8,0.7), 0 8px 32px rgba(52,17,126,0.25)",
            }}
          >
            <Image
              src="/images/samira/P02.JPG"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 90vw, 520px"
              className="object-cover"
              style={{
                objectPosition: "center 15%",
                filter: "brightness(0.88) contrast(1.04)",
              }}
            />
            {/* Dramatic overlay — stronger than other chapters */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(180deg,
                    rgba(4,2,8,0.25) 0%,
                    rgba(52,17,126,0.12) 35%,
                    rgba(4,2,8,0.6) 80%,
                    rgba(4,2,8,0.85) 100%
                  )
                `,
              }}
            />
            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 60px rgba(4,2,8,0.4)",
                borderRadius: "20px",
              }}
            />
          </div>
        </motion.div>

        {/* Body text */}
        <motion.p
          className="font-body font-light text-center mx-auto mb-14"
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            lineHeight: "1.9",
            color: "rgba(255,255,255,0.62)",
            maxWidth: "560px",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {chapter.content}
        </motion.p>

        {/* Secondary photos — P12 + P45, smaller, flanking */}
        <div className="flex gap-3 justify-center">
          <motion.div
            className="relative"
            style={{ width: "42%", height: "180px", borderRadius: "14px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Image
              src="/images/samira/P12.JPG"
              alt="Samira"
              fill
              sizes="45vw"
              className="object-cover"
              style={{ filter: "brightness(0.82) contrast(1.05)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(4,2,8,0.4) 100%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative"
            style={{ width: "38%", height: "150px", borderRadius: "14px", overflow: "hidden", alignSelf: "flex-end" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.12, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P45.JPG"
              alt="Samira"
              fill
              sizes="40vw"
              className="object-cover"
              style={{ filter: "brightness(0.85)" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(180deg, transparent 50%, rgba(4,2,8,0.45) 100%)",
              }}
            />
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.p
          className="font-display italic text-center mt-16"
          style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "rgba(169,129,255,0.55)", lineHeight: "1.5" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Une femme différente, tout simplement exceptionnelle.
        </motion.p>
      </div>
    </section>
  );
}
