const nodes = [
  { period: '2023 - PRESENT', title: 'Full Stack Engineer', desc: 'Developing scalable microservices architectures and immersive front-end interfaces. Integration of 3D assets in web environments.' },
  { period: '2022 - 2023', title: 'Java Developer Intern', desc: 'Optimized SQL queries by 40%. Contributed to internal tooling using Spring Boot and Hibernate.' },
  { period: '2018 - 2022', title: 'Computer Science Degree', desc: 'Focused on Data Structures, Algorithms, and Distributed Systems. Graduated with Honors.' },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-6 max-w-4xl mx-auto">
      <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center">
        <span className="text-cyber-yellow">04.</span> TIMELINE
      </h2>

      <div className="relative border-l border-cyber-cyan/30 ml-2 md:ml-0 space-y-10 md:space-y-12">
        {nodes.map((n) => (
          <div key={n.title} className="relative md:pl-12 group pl-6">
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-cyber-black border border-cyber-cyan group-hover:bg-cyber-cyan group-hover:shadow-[0_0_10px_#00f3ff] transition-all duration-300" />
            <div className="glass-panel p-5 md:p-6 rounded-lg border border-white/5 group-hover:border-cyber-cyan/30 transition-colors">
              <span className="text-cyber-cyan font-mono text-xs">{n.period}</span>
              <h3 className="text-lg md:text-xl font-bold font-orbitron mt-1">{n.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
