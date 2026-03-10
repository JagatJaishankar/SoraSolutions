"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export default function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false);
  const firedRef = useRef(false);

  const handleMouseLeave = useCallback((e) => {
    if (firedRef.current) return;
    if (e.clientY <= 0) {
      firedRef.current = true;
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [handleMouseLeave]);

  return { showPopup, setShowPopup };
}
