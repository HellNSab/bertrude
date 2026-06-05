import { useRef, useCallback } from "react";

export function useAudio() {
  const audioCtxRef = useRef(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  }, []);

  const playBeep = useCallback((freq, duration) => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Smooth gain envelope to prevent clicking sounds
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  }, [initAudio]);

  const playCountdownBeep = useCallback(() => {
    playBeep(440, 0.12);
  }, [playBeep]);

  const playTransitionBeep = useCallback(() => {
    playBeep(880, 0.35);
  }, [playBeep]);

  const playCelebrationChime = useCallback(() => {
    // Play an arpeggio: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        playBeep(freq, 0.4);
      }, index * 120);
    });
  }, [playBeep]);

  return {
    initAudio,
    playCountdownBeep,
    playTransitionBeep,
    playCelebrationChime
  };
}
