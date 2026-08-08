import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — no types for react-simple-maps
import {
  ComposableMap, Geographies, Geography, Marker, ZoomableGroup,
} from 'react-simple-maps'
import { MapPin, Globe2, Building2, TrendingUp, BarChart2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

/* ─── Sector config ─── */
const SECTORS = {
  consulting:   { label: 'Consulting',    color: '#86BC25', icon: BarChart2 },
  'global-banks':{ label: 'Global Banks', color: '#3b82f6', icon: Building2 },
  investment:   { label: 'Investment',    color: '#8b5cf6', icon: TrendingUp },
  peru:         { label: 'Bancos Perú',   color: '#ef4444', icon: MapPin },
} as const

type SectorKey = keyof typeof SECTORS

/* ─── Marker data [lng, lat] ─── */
interface MapMarker {
  id: string; name: string; sector: SectorKey
  coords: [number, number]; hq: string; logo?: string; color: string
}

const MARKERS: MapMarker[] = [
  // — Consulting —
  { id: 'pwc',          name: 'PwC',                   sector: 'consulting',    coords: [-0.12,  51.51], hq: 'London, UK',           color: '#D04A02' },
  { id: 'deloitte',     name: 'Deloitte',              sector: 'consulting',    coords: [-0.09,  51.52], hq: 'London, UK',           color: '#86BC25' },
  { id: 'ey',           name: 'Ernst & Young',         sector: 'consulting',    coords: [-0.07,  51.50], hq: 'London, UK',           color: '#FFE600' },
  { id: 'kpmg',         name: 'KPMG',                  sector: 'consulting',    coords: [4.90,   52.37], hq: 'Amstelveen, NL',       color: '#00338D' },
  { id: 'mckinsey',     name: 'McKinsey & Company',    sector: 'consulting',    coords: [-74.01, 40.71], hq: 'New York, USA',        color: '#003087' },
  { id: 'bcg',          name: 'BCG',                   sector: 'consulting',    coords: [-71.06, 42.36], hq: 'Boston, USA',          color: '#00A850' },
  { id: 'bain',         name: 'Bain & Company',        sector: 'consulting',    coords: [-71.08, 42.34], hq: 'Boston, USA',          color: '#CC0000' },
  { id: 'accenture',    name: 'Accenture',             sector: 'consulting',    coords: [-6.26,  53.35], hq: 'Dublin, Ireland',      color: '#A100FF' },
  { id: 'oliver-wyman', name: 'Oliver Wyman',          sector: 'consulting',    coords: [-73.98, 40.73], hq: 'New York, USA',        color: '#003087' },
  // — Global Banks —
  { id: 'jpmorgan',     name: 'JPMorgan Chase',        sector: 'global-banks',  coords: [-74.00, 40.75], hq: 'New York, USA',        color: '#117ACA' },
  { id: 'bofa',         name: 'Bank of America',       sector: 'global-banks',  coords: [-80.84, 35.23], hq: 'Charlotte, USA',       color: '#E31837' },
  { id: 'citi',         name: 'Citigroup',             sector: 'global-banks',  coords: [-73.96, 40.76], hq: 'New York, USA',        color: '#003B70' },
  { id: 'wells-fargo',  name: 'Wells Fargo',           sector: 'global-banks',  coords: [-122.42, 37.77],hq: 'San Francisco, USA',   color: '#D71E28' },
  { id: 'hsbc',         name: 'HSBC',                  sector: 'global-banks',  coords: [-0.05,  51.49], hq: 'London, UK',           color: '#DB0011' },
  { id: 'barclays',     name: 'Barclays',              sector: 'global-banks',  coords: [-0.02,  51.52], hq: 'London, UK',           color: '#00AEEF' },
  { id: 'deutsche',     name: 'Deutsche Bank',         sector: 'global-banks',  coords: [8.68,   50.11], hq: 'Frankfurt, Germany',   color: '#0018A8' },
  { id: 'ubs',          name: 'UBS',                   sector: 'global-banks',  coords: [8.54,   47.38], hq: 'Zurich, Switzerland',  color: '#E60000' },
  { id: 'goldman',      name: 'Goldman Sachs',         sector: 'global-banks',  coords: [-74.01, 40.70], hq: 'New York, USA',        color: '#6D6E71' },
  // — Investment —
  { id: 'morgan-stanley',name:'Morgan Stanley',        sector: 'investment',    coords: [-73.99, 40.76], hq: 'New York, USA',        color: '#003087' },
  { id: 'blackrock',    name: 'BlackRock',             sector: 'investment',    coords: [-73.97, 40.77], hq: 'New York, USA',        color: '#000000' },
  { id: 'blackstone',   name: 'Blackstone',            sector: 'investment',    coords: [-73.95, 40.78], hq: 'New York, USA',        color: '#2D2D2D' },
  { id: 'vanguard',     name: 'Vanguard',              sector: 'investment',    coords: [-75.51, 40.04], hq: 'Malvern, USA',         color: '#811A20' },
  // — Perú (Lima cluster) —
  { id: 'bcp',          name: 'BCP',                   sector: 'peru',          coords: [-77.04, -12.05],hq: 'Lima, Perú',           color: '#003876' },
  { id: 'bbva-peru',    name: 'BBVA Perú',             sector: 'peru',          coords: [-77.06, -12.03],hq: 'Lima, Perú',           color: '#004B9B' },
  { id: 'scotiabank',   name: 'Scotiabank Perú',       sector: 'peru',          coords: [-77.07, -12.07],hq: 'Lima, Perú',           color: '#EC111A' },
  { id: 'interbank',    name: 'Interbank',             sector: 'peru',          coords: [-77.03, -12.08],hq: 'Lima, Perú',           color: '#007A36' },
  { id: 'banbif',       name: 'BanBif',                sector: 'peru',          coords: [-77.05, -12.06],hq: 'Lima, Perú',           color: '#004FA3' },
  { id: 'mibanco',      name: 'Mibanco',               sector: 'peru',          coords: [-77.02, -12.04],hq: 'Lima, Perú',           color: '#F5A800' },
  { id: 'pichincha',    name: 'Banco Pichincha',       sector: 'peru',          coords: [-77.08, -12.09],hq: 'Lima, Perú',           color: '#0B7340' },
  { id: 'falabella',    name: 'Banco Falabella',       sector: 'peru',          coords: [-77.09, -12.02],hq: 'Lima, Perú',           color: '#009B3A' },
  { id: 'ripley',       name: 'Banco Ripley',          sector: 'peru',          coords: [-77.01, -12.06],hq: 'Lima, Perú',           color: '#8B1A8B' },
  { id: 'gnb',          name: 'Banco GNB Perú',        sector: 'peru',          coords: [-77.03, -12.02],hq: 'Lima, Perú',           color: '#005B9A' },
  { id: 'alfin',        name: 'Alfin Banco',           sector: 'peru',          coords: [-77.06, -12.04],hq: 'Lima, Perú',           color: '#E6001E' },
  { id: 'comercio',     name: 'Banco de Comercio',     sector: 'peru',          coords: [-77.05, -12.08],hq: 'Lima, Perú',           color: '#8B0000' },
  { id: 'nacion',       name: 'Banco de la Nación',    sector: 'peru',          coords: [-77.04, -12.09],hq: 'Lima, Perú',           color: '#C8102E' },
  { id: 'agrobanco',    name: 'Agrobanco',             sector: 'peru',          coords: [-77.07, -12.05],hq: 'Lima, Perú',           color: '#4CAF50' },
  // Cajas en otras ciudades
  { id: 'arequipa',     name: 'Caja Arequipa',         sector: 'peru',          coords: [-71.54, -16.40],hq: 'Arequipa, Perú',       color: '#D4AA00' },
  { id: 'huancayo',     name: 'Caja Huancayo',         sector: 'peru',          coords: [-75.22, -12.07],hq: 'Huancayo, Perú',       color: '#0057A8' },
  { id: 'sullana',      name: 'Caja Sullana',          sector: 'peru',          coords: [-80.69, -4.90], hq: 'Sullana, Perú',        color: '#C8102E' },
  { id: 'cusco',        name: 'Caja Cusco',            sector: 'peru',          coords: [-71.98, -13.53],hq: 'Cusco, Perú',          color: '#8B4513' },
  { id: 'piura',        name: 'Caja Piura',            sector: 'peru',          coords: [-80.63, -5.19], hq: 'Piura, Perú',          color: '#1E90FF' },
  { id: 'trujillo',     name: 'Caja Trujillo',         sector: 'peru',          coords: [-79.00, -8.11], hq: 'Trujillo, Perú',       color: '#FF6B00' },
  { id: 'ica',          name: 'Caja Ica',              sector: 'peru',          coords: [-75.73, -14.07],hq: 'Ica, Perú',            color: '#006B3C' },
  { id: 'tacna',        name: 'Caja Tacna',            sector: 'peru',          coords: [-70.25, -18.01],hq: 'Tacna, Perú',          color: '#8B0000' },
  { id: 'maynas',       name: 'Caja Maynas',           sector: 'peru',          coords: [-73.25, -3.75], hq: 'Iquitos, Perú',        color: '#228B22' },
  { id: 'santa',        name: 'Caja Del Santa',        sector: 'peru',          coords: [-78.59, -9.08], hq: 'Chimbote, Perú',       color: '#4169E1' },
  { id: 'metropolitana',name: 'Caja Metropolitana',    sector: 'peru',          coords: [-77.01, -12.02],hq: 'Lima, Perú',           color: '#FF8C00' },
  { id: 'paita',        name: 'Caja Paita',            sector: 'peru',          coords: [-81.11, -5.09], hq: 'Paita, Perú',          color: '#DC143C' },
]

/* ─── Pulse ring animation ─── */
function PulseRing({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <>
      {[0, 1].map(i => (
        <motion.circle
          key={i}
          r={3}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          initial={{ r: 3, opacity: 0.7 }}
          animate={{ r: 14, opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, delay: delay + i * 1, ease: 'easeOut' }}
        />
      ))}
    </>
  )
}

/* ─── Tooltip ─── */
function Tooltip({ marker, position }: { marker: MapMarker; position: { x: number; y: number } }) {
  const sector = SECTORS[marker.sector]
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'fixed',
          left: position.x + 12,
          top: position.y - 60,
          zIndex: 100,
          pointerEvents: 'none',
          background: 'rgba(10,18,32,0.97)',
          border: `1px solid ${marker.color}50`,
          borderRadius: 12,
          padding: '10px 14px',
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${marker.color}20`,
          minWidth: 170,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '12px 12px 0 0', background: `linear-gradient(90deg, transparent, ${marker.color}, transparent)` }} />
        <p style={{ fontSize: 12, fontWeight: 700, color: '#eef2ff', marginBottom: 3 }}>{marker.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 6px', borderRadius: 4, background: sector.color + '20', color: sector.color, border: `1px solid ${sector.color}30` }}>
            {sector.label}
          </span>
        </div>
        <p style={{ fontSize: 10, color: '#4f6278', marginTop: 4, fontFamily: 'monospace' }}>{marker.hq}</p>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Main component ─── */
export default function WorldMap() {
  const [hovered, setHovered] = useState<MapMarker | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [center, setCenter] = useState<[number, number]>([0, 10])
  const [activeSector, setActiveSector] = useState<SectorKey | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const visibleMarkers = activeSector
    ? MARKERS.filter(m => m.sector === activeSector)
    : MARKERS

  const regionStats = {
    northAmerica: MARKERS.filter(m => ['consulting', 'global-banks', 'investment'].includes(m.sector) && m.coords[0] < -60).length,
    europe: MARKERS.filter(m => m.coords[0] > -15 && m.coords[0] < 30 && m.coords[1] > 35).length,
    peru: MARKERS.filter(m => m.sector === 'peru').length,
  }

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <Globe2 size={15} style={{ color: '#60a5fa' }} />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text1)' }}>Global Presence</h2>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text3)', fontFamily: 'monospace' }}>
            {MARKERS.length} firmas en {Object.keys(regionStats).length + 1} regiones del mundo
          </p>
        </motion.div>
      </div>

      {/* ── Region stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}
      >
        {[
          { label: 'North America', count: regionStats.northAmerica, color: '#3b82f6', flag: '🇺🇸' },
          { label: 'Europe', count: regionStats.europe, color: '#8b5cf6', flag: '🇪🇺' },
          { label: 'Perú', count: regionStats.peru, color: '#ef4444', flag: '🇵🇪' },
        ].map(r => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 10, background: 'var(--surface)', border: `1px solid ${r.color}20` }}>
            <span style={{ fontSize: 16 }}>{r.flag}</span>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: r.color, lineHeight: 1 }}>{r.count}</p>
              <p style={{ fontSize: 9, fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)' }}>{r.label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Map container ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', background: '#060c18' }}
      >
        {/* Glow corners */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: 300, height: 300, borderRadius: '0 0 300px 0', background: 'radial-gradient(circle at top left, rgba(59,130,246,0.06), transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 300, height: 300, borderRadius: '300px 0 0 0', background: 'radial-gradient(circle at bottom right, rgba(139,92,246,0.06), transparent 60%)', pointerEvents: 'none', zIndex: 1 }} />

        {/* Zoom controls */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { icon: ZoomIn,    action: () => setZoom(z => Math.min(z + 0.5, 8)) },
            { icon: ZoomOut,   action: () => setZoom(z => Math.max(z - 0.5, 1)) },
            { icon: RotateCcw, action: () => { setZoom(1); setCenter([0, 10]) } },
          ].map(({ icon: Icon, action }, i) => (
            <button key={i} onClick={action} style={{ width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,18,32,0.9)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text3)', cursor: 'pointer', transition: 'all .15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,130,246,0.2)'; e.currentTarget.style.color = '#60a5fa'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,18,32,0.9)'; e.currentTarget.style.color = 'var(--text3)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            >
              <Icon size={13} strokeWidth={2} />
            </button>
          ))}
        </div>

        {/* Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 140 }}
          style={{ width: '100%', height: 480, display: 'block' }}
        >
          <ZoomableGroup
            zoom={zoom}
            center={center}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onMoveEnd={({ zoom: z, coordinates }: any) => { setZoom(z); setCenter(coordinates) }}
          >
            {/* Graticule-like bg */}
            <rect x="-2000" y="-2000" width="4000" height="4000" fill="#060c18" />

            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: '#0d1929', stroke: '#1a2d44', strokeWidth: 0.4, outline: 'none' },
                      hover:   { fill: '#112236', stroke: '#1e3450', strokeWidth: 0.4, outline: 'none' },
                      pressed: { fill: '#0d1929', outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* Markers */}
            {mounted && visibleMarkers.map((marker, i) => (
              <Marker
                key={marker.id}
                coordinates={marker.coords}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseEnter={(e: any) => { setHovered(marker); setTooltipPos({ x: e.clientX, y: e.clientY }) }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onMouseMove={(e: any) => setTooltipPos({ x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setHovered(null)}
              >
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.015, type: 'spring', stiffness: 300 }}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Pulse rings */}
                  <PulseRing color={marker.color} delay={i * 0.08 % 2} />

                  {/* Outer glow circle */}
                  <circle r={5} fill={marker.color} fillOpacity={0.15} />

                  {/* Main dot */}
                  <circle
                    r={hovered?.id === marker.id ? 4.5 : 3}
                    fill={marker.color}
                    stroke={hovered?.id === marker.id ? '#fff' : marker.color}
                    strokeWidth={hovered?.id === marker.id ? 1.2 : 0.5}
                    strokeOpacity={0.8}
                    style={{ filter: `drop-shadow(0 0 4px ${marker.color}cc)`, transition: 'all .15s' }}
                  />
                </motion.g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>

        {/* Sector filter pills — over the map */}
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 5 }}>
          <button
            onClick={() => setActiveSector(null)}
            style={{ padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, cursor: 'pointer', transition: 'all .15s', background: !activeSector ? 'rgba(59,130,246,0.25)' : 'rgba(6,12,24,0.85)', border: `1px solid ${!activeSector ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.1)'}`, color: !activeSector ? '#60a5fa' : 'var(--text3)' }}
          >
            ALL
          </button>
          {(Object.entries(SECTORS) as [SectorKey, typeof SECTORS[SectorKey]][]).map(([key, s]) => {
            const active = activeSector === key
            return (
              <button
                key={key}
                onClick={() => setActiveSector(active ? null : key)}
                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, cursor: 'pointer', transition: 'all .15s', background: active ? `${s.color}30` : 'rgba(6,12,24,0.85)', border: `1px solid ${active ? s.color + '60' : 'rgba(255,255,255,0.1)'}`, color: active ? s.color : 'var(--text3)' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                {s.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Tooltip */}
      {hovered && <Tooltip marker={hovered} position={tooltipPos} />}

      {/* ── Bottom legend ── */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 16, marginTop: 16 }}
      >
        {(Object.entries(SECTORS) as [SectorKey, typeof SECTORS[SectorKey]][]).map(([key, s]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
            <span style={{ fontSize: 11, color: 'var(--text3)', fontFamily: 'monospace' }}>
              {s.label} ({MARKERS.filter(m => m.sector === key).length})
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
