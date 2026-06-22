"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);

  const cardRef = useRef<HTMLDivElement>(null);
  const photoWrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check stored lock on mount
  useEffect(() => {
    const storedLock = localStorage.getItem("lock_until");
    if (storedLock) {
      const parsed = parseInt(storedLock, 10);
      if (parsed > Date.now()) {
        setLockUntil(parsed);
      } else {
        localStorage.removeItem("lock_until");
      }
    }
  }, []);

  // Update countdown timer
  useEffect(() => {
    if (!lockUntil) return;
    const updateCountdown = () => {
      const remaining = Math.ceil((lockUntil - Date.now()) / 1000);
      if (remaining <= 0) {
        setLockUntil(null);
        localStorage.removeItem("lock_until");
        setAttempts(0);
      } else {
        setTimeLeft(remaining);
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [lockUntil]);

  const handleSubmit = useCallback(async () => {
    if (state === "unlocking") return;
    if (lockUntil && Date.now() < lockUntil) return;

    const trimmed = password.trim().toLowerCase();
    
    // Hash input password with SHA-256 using the browser's native subtle crypto API
    const msgBuffer = new TextEncoder().encode(trimmed);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashed = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    if (hashed !== content.lock.passwordHash) {
      setState("error");
      setTimeout(() => setState("idle"), 600);
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 5) {
        const lockDuration = Date.now() + 5 * 60 * 1000; // 5 minutes lock
        setLockUntil(lockDuration);
        localStorage.setItem("lock_until", lockDuration.toString());
      }
      return;
    }

    setState("unlocking");

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      setTimeout(() => navigator.vibrate(50), 200);
    }
  }, [password, state, attempts, lockUntil]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#060309" }}
    >
      <style>{`
        @keyframes spinGlow {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes spinGlowRev {
          0% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }
      `}</style>
      {/* Background Grid Image with slow breathing scale & unlock fadeout */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{
          opacity: state === "unlocking" ? 0 : 0.45,
          scale: state === "unlocking" ? 1.08 : [1.02, 1.06, 1.02]
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: {
            duration: state === "unlocking" ? 1.2 : 25,
            ease: "easeInOut",
            repeat: state === "unlocking" ? 0 : Infinity
          }
        }}
        style={{
          backgroundImage: 'url("/images/bg_grid.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
        }}
      />

      {/* Dark radial vignette to blend grid edges seamlessly into the black background */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        animate={{ opacity: state === "unlocking" ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background:
            "radial-gradient(circle, transparent 30%, #060309 85%)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
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

      {/* Premium card wrapper */}
      <div
        ref={cardRef}
        className="relative z-[3] w-[300px]"
        style={{
          borderRadius: "32px",
          transformOrigin: "center center",
        }}
      >
        {/* Soft diffused liquid outer glow - counter-rotates and has soft liquid gradient */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "580px",
            height: "580px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(0deg)",
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 20%, rgba(114, 230, 255, 0.12) 40%, rgba(169, 129, 255, 0.22) 55%, rgba(244, 166, 198, 0.12) 70%, transparent 85%)",
            filter: "blur(35px)",
            opacity: 0.24,
            animation: "spinGlowRev 12s linear infinite",
            transformOrigin: "center center",
          }}
        />

        {/* Overflow-hidden border mask container */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: "32px",
            padding: "1.5px",
            background: "rgba(123, 69, 240, 0.08)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.65), 0 8px 24px rgba(52,17,126,0.12)",
          }}
        >
          {/* Sharp rotating border light ray (Liquid Glass Effect) */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "580px",
              height: "580px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(0deg)",
              background:
                "conic-gradient(from 0deg, transparent 40%, #72E6FF 48%, #FFFFFF 50%, #A981FF 52%, #F4A6C6 60%, transparent 70%)",
              animation: "spinGlow 7s linear infinite",
              transformOrigin: "center center",
            }}
          />

          {/* Card inner glassmorphic body */}
          <div
            className="relative w-full flex flex-col items-center overflow-hidden z-[1]"
            style={{
              background:
                "linear-gradient(160deg, rgba(28, 18, 50, 0.88), rgba(18, 10, 35, 0.96))",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              borderRadius: "31px",
              padding: "16px 16px 28px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Glass reflection sheen */}
            <div
              className="absolute inset-0 pointer-events-none z-[2]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 40%, transparent 40%, transparent 100%)",
                borderRadius: "31px",
              }}
            />

            {/* Top highlight line */}
            <div
              className="absolute top-0 left-[30%] right-[30%] h-px z-[3]"
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
              color: lockUntil && Date.now() < lockUntil ? "#E8729F" : "rgba(255,255,255,0.4)",
              letterSpacing: "0.4px",
              marginBottom: "22px",
            }}
          >
            {lockUntil && Date.now() < lockUntil
              ? `Trop d'essais. Patientez ${timeLeft}s`
              : content.lock.subtitle}
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
                disabled={state === "unlocking" || (lockUntil !== null && Date.now() < lockUntil)}
                placeholder={lockUntil && Date.now() < lockUntil ? "BLOQUÉ" : "••••••"}
                autoComplete="off"
                className="lock-input w-full h-[46px] rounded-[14px] px-4 font-body text-sm font-normal text-white text-center outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border:
                    state === "error"
                      ? "1px solid rgba(255, 80, 80, 0.5)"
                      : lockUntil && Date.now() < lockUntil
                      ? "1px solid rgba(232, 114, 159, 0.35)"
                      : "1px solid rgba(255,255,255,0.08)",
                  letterSpacing: "2px",
                }}
              />
            </motion.div>

            {/* Submit button */}
            <motion.button
              onClick={handleSubmit}
              disabled={state === "unlocking" || (lockUntil !== null && Date.now() < lockUntil)}
              className="group w-full h-[46px] rounded-[14px] font-body text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-default"
              style={{
                background: lockUntil && Date.now() < lockUntil ? "rgba(255,255,255,0.08)" : "#fff",
                color: lockUntil && Date.now() < lockUntil ? "rgba(255,255,255,0.25)" : "#0a0515",
                letterSpacing: "0.5px",
                border: "none",
              }}
              whileHover={
                state !== "unlocking" && !(lockUntil && Date.now() < lockUntil) ? { y: -1, backgroundColor: "#f0f0f0" } : {}
              }
              whileTap={state !== "unlocking" && !(lockUntil && Date.now() < lockUntil) ? { scale: 0.97 } : {}}
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
