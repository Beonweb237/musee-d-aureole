import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Visit from '@/pages/Visit'
import Exhibitions from '@/pages/Exhibitions'
import Collections from '@/pages/Collections'
import ArtworkDetail from '@/pages/ArtworkDetail'
import Education from '@/pages/Education'
import Support from '@/pages/Support'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/visiter" element={<Visit />} />
        <Route path="/expositions" element={<Exhibitions />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:id" element={<ArtworkDetail />} />
        <Route path="/education" element={<Education />} />
        <Route path="/soutenir" element={<Support />} />
      </Routes>
    </Layout>
  )
}
