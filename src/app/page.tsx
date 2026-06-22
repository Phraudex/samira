"use client";

import { useState } from "react";
import LockScreen from "@/components/LockScreen";
import Hero from "@/components/Hero";
import ChapterNav from "@/components/ChapterNav";
import dynamic from "next/dynamic";

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

  return (
    <main>
      {appState === "locked" && (
        <LockScreen onUnlockComplete={() => setAppState("unlocked")} />
      )}

      {appState === "unlocked" && (
        <>
          <Hero onChaptersClick={() => setNavOpen(true)} />
          <ChapterNav isOpen={navOpen} onClose={() => setNavOpen(false)} />

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
