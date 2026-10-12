import { useEffect, useRef, useState } from 'react'
import Button from '@/components/ui/Button.jsx'
import Field from '@/components/forms/Field.jsx'
import { focusFirstInvalid, validateContact } from '@/utils/validation.js'
import styles from './ContactForm.module.css'

const emptyValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export default function ContactForm() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)
  const titleRef = useRef(null)

  useEffect(() => {
    if (submitted) titleRef.current?.focus()
  }, [submitted])

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalid(nextErrors)
      return
    }
    setSubmitted({
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    })
  }

  if (submitted) {
    return (
      <div className={styles.success} role="status">
        <p className={styles.kicker}>Message noted</p>
        <h3 tabIndex={-1} ref={titleRef}>
          Thank you, {submitted.name}.
        </h3>
        <p>We have your note for {submitted.email}.</p>
        <blockquote>{submitted.message}</blockquote>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setSubmitted(null)
          }}
        >
          Write another message
        </Button>
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
      <Field id="phone" label="Phone" error={errors.phone}>
        <input
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
        />
      </Field>
      <Field id="message" label="Message" required error={errors.message}>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          maxLength={1000}
        />
      </Field>
      <div className={styles.actions}>
        <Button type="submit">Send message</Button>
      </div>
    </form>
  )
}
