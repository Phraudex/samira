import type { Metadata, Viewport } from "next";
import { cormorant, josefin } from "@/styles/fonts";
import "./globals.css";
import PwaInstallPrompt from "@/components/PwaInstallPrompt";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#060309",
  userScalable: false,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Samira",
  description: "Un livre numérique dédié à Samira",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Samira",
    startupImage: [
      // iPhone 16 Pro Max (440×956 logical, 3×)
      {
        url: "/splash/apple-splash-1320-2868.png",
        media:
          "(device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 15 Pro Max / 14 Pro Max (430×932 logical, 3×)
      {
        url: "/splash/apple-splash-1320-2868.png",
        media:
          "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 13 Pro Max / 12 Pro Max (428×926 logical, 3×)
      {
        url: "/splash/apple-splash-1320-2868.png",
        media:
          "(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 11 Pro Max / XS Max (414×896 logical, 3×)
      {
        url: "/splash/apple-splash-1320-2868.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 16 Pro (402×874 logical, 3×)
      {
        url: "/splash/apple-splash-1206-2622.png",
        media:
          "(device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 15 Pro / 15 / 14 Pro (393×852 logical, 3×)
      {
        url: "/splash/apple-splash-1179-2556.png",
        media:
          "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 14 / 13 Pro / 13 / 12 Pro / 12 (390×844 logical, 3×)
      {
        url: "/splash/apple-splash-1179-2556.png",
        media:
          "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 11 Pro / XS / X (375×812 logical, 3×)
      {
        url: "/splash/apple-splash-1179-2556.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      // iPhone 11 / XR (414×896 logical, 2×)
      {
        url: "/splash/apple-splash-750-1334.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      // iPhone SE 3 / SE 2 / 8 / 7 / 6s (375×667 logical, 2×)
      {
        url: "/splash/apple-splash-750-1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
    ],
  },
  other: {
    // iOS n'active la status bar translucide (`black-translucent`) QUE si ce tag
    // legacy est présent. Next.js 15 ne l'émet plus via `appleWebApp.capable`
    // (il n'émet que le `mobile-web-app-capable` moderne, ignoré par iOS pour ce
    // comportement). Sans ce tag, iOS dessine une status bar opaque remplie par
    // la theme-color → le bandeau sombre sous l'heure/réseau.
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${josefin.variable}`}
      style={{ backgroundColor: "#060309" }}
      suppressHydrationWarning
    >
      <head>
        <style>{`
          html, body {
            background-color: #060309 !important;
          }
        `}</style>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="preload" href="/images/bg_grid.jpg" as="image" />
        <link rel="preload" href="/images/samira/P35.jpg" as="image" />
      </head>
      <body className="font-body antialiased overflow-x-hidden" style={{ backgroundColor: "#060309" }}>
        {children}
        <PwaInstallPrompt />
      </body>
    </html>
  );
}
