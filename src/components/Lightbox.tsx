"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { easings } from "@/lib/animations";

interface LightboxProps {
  images: string[];
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
  zIndex?: number;
}

export default function Lightbox({ images, isOpen, initialIndex, onClose, zIndex = 50 }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [direction, setDirection] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync index when Lightbox opens
  useEffect(() => {
    if (isOpen) {
      setCurrent(initialIndex);
    }
  }, [initialIndex, isOpen]);

  const goNext = useCallback(() => {
    if (images.length < 2) return;
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    if (images.length < 2) return;
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -50 || info.velocity.x < -400) goNext();
      else if (info.offset.x > 50 || info.velocity.x > 400) goPrev();
    },
    [goNext, goPrev]
  );

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.25, ease: easings.cinematic } },
    exit: (d: number) => ({ x: d < 0 ? 60 : -60, opacity: 0, scale: 0.97, transition: { duration: 0.2, ease: easings.cinematic } }),
  };

  if (!mounted) return null;

  const safeCurrent = (images.length > 0 && current < images.length) ? current : 0;
  const imageSrc = images[safeCurrent] || images[initialIndex] || images[0] || "";

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: easings.cinematic }}
          style={{ zIndex, background: "rgba(0,0,0,0.95)", touchAction: "none" }}
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Fermer"
            style={{
              position: "absolute",
              top: "calc(20px + env(safe-area-inset-top, 0px))",
              right: "20px",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {/* Counter */}
          {images.length > 1 && (
            <p
              style={{
                position: "absolute",
                top: "calc(32px + env(safe-area-inset-top, 0px))",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.35)",
                fontFamily: "var(--font-body)",
                zIndex: 10,
              }}
            >
              {safeCurrent + 1} / {images.length}
            </p>
          )}

          {/* Image */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {imageSrc && (
              <motion.div
                key={safeCurrent}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: "relative",
                  width: "min(90vw, 520px)",
                  height: "min(85dvh, 700px)",
                  cursor: "grab",
                  touchAction: "pan-y",
                }}
                whileDrag={{ cursor: "grabbing" }}
              >
                <Image
                  src={imageSrc}
                  alt="Samira"
                  fill
                  sizes="(max-width:768px) 90vw, 520px"
                  className="object-contain"
                  draggable={false}
                  priority
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Photo précédente"
                className="hidden lg:flex items-center justify-center"
                style={{
                  position: "absolute",
                  left: "24px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Photo suivante"
                className="hidden lg:flex items-center justify-center"
                style={{
                  position: "absolute",
                  right: "24px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  cursor: "pointer",
                }}
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
