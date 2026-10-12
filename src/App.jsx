import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout.jsx'
import HomePage from '@/pages/HomePage.jsx'
import MenuPage from '@/pages/MenuPage.jsx'
import NotFoundPage from '@/pages/NotFoundPage.jsx'
import ReservePage from '@/pages/ReservePage.jsx'
import StoryPage from '@/pages/StoryPage.jsx'
import VisitPage from '@/pages/VisitPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="story" element={<StoryPage />} />
        <Route path="visit" element={<VisitPage />} />
        <Route path="reserve" element={<ReservePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
