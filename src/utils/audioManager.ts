/**
 * Global Audio Manager for Wedding Music.
 * Handles automatic background music on page visit, muted preload fallback,
 * seamless unmuting on any user interaction, and floating controls synchronization.
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
        // Ignore in private storage
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
      if (this.audio && !this.audio.muted) {
        this.isPlayingState = true;
        this.cleanupGestureListeners();
        this.notify();
      }
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

    this.audio.muted = false;
    this.audio.volume = 0.75;

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
   * Automatically start playing background music when a user visits the website.
   * Tries unmuted play first; if browser policies restrict unmuted playback,
   * starts playing muted so audio buffers and decodes immediately,
   * and un-mutes automatically on the very first touch/click/interaction.
   */
  public setupAutoplay(element?: HTMLAudioElement | null) {
    if (typeof window === "undefined") return;

    if (element) {
      this.setAudioElement(element);
    } else {
      this.initFallbackAudio();
    }

    this.userExplicitlyStopped = false;

    if (!this.audio) {
      this.attachGestureListeners();
      return;
    }

    // Attempt unmuted play first
    this.audio.muted = false;
    this.audio.volume = 0.75;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Unmuted autoplay succeeded immediately on visit!
          this.isPlayingState = true;
          this.cleanupGestureListeners();
          this.notify();
        })
        .catch(() => {
          // Browser requires user activation for unmuted sound.
          // Start playing muted immediately so media stream is active:
          if (this.audio) {
            this.audio.muted = true;
            const mutedPromise = this.audio.play();
            if (mutedPromise !== undefined) {
              mutedPromise.catch(() => {});
            }
          }
          // Attach silent listeners to unmute at first interaction
          this.attachGestureListeners();
        });
    } else {
      this.attachGestureListeners();
    }
  }

  private handleSilentGesture = () => {
    if (this.userExplicitlyStopped) {
      this.cleanupGestureListeners();
      return;
    }

    if (this.audio) {
      this.audio.muted = false;
      this.audio.volume = 0.75;

      if (this.audio.paused) {
        const p = this.audio.play();
        if (p !== undefined) {
          p.then(() => {
            this.isPlayingState = true;
            this.cleanupGestureListeners();
            this.notify();
          }).catch(() => {
            // Keep listening
          });
        }
      } else {
        // Was playing muted, now unmuted
        this.isPlayingState = true;
        this.cleanupGestureListeners();
        this.notify();
      }
    }
  };

  private attachGestureListeners() {
    if (this.gestureListenersAttached || this.userExplicitlyStopped) return;
    this.gestureListenersAttached = true;

    const opts = { capture: true, passive: true };
    const events = [
      "pointerdown",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click",
      "keydown",
      "scroll",
      "wheel",
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
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click",
      "keydown",
      "scroll",
      "wheel",
    ];

    events.forEach((ev) => {
      window.removeEventListener(ev, this.handleSilentGesture, opts);
      document.removeEventListener(ev, this.handleSilentGesture, opts);
    });
    this.gestureListenersAttached = false;
  }
}

export const audioManager = new WeddingAudioManager();
