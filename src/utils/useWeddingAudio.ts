"use client";

import { useSyncExternalStore } from "react";
import { audioManager } from "./audioManager";

function subscribe(callback: () => void) {
  return audioManager.subscribe(callback);
}

function getIsPlayingSnapshot() {
  return audioManager.getIsPlaying();
}

function getIsWaitingSnapshot() {
  return audioManager.getIsWaitingForGesture();
}

const getServerSnapshot = () => false;

export function useWeddingAudio() {
  const isPlaying = useSyncExternalStore(subscribe, getIsPlayingSnapshot, getServerSnapshot);
  const isWaitingForGesture = useSyncExternalStore(subscribe, getIsWaitingSnapshot, getServerSnapshot);

  return {
    isPlaying,
    isWaitingForGesture,
    play: () => audioManager.play(),
    pause: () => audioManager.pause(),
    toggle: () => audioManager.toggle(),
  };
}
