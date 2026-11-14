/**
 * Global Audio Manager for Wedding Music.
 * Handles audio playback, autoplay, user gestures, and state synchronization
 * across Navbar, Floating Celebration Drawer, and any page interaction.
 */

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private listeners: Set<() => void> = new Set();
  private gestureListenersAttached = false;
  private userExplicitlyMuted = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.userExplicitlyMuted = localStorage.getItem("wedding_music_muted") === "true";
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = "auto";

    // Support AAC/m4a first (fast 1.4MB load), fallback to mp3
    const canPlayM4A = this.audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
    if (canPlayM4A) {
      this.audio.src = "/music.m4a";
    } else {
      this.audio.src = "/music.mp3";
    }

    this.audio.addEventListener("play", () => {
      this.isPlayingState = true;
      this.notify();
    });

    this.audio.addEventListener("pause", () => {
      this.isPlayingState = false;
      this.notify();
    });

    this.audio.addEventListener("ended", () => {
      this.isPlayingState = false;
      this.notify();
    });
  }

  public getIsPlaying(): boolean {
    return this.isPlayingState;
  }

  public isMutedByUser(): boolean {
    return this.userExplicitlyMuted;
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wedding_audio_changed"));
    }
  }

  public async play(): Promise<boolean> {
    this.userExplicitlyMuted = false;
    if (typeof window !== "undefined") {
      localStorage.removeItem("wedding_music_muted");
    }

    this.initAudio();
    if (!this.audio) return false;

    try {
      await this.audio.play();
      this.isPlayingState = true;
      this.notify();
      return true;
    } catch {
      this.isPlayingState = false;
      this.notify();
      this.setupFirstInteractionAutoplay();
      return false;
    }
  }

  public pause() {
    this.userExplicitlyMuted = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("wedding_music_muted", "true");
    }

    if (this.audio) {
      this.audio.pause();
    }
    this.isPlayingState = false;
    this.notify();
  }

  public toggle() {
    if (this.isPlayingState) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setupAutoplay() {
    if (typeof window === "undefined") return;
    if (this.userExplicitlyMuted) return;

    this.initAudio();
    if (this.audio) {
      this.audio
        .play()
        .then(() => {
          this.isPlayingState = true;
          this.notify();
        })
        .catch(() => {
          // Autoplay blocked by browser policy -> wait for first user gesture
          this.setupFirstInteractionAutoplay();
        });
    }
  }

  private setupFirstInteractionAutoplay() {
    if (this.gestureListenersAttached || this.userExplicitlyMuted) return;
    this.gestureListenersAttached = true;

    const onFirstUserInteraction = () => {
      if (!this.userExplicitlyMuted && !this.isPlayingState) {
        this.play();
      }
      this.cleanupGestureListeners();
    };

    window.addEventListener("click", onFirstUserInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", onFirstUserInteraction, { once: true, passive: true });
    window.addEventListener("scroll", onFirstUserInteraction, { once: true, passive: true });
    window.addEventListener("keydown", onFirstUserInteraction, { once: true, passive: true });
  }

  private cleanupGestureListeners() {
    this.gestureListenersAttached = false;
  }
}

export const audioManager = new WeddingAudioManager();
