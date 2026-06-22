"use client";

import React from "react";

interface FloralDecorProps {
  color: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FloralDecor({
  color,
  size = 120,
  className = "",
  style = {},
}: FloralDecorProps) {
  const cx = size / 2;
  const cy = size / 2;
  const petalRx = size * 0.14;
  const petalRy = size * 0.28;
  const petalCy = size * 0.22;

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
      >
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx={cx}
            cy={petalCy}
            rx={petalRx}
            ry={petalRy}
            fill={color}
            transform={`rotate(${deg} ${cx} ${cy})`}
            opacity="0.75"
          />
        ))}
        <circle cx={cx} cy={cy} r={size * 0.11} fill={color} opacity="0.9" />
      </svg>
    </div>
  );
}
