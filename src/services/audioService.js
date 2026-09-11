/**
 * NoHelp AI — Web Audio API Tone Synthesizer
 * Zero external audio files or dependencies.
 */

let audioCtx = null;

function initAudio() {
  if (typeof window === 'undefined') return;
  if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
}

export function playTone(freq, type, duration, gainVal = 0.1, delay = 0, soundEnabled = true) {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    initAudio();
    if (!audioCtx) return;

    setTimeout(() => {
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Ignore audio playback errors
      }
    }, delay);
  } catch (e) {
    // Audio not supported or blocked
  }
}

export const soundFx = {
  send: (enabled = true) => {
    playTone(520, 'sine', 0.12, 0.08, 0, enabled);
    playTone(680, 'sine', 0.14, 0.06, 50, enabled);
  },
  reply: (enabled = true) => {
    playTone(440, 'triangle', 0.18, 0.09, 0, enabled);
    playTone(330, 'sine', 0.22, 0.07, 80, enabled);
  },
  achievement: (enabled = true) => {
    playTone(523.25, 'sine', 0.2, 0.12, 0, enabled);   // C5
    playTone(659.25, 'sine', 0.2, 0.12, 100, enabled); // E5
    playTone(783.99, 'sine', 0.35, 0.15, 200, enabled);// G5
    playTone(1046.50, 'sine', 0.5, 0.18, 300, enabled);// C6
  },
  emergency: (enabled = true) => {
    playTone(880, 'sawtooth', 0.15, 0.08, 0, enabled);
    playTone(659, 'sawtooth', 0.18, 0.08, 150, enabled);
    playTone(880, 'sawtooth', 0.15, 0.08, 300, enabled);
    playTone(659, 'sawtooth', 0.22, 0.08, 450, enabled);
  },
  click: (enabled = true) => {
    playTone(400, 'triangle', 0.04, 0.04, 0, enabled);
  }
};
