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
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          [classes, isActive ? styles.current : ''].filter(Boolean).join(' ')
        }
        {...rest}
      >
        {children}
      </NavLink>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
