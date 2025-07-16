"use client"

import { useCallback, useEffect, useRef } from "react"

export function useSoundEffect(src: string, volume = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.volume = volume
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [src, volume])

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0 // Reset to start for quick successive plays
      audioRef.current.play().catch((e) => console.error("Sound effect playback error:", e))
    }
  }, [])

  return playSound
}
