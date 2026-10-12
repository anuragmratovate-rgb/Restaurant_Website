import { NavLink } from 'react-router-dom'
import { footerNav, restaurant } from '@/data/site.js'
import Logo from '@/components/layout/Logo.jsx'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <Logo />
          <p className={styles.blurb}>
            Contemporary Indian dining in Breach Candy. A short menu, and time to finish it.
          </p>
        </div>
        <div>
          <h2>Visit</h2>
          <address className={styles.address}>
            {restaurant.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
          <a className={styles.contactLink} href={restaurant.phoneHref}>
            {restaurant.phone}
          </a>
          <a className={styles.contactLink} href={restaurant.emailHref}>
            {restaurant.email}
          </a>
        </div>
        <div>
          <h2>Hours</h2>
          <ul className={styles.hours}>
            {restaurant.hours.map((row) => (
              <li key={row.label}>
                <strong>{row.label}</strong>
                <span>{row.detail}</span>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <h2>Explore</h2>
          <ul className={styles.links}>
            {footerNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.end}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.legal}`}>
        <p>
          © {year} {restaurant.name}. Mumbai.
        </p>
      </div>
    </footer>
  )
}
