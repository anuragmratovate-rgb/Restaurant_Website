import { restaurant } from '@/data/site.js'
import Button from '@/components/ui/Button.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import styles from './ReserveBanner.module.css'

export default function ReserveBanner({
  secondaryTo,
  secondaryLabel,
}) {
  return (
    <section className={styles.banner} aria-labelledby="reserve-banner-title">
      <div className={`container ${styles.inner}`}>
        <SectionHeading
          tone="dark"
          titleId="reserve-banner-title"
          eyebrow="Reservations"
          title="Save a table for the evening."
          lede={`Tuesday to Sunday, lunch and dinner. Parties of up to ${restaurant.maxParty}. Call ${restaurant.phone} if you would rather speak to the house.`}
        />
        <div className={styles.actions}>
          <Button to="/reserve">Reserve a table</Button>
          {secondaryTo ? (
            <Button to={secondaryTo} variant="secondary">
              {secondaryLabel}
            </Button>
          ) : (
            <Button href={restaurant.phoneHref} variant="secondary">
              Call the house
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
