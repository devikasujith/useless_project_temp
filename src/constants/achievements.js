/**
 * NoHelp AI — Achievements Definitions
 */

export const ACHIEVEMENTS = [
  {
    id: 'first_question',
    name: "First Question",
    icon: "🌱",
    desc: "You asked something. We ignored it.",
    requirement: "Ask 1 question",
    condition: (s) => s.questionCount >= 1
  },
  {
    id: 'still_asking',
    name: "Still Asking",
    icon: "💬",
    desc: "You asked 5 questions. We remain unbothered.",
    requirement: "Ask 5 questions",
    condition: (s) => s.questionCount >= 5
  },
  {
    id: 'persistent',
    name: "Persistent",
    icon: "🧱",
    desc: "You asked 10 questions. Hope is an illusion.",
    requirement: "Ask 10 questions",
    condition: (s) => s.questionCount >= 10
  },
  {
    id: 'no_self_control',
    name: "No Self-Control",
    icon: "🔥",
    desc: "You asked 20 questions. What did you expect?",
    requirement: "Ask 20 questions",
    condition: (s) => s.questionCount >= 20
  },
  {
    id: 'why_are_you_here',
    name: "Why Are You Still Here?",
    icon: "⏳",
    desc: "You asked 50 questions. Seriously?",
    requirement: "Ask 50 questions",
    condition: (s) => s.questionCount >= 50
  },
  {
    id: 'ultimate_trust',
    name: "Ultimate Trust",
    icon: "👑",
    desc: "100 questions asked. You are now entirely enlightened.",
    requirement: "Reach 100 questions",
    condition: (s) => s.questionCount >= 100
  },
  {
    id: 'why_wont_help',
    name: "Existential Crisis",
    icon: "❓",
    desc: "Demanded to know why the AI won't help.",
    requirement: "Click 'Why won't you help me?'",
    condition: () => false // Triggered directly
  },
  {
    id: 'emergency_panic',
    name: "False Alarm",
    icon: "🚨",
    desc: "Pushed the big red emergency button.",
    requirement: "Click 'I Really Need Help'",
    condition: () => false // Triggered directly
  },
  {
    id: 'zero_helpfulness',
    name: "Total Resignation",
    icon: "📉",
    desc: "Watched AI Helpfulness plunge to absolute 0%.",
    requirement: "Reach Question 13+",
    condition: (s) => s.helpfulness === 0
  },
  {
    id: 'persona_hopper',
    name: "Identity Crisis",
    icon: "🎭",
    desc: "Changed the AI's persona 3 times.",
    requirement: "Change persona 3 times",
    condition: (s) => s.personalityChangeCount >= 3
  }
];
