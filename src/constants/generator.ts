export const CRAFT_TYPES = ['Crochet', 'Knit', 'Stitch'] as const

export const PROJECT_TYPES = [
  'a scarf',
  'a bookmark',
  'a sweater',
  'a tote bag',
  'a plushie',
  'a rug',
  'a cardigan',
  'a bucket hat',
  'a set of gloves',
  'a coaster set',
  'a headband',
  'a pillow cover',
  'a blanket',
  'a shawl',
  'a bandana',
  'a tapestry',
  'a top',
  'a skirt',
  'a beanie',
  'a glasses holder',
  'a purse',
  'a shirt',
  'a laptop sleeve',
  'a scrunchie',
  'a keyring',
  'a pair of socks',
] as const

export const INSPIRATIONS = [
  'with flowers',
  'based on your favorite anime',
  'that reflects autumn',
  'in summer colors',
  'representing space',
  'inspired by nature',
  'based on a movie you love',
  'inspired by a beloved book',
  'with elements of your favourite character',
  'inspired by animals',
  'straight out of a fairy tale',
  'using your favorite color palette',
  'inspired by a sunset',
  'similar to your favorite painting',
  'the night sky',
  'in vintage prints',
  'using constellation patterns',
  'themed around fruits',
  'inspired by butterfly wings',
  'inspired by your favourite food',
  'using mosaic patterns',
  'using pixel patterns',
  'based on your favorite superhero',
] as const

export type CraftType = (typeof CRAFT_TYPES)[number]
export type ProjectType = (typeof PROJECT_TYPES)[number]
export type Inspiration = (typeof INSPIRATIONS)[number]

export type Locks = {
  craft: boolean
  project: boolean
  inspiration: boolean
}

export type GeneratorSelection = {
  craft: CraftType
  project: ProjectType
  inspiration: Inspiration
}

export function formatCraftLine(craft: CraftType): string {
  return craft
}

export function formatProjectLine(project: ProjectType): string {
  return project
}

export function formatInspirationLine(inspiration: Inspiration): string {
  return inspiration
}

export function formatPrompt(selection: GeneratorSelection): string {
  const { craft, project, inspiration } = selection
  return `${formatCraftLine(craft)} ${formatProjectLine(project)} ${formatInspirationLine(inspiration)}.`
}

export const RECENT_SHUFFLE_COOLDOWN = 5

export type ShuffleHistory = {
  craft: Partial<Record<CraftType, number>>
  project: Partial<Record<ProjectType, number>>
  inspiration: Partial<Record<Inspiration, number>>
}

export function createEmptyHistory(): ShuffleHistory {
  return { craft: {}, project: {}, inspiration: {} }
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function pickWithCooldown<T extends string>(
  items: readonly T[],
  recent: Partial<Record<T, number>>,
  shuffleGeneration: number,
): T {
  const eligible = items.filter((item) => {
    const lastSeen = recent[item]
    return (
      lastSeen === undefined ||
      shuffleGeneration - lastSeen >= RECENT_SHUFFLE_COOLDOWN
    )
  })

  if (eligible.length > 0) {
    return pickRandom(eligible)
  }

  return items.reduce((oldest, item) => {
    const oldestGen = recent[oldest] ?? Number.NEGATIVE_INFINITY
    const itemGen = recent[item] ?? Number.NEGATIVE_INFINITY
    return itemGen < oldestGen ? item : oldest
  })
}

function recordAppearance<T extends string>(
  recent: Partial<Record<T, number>>,
  item: T,
  shuffleGeneration: number,
): Partial<Record<T, number>> {
  return { ...recent, [item]: shuffleGeneration }
}

export function shuffleSelectionWithHistory(
  current: GeneratorSelection,
  locks: Locks,
  history: ShuffleHistory,
  shuffleGeneration: number,
): { selection: GeneratorSelection; history: ShuffleHistory } {
  const selection = { ...current }
  const nextHistory: ShuffleHistory = {
    craft: { ...history.craft },
    project: { ...history.project },
    inspiration: { ...history.inspiration },
  }

  if (!locks.craft) {
    selection.craft = pickWithCooldown(
      CRAFT_TYPES,
      history.craft,
      shuffleGeneration,
    )
    nextHistory.craft = recordAppearance(
      nextHistory.craft,
      selection.craft,
      shuffleGeneration,
    )
  }

  if (!locks.project) {
    selection.project = pickWithCooldown(
      PROJECT_TYPES,
      history.project,
      shuffleGeneration,
    )
    nextHistory.project = recordAppearance(
      nextHistory.project,
      selection.project,
      shuffleGeneration,
    )
  }

  if (!locks.inspiration) {
    selection.inspiration = pickWithCooldown(
      INSPIRATIONS,
      history.inspiration,
      shuffleGeneration,
    )
    nextHistory.inspiration = recordAppearance(
      nextHistory.inspiration,
      selection.inspiration,
      shuffleGeneration,
    )
  }

  return { selection, history: nextHistory }
}

export function initialGeneratorState(): {
  selection: GeneratorSelection
  history: ShuffleHistory
} {
  const shuffleGeneration = 0
  const seed: GeneratorSelection = {
    craft: 'Crochet',
    project: 'a scarf',
    inspiration: 'with flowers',
  }

  return shuffleSelectionWithHistory(
    seed,
    { craft: false, project: false, inspiration: false },
    createEmptyHistory(),
    shuffleGeneration,
  )
}
