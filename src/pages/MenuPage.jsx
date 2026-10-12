import MenuBoard from '@/components/menu/MenuBoard.jsx'
import PageIntro from '@/components/ui/PageIntro.jsx'
import ReserveBanner from '@/components/ui/ReserveBanner.jsx'
import { usePageMeta } from '@/hooks/usePageMeta.js'

export default function MenuPage() {
  usePageMeta({
    title: 'Menu | Saffron House',
    description:
      'Starters, mains, breads, and desserts at Saffron House. A short regional Indian menu in Breach Candy, Mumbai.',
  })

  return (
    <>
      <PageIntro
        eyebrow="The menu"
        title="Four courses, and no buffet."
        lede="Starters, mains, breads, and desserts. Dishes are cooked to order. If something is off the market, it leaves the list."
      />
      <MenuBoard />
      <ReserveBanner />
    </>
  )
}
