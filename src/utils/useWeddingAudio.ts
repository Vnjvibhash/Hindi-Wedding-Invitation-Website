"use client";

import { useSyncExternalStore } from "react";
import { audioManager } from "./audioManager";

function subscribe(callback: () => void) {
  return audioManager.subscribe(callback);
}

function getSnapshot() {
  return audioManager.getIsPlaying();
}

const getServerSnapshot = () => false;

export function useWeddingAudio() {
  const isPlaying = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    isPlaying,
    play: () => audioManager.play(),
    pause: () => audioManager.pause(),
    toggle: () => audioManager.toggle(),
  };
}
