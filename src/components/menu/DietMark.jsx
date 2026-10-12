import styles from './DietMark.module.css'

export default function DietMark({ diet }) {
  const vegetarian = diet === 'vegetarian'
  return (
    <span className={styles.mark}>
      <span className={vegetarian ? styles.veg : styles.nonveg} aria-hidden="true" />
      <span className="sr-only">{vegetarian ? 'Vegetarian' : 'Non-vegetarian'}</span>
    </span>
  )
}
