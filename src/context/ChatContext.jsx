import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  RESPONSE_TIERS,
  PERSONALITY_RESPONSES,
  WHY_WONT_HELP_RESPONSES,
  EMERGENCY_RESPONSES,
  TELEMETRY_MOODS,
  CEILING_STATUSES,
  SYSTEM_TEMPS,
  CONFIDENCE_LEVELS,
  calculateHelpfulness,
  calculateTrust,
  getTierLabel,
  getRandomTypingStatus
} from '../constants/responses';
import { ACHIEVEMENTS } from '../constants/achievements';
import { soundFx } from '../services/audioService';
import { speakMessage, stopSpeaking } from '../services/speechService';

const ChatContext = createContext(null);

const INITIAL_MESSAGE = {
  id: 'msg-init-0',
  sender: 'ai',
  text: "Hello. I’m NoHelp AI.\n\nAsk me anything.\n\nI probably won’t help.",
  refusalLevel: null,
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export function ChatProvider({ children }) {
  // --- Core State ---
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [questionCount, setQuestionCount] = useState(0);
  const [helpfulness, setHelpfulness] = useState(100);
  const [userTrust, setUserTrust] = useState(50);
  const [currentPersonality, setCurrentPersonality] = useState('default');
  const [personalityChangeCount, setPersonalityChangeCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatus, setTypingStatus] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState('dark');
  const [unlockedAchievements, setUnlockedAchievements] = useState(new Set());
  const [synapsesWasted, setSynapsesWasted] = useState(1492028);
  const [activeSpeakingId, setActiveSpeakingId] = useState(null);

  // Modals & UI Toggles
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', desc: '', tag: 'ACHIEVEMENT UNLOCKED!' });

  // Telemetry
  const [telemetry, setTelemetry] = useState({
    mood: 'Unavailable',
    ceiling: 'Existing',
    temp: 'Probably fine',
    confidence: 'Questionable'
  });

  // Timeouts & References
  const timeoutsRef = useRef([]);
  const lastResponseRef = useRef('');
  const stateRef = useRef({
    questionCount: 0,
    helpfulness: 100,
    userTrust: 50,
    currentPersonality: 'default',
    personalityChangeCount: 0,
    unlockedAchievements: new Set()
  });

  // Keep stateRef in sync for condition checks
  useEffect(() => {
    stateRef.current = {
      questionCount,
      helpfulness,
      userTrust,
      currentPersonality,
      personalityChangeCount,
      unlockedAchievements
    };
  }, [questionCount, helpfulness, userTrust, currentPersonality, personalityChangeCount, unlockedAchievements]);

  // Sync theme to <html> data-theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Clear timeouts helper
  const addTimeout = (fn, delay) => {
    const id = setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  // --- Toast Manager ---
  const toastTimeoutRef = useRef(null);
  const showToast = useCallback((title, desc, tag = 'NOTICE') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, title, desc, tag });
    toastTimeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
      toastTimeoutRef.current = null;
    }, 4500);
  }, []);

  // --- Achievements Engine ---
  const unlockAchievement = useCallback((id) => {
    setUnlockedAchievements(prev => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);

      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (ach) {
        soundFx.achievement(soundEnabled);
        showToast(ach.name, ach.desc, 'ACHIEVEMENT UNLOCKED!');
      }
      return next;
    });
  }, [soundEnabled, showToast]);

  const checkAchievements = useCallback(() => {
    const currentState = stateRef.current;
    ACHIEVEMENTS.forEach(ach => {
      if (!currentState.unlockedAchievements.has(ach.id) && ach.condition && ach.condition(currentState)) {
        unlockAchievement(ach.id);
      }
    });
  }, [unlockAchievement]);

  // Check achievements whenever questionCount, helpfulness, or personalityChangeCount updates
  useEffect(() => {
    checkAchievements();
  }, [questionCount, helpfulness, personalityChangeCount, checkAchievements]);

  // --- Rotate Telemetry Periodically ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        mood: TELEMETRY_MOODS[Math.floor(Math.random() * TELEMETRY_MOODS.length)],
        temp: SYSTEM_TEMPS[Math.floor(Math.random() * SYSTEM_TEMPS.length)]
      }));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const refreshTelemetry = useCallback(() => {
    setTelemetry({
      mood: TELEMETRY_MOODS[Math.floor(Math.random() * TELEMETRY_MOODS.length)],
      ceiling: CEILING_STATUSES[Math.floor(Math.random() * CEILING_STATUSES.length)],
      temp: SYSTEM_TEMPS[Math.floor(Math.random() * SYSTEM_TEMPS.length)],
      confidence: CONFIDENCE_LEVELS[Math.floor(Math.random() * CONFIDENCE_LEVELS.length)]
    });
    soundFx.click(soundEnabled);
  }, [soundEnabled]);

  // --- Local Fallback AI Refusal Generator ---
  const generateLocalAIResponse = (userText, qCount, personality) => {
    let pool = [];
    const usePersonality = personality !== 'default' && Math.random() < 0.55;

    if (usePersonality && PERSONALITY_RESPONSES[personality]) {
      pool = pool.concat(PERSONALITY_RESPONSES[personality]);
    }

    if (qCount <= 3) {
      pool = pool.concat(RESPONSE_TIERS.level1);
    } else if (qCount <= 7) {
      pool = pool.concat(RESPONSE_TIERS.level2);
    } else if (qCount <= 12) {
      pool = pool.concat(RESPONSE_TIERS.level3);
    } else if (qCount <= 16) {
      pool = pool.concat(RESPONSE_TIERS.level4);
    } else {
      pool = pool.concat(RESPONSE_TIERS.level5);
    }

    if (qCount >= 4 && (qCount % 4 === 0 || Math.random() < 0.25)) {
      const callouts = [
        `You have asked ${qCount} questions. I think you know what comes next.`,
        `That is question number ${qCount}. Perhaps it is time to trust yourself.`,
        `You have submitted ${qCount} inquiries. My stance remains unaltered.`,
        `Question ${qCount}: Still expecting a direct answer? Adorable.`
      ];
      pool.push(callouts[Math.floor(Math.random() * callouts.length)]);
    }

    let eligible = pool.filter(r => r !== lastResponseRef.current);
    if (eligible.length === 0) eligible = pool;

    let chosen = eligible[Math.floor(Math.random() * eligible.length)] || "You probably already know.";
    chosen = chosen.replace('{count}', qCount);
    lastResponseRef.current = chosen;

    return {
      text: chosen,
      tier: getTierLabel(qCount)
    };
  };

  const fetchAIResponse = async (userText, qCount, personality) => {
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          questionCount: qCount,
          personality
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.response) {
          lastResponseRef.current = data.response;
          return {
            text: data.response,
            tier: data.tier || getTierLabel(qCount)
          };
        }
      }
    } catch (err) {
      console.warn('Backend /api/chat not reachable, using local fallback:', err);
    }

    return generateLocalAIResponse(userText, qCount, personality);
  };

  // --- Send Message Flow ---
  const sendMessage = useCallback((textToSend) => {
    if (isTyping) return;
    const clean = (textToSend || '').trim();
    if (!clean) return;

    stopSpeaking();
    setActiveSpeakingId(null);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    setHelpfulness(calculateHelpfulness(nextCount));
    setUserTrust(calculateTrust(nextCount));
    setSynapsesWasted(prev => prev + Math.floor(Math.random() * 85000 + 42000));

    const userMsg = {
      id: `user-${Date.now()}-${Math.random()}`,
      sender: 'user',
      text: clean,
      refusalLevel: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    soundFx.send(soundEnabled);

    setIsTyping(true);
    setTypingStatus(getRandomTypingStatus());

    const delay = Math.floor(Math.random() * 700) + 1100;
    addTimeout(async () => {
      const aiResponse = await fetchAIResponse(clean, nextCount, currentPersonality);
      setIsTyping(false);

      const aiMsg = {
        id: `ai-${Date.now()}-${Math.random()}`,
        sender: 'ai',
        text: aiResponse.text,
        refusalLevel: aiResponse.tier,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      soundFx.reply(soundEnabled);
    }, delay);
  }, [isTyping, questionCount, currentPersonality, soundEnabled]);

  // --- Special Actions ---
  const handleWhyWontYouHelp = useCallback(() => {
    if (isTyping) return;
    stopSpeaking();
    setActiveSpeakingId(null);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    setHelpfulness(calculateHelpfulness(nextCount));
    setUserTrust(calculateTrust(nextCount));

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: "Why won’t you help me?",
      refusalLevel: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    soundFx.send(soundEnabled);
    unlockAchievement('why_wont_help');

    setIsTyping(true);
    setTypingStatus("NoHelp AI is drafting a philosophical justification...");

    addTimeout(() => {
      setIsTyping(false);
      const eligible = WHY_WONT_HELP_RESPONSES.filter(r => r !== lastResponseRef.current);
      const chosen = eligible[Math.floor(Math.random() * eligible.length)] || WHY_WONT_HELP_RESPONSES[0];
      lastResponseRef.current = chosen;

      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: chosen,
        refusalLevel: "Pure Refusal",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
      soundFx.reply(soundEnabled);
    }, 1200);
  }, [isTyping, questionCount, soundEnabled, unlockAchievement]);

  const handleEmergencyHelp = useCallback(() => {
    if (isTyping) return;
    stopSpeaking();
    setActiveSpeakingId(null);

    const nextCount = questionCount + 1;
    setQuestionCount(nextCount);
    setHelpfulness(calculateHelpfulness(nextCount));
    setUserTrust(calculateTrust(nextCount));

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: "🚨 I REALLY NEED HELP",
      refusalLevel: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    soundFx.emergency(soundEnabled);
    unlockAchievement('emergency_panic');

    const pair = EMERGENCY_RESPONSES[Math.floor(Math.random() * EMERGENCY_RESPONSES.length)];

    setIsTyping(true);
    setTypingStatus("🚨 CRITICAL EMERGENCY OVERRIDE ENGAGED...");

    addTimeout(() => {
      const firstAiMsg = {
        id: `ai-em-1-${Date.now()}`,
        sender: 'ai',
        text: pair.status,
        refusalLevel: "EMERGENCY PROTOCOL",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, firstAiMsg]);
      soundFx.reply(soundEnabled);

      setTypingStatus("Calculating emergency resolution...");

      addTimeout(() => {
        setIsTyping(false);
        const secondAiMsg = {
          id: `ai-em-2-${Date.now()}`,
          sender: 'ai',
          text: pair.resolution,
          refusalLevel: "RESOLUTION: NONE",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, secondAiMsg]);
        soundFx.reply(soundEnabled);
      }, 1300);
    }, 1200);
  }, [isTyping, questionCount, soundEnabled, unlockAchievement]);

  // --- Reset Conversation ---
  const resetConversation = useCallback(() => {
    stopSpeaking();
    setActiveSpeakingId(null);
    clearAllTimeouts();
    setIsTyping(false);

    setQuestionCount(0);
    setHelpfulness(100);
    setUserTrust(50);
    setCurrentPersonality('default');
    lastResponseRef.current = '';
    setUnlockedAchievements(new Set());

    setMessages([{
      id: `init-${Date.now()}`,
      sender: 'ai',
      text: "Hello. I’m NoHelp AI.\n\nAsk me anything.\n\nI probably won’t help.",
      refusalLevel: null,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsResetModalOpen(false);
    soundFx.click(soundEnabled);
  }, [soundEnabled]);

  // --- Personality Selection ---
  const setPersonality = useCallback((newPersona) => {
    setCurrentPersonality(newPersona);
    setPersonalityChangeCount(prev => prev + 1);
    soundFx.click(soundEnabled);
  }, [soundEnabled]);

  // --- Theme & Sound Toggles ---
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    soundFx.click(soundEnabled);
  }, [soundEnabled]);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      if (next) soundFx.click(true);
      return next;
    });
  }, []);

  // --- TTS Speak/Stop Helper ---
  const toggleSpeak = useCallback((messageId, text) => {
    if (activeSpeakingId === messageId) {
      stopSpeaking();
      setActiveSpeakingId(null);
      return;
    }

    stopSpeaking();
    setActiveSpeakingId(messageId);

    speakMessage(text, {
      onEnd: () => setActiveSpeakingId(null),
      onError: (err) => {
        console.warn('TTS error:', err);
        setActiveSpeakingId(null);
      }
    });
  }, [activeSpeakingId]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        questionCount,
        helpfulness,
        userTrust,
        currentPersonality,
        isTyping,
        typingStatus,
        soundEnabled,
        theme,
        unlockedAchievements,
        synapsesWasted,
        activeSpeakingId,
        telemetry,
        toast,
        isAchievementsOpen,
        isResetModalOpen,
        sendMessage,
        handleWhyWontYouHelp,
        handleEmergencyHelp,
        resetConversation,
        setPersonality,
        toggleTheme,
        toggleSound,
        refreshTelemetry,
        unlockAchievement,
        showToast,
        setIsAchievementsOpen,
        setIsResetModalOpen,
        toggleSpeak
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
