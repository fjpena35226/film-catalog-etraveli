export interface Film {
  readonly episode_id: number
  title: string
  url: string
  characters: string[]
  director: string
  opening_crawl: string
  planets: string[]
  producer: string
  species: string
  starships: string[]
  vehicles: string[]
  release_date: Date
  created: Date
  edited: Date
}
