"use client";

import { useState, useEffect } from "react";
import LockScreen from "@/components/LockScreen";
import Hero from "@/components/Hero";
import ChapterNav from "@/components/ChapterNav";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Chapter1 = dynamic(() => import("@/components/Chapter1"));
const Chapter2 = dynamic(() => import("@/components/Chapter2"));
const Chapter3 = dynamic(() => import("@/components/Chapter3"));
const Chapter5 = dynamic(() => import("@/components/Chapter5"));
const Chapter6 = dynamic(() => import("@/components/Chapter6"));
const Chapter7 = dynamic(() => import("@/components/Chapter7"));
const Chapter8 = dynamic(() => import("@/components/Chapter8"));
const EndScreen = dynamic(() => import("@/components/EndScreen"));

type AppState = "locked" | "unlocked";

function ChapterSeparator() {
  return (
    <div
      aria-hidden="true"
      style={{
        height: "40px",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(73,26,177,0.04) 50%, transparent 100%)",
      }}
    />
  );
}

export default function Home() {
  const [appState, setAppState] = useState<AppState>("locked");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const preventCopy = (e: ClipboardEvent) => e.preventDefault();
    const preventContextMenu = (e: MouseEvent) => e.preventDefault();

    document.addEventListener("copy", preventCopy);
    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  return (
    <main style={{ backgroundColor: "#060309", minHeight: "100dvh", width: "100vw" }}>
      {appState === "locked" && (
        <LockScreen onUnlockComplete={() => setAppState("unlocked")} />
      )}

      {appState === "unlocked" && (
        <>
          <Hero />
          <ChapterNav isOpen={navOpen} onClose={() => setNavOpen(false)} />

          {/* Sticky Book Navigation Button */}
          <motion.button
            className="fixed flex items-center justify-center cursor-pointer transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 1.2 }}
            onClick={() => setNavOpen(true)}
            title="Chapitres"
            aria-label="Menu des chapitres"
            style={{
              width: "44px",
              height: "44px",
              top: "calc(20px + env(safe-area-inset-top, 0px))",
              right: "20px",
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              color: "rgba(255, 255, 255, 0.6)",
              zIndex: 40,
            }}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              color: "rgba(255, 255, 255, 0.9)",
              borderColor: "rgba(123, 69, 240, 0.25)",
            }}
          >
            <BookOpen size={20} strokeWidth={1.5} />
          </motion.button>

          <div style={{ height: "100dvh" }} aria-hidden="true" />

          <div style={{ position: "relative", zIndex: 2, background: "#060309" }}>
            <section id="chapitre-1" aria-label="Chapitre 1">
              <Chapter1 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-2" aria-label="Chapitre 2">
              <Chapter2 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-3" aria-label="Chapitre 3">
              <Chapter3 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-5" aria-label="Chapitre 5">
              <Chapter5 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-6" aria-label="Chapitre 6">
              <Chapter6 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-7" aria-label="Chapitre 7">
              <Chapter7 />
            </section>

            <ChapterSeparator />

            <section id="chapitre-8" aria-label="Chapitre 8">
              <Chapter8 />
            </section>

            <EndScreen />
          </div>
        </>
      )}
    </main>
  );
}
