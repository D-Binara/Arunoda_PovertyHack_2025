import { AlertTriangle, WifiOff, FileText, Globe2, MessageSquare } from "lucide-react";

export default function ProblemStatement() {
  const problems = [
    {
      icon: <WifiOff className="w-8 h-8 text-orange-500" />,
      title: "Poor Internet & Low Digital Literacy",
      desc: "Many rural entrepreneurs lack stable internet and struggle to use digital tools effectively.",
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      title: "Difficulty Writing Proposals",
      desc: "Formal investor pitches or business plans are often a challenge for creators with great ideas.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-orange-500" />,
      title: "Limited Market Access",
      desc: "They face barriers reaching customers or mentors through online marketplaces.",
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-orange-500" />,
      title: "Language Barriers",
      desc: "Many can express their business ideas better through voice than text.",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#FFF8F2] to-[#FFF3E0] overflow-hidden">
      {/* background decorative glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section header */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-4">
            The Challenge We Aim to Solve
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-700 text-lg">
            In many rural areas of Sri Lanka, talented entrepreneurs and small-scale creators struggle to
            access funding, digital visibility, and skills training. Their challenges include:
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {problems.map((p, i) => (
            <div
                key={i}
                className="relative bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition p-6 text-left group"
            >
                <div className="mb-4">{p.icon}</div>
                <h3 className="text-lg font-semibold text-orange-600 mb-2">{p.title}</h3>
                <p className="text-orange-600 text-sm leading-relaxed">{p.desc}</p>

                {/* Orange line on hover, starting from center */}
                <div className="absolute bottom-0 left-0 w-full h-1 flex justify-center">
                <span className="block w-0 h-1 bg-orange-500 rounded transition-all duration-300 group-hover:w-1/2 origin-center"></span>
                </div>
            </div>
            ))}
        </div>
      </div>
    </section>
  );
}
