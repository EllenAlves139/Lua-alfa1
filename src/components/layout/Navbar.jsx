import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shirt } from 'lucide-react'

const links = [
  { label: 'Início', to: '/' },
  { label: 'Designs', to: '/designs' },
  { label: 'Editor', to: '/editor' },
  { label: 'Contato', to: '/contato' },
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
        <Link to="/favicon.png" className="flex items-center gap-2 group">
          <div>
            <img src="/favicon.png" alt="Logo" className="w-8" />
          </div>
          <span className="font-display text-2xl tracking-[0.15em] text-white">
            CRIA<span className="text-gold-400">TTO</span>
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
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/editor" className="btn-gold text-sm py-2 px-5">
            Criar agora
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
        <div className="md:hidden bg-dark-800 border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`nav-link text-base ${pathname === l.to ? 'text-gold-400' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link to="/editor" className="btn-gold text-center mt-2">
            Criar agora
          </Link>
        </div>
      )}
    </nav>
  )
}
