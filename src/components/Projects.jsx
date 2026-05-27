import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    tag: 'JAVA', tagColor: 'text-cyber-cyan', tagBorder: 'border-cyber-cyan/30',
    hoverBorder: 'group-hover:border-cyber-cyan/50',
    title: 'Hibernate ORM', titleHover: 'group-hover:text-cyber-cyan',
    desc: 'Advanced object-relational mapping tool implementation with custom caching mechanisms.',
    techs: ['Java', 'SQL'],
    arrowColor: 'text-cyber-cyan',
    img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    link: 'https://hibernate.org/orm/documentation/',
  },
  {
    tag: 'BIG DATA', tagColor: 'text-cyber-purple', tagBorder: 'border-cyber-purple/30',
    hoverBorder: 'group-hover:border-cyber-purple/50',
    title: 'Hadoop Cluster', titleHover: 'group-hover:text-cyber-purple',
    desc: 'Distributed storage and processing system handling petabytes of data flow.',
    techs: ['Hadoop', 'MapReduce'],
    arrowColor: 'text-cyber-purple',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    link: 'https://hadoop.apache.org/docs/stable/',
  },
  {
    tag: 'AI', tagColor: 'text-cyber-magenta', tagBorder: 'border-cyber-magenta/30',
    hoverBorder: 'group-hover:border-cyber-magenta/50',
    title: 'AI Portfolio', titleHover: 'group-hover:text-cyber-magenta',
    desc: 'This website. Neural network inspired interface with WebGL visualizations.',
    techs: ['Three.js', 'React'],
    arrowColor: 'text-cyber-magenta',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    link: 'https://threejs.org/docs/',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-6 bg-black/40">
      <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-right max-w-7xl mx-auto flex flex-row-reverse items-center gap-4 flex-wrap">
        <span className="text-cyber-magenta">03.</span> PROJECT LAB
        <div className="h-[1px] flex-grow bg-gradient-to-l from-cyber-magenta/50 to-transparent min-w-[40px]" />
      </h2>

      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((p) => (
          <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer"
            className="project-card group block h-[380px] md:h-[400px]">
            <div className={`project-card-inner relative w-full h-full glass-panel rounded-xl overflow-hidden border border-white/10 ${p.hoverBorder} transition-all duration-300`}>
              <div className="h-44 md:h-48 bg-gray-900 relative overflow-hidden">
                <img src={p.img} alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className={`absolute top-2 right-2 px-2 py-1 bg-black/80 ${p.tagColor} text-xs font-mono border ${p.tagBorder} rounded`}>
                  {p.tag}
                </div>
              </div>

              <div className="p-5 md:p-6 relative z-10">
                <h3 className={`text-xl md:text-2xl font-orbitron font-bold mb-2 ${p.titleHover} transition`}>{p.title}</h3>
                <p className="text-gray-400 text-xs md:text-sm mb-4">{p.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {p.techs.map(t => (
                    <span key={t} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/10">{t}</span>
                  ))}
                </div>
                {/* Always show arrow, animate on hover */}
                <div className={`absolute bottom-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${p.arrowColor}`}>
                  <span className="text-xs font-mono">VIEW DOCS</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
