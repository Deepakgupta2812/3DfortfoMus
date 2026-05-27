import { useEffect, useState } from 'react'

const SIZE = 600 // base solar system canvas size in px

const orbits = [
  { px: 256, border: 'border-cyber-cyan/20', duration: '20s', dir: 'reverse',
    planet: { pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2', px: 48, border: 'border-cyber-cyan', shadow: 'shadow-[0_0_15px_rgba(0,243,255,0.5)]', label: 'JAVA' } },
  { px: 384, border: 'border-cyber-magenta/20', duration: '30s', dir: 'normal',
    planet: { pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2', px: 48, border: 'border-cyber-magenta', shadow: 'shadow-[0_0_15px_rgba(255,0,255,0.5)]', label: 'SPRING' } },
  { px: 450, border: 'border-cyber-purple/20', duration: '40s', dir: 'reverse',
    planet: { pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2', px: 56, border: 'border-cyber-purple', shadow: 'shadow-[0_0_15px_rgba(112,0,255,0.5)]', label: 'REACT' } },
  { px: 550, border: 'border-white/10', duration: '50s', dir: 'normal',
    planet: { pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2', px: 48, border: 'border-white', shadow: 'shadow-[0_0_15px_rgba(255,255,255,0.3)]', label: 'SQL' } },
  { px: 600, border: 'border-cyber-yellow/20', duration: '70s', dir: 'reverse',
    planet: { pos: 'top-[12%] left-[12%]', px: 48, border: 'border-cyber-yellow', shadow: 'shadow-[0_0_15px_rgba(252,238,10,0.5)]', label: 'AWS' } },
]

function useScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const calc = () => setScale(Math.min(1, (window.innerWidth * 0.9) / SIZE))
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return scale
}

export default function Skills() {
  const scale = useScale()

  return (
    <section id="skills" className="py-20 md:py-32 relative flex flex-col items-center">
      <div className="absolute inset-0 bg-cyber-purple/5 z-[-1]" />

      <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center relative z-10 px-4">
        <span className="text-cyber-cyan">02.</span> SKILLS MATRIX
      </h2>

      {/* Container height matches scaled size so no clipping */}
      <div className="w-full flex justify-center items-center"
        style={{ height: SIZE * scale }}>
        <div style={{
          width: SIZE, height: SIZE, flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}>
          <div className="solar-system" style={{ width: SIZE, height: SIZE }}>
            {/* Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-cyber-cyan shadow-[0_0_30px_rgba(0,243,255,0.4)] z-20 flex items-center justify-center text-xs font-mono text-center leading-tight">
              CORE<br />ENGINE
            </div>

            {orbits.map((o, i) => (
              <div key={i}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border ${o.border}`}
                style={{
                  width: o.px, height: o.px,
                  animation: `spin ${o.duration} linear infinite ${o.dir === 'reverse' ? 'reverse' : ''}`,
                }}>
                <div
                  className={`absolute ${o.planet.pos} bg-black border ${o.planet.border} rounded-full flex items-center justify-center planet ${o.planet.shadow} hover:scale-125 transition-transform`}
                  style={{ width: o.planet.px, height: o.planet.px }}>
                  <span className="text-[10px]">{o.planet.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-xs text-gray-500 px-4">
        INTERACTIVE ORBITAL MAP /// HOVER NODES TO SCAN
      </p>
    </section>
  )
}
