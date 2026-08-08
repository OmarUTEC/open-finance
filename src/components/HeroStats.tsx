import { motion } from 'framer-motion'
import { Building2, Globe2, MapPin, DollarSign } from 'lucide-react'
import { STATS } from '../data/companies'

const cards = [
  { icon: Building2,  label: 'Total Entities',    value: String(STATS.totalCompanies),  color: '#3b82f6' },
  { icon: Globe2,     label: 'Global Companies',  value: String(STATS.globalCompanies), color: '#8b5cf6' },
  { icon: MapPin,     label: 'Peruvian Banks',    value: String(STATS.peruCompanies),   color: '#ef4444' },
  { icon: DollarSign, label: 'Assets Under Mgmt', value: STATS.totalAUM,               color: '#10b981' },
]

export default function HeroStats() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)', backgroundSize: '52px 52px' }}>
      {/* Glow blobs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, left: '25%', width: 384, height: 384, borderRadius: '50%', opacity: 0.07, filter: 'blur(80px)', background: 'radial-gradient(circle, #3b82f6, transparent)' }} />
        <div style={{ position: 'absolute', top: 0, right: '25%', width: 384, height: 384, borderRadius: '50%', opacity: 0.07, filter: 'blur(80px)', background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 160, opacity: 0.04, filter: 'blur(60px)', background: 'radial-gradient(ellipse, #10b981, transparent)' }} />
      </div>

      {/* Content — all centered via inline styles to guarantee alignment */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 20px 56px', textAlign: 'center' }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontFamily: 'monospace', padding: '6px 16px',
            borderRadius: 999, border: '1px solid rgba(59,130,246,0.25)',
            background: 'rgba(59,130,246,0.07)', color: '#60a5fa',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#60a5fa', animation: 'pulse 2s infinite' }} />
            Finance & Consulting Intelligence Platform
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }}
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 16 }}
        >
          <span className="gradient-text">Open Finance</span>
          <br />
          <span style={{ color: 'var(--text1)' }}>Company Explorer</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}
          style={{
            maxWidth: 520, margin: '0 auto 48px',
            fontSize: 14, lineHeight: 1.75, color: 'var(--text3)',
          }}
        >
          Directorio de firmas de consultoría, banca global e instituciones financieras peruanas — datos, servicios y descripción de cada entidad.
        </motion.p>

        {/* KPI cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          maxWidth: 760,
          margin: '0 auto',
        }}>
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 + i * 0.07 }}
              style={{
                borderRadius: 16, padding: '20px 16px',
                background: 'var(--surface)',
                border: `1px solid ${card.color}20`,
                position: 'relative', overflow: 'hidden',
                textAlign: 'center',
              }}
            >
              <div style={{
                position: 'absolute', inset: '0 0 auto', height: 1,
                background: `linear-gradient(90deg, transparent, ${card.color}55, transparent)`,
              }} />
              <div style={{
                width: 40, height: 40, borderRadius: 12, margin: '0 auto 12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: card.color + '14', border: `1px solid ${card.color}22`,
              }}>
                <card.icon size={17} style={{ color: card.color }} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 26, fontWeight: 900, color: card.color, lineHeight: 1, marginBottom: 4 }}>
                {card.value}
              </p>
              <p style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)' }}>
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
