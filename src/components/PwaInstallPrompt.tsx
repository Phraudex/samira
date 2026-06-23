"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share, PlusSquare, X, Download, Sparkles } from "lucide-react";
import Image from "next/image";

const DISMISS_KEY = "samira-pwa-dismissed-until";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PwaInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [platform, setPlatform] = useState<"ios" | "android" | "other">("other");

  useEffect(() => {
    // 1. Detect if running in standalone/installed mode
    const isStandalone = () => {
      if (typeof window === "undefined") return false;
      
      const isStandaloneMedia = window.matchMedia("(display-mode: standalone)").matches;
      const isIosStandalone = 
        "standalone" in window.navigator &&
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
      const hasQueryParam = new URLSearchParams(window.location.search).get("standalone") === "true";
      
      return isStandaloneMedia || isIosStandalone || hasQueryParam;
    };

    if (isStandalone()) {
      return;
    }

    // 2. Detect platform
    const getPlatform = () => {
      const ua = window.navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) return "ios";
      if (/android/.test(ua)) return "android";
      return "other";
    };
    
    const currentPlatform = getPlatform();
    setPlatform(currentPlatform);

    // 3. Check dismiss storage
    const isDismissed = () => {
      const dismissedUntil = localStorage.getItem(DISMISS_KEY);
      if (!dismissedUntil) return false;
      return Date.now() < parseInt(dismissedUntil, 10);
    };

    if (isDismissed()) {
      return;
    }

    // 4. Register event listener for Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 5. Show prompt immediately for iOS Safari (since it doesn't trigger beforeinstallprompt)
    if (currentPlatform === "ios") {
      // Small delay to let the page load smoothly
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (platform === "ios") {
      setShowIosModal(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          setShowPrompt(false);
        }
        setDeferredPrompt(null);
      });
    } else {
      // Fallback: show info on how to install
      setShowIosModal(true);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Dismiss for 7 days
    const nextPromptDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISS_KEY, nextPromptDate.toString());
  };

  if (!showPrompt) return null;

  return (
    <>
      <AnimatePresence>
        {showPrompt && !showIosModal && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-[9999]"
          >
            <div 
              className="p-4 rounded-2xl relative shadow-2xl"
              style={{
                background: "rgba(18, 9, 38, 0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(123, 69, 240, 0.15)",
                boxShadow: "0 12px 40px rgba(10, 5, 21, 0.5), 0 0 30px rgba(123, 69, 240, 0.15)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute top-3 right-3 text-white-40 hover:text-white-80 transition-colors p-1 rounded-full hover:bg-white/5"
                aria-label="Fermer"
              >
                <X size={16} />
              </button>

              <div className="flex gap-4 items-center pr-6">
                {/* App Icon */}
                <div 
                  className="w-12 h-12 rounded-xl flex-shrink-0 relative overflow-hidden"
                  style={{
                    border: "1px solid rgba(123, 69, 240, 0.2)",
                  }}
                >
                  <Image
                    src="/icon-192.png"
                    alt="Samira"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5 font-body">
                    Installer Samira
                    <Sparkles size={12} className="text-[#a981ff] animate-pulse" />
                  </h4>
                  <p className="text-xs text-white-60 font-light mt-0.5 leading-relaxed">
                    {"Installez l'œuvre numérique sur votre écran pour une expérience immersive plein écran."}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleDismiss}
                  className="flex-1 py-2 px-3 text-xs font-medium text-white-60 rounded-xl hover:bg-white/5 transition-colors"
                >
                  Plus tard
                </button>
                <button
                  onClick={handleInstallClick}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-white rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #7B45F0 0%, #A981FF 100%)",
                    boxShadow: "0 4px 12px rgba(123, 69, 240, 0.3)",
                  }}
                >
                  <Download size={14} />
                  Installer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* iOS Steps Modal / Drawer */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="w-full max-w-sm rounded-3xl p-6 relative overflow-hidden shadow-2xl"
              style={{
                background: "rgba(12, 6, 25, 0.9)",
                border: "1px solid rgba(123, 69, 240, 0.25)",
                boxShadow: "0 24px 64px rgba(10, 5, 21, 0.6), 0 0 40px rgba(123, 69, 240, 0.2)",
              }}
            >
              {/* Close X */}
              <button
                onClick={() => setShowIosModal(false)}
                className="absolute top-4 right-4 text-white-40 hover:text-white-80 transition-colors p-1.5 rounded-full hover:bg-white/5"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-6">
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-3 relative overflow-hidden flex-shrink-0"
                  style={{
                    border: "1px solid rgba(123, 69, 240, 0.3)",
                    boxShadow: "0 8px 24px rgba(123, 69, 240, 0.25)",
                  }}
                >
                  <Image
                    src="/icon-192.png"
                    alt="Samira"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white font-body">Installer sur iOS</h3>
                <p className="text-xs text-white-40 font-light mt-1">
                  {"Suivez ces étapes simples sur Safari pour installer l'application :"}
                </p>
              </div>

              {/* Instructions steps */}
              <div className="space-y-4 text-white-80 text-sm">
                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#7B45F0]/20 flex items-center justify-center text-[#B796FE] font-bold text-xs flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-white text-xs">{"Ouvrir le menu de partage"}</p>
                    <p className="text-[11px] text-white-60 font-light mt-0.5 flex items-center gap-1 flex-wrap">
                      {"Appuyez sur le bouton de partage"}
                      <span className="inline-flex items-center justify-center p-1 rounded bg-white/10 text-white">
                        <Share size={12} />
                      </span>
                      {"dans la barre de navigation de Safari."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#7B45F0]/20 flex items-center justify-center text-[#B796FE] font-bold text-xs flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-white text-xs">{"Ajouter à l'écran d'accueil"}</p>
                    <p className="text-[11px] text-white-60 font-light mt-0.5 flex items-center gap-1 flex-wrap">
                      {"Faites défiler vers le bas et sélectionnez"}
                      <span className="inline-flex items-center justify-center p-1 rounded bg-white/10 text-white gap-1 font-mono text-[10px]">
                        <PlusSquare size={12} /> {"Sur l'écran d'accueil"}
                      </span>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-6 h-6 rounded-full bg-[#7B45F0]/20 flex items-center justify-center text-[#B796FE] font-bold text-xs flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-white text-xs">{"Valider l'installation"}</p>
                    <p className="text-[11px] text-white-60 font-light mt-0.5">
                      {"Appuyez sur "}
                      <strong className="text-white font-medium">Ajouter</strong>
                      {" en haut à droite pour finaliser."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => {
                  setShowIosModal(false);
                  handleDismiss(); // Save dismissal since they've seen/executed the workflow
                }}
                className="w-full mt-6 py-3 px-4 rounded-xl text-xs font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-center block"
                style={{
                  background: "linear-gradient(135deg, #7B45F0 0%, #A981FF 100%)",
                  boxShadow: "0 4px 16px rgba(123, 69, 240, 0.3)",
                }}
              >
                {"C'est compris"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
