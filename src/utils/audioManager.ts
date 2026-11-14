/**
 * Global Audio Manager for Wedding Music.
 * Handles automatic background music on page open, silent user gesture fallback,
 * and state synchronization for the floating celebration controls.
 */

class WeddingAudioManager {
  private audio: HTMLAudioElement | null = null;
  private isPlayingState = false;
  private userExplicitlyStopped = false;
  private listeners: Set<() => void> = new Set();
  private gestureListenersAttached = false;

  constructor() {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("wedding_music_muted");
      } catch {
        // Ignore in private/restricted storage
      }
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlayingState;
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

  public setAudioElement(el: HTMLAudioElement | null) {
    if (!el || this.audio === el) return;
    this.audio = el;
    this.audio.loop = true;
    this.audio.volume = 0.75;

    this.audio.addEventListener("play", () => {
      this.isPlayingState = true;
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

  private initFallbackAudio() {
    if (this.audio) return;
    const a = new Audio();
    a.src = "/music.mp3";
    this.setAudioElement(a);
  }

  public async play(): Promise<boolean> {
    this.userExplicitlyStopped = false;
    this.initFallbackAudio();
    if (!this.audio) return false;

    try {
      await this.audio.play();
      this.isPlayingState = true;
      this.cleanupGestureListeners();
      this.notify();
      return true;
    } catch {
      this.isPlayingState = false;
      this.notify();
      this.attachGestureListeners();
      return false;
    }
  }

  public pause() {
    this.userExplicitlyStopped = true;
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
   * Automatically play background music on page open.
   */
  public setupAutoplay(element?: HTMLAudioElement | null) {
    if (typeof window === "undefined") return;

    if (element) {
      this.setAudioElement(element);
    } else {
      this.initFallbackAudio();
    }

    this.userExplicitlyStopped = false;

    // Attempt immediate silent play
    if (this.audio) {
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          this.isPlayingState = true;
          this.cleanupGestureListeners();
          this.notify();
        }).catch(() => {
          // Autoplay restricted until first interaction: silently listen without showing any prompt
          this.isPlayingState = false;
          this.notify();
          this.attachGestureListeners();
        });
      }
    } else {
      this.attachGestureListeners();
    }
  }

  private handleSilentGesture = () => {
    if (this.userExplicitlyStopped) {
      this.cleanupGestureListeners();
      return;
    }

    if (this.audio && !this.isPlayingState) {
      const p = this.audio.play();
      if (p !== undefined) {
        p.then(() => {
          this.isPlayingState = true;
          this.cleanupGestureListeners();
          this.notify();
        }).catch(() => {
          // Keep listening for next interaction silently
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
    const events = [
      "pointerdown",
      "touchstart",
      "touchend",
      "click",
      "scroll",
      "wheel",
      "keydown",
    ];

    events.forEach((ev) => {
      window.addEventListener(ev, this.handleSilentGesture, opts);
      document.addEventListener(ev, this.handleSilentGesture, opts);
    });
  }

  private cleanupGestureListeners() {
    if (!this.gestureListenersAttached) return;
    const opts = { capture: true };
    const events = [
      "pointerdown",
      "touchstart",
      "touchend",
      "click",
      "scroll",
      "wheel",
      "keydown",
    ];

    events.forEach((ev) => {
      window.removeEventListener(ev, this.handleSilentGesture, opts);
      document.removeEventListener(ev, this.handleSilentGesture, opts);
    });
    this.gestureListenersAttached = false;
  }
}

export const audioManager = new WeddingAudioManager();
