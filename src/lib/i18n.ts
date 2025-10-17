// Simple i18n system with Sinhala, Tamil, and English

export type Language = 'en' | 'si' | 'ta';

const translations = {
  en: {
    // Home
    appName: 'EmpowerLearn Stories',
    tagline: 'Grow Your Skills, Share Your Story',
    startStory: 'Start a Story',
    showSkill: 'Show My Skill',
    storyOfWeek: '⭐ Story of the Week',
    learnGrow: '🎓 Learn & Grow',
    localProducts: '🛍️ Local Products',
    jobsCollab: '💼 Jobs & Collaboration',
    myProgress: '🏅 My Progress',
    dailyTip: '💡 Daily Tip',
    
    // Nav
    home: 'Home',
    learn: 'Learn',
    jobs: 'Jobs',
    messages: 'Messages',
    profile: 'Profile',
    
    // Learn
    downloadOffline: 'Download for Offline',
    availableOffline: 'Available Offline',
    storyPacks: 'Story Packs',
    completed: 'Completed',
    
    // Products
    products: 'Products',
    postProduct: 'Post a Product',
    all: 'All',
    food: 'Food',
    crafts: 'Crafts',
    services: 'Services',
    negotiable: 'Negotiable',
    pending: 'Pending Sync',
    
    // Jobs
    quickApply: 'Quick Apply',
    applyNow: 'Apply Now',
    open: 'Open',
    filled: 'Filled',
    
    // Stories
    inspireWall: 'Inspire Wall',
    shareStory: 'Share Your Story',
    
    // Progress
    myJourney: 'My Learning Journey',
    shareProgress: 'Share Progress',
    
    // Audio
    play: 'Play',
    pause: 'Pause',
    record: 'Record',
    stopRecording: 'Stop Recording',
    playAudio: 'Play Audio',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    report: 'Report',
    loading: 'Loading...',
    offline: 'Offline',
    syncPending: 'Sync Pending',
    error: 'Error',
    
    // Investor Connect
    'Investor Connect': 'Investor Connect',
    'Fund local entrepreneurs': 'Fund local entrepreneurs',
    'Investment Opportunities': 'Investment Opportunities',
    'Submit Request': 'Submit Request',
    Filters: 'Filters',
    Active: 'Active',
    Funded: 'Funded',
    Closed: 'Closed',
    District: 'District',
    'All Districts': 'All Districts',
    Category: 'Category',
    'All Categories': 'All Categories',
    'Max Amount (LKR)': 'Max Amount (LKR)',
    'No investment opportunities found': 'No investment opportunities found',
    Featured: 'Featured',
    Returns: 'Returns',
    Timeline: 'Timeline',
    Message: 'Message',
    'View Details': 'View Details',
    Bookmark: 'Bookmark',
    'Bookmark removed': 'Bookmark removed',
    'Removed from your bookmarks': 'Removed from your bookmarks',
    Bookmarked: 'Bookmarked',
    'Added to your bookmarks': 'Added to your bookmarks',
    'Starting conversation with': 'Starting conversation with',
    'Seek investment for your business': 'Seek investment for your business',
    'Investment Request': 'Investment Request',
    'Share your business opportunity with potential investors': 'Share your business opportunity with potential investors',
    'Amount Needed (LKR)': 'Amount Needed (LKR)',
    'Business Category': 'Business Category',
    'Food & Agriculture': 'Food & Agriculture',
    'Crafts & Manufacturing': 'Crafts & Manufacturing',
    'What will you use the money for?': 'What will you use the money for?',
    'Describe your business plan and how you will use the investment...': 'Describe your business plan and how you will use the investment...',
    'How will investors profit?': 'How will investors profit?',
    'Explain the returns: profit share, repayment plan, timeline...': 'Explain the returns: profit share, repayment plan, timeline...',
    'Repayment Timeline': 'Repayment Timeline',
    'e.g., 12 months, 18 months, 2 years': 'e.g., 12 months, 18 months, 2 years',
    'Submitting...': 'Submitting...',
    'Tips for Success': 'Tips for Success',
    'Be clear about how you will use the money': 'Be clear about how you will use the money',
    'Explain realistic returns for investors': 'Explain realistic returns for investors',
    'Show your business experience and skills': 'Show your business experience and skills',
    'Be honest about timeline and risks': 'Be honest about timeline and risks',
    'Request Submitted': 'Request Submitted',
    'Your investor request has been submitted successfully': 'Your investor request has been submitted successfully',
    'Failed to submit request. Please try again.': 'Failed to submit request. Please try again.',
    '💼 Investor Pitches': '💼 Investor Pitches',
  },
  
  si: {
    // Sinhala
    appName: 'EmpowerLearn කතා',
    tagline: 'ඔබේ කුසලතා වර්ධනය කරන්න',
    startStory: 'කතාවක් අරඹන්න',
    showSkill: 'මගේ කුසලතාවය පෙන්වන්න',
    storyOfWeek: '⭐ සතියේ කතාව',
    learnGrow: '🎓 ඉගෙනගෙන වර්ධනය',
    localProducts: '🛍️ දේශීය නිෂ්පාදන',
    jobsCollab: '💼 රැකියා සහ සහයෝගීතාවය',
    myProgress: '🏅 මගේ ප්‍රගතිය',
    dailyTip: '💡 දෛනික උපදෙස',
    
    home: 'මුල් පිටුව',
    learn: 'ඉගෙනීම',
    jobs: 'රැකියා',
    messages: 'පණිවිඩ',
    profile: 'පැතිකඩ',
    
    downloadOffline: 'නොබැඳි භාවිතය සඳහා බාගන්න',
    availableOffline: 'නොබැඳිව ලබා ගත හැක',
    storyPacks: 'කතා පැකට්',
    completed: 'සම්පූර්ණයි',
    
    products: 'නිෂ්පාදන',
    postProduct: 'නිෂ්පාදනයක් පළ කරන්න',
    all: 'සියල්ල',
    food: 'ආහාර',
    crafts: 'හස්තකර්ම',
    services: 'සේවා',
    negotiable: 'කරුණාකර සාකච්ඡා කරන්න',
    pending: 'සමමුහුර්තකරණය අපේක්ෂිතයි',
    
    quickApply: 'ඉක්මන් අයදුම්පත',
    applyNow: 'දැන් අයදුම් කරන්න',
    open: 'විවෘත',
    filled: 'පිරී ඇත',
    
    inspireWall: 'ප්‍රේරණා බිත්තිය',
    shareStory: 'ඔබේ කතාව බෙදා ගන්න',
    
    myJourney: 'මගේ ඉගෙනුම් ගමන',
    shareProgress: 'ප්‍රගතිය බෙදා ගන්න',
    
    play: 'වාදනය කරන්න',
    pause: 'විරාමය',
    record: 'පටිගත කරන්න',
    stopRecording: 'පටිගත කිරීම නවත්වන්න',
    playAudio: 'ශ්‍රව්‍ය වාදනය',
    
    save: 'සුරකින්න',
    cancel: 'අවලංගු කරන්න',
    submit: 'ඉදිරිපත් කරන්න',
    edit: 'සංස්කරණය',
    delete: 'මකන්න',
    share: 'බෙදා ගන්න',
    report: 'වාර්තා කරන්න',
    loading: 'පූරණය වෙමින්...',
    offline: 'නොබැඳි',
    syncPending: 'සමමුහුර්තකරණය අපේක්ෂිතයි',
    error: 'දෝෂයක්',
  },
  
  ta: {
    // Tamil
    appName: 'EmpowerLearn கதைகள்',
    tagline: 'உங்கள் திறமையை வளர்த்துக்கொள்ளுங்கள்',
    startStory: 'கதையைத் தொடங்குங்கள்',
    showSkill: 'என் திறமையைக் காட்டு',
    storyOfWeek: '⭐ வாரத்தின் கதை',
    learnGrow: '🎓 கற்று வளருங்கள்',
    localProducts: '🛍️ உள்ளூர் பொருட்கள்',
    jobsCollab: '💼 வேலைகள் மற்றும் ஒத்துழைப்பு',
    myProgress: '🏅 என் முன்னேற்றம்',
    dailyTip: '💡 தினசரி உதவிக்குறிப்பு',
    
    home: 'முகப்பு',
    learn: 'கற்றல்',
    jobs: 'வேலைகள்',
    messages: 'செய்திகள்',
    profile: 'சுயவிவரம்',
    
    downloadOffline: 'இணையமின்றி பதிவிறக்கு',
    availableOffline: 'இணையமின்றி கிடைக்கும்',
    storyPacks: 'கதை தொகுப்புகள்',
    completed: 'நிறைவு',
    
    products: 'பொருட்கள்',
    postProduct: 'பொருளை இடுகையிடு',
    all: 'அனைத்தும்',
    food: 'உணவு',
    crafts: 'கைவினைப்பொருட்கள்',
    services: 'சேவைகள்',
    negotiable: 'பேச்சுவார்த்தை செய்யலாம்',
    pending: 'ஒத்திசைவு நிலுவையில்',
    
    quickApply: 'விரைவு விண்ணப்பம்',
    applyNow: 'இப்போது விண்ணப்பிக்கவும்',
    open: 'திறந்த',
    filled: 'நிரப்பப்பட்டது',
    
    inspireWall: 'உத்வேக சுவர்',
    shareStory: 'உங்கள் கதையைப் பகிருங்கள்',
    
    myJourney: 'என் கற்றல் பயணம்',
    shareProgress: 'முன்னேற்றத்தைப் பகிரவும்',
    
    play: 'விளையாடு',
    pause: 'இடைநிறுத்தம்',
    record: 'பதிவு செய்',
    stopRecording: 'பதிவை நிறுத்து',
    playAudio: 'ஆடியோ விளையாடு',
    
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    submit: 'சமர்ப்பிக்கவும்',
    edit: 'தொகு',
    delete: 'நீக்கு',
    share: 'பகிர்',
    report: 'புகாரளி',
    loading: 'ஏற்றுகிறது...',
    offline: 'இணையமின்றி',
    syncPending: 'ஒத்திசைவு நிலுவையில்',
    error: 'பிழை',
  },
};

