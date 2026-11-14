"use client";

import React, { useEffect, useRef } from "react";
import { audioManager } from "@/utils/audioManager";

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Automatically initialize and play background music on site visit
    audioManager.setupAutoplay(audioRef.current);
  }, []);

  return (
    <audio
      ref={audioRef}
      id="wedding-bg-audio"
      src="/music.mp3"
      autoPlay
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-9999px",
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0.01,
        pointerEvents: "none",
        zIndex: -1,
      }}
    />
  );
};
