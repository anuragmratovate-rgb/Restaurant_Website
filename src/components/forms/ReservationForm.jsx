import { useEffect, useRef, useState } from 'react'
import { occasionLabel, restaurant } from '@/data/site.js'
import Button from '@/components/ui/Button.jsx'
import Field from '@/components/forms/Field.jsx'
import { formatGuests, formatLongDate, formatTime, todayISO } from '@/utils/format.js'
import { focusFirstInvalid, validateReservation } from '@/utils/validation.js'
import styles from './ReservationForm.module.css'

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '',
  occasion: '',
  notes: '',
}

export default function ReservationForm() {
  const [values, setValues] = useState(emptyValues)
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
    setErrors((current) => ({ ...current, [name]: undefined }))
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
      <div className={styles.success} role="status">
        <p className={styles.kicker}>Request noted</p>
        <h2 tabIndex={-1} ref={titleRef}>
          Thank you, {submitted.name}.
        </h2>
        <p className={styles.lead}>
          A table for {formatGuests(submitted.guests)} is noted for {formatLongDate(submitted.date)}{' '}
          at {formatTime(submitted.time)}.
        </p>
        <dl className={styles.details}>
          <div>
            <dt>Date</dt>
            <dd>{formatLongDate(submitted.date)}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{formatTime(submitted.time)}</dd>
          </div>
          <div>
            <dt>Guests</dt>
            <dd>{formatGuests(submitted.guests)}</dd>
          </div>
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
          <select name="guests" value={values.guests} onChange={handleChange}>
            <option value="">Select party size</option>
            {Array.from({ length: restaurant.maxParty }, (_, index) => {
              const count = index + 1
              return (
                <option key={count} value={count}>
                  {formatGuests(count)}
                </option>
              )
            })}
          </select>
        </Field>
      </div>
      <div className={styles.row}>
        <Field id="date" label="Date" required error={errors.date}>
          <input name="date" type="date" min={minDate} value={values.date} onChange={handleChange} />
        </Field>
        <Field id="time" label="Time" required error={errors.time}>
          <select name="time" value={values.time} onChange={handleChange}>
            <option value="">Select a seating</option>
            {Object.entries(restaurant.reservationTimes).map(([group, times]) => (
              <optgroup key={group} label={group}>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
      </div>
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