let currentLanguage: Language = 'en';

export function setLanguage(lang: Language) {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('empowerlearn_lang', lang);
  }
}

export function getLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('empowerlearn_lang') as Language;
    if (stored && ['en', 'si', 'ta'].includes(stored)) {
      return stored;
    }
    // Auto-detect from browser
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('si')) return 'si';
    if (browserLang.startsWith('ta')) return 'ta';
  }
  return currentLanguage;
}

export function t(key: string): string {
  const lang = getLanguage();
  const translationKey = key as keyof typeof translations.en;
  return translations[lang][translationKey] || translations.en[translationKey] || key;
}

// Initialize on import
if (typeof window !== 'undefined') {
  currentLanguage = getLanguage();
}

// React hook for i18n
import { useState, useEffect } from 'react';

export function useI18n() {
  const [language, setLanguageState] = useState<Language>(getLanguage());

  useEffect(() => {
    // Listen for language changes
    const handleStorageChange = () => {
      setLanguageState(getLanguage());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    language,
    t: (key: string) => {
      const translationKey = key as keyof typeof translations.en;
      return translations[language][translationKey] || translations.en[translationKey] || key;
    },
    setLanguage: (lang: Language) => {
      setLanguage(lang);
      setLanguageState(lang);
    },
  };
}
