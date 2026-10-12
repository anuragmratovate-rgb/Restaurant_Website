import Button from '@/components/ui/Button.jsx'
import SectionHeading from '@/components/ui/SectionHeading.jsx'
import { usePageMeta } from '@/hooks/usePageMeta.js'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page not found | Saffron House',
    description: 'This page is not on the Saffron House site.',
  })

  return (
    <section className="section container">
      <SectionHeading
        as="h1"
        eyebrow="404"
        title="This page is not on the menu."
        lede="The link may be out of date. The dining room is still open."
      />
      <div className={styles.actions}>
        <Button to="/">Back to home</Button>
        <Button to="/menu" variant="ghost">
          View the menu
        </Button>
      </div>
    </section>
  )
}
