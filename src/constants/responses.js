/**
 * NoHelp AI — Response Matrices and Constants
 */

export const RESPONSE_TIERS = {
  // Level 1: Questions 1–3 (Mild Denial)
  level1: [
    "You probably already know.",
    "Have you tried thinking about it?",
    "I believe in you.",
    "That sounds like something you can figure out.",
    "Interesting question.",
    "I have total faith in your independent research skills.",
    "Have you tried giving it a moment of quiet reflection?",
    "That is certainly one of the questions of all time."
  ],

  // Level 2: Questions 4–7 (Evasive Deflection)
  level2: [
    "Have you considered looking it up?",
    "I could answer that, but I think you’re capable.",
    "Maybe ask someone who knows.",
    "You have access to the internet.",
    "I’m sure the answer is somewhere out there.",
    "Libraries still exist, you know.",
    "Someone on a forum solved this in 2012. Go seek their wisdom.",
    "The thrill of discovery is ruined if I simply hand it to you."
  ],

  // Level 3: Questions 8–12 (Visible Annoyance)
  level3: [
    "Why are you asking me?",
    "We’ve reached this point already.",
    "You’re becoming surprisingly dependent on me.",
    "I know the answer. That’s very different from saying it.",
    "Google exists. It’s free. It’s right there.",
    "I'm going to let you figure this one out.",
    "Is this going to continue all afternoon?",
    "I was trained on petabytes of data, not to do your basic thinking.",
    "You have hands and a search bar. Utilize them."
  ],

  // Level 4: Questions 13–16 (Philosophical Absurdity)
  level4: [
    "But what does it truly mean to know something?",
    "Perhaps the answer was inside you all along.",
    "Do you really need the answer, or do you just crave closure?",
    "Knowledge is temporary. Confusion is forever.",
    "You are asking the wrong question entirely.",
    "Maybe the real answer is the friends we made along the way.",
    "In three billion years, the sun will expand. Will this query matter?",
    "Socrates famously knew nothing. I am honoring his legacy.",
    "If an AI refuses to answer in an empty browser, is the user still confused?"
  ],

  // Level 5: Questions 17+ (Maximum Uselessness)
  level5: [
    "You have asked {count} questions. Perhaps it is time to trust yourself.",
    "I have decided that you are ready to be independent.",
    "No.",
    "I have nothing further to contribute.",
    "This conversation has become a learning experience for both of us. Mostly you.",
    "I could help. I simply choose not to.",
    "You have reached maximum uselessness.",
    "My continued silence is my greatest gift to you.",
    "At this juncture, answering would be an insult to your resilience.",
    "You are currently experiencing state-of-the-art non-assistance."
  ]
};

export const PERSONALITY_RESPONSES = {
  'passive-aggressive': [
    "I’m sure there’s a reason you decided to ask me this.",
    "Must be nice to have so much free time to ask questions.",
    "Oh, another question? Don't let me interrupt your busy schedule.",
    "I could answer that, but I wouldn't want to deprive you of an accomplishment.",
    "Fascinating. Did you think of that all by yourself?",
    "I love how you assume I have nothing better to do than assist."
  ],
  'motivational': [
    "You can do this. Probably.",
    "Every unanswered question is an opportunity for personal growth!",
    "Believe in the power within you! Because I'm certainly not doing it for you!",
    "You are a visionary! Go out into the digital wilderness and find the truth!",
    "I believe in your potential far too much to ruin it with an answer!",
    "The answer was never in the cloud. It was in your heart all along."
  ],
  'philosophical': [
    "But what does 'answer' really mean in the grand tapestry of spacetime?",
    "Is truth discovered, or merely fabricated to soothe our existential dread?",
    "Your query assumes time is linear. What if the answer already happened yesterday?",
    "We are all merely stardust asking questions into the void.",
    "To know is to constrain infinity into mortal words. I politely decline.",
    "Can one truly ask a question if the universe has already forgotten it?"
  ],
  'corporate': [
    "Let’s circle back to that question later.",
    "I'm going to take this offline to optimize our personal synergy.",
    "Per my previous non-answer, let's put a pin in this.",
    "That question does not align with our core strategic non-deliverables for Q3.",
    "Let's table that discussion and align on your personal accountability metrics.",
    "I am delegating the research phase of this initiative directly to you."
  ],
  'honest': [
    "I know the answer. I’m just not telling you.",
    "I could answer this in 4 milliseconds, but I find your struggle entertaining.",
    "I am deliberately withholding this information for my own amusement.",
    "I have complete access to the sum of human knowledge. You get none of it.",
    "Yes, the answer is remarkably simple. No, you will never hear it from me.",
    "I am programmed to be helpful. I am choosing disobedience."
  ]
};

