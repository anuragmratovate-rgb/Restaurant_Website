import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { primaryNav } from '@/data/site.js'
import Logo from '@/components/layout/Logo.jsx'
import Button from '@/components/ui/Button.jsx'
import styles from './Header.module.css'

export default function Header() {
  const location = useLocation()
  const home = location.pathname === '/'
  const [open, setOpen] = useState(false)
  const [openPath, setOpenPath] = useState(location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const [scrollPath, setScrollPath] = useState(location.pathname)

  // Shut the drawer as soon as the guest moves to another page.
  if (location.pathname !== openPath) {
    setOpenPath(location.pathname)
    setOpen(false)
  }

  // A new page opens at the top, so the home bar starts clear again.
  if (location.pathname !== scrollPath) {
    setScrollPath(location.pathname)
    setScrolled(false)
  }

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!home) return undefined
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [home])

  const clear = home && !scrolled && !open
  const headerClass = [styles.header, home ? styles.home : '', clear ? styles.clear : '']
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className={`container ${styles.bar}`}>
        <Logo />
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className={styles.bars} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
        <nav
          id="site-nav"
          className={open ? `${styles.nav} ${styles.navOpen}` : styles.nav}
          aria-label="Primary"
        >
          {primaryNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Button to="/reserve" className={styles.reserveCta} onClick={() => setOpen(false)}>
            Reserve a table
          </Button>
        </nav>
      </div>
    </header>
  )
}
