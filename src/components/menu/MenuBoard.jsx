import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { menuCategories } from '@/data/menu.js'
import DietMark from '@/components/menu/DietMark.jsx'
import { formatPrice } from '@/utils/format.js'
import styles from './MenuBoard.module.css'

const dietFilters = [
  { id: 'all', label: 'All' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'non-vegetarian', label: 'Non-vegetarian' },
]

const spiceFilters = [
  { id: 'all', label: 'Any heat' },
  { id: 'Mild', label: 'Mild' },
  { id: 'Medium', label: 'Medium' },
]

const priceFilters = [
  { id: 'all', label: 'Any price' },
  { id: 'under', label: 'Under ₹500' },
  { id: 'mid', label: '₹500 – ₹800' },
  { id: 'over', label: 'Over ₹800' },
]

const eveningCourses = [
  { id: 'starters', label: 'Starter' },
  { id: 'mains', label: 'Main' },
  { id: 'breads', label: 'Bread' },
  { id: 'desserts', label: 'Dessert' },
]

function matchesSpice(item, spice) {
  if (spice === 'all') return true
  return item.spice === spice
}

function matchesPrice(price, band) {
  if (band === 'under') return price < 500
  if (band === 'mid') return price >= 500 && price <= 800
  if (band === 'over') return price > 800
  return true
}

function scrollToCategory(id) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
}

function categoryFromHash(hash) {
  const id = hash.replace('#', '')
  return menuCategories.some((category) => category.id === id) ? id : ''
}

