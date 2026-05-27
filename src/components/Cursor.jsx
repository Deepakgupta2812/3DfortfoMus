import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')

    const onMove = (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)

    const addActive = () => ring.classList.add('active')
    const removeActive = () => ring.classList.remove('active')

    const els = document.querySelectorAll('a, button, .project-card')
    els.forEach(el => {
      el.addEventListener('mouseenter', addActive)
      el.addEventListener('mouseleave', removeActive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      els.forEach(el => {
        el.removeEventListener('mouseenter', addActive)
        el.removeEventListener('mouseleave', removeActive)
      })
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
    </>
  )
}
