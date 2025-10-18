import React from "react";
import { Play, TrendingUp } from "lucide-react";

const Hero = ({ user }) => {
  const images = [
    { src: "/img/Home/g1.png", alt: "Entrepreneur 1" },
    { src: "/img/Home/g2.png", alt: "Entrepreneur 2" },
    { src: "/img/Home/g3.png", alt: "Entrepreneur 3" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(1200px_600px_at_-10%_-10%,#FFE4C4_0%,#FFF3E0_30%,#FFF8F2_65%,#FFF_100%)] flex items-center">

      {/* local keyframes for float */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) }
          50% { transform: translateY(-10px) }
          100% { transform: translateY(0) }
        }
      `}</style>

      {/* subtle vertical stripes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08] 
          bg-[repeating-linear-gradient(90deg,rgba(245,124,0,0.25)_0px,rgba(245,124,0,0.25)_2px,transparent_2px,transparent_32px)]
        "
      />

      {/* glow blobs */}
      <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-orange-200/60 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16  md:pb-14 md:pt-14">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="text-left">
            <h1 className="font-extrabold leading-[1.03] tracking-tight text-neutral-900 text-5xl md:text-6xl lg:text-7xl">
              Empower{" "}
              <span className="block">
                Your{" "}
                <em className="not-italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F57C00] via-[#FB8C00] to-[#FFB300]">
                  Dream
                </em>
              </span>
              <span className="block">Wherever You Are</span>
            </h1>

            <p className="mt-5 max-w-xl text-base md:text-lg text-neutral-700">
              Learn, grow, and connect with investors, even offline, in your own language.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#F57C00] hover:bg-[#EF6C00] active:bg-[#E65100] transition shadow-md shadow-orange-500/30">
                <Play className="w-5 h-5 mr-2" /> Get Started
              </button>

              <button className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-[#F57C00] bg-orange-50 hover:bg-orange-100 active:bg-orange-200 transition border border-orange-200">
                <TrendingUp className="w-5 h-5 mr-2" /> Show My Skill
              </button>
            </div>
          </div>

          {/* RIGHT SIDE — vertical pills layout */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="flex justify-center items-end gap-4 h-96">
              {/* Left pill - tall */}
              <PillImage
                img={images[0]}
                ring="ring-orange-500/70"
                className="h-80 w-72"
                style={{ animation: "float 6s ease-in-out infinite" }}
              />

              {/* Center pill - tallest */}
              <PillImage
                img={images[1]}
                ring="ring-amber-500/70"
                className="h-96 w-80"
                style={{ animation: "float 6.5s ease-in-out infinite", animationDelay: "0.2s" }}
              />

              {/* Right pill - tall */}
              <PillImage
                img={images[2]}
                ring="ring-yellow-500/70"
                className="h-80 w-72"
                style={{ animation: "float 6.2s ease-in-out infinite", animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/** Pill-shaped image */
function PillImage({
  img,
  ring = "",
  className = "",
  style,
}: {
  img: { src: string; alt: string };
  ring?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={style}
      className={[
        "relative overflow-hidden ring-4 ring-offset-2 ring-offset-white bg-white/40 backdrop-blur-sm transition-transform",
        "hover:-translate-y-1 rounded-3xl aspect-[2/3]",
        ring,
        className,
      ].join(" ")}
    >
      <img src={img.src} alt={img.alt} className="h-full w-full object-cover" loading="lazy" />
    </div>
  );
}

export default Hero;