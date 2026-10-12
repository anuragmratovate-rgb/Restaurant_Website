import { allReservationTimes, restaurant } from '@/data/site.js'
import { isClosedDay, isPastTimeToday, todayISO } from '@/utils/format.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function phoneDigits(value) {
  return value.replace(/\D/g, '')
}

function validateName(value, errors) {
  const name = value.trim()
  if (name.length < 2) errors.name = 'Enter your name.'
  else if (name.length > 60) errors.name = 'Use 60 characters or fewer.'
}

function validateEmail(value, errors) {
  if (!emailPattern.test(value.trim())) errors.email = 'Enter a valid email address.'
}

function validatePhone(value, errors, { required }) {
  const digits = phoneDigits(value)
  if (!digits && !required) return
  if (digits.length < 8 || digits.length > 13) {
    errors.phone = 'Enter a phone number with 8 to 13 digits.'
  }
}

export function validateReservation(values) {
  const errors = {}
  validateName(values.name, errors)
  validateEmail(values.email, errors)
  validatePhone(values.phone, errors, { required: true })

  if (!values.date) {
    errors.date = 'Choose a date.'
  } else if (values.date < todayISO()) {
    errors.date = 'Choose today or a later date.'
  } else if (isClosedDay(values.date)) {
    errors.date = `The dining room is closed on ${restaurant.closedDayLabel}.`
  }

  if (!allReservationTimes().includes(values.time)) {
    errors.time = 'Choose a seating time.'
  } else if (values.date && isPastTimeToday(values.date, values.time)) {
    errors.time = 'That seating has already passed today.'
  }

  const guests = Number(values.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > restaurant.maxParty) {
    errors.guests = `Choose a party size from 1 to ${restaurant.maxParty}.`
  }

  if (values.notes.trim().length > 400) {
    errors.notes = 'Keep the note under 400 characters.'
  }

  return errors
}

export function validateContact(values) {
  const errors = {}
  validateName(values.name, errors)
  validateEmail(values.email, errors)
  validatePhone(values.phone, errors, { required: false })

  const message = values.message.trim()
  if (message.length < 10) errors.message = 'Write a short message, at least 10 characters.'
  else if (message.length > 1000) errors.message = 'Keep the message under 1000 characters.'

  return errors
}

// Errors are built in field order, so the first key is the one the guest should see.
export function focusFirstInvalid(errors) {
  const fieldId = Object.keys(errors)[0]
  if (!fieldId) return
  document.getElementById(fieldId)?.focus()
}
