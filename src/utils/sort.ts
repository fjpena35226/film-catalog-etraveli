export type PropResolver<T> = (object: T) => string | number
export type OrderDirection = 'asc' | 'desc'
export type ComparatorFn<T> = (a: T, b: T) => number

export interface OrderModel {
  props: {
    name: string
    fieldName: string
    resolver: PropResolver<any>
  }[]
}

/**
 * @description Compares to Objects by a given property
 * @param objectA
 * @param objectB
 * @param getProperty
 */
const descendingComparator = <T>(
  objectA: T,
  objectB: T,
  getProperty: PropResolver<T>
): number => {
  const upperA = getProperty(objectA)
  const upperB = getProperty(objectB)
  if (upperA < upperB) {
    return -1
  }
  if (upperA > upperB) {
    return 1
  }
  return 0
}

/**
 *@description Obtain descending or ascending comparator
 */
export const getComparator =
  <T>(order: OrderDirection, getProperty: PropResolver<T>) =>
  (a: T, b: T) => {
    return order === 'desc'
      ? descendingComparator(a, b, getProperty)
      : -descendingComparator(a, b, getProperty)
  }