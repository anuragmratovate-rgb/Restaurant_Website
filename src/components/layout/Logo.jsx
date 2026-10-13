import { Link, useLocation } from 'react-router-dom'
import { restaurant } from '@/data/site.js'
import styles from './Logo.module.css'

export default function Logo({ animate = false }) {
  const { pathname } = useLocation()

  return (
    <Link to="/" className={styles.logo}>
      <span
        key={animate ? pathname : 'still'}
        className={animate ? `${styles.mark} ${styles.markIn}` : styles.mark}
        aria-hidden="true"
      />
      <span className={styles.name}>{restaurant.name}</span>
    </Link>
  )
}
