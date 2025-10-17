import { Lightbulb, Users, Mic, Sparkles, Rocket } from "lucide-react";
import React from "react";

export default function SolutionSection() {
  const features = [
    {
      icon: <Lightbulb className="w-7 h-7 text-orange-500" />,
      title: "Learn & Grow",
      desc: "Voice-guided skill stories for low-literacy users.",
    },
    {
      icon: <Sparkles className="w-7 h-7 text-orange-500" />,
      title: "Show Their Skill",
      desc: "Post local crafts and services for visibility.",
    },
    {
      icon: <Mic className="w-7 h-7 text-orange-500" />,
      title: "Connect with Investors",
      desc: "AI transforms voice pitches into proposals.",
    },
    {
      icon: <Users className="w-7 h-7 text-orange-500" />,
      title: "Collaborate & Earn",
      desc: "Find mentors, jobs, and local opportunities.",
    },
  ];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[#FFFDF8] overflow-hidden px-6">
      {/* Decorative glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-100/30 rounded-full blur-3xl -z-10" />

      {/* Header */}
      <div className="max-w-3xl mb-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-3">
          Our Solution - <span className="not-italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F57C00] via-[#FB8C00] to-[#FFB300]">“Arunoda”</span><span> Platform</span>
        </h2>
        <p className="text-lg md:text-xl text-neutral-800">
          <span className="font-semibold text-orange-600">Arunoda</span> is an AI-powered, offline-friendly
          PWA that empowers entrepreneurs, investors, and learners in rural Sri Lanka, even with limited
          connectivity or literacy.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mt-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative rounded-2xl p-5 text-left shadow-md overflow-hidden cursor-pointer
                      bg-white hover:bg-orange-500 transition-colors duration-300"
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-300 group-hover:bg-white">
                {React.cloneElement(f.icon, {
                  className: "w-7 h-7 text-orange-500 transition-colors duration-300 group-hover:text-orange-500",
                })}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-orange-500 transition-colors duration-300 group-hover:text-white mb-1">
                {f.title}
              </h3>

              {/* Description */}
              <p className="text-orange-400 text-sm md:text-base leading-snug transition-colors duration-300 group-hover:text-white">
                {f.desc}
              </p>
            </div>

            {/* Hover gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FB8C00] to-[#F57C00] opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>

            {/* Orange bottom line on hover */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-orange-500 rounded transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>

      {/* Tagline */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-orange-100 shadow-sm">
          <Rocket className="w-5 h-5 text-orange-600" />
          <span className="text-orange-700 text-sm md:text-base font-semibold">Empowering Rural Innovation</span>
        </div>
      </div>
    </section>
  );
}
