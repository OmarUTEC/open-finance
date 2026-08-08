import { TrendingUp } from 'lucide-react'

const NAV_ITEMS = ['Explorer', 'Markets', 'About']

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50"
      style={{ background: 'rgba(8,13,23,0.88)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}>
            <TrendingUp size={14} strokeWidth={2.5} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-wide" style={{ color: 'var(--text1)' }}>
            Open<span className="gradient-text">Finance</span>
          </span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map(item => {
            const active = item === 'Explorer'
            return (
              <button
                key={item}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150"
                style={{
                  color: active ? '#f0f4ff' : 'var(--text3)',
                  background: active ? 'rgba(59,130,246,0.12)' : 'transparent',
                  border: active ? '1px solid rgba(59,130,246,0.22)' : '1px solid transparent',
                }}
              >
                {item}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
