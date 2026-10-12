import { story } from '@/data/story.js'
import PageIntro from '@/components/ui/PageIntro.jsx'
import ReserveBanner from '@/components/ui/ReserveBanner.jsx'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import styles from './StoryPage.module.css'

export default function StoryPage() {
  usePageMeta({
    title: 'Our Story | Saffron House',
    description:
      'Saffron House opened in Breach Candy in 2014. A short regional Indian menu, cooked without hurry.',
  })

  return (
    <>
      <PageIntro eyebrow={story.eyebrow} title={story.title} lede={story.lede} compact />
      <section className={`section container ${styles.storyBody}`}>
        <div className={styles.split}>
          <div className={styles.frame}>
            <img
              src="/images/spices.jpg"
              alt="Ginger, chilli, turmeric, and whole spices arranged on a pale table"
              width="800"
              height="800"
              loading="lazy"
            />
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
