import { useEffect, useRef } from 'react'

export function use3DTilt({ maxTilt = 10, scale = 1.03 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || reduceMotion) return undefined

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
      el.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
      el.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)
    }

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.4, 1)'
    }

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease-out'
    }

    el.addEventListener('mousemove', handleMouseMove, { passive: true })
    el.addEventListener('mouseleave', handleMouseLeave)
    el.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
      el.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [maxTilt, scale])

  return ref
}
