import { Link } from 'react-router-dom'
import { restaurant } from '@/data/site.js'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <Link to="/" className={styles.logo}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.name}>{restaurant.name}</span>
    </Link>
  )
}
