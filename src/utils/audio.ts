"use client";

let audioCtx: AudioContext | null = null;
let isMuted = false;

// Sync mute status with localStorage
if (typeof window !== "undefined") {
  isMuted = localStorage.getItem("eyfi_reward_audio_muted") === "true";
}

export function getMuteState(): boolean {
  return isMuted;
}

export function setMuteState(muted: boolean) {
  isMuted = muted;
  if (typeof window !== "undefined") {
    localStorage.setItem("eyfi_reward_audio_muted", String(muted));
  }
}

function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a soft chest box pop/open sound effect using Web Audio synthesis
 */
export function playChestOpenSound() {
  if (isMuted) return;
  try {
    const ctx = initAudioContext();
    const time = ctx.currentTime;

    // Pop oscillator (low-mid thud)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.18);

    gain.gain.setValueAtTime(0.2, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.18);

    // Friction swoosh noise (synthesized pop/whoosh)
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1000, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + 0.15);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    // Synthesize simple noise buffer
    const bufferSize = ctx.sampleRate * 0.15;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(time);
    noiseSource.stop(time + 0.15);
  } catch (err) {
    console.warn("Audio Context open error: ", err);
  }
}

/**
 * Plays a premium sparkly chord arpeggio chime on success unlock
 */
export function playChimeSuccessSound() {
  if (isMuted) return;
  try {
    const ctx = initAudioContext();
    const start = ctx.currentTime;

    // Arpeggio notes (C5, E5, G5, C6)
    const notes = [523.25, 659.25, 783.99, 1046.50];
    const delays = [0.0, 0.08, 0.16, 0.24];

    notes.forEach((freq, index) => {
      const noteTime = start + delays[index];
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, noteTime);
      
      // Pitch wrap sparkle
      osc.frequency.exponentialRampToValueAtTime(freq * 1.01, noteTime + 0.5);

      gain.gain.setValueAtTime(0.0, noteTime);
      gain.gain.linearRampToValueAtTime(0.05, noteTime + 0.05); // low volume, non-intrusive
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.6);
    });
  } catch (err) {
    console.warn("Audio Context success error: ", err);
  }
}
