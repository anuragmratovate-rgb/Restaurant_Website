import { useState } from 'react'
import Button from '@/components/ui/Button.jsx'
import styles from './CustomerReviews.module.css'

const reviewFilterTags = ['All Reviews', 'Food & Provenance', 'Hospitality', 'Ambiance', 'Special Occasions']

const allReviews = [
  {
    id: 1,
    name: 'Aditi & Sameer Kapoor',
    location: 'Breach Candy, Mumbai',
    initials: 'AK',
    rating: 5,
    tag: 'Verified Diner',
    category: 'Special Occasions',
    review:
      'From the moment the teak doors opened and the host offered the chilled saffron elixir, we knew tonight was special. The Dum Biryani sealed under dough was pure poetry. The service is unhurried, warm, and world-class.',
    dish: 'Signature Gosht Dum Biryani & Dal Saffron',
    timeAgo: 'Visited Yesterday',
    helpful: 34,
  },
  {
    id: 2,
    name: 'Vikramaditya Merchant',
    location: 'Colaba, Mumbai',
    initials: 'VM',
    rating: 5,
    tag: 'Culinary Critic',
    category: 'Hospitality',
    review:
      'The dining room service unfolds like an exquisite ballet. Every detail—from the welcome infusion to the attentive escort and cloche table presentation—is five-star perfection. Unmatched dignity and warmth.',
    dish: 'Raan-e-Saffron & Truffle Naan',
    timeAgo: '3 days ago',
    helpful: 52,
  },
  {
    id: 3,
    name: 'Dr. Tanya Singhania',
    location: 'Malabar Hill, Mumbai',
    initials: 'TS',
    rating: 5,
    tag: 'Verified Diner',
    category: 'Food & Provenance',
    review:
      'The Dal Bukhara slow-simmered for 24 hours has ruined all other dal for me forever. The depth of Kashmiri Mongra saffron and stone-ground spices is noticeable in every bite. Truly fine Indian gastronomy at its absolute zenith.',
    dish: '24-Hour Dal Bukhara & Roomali Roti',
    timeAgo: 'This week',
    helpful: 28,
  },
  {
    id: 4,
    name: 'Chef Rahul Nair',
    location: 'Bandra West, Mumbai',
    initials: 'RN',
    rating: 5,
    tag: 'Executive Chef & Diner',
    category: 'Food & Provenance',
    review:
      'As a chef myself, I look for technique, provenance, and balance. Saffron House excels in all three. Flawless Awadhi dum cooking, live charcoal aromas from Babool wood, and genuine royal hospitality.',
    dish: 'Galouti Kebab & Taftan Bread',
    timeAgo: 'Last weekend',
    helpful: 41,
  },
  {
    id: 5,
    name: 'Meera & Rajesh Mehta',
    location: 'Worli Sea Face, Mumbai',
    initials: 'MM',
    rating: 5,
    tag: 'Anniversary Dinner',
    category: 'Special Occasions',
    review:
      'Celebrated our 30th wedding anniversary here. Candlelit tables, hand-ground Kashmiri saffron, and unhurried dining. The staff treated us like royalty with a personalized dessert greeting. Thank you for making our evening magical.',
    dish: 'Chef’s Royal Tasting Menu & Rose Kulfi',
    timeAgo: '5 days ago',
    helpful: 39,
  },
  {
    id: 6,
    name: 'Kabir & Radhika Shroff',
    location: 'Cuffe Parade, Mumbai',
    initials: 'KS',
    rating: 5,
    tag: 'Verified Diner',
    category: 'Ambiance',
    review:
      'The fragrant saffron steam when the silver cloche was lifted filled the whole room. The ambiance with Mughal brass lamps and soft acoustics makes you forget the chaotic city outside completely.',
    dish: 'Subz Awadhi Handi & Saffron Pulao',
    timeAgo: '1 week ago',
    helpful: 26,
  },
  {
    id: 7,
    name: 'Priyanka Sen',
    location: 'Juhu, Mumbai',
    initials: 'PS',
    rating: 5,
    tag: 'Food Journalist',
    category: 'Food & Provenance',
    review:
      'The Kakori kebabs melt on the tongue within seconds. It is rare to see an Indian restaurant hold on so faithfully to antique Awadhi recipes without gimmicks. Saffron House is a modern landmark.',
    dish: 'Melt-in-Mouth Kakori Kebabs',
    timeAgo: '2 weeks ago',
    helpful: 47,
  },
  {
    id: 8,
    name: 'Anand & Sunita Goenka',
    location: 'Pedder Road, Mumbai',
    initials: 'AG',
    rating: 5,
    tag: 'Regular Patron',
    category: 'Hospitality',
    review:
      'We have dined here thrice this month with out-of-town guests. Consistent excellence every single visit. The wine pairings suggested by the head sommelier with the lamb shank were inspired.',
    dish: 'Awadhi Nalli Nihari & Khamiri Roti',
    timeAgo: '3 weeks ago',
    helpful: 31,
  },
]

