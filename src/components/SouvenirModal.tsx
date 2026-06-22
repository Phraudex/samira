"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Play } from "lucide-react";
import { easings } from "@/lib/animations";
import type { BibliothequeItem } from "@/data/content";
import Lightbox from "./Lightbox";
import VideoPlayer from "./VideoPlayer";

interface SouvenirModalProps {
  item: BibliothequeItem | null;
  onClose: () => void;
}

export default function SouvenirModal({ item, onClose }: SouvenirModalProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    if (item) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [item]);

  // Reset inner state when a new item opens
  useEffect(() => {
    setLightboxIndex(null);
    setActiveVideo(null);
  }, [item?.id]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.y > 100 || info.velocity.y > 600) onClose();
    },
    [onClose]
  );

  const poster = item?.photos[0];

  return (
    <>
      <AnimatePresence>
        {item && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easings.cinematic }}
            style={{
              background: "rgba(6,3,9,0.6)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          >
            <motion.div
              className="relative flex flex-col overflow-hidden"
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.4 }}
              onDragEnd={handleDragEnd}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: easings.cinematic }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "92dvh",
                background: "linear-gradient(180deg, #0e0720 0%, #060309 100%)",
                borderRadius: "24px 24px 0 0",
                border: "1px solid rgba(123,69,240,0.15)",
                borderBottom: "none",
                paddingBottom: "env(safe-area-inset-bottom, 0px)",
              }}
            >
              {/* Drag handle */}
              <div
                style={{
                  width: "40px",
                  height: "4px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.2)",
                  margin: "12px auto 0",
                  flexShrink: 0,
                }}
              />

              {/* Header */}
              <div
                className="flex items-center gap-4 px-5 py-4"
                style={{ borderBottom: "1px solid rgba(123,69,240,0.1)", flexShrink: 0 }}
              >
                <button
                  onClick={onClose}
                  aria-label="Retour"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
                <div className="min-w-0">
                  <p
                    className="font-body font-semibold uppercase"
                    style={{ fontSize: "9px", letterSpacing: "2.5px", color: "#A981FF" }}
                  >
                    Souvenir
                  </p>
                  <h2
                    className="font-display font-normal text-white truncate"
                    style={{ fontSize: "20px", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                  >
                    {item.titre}
                  </h2>
                </div>
                {/* Media count */}
                <div className="ml-auto shrink-0">
                  <p
                    className="font-body"
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.3px" }}
                  >
                    {[
                      item.photos.length > 0 ? `${item.photos.length} photo${item.photos.length > 1 ? "s" : ""}` : "",
                      item.videos.length > 0 ? `${item.videos.length} vidéo${item.videos.length > 1 ? "s" : ""}` : "",
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                {/* Photos grid */}
                {item.photos.length > 0 && (
                  <div className="mb-6">
                    <p
                      className="font-body font-semibold uppercase mb-3"
                      style={{ fontSize: "9px", letterSpacing: "2.5px", color: "rgba(169,129,255,0.5)" }}
                    >
                      Photos
                    </p>
                    <div style={{ columns: "2", columnGap: "8px" }}>
                      {item.photos.map((src, i) => (
                        <button
                          key={src}
                          onClick={() => setLightboxIndex(i)}
                          style={{
                            display: "block",
                            width: "100%",
                            marginBottom: "8px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "none",
                            padding: 0,
                            breakInside: "avoid",
                          }}
                          aria-label={`Photo ${i + 1}`}
                        >
                          <Image
                            src={src}
                            alt="Samira"
                            width={400}
                            height={600}
                            style={{ width: "100%", height: "auto", display: "block" }}
                            sizes="45vw"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos grid */}
                {item.videos.length > 0 && (
                  <div>
                    <p
                      className="font-body font-semibold uppercase mb-3"
                      style={{ fontSize: "9px", letterSpacing: "2.5px", color: "rgba(232,114,159,0.5)" }}
                    >
                      Vidéos
                    </p>
                    <div style={{ columns: "2", columnGap: "8px" }}>
                      {item.videos.map((videoSrc, i) => (
                        <button
                          key={videoSrc}
                          onClick={() => setActiveVideo(videoSrc)}
                          style={{
                            display: "block",
                            width: "100%",
                            marginBottom: "8px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            cursor: "pointer",
                            border: "none",
                            padding: 0,
                            breakInside: "avoid",
                            position: "relative",
                          }}
                          aria-label={`Vidéo ${i + 1}`}
                        >
                          <div
                            style={{
                              aspectRatio: "9/16",
                              background: "linear-gradient(135deg, rgba(52,17,126,0.4), rgba(6,3,9,0.8))",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              position: "relative",
                            }}
                          >
                            {poster && i === 0 && (
                              <Image
                                src={poster}
                                alt="Aperçu vidéo"
                                fill
                                className="object-cover opacity-40"
                                sizes="45vw"
                              />
                            )}
                            <div
                              style={{
                                position: "relative",
                                zIndex: 2,
                                width: "44px",
                                height: "44px",
                                borderRadius: "50%",
                                background: "rgba(123,69,240,0.8)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "0 0 20px rgba(123,69,240,0.4)",
                              }}
                            >
                              <Play size={18} strokeWidth={1.5} fill="white" style={{ color: "white", marginLeft: "2px" }} />
                            </div>
                            <p
                              style={{
                                position: "relative",
                                zIndex: 2,
                                fontSize: "10px",
                                color: "rgba(255,255,255,0.4)",
                                fontFamily: "var(--font-body)",
                                letterSpacing: "0.5px",
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox — above modal */}
      <AnimatePresence>
        {lightboxIndex !== null && item && (
          <Lightbox
            images={item.photos}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            zIndex={60}
          />
        )}
      </AnimatePresence>

      {/* Video player — above modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoPlayer
            src={activeVideo}
            poster={poster}
            onClose={() => setActiveVideo(null)}
            zIndex={60}
          />
        )}
      </AnimatePresence>
    </>
  );
}
