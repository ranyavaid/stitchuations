const TYPING_SOUND_SRC = '/typing-sounds.mp3'

let typingAudio: HTMLAudioElement | null = null
let stopTimer: number | null = null

export function stopTypingSound() {
  if (stopTimer !== null) {
    window.clearTimeout(stopTimer)
    stopTimer = null
  }

  if (typingAudio) {
    typingAudio.pause()
    typingAudio.currentTime = 0
    typingAudio = null
  }
}

export function startTypingSound(durationMs: number) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  stopTypingSound()

  typingAudio = new Audio(TYPING_SOUND_SRC)
  typingAudio.volume = 0.35
  typingAudio.loop = true

  void typingAudio.play().catch(() => {
    // Playback may be blocked until the user interacts with the page.
  })

  stopTimer = window.setTimeout(() => {
    stopTypingSound()
  }, durationMs)
}
