import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // shadcn/ui
import { Card, CardContent } from "@/components/ui/card";
import { OfflineBadge } from "@/components/OfflineBadge";
import {useI18n} from "@/lib/i18n.ts";


export default function LearnGrowSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(480, el.clientWidth * 0.9); // sensible step
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  const packs = [
    {
      id: "pack_savings",
      title: "Smart Saving",
      image:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
      description:
        "Simple steps to budget, cut waste, and build a 3-month safety buffer.",
      progress: 60,
      lessons: 8,
      duration: "45 min",
      downloaded: true,
    },
    {
      id: "pack_business",
      title: "Start a Small Business",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
      description:
        "From idea to first sale: pricing, permits, and customer trust.",
      progress: 30,
      lessons: 10,
      duration: "1 h",
      downloaded: false,
    },
    {
      id: "pack_digital",
      title: "Digital Basics",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop",
      description:
        "Use your phone safely: WhatsApp, payments, and avoiding scams.",
      progress: 0,
      lessons: 6,
      duration: "35 min",
      downloaded: false,
    },
  ];
  const { t } = useI18n();

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mt-10 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 dark:text-white">
            {t('learnGrow')}
            {/*Learn &amp; Grow*/}
          </h1>
        
        </div>

        <div className="flex items-center gap-2">
          {/* Prev / Next */}
          <button
            onClick={() => scrollBy("left")}
            className="inline-flex items-center justify-center rounded-full p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy("right")}
            className="inline-flex items-center justify-center rounded-full p-2 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <Link
            to="/learn"
            className="ml-2 text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Carousel (snap) */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ scrollbarWidth: "none" }}
      >
        {/* hide scrollbar (webkit) */}
        <style>{`
          [data-learn-scroll]::-webkit-scrollbar { display: none; }
        `}</style>

        <div className="contents" data-learn-scroll>
          {packs.map((pack) => (
            <Link
              key={pack.id}
              to={`/learn/${pack.id}`}
              className="snap-start shrink-0 w-[86%] sm:w-[60%] md:w-[46%] lg:w-[32%] focus:outline-none"
            >
              <Card className="h-full overflow-hidden border border-neutral-200/70 dark:border-neutral-800 hover:shadow-lg transition-shadow">
                {/* Image with overlay */}
                <div className="relative">
                  <img
                    src={pack.image}
                    alt={pack.title}
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                  {/* Top-right status */}
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    {pack.downloaded && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-neutral-900/80 px-2 py-0.5 text-[11px] font-medium text-[#F57C00] ring-1 ring-orange-200 dark:ring-neutral-700">
                        <Download className="w-3.5 h-3.5" /> Offline
                      </span>
                    )}
                  </div>
                  {/* Bottom-left title on image */}
                  <div className="absolute bottom-2 left-2">
                    <span className="rounded-md bg-white/90 dark:bg-neutral-900/80 px-2 py-1 text-xs font-semibold">
                      <span className="inline-flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {pack.lessons} lessons · {pack.duration}
                      </span>
                    </span>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white line-clamp-1">
                    {pack.title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {pack.description}
                  </p>

                  <div className="space-y-1.5">
                    <Progress value={pack.progress} className="h-2" />
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-neutral-500 dark:text-neutral-400">
                        {pack.progress}% Complete
                      </span>
                      {pack.downloaded && <OfflineBadge />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
