import { useEffect, useState } from 'react'
import styles from './CustomerJourney.module.css'

const journeySteps = [
  {
    number: '01',
    title: 'Welcomed with Grace',
    desc: 'The teak doors part to the scent of sandalwood and a chilled saffron & rose petal welcome elixir.',
    icon: (
      /* Leaf / Botanical Seedling Icon matching Step 1 in reference */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 11 3s7 4 7 10a7 7 0 0 1-7 7z" />
        <path d="M11 20v-9" />
        <path d="M11 15c2.5-1 4-3 4-3" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Crafted with Heart',
    desc: 'Dum pukht slow-cooking in dough-sealed earthen handis. Never rushed, always deeply intentional.',
    icon: (
      /* Chef Hat / Cooking Craft Icon matching Step 2 in reference */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.8a4.5 4.5 0 1 1-1.3-8.8 5 5 0 0 1 9.6-1.5 4.5 4.5 0 1 1 5 7.8" />
        <path d="M6 14h12v5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-5z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Served with Warmth',
    desc: 'Silver cloche unveiled tableside under soft candlelight, releasing aromatic saffron steam.',
    icon: (
      /* Cutlery / Fork & Knife Icon matching Step 3 in reference */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2v20" />
        <path d="M21 2c0 4-3 6-3 6" />
        <path d="M3 2v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2" />
        <path d="M6 11v11" />
        <path d="M6 2v5" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Remembered Always',
    desc: 'Unhurried conversations, sublime dessert notes, a warm parting namaste, and a memory to keep.',
    icon: (
      /* Heart / Lasting Memory Icon matching Step 4 in reference */
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
]

export default function CustomerJourney() {
  const [activeStep, setActiveStep] = useState(1) // 0-indexed, default on step 2 like the reference photo
  const [isPaused, setIsPaused] = useState(false)

  // Auto-progress through the journey steps
  useEffect(() => {
    if (isPaused) return undefined

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPaused])

  // Calculate progress width percentage between step centers
  // Span between step 0 center (12.5%) and step 3 center (87.5%) is 75%
  const progressPercent = (activeStep / (journeySteps.length - 1)) * 75

  return (
    <section
      className={`section ${styles.journeySection}`}
      aria-labelledby="journey-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>— MORE THAN A MEAL —</p>
          <h2 id="journey-heading" className={styles.sectionTitle}>
            A little journey. A lasting feeling.
          </h2>
        </div>

        {/* The Timeline Track & Interactive Steps */}
        <div className={styles.trackContainer}>
          {/* Base Background Connecting Line */}
          <div className={styles.timelineBaseLine} />

          {/* Animated Active Progress Line */}
          <div
            className={styles.timelineActiveLine}
            style={{ width: `${progressPercent}%` }}
          />

          {/* Step Nodes Grid */}
          <div className={styles.stepsGrid}>
            {journeySteps.map((step, idx) => {
              const isActive = idx === activeStep
              const isPassed = idx < activeStep

              return (
                <button
                  type="button"
                  key={step.number}
                  className={`${styles.stepNode} ${isActive ? styles.stepActive : ''} ${
                    isPassed ? styles.stepPassed : ''
                  }`}
                  onClick={() => setActiveStep(idx)}
                  aria-pressed={isActive}
                >
                  {/* Circular Step Badge with Icon */}
                  <div className={styles.iconCircleWrapper}>
                    <div className={styles.iconCircle}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Number in accent terracotta/crimson */}
                  <span className={styles.stepNumber}>{step.number}</span>

                  {/* Step Title in elegant serif */}
                  <h3 className={styles.stepTitle}>{step.title}</h3>

                  {/* Step Description */}
                  <p className={styles.stepDesc}>{step.desc}</p>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
