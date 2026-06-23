"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause } from "lucide-react";
import { easings } from "@/lib/animations";

interface VideoPlayerProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export default function VideoPlayer({ src, isOpen, onClose, zIndex = 60 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const timeTextRef = useRef<HTMLParagraphElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  const isScrubbing = useRef(false);
  const wasPlaying = useRef(false);
  const pendingSeekTime = useRef<number | null>(null);
  const seekTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Autoplay video on open (user-initiated click context)
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch((err) => {
            console.log("Autoplay blocked or interrupted:", err);
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, src]);

  // Clean up timers on unmount
  useEffect(() => {
    const timeout = seekTimeout.current;
    const raf = rafRef.current;
    return () => {
      if (timeout) clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    setVideoError(null);
    setIsBuffering(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  const performSeek = useCallback((v: HTMLVideoElement, time: number) => {
    try {
      if (typeof v.fastSeek === "function") {
        v.fastSeek(time);
      } else {
        v.currentTime = time;
      }
    } catch {
      v.currentTime = time;
    }
  }, []);

  const handleSeeked = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setIsBuffering(false);

    if (pendingSeekTime.current !== null) {
      const timeToSeek = pendingSeekTime.current;
      pendingSeekTime.current = null;
      performSeek(v, timeToSeek);
    }
  }, [performSeek]);

  const handleTimeUpdate = useCallback(() => {
    if (isScrubbing.current) return;
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress(v.currentTime / v.duration);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const handleEnded = useCallback(() => setIsPlaying(false), []);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const bar = e.currentTarget;
    bar.setPointerCapture(e.pointerId);
    isScrubbing.current = true;

    // Pause playback during scrubbing to prioritize decoding resources
    if (!v.paused) {
      wasPlaying.current = true;
      v.pause();
    } else {
      wasPlaying.current = false;
    }

    const updateScrub = (clientX: number, isFinal = false) => {
      const rect = bar.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const targetTime = ratio * v.duration;

      // 1. Direct DOM updates (bypasses React render pipeline for absolute 120fps/60fps scrubbing)
      if (fillRef.current) {
        fillRef.current.style.transition = "none";
        fillRef.current.style.width = `${ratio * 100}%`;
      }
      if (handleRef.current) {
        handleRef.current.style.left = `${ratio * 100}%`;
      }
      if (timeTextRef.current) {
        timeTextRef.current.textContent = `${formatTime(targetTime)} / ${formatTime(v.duration)}`;
      }

      // 2. Queue seek to avoid pipeline flooding
      pendingSeekTime.current = targetTime;

      if (isFinal) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        if (seekTimeout.current) clearTimeout(seekTimeout.current);
        pendingSeekTime.current = null;
        
        // Final precise frame seek on release
        v.currentTime = targetTime;
        setProgress(ratio);
      } else {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          if (!v.seeking && pendingSeekTime.current !== null) {
            const timeToSeek = pendingSeekTime.current;
            pendingSeekTime.current = null;
            performSeek(v, timeToSeek);
          }
        });
      }
    };

    updateScrub(e.clientX);

    const onMove = (ev: PointerEvent) => {
      if (!isScrubbing.current) return;
      updateScrub(ev.clientX);
    };

    const onUp = (ev: PointerEvent) => {
      if (!isScrubbing.current) return;
      isScrubbing.current = false;

      updateScrub(ev.clientX, true);

      // Restore CSS transition for smooth normal playback
      if (fillRef.current) {
        fillRef.current.style.transition = "width 0.05s linear";
      }

      if (wasPlaying.current) {
        v.play().catch(() => {});
      }

      bar.removeEventListener("pointermove", onMove);
      bar.removeEventListener("pointerup", onUp);
      bar.removeEventListener("pointercancel", onUp);
    };

    bar.addEventListener("pointermove", onMove);
    bar.addEventListener("pointerup", onUp);
    bar.addEventListener("pointercancel", onUp);
  }, [performSeek]);

function formatTime(time: number) {
  if (isNaN(time)) return "00:00";
  const m = Math.floor(time / 60).toString().padStart(2, "0");
  const sec = Math.floor(time % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

interface ErrorDisplayProps {
  videoError: string | null;
  onRetry: () => void;
}

function ErrorDisplay({ videoError, onRetry }: ErrorDisplayProps) {
  if (!videoError) return null;
  return (
    <div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 px-6 text-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-red-400 text-sm font-body mb-4">{videoError}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRetry();
        }}
        className="px-4 py-2 bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600/50 text-purple-200 text-xs font-body rounded-lg transition-colors cursor-pointer"
      >
        Réessayer
      </button>
    </div>
  );
}

interface BufferingSpinnerProps {
  isBuffering: boolean;
  videoError: string | null;
}

function BufferingSpinner({ isBuffering, videoError }: BufferingSpinnerProps) {
  return (
    <AnimatePresence>
      {isBuffering && !videoError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-[3]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          <div
            className="animate-spin"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid rgba(169, 129, 255, 0.2)",
              borderTopColor: "#A981FF",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PlayOverlayProps {
  isPlaying: boolean;
  isScrubbing: boolean;
  videoError: string | null;
  togglePlay: () => void;
}

function PlayOverlay({ isPlaying, isScrubbing, videoError, togglePlay }: PlayOverlayProps) {
  return (
    <AnimatePresence>
      {!isPlaying && !isScrubbing && !videoError && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: easings.cinematic }}
          style={{ background: "rgba(0,0,0,0.25)" }}
          onClick={togglePlay}
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
  );
}

interface ProgressSliderProps {
  progress: number;
  fillRef: React.RefObject<HTMLDivElement | null>;
  handleRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
}

function ProgressSlider({ progress, fillRef, handleRef, onPointerDown }: ProgressSliderProps) {
  return (
    <div
      role="slider"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Progression vidéo"
      style={{
        position: "relative",
        height: "32px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
    >
      <div
        style={{
          width: "100%",
          height: "6px",
          background: "rgba(255,255,255,0.12)",
          borderRadius: "9999px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={fillRef}
          style={{
            height: "100%",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #7B45F0, #A981FF)",
            width: `${progress * 100}%`,
            transition: "width 0.05s linear",
          }}
        />
      </div>
      <div
        ref={handleRef}
        style={{
          position: "absolute",
          left: `${progress * 100}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "#A981FF",
          boxShadow: "0 0 8px rgba(123,69,240,0.5)",
          border: "2px solid rgba(255,255,255,0.9)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

interface ControlsRowProps {
  progress: number;
  duration: number;
  isPlaying: boolean;
  togglePlay: () => void;
  timeTextRef: React.RefObject<HTMLParagraphElement | null>;
}

function ControlsRow({ progress, duration, isPlaying, togglePlay, timeTextRef }: ControlsRowProps) {
  return (
    <div className="flex items-center justify-between">
      <p 
        ref={timeTextRef}
        style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-body)", letterSpacing: "0.5px" }}
      >
        {formatTime(progress * duration)} / {formatTime(duration)}
      </p>
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause" : "Lecture"}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(123,69,240,0.25)",
          border: "1px solid rgba(123,69,240,0.35)",
          color: "#A981FF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isPlaying
          ? <Pause size={18} strokeWidth={1.5} />
          : <Play size={18} strokeWidth={1.5} style={{ marginLeft: "2px" }} />
        }
      </button>
    </div>
  );
}

interface VideoPlayerRenderPortalProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isPlaying: boolean;
  setIsPlaying: (v: boolean) => void;
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
  handleEnded: () => void;
  setIsBuffering: (v: boolean) => void;
  handleSeeked: () => void;
  videoError: string | null;
  setVideoError: (err: string | null) => void;
  isBuffering: boolean;
  togglePlay: () => void;
  progress: number;
  fillRef: React.RefObject<HTMLDivElement | null>;
  handleRef: React.RefObject<HTMLDivElement | null>;
  handlePointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  duration: number;
  timeTextRef: React.RefObject<HTMLParagraphElement | null>;
  isScrubbingCurrent: boolean;
}

function VideoPlayerRenderPortal({
  src,
  isOpen,
  onClose,
  zIndex,
  videoRef,
  isPlaying,
  setIsPlaying,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleEnded,
  setIsBuffering,
  handleSeeked,
  videoError,
  setVideoError,
  isBuffering,
  togglePlay,
  progress,
  fillRef,
  handleRef,
  handlePointerDown,
  duration,
  timeTextRef,
  isScrubbingCurrent,
}: VideoPlayerRenderPortalProps) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easings.cinematic }}
          style={{ zIndex, background: "rgba(0,0,0,0.97)", touchAction: "none" }}
          onClick={onClose}
        >
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

          <motion.div
            className="relative flex flex-col"
            style={{ width: "min(90vw, calc(70dvh * 9 / 16), 400px)", maxHeight: "90dvh" }}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.35, ease: easings.cinematic }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "16px", background: "#000", aspectRatio: "9/16", width: "100%", cursor: "pointer" }}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                key={src}
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                onWaiting={() => setIsBuffering(true)}
                onPlaying={() => setIsBuffering(false)}
                onSeeking={() => setIsBuffering(true)}
                onSeeked={handleSeeked}
                onError={(e) => {
                  const v = e.currentTarget;
                  if (v.error) {
                    console.error("Video loading error:", v.error);
                    if (v.error.code === 4) {
                      setVideoError("Format non supporté ou accès réseau bloqué.");
                    } else if (v.error.code === 3) {
                      setVideoError("Décodage vidéo échoué.");
                    } else if (v.error.code === 2) {
                      setVideoError("Erreur réseau lors du chargement.");
                    } else {
                      setVideoError("Impossible de charger la vidéo.");
                    }
                  }
                }}
                style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
              >
                <source src={src} type="video/mp4" />
              </video>

              <ErrorDisplay
                videoError={videoError}
                onRetry={() => {
                  setVideoError(null);
                  if (videoRef.current) {
                    videoRef.current.load();
                  }
                }}
              />

              <BufferingSpinner isBuffering={isBuffering} videoError={videoError} />

              <PlayOverlay
                isPlaying={isPlaying}
                isScrubbing={isScrubbingCurrent}
                videoError={videoError}
                togglePlay={togglePlay}
              />
            </div>

            <div className="flex flex-col gap-3 mt-4 px-1">
              <ProgressSlider
                progress={progress}
                fillRef={fillRef}
                handleRef={handleRef}
                onPointerDown={handlePointerDown}
              />

              <ControlsRow
                progress={progress}
                duration={duration}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                timeTextRef={timeTextRef}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

  if (!mounted) return null;

  return (
    <VideoPlayerRenderPortal
      src={src}
      isOpen={isOpen}
      onClose={onClose}
      zIndex={zIndex}
      videoRef={videoRef}
      isPlaying={isPlaying}
      setIsPlaying={setIsPlaying}
      handleTimeUpdate={handleTimeUpdate}
      handleLoadedMetadata={handleLoadedMetadata}
      handleEnded={handleEnded}
      setIsBuffering={setIsBuffering}
      handleSeeked={handleSeeked}
      videoError={videoError}
      setVideoError={setVideoError}
      isBuffering={isBuffering}
      togglePlay={togglePlay}
      progress={progress}
      fillRef={fillRef}
      handleRef={handleRef}
      handlePointerDown={handlePointerDown}
      duration={duration}
      timeTextRef={timeTextRef}
      isScrubbingCurrent={isScrubbing.current}
    />
  );
}
