import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { occasionLabel, restaurant } from '@/data/site.js'
import Button from '@/components/ui/Button.jsx'
import Field from '@/components/forms/Field.jsx'
import { formatGuests, formatLongDate, formatTime, isClosedDay, todayISO } from '@/utils/format.js'
import { focusFirstInvalid, validateReservation } from '@/utils/validation.js'
import styles from './ReservationForm.module.css'

const seatingZones = [
  {
    id: 'main',
    name: 'Main Dining Room',
    badge: 'Linen Tables',
    desc: 'Intimate candlelight beneath handcrafted brass lattice screens.',
  },
  {
    id: 'counter',
    name: "Chef's Counter",
    badge: 'Sigri View',
    desc: 'Front-row view of live charcoal grilling and delicate plate finishing.',
  },
  {
    id: 'alcove',
    name: 'Saffron Courtyard Alcove',
    badge: 'Quiet & Private',
    desc: 'Deep banquette seating surrounded by stone latticework.',
  },
]

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  seatingZone: 'main',
  occasion: '',
  notes: '',
}

export default function ReservationForm() {
  const carried = useLocation().state?.note
  const [values, setValues] = useState({
    ...emptyValues,
    notes: typeof carried === 'string' ? carried : '',
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const titleRef = useRef(null)
  const minDate = todayISO()

  useEffect(() => {
    // Move focus to the thank-you heading so a keyboard user isn't left on a button that just vanished.
    if (submitted) titleRef.current?.focus()
  }, [submitted])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => {
      const next = { ...current, [name]: undefined }
      if (name === 'date' && value && isClosedDay(value)) {
        next.date = `The dining room is closed on ${restaurant.closedDayLabel}.`
      }
      return next
    })
  }

  function changeGuests(step) {
    setValues((current) => {
      const count = Math.min(restaurant.maxParty, Math.max(0, Number(current.guests || 0) + step))
      return { ...current, guests: count ? String(count) : '' }
    })
    setErrors((current) => ({ ...current, guests: undefined }))
  }

  function chooseTime(time) {
    setValues((current) => ({ ...current, time }))
    setErrors((current) => ({ ...current, time: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateReservation(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors)
      return
    }
    setSubmitted({
      ...values,
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      notes: values.notes.trim(),
    })
  }

  if (submitted) {
    const occasion = occasionLabel(submitted.occasion)
    return (
      <div className={styles.pass} role="status">
        <p className={styles.kicker}>Saffron House</p>
        <h2 tabIndex={-1} ref={titleRef}>
          {submitted.name}
        </h2>
        <p className={styles.lead}>A table is noted for the evening below.</p>
        <dl className={styles.passFacts}>
          <div>
            <dt>Date</dt>
            <dd>{formatLongDate(submitted.date)}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{formatTime(submitted.time)}</dd>
          </div>
          <div>
            <dt>Party</dt>
            <dd>{formatGuests(submitted.guests)}</dd>
          </div>
          <div>
            <dt>Atmosphere</dt>
            <dd>{seatingZones.find((z) => z.id === (submitted.seatingZone || 'main'))?.name}</dd>
          </div>
        </dl>
        <dl className={styles.details}>
          {occasion ? (
            <div>
              <dt>Occasion</dt>
              <dd>{occasion}</dd>
            </div>
          ) : null}
          <div>
            <dt>Email</dt>
            <dd>{submitted.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{submitted.phone}</dd>
          </div>
          {submitted.notes ? (
            <div>
              <dt>Note</dt>
              <dd>{submitted.notes}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.hint}>Fields marked * are required.</p>
      {Object.values(errors).some(Boolean) ? (
        <p className={styles.summary} role="alert">
          Please check the highlighted fields.
        </p>
      ) : null}

      <div className={styles.seatingSection}>
        <p className={styles.seatingHeading}>Preferred Dining Atmosphere</p>
        <p className={styles.seatingHint}>Each setting offers an unhurried, distinct vantage of the house.</p>
        <div className={styles.zoneGrid} role="radiogroup" aria-label="Dining atmosphere">
          {seatingZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              role="radio"
              aria-checked={values.seatingZone === zone.id}
              className={values.seatingZone === zone.id ? `${styles.zoneCard} ${styles.zoneCardActive}` : styles.zoneCard}
              onClick={() => setValues((curr) => ({ ...curr, seatingZone: zone.id }))}
            >
              <span className={styles.zoneBadge}>{zone.badge}</span>
              <strong className={styles.zoneName}>{zone.name}</strong>
              <span className={styles.zoneDesc}>{zone.desc}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.row}>

        <Field id="name" label="Full name" required error={errors.name}>
          <input name="name" value={values.name} onChange={handleChange} autoComplete="name" />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <input
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            autoComplete="email"
            inputMode="email"
          />
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="phone" label="Phone" required error={errors.phone}>
          <input
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            autoComplete="tel"
            inputMode="tel"
          />
        </Field>
        <Field id="guests" label="Guests" required error={errors.guests}>
          <div className={errors.guests ? `${styles.stepper} ${styles.stepperBad}` : styles.stepper} tabIndex={-1}>
            <button
              type="button"
              aria-label="Fewer guests"
              disabled={!values.guests || Number(values.guests) <= 1}
              onClick={() => changeGuests(-1)}
            >
              −
            </button>
            <span>{values.guests ? formatGuests(values.guests) : 'Select a party'}</span>
            <button
              type="button"
              aria-label="More guests"
              disabled={Number(values.guests) >= restaurant.maxParty}
              onClick={() => changeGuests(1)}
            >
              +
            </button>
          </div>
        </Field>
      </div>
      <Field
          id="date"
          label="Date"
          required
          error={errors.date}
          hint="The kitchen rests on Mondays."
        >
          <input
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            onChange={handleChange}
            className={values.date && isClosedDay(values.date) ? styles.closedDate : undefined}
          />
        </Field>
        <Field id="time" label="Time" required error={errors.time}>
          <div
            className={errors.time ? `${styles.times} ${styles.timesBad}` : styles.times}
            role="group"
            aria-label="Seating time"
            tabIndex={-1}
          >
            {Object.entries(restaurant.reservationTimes).map(([group, times]) => (
              <div key={group} className={styles.timeGroup}>
                <p>{group}</p>
                <div className={styles.chips}>
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={styles.chip}
                      aria-pressed={values.time === time}
                      onClick={() => chooseTime(time)}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Field>
      <Field id="occasion" label="Occasion" error={errors.occasion}>
        <select name="occasion" value={values.occasion} onChange={handleChange}>
          <option value="">No special occasion</option>
          {restaurant.occasions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <Field id="notes" label="Note" error={errors.notes}>
        <textarea
          name="notes"
          value={values.notes}
          onChange={handleChange}
          maxLength={400}
          placeholder="Allergies, a high chair, or a quiet corner"
        />
      </Field>
      <div className={styles.actions}>
        <Button type="submit">Request this table</Button>
      </div>
    </form>
  )
}
