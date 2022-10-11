import { format } from 'date-fns'

export const defaultFormatDate = (date: string | number | Date) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : ''
}
