import Hero from "@/pages/components/landing/hero.tsx";
import ProblemStatement from "@/pages/components/landing/ProblemStatement.tsx";
import SolutionSection from "@/pages/components/landing/SolutionStatement.tsx";
import AIComponentsSection from "./components/landing/AIComponentsSection";
import TeamSection from "./components/landing/TheTeam";
import TechStack from "./components/landing/TechStack";

export default function LandingPage() {
  return (
    <div className="w-screen overflow-x-hidden flex flex-col">
      <section className="h-screen">
        <Hero user="test" />
      </section>
      <ProblemStatement />
      <SolutionSection />
      <AIComponentsSection />
      <TechStack />
      <TeamSection />
      {/* Footer */}
      <footer className="w-full py-6 text-center bg-[#FFF3E0] text-neutral-800 ">
        © All rights reserved. Team Zyndicate 2025. Made with ❤️ for the Rural Community.
        </footer>

    </div>
  );
}
