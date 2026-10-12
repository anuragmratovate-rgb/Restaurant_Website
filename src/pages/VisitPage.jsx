import ContactForm from '@/components/forms/ContactForm.jsx'
import PageIntro from '@/components/ui/PageIntro.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { restaurant } from '@/data/site.js'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import { formatTime } from '@/utils/format.js'
import styles from './VisitPage.module.css'

export default function VisitPage() {
  usePageMeta({
    title: 'Visit Us | Saffron House',
    description:
      'Find Saffron House at Kemp’s Corner, Breach Candy, Mumbai. Hours, map, and a contact form.',
  })

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(restaurant.mapQuery)}&z=15&output=embed`
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapQuery)}`

  return (
    <>
      <PageIntro
        eyebrow="Visit us"
        title="Breach Candy, without the rush."
        lede="The dining room is on Kemp's Corner. Evenings are booked in advance, and the room stays quiet."
      />
      <section className="section container">
        <div className={styles.layout}>
          <div className={styles.details}>
            <h2>The house</h2>
            <address>
              {restaurant.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <p>
              <a href={restaurant.phoneHref}>{restaurant.phone}</a>
            </p>
            <p>
              <a href={restaurant.emailHref}>{restaurant.email}</a>
            </p>

            <h2>Hours</h2>
            <table className={styles.hours}>
              <caption className="sr-only">Opening hours</caption>
              <tbody>
                {restaurant.hours.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td>{row.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.note}>Last seating is {formatTime(restaurant.lastSeating)}.</p>
          </div>

          <div className={styles.mapWrap}>
            <iframe
              title="Map of Breach Candy, Mumbai, the neighbourhood of Saffron House"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a className={styles.mapLink} href={mapHref} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className={`section container ${styles.contactSection}`} id="contact">
        <div className={styles.contact}>
          <SectionHeading
            eyebrow="Write to us"
            title="Questions, celebrations, private dining."
            lede="Tell us what you need. This form keeps your message on the page. It does not send an email."
          />
          <div className={styles.card}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
