import React from "react";
import {
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiGithub,
  SiVercel,
  SiGooglegemini,
  SiOpenaccess,
  SiCss3,
  SiHtml5,
} from "react-icons/si";

function chunkArray(array: any[], size: number) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function TechnologiesSection() {
  const techStack = [
    { icon: <SiReact className="w-10 h-10 text-sky-500" />, name: "React" },
    { icon: <SiExpress className="w-10 h-10 text-black dark:text-white" />, name: "Express.js" },
    { icon: <SiNodedotjs className="w-10 h-10 text-green-600" />, name: "Node.js" },
    { icon: <SiGithub className="w-10 h-10 text-gray-700 dark:text-white" />, name: "GitHub" },
    { icon: <SiMongodb className="w-10 h-10 text-green-500" />, name: "MongoDB" },
    { icon: <SiVercel className="w-10 h-10 text-black dark:text-white" />, name: "Vercel" },
    { icon: <SiTailwindcss className="w-10 h-10 text-cyan-500" />, name: "Tailwind CSS" },
    { icon: <SiGooglegemini className="w-10 h-10 text-sky-400" />, name: "Gemini AI" },
    { icon: <SiHtml5 className="w-10 h-10 text-sky-400" />, name: "Indexed DB" },
  ];

  const groupedTech = chunkArray(techStack, 3);

  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-[#FFF3E0] via-[#FFE0B2] to-[#FFD180] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-300/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-6">
          ⚙️ Technologies We Use
        </h2>
        <p className="text-lg text-neutral-800 mb-14 max-w-2xl mx-auto">
          Our platform is powered by a robust and scalable technology stack designed to deliver
          speed, reliability, and seamless user experience.
        </p>

        {/* Technologies grouped in rows of 3 */}
        <div className="flex flex-col items-center gap-12">
          {groupedTech.map((group, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-8">
              {group.map((tech, index) => (
                <div
                  key={index}
                  className="group relative w-36 h-36 rounded-2xl backdrop-blur-xl bg-white/30 dark:bg-black/30 shadow-xl
                            flex flex-col items-center justify-center border border-white/40 
                            hover:scale-110 transition-transform duration-300 ease-out hover:border-orange-400 hover:shadow-orange-300/40"
                >
                  <div className="text-4xl mb-2 group-hover:animate-pulse">{tech.icon}</div>
                  <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    {tech.name}
                  </h3>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 
                                  bg-gradient-to-br from-orange-100/40 to-transparent rounded-2xl blur-xl"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
