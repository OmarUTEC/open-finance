import { useState } from 'react'
import { motion } from 'framer-motion'
import { Newspaper, ArrowRight, TrendingUp, Globe, Building2, BarChart2, ArrowUpRight } from 'lucide-react'

const TAG_META: Record<string, { icon: React.ElementType; color: string }> = {
  Banking:    { icon: Building2, color: '#3b82f6' },
  Consulting: { icon: BarChart2, color: '#86BC25' },
  Perú:       { icon: Globe,     color: '#ef4444' },
  Investment: { icon: TrendingUp,color: '#8b5cf6' },
}

const NEWS = [
  { id: 1, tag: 'Banking',    title: 'JPMorgan reporta ganancias récord en Q2 2025 impulsadas por banca de inversión',           date: 'Jun 2025' },
  { id: 2, tag: 'Consulting', title: 'McKinsey y Deloitte lideran transformación de IA en sector financiero global',             date: 'Jun 2025' },
  { id: 3, tag: 'Investment', title: 'BlackRock supera $10T en activos bajo gestión por primera vez en su historia',             date: 'May 2025' },
  { id: 4, tag: 'Perú',       title: 'SBS reporta crecimiento de 8% en créditos MYPE del sistema de Cajas Municipales',         date: 'May 2025' },
  { id: 5, tag: 'Perú',       title: 'BCP y BBVA lideran expansión de banca digital en provincias del Perú',                    date: 'Abr 2025' },
  { id: 6, tag: 'Banking',    title: 'UBS completa integración de Credit Suisse: nueva estructura global lista',                  date: 'Abr 2025' },
]

function NewsCard({ item, index }: { item: typeof NEWS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)
  const meta = TAG_META[item.tag] ?? TAG_META.Banking
  const Icon = meta.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, padding: '18px 20px', cursor: 'pointer',
        position: 'relative', overflow: 'hidden',
        background: hovered ? `linear-gradient(135deg, ${meta.color}0d 0%, var(--surface) 70%)` : 'var(--surface)',
        border: `1px solid ${hovered ? meta.color + '35' : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'translateY(-3px)' : 'none',
        boxShadow: hovered ? `0 12px 32px ${meta.color}14` : '0 2px 8px rgba(0,0,0,.2)',
        transition: 'all .2s ease',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${meta.color}${hovered ? '80' : '30'}, transparent)`,
        transition: 'all .2s',
      }} />

      {/* Tag + date */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '3px 8px', borderRadius: 6,
          background: meta.color + '15', border: `1px solid ${meta.color}25`,
        }}>
          <Icon size={9} style={{ color: meta.color }} strokeWidth={2} />
          <span style={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: meta.color }}>
            {item.tag}
          </span>
        </div>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'var(--text3)' }}>{item.date}</span>
      </div>

      {/* Title */}
      <p style={{
        fontSize: 12.5, fontWeight: 500, lineHeight: 1.6,
        color: hovered ? 'var(--text1)' : 'var(--text2)',
        transition: 'color .2s', flex: 1,
      }}>
        {item.title}
      </p>

      {/* Read more */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
        transition: 'all .18s',
      }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: meta.color }}>Leer más</span>
        <ArrowUpRight size={10} style={{ color: meta.color }} />
      </div>
    </motion.div>
  )
}

export default function NewsSection() {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>

      {/* ── Centered header ── */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          }}>
            <Newspaper size={14} style={{ color: '#60a5fa' }} strokeWidth={1.75} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text1)' }}>Market News</h2>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' }}>
          Últimas noticias del sector financiero global
        </p>
      </div>

      {/* ── 3-column grid, all centered ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        maxWidth: 1100,
        margin: '0 auto',
      }}>
        {NEWS.map((item, i) => (
          <NewsCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* ── Ver todo ── */}
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <button style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 600, cursor: 'pointer',
          padding: '8px 20px', borderRadius: 999,
          color: 'var(--accent)', background: 'rgba(59,130,246,0.08)',
          border: '1px solid rgba(59,130,246,0.18)',
          transition: 'opacity .15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Ver todas las noticias <ArrowRight size={12} />
        </button>
      </div>
    </section>
  )
}