// Split reviews into two complementary streams for the dual vertical marquee
const columnOneReviews = [allReviews[0], allReviews[2], allReviews[4], allReviews[6]]
const columnTwoReviews = [allReviews[1], allReviews[3], allReviews[5], allReviews[7]]

export default function CustomerReviews() {
  const [activeFilter, setActiveFilter] = useState('All Reviews')

  const filteredReviews =
    activeFilter === 'All Reviews'
      ? allReviews
      : allReviews.filter((r) => r.category === activeFilter)

  return (
    <section className={`section ${styles.reviewsSection}`} aria-labelledby="reviews-title">
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Guest Impressions & Reflections</span>
          <h2 id="reviews-title" className={styles.sectionTitle}>
            Customer Reviews
          </h2>
          <p className={styles.sectionLede}>
            Over 480+ five-star dining experiences celebrating unhurried Awadhi culinary craft,
            warm royal hospitality, and candlelit ambiance in Breach Candy, Mumbai.
          </p>
        </div>

        {/* Master Rating Overview Card */}
        <div className={styles.overviewCard}>
          <div className={styles.ratingHero}>
            <div className={styles.bigScoreGroup}>
              <span className={styles.bigScore}>4.9</span>
              <div className={styles.bigScoreMeta}>
                <div className={styles.goldStars}>★★★★★</div>
                <span className={styles.reviewCount}>Based on 480+ Verified Diners</span>
              </div>
            </div>
            <div className={styles.accoladeBadge}>
              <span className={styles.accoladeIcon}>🏆</span>
              <div className={styles.accoladeText}>
                <strong>Times Food & Nightlife 2026</strong>
                <span>Best Contemporary Indian Dining in South Mumbai</span>
              </div>
            </div>
          </div>

          <div className={styles.breakdownGrid}>
            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Taste & Provenance</span>
              <div className={styles.breakdownBarWrap}>
                <div className={styles.breakdownBar} style={{ width: '99%' }} />
              </div>
              <strong className={styles.breakdownValue}>5.0</strong>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Royal Hospitality</span>
              <div className={styles.breakdownBarWrap}>
                <div className={styles.breakdownBar} style={{ width: '98%' }} />
              </div>
              <strong className={styles.breakdownValue}>4.9</strong>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Candlelit Ambiance</span>
              <div className={styles.breakdownBarWrap}>
                <div className={styles.breakdownBar} style={{ width: '99%' }} />
              </div>
              <strong className={styles.breakdownValue}>5.0</strong>
            </div>

            <div className={styles.breakdownItem}>
              <span className={styles.breakdownLabel}>Saffron & Wine Cellar</span>
              <div className={styles.breakdownBarWrap}>
                <div className={styles.breakdownBar} style={{ width: '96%' }} />
              </div>
              <strong className={styles.breakdownValue}>4.8</strong>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className={styles.filterBar} role="group" aria-label="Review categories">
          {reviewFilterTags.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
          <span className={styles.hoverCue}>✦ Hover any card to pause auto-scroll</span>
        </div>

        {/* Dual-Column Infinite Upward Marquee */}
        {activeFilter === 'All Reviews' ? (
          <div className={styles.marqueeStage}>
            <div className={styles.marqueeFadeTop} aria-hidden="true" />
            <div className={styles.marqueeFadeBottom} aria-hidden="true" />

            <div className={styles.marqueeGrid}>
              {/* Column 1: Smooth Upward Scroll (Speed 28s) */}
              <div className={styles.marqueeColumn}>
                <div className={`${styles.marqueeTrack} ${styles.trackSpeedSlow}`}>
                  {/* First Set */}
                  {columnOneReviews.map((rev) => (
                    <ReviewCard key={`c1-a-${rev.id}`} review={rev} />
                  ))}
                  {/* Duplicate Set for Infinite Loop */}
                  {columnOneReviews.map((rev) => (
                    <ReviewCard key={`c1-b-${rev.id}`} review={rev} ariaHidden />
                  ))}
                </div>
              </div>

              {/* Column 2: Smooth Upward Scroll (Speed 34s) */}
              <div className={styles.marqueeColumn}>
                <div className={`${styles.marqueeTrack} ${styles.trackSpeedMedium}`}>
                  {/* First Set */}
                  {columnTwoReviews.map((rev) => (
                    <ReviewCard key={`c2-a-${rev.id}`} review={rev} />
                  ))}
                  {/* Duplicate Set for Infinite Loop */}
                  {columnTwoReviews.map((rev) => (
                    <ReviewCard key={`c2-b-${rev.id}`} review={rev} ariaHidden />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Filtered Static Grid when user picks a specific category */
          <div className={styles.staticReviewsGrid}>
            {filteredReviews.map((rev) => (
              <ReviewCard key={`filter-${rev.id}`} review={rev} />
            ))}
          </div>
        )}

        {/* Bottom Callout & Table Reservation */}
        <div className={styles.bottomCtaBanner}>
          <div className={styles.bottomCtaContent}>
            <h3 className={styles.bottomCtaTitle}>Experience It For Yourself Tonight</h3>
            <p className={styles.bottomCtaText}>
              Reservations are recommended 24 to 48 hours in advance for evening service.
            </p>
          </div>
          <Button to="/reserve" variant="primary" className={styles.ctaReserveBtn}>
            Reserve a Table
          </Button>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review, ariaHidden = false }) {
  return (
    <article className={styles.reviewCard} aria-hidden={ariaHidden ? 'true' : undefined}>
      <header className={styles.cardHeader}>
        <div className={styles.avatarWrap}>
          <span className={styles.avatarInitials}>{review.initials}</span>
        </div>
        <div className={styles.authorMeta}>
          <h4 className={styles.authorName}>{review.name}</h4>
          <span className={styles.authorLoc}>{review.location}</span>
        </div>
        <span className={styles.verifiedBadge}>
          <svg className={styles.checkIcon} viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
          </svg>
          {review.tag}
        </span>
      </header>

      <div className={styles.ratingRow}>
        <div className={styles.starsGold}>{'★'.repeat(review.rating)}</div>
        <span className={styles.timeAgo}>{review.timeAgo}</span>
      </div>

      <p className={styles.reviewQuote}>“{review.review}”</p>

      <footer className={styles.cardFooter}>
        <div className={styles.favoredDish}>
          <span className={styles.dishLabel}>Favored:</span>
          <span className={styles.dishValue}>{review.dish}</span>
        </div>
        <span className={styles.helpfulCount}>
          ♥ {review.helpful} found helpful
        </span>
      </footer>
    </article>
  )
}
