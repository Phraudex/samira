"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue, animate, type PanInfo } from "framer-motion";
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
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const isAnimating = useRef(false);
  const n = images.length;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrent(initialIndex);
      x.set(0);
    }
  }, [initialIndex, isOpen, x]);

  const slideBy = useCallback((dir: 1 | -1) => {
    if (isAnimating.current || n < 2) return;
    isAnimating.current = true;
    const target: number = dir === 1 ? -window.innerWidth : window.innerWidth;
    animate(x, target, {
      duration: 0.22,
      ease: easings.cinematic,
    }).then(() => {
      x.set(0);
      setCurrent((c) => (c + dir + n) % n);
      isAnimating.current = false;
    });
  }, [n, x]);

  const goNext = useCallback(() => slideBy(1), [slideBy]);
  const goPrev = useCallback(() => slideBy(-1), [slideBy]);

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
      if (isAnimating.current) return;
      const { x: ox } = info.offset;
      const { x: vx } = info.velocity;
      if (ox < -50 || vx < -400) goNext();
      else if (ox > 50 || vx > 400) goPrev();
      else animate(x, 0, { type: "spring", stiffness: 600, damping: 45 });
    },
    [goNext, goPrev, x]
  );

  if (!mounted) return null;

  const prevIdx = (current - 1 + n) % n;
  const nextIdx = (current + 1) % n;

  // 3 persistent slots keyed by role — images never unmount on swipe
  // Math: slot visual position = CSS offset (vw) + motionValue x
  // After animation: x goes ±vw, then resets to 0 while current updates
  // The image that was ±100vw becomes 0 in both states → zero flash
  const slots =
    n === 1
      ? [{ key: "center" as const, src: images[0], offsetVw: 0, isPriority: true }]
      : [
          { key: "prev" as const,   src: images[prevIdx], offsetVw: -100, isPriority: false },
          { key: "center" as const, src: images[current],  offsetVw: 0,   isPriority: true  },
          { key: "next" as const,   src: images[nextIdx],  offsetVw: 100,  isPriority: false },
        ];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: easings.cinematic }}
          style={{ zIndex, background: "rgba(0,0,0,0.96)" }}
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
              zIndex: 20,
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
          {n > 1 && (
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
                zIndex: 20,
                pointerEvents: "none",
              }}
            >
              {current + 1} / {n}
            </p>
          )}

          {/* Draggable strip — 3 persistent slots, no mount/unmount on swipe */}
          <motion.div
            drag={n > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            style={{
              x,
              position: "absolute",
              inset: 0,
              touchAction: "pan-y",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {slots.map((slot) => (
              <div
                key={slot.key}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `translateX(${slot.offsetVw}vw)`,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "min(90vw, 520px)",
                    height: "min(85dvh, 700px)",
                  }}
                >
                  <Image
                    src={slot.src}
                    alt="Samira"
                    fill
                    sizes="(max-width:768px) 90vw, 520px"
                    className="object-contain"
                    draggable={false}
                    priority={slot.isPriority}
                    loading={slot.isPriority ? "eager" : "eager"}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Desktop arrows */}
          {n > 1 && (
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
                  zIndex: 20,
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
                  zIndex: 20,
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
