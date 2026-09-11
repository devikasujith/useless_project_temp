/**
 * NoHelp AI — Speech Recognition & Synthesis Services
 * Uses browser Web Speech API with safety fallbacks.
 */

// --- Speech Recognition ---
const SpeechRecognition = typeof window !== 'undefined'
  ? (window.SpeechRecognition || window.webkitSpeechRecognition)
  : null;

export function isSpeechRecognitionSupported() {
  return !!SpeechRecognition;
}

export function createSpeechRecognizer({ onStart, onResult, onError, onEnd }) {
  if (!SpeechRecognition) return null;

  try {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    if (onStart) recognition.onstart = onStart;
    if (onResult) {
      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        onResult(finalTranscript || interimTranscript);
      };
    }
    if (onError) recognition.onerror = onError;
    if (onEnd) recognition.onend = onEnd;

    return recognition;
  } catch (err) {
    console.warn('Speech recognition creation error:', err);
    return null;
  }
}

// --- Speech Synthesis ---
export function isSpeechSynthesisSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

export function speakMessage(text, { onStart, onEnd, onError } = {}) {
  if (!isSpeechSynthesisSupported()) {
    if (onError) onError(new Error('Speech synthesis not supported in this browser.'));
    return;
  }

  stopSpeaking();

  const cleanText = text.replace(/\n+/g, ' ').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);

  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang && v.lang.startsWith('en') && (
    v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') ||
    v.name.includes('Daniel') || v.name.includes('George') || v.name.includes('UK') || v.name.includes('US')
  )) || voices.find(v => v.lang && v.lang.startsWith('en')) || voices[0];

  if (voice) utterance.voice = voice;
  utterance.rate = 0.95;  // steady, deliberate delivery
  utterance.pitch = 0.92; // slightly deeper, deadpan serious

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
}
