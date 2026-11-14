/**
 * Global Audio Manager for Wedding Music.
 * Handles audio playback, autoplay on page open, user gesture fallback,
 * and state synchronization across Navbar, Floating Celebration Drawer, and AudioPlayer.
 */

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private isWaitingForGestureState = false;
  private userExplicitlyStopped = false;
  private listeners: Set<() => void> = new Set();
  private gestureListenersAttached = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.preload = "auto";
    this.audio.volume = 0.75;

    // Support AAC/m4a first, fallback to mp3
    const canPlayM4A = this.audio.canPlayType("audio/mp4; codecs=mp4a.40.2");
    if (canPlayM4A) {
      this.audio.src = "/music.m4a";
    } else {
      this.audio.src = "/music.mp3";
    }

    this.audio.addEventListener("play", () => {
      this.isPlayingState = true;
      this.isWaitingForGestureState = false;
      this.cleanupGestureListeners();
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

  public getIsWaitingForGesture(): boolean {
    return this.isWaitingForGestureState && !this.isPlayingState && !this.userExplicitlyStopped;
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
    this.userExplicitlyStopped = false;
    this.initAudio();
    if (!this.audio) return false;

    try {
      await this.audio.play();
      this.isPlayingState = true;
      this.isWaitingForGestureState = false;
      this.cleanupGestureListeners();
      this.notify();
      return true;
    } catch {
      this.isPlayingState = false;
      this.isWaitingForGestureState = true;
      this.notify();
      this.attachGestureListeners();
      return false;
    }
  }

  public pause() {
    this.userExplicitlyStopped = true;
    this.isWaitingForGestureState = false;
    this.cleanupGestureListeners();
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

  /**
   * Called on page mount.
   * By default, music should be played in background when user opens the website.
   */
  public setupAutoplay() {
    if (typeof window === "undefined") return;

    // Clear any past localStorage mute flags so every new visit defaults to playing
    localStorage.removeItem("wedding_music_muted");
    this.userExplicitlyStopped = false;

    this.initAudio();
    if (!this.audio) return;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlayingState = true;
          this.isWaitingForGestureState = false;
          this.notify();
        })
        .catch((err) => {
          // Autoplay blocked by browser policy -> wait for first user gesture
          console.log("Autoplay waiting for user gesture:", err?.name);
          this.isPlayingState = false;
          this.isWaitingForGestureState = true;
          this.notify();
          this.attachGestureListeners();
        });
    }
  }

  private handleGesture = () => {
    if (this.userExplicitlyStopped) {
      this.cleanupGestureListeners();
      return;
    }

    if (this.audio && !this.isPlayingState) {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlayingState = true;
            this.isWaitingForGestureState = false;
            this.cleanupGestureListeners();
            this.notify();
          })
          .catch(() => {
            // Wait for next interaction
          });
      }
    } else if (this.isPlayingState) {
      this.cleanupGestureListeners();
    }
  };

  private attachGestureListeners() {
    if (this.gestureListenersAttached || this.userExplicitlyStopped) return;
    this.gestureListenersAttached = true;

    const opts = { capture: true, passive: true };
    window.addEventListener("pointerdown", this.handleGesture, opts);
    window.addEventListener("touchstart", this.handleGesture, opts);
    window.addEventListener("touchend", this.handleGesture, opts);
    window.addEventListener("click", this.handleGesture, opts);
    window.addEventListener("keydown", this.handleGesture, opts);
  }

  private cleanupGestureListeners() {
    if (!this.gestureListenersAttached) return;
    const opts = { capture: true };
    window.removeEventListener("pointerdown", this.handleGesture, opts);
    window.removeEventListener("touchstart", this.handleGesture, opts);
    window.removeEventListener("touchend", this.handleGesture, opts);
    window.removeEventListener("click", this.handleGesture, opts);
    window.removeEventListener("keydown", this.handleGesture, opts);
    this.gestureListenersAttached = false;
  }
}

export const audioManager = new WeddingAudioManager();
