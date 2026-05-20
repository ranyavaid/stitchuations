import { GeneratorCard } from './components/GeneratorCard'
import { Hero } from './components/Hero'
import { ScallopedFooter } from './components/ScallopedFooter'
import { ScallopedHeader } from './components/ScallopedHeader'
import { useGenerator } from './hooks/useGenerator'

function App() {
  const { selection, locks, shuffleGeneration, shuffle, toggleLock } =
    useGenerator()

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      <ScallopedHeader />

      <main className="relative">
        <Hero />

        <GeneratorCard
          selection={selection}
          locks={locks}
          shuffleGeneration={shuffleGeneration}
          onShuffle={shuffle}
          onToggleLock={toggleLock}
        />
      </main>

      <ScallopedFooter />
    </div>
  )
}

export default App
