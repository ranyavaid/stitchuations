import { useCallback, useState } from 'react'
import {
  initialGeneratorState,
  shuffleSelectionWithHistory,
  type GeneratorSelection,
  type Locks,
  type ShuffleHistory,
} from '../constants/generator'
import { stopTypingSound } from '../utils/typingSound'

const defaultLocks: Locks = {
  craft: false,
  project: false,
  inspiration: false,
}

type GeneratorCore = {
  selection: GeneratorSelection
  history: ShuffleHistory
  shuffleGeneration: number
}

export function useGenerator() {
  const [core, setCore] = useState<GeneratorCore>(() => ({
    ...initialGeneratorState(),
    shuffleGeneration: 0,
  }))
  const [locks, setLocks] = useState<Locks>(defaultLocks)

  const { selection, shuffleGeneration } = core

  const shuffle = useCallback(() => {
    setCore((current) => {
      const nextGeneration = current.shuffleGeneration + 1
      const { selection, history } = shuffleSelectionWithHistory(
        current.selection,
        locks,
        current.history,
        nextGeneration,
      )

      return { selection, history, shuffleGeneration: nextGeneration }
    })
  }, [locks])

  const toggleLock = useCallback((layer: keyof Locks) => {
    stopTypingSound()
    setLocks((current) => ({ ...current, [layer]: !current[layer] }))
  }, [])

  const unlockAll = useCallback(() => {
    setLocks(defaultLocks)
  }, [])

  return {
    selection,
    locks,
    shuffleGeneration,
    shuffle,
    toggleLock,
    unlockAll,
  }
}
