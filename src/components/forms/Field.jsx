import { cloneElement, isValidElement } from 'react'
import styles from './Field.module.css'

export default function Field({ id, label, required = false, error, children }) {
  const errorId = `${id}-error`
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-required': required || undefined,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })
    : children

  return (
    <div className={error ? `${styles.field} ${styles.invalid}` : styles.field}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true"> *</span>
        ) : null}
      </label>
      {control}
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  )
}
