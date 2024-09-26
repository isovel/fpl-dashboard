export enum Region {
  EU = 'EU',
  NA = 'NA',
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

const _rnd = (a: number, b: number) => Math.floor(Math.random() * a) + b

const generateMatchesPlayed = () => {
  return _rnd(21, 20) // 20-40
}

const generateRandMatchKD = (div: Division): [number, number] => {
  switch (div) {
    case Division.S:
      return [_rnd(6, 15), _rnd(3, 1)] // 15-20, 1-3
    case Division.A:
      return [_rnd(6, 8), _rnd(6, 3)] // 8-13, 3-8
    case Division.B:
      return [_rnd(6, 3), _rnd(11, 5)] // 3-8, 5-15
  }
}

const generateRandKD = (
  div: Division,
  matchesPlayed: number
): {
  eliminations: number
  deaths: number
  kdr: number
} => {
  const statReducer =
    (field: number) => (prev: number, current: [number, number]) =>
      (prev += current[field])
  const matchStatArr = Array<[number, number]>(matchesPlayed)
      .fill([0, 0])
      .map((_) => generateRandMatchKD(div)),
    eliminations: number = matchStatArr.reduce(statReducer(0), 0),
    deaths: number = matchStatArr.reduce(statReducer(1), 0),
    kdr =
      deaths === 0
        ? eliminations
        : Math.floor((eliminations / deaths) * 10) / 10

  return {
    eliminations,
    deaths,
    kdr,
  }
}

export const generateRandomLeaderboard = (
  entries: number,
  division: Division
): Leaderboard => {
  const contestants: Omit<Contestant, 'position'>[] = []
  for (let i = 1; i <= entries; i++) {
    const matchesPlayed = generateMatchesPlayed()

    contestants.push({
      embarkId: generateEmbarkId(),
      region: pullRandomElement(Object.values(Region)),
      division,
      matchesPlayed,
      ...generateRandKD(division, matchesPlayed),
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

export const calcNumPages = (leaderboard: Contestant[]) =>
  Math.floor(leaderboard.length / 10 + 1) - 1

export const getContestantPage = (
  leaderboard: Contestant[],
  embarkId: string
) => {
  const index = leaderboard.findIndex((c) => c.embarkId === embarkId)
  return Math.floor(index / 10 + 1) - 1
}
