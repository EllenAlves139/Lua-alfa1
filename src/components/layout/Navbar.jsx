// Seu Navbar.jsx completo com a adição

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '../../store/cartStore'
import { useAuth } from '../../context/AuthContext'
import CartDropdown from '../CartDropdown'
import AuthModal from '../AuthModal'

const links = [
  { label: 'INÍCIO', to: '/' },
  { label: 'LOJA', to: '/designs' },
  { label: 'PERSONALIZAR', to: '/editor' },
  { label: 'SUPORTE', to: '/contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const totalItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // 👇 ADICIONE ESTE useEffect AQUI (logo após o de scroll)
  useEffect(() => {
    const handleOpenAuth = () => setAuthOpen(true)
    document.addEventListener('openAuthModal', handleOpenAuth)
    return () => document.removeEventListener('openAuthModal', handleOpenAuth)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="LUA ALFA" className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform group-hover:scale-105" />
            <span className="font-display text-3xl md:text-4xl tracking-[0.15em] text-white">
              LUA <span className="text-gold-400">ALFA</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`nav-link ${pathname === l.to ? 'text-gold-400' : ''}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/colecao-2028" className="text-gold-400 text-xs font-mono border border-gold-400/30 rounded-full px-3 py-1 hover:bg-gold-400/10 transition-colors">
              NOVA COLEÇÃO 2028
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/meus-pedidos" className="text-white/60 hover:text-gold-400 transition-colors text-sm flex items-center gap-1">
                  <User size={16} /> Pedidos
                </Link>
                <button onClick={signOut} className="text-white/40 hover:text-red-400 transition-colors text-sm">
                  Sair
                </button>
              </>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="text-white/60 hover:text-gold-400 transition-colors text-sm flex items-center gap-1">
                <User size={16} /> Entrar
              </button>
            )}

            <Link to="/editor" className="btn-gold text-sm py-2 px-5">
              PERSONALIZAR
            </Link>

            <button onClick={() => setCartOpen(!cartOpen)} className="relative text-white/70 hover:text-gold-400 transition-colors p-2">
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-400 text-dark-900 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          <button className="md:hidden text-white/70 hover:text-gold-400 transition-colors" onClick={() => setOpen(o => !o)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-dark-900/98 backdrop-blur-lg border-t border-white/10 px-6 py-6 flex flex-col gap-5">
            {links.map(l => (
              <Link key={l.to} to={l.to} className={`nav-link text-base py-2 ${pathname === l.to ? 'text-gold-400 border-l-2 border-gold-400 pl-3' : 'text-white/70 hover:text-white'}`}>
                {l.label}
              </Link>
            ))}
            <Link to="/colecao-2028" className="text-gold-400 text-sm font-mono border border-gold-400/30 rounded-full px-3 py-1 text-center hover:bg-gold-400/10 transition-colors">
              NOVA COLEÇÃO 2028
            </Link>
            {user ? (
              <>
                <Link to="/meus-pedidos" className="text-white/60 hover:text-gold-400 transition-colors text-sm text-center py-1">Meus Pedidos</Link>
                <button onClick={signOut} className="text-white/40 hover:text-red-400 transition-colors text-sm text-center py-1">Sair</button>
              </>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="text-white/60 hover:text-gold-400 transition-colors text-sm text-center py-1">Entrar / Criar conta</button>
            )}
            <Link to="/editor" className="btn-gold text-center mt-2 py-3">PERSONALIZAR</Link>
          </div>
        )}
      </nav>

      <CartDropdown isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}