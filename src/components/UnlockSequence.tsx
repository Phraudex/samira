"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { content } from "@/data/content";

interface UnlockSequenceProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
  photoWrapperRef: React.RefObject<HTMLDivElement | null>;
  glowRef: React.RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

export default function UnlockSequence({
  cardRef,
  photoWrapperRef,
  glowRef,
  onComplete,
}: UnlockSequenceProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLParagraphElement>(null);
  const text2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const photoWrapper = photoWrapperRef.current;
    const glow = glowRef.current;
    const overlay = overlayRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!card || !photoWrapper || !glow || !overlay || !text1 || !text2) return;

    const tl = gsap.timeline();

    // 0.4s → 1.4s: Photo deblur (1s duration)
    tl.to(
      photoWrapper,
      {
        filter: "blur(0px) brightness(1) saturate(1.05)",
        scale: 1,
        duration: 1,
        ease: "power2.out",
      },
      0.4
    );

    // 1.0s: Glow ring appears
    tl.to(
      glow,
      {
        borderColor: "rgba(123, 69, 240, 0.4)",
        boxShadow: "0 0 40px rgba(123, 69, 240, 0.25)",
        duration: 0.5,
        ease: "power2.out",
      },
      1.0
    );

    // 1.6s → 2.6s: Card expands and fades out
    tl.to(
      card,
      {
        scale: 2.5,
        opacity: 0,
        borderColor: "transparent",
        duration: 1,
        ease: "power3.inOut",
      },
      1.6
    );

    // 2.4s: Overlay fades in
    tl.to(
      overlay,
      {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      },
      2.4
    );

    // 2.8s: "Bienvenue, Samira."
    tl.to(
      text1,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      2.8
    );

    // 3.8s: "Ce livre parle de toi."
    tl.to(
      text2,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      3.8
    );

    // 5.0s: Texts fade out
    tl.to(
      [text1, text2],
      {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.in",
      },
      5.0
    );

    // 5.5s: Transition to Hero
    tl.call(onComplete, [], 5.5);

    return () => {
      tl.kill();
    };
  }, [cardRef, photoWrapperRef, glowRef, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      style={{ background: "#060309", opacity: 0 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(73, 26, 177, 0.2), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <p
        ref={text1Ref}
        className="font-display text-[28px] font-light text-white text-center relative z-[1]"
        style={{ opacity: 0, transform: "translateY(10px)", lineHeight: "1.4" }}
      >
        {content.unlock.line1}
      </p>
      <p
        ref={text2Ref}
        className="font-display text-xl text-center italic relative z-[1] mt-2"
        style={{
          opacity: 0,
          transform: "translateY(10px)",
          color: "rgba(255,255,255,0.55)",
          fontSize: "20px",
          lineHeight: "1.4",
        }}
      >
        {content.unlock.line2}
      </p>
    </div>
  );
}
