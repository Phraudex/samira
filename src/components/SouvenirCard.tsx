"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { fadeUp, easings } from "@/lib/animations";
import type { BibliothequeItem } from "@/data/content";

interface SouvenirCardProps {
  item: BibliothequeItem;
  index: number;
  onClick: () => void;
}

export default function SouvenirCard({
  item,
  index,
  onClick,
}: SouvenirCardProps) {
  const thumbnail = item.photos[0] ?? null;
  const hasVideos = item.videos.length > 0;
  const photoCount = item.photos.length;
  const videoCount = item.videos.length;
  const countText = [
    photoCount > 0 ? `${photoCount} photo${photoCount > 1 ? "s" : ""}` : "",
    videoCount > 0 ? `${videoCount} vidéo${videoCount > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.button
      variants={fadeUp}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, rgba(52,17,126,0.22), rgba(73,26,177,0.1))",
        border: "1px solid rgba(123,69,240,0.12)",
        boxShadow: "0 8px 32px rgba(10,5,21,0.4)",
        cursor: "pointer",
        textAlign: "left",
        padding: 0,
        width: "100%",
      }}
      aria-label={`Ouvrir ${item.titre}`}
      whileHover={{
        boxShadow: "0 16px 48px rgba(123,69,240,0.15)",
        borderColor: "rgba(123,69,240,0.25)",
        transition: { duration: 0.25, ease: easings.cinematic },
      }}
      transition={{
        delay: index * 0.02,
        duration: 0.4,
        ease: easings.cinematic,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3/4",
          background:
            "linear-gradient(135deg, rgba(52,17,126,0.4), rgba(6,3,9,0.8))",
          overflow: "hidden",
        }}
      >
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={item.titre}
            fill
            className="object-cover"
            sizes="(max-width:1024px) 50vw, 33vw"
          />
        ) : hasVideos ? (
          <>
            <video
              src={`${item.videos[0]}#t=0.5`}
              preload="metadata"
              playsInline
              muted
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.6,
                pointerEvents: "none",
              }}
            />
            {/* Play overlay button on top of the video thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center z-[2]">
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "rgba(123, 69, 240, 0.8)",
                  border: "1px solid rgba(123, 69, 240, 0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 16px rgba(123,69,240,0.4)",
                }}
              >
                <Play
                  size={18}
                  strokeWidth={1.5}
                  fill="white"
                  style={{ color: "white", marginLeft: "2px" }}
                />
              </div>
            </div>
          </>
        ) : (
          // Video-only series fallback (if neither photos nor videos)
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(123, 69, 240, 0.3)",
                border: "1px solid rgba(123, 69, 240, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Play
                size={20}
                strokeWidth={1.5}
                fill="#A981FF"
                style={{ color: "#A981FF", marginLeft: "2px" }}
              />
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(6,3,9,0.65) 100%)",
          }}
        />

        {/* Video badge */}
        {hasVideos && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "rgba(214, 72, 138, 0.2)",
              border: "1px solid rgba(214, 72, 138, 0.3)",
              borderRadius: "9999px",
              padding: "3px 8px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <Play
              size={10}
              strokeWidth={1.5}
              fill="#F4A6C6"
              style={{ color: "#F4A6C6" }}
            />
            <span
              style={{
                fontSize: "9px",
                color: "#F4A6C6",
                fontFamily: "var(--font-body)",
                letterSpacing: "0.5px",
              }}
            >
              {videoCount}
            </span>
          </div>
        )}
      </div>

      {/* Card info */}
      <div className="flex flex-col gap-1 p-3 w-full">
        <p
          className="font-display font-normal text-white leading-tight"
          style={{
            fontSize: "clamp(13px, 2.5vw, 16px)",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {item.titre}
        </p>
        <p
          className="font-body"
          style={{
            fontSize: "10px",
            color: "rgba(169, 129, 255, 0.55)",
            letterSpacing: "0.3px",
            lineHeight: 1.4,
          }}
        >
          {countText}
        </p>
      </div>
    </motion.button>
  );
}
