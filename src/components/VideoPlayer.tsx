"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause } from "lucide-react";
import { easings } from "@/lib/animations";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  onClose: () => void;
  zIndex?: number;
}

export default function VideoPlayer({ src, poster, onClose, zIndex = 60 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === " ") { e.preventDefault(); togglePlay(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const handleEnded = useCallback(() => setIsPlaying(false), []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
    setProgress(ratio);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: easings.cinematic }}
        style={{ zIndex, background: "rgba(0,0,0,0.97)", touchAction: "none" }}
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
            zIndex: 10,
          }}
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Video + controls */}
        <motion.div
          className="relative flex flex-col"
          style={{ width: "min(95vw, 600px)", maxHeight: "85dvh" }}
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.35, ease: easings.cinematic }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video */}
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: "16px", background: "#000", aspectRatio: "9/16", maxHeight: "70dvh", cursor: "pointer" }}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              playsInline
              preload="metadata"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
            {/* Play/pause overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: easings.cinematic }}
                  style={{ background: "rgba(0,0,0,0.25)" }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(123,69,240,0.85)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 30px rgba(123,69,240,0.4)",
                    }}
                  >
                    <Play size={26} strokeWidth={1.5} fill="white" style={{ color: "white", marginLeft: "3px" }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-3 mt-4 px-1">
            {/* Progress bar */}
            <div
              role="progressbar"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              onClick={handleProgressClick}
              style={{
                height: "4px",
                background: "rgba(255,255,255,0.15)",
                borderRadius: "9999px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, #7B45F0, #A981FF)",
                  width: `${progress * 100}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>

            {/* Time + Play button */}
            <div className="flex items-center justify-between">
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)", letterSpacing: "0.5px" }}>
                {formatTime((videoRef.current?.currentTime) ?? 0)} / {formatTime(duration)}
              </p>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Lecture"}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "rgba(123,69,240,0.2)",
                  border: "1px solid rgba(123,69,240,0.3)",
                  color: "#A981FF",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPlaying
                  ? <Pause size={16} strokeWidth={1.5} />
                  : <Play size={16} strokeWidth={1.5} style={{ marginLeft: "2px" }} />
                }
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
