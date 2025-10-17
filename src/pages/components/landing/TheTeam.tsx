import React from "react";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Vishwa Wijesekare",
      role: "Frontend Developer",
      photo: "/img/Team/vishwa.jpg",
      desc: "Works on frontend development, ensuring smooth integration and functionality.",
    },
    {
      name: "Binara Kaveesha",
      role: "DevOps Engineer",
      photo: "/img/Team/binara.jpg",
      desc: "Handles backend development with expertise in Express.js and Node.js.",
    },
    {
      name: "Denuwan Kalubowila",
      role: "Backend Developer",
      photo: "/img/Team/vishwad.jpg",
      desc: "Focuses on backend development to drive innovation in projects.",
    },
    {
      name: "Heshan Navindu",
      role: "UI/UX Designer & Developer",
      photo: "/img/Team/heshan.jpg",
      desc: "Designs user-friendly interfaces and improves user experience across platforms.",
    },
    {
      name: "Pinil Dissanayake",
      role: "AI & ML Developer",
      photo: "/img/Team/pinil.jpg",
      desc: "Developed the AI model.",
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
            Meet Our Team
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-700 text-lg">
            We are <span className="text-4xl not-italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#F57C00] via-[#FB8C00] to-[#FFB300]">Team Zyndicate</span>, a team from the Faculty of Computing, 
            Sabaragamuwa University of Sri Lanka. Here are the talented individuals driving our projects:
          </p>
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-md border border-orange-100 rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer group"
            >
              {/* Photo */}
              <div className="relative w-full h-[21rem] overflow-hidden rounded-t-2xl">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Overlay description on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                  <p className="text-white text-sm leading-relaxed">{member.desc}</p>
                </div>
              </div>

              {/* Name & role */}
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-orange-600 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-orange-500 mb-2">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
