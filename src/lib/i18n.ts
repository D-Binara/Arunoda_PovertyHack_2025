// Simple i18n system with Sinhala, Tamil, and English

export type Language = 'en' | 'si' | 'ta';

const translations = {
  en: {
    // Home
    appName: 'EmpowerLearn Stories',
    tagline: 'Grow Your Skills, Share Your Story',
    startStory: 'Start a Story',
    showSkill: 'Show My Skill',
    storyOfWeek: ' Story of the Week',
    learnGrow: ' Learn & Grow',
    localProducts: ' Local Products',
    jobsCollab: ' Jobs & Collaboration',
    myProgress: ' My Progress',
    dailyTip: 'Daily Tip',
    
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
    story:'\n' +
        'The air in Arun’s small workshop is thick with the sweet, woody scent of Kaddur and Kadamba. For years, the vibrant art of traditional wooden mask carving felt like a sunset art, fading with the older generation. Arun, however, saw not an ending, but a challenge. He inherited not wealth, but a singular, essential tool: his grandfather\'s chisel, smoothed and worn by decades of tireless work.\n' +
        '\n' +
        'His journey began with just a few rupees, enough to buy a small block of wood. The first masks he carved were clumsy, but they held a promise—the ancient, soulful expressions passed down through his family. He spent every day refining the tilt of a demon’s eye, the serenity of a deity\'s smile, and the subtle, lifelike textures that define this intricate craft.\n' +
        '\n' +
        'The turning point wasn\'t a sudden burst of sales, but recognition from a local cultural society. They saw the purity and persistence in his work. He started teaching, sharing his knowledge, and suddenly, his craft was alive again. His customer base grew beyond local patrons to include international collectors and museums who cherished the authenticity of his handiwork.\n' +
        '\n' +
        'From a solitary artist struggling to keep the lights on, Arun is now the master of a thriving cooperative, employing three apprentices. His income has soared, but his true measure of success lies in the revival of the tradition. He proved that even in a digital world, there is an unquenchable thirst for things made by human hands, carrying a legacy carved in wood.\n' +
        '\n' +
        'Today, Arun’s masks adorn galleries, and his small shop has become a center for cultural preservation. He’s not just carving wood; he’s carving the future of an ancient art, one patient, perfect stroke at a time. His legacy is proof that passion, linked to deep cultural roots, can always find a global audience.',

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
    'Investor Pitches': 'Investor Pitches',

    // EN
    welcomeBack: 'Welcome back, {{name}}! 👋',
    welcomeTitle: 'Welcome to EmpowerLearn! ',
    memberAdmin: '{{district}} • {{role}}',
    role_admin: ' Admin',
    role_member: '👤 Member',
    bizAdvisor: 'BiZ Advisor',
    viewAll: 'View All',
    viewStory: 'View Story',
    listen: 'Listen',
    stop: 'Stop',
    fromToCustomers: 'From {{amount}} to {{customers}} — a journey of passion and persistence that transformed a small dream into a thriving local business.',
    rsAmount: 'Rs. {{amount}}',
    dailyCustomers: '{{count}}+ daily customers',
    apply: 'Apply',
    farmHelper: 'Farm Helper',
    socialMediaHelper: 'Social Media Helper',
    deliveryPartner: 'Delivery Partner',
    perDay: 'per day',
    perWeek: 'per week',
    perDelivery: 'per delivery',
    listenToTip: 'Listen to Tip',
    storyOfTheWeek: 'Story of the Week',

  },
  
  si: {
    // Sinhala
    appName: 'EmpowerLearn කතා',
    tagline: 'ඔබේ කුසලතා වර්ධනය කරන්න',
    startStory: 'කතාවක් අරඹන්න',
    showSkill: 'මගේ කුසලතාවය පෙන්වන්න',
    storyOfWeek: ' සතියේ කතාව',
    learnGrow: ' ඉගෙනගෙන වර්ධනය',
    localProducts: ' දේශීය නිෂ්පාදන',
    jobsCollab: 'රැකියා සහ සහයෝගීතාවය',
    myProgress: ' මගේ ප්‍රගතිය',
    dailyTip: ' දෛනික උපදෙස',
    
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
    story:'අරුන්ගේ කුඩා වැඩමුළුවේ වාතය කද්දූර් සහ කඩම්බා වල මිහිරි, දැවමය සුවඳින් ඝනයි. වසර ගණනාවක් තිස්සේ, සාම්ප්‍රදායික ලී වෙස් මුහුණු කැටයම් කිරීමේ විචිත්‍රවත් කලාව හිරු බැස යන කලාවක් මෙන් දැනුණු අතර, පැරණි පරම්පරාව සමඟ මැකී ගියේය. කෙසේ වෙතත්, අරුන් දුටුවේ අවසානයක් නොව අභියෝගයකි. ඔහුට උරුම වූයේ ධනය නොව, අද්විතීය, අත්‍යවශ්‍ය මෙවලමකි: ඔහුගේ සීයාගේ චිසල්, දශක ගණනාවක් තිස්සේ වෙහෙස නොබලා වැඩ කිරීමෙන් සුමට කර පැළඳ සිටියේය.\n' +
        '\n' +
        'ඔහුගේ ගමන ආරම්භ වූයේ රුපියල් කිහිපයකින් පමණි, කුඩා ලී කුට්ටියක් මිලදී ගැනීමට ප්‍රමාණවත්. ඔහු කැටයම් කළ පළමු වෙස් මුහුණු අවුල් සහගත විය, නමුත් ඒවාට පොරොන්දුවක් තිබුණි - පුරාණ, ආත්මීය ප්‍රකාශන. යක්ෂයෙකුගේ ඇසේ ඇලවීම, දේවතාවෙකුගේ සිනහවේ සන්සුන් භාවය සහ මෙම සංකීර්ණ ශිල්පය නිර්වචනය කරන සියුම්, ජීවමාන වයනය පිරිපහදු කිරීමට ඔහු සෑම දිනකම ගත කළේය.\n' +
        '\n' +
        'හැරවුම් ලක්ෂ්‍යය වූයේ හදිසි විකුණුම් පිපිරීමක් නොව, දේශීය සංස්කෘතික සමාජයකින් පිළිගැනීමයි. ඔහුගේ කාර්යයේ පාරිශුද්ධභාවය සහ නොපසුබට උත්සාහය ඔවුන් දුටුවේය. ඔහු ඉගැන්වීමට, ඔහුගේ දැනුම බෙදා ගැනීමට පටන් ගත් අතර, හදිසියේම, ඔහුගේ ශිල්පය නැවතත් ජීවමාන විය. ඔහුගේ පාරිභෝගික පදනම දේශීය අනුග්‍රාහකයින් ඉක්මවා වර්ධනය වූ අතර, ඔහුගේ අත්කම් වල සත්‍යතාව අගය කළ ජාත්‍යන්තර එකතුකරන්නන් සහ කෞතුකාගාර ද ඊට ඇතුළත් විය.\n' +
        '\n' +
        'ආලෝකය දැල්වීමට අරගල කරන හුදකලා කලාකරුවෙකුගෙන්, අරුන් දැන් ආධුනිකයින් තිදෙනෙකු සේවයේ යොදවන සමෘද්ධිමත් සමුපකාරයක ප්‍රධානියා වේ. ඔහුගේ ආදායම ඉහළ ගොස් ඇත, නමුත් ඔහුගේ සැබෑ සාර්ථකත්වයේ මිනුම සම්ප්‍රදායේ පුනර්ජීවනය තුළ පවතී. ඩිජිටල් ලෝකයක පවා, ලීයෙන් කැටයම් කළ උරුමයක් රැගෙන මිනිස් අත්වලින් සාදන ලද දේවල් සඳහා නොසන්සිඳෙන පිපාසයක් ඇති බව ඔහු ඔප්පු කළේය.\n' +
        '\n' +
        'අද, අරුන්ගේ වෙස් මුහුණු ගැලරි අලංකාර කරන අතර, ඔහුගේ කුඩා සාප්පුව සංස්කෘතික සංරක්ෂණය සඳහා මධ්‍යස්ථානයක් බවට පත්ව ඇත. ඔහු ලී කැටයම් කිරීම පමණක් නොවේ; ඔහු පුරාණ කලාවක අනාගතය කැටයම් කරයි, එක් රෝගියෙකු, එකවර පරිපූර්ණ පහරක්. ගැඹුරු සංස්කෘතික මූලයන් සමඟ සම්බන්ධ වූ ආශාවට සැමවිටම ගෝලීය ප්‍රේක්ෂක පිරිසක් සොයා ගත හැකි බවට ඔහුගේ උරුමය සාක්ෂියකි.',


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

    // SI
    welcomeBack: 'ආපසු සාදරයෙන් පිළිගනිමු, {{name}}! 👋',
    welcomeTitle: 'EmpowerLearn වෙත සාදරයෙන් පිළිගනිමු! 🎓',
    memberAdmin: '{{district}} • {{role}}',
    role_admin: ' පරිපාලක',
    role_member: ' සාමාජික',
    bizAdvisor: 'ව්‍යාපාර උපදේශක',
    viewAll: 'සියල්ල බලන්න',
    viewStory: 'කතාව බලන්න',
    listen: 'ශ්‍රවණය කරන්න',
    stop: 'නවත්වන්න',
    fromToCustomers: '{{amount}} සිට {{customers}} — කුඩා සිහිනයක් වර්ධනය කර වැඩිදියුණු කළ ගමනක්.',
    rsAmount: 'රු. {{amount}}',
    dailyCustomers: 'දිනපතා ගනුදෙනුකරුවන් {{count}}+',
    apply: 'අයදුම් කරන්න',
    farmHelper: 'ගොවි උදව්කරු',
    socialMediaHelper: 'සමාජ මාධ්‍ය උදව්කරු',
    deliveryPartner: 'බෙදාහැරීමේ හවුල්කරු',
    perDay: 'දිනයකට',
    perWeek: 'සතියකට',
    perDelivery: 'බෙදාහැරීමකට',
    listenToTip: 'උපදෙස්ය ඇසුම',
    storyOfTheWeek: 'සතියේ කතාව',

  },
  
  ta: {
    // Tamil
    appName: 'EmpowerLearn கதைகள்',
    tagline: 'உங்கள் திறமையை வளர்த்துக்கொள்ளுங்கள்',
    startStory: 'கதையைத் தொடங்குங்கள்',
    showSkill: 'என் திறமையைக் காட்டு',
    storyOfWeek: ' வாரத்தின் கதை',
    learnGrow: ' கற்று வளருங்கள்',
    localProducts: ' உள்ளூர் பொருட்கள்',
    jobsCollab: ' வேலைகள் மற்றும் ஒத்துழைப்பு',
    myProgress: ' என் முன்னேற்றம்',
    dailyTip: ' தினசரி உதவிக்குறிப்பு',
    
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
    // TA
    welcomeBack: 'மீண்டும் வரவேற்கிறோம், {{name}}! 👋',
    welcomeTitle: 'EmpowerLearn-க்கு வரவேற்பு! 🎓',
    memberAdmin: '{{district}} • {{role}}',
    role_admin: '👑 நிர்வாகம்',
    role_member: '👤 உறுப்பினர்',
    bizAdvisor: 'வியாபார ஆலோசகர்',
    viewAll: 'அனைத்தையும் காண்க',
    viewStory: 'கதையை பார்க்க',
    listen: 'கேட்க',
    stop: 'நிறுத்து',
    fromToCustomers: '{{amount}} முதல் {{customers}} — சிறிய கனவை வளர்த்த பயணம்.',
    rsAmount: 'ரூ. {{amount}}',
    dailyCustomers: 'நாள்தோறும் {{count}}+ வாடிக்கையாளர்கள்',
    apply: 'விண்ணப்பிக்க',
    farmHelper: 'விவசாய உதவியாளர்',
    socialMediaHelper: 'சோஷியல் மீடியா உதவி',
    deliveryPartner: 'டெலிவரி ப партнер',
    perDay: 'ஒரு நாளுக்கு',
    perWeek: 'ஒரு வாரத்திற்கு',
    perDelivery: 'ஒரு டெலிவரிக்கு',
    listenToTip: 'உதவிக்குறிப்பை கேட்க',
    storyOfTheWeek: 'வாரத்தின் கதை',

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
