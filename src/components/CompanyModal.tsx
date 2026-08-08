import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Users, DollarSign, Globe, ExternalLink, Briefcase, TrendingUp } from 'lucide-react'
import type { Company } from '../data/companies'

interface Props { company: Company | null; onClose: () => void }

const GROUP_LABELS: Record<string, string> = {
  'big4': 'Big 4', 'big3': 'Big 3', 'global-banks': 'Global Banks',
  'investment': 'Investment', 'consulting': 'Consulting',
  'peru-commercial': 'Banca Múltiple', 'peru-state': 'Banca Estatal', 'peru-cajas': 'Cajas Municipales',
}

export default function CompanyModal({ company, onClose }: Props) {
  const [imgFailed, setImgFailed] = useState(false)
  if (!company) return null

  const monogram = company.monogram ?? company.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  const meta = [
    { icon: MapPin,     label: 'Sede Principal', value: company.hq },
    { icon: Globe,      label: 'País de Origen',  value: `${company.countryFlag} ${company.country}` },
    { icon: Calendar,   label: 'Fundado',          value: String(company.founded) },
    company.employees && { icon: Users,      label: 'Empleados', value: company.employees },
    company.revenue   && { icon: DollarSign, label: 'Ingresos',  value: company.revenue },
    company.aum       && { icon: TrendingUp, label: 'AUM',       value: company.aum },
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string }[]

  const tags = company.groups.filter(g => !['peru', 'all'].includes(g))

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
          background: 'rgba(4,8,16,0.82)', backdropFilter: 'blur(10px)',
        }}
      >
        {/* Panel */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.9, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 520,
            maxHeight: '88vh', overflowY: 'auto',
            borderRadius: 24,
            background: 'var(--surface)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${company.color}18`,
          }}
        >
          {/* Color glow top */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '24px 24px 0 0',
            background: `linear-gradient(90deg, transparent, ${company.color}cc, transparent)`,
          }} />

          {/* Ambient glow behind logo area */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 140, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 50% 0%, ${company.color}12, transparent 70%)`,
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 16, zIndex: 10,
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text3)', cursor: 'pointer', transition: 'all .15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)'; e.currentTarget.style.color = 'var(--text1)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'var(--text3)' }}
          >
            <X size={13} strokeWidth={2.5} />
          </button>

          {/* ── Header ── */}
          <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

              {/* Logo box */}
              <div style={{
                width: 68, height: 68, borderRadius: 16, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                background: imgFailed ? `${company.color}14` : '#fff',
                border: `1px solid ${company.color}30`,
                boxShadow: `0 0 24px ${company.color}20`,
              }}>
                {!imgFailed && company.logo ? (
                  <img src={company.logo} alt={company.name}
                    style={{ width: 48, height: 48, objectFit: 'contain' }}
                    onError={() => setImgFailed(true)} />
                ) : (
                  <span style={{ fontWeight: 900, fontSize: 22, color: company.color, letterSpacing: '-0.04em' }}>
                    {monogram}
                  </span>
                )}
              </div>

              {/* Name + tags */}
              <div style={{ minWidth: 0, flex: 1 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text1)', lineHeight: 1.2, marginBottom: 8 }}>
                  {company.name}
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {tags.map(g => (
                    <span key={g} style={{
                      fontSize: 9, fontFamily: 'monospace', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      padding: '3px 8px', borderRadius: 4,
                      background: company.color + '15', color: company.color,
                      border: `1px solid ${company.color}28`,
                    }}>
                      {GROUP_LABELS[g] ?? g.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Description */}
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text2)', margin: 0 }}>
              {company.description}
            </p>

            {/* Metadata grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {meta.map(({ icon: Icon, label, value }) => (
                <div key={label} style={{
                  borderRadius: 12, padding: '11px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                    <Icon size={10} style={{ color: 'var(--text3)' }} strokeWidth={1.75} />
                    <span style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text3)' }}>
                      {label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text1)', margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Services */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Briefcase size={11} style={{ color: 'var(--text3)' }} strokeWidth={1.75} />
                <span style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text3)' }}>
                  Servicios
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {company.services.map(s => (
                  <span key={s} style={{
                    fontSize: 11.5, padding: '5px 10px', borderRadius: 8, fontWeight: 500,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text2)',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Website CTA */}
            <a
              href={`https://${company.website}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '12px', borderRadius: 12, textDecoration: 'none',
                fontSize: 13, fontWeight: 600,
                background: `linear-gradient(135deg, ${company.color}20, ${company.color}0c)`,
                color: company.color,
                border: `1px solid ${company.color}35`,
                transition: 'opacity .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <ExternalLink size={13} strokeWidth={2} />
              {company.website}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
