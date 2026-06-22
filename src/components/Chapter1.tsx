"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ChapterHeader from "./ChapterHeader";
import { fadeUp, slideLeft, slideRight, viewportConfig, easings } from "@/lib/animations";
import { content } from "@/data/content";

const chapter = content.chapters[0];

export default function Chapter1() {
  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ background: "#060309" }}
      aria-labelledby="ch1-title"
    >
      {/* ═══ MOBILE (<lg) ═══ */}
      <div className="lg:hidden px-5">
        <ChapterHeader number={1} title={chapter.title} />

        {/* Dominant photo */}
        <motion.div
          className="relative w-full mb-8"
          style={{ height: "72vw", borderRadius: "16px", overflow: "hidden" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <Image
            src="/images/samira/P03.jpg"
            alt="Samira"
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "center 32%" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, transparent 55%, rgba(6,3,9,0.55) 100%)",
            }}
          />
        </motion.div>

        {/* Text block */}
        <motion.p
          className="font-body font-light mb-8"
          style={{ fontSize: "15px", lineHeight: "1.8", color: "rgba(255,255,255,0.68)" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {chapter.content}
        </motion.p>

        {/* Blockquote */}
        {chapter.quote && (
          <motion.blockquote
            className="relative pl-5 mb-12"
            style={{ borderLeft: "1px solid #7B45F0" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <p
              className="font-display italic"
              style={{ fontSize: "18px", lineHeight: "1.55", color: "#A981FF" }}
            >
              &ldquo;{chapter.quote}&rdquo;
            </p>
          </motion.blockquote>
        )}

        {/* Secondary photos — asymmetric 2-col */}
        <div className="flex gap-3">
          <motion.div
            className="relative"
            style={{ flex: "1.6", height: "200px", borderRadius: "12px", overflow: "hidden" }}
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Image
              src="/images/samira/P43.JPG"
              alt="Samira"
              fill
              sizes="55vw"
              className="object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-3" style={{ flex: "1" }}>
            <motion.div
              className="relative"
              style={{ height: "95px", borderRadius: "12px", overflow: "hidden" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Image
                src="/images/samira/P46.JPG"
                alt="Samira"
                fill
                sizes="35vw"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
            </motion.div>
            <motion.div
              className="relative"
              style={{ height: "95px", borderRadius: "12px", overflow: "hidden" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              transition={{ delay: 0.1, duration: 0.6, ease: easings.cinematic }}
            >
              <Image
                src="/images/samira/P11.JPG"
                alt="Samira"
                fill
                sizes="35vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ═══ DESKTOP (lg+) ═══ */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: "45% 55%",
          gap: "80px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 80px",
        }}
      >
        {/* Left — text */}
        <div className="flex flex-col justify-center">
          <ChapterHeader number={1} title={chapter.title} align="left" />

          <motion.p
            className="font-body font-light mb-10"
            style={{ fontSize: "16px", lineHeight: "1.85", color: "rgba(255,255,255,0.68)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {chapter.content}
          </motion.p>

          {chapter.quote && (
            <motion.blockquote
              className="relative pl-6 mb-12"
              style={{ borderLeft: "1px solid #7B45F0" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <p
                className="font-display italic"
                style={{ fontSize: "20px", lineHeight: "1.55", color: "#A981FF" }}
              >
                &ldquo;{chapter.quote}&rdquo;
              </p>
            </motion.blockquote>
          )}

          {/* Two small photos, asymmetric heights */}
          <div className="flex gap-4 items-end">
            <motion.div
              className="relative"
              style={{ flex: "1.5", height: "170px", borderRadius: "12px", overflow: "hidden" }}
              variants={slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Image
                src="/images/samira/P46.JPG"
                alt="Samira"
                fill
                sizes="22vw"
                className="object-cover"
                style={{ objectPosition: "center top" }}
              />
            </motion.div>
            <motion.div
              className="relative"
              style={{
                flex: "1",
                height: "125px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "10px",
              }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
            >
              <Image
                src="/images/samira/P11.JPG"
                alt="Samira"
                fill
                sizes="18vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Right — dominant + P43 */}
        <div className="flex flex-col gap-5">
          <motion.div
            className="relative w-full"
            style={{ height: "520px", borderRadius: "20px", overflow: "hidden" }}
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            <Image
              src="/images/samira/P03.jpg"
              alt="Samira"
              fill
              sizes="55vw"
              className="object-cover"
              style={{ objectPosition: "center 32%" }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(6,3,9,0.45) 100%)",
              }}
            />
          </motion.div>

          <motion.div
            className="relative"
            style={{
              height: "220px",
              width: "72%",
              borderRadius: "16px",
              overflow: "hidden",
              marginLeft: "auto",
            }}
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.15, duration: 0.6, ease: easings.cinematic }}
          >
            <Image
              src="/images/samira/P43.JPG"
              alt="Samira"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
