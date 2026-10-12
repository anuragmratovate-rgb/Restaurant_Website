import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { menuCategories } from '@/data/menu.js'
import DietMark from '@/components/menu/DietMark.jsx'
import { formatPrice } from '@/utils/format.js'
import styles from './MenuBoard.module.css'

function scrollToCategory(id) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

function MenuItem({ item }) {
  return (
    <article className={styles.item}>
      <div className={styles.nameRow}>
        <h3>
          <DietMark diet={item.diet} />
          {item.name}
        </h3>
        {item.signature ? <p className={styles.signature}>Signature</p> : null}
      </div>
      <p className={styles.price}>{formatPrice(item.price)}</p>
      <p className={styles.description}>{item.description}</p>
      {item.spice ? <p className={styles.spice}>{item.spice}</p> : null}
    </article>
  )
}

function categoryFromHash(hash) {
  const id = hash.replace('#', '')
  return menuCategories.some((category) => category.id === id) ? id : ''
}

export default function MenuBoard() {
  const { hash } = useLocation()
  const hashedCategory = categoryFromHash(hash)
  const [active, setActive] = useState(hashedCategory || menuCategories[0].id)
  const [seenHash, setSeenHash] = useState(hash)

  if (hash !== seenHash) {
    setSeenHash(hash)
    if (hashedCategory) setActive(hashedCategory)
  }

  useEffect(() => {
    const sections = menuCategories
      .map((category) => document.getElementById(category.id))
      .filter(Boolean)

    // Whichever section is crossing the middle of the screen gets the highlighted tab.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0.15, 0.4] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div className={styles.tabsWrap}>
        <div className="container">
          <nav className={styles.tabs} aria-label="Menu categories">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={styles.tab}
                aria-current={active === category.id ? 'true' : undefined}
                onClick={() => {
                  setActive(category.id)
                  scrollToCategory(category.id)
                }}
              >
                {category.title}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={`container ${styles.board}`}>
        <ul className={styles.legend}>
          <li className={styles.legendItem}>
            <DietMark diet="vegetarian" />
            <span aria-hidden="true">Vegetarian</span>
          </li>
          <li className={styles.legendItem}>
            <DietMark diet="non-vegetarian" />
            <span aria-hidden="true">Non-vegetarian</span>
          </li>
        </ul>

        {menuCategories.map((category) => (
          <section key={category.id} id={category.id} className={styles.category} aria-labelledby={`${category.id}-title`}>
            <h2 id={`${category.id}-title`}>{category.title}</h2>
            <p className={styles.note}>{category.note}</p>
            <div>
              {category.items.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
