"use client";

import React, { useEffect } from "react";
import { audioManager } from "@/utils/audioManager";
import { useWeddingAudio } from "@/utils/useWeddingAudio";
import { Volume2, VolumeX } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const { isPlaying, toggle } = useWeddingAudio();

  useEffect(() => {
    // Attempt autoplay or attach first-interaction listener
    audioManager.setupAutoplay();
  }, []);

  return null; // The visible controls are now directly embedded in Navbar & Floating Drawer for 100% clickability and zero z-index conflicts
};
