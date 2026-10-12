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
import { formatPrice } from '@/utils/format.js'
import styles from './HomePage.module.css'

const featured = getFeaturedDishes()
// Split so "Saffron" and "House" can sit on their own lines in the hero.
const [firstName, ...restName] = restaurant.name.split(' ')

export default function HomePage() {
  usePageMeta({
    title: 'Saffron House | Contemporary Indian Dining in Mumbai',
    description:
      'Regional Indian plates in a 48-seat dining room in Breach Candy. View the menu, the story, and reserve a table.',
  })

  return (
    <>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/images/dining-room.jpg"
          alt="A contemporary dining room with dark wood floors, brass screens, and tables set for service"
          fetchPriority="high"
        />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.eyebrow}>Fine Indian dining</p>
          <h1>
            {firstName}
            <span>{restName.join(' ')}</span>
          </h1>
          <p className={styles.lede}>
            Regional plates from Lucknow, the Malabar coast, and Punjab, served without hurry in
            Breach Candy.
          </p>
          <div className={styles.heroActions}>
            <Button to="/reserve">Reserve a table</Button>
            <Button to="/menu" variant="secondary">
              View the menu
            </Button>
          </div>
        </div>
      </section>

      <section className="container" aria-label="House facts">
        <ul className={styles.facts}>
          <li>
            <strong>{restaurant.established}</strong>
            <span>Opened in Breach Candy</span>
          </li>
          <li>
            <strong>{restaurant.seats}</strong>
            <span>Seats in the dining room</span>
          </li>
          <li>
            <strong>Monday</strong>
            <span>The kitchen rests</span>
          </li>
        </ul>
      </section>

      <section className={`section container ${styles.storySection}`}>
        <div className={styles.story}>
          <div className={styles.frame}>
            <img
              src="/images/spices.jpg"
              alt="Ginger, chilli, turmeric, and whole spices arranged on a pale table"
              width="800"
              height="800"
              loading="lazy"
            />
          </div>
          <div>
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

      <section className={`section container ${styles.signatures}`} aria-labelledby="signatures-title">
        <SectionHeading
          titleId="signatures-title"
          eyebrow="From the menu"
          title="Plates we are known for."
          lede="A few dishes that stay on the list. The full menu changes with the market."
        />
        <div className={styles.featureRow}>
          <div className={styles.grid}>
            {featured.map((dish) => (
              <Link key={dish.id} to={`/menu#${dish.categoryId}`} className={styles.card}>
                <img src={dish.image} alt={dish.imageAlt} width="1200" height="1200" loading="lazy" />
                <div>
                  <p className={styles.cardMeta}>
                    <DietMark diet={dish.diet} />
                    <span>{dish.categoryTitle}</span>
                  </p>
                  <h3>{dish.name}</h3>
                  <p className={styles.cardText}>{dish.description}</p>
                  <p className={styles.cardPrice}>{formatPrice(dish.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          <aside className={styles.specials} aria-labelledby="specials-title">
            <p className={styles.specialsEyebrow}>Off the menu</p>
            <h3 id="specials-title">Today's specials</h3>
            <p className={styles.specialsNote}>
              Set this morning. These plates are not on the standing menu.
            </p>
            <div className={styles.specialGroups}>
              {todaysSpecials.map((section) => (
                <div key={section.id} className={styles.specialGroup}>
                  <h4>{section.title}</h4>
                  <ul>
                    {section.items.map((dish) => (
                      <li key={dish.id}>
                        <div className={styles.specialTop}>
                          <p>
                            <DietMark diet={dish.diet} />
                            <span>{dish.name}</span>
                          </p>
                          <span>{formatPrice(dish.price)}</span>
                        </div>
                        <p className={styles.specialText}>{dish.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.band}>
        <img
          src="/images/platter.jpg"
          alt="Tandoori chicken with naan, green chutney, and saag"
          loading="lazy"
        />
        <div className={styles.bandShade}>
          <div className="container">
            <p className={styles.eyebrow}>The dining room</p>
            <h2>A calm room for a long dinner.</h2>
          </div>
        </div>
      </section>

      <ReserveBanner secondaryTo="/visit" secondaryLabel="Visit us" />
    </>
  )
}
