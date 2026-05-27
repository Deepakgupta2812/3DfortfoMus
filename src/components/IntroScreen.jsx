import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function IntroScreen({ onComplete }) {
  const screenRef = useRef(null)
  const barRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.to(barRef.current, { width: '100%', duration: 2, ease: 'power2.inOut' })
      .to(textRef.current, { opacity: 0, duration: 0.5 })
      .add(() => { if (textRef.current) textRef.current.textContent = 'ACCESSING MAINFRAME...' })
      .to(textRef.current, { opacity: 1, duration: 0.3 })
      .to(barRef.current, { width: '0%', duration: 1, delay: 0.5 })
      .to(screenRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1,
        ease: 'expo.inOut',
        onComplete,
      })
  }, [onComplete])

  return (
    <div id="intro-screen" ref={screenRef}>
      <div className="loader-ring mb-8" />
      <div ref={textRef} className="font-mono text-cyber-cyan text-lg glow-text">
        INITIALIZING SYSTEM...
      </div>
      <div className="mt-4 w-64 h-1 bg-gray-900 rounded overflow-hidden">
        <div ref={barRef} className="h-full bg-cyber-cyan w-0" />
      </div>
    </div>
  )
}
