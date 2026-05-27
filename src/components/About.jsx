import { useRef } from 'react'
import { User } from 'lucide-react'

export default function About() {
  const cardRef = useRef(null)
  const containerRef = useRef(null)

  const onMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -10
    const rotY = ((x - cx) / cx) * 10
    cardRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
  }

  const onMouseLeave = () => {
    cardRef.current.style.transform = 'rotateX(0) rotateY(0)'
  }

  return (
    <section id="about" className="py-20 md:py-32 relative px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-8 flex items-center gap-4 flex-wrap">
            <span className="text-cyber-magenta">01.</span> USER PROFILE
            <div className="h-[1px] flex-grow bg-gradient-to-r from-cyber-magenta/50 to-transparent min-w-[40px]" />
          </h2>

          <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed border-l-2 border-cyber-cyan pl-4">
            I am a <span className="text-white font-bold">Full Stack Engineer</span> and{' '}
            <span className="text-white font-bold">3D Web Creator</span> specialized in building
            high-performance digital ecosystems. I don't just write code; I architect immersive experiences.
          </p>

          <p className="text-gray-400 mb-8 text-sm md:text-base">
            My journey began with a curiosity for how things work, evolving into a proficiency in Java
            ecosystems and modern JavaScript frameworks. I merge backend robustness with frontend flair.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono text-sm">
            {[
              { label: 'NAME', value: 'DEEPAK GUPTA', color: 'border-cyber-cyan', textColor: 'text-cyber-cyan' },
              { label: 'ROLE', value: 'SOFTWARE ENGR', color: 'border-cyber-purple', textColor: 'text-cyber-purple' },
              { label: 'STATUS', value: 'OPEN TO WORK', color: 'border-cyber-magenta', textColor: 'text-cyber-magenta' },
            ].map(item => (
              <div key={item.label} className={`glass-panel p-3 border-l-2 ${item.color}`}>
                <span className={`block text-xs ${item.textColor}`}>{item.label}</span>
                {item.value}
              </div>
            ))}
          </div>
        </div>

        {/* Holographic Card */}
        <div className="order-1 lg:order-2 flex justify-center perspective-container"
          ref={containerRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
          style={{ perspective: '1000px' }}>
          <div ref={cardRef}
            className="relative w-72 md:w-80 h-[420px] md:h-[450px] bg-black/40 border border-cyber-cyan/30 rounded-lg p-6 backdrop-blur-md"
            style={{ transition: 'transform 0.1s', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 rounded-lg pointer-events-none" />

            <div className="w-full h-44 md:h-48 bg-gray-900/50 rounded border border-cyber-cyan/20 mb-6 overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-cyber-cyan">
                <User className="w-16 md:w-20 h-16 md:h-20 opacity-50" />
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-cyber-cyan/50 shadow-[0_0_10px_#00f3ff] animate-scan" />
            </div>

            <h3 className="font-orbitron text-xl md:text-2xl font-bold text-white mb-2">Deepak Gupta</h3>
            <p className="text-cyber-cyan font-mono text-sm mb-6">@deepak_dev_v1</p>

            <div className="space-y-3">
              {[
                { label: 'Java', pct: '90%', color: 'bg-cyber-cyan' },
                { label: 'React', pct: '85%', color: 'bg-cyber-magenta' },
                { label: 'Three.js', pct: '70%', color: 'bg-cyber-purple' },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm items-center">
                  <span className="text-gray-400 w-16">{s.label}</span>
                  <div className="w-24 h-1 bg-gray-800">
                    <div className={`h-full ${s.color}`} style={{ width: s.pct }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-cyan" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-cyan" />
          </div>
        </div>
      </div>
    </section>
  )
}
