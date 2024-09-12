export enum Region {
  NA = 'NA',
  EU = 'EU',
}

export enum Division {
  S = 'S',
  A = 'A',
  B = 'B',
}

export type Contestant = {
  position: number
  embarkId: string // username + discriminator
  region: Region
  division: Division
  eliminations: number
  deaths: number
  matchesPlayed: number
  kdr: number
}

export type Leaderboard = Contestant[]

export const pullRandomElement = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

const generateEmbarkId = (): string => {
  const adjectives = [
    'Adorable',
    'Beautiful',
    'Clean',
    'Elegant',
    'Fancy',
    'Glamorous',
    'Long',
    'Plain',
    'Quaint',
    'Sparkling',
    'Vivacious',
    'Wandering',
    'Zealous',
    'Rapid',
    'Swift',
    'Fast',
    'Slow',
    'Speedy',
    'Brisk',
    'Lively',
    'Active',
    'Agile',
    'Nimble',
    'Quick',
    'Prompt',
    'Ready',
    'Alert',
    'Smart',
    'Brainy',
    'Clever',
  ]

  const animals = [
    'Elephant',
    'Giraffe',
    'Lion',
    'Tiger',
    'Dog',
    'Cat',
    'Fish',
    'Bird',
    'Bear',
    'Wolf',
    'Fox',
    'Rabbit',
    'Horse',
    'Deer',
    'Penguin',
    'Kangaroo',
    'Koala',
    'Panda',
    'Zebra',
    'Monkey',
    'Snake',
    'Frog',
    'Turtle',
    'Dolphin',
    'Shark',
    'Whale',
    'Octopus',
    'Pig',
    'Cow',
    'Sheep',
    'Chicken',
    'Duck',
    'Goose',
    'Turkey',
    'Ostrich',
  ]

  return `${pullRandomElement(adjectives)}${pullRandomElement(
    animals
  )}#${Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, '0')}`
}

// Generate random K/D/M stats based on division
// S: 10-20 eliminations (per match), 0-5 deaths (per match), 0-30 matches played
// A: 5-10 eliminations (per match), 0-10 deaths (per match), 0-20 matches played
// B: 0-5 eliminations (per match), 0-15 deaths (per match), 0-10 matches played
// The K/D ratio is eliminations divided by deaths, and should generally be around 0-4
const generateKDM = (
  div: Division
): {
  eliminations: number
  deaths: number
  matchesPlayed: number
  kdr: number
} => {
  const stats = {
    eliminations: 0,
    deaths: 0,
    matchesPlayed: 0,
    kdr: 0,
  }

  switch (div) {
    case Division.S:
      // Higher eliminations, fewer deaths, more matches played
      stats.eliminations = Math.floor(Math.random() * 6) + 15 // 15-20 eliminations
      stats.deaths = Math.floor(Math.random() * 3) + 1 // 1-3 deaths
      stats.matchesPlayed = Math.floor(Math.random() * 21) + 30 // 30-50 matches played
      break
    case Division.A:
      // Moderate eliminations, moderate deaths, moderate matches played
      stats.eliminations = Math.floor(Math.random() * 6) + 8 // 8-13 eliminations
      stats.deaths = Math.floor(Math.random() * 6) + 3 // 3-8 deaths
      stats.matchesPlayed = Math.floor(Math.random() * 21) + 20 // 20-40 matches played
      break
    case Division.B:
      // Lower eliminations, higher deaths, fewer matches played
      stats.eliminations = Math.floor(Math.random() * 6) + 3 // 3-8 eliminations
      stats.deaths = Math.floor(Math.random() * 11) + 5 // 5-15 deaths
      stats.matchesPlayed = Math.floor(Math.random() * 11) + 10 // 10-20 matches played
      break
  }

  // Calculate K/D ratio with a check for zero deaths
  stats.kdr =
    stats.deaths === 0
      ? stats.eliminations
      : Math.floor((stats.eliminations / stats.deaths) * 100) / 100

  return stats
}

export const generateRandomLeaderboard = (
  entries: number,
  region: Region,
  division: Division
): Leaderboard => {
  const contestants: Omit<Contestant, 'position'>[] = []
  for (let i = 1; i <= entries; i++) {
    contestants.push({
      embarkId: generateEmbarkId(),
      region,
      division,
      ...generateKDM(division),
    })
  }

  contestants.sort(
    (a, b) => b.eliminations / b.deaths - a.eliminations / a.deaths
  )

  const leaderboard = contestants.map((contestant, i) => ({
    position: i + 1,
    ...contestant,
  }))

  return leaderboard
}