function MenuItem({ item, open, planned, canPlan, onToggle, onPlan, onHover, onLeave }) {
  return (
    <article
      className={open ? `${styles.item} ${styles.itemOpen}` : styles.item}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={onLeave}
    >
      <div className={styles.nameRow}>
        <h3>
          <button
            type="button"
            className={styles.itemButton}
            aria-expanded={open}
            onClick={onToggle}
            data-cursor="view"
          >
            <DietMark diet={item.diet} />
            <span className={styles.itemName}>{item.name}</span>
          </button>
        </h3>
        {item.signature ? <span className={styles.signature}>Signature</span> : null}
      </div>
      <p className={styles.price}>{formatPrice(item.price)}</p>
      <div className={open ? `${styles.more} ${styles.moreOpen}` : styles.more}>
        <div className={styles.moreInner} inert={!open}>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.itemMetaRow}>
            {item.region ? <span className={styles.regionTag}>{item.region}</span> : null}
            {item.spice ? <span className={styles.spice}>{item.spice}</span> : null}
          </div>
          {canPlan ? (
            <button
              type="button"
              className={planned ? `${styles.planButton} ${styles.planButtonActive}` : styles.planButton}
              aria-pressed={planned}
              onClick={onPlan}
              data-cursor={planned ? 'remove' : 'add'}
            >
              {planned ? '✓ Selected for Evening' : '+ Add to Evening Tasting'}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <fieldset className={styles.filterSet}>
      <legend>{label}</legend>
      <div className={styles.filterRow}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={styles.filter}
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

export default function MenuBoard() {

  const { hash } = useLocation()
  const hashedCategory = categoryFromHash(hash)
  const [active, setActive] = useState(hashedCategory || menuCategories[0].id)
  const [seenHash, setSeenHash] = useState(hash)
  const [diet, setDiet] = useState('all')
  const [spice, setSpice] = useState('all')
  const [price, setPrice] = useState('all')
  const [openId, setOpenId] = useState(null)
  const [evening, setEvening] = useState({})
  const [filterMotion, setFilterMotion] = useState(false)
  const [hoveredDish, setHoveredDish] = useState(null)
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 })
  const boardRef = useRef(null)
  const barRef = useRef(null)
  const tabsRef = useRef(null)
  const pillRef = useRef(null)

  if (hash !== seenHash) {
    setSeenHash(hash)
    if (hashedCategory) setActive(hashedCategory)
  }

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!hoveredDish) return
      setPreviewPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [hoveredDish])

  useEffect(() => {
    const sections = menuCategories
      .map((category) => document.getElementById(category.id))
      .filter(Boolean)

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

  useLayoutEffect(() => {
    const nav = tabsRef.current
    const pill = pillRef.current
    if (!nav || !pill) return undefined

    const place = () => {
      const current = nav.querySelector('[aria-current="true"]')
      if (!current) return
      pill.style.width = `${current.offsetWidth}px`
      pill.style.height = `${current.offsetHeight}px`
      pill.style.transform = `translate(${current.offsetLeft}px, ${current.offsetTop}px)`
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active])

  useEffect(() => {
    const board = boardRef.current
    const bar = barRef.current
    if (!board || !bar) return undefined

    const onScroll = () => {
      const rect = board.getBoundingClientRect()
      const scale = Number(document.getElementById('root')?.style.zoom || 1)
      const top = rect.top * scale
      const height = rect.height * scale
      const seen = Math.min(Math.max(-top, 0), height)
      const amount = height > 0 ? seen / height : 0
      bar.style.transform = `scaleX(${amount})`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  function pickFilter(setValue) {
    return (value) => {
      setFilterMotion(true)
      setValue(value)
    }
  }

  function choose(categoryId, item) {
    setEvening((current) => {
      const already = current[categoryId]?.id === item.id
      return { ...current, [categoryId]: already ? null : item }
    })
  }

  const picks = eveningCourses.map((course) => evening[course.id]).filter(Boolean)
  const total = picks.reduce((sum, item) => sum + item.price, 0)
  const selectedCount = picks.length

  return (
    <div>
      {/* Floating Dish Photo Preview */}
      {hoveredDish && hoveredDish.image && (
        <aside
          className={styles.floatingPreview}
          style={{
            transform: `translate3d(${previewPos.x + 28}px, ${previewPos.y - 120}px, 0)`,
          }}
          aria-hidden="true"
        >
          <div className={styles.floatingPreviewInner}>
            <img
              src={hoveredDish.image}
              alt={hoveredDish.imageAlt || hoveredDish.name}
              className={styles.floatingPreviewImg}
            />
            <div className={styles.floatingPreviewContent}>
              <span className={styles.floatingPreviewTitle}>{hoveredDish.name}</span>
              <span className={styles.floatingPreviewPrice}>{formatPrice(hoveredDish.price)}</span>
            </div>
          </div>
        </aside>
      )}

      <div className={styles.tabsWrap}>
        <div className="container">
          <nav ref={tabsRef} className={styles.tabs} aria-label="Menu categories">
            <span ref={pillRef} className={styles.pill} aria-hidden="true" />
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
        <div className={styles.progress} aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>

      <div ref={boardRef} className={`container ${styles.board}`}>
        <div className={styles.filters}>
          <FilterGroup label="Diet" options={dietFilters} value={diet} onChange={pickFilter(setDiet)} />
          <FilterGroup label="Heat" options={spiceFilters} value={spice} onChange={pickFilter(setSpice)} />
          <FilterGroup label="Price" options={priceFilters} value={price} onChange={pickFilter(setPrice)} />
        </div>

        <section className={styles.evening} aria-labelledby="evening-title">
          <div className={styles.eveningHead}>
            <div>
              <span className={styles.eveningBadge}>Curated Experience</span>
              <h2 id="evening-title">Plan the Evening Tasting</h2>
              <p>Craft your bespoke 4-course table spread. Track selections in real-time.</p>
            </div>
            {selectedCount > 0 && (
              <div className={styles.tastingProgress}>
                <span className={styles.tastingPill}>{selectedCount} of 4 Courses Selected</span>
              </div>
            )}
          </div>
          <ol className={styles.slots}>
            {eveningCourses.map((course) => {
              const pick = evening[course.id]
              return (
                <li key={course.id} className={pick ? styles.slotFilled : styles.slotEmpty}>
                  <span className={styles.slotLabel}>{course.label}</span>
                  <strong className={styles.slotName}>{pick ? pick.name : 'Choose a plate'}</strong>
                  {pick ? (
                    <button
                      type="button"
                      className={styles.slotRemove}
                      onClick={() => choose(course.id, pick)}
                      aria-label={`Remove ${pick.name}`}
                    >
                      Remove
                    </button>
                  ) : null}
                </li>
              )
            })}
          </ol>
          <div className={styles.eveningFooter}>
            <p className={styles.total}>
              <span>Estimated Tasting Total</span>
              <strong key={total} className={total > 0 ? styles.bill : undefined}>
                {formatPrice(total)}
              </strong>
            </p>
            {selectedCount > 0 && (
              <Link
                to="/reserve"
                className={styles.reserveWithMenuBtn}
                data-cursor="reserve"
              >
                Reserve Table with this Menu →
              </Link>
            )}
          </div>
        </section>

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

        {menuCategories.map((category) => {
          const items = category.items.filter(
            (item) =>
              (diet === 'all' || item.diet === diet) &&
              matchesSpice(item, spice) &&
              matchesPrice(item.price, price),
          )
          const canPlan = eveningCourses.some((course) => course.id === category.id)

          return (
            <section
              key={category.id}
              id={category.id}
              className={styles.category}
              aria-labelledby={`${category.id}-title`}
            >
              <div className={styles.categoryHeader}>
                <h2 id={`${category.id}-title`}>{category.title}</h2>
                <span className={styles.courseCountBadge}>{items.length} plates</span>
              </div>
              <p className={styles.note}>{category.note}</p>
              {items.length === 0 ? (
                <p className={styles.empty}>Nothing in this course matches those filters.</p>
              ) : (
                <div
                  key={`${diet}-${spice}-${price}`}
                  className={filterMotion ? `${styles.courseList} ${styles.courseListIn}` : styles.courseList}
                >
                  {items.map((item) => (
                    <MenuItem
                      key={item.id}
                      item={item}
                      open={openId === item.id}
                      planned={evening[category.id]?.id === item.id}
                      canPlan={canPlan}
                      onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
                      onPlan={() => {
                        choose(category.id, item)
                        setOpenId(item.id)
                      }}
                      onHover={(dish) => setHoveredDish(dish)}
                      onLeave={() => setHoveredDish(null)}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}

      </div>
    </div>
  )
}
