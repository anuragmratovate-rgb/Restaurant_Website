import styles from './SectionHeading.module.css'

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  as: Tag = 'h2',
  tone = 'light',
  titleId,
}) {
  return (
    <div className={`${styles.heading} ${styles[tone]}`}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <Tag id={titleId}>{title}</Tag>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  )
}
