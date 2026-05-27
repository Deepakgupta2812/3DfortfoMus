import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ThreeBackground({ visible }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!visible) return

    const canvas = canvasRef.current
    let width = window.innerWidth
    let height = window.innerHeight

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050505, 0.002)

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Stars
    const starGeo = new THREE.BufferGeometry()
    const pos = new Float32Array(2000 * 3)
    for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 50
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.8 }))
    scene.add(starField)

    // Hero Sphere
    const heroSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true, transparent: true, opacity: 0.3 })
    )
    heroSphere.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 2), new THREE.MeshBasicMaterial({ color: 0x000000 })))
    heroSphere.position.set(width > 768 ? 2 : 0, 0, 0)
    scene.add(heroSphere)

    // Earth
    const earthGlobe = new THREE.Mesh(
      new THREE.SphereGeometry(2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x7000ff, wireframe: true, transparent: true, opacity: 0.2 })
    )
    earthGlobe.position.set(0, -10, 0)
    scene.add(earthGlobe)

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))
    const pl = new THREE.PointLight(0x00f3ff, 1)
    pl.position.set(5, 5, 5)
    scene.add(pl)

    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      heroSphere.rotation.y += 0.005
      heroSphere.rotation.x += 0.002
      earthGlobe.rotation.y += 0.002
      starField.rotation.y -= 0.0005
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    // Scroll triggers
    ScrollTrigger.create({
      trigger: '#about', start: 'top bottom', end: 'center center', scrub: true,
      onUpdate: (s) => {
        heroSphere.position.x = (width > 768 ? 2 : 0) + s.progress * 5
        heroSphere.material.opacity = 0.3 - s.progress * 0.3
      }
    })
    ScrollTrigger.create({
      trigger: '#contact', start: 'top bottom', end: 'center center', scrub: true,
      onUpdate: (s) => {
        earthGlobe.position.y = -10 + s.progress * 10
        earthGlobe.position.x = window.innerWidth > 768 ? 2 : 0
      }
    })
    ScrollTrigger.create({
      trigger: 'body', start: 'top top', end: 'bottom bottom',
      onUpdate: (s) => { starField.position.y = s.scroll() * 0.001 }
    })

    canvas.style.opacity = '1'

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [visible])

  return <canvas ref={canvasRef} id="webgl-canvas" />
}
