import { Headphones, FileText, CheckCircle, Zap, ShoppingCart, Coins } from "lucide-react";
import React from "react";

export default function AIComponentsSection() {
  const features = [
    { icon: <FileText className="w-6 h-6 text-orange-500" />, title: "Business Planning & Strategy" },
    { icon: <Zap className="w-6 h-6 text-orange-500" />, title: "Operations & Growth" },
    { icon: <ShoppingCart className="w-6 h-6 text-orange-500" />, title: "Marketing & Sales" },
    { icon: <Coins className="w-6 h-6 text-orange-500" />, title: "Financial Management" },
  ];

  const positions = [-480, -240, 240, 480];
  const y = 0; 

  return (
    <section className="relative py-24 bg-gradient-to-br from-[#FFF8F2] via-[#FFF3E0] to-[#FFE0B2] overflow-hidden px-6">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-orange-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-orange-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12 relative z-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">🤖 AI Components</h2>
          <p className="text-lg md:text-xl text-neutral-800 max-w-3xl mx-auto">
            Our Pitch Coach Agent turns any user idea into a clear, professional, investor-ready pitch, in Sinhala, Tamil, or English.
          </p>
        </div>

        {/* Center Icon + Features */}
        <div className="relative w-full h-96 mx-auto flex items-center justify-center group">
          {/* Center AI Icon */}
          <div className="absolute w-40 h-40 rounded-full bg-orange-100 flex items-center justify-center shadow-lg text-6xl cursor-pointer animate-pulse hover:scale-105 transition-transform z-10">
            🤖
          </div>

          {/* Feature Icons */}
          {features.map((f, i) => {
            const x = positions[i];
            return (
              <div
                key={i}
                className="absolute w-48 h-48 rounded-full bg-white shadow-lg flex flex-col items-center justify-center cursor-pointer z-0
                  scale-0 opacity-0
                  transition-all duration-500 ease-out
                  group-hover:scale-100
                  group-hover:opacity-100
                  hover:shadow-2xl hover:scale-105"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 mb-2 transition-transform duration-300 hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="text-xs font-semibold text-orange-500 bg-white px-3 py-1.5 rounded-md text-center line-clamp-3 w-36">
                  {f.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
