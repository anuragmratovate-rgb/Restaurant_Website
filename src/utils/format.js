import { restaurant } from '@/data/site.js'

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

export function formatPrice(amount) {
  return currency.format(amount)
}

export function formatLongDate(isoDate) {
  // A bare "2026-10-13" is parsed as UTC and can show the previous evening in India.
  const date = new Date(`${isoDate}T00:00:00`)
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatTime(value) {
  const [hours, minutes] = value.split(':').map(Number)
  const date = new Date()
  date.setHours(hours, minutes, 0, 0)
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function formatGuests(value) {
  const count = Number(value)
  return count === 1 ? '1 guest' : `${count} guests`
}

export function todayISO() {
  const now = new Date()
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function isClosedDay(isoDate) {
  return new Date(`${isoDate}T00:00:00`).getDay() === restaurant.closedDay
}

export function serviceNote(date) {
  if (date.getDay() === restaurant.closedDay) {
    return { open: false, label: 'Closed today' }
  }

  const minutes = date.getHours() * 60 + date.getMinutes()
  const lunch = minutes >= 12 * 60 + 30 && minutes < 15 * 60
  const dinner = minutes >= 19 * 60 && minutes < 23 * 60
  if (lunch || dinner) return { open: true, label: 'Open now' }
  return { open: false, label: 'Closed now' }
}

export function isPastTimeToday(isoDate, time) {
  if (isoDate !== todayISO()) return false
  const [hours, minutes] = time.split(':').map(Number)
  const now = new Date()
  return hours < now.getHours() || (hours === now.getHours() && minutes <= now.getMinutes())
}
