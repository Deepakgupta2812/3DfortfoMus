import { useCallback, useEffect, useRef, useState } from 'react'
import useAudio from './hooks/useAudio'
import Lenis from 'lenis'
import IntroScreen from './components/IntroScreen'
import ThreeBackground from './components/ThreeBackground'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Console from './components/Console'
import Notification from './components/Notification'
import { ThemeProvider, useTheme } from './context/ThemeContext'

function AppContent() {
  const [introDone, setIntroDone] = useState(false)
  const [consoleOpen, setConsoleOpen] = useState(false)
  const [audioOn, setAudioOn] = useState(false)
  const [notif, setNotif] = useState({ msg: '', visible: false })
  const notifTimer = useRef(null)
  const { bright } = useTheme()

  const showNotification = useCallback((msg) => {
    clearTimeout(notifTimer.current)
    setNotif({ msg, visible: true })
    notifTimer.current = setTimeout(() => setNotif(n => ({ ...n, visible: false })), 3000)
  }, [])

  useAudio(audioOn)

  const toggleAudio = () => {
    const next = !audioOn
    setAudioOn(next)
    showNotification(next ? 'AUDIO: ENABLED' : 'AUDIO: MUTED')
  }

  useEffect(() => {
    if (!introDone) return
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [introDone])

  return (
    <div className={bright ? 'bright-theme' : ''}>
      <div className="noise-overlay" />
      <Cursor />
      <ThreeBackground visible={introDone} />

      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

      <div
        id="main-content"
        className="transition-opacity duration-1000"
        style={{ opacity: introDone ? 1 : 0 }}>
        <Navbar
          onToggleConsole={() => setConsoleOpen(o => !o)}
          onToggleAudio={toggleAudio}
          audioOn={audioOn}
        />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact showNotification={showNotification} />
        </main>
        <footer className="py-8 text-center text-xs font-mono border-t border-white/5 footer-text">
          <p>SYSTEM DESIGN © 2026 DEEPAK GUPTA // ALL RIGHTS RESERVED</p>
          <p className="mt-2">RENDERED IN: <span className="text-cyber-cyan">0.02ms</span></p>
        </footer>
      </div>

      <Console open={consoleOpen} onClose={() => setConsoleOpen(false)} />
      <Notification message={notif.msg} visible={notif.visible} />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
