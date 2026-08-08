import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe, BarChart2, Layers, Triangle,
  Landmark, TrendingUp, MapPin, Building, Shield, Home, Search,
} from 'lucide-react'
import { COMPANIES, type Group, type Company } from '../data/companies'
import CompanyModal from './CompanyModal'

/* ─── Filter tree (flat list for top bar) ─── */
interface FilterNode { id: Group; label: string; icon: React.ElementType; color: string; sub?: boolean }

const FILTERS: FilterNode[] = [
  { id: 'all',            label: 'All',              icon: Globe,      color: '#3b82f6' },
  { id: 'consulting',     label: 'Consulting',        icon: BarChart2,  color: '#86BC25' },
  { id: 'big4',           label: 'Big 4',             icon: Layers,     color: '#86BC25',  sub: true },
  { id: 'big3',           label: 'Big 3',             icon: Triangle,   color: '#00A850',  sub: true },
  { id: 'global-banks',   label: 'Global Banks',      icon: Landmark,   color: '#3b82f6' },
  { id: 'investment',     label: 'Investment',         icon: TrendingUp, color: '#8b5cf6' },
  { id: 'peru',           label: 'Bancos Perú',        icon: MapPin,     color: '#ef4444' },
  { id: 'peru-commercial',label: 'Banca Múltiple',    icon: Building,   color: '#003876',  sub: true },
  { id: 'peru-state',     label: 'Banca Estatal',     icon: Shield,     color: '#006B3C',  sub: true },
  { id: 'peru-cajas',     label: 'Cajas Municipales', icon: Home,       color: '#FF6B00',  sub: true },
]

/* ─── Company card ─── */
function CompanyCard({ c, onClick }: { c: Company; onClick: () => void }) {
  const [imgFailed, setImgFailed] = useState(!c.logo)
  const [hovered, setHovered] = useState(false)
  const monogram = c.monogram ?? c.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.18 }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', width: '100%',
        borderRadius: 16, overflow: 'hidden', textAlign: 'left',
        border: `1px solid ${hovered ? c.color + '40' : 'rgba(255,255,255,0.07)'}`,
        transform: hovered ? 'translateY(-5px) scale(1.02)' : 'none',
        boxShadow: hovered ? `0 20px 48px ${c.color}1a` : '0 2px 8px rgba(0,0,0,.3)',
        transition: 'border-color .2s, box-shadow .22s, transform .22s',
        background: 'var(--surface)', cursor: 'pointer',
      }}
    >
      {/* Logo area */}
      <div style={{
        height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        background: imgFailed ? 'transparent' : '#fff',
      }}>
        {imgFailed ? (
          <>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(135deg, ${c.color}20 0%, ${c.color}08 100%)`,
            }} />
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.3,
              background: `radial-gradient(circle at 30% 30%, ${c.color}50, transparent 70%)`,
            }} />
            <span style={{
              position: 'relative', fontWeight: 900, fontSize: 28,
              letterSpacing: '-0.04em', color: c.color,
              textShadow: `0 0 24px ${c.color}60`,
            }}>
              {monogram}
            </span>
          </>
        ) : (
          <>
            {hovered && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.04,
                background: `radial-gradient(circle at center, ${c.color}, transparent)`,
              }} />
            )}
            <img
              src={c.logo} alt={c.name}
              style={{
                maxWidth: 110, maxHeight: 44, objectFit: 'contain', position: 'relative',
                transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform .2s',
              }}
              onError={() => setImgFailed(true)}
            />
          </>
        )}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${c.color}35, transparent)`,
        }} />
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 12px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 6,
        background: 'var(--surface)', borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          fontSize: 10.5, fontWeight: 600, color: 'var(--text2)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          flex: 1, minWidth: 0,
        }}>
          {c.name}
        </p>
        <span style={{ fontSize: 12, flexShrink: 0 }}>{c.countryFlag}</span>
      </div>
    </motion.button>
  )
}

/* ─── Main ─── */
export default function CompanyExplorer() {
  const [activeGroup, setActiveGroup] = useState<Group>('all')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Company | null>(null)

  const filtered = COMPANIES.filter(c => {
    const matchGroup = activeGroup === 'all' || c.groups.includes(activeGroup)
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())
    return matchGroup && matchSearch
  })

  const activeNode = FILTERS.find(f => f.id === activeGroup)
  const colCount = Math.min(Math.max(filtered.length, 1), 6)
  // max card width: 210px so cards never stretch obscenely; justify-content center handles centering
  const gridCols = `repeat(${colCount}, minmax(140px, 210px))`

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px 40px' }}>

      {/* ── Section header ── */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <p style={{ fontSize: 10, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text3)', marginBottom: 4 }}>
          Directory
        </p>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text1)' }}>
          {activeNode?.label ?? 'All Entities'}
        </h2>
      </div>

      {/* ── Horizontal filter bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap', gap: 6, marginBottom: 20,
      }}>
        {FILTERS.map(node => {
          const active = activeGroup === node.id
          return (
            <button
              key={node.id}
              onClick={() => setActiveGroup(node.id)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: node.sub ? '4px 10px' : '6px 14px',
                borderRadius: 999,
                background: active ? `${node.color}18` : 'transparent',
                border: `1px solid ${active ? node.color + '50' : 'rgba(255,255,255,0.08)'}`,
                color: active ? node.color : 'var(--text3)',
                fontSize: node.sub ? 10.5 : 11.5,
                fontWeight: 600, cursor: 'pointer',
                transition: 'all .15s',
                opacity: node.sub ? 0.85 : 1,
              }}
            >
              <node.icon size={node.sub ? 10 : 11} strokeWidth={1.75} />
              {node.label}
              {active && (
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: node.color }} />
              )}
            </button>
          )
        })}
      </div>

      {/* ── Search + count ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text3)' }} />
          <input
            type="text"
            placeholder="Buscar empresa, país..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', paddingLeft: 36, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
              borderRadius: 12, fontSize: 13, outline: 'none',
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text1)', boxSizing: 'border-box',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>
        <span style={{
          fontSize: 11, fontFamily: 'monospace', whiteSpace: 'nowrap',
          padding: '6px 12px', borderRadius: 8,
          background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text3)',
        }}>
          <strong style={{ color: 'var(--text1)' }}>{filtered.length}</strong> / {COMPANIES.length}
        </span>
      </div>

      {/* ── Grid ── */}
      <motion.div layout style={{ display: 'grid', gap: 12, gridTemplateColumns: gridCols, justifyContent: 'center' }}>
        <AnimatePresence mode="popLayout">
          {filtered.map(c => (
            <CompanyCard key={c.id} c={c} onClick={() => setSelected(c)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text3)' }}>
          <Search size={28} strokeWidth={1.25} style={{ margin: '0 auto 12px' }} />
          <p style={{ fontFamily: 'monospace', fontSize: 13 }}>No results found.</p>
          <button
            onClick={() => { setSearch(''); setActiveGroup('all') }}
            style={{ marginTop: 8, fontSize: 12, color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Clear filters
          </button>
        </div>
      )}

      {selected && <CompanyModal company={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
