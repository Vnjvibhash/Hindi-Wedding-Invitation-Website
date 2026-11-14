"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (synthCtxRef.current && synthCtxRef.current.state !== "closed") {
        synthCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Web Audio fallback synthesizer for a peaceful wedding shehnai/tanpura scale
  const startSynthMelody = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      // Raag Bilawal / Bhairav auspicious scale (Sa, Re, Ga, Ma, Pa, Dha, Ni, Sa)
      const notes = [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88, 523.25];
      let step = 0;

      const playNote = () => {
        if (!synthCtxRef.current || synthCtxRef.current.state === "closed") return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = notes[step % notes.length];
        step = (step + 1) % notes.length;

        osc.type = "sawtooth"; // Reed-like harmonics
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.3);
      };

      playNote();
      synthIntervalRef.current = setInterval(playNote, 1400);
    } catch {
      // Audio context not allowed or failed
    }
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current && synthCtxRef.current.state !== "closed") {
      synthCtxRef.current.close().catch(() => {});
      synthCtxRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // If native play fails or blocked, start synthesizer fallback
            startSynthMelody();
            setIsPlaying(true);
          });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto" aria-hidden="true">
        <source src="/music.m4a" type="audio/mp4" />
        <source src="/music.mp3" type="audio/mpeg" />
        <source src="/music.wav" type="audio/wav" />
      </audio>

      <button
        onClick={toggleMusic}
        type="button"
        className={`fixed top-4 right-16 sm:right-20 z-40 p-2 sm:px-3 sm:py-2 rounded-full border shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium ${
          isPlaying
            ? "bg-maroon-800 text-gold-300 border-gold-500 shadow-gold ring-2 ring-gold-400/50"
            : "bg-cream-100/90 dark:bg-darkbg-850/90 text-maroon-900 dark:text-gold-200 border-gold-400/40 hover:border-gold-500 hover:bg-gold-500/10"
        } backdrop-blur-md`}
        aria-label={isPlaying ? "मांगलिक शहनाई संगीत बंद करें" : "मांगलिक शहनाई संगीत बजाएं"}
        title={isPlaying ? "मांगलिक संगीत बंद करें" : "मांगलिक शहनाई संगीत बजाएं"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-center gap-0.5 h-3.5 px-0.5">
              <span className="w-0.5 h-3 bg-gold-400 animate-pulse" />
              <span className="w-0.5 h-2 bg-saffron-400 animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-gold-400 animate-pulse delay-150" />
            </div>
            <Volume2 className="w-4 h-4 text-gold-400" />
            <span className="hidden md:inline font-semibold">शहनाई चालू</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-maroon-700 dark:text-gold-400" />
            <span className="hidden md:inline font-semibold">शहनाई संगीत</span>
          </>
        )}
      </button>
    </>
  );
};
