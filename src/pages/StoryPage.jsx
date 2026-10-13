import { useEffect, useRef, useState } from 'react'
import { story } from '@/data/story.js'
import PageIntro from '@/components/ui/PageIntro.jsx'
import ReserveBanner from '@/components/ui/ReserveBanner.jsx'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import styles from './StoryPage.module.css'

const spiceMarks = [
  { name: 'Cinnamon', top: '13%', left: '46%' },
  { name: 'Dried chilli', top: '8%', left: '82%' },
  { name: 'Ginger', top: '54%', left: '17%' },
  { name: 'Turmeric', top: '63%', left: '90%' },
]

export default function StoryPage() {
  const portraitRef = useRef(null)
  const spiceRef = useRef(null)
  const [spicesSeen, setSpicesSeen] = useState(false)

  usePageMeta({
    title: 'Our Story | Saffron House',
    description:
      'Saffron House opened in Breach Candy in 2014. A short regional Indian menu, cooked without hurry.',
  })

  useEffect(() => {
    const watch = (node, markSeen) => {
      if (!node) return undefined
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) markSeen(true)
        },
        { threshold: 0.35 },
      )
      observer.observe(node)
      return () => observer.disconnect()
    }

    const stopSpice = watch(spiceRef.current, setSpicesSeen)
    return () => {
      stopSpice?.()
    }
  }, [])

  useEffect(() => {
    const portrait = portraitRef.current
    if (!portrait) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const onScroll = () => {
      const rect = portrait.getBoundingClientRect()
      const scale = Number(document.getElementById('root')?.style.zoom || 1)
      const mid = (rect.top + rect.height / 2) * scale
      const shift = Math.max(-16, Math.min(16, (window.innerHeight / 2 - mid) * 0.06))
      portrait.style.transform = `translateY(${shift}px)`
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <PageIntro eyebrow={story.eyebrow} title={story.title} lede={story.lede} compact />
      <section className={`section container ${styles.storyBody}`}>
        <div className={styles.split}>
          <div className={styles.frame}>
            <div
              ref={spiceRef}
              className={spicesSeen ? `${styles.spicePhoto} ${styles.spiceLive}` : styles.spicePhoto}
            >
              <img
                src="/images/spices.jpg"
                alt="Ginger, chilli, turmeric, and whole spices arranged on a pale table"
                width="800"
                height="800"
                loading="lazy"
              />
              {spiceMarks.map((mark) => (
                <button
                  key={mark.name}
                  type="button"
                  className={styles.spiceDot}
                  style={{ top: mark.top, left: mark.left }}
                >
                  <span>{mark.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={styles.copy}>
            {story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quoteBand}>
        <div className={`container ${styles.quoteRow}`}>
          <figure>
            <blockquote className={styles.quote}>{story.quote}</blockquote>
            <figcaption>{story.attribution}</figcaption>
          </figure>
          <div className={styles.chefFrame}>
            <img
              ref={portraitRef}
              src="/images/chef_meera.jpg"
              alt="Chef Meera Iyer finishing a plate in the kitchen"
              width="864"
              height="1152"
            />
          </div>
        </div>
      </section>

      <section className="section container" aria-labelledby="values-title">
        <h2 id="values-title" className={styles.valuesTitle}>
          What the house keeps.
        </h2>
        <ol className={styles.values}>
          {story.values.map((value) => (
            <li key={value.title}>
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <ReserveBanner secondaryTo="/menu" secondaryLabel="View the menu" />
    </>
  )
}
