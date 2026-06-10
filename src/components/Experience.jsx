const nodes = [
  { period: '2026 - PRESENT', title: 'Aspiring Full Stack Developer', desc: 'Building real-world web applications using Java, Spring Boot, React, MongoDB, and MySQL. Exploring cloud deployment, REST APIs, and modern development practices.' },
  { period: '2025 - 2026', title: 'Java Developer Intern', desc: 'Optimized SQL queries by 40%. Contributed to internal tooling using Spring Boot and Hibernate.' },
  {
period: '2024 - 2025', title: 'Personal & Academic Projects', desc: 'Developed projects including Resume Analyzer and portfolio websites. Gained hands-on experience with Git, GitHub, database design, authentication, and responsive web development.'
  },
  { period: '2023 - 2027', title: 'Bachelor of Technology in Computer Science', desc: 'Studying Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, and Software Engineering while actively working on practical development projects.' },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-6 max-w-4xl mx-auto">
      <h2 className="exp-heading font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-white">
        <span className="text-cyber-yellow">04.</span> TIMELINE
      </h2>

      <div className="relative border-l border-cyber-cyan/30 ml-2 md:ml-0 space-y-10 md:space-y-12">
        {nodes.map((n) => (
          <div key={n.title} className="relative md:pl-12 group pl-6">
            <div className="exp-dot absolute -left-[5px] top-0 w-2.5 h-2.5 bg-cyber-black border border-cyber-cyan group-hover:bg-cyber-cyan group-hover:shadow-[0_0_10px_#00f3ff] transition-all duration-300" />
            <div className="exp-card glass-panel p-5 md:p-6 rounded-lg border border-white/5 group-hover:border-cyber-cyan/30 transition-colors">
              <span className="text-cyber-cyan font-mono text-xs">{n.period}</span>
              <h3 className="exp-title text-lg md:text-xl font-bold font-orbitron mt-1 text-white">{n.title}</h3>
              <p className="exp-desc text-gray-400 text-sm mt-2">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
