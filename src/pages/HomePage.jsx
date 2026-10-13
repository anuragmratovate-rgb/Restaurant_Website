import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFeaturedDishes } from '@/data/menu.js'
import { restaurant } from '@/data/site.js'
import { todaysSpecials } from '@/data/specials.js'
import { story } from '@/data/story.js'
import DietMark from '@/components/menu/DietMark.jsx'
import Button from '@/components/ui/Button.jsx'
import ReserveBanner from '@/components/ui/ReserveBanner.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import { use3DTilt } from '@/hooks/use3DTilt.js'
import { formatPrice, formatTime } from '@/utils/format.js'
import styles from './HomePage.module.css'

const featured = getFeaturedDishes()
// Split so "Saffron" and "House" can sit on their own lines in the hero.
const [firstName, ...restName] = restaurant.name.split(' ')

const specialFilters = [
  { id: 'all', label: 'All' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'non-vegetarian', label: 'Non-vegetarian' },
]

const craftPillars = [
  {
    id: 'dum',
    tag: 'Heritage Technique',
    title: 'Dum Pukht Slow Cooking',
    subtitle: 'Sealed under dough with gentle live embers',
    desc: 'Each handi is sealed with fresh kneaded dough, ensuring aromatics, saffron oils, and steam stay locked within. The flavours gently mature in their own juices until exquisitely tender.',
    stat: '6 to 8 Hours',
    statLabel: 'Dum Maturation',
    image: '/images/biryani.jpg',
    imageAlt: 'Saffron handi biryani sealed and cooked under dough',
    badge: 'Sealed Handi · Gentle Simmer',
  },
  {
    id: 'tandoor',
    tag: 'Primal Fire',
    title: 'The Babool Wood Sigri & Clay Tandoor',
    subtitle: 'Intense charcoal heat and charred crust',
    desc: 'We eschew modern electric ovens in favour of hand-moulded clay tandoors stoked with seasoned Babool charcoal. The intense radiant heat seals moisture instantly with a sublime smoky perfume.',
    stat: '480°C',
    statLabel: 'Clay Kiln Core Heat',
    image: '/images/kebab.jpg',
    imageAlt: 'Charcoal-grilled kebabs over burning Babool embers',
    badge: 'Babool Charcoal · 480°C',
  },
  {
    id: 'saffron',
    tag: 'Provenance',
    title: 'Kashmiri Mongra Saffron & Hand-Pounded Spices',
    subtitle: 'Directly sourced from generational Himalayan growers',
    desc: 'Only Grade-1 Kashmiri Mongra saffron stigmas, Tellicherry garbled black pepper, and whole green cardamom from Idukki enter our stone mortar. Freshly ground every morning before evening service.',
    stat: '100% Pure',
    statLabel: 'Single-Estate Kashmiri Mongra',
    image: '/images/spices.jpg',
    imageAlt: 'Stone pestle with Kashmiri saffron and roasted whole spices',
    badge: 'Single Estate · Pampore',
  },
]

