"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, staggerContainer, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[1];

// Each tag: label, violet (true) or rose (false), Y offset in px
const tags = [
  { label: "Bienveillante", violet: true, yOffset: 0 },
  { label: "Généreuse", violet: false, yOffset: -10 },
  { label: "Inspirante", violet: true, yOffset: 6 },
  { label: "Rayonnante", violet: false, yOffset: -6 },
  { label: "Attentionnée", violet: true, yOffset: 10 },
  { label: "Authentique", violet: false, yOffset: -8 },
  { label: "Respectueuse", violet: true, yOffset: 4 },
  { label: "Sincère", violet: false, yOffset: -12 },
];

const violetTag = {
  background: "rgba(123,69,240,0.14)",
  border: "1px solid rgba(123,69,240,0.28)",
  color: "#A981FF",
};

const roseTag = {
  background: "rgba(232,114,159,0.12)",
  border: "1px solid rgba(232,114,159,0.28)",
  color: "#F4A6C6",
};

// Inline floral SVG — abstract 6-petal
function FloralSVG({ color, size = 120 }: { color: string; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const petalRx = size * 0.14;
  const petalRy = size * 0.28;
  const petalCy = size * 0.22;

  return (
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
  );
}

export default function Chapter2() {
  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "#060309" }}
      aria-labelledby="ch2-title"
    >
      {/* Organic blobs — decorative background */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "8%",
          left: "-6%",
          width: "320px",
          height: "290px",
          background: "rgba(73,26,177,0.08)",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          bottom: "8%",
          right: "-5%",
          width: "260px",
          height: "240px",
          background: "rgba(232,114,159,0.07)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          filter: "blur(60px)",
        }}
      />

      {/* Floral decoration — top right */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ top: "4%", right: "3%", opacity: 0.09 }}
      >
        <FloralSVG color="#7B45F0" size={140} />
      </div>

      {/* Floral decoration — bottom left (rose) */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{ bottom: "3%", left: "2%", opacity: 0.07 }}
      >
        <FloralSVG color="#E8729F" size={110} />
      </div>

      <div
        className="relative z-[1] px-5 lg:px-20"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <ChapterHeader number={2} title={chapter.title} />

        {/* Body text */}
        <motion.p
          className="font-body font-light text-center mx-auto mb-14"
          style={{
            fontSize: "clamp(14px, 1.1vw, 16px)",
            lineHeight: "1.85",
            color: "rgba(255,255,255,0.65)",
            maxWidth: "600px",
          }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {chapter.content}
        </motion.p>

        {/* Floating tags — staggered reveal */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          style={{ rowGap: "0px" }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {tags.map((tag) => (
            <motion.span
              key={tag.label}
              variants={fadeUp}
              className="font-body font-medium"
              style={{
                ...(tag.violet ? violetTag : roseTag),
                display: "inline-block",
                padding: "8px 18px",
                borderRadius: "9999px",
                fontSize: "12px",
                letterSpacing: "0.5px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                transform: `translateY(${tag.yOffset}px)`,
                marginTop: "12px",
              }}
            >
              {tag.label}
            </motion.span>
          ))}
        </motion.div>

        {/* Photos — asymmetric layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {/* Large — P19 */}
          <motion.div
            className="col-span-2 lg:col-span-1 relative"
            style={{ height: "260px", borderRadius: "16px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Image
              src="/images/samira/P19.png"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 100vw, 33vw"
              className="object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </motion.div>

          {/* P22 */}
          <motion.div
            className="relative"
            style={{ height: "200px", borderRadius: "16px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P22.png"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* P25 */}
          <motion.div
            className="relative"
            style={{ height: "200px", borderRadius: "16px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.2, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P25.png"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* P47 */}
          <motion.div
            className="relative"
            style={{ height: "180px", borderRadius: "16px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P47.JPG"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* P10 */}
          <motion.div
            className="relative"
            style={{ height: "180px", borderRadius: "16px", overflow: "hidden" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.25, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P10.JPG"
              alt="Samira"
              fill
              sizes="(max-width:1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
