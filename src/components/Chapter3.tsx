"use client";

import { useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[2];

const allCards = [
  "/images/samira/P01.JPG",
  "/images/samira/P39.JPG",
  "/images/samira/P13.JPG",
  "/images/samira/P38.jpg",
];

const SWIPE_THRESHOLD = 60;

const bgOffsets = [
  { scale: 0.94, y: 14, rotate: -3, opacity: 0.7 },
  { scale: 0.88, y: 28, rotate: 4, opacity: 0.45 },
  { scale: 0.82, y: 42, rotate: -2, opacity: 0.25 },
];

function DraggableCard({
  src,
  exitX,
  onSwipe,
}: {
  src: string;
  exitX: number;
  onSwipe: (dir: number) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(
    x,
    [-200, -120, 0, 120, 200],
    [0.6, 0.85, 1, 0.85, 0.6]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (
        Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
        Math.abs(info.velocity.x) > 400
      ) {
        onSwipe(info.offset.x > 0 ? 1 : -1);
      }
    },
    [onSwipe]
  );

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: -20 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: easings.cinematic },
      }}
      exit={{
        x: exitX,
        rotate: exitX > 0 ? 18 : -18,
        opacity: 0,
        transition: { duration: 0.45, ease: easings.cinematic },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        x,
        rotate,
        opacity,
        cursor: "grab",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 20px 60px rgba(10,5,21,0.7), 0 8px 24px rgba(52,17,126,0.2)",
        border: "1px solid rgba(123,69,240,0.15)",
        touchAction: "pan-y",
      }}
    >
      <Image
        src={src}
        alt="Samira"
        fill
        sizes="(max-width:1024px) 280px, 340px"
        className="object-cover"
        style={{ objectPosition: "center 15%", pointerEvents: "none" }}
        priority
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgba(10,5,21,0.35) 100%)",
        }}
      />
    </motion.div>
  );
}

export default function Chapter3() {
  const [topIndex, setTopIndex] = useState(0);
  const [exitX, setExitX] = useState(300);

  const handleSwipe = useCallback((dir: number) => {
    setExitX(dir * 300);
    setTopIndex((prev) => (prev + 1) % allCards.length);
  }, []);

  const bgCards = bgOffsets.map((cfg, i) => ({
    src: allCards[(topIndex + i + 1) % allCards.length],
    ...cfg,
    zIndex: bgOffsets.length - i,
  }));

  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "#0A0515" }}
      aria-labelledby="ch3-title"
    >
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(73,26,177,0.07) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      <div
        className="relative z-[1] px-5 lg:px-20"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <ChapterHeader number={3} title={chapter.title} />

        <motion.p
          className="font-body font-light text-center mx-auto mb-12 lg:mb-16"
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            lineHeight: "1.85",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "580px",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {chapter.content}
        </motion.p>

        {/* Card deck — responsive via w/h classes */}
        <div className="flex justify-center">
          <div
            className="relative w-[280px] h-[450px] lg:w-[340px] lg:h-[530px]"
          >
            {/* Background stacked cards */}
            {bgCards.map(({ src, scale, y, rotate, opacity, zIndex }, i) => (
              <motion.div
                key={`bg-${i}`}
                animate={{ scale, y, rotate, opacity }}
                transition={{ duration: 0.5, ease: easings.cinematic }}
                className="absolute top-0 left-0 w-full h-[400px] lg:h-[480px]"
                style={{
                  zIndex,
                  borderRadius: "20px",
                  overflow: "hidden",
                  transformOrigin: "center bottom",
                  boxShadow:
                    "0 12px 40px rgba(10,5,21,0.5), 0 4px 16px rgba(52,17,126,0.12)",
                  border: "1px solid rgba(123,69,240,0.08)",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width:1024px) 280px, 340px"
                  className="object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(180deg, rgba(10,5,21,${0.1 + i * 0.15}) 0%, rgba(10,5,21,${0.3 + i * 0.15}) 100%)`,
                  }}
                />
              </motion.div>
            ))}

            {/* Top draggable card */}
            <div
              className="absolute top-0 left-0 w-full h-[400px] lg:h-[480px]"
            >
              <AnimatePresence initial={false} mode="popLayout">
                <DraggableCard
                  key={topIndex}
                  src={allCards[topIndex]}
                  exitX={exitX}
                  onSwipe={handleSwipe}
                />
              </AnimatePresence>
            </div>

            {/* Card counter dots */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-center"
              style={{ gap: "8px" }}
            >
              {allCards.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: topIndex === i ? "20px" : "6px",
                    height: "6px",
                    borderRadius: "9999px",
                    background:
                      topIndex === i
                        ? "rgba(169,129,255,0.7)"
                        : "rgba(169,129,255,0.2)",
                    transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.p
          className="font-body font-medium uppercase text-center mt-10"
          style={{
            fontSize: "10px",
            letterSpacing: "3px",
            color: "rgba(169,129,255,0.45)",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Foi · Pudeur · Élégance spirituelle
        </motion.p>

        <motion.p
          className="font-body text-center mt-3"
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.2)",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          Glissez pour découvrir
        </motion.p>
      </div>
    </section>
  );
}
