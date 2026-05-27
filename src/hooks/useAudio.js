import { useEffect, useRef } from 'react'

// Local music file from public folder
const TRACK_URL = '/radhe.mp3'

export default function useAudio(enabled) {
  const audioRef = useRef(null)
  const fadeRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(TRACK_URL)
    audio.loop = true
    audio.volume = 0
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    clearInterval(fadeRef.current)

    if (enabled) {
      audio.play().catch(() => {})
      fadeRef.current = setInterval(() => {
        if (audio.volume < 0.38) {
          audio.volume = Math.min(0.4, audio.volume + 0.02)
        } else {
          clearInterval(fadeRef.current)
        }
      }, 50)
    } else {
      fadeRef.current = setInterval(() => {
        if (audio.volume > 0.02) {
          audio.volume = Math.max(0, audio.volume - 0.02)
        } else {
          audio.volume = 0
          audio.pause()
          clearInterval(fadeRef.current)
        }
      }, 50)
    }
  }, [enabled])
}
