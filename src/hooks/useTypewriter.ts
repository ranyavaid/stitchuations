import { useEffect, useRef, useState } from 'react'

export const TYPEWRITER_CHAR_MS = 32

export function useTypewriter(
  text: string,
  generation: number,
  locked: boolean,
  speed = TYPEWRITER_CHAR_MS,
) {
  const [displayed, setDisplayed] = useState(text)
  const prevGenerationRef = useRef(generation)
  const wasLockedRef = useRef(locked)

  useEffect(() => {
    if (locked) {
      setDisplayed(text)
      wasLockedRef.current = true
      return
    }

    if (wasLockedRef.current) {
      wasLockedRef.current = false
      return
    }

    if (generation === 0) {
      setDisplayed(text)
      prevGenerationRef.current = generation
      return
    }

    if (generation === prevGenerationRef.current) {
      return
    }

    prevGenerationRef.current = generation

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text)
      return
    }

    setDisplayed('')
    let index = 0

    const intervalId = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))

      if (index >= text.length) {
        window.clearInterval(intervalId)
      }
    }, speed)

    return () => window.clearInterval(intervalId)
  }, [text, generation, locked, speed])

  return displayed
}

export function getTypewriterDuration(text: string, speed = TYPEWRITER_CHAR_MS) {
  return text.length * speed
}
