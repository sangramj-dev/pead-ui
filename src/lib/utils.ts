import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toISODate(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

export function formatDate(isoString: string): string {
  return format(parseISO(isoString), 'MMM d, yyyy')
}

export function today(): string {
  return toISODate(new Date())
}

export function weekBounds(date: Date): { start: string; end: string } {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  const friday = new Date(monday)
  friday.setDate(monday.getDate() + 4)
  return { start: toISODate(monday), end: toISODate(friday) }
}
