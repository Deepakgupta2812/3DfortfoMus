import { useState } from 'react'
import { Cpu, Terminal, VolumeX, Volume2, Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Navbar({ onToggleConsole, onToggleAudio, audioOn }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { bright, toggle } = useTheme()

  const navLinks = [
    { href: '#about', label: '01. ABOUT' },
    { href: '#skills', label: '02. SKILLS' },
    { href: '#projects', label: '03. PROJECTS' },
    { href: '#experience', label: '04. TIMELINE' },
    { href: '#contact', label: '05. CONTACT' },
  ]

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 border border-cyber-cyan flex items-center justify-center relative overflow-hidden group-hover:bg-cyber-cyan/20 transition">
            <Cpu className="w-4 h-4 text-cyber-cyan" />
            <div className="absolute inset-0 bg-cyber-cyan opacity-20 animate-pulse" />
          </div>
          <span className="font-orbitron font-bold text-lg md:text-xl tracking-widest nav-text">
            DEEPAK<span className="text-cyber-cyan">.OS</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="glass-panel px-6 py-2 rounded-full hidden md:flex gap-8 neon-border">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="hover:text-cyber-cyan transition font-mono text-sm bg-transparent border-none cursor-pointer nav-link">
              {l.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 md:gap-3 items-center">
          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="p-2 glass-panel rounded-full hover:bg-cyber-cyan/20 transition group"
            title={bright ? 'Switch to Dark' : 'Switch to Bright'}
          >
            {bright
              ? <Moon className="w-5 h-5 text-cyber-cyan" />
              : <Sun className="w-5 h-5 text-yellow-300" />}
          </button>

          <button onClick={onToggleConsole}
            className="p-2 glass-panel rounded-full hover:bg-cyber-cyan/20 transition group" title="Terminal">
            <Terminal className="w-5 h-5 text-cyber-cyan group-hover:rotate-90 transition-transform" />
          </button>

          <button onClick={onToggleAudio} id="audio-btn"
            className="p-2 glass-panel rounded-full hover:bg-cyber-cyan/20 transition relative">
            {audioOn
              ? <Volume2 className="w-5 h-5 text-cyber-cyan" />
              : <VolumeX className="w-5 h-5 nav-icon" />}
            {audioOn && (
              <span className="absolute inset-0 rounded-full border border-cyber-cyan animate-ping opacity-40" />
            )}
          </button>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(o => !o)}
            className="p-2 glass-panel rounded-full hover:bg-cyber-cyan/20 transition md:hidden">
            {mobileOpen ? <X className="w-5 h-5 text-cyber-cyan" /> : <Menu className="w-5 h-5 nav-icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 glass-panel rounded-xl p-4 flex flex-col gap-3 neon-border">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-left hover:text-cyber-cyan transition font-mono text-sm bg-transparent border-none cursor-pointer nav-link py-2 border-b border-white/5">
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
