"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  animate,
  type PanInfo,
} from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, viewportConfig } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[2];

const allCards = [
  "/images/samira/P01.JPG",
  "/images/samira/P39.JPG",
  "/images/samira/P13.JPG",
  "/images/samira/P38.jpg",
];

const SWIPE_THRESHOLD = 50;

const STACK: Record<
  number,
  { scale: number; y: number; rotate: number; opacity: number; zIndex: number }
> = {
  0: { scale: 1, y: 0, rotate: 0, opacity: 1, zIndex: 10 },
  1: { scale: 0.96, y: 10, rotate: -2, opacity: 0.7, zIndex: 3 },
  2: { scale: 0.92, y: 20, rotate: 3, opacity: 0.45, zIndex: 2 },
  3: { scale: 0.88, y: 30, rotate: -1.5, opacity: 0.25, zIndex: 1 },
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

function useCardDragState({
  relIndex,
  isAnimating,
  setIsAnimating,
  onSwipe,
}: {
  relIndex: number;
  isAnimating: boolean;
  setIsAnimating: (v: boolean) => void;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const cardRotate = useMotionValue(STACK[relIndex].rotate);
  const cardOpacity = useMotionValue(STACK[relIndex].opacity);
  const flyingRef = useRef(false);
  const relIndexRef = useRef(relIndex);
  relIndexRef.current = relIndex;

  useEffect(() => {
    if (flyingRef.current) return;

    const target = STACK[relIndex];
    const t = { duration: 0.4, ease };

    animate(cardRotate, relIndex === 0 ? 0 : target.rotate, t);
    animate(cardOpacity, target.opacity, t);
  }, [relIndex, cardRotate, cardOpacity]);

  useMotionValueEvent(x, "change", (v) => {
    if (relIndex !== 0 || flyingRef.current) return;
    cardRotate.set(Math.max(-15, Math.min(15, (v / 160) * 15)));
    cardOpacity.set(Math.max(0.4, 1 - (Math.abs(v) / 180) * 0.6));
  });

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (isAnimating || relIndex !== 0) return;

      const { x: ox } = info.offset;
      const { x: vx } = info.velocity;

      if (Math.abs(ox) > SWIPE_THRESHOLD || Math.abs(vx) > 400) {
        const dir = ox > 0 ? 1 : -1;
        flyingRef.current = true;
        setIsAnimating(true);
        onSwipe();

        const speed = Math.max(Math.abs(vx), 700);
        const dur = Math.min(0.4, 450 / speed);

        Promise.all([
          animate(x, dir * 600, { type: "tween", duration: dur, ease }),
          animate(cardRotate, dir * 25, { type: "tween", duration: dur, ease }),
          animate(cardOpacity, 0, { type: "tween", duration: dur, ease }),
        ]).then(() => {
          const pos = STACK[relIndexRef.current];
          x.set(0);
          cardRotate.set(pos.rotate);
          cardOpacity.set(pos.opacity);
          flyingRef.current = false;
          setIsAnimating(false);
        });
      } else {
        animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
        animate(cardRotate, 0, { type: "spring", stiffness: 500, damping: 30 });
        animate(cardOpacity, 1, { type: "spring", stiffness: 500, damping: 30 });
      }
    },
    [isAnimating, relIndex, x, cardRotate, cardOpacity, onSwipe, setIsAnimating]
  );

  return { x, cardRotate, cardOpacity, flyingRef, handleDragEnd };
}

function Card({
  src,
  relIndex,
  isAnimating,
  setIsAnimating,
  onSwipe,
}: {
  src: string;
  relIndex: number;
  isAnimating: boolean;
  setIsAnimating: (v: boolean) => void;
  onSwipe: () => void;
}) {
  const { x, cardRotate, cardOpacity, flyingRef, handleDragEnd } = useCardDragState({
    relIndex,
    isAnimating,
    setIsAnimating,
    onSwipe,
  });

  const pos = STACK[relIndex];
  const isTop = relIndex === 0 || flyingRef.current;

  // Pre-calculate styling values to decrease cyclomatic complexity in JSX
  const dragType = relIndex === 0 && !isAnimating ? "x" : false;
  const animScale = flyingRef.current ? 1 : pos.scale;
  const animY = flyingRef.current ? 0 : pos.y;
  
  const cardZIndex = flyingRef.current ? 10 : pos.zIndex;
  const cursorStyle = relIndex === 0 && !isAnimating ? "grab" : "default";
  
  const shadowStyle = isTop
    ? "0 20px 60px rgba(10,5,21,0.7), 0 8px 24px rgba(52,17,126,0.2)"
    : "0 12px 40px rgba(10,5,21,0.5), 0 4px 16px rgba(52,17,126,0.12)";
    
  const borderStyle = isTop
    ? "1px solid rgba(123,69,240,0.15)"
    : "1px solid rgba(123,69,240,0.08)";
    
  const bgOverlay = isTop
    ? "linear-gradient(180deg, transparent 50%, rgba(10,5,21,0.35) 100%)"
    : `linear-gradient(180deg, rgba(10,5,21,${0.1 + relIndex * 0.12}) 0%, rgba(10,5,21,${0.25 + relIndex * 0.12}) 100%)`;

  return (
    <motion.div
      drag={dragType}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      animate={{
        scale: animScale,
        y: animY,
      }}
      transition={{ duration: 0.4, ease }}
      className="absolute top-0 left-0 w-full h-[400px] lg:h-[480px]"
      style={{
        zIndex: cardZIndex,
        x,
        rotate: cardRotate,
        opacity: cardOpacity,
        cursor: cursorStyle,
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: shadowStyle,
        border: borderStyle,
        touchAction: "pan-y",
        transformOrigin: "center bottom",
        willChange: "transform, opacity",
      }}
    >
      <Image
        src={src}
        alt="Samira"
        fill
        sizes="(max-width:1024px) 280px, 340px"
        className="object-cover"
        style={{ objectPosition: "center 15%", pointerEvents: "none" }}
        priority={relIndex <= 1}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: bgOverlay,
        }}
      />
    </motion.div>
  );
}

export default function Chapter3() {
  const [topIndex, setTopIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = useCallback(() => {
    setTopIndex((prev) => (prev + 1) % allCards.length);
  }, []);

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

        <div className="flex justify-center">
          <div className="relative w-[280px] h-[450px] lg:w-[340px] lg:h-[530px]">
            {allCards.map((src, index) => (
              <Card
                key={src}
                src={src}
                relIndex={(index - topIndex + allCards.length) % allCards.length}
                isAnimating={isAnimating}
                setIsAnimating={setIsAnimating}
                onSwipe={handleSwipe}
              />
            ))}

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
