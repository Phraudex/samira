"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { content } from "@/data/content";
import { easings } from "@/lib/animations";

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export default function Hero() {
  return (
    <motion.section
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: easings.cinematic }}
      style={{ background: "#060309", zIndex: 0 }}
    >
      {/* ═══════════ MOBILE (<1024px) ═══════════ */}
      <div className="lg:hidden absolute inset-0 flex items-end">
        {/* Full-screen background photo */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0"
            style={{
              animation: "heroSlowZoom 20s ease-in-out infinite alternate",
            }}
          >
            <Image
              src={content.hero.image}
              alt="Samira"
              fill
              priority
              quality={85}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: "center 15%" }}
            />
          </div>
        </div>

        {/* Multi-layer overlay */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(6, 3, 9, 0.15) 0%,
                rgba(6, 3, 9, 0.05) 30%,
                rgba(6, 3, 9, 0.3) 55%,
                rgba(6, 3, 9, 0.75) 75%,
                rgba(6, 3, 9, 0.95) 90%,
                #060309 100%
              ),
              linear-gradient(135deg,
                rgba(52, 17, 126, 0.15) 0%,
                transparent 50%
              )
            `,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: NOISE_SVG, opacity: 0.02 }}
          />
        </div>

        {/* Content — bottom aligned */}
        <motion.div
          className="relative z-[2] w-full hero-content-responsive"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easings.cinematic, delay: 0.3 }}
        >
          <motion.div
            className="hero-line-responsive"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easings.cinematic, delay: 0.5 }}
            style={{
              height: "1px",
              background: "rgba(123, 69, 240, 0.5)",
              marginBottom: "16px",
            }}
          />

          <h1
            className="hero-name-responsive font-display font-light text-white"
            style={{
              letterSpacing: "-0.02em",
              lineHeight: "1.05",
              marginBottom: "12px",
            }}
          >
            {content.hero.name}
          </h1>

          <p
            className="hero-tagline-responsive font-body font-light"
            style={{
              color: "rgba(255, 255, 255, 0.55)",
              letterSpacing: "0.4px",
              lineHeight: "1.6",
            }}
          >
            {content.hero.tagline}
          </p>
        </motion.div>
      </div>

      {/* ═══════════ DESKTOP (>=1024px) ═══════════ */}
      <div className="hidden lg:flex absolute inset-0">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0A0515 0%, #0e0720 40%, #120926 70%, rgba(52, 17, 126, 0.08) 100%)",
          }}
        />

        {/* Noise texture */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{ backgroundImage: NOISE_SVG, opacity: 0.025 }}
        />

        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "30%",
            left: "20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(73, 26, 177, 0.1) 0%, transparent 60%)",
            filter: "blur(60px)",
            animation: "ambientBreathe 8s ease-in-out infinite",
          }}
        />

        {/* Left column — text */}
        <motion.div
          className="flex-1 flex flex-col justify-end relative z-[2] px-16 xl:px-24 2xl:px-32 pb-32 xl:pb-36"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easings.cinematic, delay: 0.3 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: easings.cinematic,
              delay: 0.5,
            }}
            style={{
              width: "64px",
              height: "1px",
              background: "rgba(123, 69, 240, 0.5)",
              marginBottom: "20px",
            }}
          />
          <h1
            className="font-display font-light text-white"
            style={{
              fontSize: "clamp(72px, 7vw, 120px)",
              letterSpacing: "-0.02em",
              lineHeight: "1.05",
              marginBottom: "16px",
            }}
          >
            {content.hero.name}
          </h1>
          <p
            className="font-body font-light"
            style={{
              fontSize: "clamp(16px, 1.2vw, 20px)",
              color: "rgba(255, 255, 255, 0.55)",
              letterSpacing: "0.4px",
              lineHeight: "1.6",
              maxWidth: "460px",
            }}
          >
            {content.hero.tagline}
          </p>
        </motion.div>

        {/* Right column — contained photo */}
        <motion.div
          className="w-[48%] xl:w-[46%] 2xl:w-[44%] relative z-[2] flex items-stretch p-5 xl:p-7"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: easings.cinematic, delay: 0.2 }}
        >
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              borderRadius: "28px",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.5), 0 8px 32px rgba(52,17,126,0.2)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                animation: "heroSlowZoom 20s ease-in-out infinite alternate",
              }}
            >
              <Image
                src={content.hero.image}
                alt="Samira"
                fill
                priority
                quality={85}
                sizes="50vw"
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
              />
            </div>

            {/* Bottom gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(6,3,9,0.3) 100%)",
              }}
            />

            {/* Inner ring */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: "28px",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ═══════════ SHARED ═══════════ */}

      {/* Scroll indicator */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easings.cinematic, delay: 1 }}
        style={{
          bottom: "calc(32px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <span
          className="font-body font-medium uppercase"
          style={{
            fontSize: "9px",
            letterSpacing: "3px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          Découvrir
        </span>
        <ChevronDown
          size={18}
          strokeWidth={1.5}
          className="hero-scroll-chevron"
          style={{ color: "rgba(255,255,255,0.3)" }}
        />
      </motion.div>


    </motion.section>
  );
}
