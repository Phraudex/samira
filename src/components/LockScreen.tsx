"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { content } from "@/data/content";
import UnlockSequence from "./UnlockSequence";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type LockState = "idle" | "error" | "unlocking";

interface LockScreenProps {
  onUnlockComplete: () => void;
}

export default function LockScreen({ onUnlockComplete }: LockScreenProps) {
  const [state, setState] = useState<LockState>("idle");
  const [password, setPassword] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    if (state === "unlocking") return;

    const trimmed = password.trim().toLowerCase();
    if (trimmed !== content.lock.password) {
      setState("error");
      setTimeout(() => setState("idle"), 600);
      return;
    }

    setState("unlocking");

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      setTimeout(() => navigator.vibrate(50), 200);
    }
  }, [password, state]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060309" }}
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ backgroundImage: NOISE_SVG, opacity: 0.025 }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(73, 26, 177, 0.12) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "ambientBreathe 8s ease-in-out infinite",
        }}
      />

      {/* Premium card */}
      <div
        ref={cardRef}
        className="relative z-[2] w-[300px] flex flex-col items-center"
        style={{
          background:
            "linear-gradient(160deg, rgba(28, 18, 50, 0.85), rgba(18, 10, 35, 0.95))",
          backdropFilter: "blur(30px) saturate(180%)",
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          borderRadius: "32px",
          padding: "16px 16px 28px",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(52,17,126,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
          transformOrigin: "center center",
        }}
      >
        {/* Top highlight line */}
        <div
          className="absolute top-0 left-[30%] right-[30%] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
          }}
        />

        {/* Photo container */}
        <div
          className="relative w-full overflow-hidden mb-5"
          style={{
            height: "320px",
            borderRadius: "24px",
            background: "#0a0515",
          }}
        >
          {/* Photo wrapper — animated by GSAP */}
          <div
            ref={photoWrapperRef}
            className="absolute inset-0"
            style={{
              filter: "blur(24px) brightness(0.7) saturate(1.1)",
              transform: "scale(1.15)",
            }}
          >
            <Image
              src="/images/samira/P35.jpg"
              alt="Samira"
              fill
              priority
              sizes="300px"
              className="object-cover"
              style={{ objectPosition: "center 25%" }}
            />
          </div>

          {/* Photo bottom gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background:
                "linear-gradient(180deg, transparent 60%, rgba(10,5,21,0.4) 100%)",
              borderRadius: "24px",
            }}
          />

          {/* Inner ring shadow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius: "24px",
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          />

          {/* Glow ring — animated by GSAP */}
          <div
            ref={glowRef}
            className="absolute pointer-events-none z-[3]"
            style={{
              inset: "-2px",
              borderRadius: "26px",
              border: "1px solid transparent",
            }}
          />
        </div>

        {/* Card content */}
        <div className="w-full px-2">
          <h1
            className="font-display text-[26px] font-medium text-white"
            style={{
              letterSpacing: "-0.01em",
              lineHeight: "1.1",
              marginBottom: "2px",
            }}
          >
            {content.lock.title}
          </h1>
          <p
            className="font-body text-xs font-light"
            style={{
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.4px",
              marginBottom: "22px",
            }}
          >
            {content.lock.subtitle}
          </p>

          {/* Input + Button stacked */}
          <div className="flex flex-col items-center gap-3 w-full">
            {/* Input with shake on error */}
            <motion.div
              className="w-full"
              animate={
                state === "error"
                  ? { x: [0, -8, 8, -4, 4, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={state === "unlocking"}
                placeholder="••••••"
                autoComplete="off"
                className="lock-input w-full h-[46px] rounded-[14px] px-4 font-body text-sm font-normal text-white text-center outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border:
                    state === "error"
                      ? "1px solid rgba(255, 80, 80, 0.5)"
                      : "1px solid rgba(255,255,255,0.08)",
                  letterSpacing: "2px",
                }}
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={state === "unlocking"}
              className="group w-full h-[46px] rounded-[14px] font-body text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-default"
              style={{
                background: "#fff",
                color: "#0a0515",
                letterSpacing: "0.5px",
                border: "none",
              }}
              whileHover={
                state !== "unlocking" ? { y: -1, backgroundColor: "#f0f0f0" } : {}
              }
              whileTap={state !== "unlocking" ? { scale: 0.97 } : {}}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {state === "unlocking" ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    className="flex items-center justify-center"
                  >
                    <Check size={16} strokeWidth={2.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    className="flex items-center gap-1.5"
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  >
                    {content.lock.button}
                    <ArrowRight
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform duration-300 group-hover:translate-x-[3px]"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Unlock sequence overlay */}
      {state === "unlocking" && (
        <UnlockSequence
          cardRef={cardRef}
          photoWrapperRef={photoWrapperRef}
          glowRef={glowRef}
          onComplete={onUnlockComplete}
        />
      )}
    </div>
  );
}
