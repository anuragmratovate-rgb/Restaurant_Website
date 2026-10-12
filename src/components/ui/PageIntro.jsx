import SectionHeading from '@/components/ui/SectionHeading.jsx'
import styles from './PageIntro.module.css'

export default function PageIntro({ eyebrow, title, lede, compact = false }) {
  return (
    <header className={`${styles.intro} ${compact ? styles.compact : ''}`}>
      <div className="container">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} lede={lede} />
      </div>
    </header>
  )
}