function AccoladesTicker() {
  const accolades = [
    'Michelin Guide Selected',
    'Times Food Awards — Best Contemporary Indian',
    '50 Best Discovery 2024',
    'Condé Nast Traveller Gold Standard',
    'Breach Candy · Mumbai',
  ]
  return (
    <div className={styles.tickerWrap} aria-hidden="true">
      <div className={styles.tickerTrack}>
        {[...accolades, ...accolades, ...accolades].map((item, index) => (
          <span key={index} className={styles.tickerItem}>
            <span className={styles.tickerStar}>✦</span>
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function HeritageCraftSection() {
  const [activeTab, setActiveTab] = useState('dum')
  const current = craftPillars.find((p) => p.id === activeTab) || craftPillars[0]

  return (
    <section className={`section ${styles.craftSection}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Culinary Philosophy"
          title="The three pillars of our kitchen."
          lede="Traditional artisanal methods honed over generations, prepared without shortcuts."
        />

        <div className={styles.craftTabs}>
          {craftPillars.map((pillar) => (
            <button
              key={pillar.id}
              type="button"
              className={activeTab === pillar.id ? `${styles.craftTab} ${styles.craftTabActive}` : styles.craftTab}
              onClick={() => setActiveTab(pillar.id)}
            >
              <span className={styles.craftTabTag}>{pillar.tag}</span>
              <strong className={styles.craftTabTitle}>{pillar.title.split(' ')[0]} {pillar.title.split(' ')[1]}</strong>
            </button>
          ))}
        </div>

        <div className={styles.craftShowcase}>
          {/* Animated Ambient Background Effects */}
          <div className={styles.auroraGlow} aria-hidden="true" />
          <div className={styles.latticePattern} aria-hidden="true" />
          <div className={styles.emberParticles} aria-hidden="true">
            <span className={styles.ember1} />
            <span className={styles.ember2} />
            <span className={styles.ember3} />
          </div>

          <div className={styles.craftGrid}>
            <div className={styles.craftContent}>
              <span className={styles.craftTag}>{current.tag}</span>
              <h3 className={styles.craftHeading}>{current.title}</h3>
              <p className={styles.craftSubtitle}>{current.subtitle}</p>
              <p className={styles.craftDesc}>{current.desc}</p>
              <div className={styles.craftStatRow}>
                <div>
                  <strong className={styles.craftStatNumber}>{current.stat}</strong>
                  <span className={styles.craftStatLabel}>{current.statLabel}</span>
                </div>
                <Button to="/story" variant="ghost">Discover Heritage</Button>
              </div>
            </div>

            <div className={styles.craftMedia}>
              <div className={styles.craftImageFrame}>
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.imageAlt}
                  className={styles.craftImage}
                  width="800"
                  height="800"
                  loading="lazy"
                />
                <div className={styles.craftImageOverlay} />
                <span className={styles.craftMediaBadge}>{current.badge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


function SignatureCard({ item, onOpen }) {
  const cardRef = useRef(null)
  const tiltRef = use3DTilt({ maxTilt: 7, scale: 1.02 })
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = cardRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.3) setShown(true)
        else if (entry.intersectionRatio < 0.08) setShown(false)
      },
      { threshold: [0, 0.08, 0.3] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={(el) => {
        cardRef.current = el
        tiltRef.current = el
      }}
      className={shown ? `${styles.card} ${styles.revealed}` : styles.card}
      data-cursor="view"
    >
      <button type="button" className={styles.cardOpen} onClick={() => onOpen(item)}>
        <span className={styles.photo}>
          <img src={item.image} alt={item.imageAlt} width="1200" height="1200" loading="lazy" />
          <span className={styles.photoGlare} aria-hidden="true" />
          <span className={styles.photoNote}>
            {item.spice ? `${item.region} · ${item.spice}` : item.region}
          </span>
        </span>
        <span className={styles.cardCopy}>
          <span className={styles.cardMeta}>
            <DietMark diet={item.diet} />
            <span>{item.categoryTitle}</span>
          </span>
          <span className={styles.cardTitle}>{item.name}</span>
          <span className={styles.cardText}>{item.description}</span>
          <span className={styles.cardPrice}>{formatPrice(item.price)}</span>
          <span className={styles.cardCue}>View this plate</span>
        </span>
      </button>
    </article>
  )
}

function HouseFacts() {

  const listRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = listRef.current
    if (!node) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) setStarted(true)
        else if (entry.intersectionRatio < 0.12) setStarted(false)
      },
      { threshold: [0, 0.12, 0.4] },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <ul ref={listRef} className={started ? `${styles.facts} ${styles.live}` : styles.facts}>
      <li>
        <Link className={styles.fact} to="/story">
          <strong>{restaurant.established}</strong>
          <span>Opened in Breach Candy</span>
        </Link>
      </li>
      <li>
        <Link className={styles.fact} to="/visit">
          <strong>{restaurant.seats}</strong>
          <span>Seats in the dining room</span>
        </Link>
      </li>
      <li>
        <Link className={styles.fact} to="/visit#hours">
          <strong>Monday</strong>
          <span>The kitchen rests</span>
        </Link>
      </li>
    </ul>
  )
}

export default function HomePage() {
  const dialogRef = useRef(null)
  const heroRef = useRef(null)
  const heroSectionRef = useRef(null)
  const heroMediaRef = useRef(null)
  const storyRef = useRef(null)
  const specialsRef = useRef(null)
  const bandRef = useRef(null)
  const closingRef = useRef(null)
  const [dish, setDish] = useState(null)
  const [specialDiet, setSpecialDiet] = useState('all')
  const [heroLive, setHeroLive] = useState(true)
  const [heroInView, setHeroInView] = useState(true)
  const [storyLive, setStoryLive] = useState(false)
  const [specialsLive, setSpecialsLive] = useState(false)
  const [bandLive, setBandLive] = useState(false)
  const [closingNear, setClosingNear] = useState(false)

  usePageMeta({
    title: 'Saffron House | Contemporary Indian Dining in Mumbai',
    description:
      'Regional Indian plates in a 48-seat dining room in Breach Candy. View the menu, the story, and reserve a table.',
  })

  useEffect(() => {
    const media = heroMediaRef.current
    if (!media) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    // The photo is taller than the hero, so a small shift never shows the edge.
    const onScroll = () => {
      const scale = Number(document.getElementById('root')?.style.zoom || 1) || 1
      const shift = Math.min(window.scrollY / scale, 280) * 0.12
      media.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Play on the way down and again on the way up, once the block has fully left.
    const watch = (node, mark) => {
      if (!node) return undefined
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.intersectionRatio >= 0.28) mark(true)
          else if (entry.intersectionRatio < 0.08) mark(false)
        },
        { threshold: [0, 0.08, 0.28] },
      )
      observer.observe(node)
      return () => observer.disconnect()
    }

    const stops = [
      watch(heroRef.current, setHeroLive),
      watch(heroSectionRef.current, setHeroInView),
      watch(storyRef.current, setStoryLive),
      watch(specialsRef.current, setSpecialsLive),
      watch(bandRef.current, setBandLive),
      watch(closingRef.current, setClosingNear),
    ]
    return () => stops.forEach((stop) => stop?.())
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (dish && !dialog.open) dialog.showModal()
    if (!dish && dialog.open) dialog.close()
  }, [dish])

  const specials = todaysSpecials
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => specialDiet === 'all' || item.diet === specialDiet),
    }))
    .filter((section) => section.items.length > 0)

  const dinnerFrom = formatTime(restaurant.reservationTimes.Dinner[0])
  const showReserveBar = !heroInView && !closingNear

  function openPlate(item) {
    setDish({ ...item, note: `We would like the ${item.name}.` })
  }

  function openSpecial(item) {
    setDish({
      ...item,
      region: 'Off the menu',
      note: `We would like the ${item.name} from today's list.`,
    })
  }

  return (
    <>
      <section ref={heroSectionRef} className={styles.hero}>
        <div ref={heroMediaRef} className={styles.heroMedia}>
          <img
            className={styles.heroImage}
            src="/images/dining-room.jpg"
            alt="A contemporary dining room with dark wood floors, brass screens, and tables set for service"
            fetchPriority="high"
          />
        </div>
        <div
          ref={heroRef}
          className={
            heroLive ? `container ${styles.heroContent} ${styles.heroLive}` : `container ${styles.heroContent}`
          }
        >
          <p className={styles.eyebrow}>Fine Indian dining</p>
          <h1>
            {firstName}
            <span>{restName.join(' ')}</span>
          </h1>
          <p className={styles.lede}>
            Regional plates from Lucknow, the Malabar coast, and Punjab, served without hurry in
            Breach Candy.
          </p>
          <p className={styles.heroHours}>
            Tuesday to Sunday · Dinner from {dinnerFrom} · Closed Monday
          </p>
          <div className={styles.heroActions}>
            <Button to="/reserve">Reserve a table</Button>
            <Button to="/menu" variant="secondary">
              View the menu
            </Button>
          </div>
        </div>
      </section>

      <AccoladesTicker />

      <section className="container" aria-label="House facts">
        <HouseFacts />
      </section>

      <section className={`section container ${styles.storySection}`}>
        <div ref={storyRef} className={storyLive ? `${styles.story} ${styles.live}` : styles.story}>
          <div className={styles.frame}>
            <img
              src="/images/spices.jpg"
              alt="Ginger, chilli, turmeric, and whole spices arranged on a pale table"
              width="800"
              height="800"
              loading="lazy"
            />
          </div>
          <div className={styles.storyCopy}>
            <SectionHeading
              eyebrow="The kitchen"
              title="Cooked for the table, not the display."
              lede={story.paragraphs[0]}
            />
            <p className={styles.storyMore}>{story.paragraphs[1]}</p>
            <Button to="/story" variant="ghost">
              Read our story
            </Button>
          </div>
        </div>
      </section>

      <HeritageCraftSection />

      <section className={`section container ${styles.signatures}`} aria-labelledby="signatures-title">

        <SectionHeading
          titleId="signatures-title"
          eyebrow="From the menu"
          title="Plates we are known for."
          lede="A few dishes that stay on the list. The full menu changes with the market."
        />
        <div className={styles.featureRow}>
          <div className={styles.grid}>
            {featured.map((item) => (
              <SignatureCard key={item.id} item={item} onOpen={openPlate} />
            ))}
          </div>

          <aside
            ref={specialsRef}
            className={specialsLive ? `${styles.specials} ${styles.live}` : styles.specials}
            aria-labelledby="specials-title"
          >
            <p className={styles.specialsEyebrow}>Off the menu</p>
            <h3 id="specials-title">Today's specials</h3>
            <p className={styles.specialsNote}>
              Set this morning. These plates are not on the standing menu.
            </p>
            <div className={styles.filters} role="group" aria-label="Filter today's specials">
              {specialFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className={styles.filter}
                  aria-pressed={specialDiet === filter.id}
                  onClick={() => setSpecialDiet(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div key={specialDiet} className={styles.specialGroups}>
              {specials.length === 0 ? (
                <p className={styles.specialsNote}>Nothing on that list this morning.</p>
              ) : (
                specials.map((section) => (
                  <div key={section.id} className={styles.specialGroup}>
                    <h4>{section.title}</h4>
                    <ul>
                      {section.items.map((item) => (
                      <li key={item.id}>
                        <button type="button" className={styles.specialButton} onClick={() => openSpecial(item)}>
                          <div className={styles.specialTop}>
                            <p>
                              <DietMark diet={item.diet} />
                              <span>{item.name}</span>
                            </p>
                            <span>{formatPrice(item.price)}</span>
                          </div>
                          <p className={styles.specialText}>{item.description}</p>
                          <span className={styles.cardCue}>View this plate</span>
                        </button>
                      </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>

      <section ref={bandRef} className={bandLive ? `${styles.band} ${styles.live}` : styles.band}>
        <img
          src="/images/platter.jpg"
          alt="Tandoori chicken with naan, green chutney, and saag"
          loading="lazy"
        />
        <div className={styles.bandShade}>
          <div className="container">
            <p className={styles.eyebrow}>The dining room</p>
            <h2>
              <Link to="/visit">A calm room for a long dinner.</Link>
            </h2>
          </div>
        </div>
      </section>

      <div ref={closingRef}>
        <ReserveBanner secondaryTo="/visit" secondaryLabel="Visit us" />
      </div>

      {showReserveBar ? (
        <div className={styles.reserveBar}>
          <Button to="/reserve">Reserve a table</Button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className={styles.dishDialog}
        onClose={() => setDish(null)}
        aria-labelledby="dish-title"
      >
        {dish ? (
          <div className={styles.dialogBody}>
            <p className={styles.dialogEyebrow}>{dish.region}</p>
            <h2 id="dish-title">{dish.name}</h2>
            <p className={styles.dialogMeta}>
              <DietMark diet={dish.diet} />
              {dish.spice ? <span>{dish.spice}</span> : null}
              <span>{formatPrice(dish.price)}</span>
            </p>
            <p className={styles.dialogText}>{dish.description}</p>
            <div className={styles.dialogActions}>
              <Button
                to="/reserve"
                state={{ note: dish.note }}
                onClick={() => dialogRef.current?.close()}
              >
                Reserve for this
              </Button>
              {dish.categoryId ? (
                <Button to={`/menu#${dish.categoryId}`} variant="ghost" onClick={() => dialogRef.current?.close()}>
                  See it on the menu
                </Button>
              ) : null}
            </div>
            <button type="button" className={styles.dialogClose} onClick={() => dialogRef.current?.close()}>
              Close
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  )
}
