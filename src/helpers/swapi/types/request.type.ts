export interface Request<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}
