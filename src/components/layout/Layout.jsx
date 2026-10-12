import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '@/components/layout/Footer.jsx'
import Header from '@/components/layout/Header.jsx'
import styles from './Layout.module.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // /menu#desserts should open on desserts. A normal page change goes back to the top.
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function Layout() {
  return (
    <div className={styles.page}>
      <ScrollToTop />
      <a className={styles.skip} href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
