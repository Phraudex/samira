"use client";

import React from "react";

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className = "",
  style = {},
}: GlassCardProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "rgba(52, 17, 126, 0.15)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(123, 69, 240, 0.12)",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(10, 5, 21, 0.4)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
