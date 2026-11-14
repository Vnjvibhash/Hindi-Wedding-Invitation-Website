"use client";

import React, { useEffect, useRef } from "react";
import { audioManager } from "@/utils/audioManager";

export const AudioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Automatically initialize and play background music
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
      className="hidden"
      aria-hidden="true"
    />
  );
};
