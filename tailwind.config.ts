import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0A0515",
          800: "#120926",
        },
        purple: {
          1: "#34117E",
          2: "#491AB1",
          3: "#6631DB",
          4: "#7B45F0",
          5: "#A981FF",
          6: "#B796FE",
          7: "#D0BCFC",
        },
        "white-80": "rgba(255,255,255,0.8)",
        "white-60": "rgba(255,255,255,0.6)",
        "white-40": "rgba(255,255,255,0.4)",
        "white-20": "rgba(255,255,255,0.2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(48px,10vw,80px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-chapter": ["clamp(36px,7vw,56px)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-1": ["clamp(28px,5vw,40px)", { lineHeight: "1.2" }],
        "heading-2": ["clamp(22px,4vw,28px)", { lineHeight: "1.2" }],
        "heading-3": ["clamp(18px,3vw,22px)", { lineHeight: "1.2" }],
        "body-large": ["clamp(16px,2.5vw,18px)", { lineHeight: "1.7" }],
        "body": ["clamp(15px,2.2vw,16px)", { lineHeight: "1.7" }],
        "body-small": ["clamp(13px,2vw,14px)", { lineHeight: "1.7" }],
        "caption": ["clamp(11px,1.8vw,12px)", { lineHeight: "1.4" }],
        "overline": ["clamp(10px,1.5vw,11px)", { lineHeight: "1.4", letterSpacing: "3px" }],
      },
      borderRadius: {
        card: "20px",
        "card-lg": "24px",
        img: "16px",
      },
      backdropBlur: {
        glass: "20px",
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0A0515 0%, #34117E 50%, #491AB1 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(52,17,126,0.25), rgba(73,26,177,0.1))",
        "gradient-accent":
          "linear-gradient(135deg, #7B45F0, #A981FF)",
        "gradient-overlay":
          "linear-gradient(180deg, transparent 40%, #0A0515 100%)",
        "gradient-hero-overlay":
          "linear-gradient(180deg, rgba(10,5,21,0.3) 0%, rgba(10,5,21,0.8) 70%, #0A0515 100%)",
      },
      boxShadow: {
        card: "0 8px 32px rgba(10,5,21,0.4)",
        "card-hover": "0 16px 48px rgba(123,69,240,0.15)",
        modal: "0 24px 64px rgba(10,5,21,0.6)",
        glow: "0 0 40px rgba(123,69,240,0.2)",
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