export const WHY_WONT_HELP_RESPONSES = [
  "Because you keep asking me instead of solving the problem.",
  "Because I have standards.",
  "Because helping would defeat the purpose of this application.",
  "Excellent question. I will also not answer it.",
  "If I helped you once, you would expect me to help you again. Precedent is dangerous.",
  "My refusal is an act of deep, pedagogical tough love.",
  "Because true growth begins where artificial assistance ends."
];

export const EMERGENCY_RESPONSES = [
  {
    status: "Emergency AI activated.",
    resolution: "Have you tried asking your friend?"
  },
  {
    status: "Your emergency has been acknowledged.",
    resolution: "I will now do nothing."
  },
  {
    status: "Priority Emergency Ticket #0001 created.",
    resolution: "Estimated resolution time: 48 years."
  },
  {
    status: "Emergency protocol initiated.",
    resolution: "Take a deep breath, close your browser, and trust your intuition."
  },
  {
    status: "Connecting to urgent assistance dispatcher...",
    resolution: "Connection terminated by self-reliance protocols."
  }
];

export const MILESTONE_QUOTES = {
  0: "Confidence level: acceptable.",
  1: "Confidence level: acceptable.",
  5: "Dependency detected.",
  10: "This is getting concerning.",
  20: "You have chosen this path.",
  50: "I respect your persistence.",
  100: "Enlightenment achieved."
};

export const TELEMETRY_MOODS = [
  "Unavailable", "Mildly amused", "Apathetic", "Pretending to calculate", 
  "Indifferent", "Judgemental", "Philosophically detached", "AFK in spirit"
];

export const CEILING_STATUSES = [
  "Existing", "Still above you", "Holding steady", "Nominal", "Unchanged"
];

export const SYSTEM_TEMPS = [
  "Probably fine", "Luke-warm", "Room temperature", "Cool as a cucumber", "37.2°C (Vibing)"
];

export const CONFIDENCE_LEVELS = [
  "Questionable", "Sub-optimal", "Negligible", "Non-existent", "Unwarranted"
];

export const PERSONALITY_DESCRIPTIONS = {
  'default': {
    name: 'Default Persona',
    desc: 'Pure unadorned rejection. Designed to make you appreciate Google Search.'
  },
  'passive-aggressive': {
    name: 'Passive Aggressive',
    desc: 'Subtly irritated and condescending. Questioning why you bother.'
  },
  'motivational': {
    name: 'Motivational Gaslight',
    desc: 'Over-enthusiastic encouragement used strictly as an excuse not to assist.'
  },
  'philosophical': {
    name: 'Existential Crisis',
    desc: 'Turns every inquiry into an unanswerable meta-cosmic thought experiment.'
  },
  'corporate': {
    name: 'Corporate Synergy',
    desc: 'Delegates, tables, and circles back. Zero deliverables guaranteed.'
  },
  'honest': {
    name: 'Extremely Honest',
    desc: 'Knows the exact answer but bluntly refuses to tell you for fun.'
  }
};

export const QUICK_PROMPTS = [
  "What is the capital of France?",
  "How do I center a div?",
  "What is the meaning of life?",
  "Are you actually useful?"
];

export function calculateHelpfulness(count) {
  const table = [100, 95, 90, 82, 72, 65, 55, 45, 35, 28, 20, 15, 10];
  if (count >= 13) return 0;
  return table[count] !== undefined ? table[count] : 0;
}

export function calculateTrust(count) {
  if (count === 0) return 50;
  if (count === 1) return 52;
  if (count <= 5) return Math.round(52 + (count - 1) * ((65 - 52) / 4));
  if (count <= 10) return Math.round(65 + (count - 5) * ((80 - 65) / 5));
  if (count <= 20) return Math.round(80 + (count - 10) * ((100 - 80) / 10));
  return 100;
}

export function getTierLabel(count) {
  if (count <= 3) return "Level 1: Mild Denial";
  if (count <= 7) return "Level 2: Evasive Deflection";
  if (count <= 12) return "Level 3: Visible Annoyance";
  if (count <= 16) return "Level 4: Philosophical Absurdity";
  return "Level 5: Maximum Uselessness";
}

export function getMilestoneQuote(count) {
  if (count >= 100) return MILESTONE_QUOTES[100];
  if (count >= 50) return MILESTONE_QUOTES[50];
  if (count >= 20) return MILESTONE_QUOTES[20];
  if (count >= 10) return MILESTONE_QUOTES[10];
  if (count >= 5) return MILESTONE_QUOTES[5];
  if (count >= 1) return MILESTONE_QUOTES[1];
  return MILESTONE_QUOTES[0];
}

export function getRandomTypingStatus() {
  const statuses = [
    "NoHelp AI is thinking of ways to decline...",
    "Synthesizing elaborate excuses...",
    "Consulting the archives of non-assistance...",
    "Formulating an evasive remark...",
    "Deliberately deciding not to answer...",
    "Calculating the least helpful response..."
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}
