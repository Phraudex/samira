"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import Lightbox from "./Lightbox";
import { staggerContainer, fadeIn, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[4];

// 12 photos as specified — ratio alternates for masonry visual variety
const galleryPhotos = [
  { src: "/images/samira/P44.png",   ratio: "3/4"  },
  { src: "/images/samira/P01.JPG",   ratio: "9/16" },
  { src: "/images/samira/P31.JPG",   ratio: "3/4"  },
  { src: "/images/samira/P34.jpg",   ratio: "9/16" },
  { src: "/images/samira/P43.JPG",   ratio: "3/4"  },
  { src: "/images/samira/P47.JPG",   ratio: "9/16" },
  { src: "/images/samira/P49.JPG",   ratio: "3/4"  },
  { src: "/images/samira/P11.JPG",  ratio: "9/16" },
  { src: "/images/samira/P08.JPG",   ratio: "3/4"  },
  { src: "/images/samira/P41.JPG",   ratio: "9/16" },
  { src: "/images/samira/P32.jpg",   ratio: "3/4"  },
  { src: "/images/samira/P46.JPG",   ratio: "9/16" },
];

const imageSrcs = galleryPhotos.map((p) => p.src);

export default function Chapter6() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <section
        className="relative py-14 lg:py-20 overflow-hidden"
        style={{ background: "#060309" }}
        aria-labelledby="ch6-title"
      >
        {/* Subtle ambient */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "500px",
            background: "radial-gradient(ellipse, rgba(73,26,177,0.05) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div
          className="relative z-[1] px-5 lg:px-20"
          style={{ maxWidth: "1200px", margin: "0 auto" }}
        >
          <ChapterHeader number={6} title={chapter.title} />

          {/* Masonry grid — 2 cols mobile, 3 cols desktop */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            style={{ columns: "2", columnGap: "8px" }}
            className="lg:[columns:3]"
          >
            {galleryPhotos.map((photo, i) => (
              <motion.button
                key={photo.src}
                variants={fadeIn}
                onClick={() => setLightboxIndex(i)}
                style={{
                  display: "block",
                  width: "100%",
                  marginBottom: "8px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "none",
                  padding: 0,
                  breakInside: "avoid",
                  position: "relative",
                }}
                aria-label={`Ouvrir photo ${i + 1}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: easings.cinematic }}
              >
                <div style={{ aspectRatio: photo.ratio, position: "relative" }}>
                  <Image
                    src={photo.src}
                    alt="Samira"
                    fill
                    className="object-cover"
                    sizes="(max-width:1024px) 50vw, 33vw"
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={imageSrcs}
        isOpen={lightboxIndex !== null}
        initialIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
      />
    </>
  );
}
