import { useEffect, useState } from 'react'

const SIZE = 500
const PADDING = 80

const orbits = [
  {
    r: 100, duration: 20, dir: 1,
    border: 'border-cyber-cyan/30',
    planet: { size: 58, border: 'border-cyber-cyan', shadow: 'shadow-[0_0_14px_rgba(0,243,255,0.6)]', label: 'JAVA', color: 'text-cyber-cyan' }
  },
  {
    r: 148, duration: 30, dir: -1,
    border: 'border-cyber-magenta/30',
    planet: { size: 66, border: 'border-cyber-magenta', shadow: 'shadow-[0_0_14px_rgba(255,0,255,0.6)]', label: 'SPRING', color: 'text-cyber-magenta' }
  },
  {
    r: 192, duration: 40, dir: 1,
    border: 'border-cyber-purple/30',
    planet: { size: 62, border: 'border-cyber-purple', shadow: 'shadow-[0_0_14px_rgba(112,0,255,0.6)]', label: 'REACT', color: 'text-cyber-purple' }
  },
  {
    r: 220, duration: 55, dir: -1,
    border: 'border-white/15',
    planet: { size: 58, border: 'border-white/60', shadow: 'shadow-[0_0_14px_rgba(255,255,255,0.3)]', label: 'SQL', color: 'text-white' }
  },
  {
    r: 248, duration: 70, dir: 1,
    border: 'border-cyber-yellow/30',
    planet: { size: 58, border: 'border-cyber-yellow', shadow: 'shadow-[0_0_14px_rgba(252,238,10,0.6)]', label: 'AWS', color: 'text-cyber-yellow' }
  },
]

function useScale() {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const calc = () => {
      const available = Math.min(window.innerWidth * 0.9, 700)
      setScale(Math.min(1, available / (SIZE + PADDING * 2)))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return scale
}

// Animated planet that counter-rotates to keep label upright
function Planet({ orbit, elapsed }) {
  const { r, duration, dir, planet } = orbit
  // angle in degrees based on time
  const [angle, setAngle] = useState(0)

  useEffect(() => {
    let raf
    let start = null
    const tick = (ts) => {
      if (!start) start = ts
      const deg = ((ts - start) / 1000 / duration) * 360 * dir
      setAngle(deg)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [duration, dir])

  const cx = SIZE / 2
  const cy = SIZE / 2
  const rad = (angle * Math.PI) / 180
  const x = cx + r * Math.cos(rad) - planet.size / 2
  const y = cy + r * Math.sin(rad) - planet.size / 2

  return (
    <div
      className={`planet-node absolute border rounded-full flex flex-col items-center justify-center bg-black ${planet.border} ${planet.shadow} hover:scale-125 transition-transform cursor-pointer z-10`}
      style={{
        width: planet.size,
        height: planet.size,
        left: x,
        top: y,
        // counter-rotate so label stays upright always
        transform: `rotate(${-angle}deg)`,
      }}
    >
      <span className={`planet-label font-bold font-mono whitespace-nowrap select-none ${planet.color}`}
        style={{ fontSize: 10 }}>
        {planet.label}
      </span>
    </div>
  )
}

export default function Skills() {
  const scale = useScale()
  const total = SIZE + PADDING * 2

  return (
    <section id="skills" className="py-20 md:py-32 relative flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-cyber-purple/5 z-[-1]" />

      <h2 className="font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center relative z-10 px-4 skills-heading">
        <span className="text-cyber-cyan">02.</span> SKILLS MATRIX
      </h2>

      <div style={{ width: total * scale, height: total * scale, position: 'relative' }}>
        <div style={{
          width: total,
          height: total,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0, left: 0,
        }}>
          {/* padded container */}
          <div style={{ width: total, height: total, position: 'relative' }}>
            {/* solar system centered inside padding */}
            <div style={{
              width: SIZE, height: SIZE,
              position: 'absolute',
              top: PADDING, left: PADDING,
            }}>
              {/* Orbit rings */}
              {orbits.map((o, i) => (
                <div key={i}
                  className={`absolute rounded-full border ${o.border}`}
                  style={{
                    width: o.r * 2,
                    height: o.r * 2,
                    top: SIZE / 2 - o.r,
                    left: SIZE / 2 - o.r,
                  }}
                />
              ))}

              {/* Core */}
              <div className="skills-core absolute rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-cyber-cyan shadow-[0_0_30px_rgba(0,243,255,0.4)] z-20 flex items-center justify-center font-mono text-center leading-tight text-white"
                style={{
                  width: 80, height: 80,
                  top: SIZE / 2 - 40,
                  left: SIZE / 2 - 40,
                  fontSize: 10,
                }}>
                CORE<br />ENGINE
              </div>

              {/* Planets with counter-rotation */}
              {orbits.map((o, i) => (
                <Planet key={i} orbit={o} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-xs skills-hint text-gray-500 px-4">
        INTERACTIVE ORBITAL MAP /// HOVER NODES TO SCAN
      </p>
    </section>
  )
}
