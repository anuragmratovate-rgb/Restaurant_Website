import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({
  to,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  children,
  ...rest
}) {
  const btnRef = useRef(null)
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = btnRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    // Subtle magnetic pull
    el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`
  }

  const handleMouseLeave = () => {
    const el = btnRef.current
    if (!el) return
    el.style.transform = 'translate3d(0, 0, 0)'
  }

  const commonProps = {
    ref: btnRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    ...rest,
  }

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          [classes, isActive ? styles.current : ''].filter(Boolean).join(' ')
        }
        {...commonProps}
      >
        <span className={styles.content}>{children}</span>
        <span className={styles.shimmer} aria-hidden="true" />
      </NavLink>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...commonProps}>
        <span className={styles.content}>{children}</span>
        <span className={styles.shimmer} aria-hidden="true" />
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...commonProps}>
      <span className={styles.content}>{children}</span>
      <span className={styles.shimmer} aria-hidden="true" />
    </button>
  )
}

