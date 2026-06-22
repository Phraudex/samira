"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { easings } from "@/lib/animations";

const chapters = [
  { id: "chapitre-1", number: 1, title: "Qui est Samira ?" },
  { id: "chapitre-2", number: 2, title: "Une belle âme" },
  { id: "chapitre-3", number: 3, title: "Ses valeurs" },
  { id: "chapitre-5", number: 5, title: "Sa force" },
  { id: "chapitre-6", number: 6, title: "Galerie immersive" },
  { id: "chapitre-7", number: 7, title: "Bibliothèque de souvenirs" },
  { id: "chapitre-8", number: 8, title: "L'empreinte qu'elle laisse" },
];

interface ChapterNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChapterNav({ isOpen, onClose }: ChapterNavProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChapterClick = (id: string) => {
    onClose();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easings.cinematic }}
          style={{
            background: "rgba(6,3,9,0.93)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
          onClick={onClose}
        >
          <motion.div
            className="relative flex flex-col h-full px-8 lg:px-16"
            initial={{ opacity: 0, y: -24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: easings.cinematic }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pt-16 pb-10">
              <div>
                <p
                  className="font-body font-semibold uppercase"
                  style={{ fontSize: "10px", letterSpacing: "3px", color: "#A981FF", marginBottom: "6px" }}
                >
                  Le Livre
                </p>
                <h2
                  className="font-display font-light text-white"
                  style={{ fontSize: "28px", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  Samira
                </h2>
              </div>

              <button
                onClick={onClose}
                aria-label="Fermer le menu"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div style={{ height: "1px", background: "rgba(123,69,240,0.18)", marginBottom: "32px" }} />

            {/* Chapter list */}
            <nav className="flex flex-col overflow-y-auto" aria-label="Chapitres">
              {chapters.map((ch, i) => (
                <motion.button
                  key={ch.id}
                  className="flex items-baseline gap-5 text-left py-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.45, ease: easings.cinematic }}
                  onClick={() => handleChapterClick(ch.id)}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: "none",
                    cursor: "pointer",
                  }}
                >
                  <span
                    className="font-body font-semibold uppercase shrink-0"
                    style={{ fontSize: "10px", letterSpacing: "2.5px", color: "#7B45F0", width: "64px" }}
                  >
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display font-normal text-white group-hover:text-[#A981FF] transition-colors duration-200"
                    style={{ fontSize: "clamp(22px, 4vw, 32px)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                  >
                    {ch.title}
                  </span>
                </motion.button>
              ))}

              {/* Fin */}
              <motion.div
                className="flex items-baseline gap-5 py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 + chapters.length * 0.06 + 0.08, duration: 0.4, ease: easings.cinematic }}
              >
                <span
                  className="font-body font-semibold uppercase shrink-0"
                  style={{ fontSize: "10px", letterSpacing: "2.5px", color: "rgba(255,255,255,0.2)", width: "64px" }}
                >
                  Fin
                </span>
                <span
                  className="font-display italic"
                  style={{ fontSize: "clamp(18px, 3vw, 24px)", lineHeight: 1.2, color: "rgba(232,114,159,0.35)" }}
                >
                  {"Merci d'être toi."}
                </span>
              </motion.div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
