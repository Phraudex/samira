"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[3];
const keyPhrases = (chapter as typeof chapter & { keyPhrases: string[] }).keyPhrases;

// Secondary photos
const secondary = [
  { src: "/images/samira/P33.jpg", sizes: "33vw" },
  { src: "/images/samira/P15.JPG", sizes: "33vw" },
  { src: "/images/samira/P31.JPG", sizes: "33vw" },
];

export default function Chapter5() {
  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "#060309" }}
      aria-labelledby="ch5-title"
    >
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(73,26,177,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div
        className="relative z-[1] px-5 lg:px-20"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <ChapterHeader number={5} title={chapter.title} />

        {/* Body text */}
        <motion.p
          className="font-body font-light text-center mx-auto mb-14"
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            lineHeight: "1.85",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "600px",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {chapter.content}
        </motion.p>

        {/* Dominant photo — P45 */}
        <motion.div
          className="mx-auto mb-3"
          style={{ maxWidth: "480px" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <div
            className="relative w-full"
            style={{
              height: "clamp(300px, 55vw, 480px)",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 16px 60px rgba(10,5,21,0.5), 0 6px 20px rgba(52,17,126,0.15)",
            }}
          >
            <Image
              src="/images/samira/P45.JPG"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 90vw, 480px"
              className="object-cover"
              style={{ objectPosition: "center 65%" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(6,3,9,0.4) 100%)",
              }}
            />
          </div>

          {/* Caption — esprit carte épurée */}
          {keyPhrases?.[0] && (
            <p
              className="font-body uppercase text-center mt-4"
              style={{
                fontSize: "11px",
                letterSpacing: "2.5px",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              {keyPhrases[0]}
            </p>
          )}
        </motion.div>

        {/* Key phrases as pull quotes */}
        {keyPhrases && keyPhrases.length > 1 && (
          <motion.div
            className="flex flex-col items-center gap-4 my-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {keyPhrases.slice(1).map((phrase) => (
              <motion.p
                key={phrase}
                className="font-display italic text-center"
                style={{ fontSize: "clamp(18px, 2.5vw, 26px)", color: "#A981FF", lineHeight: "1.4" }}
                variants={fadeUp}
              >
                {phrase}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* Secondary photos — horizontal strip, not equal grid */}
        <motion.div
          className="flex gap-3 mt-10"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {secondary.map((photo, i) => (
            <motion.div
              key={photo.src}
              className="relative"
              style={{
                flex: i === 0 ? "1.4" : i === 1 ? "1" : "0.8",
                height: i === 0 ? "160px" : i === 1 ? "140px" : "120px",
                borderRadius: "12px",
                overflow: "hidden",
                alignSelf: i === 1 ? "flex-end" : "flex-start",
              }}
              variants={fadeUp}
            >
              <Image
                src={photo.src}
                alt="Samira"
                fill
                sizes={photo.sizes}
                className="object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
