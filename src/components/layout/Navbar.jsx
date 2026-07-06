import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'INÍCIO', to: '/' },
  { label: 'LOJA', to: '/designs' },
  { label: 'PERSONALIZAR', to: '/editor' },
  { label: 'SUPORTE', to: '/contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="/logo.png" 
            alt="LUA ALFA" 
            className="w-14 h-14 object-contain" 
          />
          <span className="font-display text-2xl tracking-[0.15em] text-white">
            LUA <span className="text-gold-400">ALFA</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link ${pathname === l.to ? 'text-gold-400' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link 
            to="/colecao-2028" 
            className="text-gold-400 text-xs font-mono border border-gold-400/30 rounded-full px-3 py-1 hover:bg-gold-400/10 transition-colors"
          >
            NOVA COLEÇÃO 2028
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/editor" className="btn-gold text-sm py-2 px-5">
            PERSONALIZAR AGORA
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-gold-400 transition-colors"
          onClick={() => setOpen(o => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-900/98 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link text-base py-2 ${
                pathname === l.to ? 'text-gold-400 border-l-2 border-gold-400 pl-3' : 'text-white/70 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/colecao-2028" className="text-gold-400 text-sm font-mono border border-gold-400/30 rounded-full px-3 py-1 text-center hover:bg-gold-400/10 transition-colors">
            NOVA COLEÇÃO 2028
          </Link>
          <Link to="/editor" className="btn-gold text-center mt-2 py-3">
            PERSONALIZAR AGORA
          </Link>
        </div>
      )}
    </nav>
  )
}