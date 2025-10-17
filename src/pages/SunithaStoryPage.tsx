import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
// Added social icons
import { OfflineBadge } from '@/components/OfflineBadge';
import { useNavigate } from 'react-router-dom';
import { Facebook, Linkedin, Twitter,Play, Link as LinkIcon, MapPin, Award } from "lucide-react";
import {useI18n} from '@/lib/i18n';

// New Content for the Mask Artisan
const storyTitle = "Arun's Legacy: Rebirth of Traditional Hand-Carved Masks";



const SunithaStoryPage = () => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { t, language } = useI18n();
  const storyText = t("story");


  // Speech synthesis logic remains the same
    const speakStory = () => {
        window.speechSynthesis.cancel();

        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        const text = t("story");
        const utterance = new SpeechSynthesisUtterance(text);

        // Select language + safe fallback
        let targetLang = "en-US";
        if (language === "si") targetLang = "si";
        else if (language === "ta") targetLang = "ta-IN";
        utterance.lang = targetLang;

        // Try to match a voice
        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find(v => v.lang.startsWith(targetLang));

        if (matchedVoice) {
            utterance.voice = matchedVoice;
        } else {
            // Fallback to English voice with warning
            console.warn(`⚠️ No ${targetLang} voice found — falling back to English.`);
            const englishVoice = voices.find(v => v.lang.startsWith("en")) || null;
            if (englishVoice) utterance.voice = englishVoice;
        }

        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.onend = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
    };

    useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  // --- Utility Components for Cleaner Structure ---

  const ArunProfileCard = () => (
  <aside className="sticky top-6">
    <div className="rounded-2xl border border-orange-100/70 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">

      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#F57C00] via-[#FB8C00] to-[#FFB300]" />

      <div className="p-6 space-y-5">
        {/* Title */}
        <h3 className="text-lg font-semibold tracking-wide text-neutral-800 dark:text-neutral-100">
          About the Artisan
        </h3>

        {/* Profile row */}
        <div className="flex items-center gap-4">
          <img
            src="/img/story/profile.png"
            alt="Arun, Mask Artisan"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-200"
          />
          <div>
            <p className="text-2xl font-extrabold leading-tight text-neutral-900 dark:text-white font-serif">
              Arun Sharma
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Master Carver &amp; Legacy Keeper
            </p>
            {/* small meta (optional) */}
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#F57C00]" /> Ambalangoda, LK
              </span>
              <span className="inline-flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#F57C00]" /> 20+ years
              </span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-sm italic text-neutral-600 dark:text-neutral-300 border-l-4 border-[#F57C00]/60 pl-3">
          “I carved my own future with the same patience I use on the wood. The goal isn’t just a mask; it’s a piece of our history.”
        </blockquote>

        {/* Social */}
        <div className="pt-1">
          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            Connect with Arun
          </h4>
          <div className="flex gap-2">
            <a
              href="#"
              aria-label="Facebook"
              className="p-2 rounded-full bg-orange-50 text-[#F57C00] hover:bg-orange-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-orange-50 text-[#F57C00] hover:bg-orange-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              aria-label="X / Twitter"
              className="p-2 rounded-full bg-orange-50 text-[#F57C00] hover:bg-orange-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Related Stories */}
        <div className="pt-3 border-t border-orange-100/60 dark:border-neutral-800">
          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            Related Stories
          </h4>
          <ul className="text-sm space-y-1.5">
            <li>
              <a href="#" className="group inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-[#F57C00] transition">
                <LinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-[#F57C00]" />
                The Basket Weaver&apos;s Revival
              </a>
            </li>
            <li>
              <a href="#" className="group inline-flex items-center gap-2 text-neutral-700 dark:text-neutral-300 hover:text-[#F57C00] transition">
                <LinkIcon className="w-4 h-4 text-neutral-400 group-hover:text-[#F57C00]" />
                Clay Potters Go Digital
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
);


  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        
{/* --- MAIN ARTICLE CONTAINER --- */}
<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">

  {/* --- HERO SECTION --- */}
  <div className="relative  h-64 md:h-80 lg:h-96">
          {/* --- BACK BUTTON --- */}
    <div className="absolute top-4 left-4 z-20">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white dark:bg-gray-700/70 dark:text-gray-200 rounded-full px-3 py-1 shadow-sm"
      >
        ← Back to Artisan Stories
      </Button>
    </div>

    {/* --- HERO IMAGE --- */}
    <img
      src="/img/story/header.png"
      alt="Hand-carved traditional wooden mask"
      className=" h-full w-full object-cover"
    />

             {/* Title Overlay for Hero Section */}
             <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-8">
                <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                    {storyTitle}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                    <span className="text-base text-orange-400 font-semibold uppercase tracking-wider">
                        Artisan Profile
                    </span>
                    <OfflineBadge />
                </div>
            </div>
          </div>

          {/* Article Body and Sidebar */}
          <div className="flex flex-col lg:flex-row gap-10 p-6 sm:p-10">
            
            {/* Left Column: Story Text & Primary Actions */}
            <div className="lg:w-2/3 space-y-8">
                
                {/* Listen Button & Intro */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4">
                    <p className="text-lg text-gray-700 dark:text-gray-300 font-medium italic">
                        The Story of Revival: A legacy carved in wood.
                    </p>
                    <Button 
                        size="lg" 
                        onClick={speakStory}
                        className="mt-4 sm:mt-0 bg-orange-600 hover:bg-orange-700 text-white shadow-md"
                    >
                        <Play className="h-5 w-5 mr-2" />
                        {isSpeaking ? 'Stop Reading' : 'Listen to Story'}
                    </Button>
                </div>

                {/* Full Story Text */}
                <p className="text-base text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                   {t("story")}
                </p>
            </div>

            {/* Right Column: Profile Sidebar (Sticky on desktop) */}
            <div className="lg:w-1/3">
              <ArunProfileCard />
            </div>
          </div>
          
        </div> {/* End of Main Article Container */}


        {/* --- Product Showcase Section --- */}
<section className="max-w-5xl mx-auto py-10 space-y-8">
  <h2 className="text-3xl font-bold text-neutral-900 dark:text-white text-center">
    Featured Creations 
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Card */}
    {[
      {
        id: 1,
        title: "The Serene Deva Mask",
        description: "Hand-carved Kadamba wood, representing peace and protection.",
        price: "Rs. 8,500",
        image:
          "/img/story/pr2.jpeg",
        link: "/product/deva-mask",
      },
      {
        id: 2,
        title: "Vibrant Rakshasa Mask",
        description: "Bold colors and intricate detail, a classic folklore piece.",
        price: "Rs. 12,000",
        image:
          "/img/story/pr3.jpg",
        link: "/product/rakshasa-mask",
      },
      {
        id: 3,
        title: "Guardian Lion Mask",
        description: "Symbol of strength and courage, carved from seasoned teak.",
        price: "Rs. 9,900",
        image:
          "/img/story/pr2.jpeg",
        link: "/product/lion-mask",
      },
    ].map((item) => (
      <div
        key={item.id}
        onClick={() => navigate(item.link)}
        className="group cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* View Details button (on hover) */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all">
            <button
              onClick={() => navigate(item.link)}
              className="px-4 py-1.5 text-sm font-semibold bg-[#F57C00] text-white rounded-full hover:bg-[#EF6C00] active:bg-[#E65100]"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Text content */}
        <div className="p-5 space-y-2">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-[#F57C00] transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {item.description}
          </p>
          <p className="text-xl font-bold text-[#F57C00]">{item.price}</p>
        </div>
      </div>
    ))}
  </div>
</section>

      </div>
    </div>
  );
};

export default SunithaStoryPage;