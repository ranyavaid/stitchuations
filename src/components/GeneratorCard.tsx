import { useEffect, useRef } from 'react'
import {
  formatCraftLine,
  formatInspirationLine,
  formatProjectLine,
  type GeneratorSelection,
  type Locks,
} from '../constants/generator'
import { getTypewriterDuration, useTypewriter } from '../hooks/useTypewriter'
import { startTypingSound, stopTypingSound } from '../utils/typingSound'
import { ScallopedCard } from './ScallopedCard'

type GeneratorCardProps = {
  selection: GeneratorSelection
  locks: Locks
  shuffleGeneration: number
  onShuffle: () => void
  onToggleLock: (layer: keyof Locks) => void
}

function LockIcon({ locked }: { locked: boolean }) {
  if (locked) {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    )
  }

  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 7.5-1" />
    </svg>
  )
}

type PromptLineProps = {
  text: string
  locked: boolean
  label: string
  shuffleGeneration: number
  onToggleLock: () => void
}

function PromptLine({
  text,
  locked,
  label,
  shuffleGeneration,
  onToggleLock,
}: PromptLineProps) {
  const displayedText = useTypewriter(text, shuffleGeneration, locked)

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-5 ${
        locked
          ? 'border-dusty-pink/60 bg-dusty-pink/20'
          : 'border-burgundy/15 bg-cream/40'
      }`}
    >
      <button
        type="button"
        onClick={onToggleLock}
        aria-pressed={locked}
        aria-label={locked ? `Unlock ${label}` : `Lock ${label}`}
        className={`shrink-0 rounded-full border-2 p-2 transition-all duration-300 ${
          locked
            ? 'bg-dusty-pink/50 border-dusty-pink/70 text-burgundy hover:bg-dusty-pink/65 hover:border-dusty-pink active:bg-dusty-pink/80 active:border-dusty-pink'
            : 'border-burgundy/20 text-burgundy/60 hover:bg-dusty-pink/40 hover:border-dusty-pink/60 hover:text-burgundy active:bg-dusty-pink/60 active:border-dusty-pink active:text-burgundy'
        }`}
      >
        <LockIcon locked={locked} />
      </button>

      <p
        className="font-display text-burgundy flex-1 text-center text-lg leading-snug sm:text-3xl"
        aria-label={text}
      >
        {displayedText}
        {!locked && displayedText.length < text.length && (
          <span className="text-burgundy/40" aria-hidden="true">
            |
          </span>
        )}
      </p>
    </div>
  )
}

export function GeneratorCard({
  selection,
  locks,
  shuffleGeneration,
  onShuffle,
  onToggleLock,
}: GeneratorCardProps) {
  const playedShuffleRef = useRef(0)

  useEffect(() => {
    if (shuffleGeneration === 0 || shuffleGeneration === playedShuffleRef.current) {
      return
    }

    playedShuffleRef.current = shuffleGeneration

    const lines = [
      { locked: locks.craft, text: formatCraftLine(selection.craft) },
      { locked: locks.project, text: formatProjectLine(selection.project) },
      {
        locked: locks.inspiration,
        text: formatInspirationLine(selection.inspiration),
      },
    ]

    const durations = lines
      .filter((line) => !line.locked)
      .map((line) => getTypewriterDuration(line.text))

    if (durations.length === 0) {
      return
    }

    startTypingSound(Math.max(...durations))

    return () => stopTypingSound()
  }, [shuffleGeneration, selection, locks])

  return (
    <section id="generator" className="relative px-4 pb-20 sm:px-6">
      <ScallopedCard>
        <p className="font-instrument text-burgundy/90 mb-6 text-center text-[20px] italic sm:mb-8 sm:text-[32px]">
          for your next project...
        </p>

        <div
          className="mx-auto flex max-w-xl flex-col gap-3 sm:gap-4"
          aria-live="polite"
        >
          <PromptLine
            text={formatCraftLine(selection.craft)}
            locked={locks.craft}
            label="craft"
            shuffleGeneration={shuffleGeneration}
            onToggleLock={() => onToggleLock('craft')}
          />
          <PromptLine
            text={formatProjectLine(selection.project)}
            locked={locks.project}
            label="project"
            shuffleGeneration={shuffleGeneration}
            onToggleLock={() => onToggleLock('project')}
          />
          <PromptLine
            text={formatInspirationLine(selection.inspiration)}
            locked={locks.inspiration}
            label="inspiration"
            shuffleGeneration={shuffleGeneration}
            onToggleLock={() => onToggleLock('inspiration')}
          />
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            onClick={onShuffle}
            className="font-public rounded-full border border-[#1a1a1a] bg-[#FDDFFF] px-8 py-2.5 text-sm font-medium text-[#1a1a1a] transition-opacity duration-200 hover:opacity-90 sm:px-[42px] sm:py-[12px] sm:text-[16px]"
          >
            Shuffle
          </button>
        </div>
      </ScallopedCard>
    </section>
  )
}
