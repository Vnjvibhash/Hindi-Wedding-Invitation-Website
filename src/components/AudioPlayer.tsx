"use client";

import React, { useEffect } from "react";
import { audioManager } from "@/utils/audioManager";
import { useWeddingAudio } from "@/utils/useWeddingAudio";
import { Music, Play } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const { isPlaying, isWaitingForGesture, play } = useWeddingAudio();

  useEffect(() => {
    // Attempt autoplay immediately on page open
    audioManager.setupAutoplay();
    play();
  }, []);

  if (!isWaitingForGesture || isPlaying) {
    return null;
  }

  return (
    <aside
      aria-label="विवाह संगीत सूचना"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[92vw] animate-bounce"
    >
      <button
        onClick={() => play()}
        type="button"
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-maroon-900 via-maroon-850 to-maroon-900 text-gold-200 border-2 border-gold-400 shadow-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-semibold tracking-wide"
      >
        <div className="w-6 h-6 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-300">
          <Music className="w-3.5 h-3.5 animate-pulse" />
        </div>
        <span>🎶 विवाह संगीत सुनने के लिए यहाँ टच करें</span>
        <Play className="w-3.5 h-3.5 text-gold-400 fill-gold-400 ml-0.5" />
      </button>
    </aside>
  );
};
