"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterHeader from "./ChapterHeader";
import SouvenirModal from "./SouvenirModal";
import SouvenirCard from "./SouvenirCard";
import { staggerContainer, viewportConfig } from "@/lib/animations";
import { bibliotheque, type BibliothequeItem } from "@/data/content";
import { content } from "@/data/content";

const chapter = content.chapters[5];

export default function Chapter7() {
  const [activeItem, setActiveItem] = useState<BibliothequeItem | null>(null);

  return (
    <>
      <section
        className="relative py-14 lg:py-20 overflow-hidden"
        style={{ background: "#060309" }}
        aria-labelledby="ch7-title"
      >
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: "0%",
            left: "-10%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(52,17,126,0.08) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            bottom: "10%",
            right: "-5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(214,72,138,0.05) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <div
          className="relative z-[1] px-5 lg:px-20"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <ChapterHeader number={7} title={chapter.title} />

          {/* Cards grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {bibliotheque.map((item, i) => (
              <SouvenirCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setActiveItem(item)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Souvenir modal */}
      <AnimatePresence>
        {activeItem && (
          <SouvenirModal
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
