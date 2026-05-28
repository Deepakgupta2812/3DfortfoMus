import { useEffect, useRef, useState } from 'react'

const texts = ['JAVA DEVELOPER', 'FULL STACK ENGINEER', '3D WEB CREATOR', 'AI ENTHUSIAST']

export default function Hero() {
  const [displayed, setDisplayed] = useState('')
  const countRef = useRef(0)
  const indexRef = useRef(0)

  useEffect(() => {
    let timeout
    function type() {
      const current = texts[countRef.current]
      const letter = current.slice(0, ++indexRef.current)
      setDisplayed(letter)
      if (letter.length === current.length) {
        timeout = setTimeout(() => {
          countRef.current = (countRef.current + 1) % texts.length
          indexRef.current = 0
          timeout = setTimeout(type, 500)
        }, 2000)
      } else {
        timeout = setTimeout(type, 100)
      }
    }
    type()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* HUD Left */}
      <div className="hero-hud absolute top-32 left-4 lg:left-10 hidden lg:block text-xs font-mono text-cyber-cyan/60">
        <p>SYS.STATUS: ONLINE</p>
        <p>LOC: HYDERABAD, IN</p>
        <p>LAT: 17.3850 N</p>
        <p>UPTIME: 99.9%</p>
        <div className="w-32 h-24 border-t border-l border-cyber-cyan/30 mt-2 relative">
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyber-cyan animate-ping" />
        </div>
      </div>

      {/* HUD Right */}
      <div className="hero-hud-r absolute top-32 right-4 lg:right-10 hidden lg:block text-right text-xs font-mono text-cyber-magenta/60">
        <p>CPU: 12%</p>
        <p>MEM: 4.2GB</p>
        <p>NET: 1GBPS</p>
        <p>AI: ACTIVE</p>
        <div className="w-32 h-24 border-b border-r border-cyber-magenta/30 mt-2 flex justify-end items-start">
          <svg width="40" height="40" viewBox="0 0 100 100" className="animate-spin" style={{ animationDuration: '4s' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff00ff" strokeWidth="2" strokeDasharray="10 5" />
          </svg>
        </div>
      </div>

      {/* Center Content */}
      <div className="text-center z-10 px-4 w-full max-w-5xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 border border-cyber-cyan/30 rounded-full bg-cyber-dark/50 backdrop-blur">
          <span className="text-cyber-cyan text-xs font-mono animate-pulse">● SYSTEM READY</span>
        </div>

        <h1 className="font-orbitron text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 tracking-tighter glitch-wrapper">
          <span className="glitch block" data-text="DEEPAK GUPTA">DEEPAK GUPTA</span>
        </h1>

        <div className="h-8 md:h-12 mb-8 flex justify-center">
          <span className="font-mono text-lg md:text-3xl text-cyber-cyan glow-text border-r-2 border-cyber-cyan pr-2">
            {displayed}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-6 md:px-8 py-3 bg-cyber-cyan text-black font-bold font-orbitron overflow-hidden text-sm md:text-base">
            <span className="relative z-10 group-hover:text-white transition">EXPLORE WORK</span>
            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 md:px-8 py-3 border border-cyber-magenta text-cyber-magenta font-bold font-orbitron hover:bg-cyber-magenta hover:text-black transition text-sm md:text-base">
            INITIATE CONTACT
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] font-mono tracking-widest">SCROLL TO SCAN</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-cyber-cyan to-transparent" />
      </div>
    </section>
  )
}
