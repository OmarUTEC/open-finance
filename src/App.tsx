import Navbar from './components/Navbar'
import HeroStats from './components/HeroStats'
import CompanyExplorer from './components/CompanyExplorer'
import WorldMap from './components/WorldMap'
import NewsSection from './components/NewsSection'

function Divider() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 40px' }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)' }} />
    </div>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroStats />
      <Divider />
      <CompanyExplorer />
      <Divider />
      <WorldMap />
      <Divider />
      <NewsSection />
      <footer style={{ textAlign: 'center', paddingBottom: 32, paddingTop: 8, color: 'var(--text3)' }}>
        <p style={{ fontSize: 10, fontFamily: 'monospace' }}>Open Finance © 2025 — Finance & Consulting Intelligence</p>
      </footer>
    </div>
  )
}
