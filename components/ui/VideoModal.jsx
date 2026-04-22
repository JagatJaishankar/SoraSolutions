"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function VideoModal({ isOpen, onClose, title, videoUrl, videoSrc }) {
  const modalVideoRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (!modalVideoRef.current || !videoSrc) return;
    if (isOpen) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {});
    } else {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
  }, [isOpen, videoSrc]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-[96vw] max-w-[1600px] rounded-2xl overflow-hidden bg-black"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-opacity duration-200 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {videoSrc ? (
              <div className="aspect-video">
                <video
                  ref={modalVideoRef}
                  src={videoSrc}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full"
                />
              </div>
            ) : videoUrl ? (
              <div className="aspect-video">
                <iframe
                  src={videoUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={title ?? "Video"}
                />
              </div>
            ) : (
              <div className="aspect-video flex flex-col items-center justify-center bg-gradient-to-br from-[#090b3c] to-[#222872]">
                <p className="text-white/50 text-lg font-light">
                  Video coming soon
                </p>
                {title && (
                  <p className="text-white/30 text-sm font-light mt-2">
                    {title}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
