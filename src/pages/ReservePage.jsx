import ReservationForm from '@/components/forms/ReservationForm.jsx'
import PageIntro from '@/components/ui/PageIntro.jsx'
import { restaurant } from '@/data/site.js'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import { formatTime } from '@/utils/format.js'
import styles from './ReservePage.module.css'

export default function ReservePage() {
  usePageMeta({
    title: 'Reserve a Table | Saffron House',
    description:
      'Request a table at Saffron House in Breach Candy. Tuesday to Sunday, parties of up to eight. The form confirms on this page.',
  })

  return (
    <>
      <PageIntro
        eyebrow="Reserve a table"
        title="Tell us when you would like to come."
        lede={`We seat parties of up to ${restaurant.maxParty}. For a larger table, call the house and we will see what the room can hold.`}
      />
      <section className="section container">
        <div className={styles.layout}>
          <aside className={styles.aside}>
            <h2>Before you request</h2>
            <ul>
              <li>Closed on {restaurant.closedDayLabel}.</li>
              <li>Lunch from 12:30, dinner from 7:00.</li>
              <li>Last seating is {formatTime(restaurant.lastSeating)}.</li>
              <li>Parties of 1 to {restaurant.maxParty}.</li>
            </ul>
            <p>
              Prefer the phone? Call{' '}
              <a href={restaurant.phoneHref}>{restaurant.phone}</a>.
            </p>
            <p className={styles.quiet}>
              This form confirms on the page. It does not email the restaurant.
            </p>
          </aside>
          <div className={styles.card}>
            <ReservationForm />
          </div>
        </div>
      </section>
    </>
  )
}
