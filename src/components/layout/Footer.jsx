import { Link } from 'react-router-dom'
import { Shirt, Instagram, MessageCircle, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
          <div>
            <img src="/favicon.png" alt="Logo" className="w-8" />
          </div>
              <span className="font-display text-2xl tracking-[0.15em]">
                CRIA<span className="text-gold-400">TTO</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Personalize sua camisa com designs prontos, sua própria arte ou nossa IA generativa. Qualidade premium, entrega rápida.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 rounded-full bg-dark-600 border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all text-white/50">
                <Instagram size={15} />
              </a>
              <a href="https://wa.me/32984521595" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-dark-600 border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all text-white/50">
                <MessageCircle size={15} />
              </a>
              <a href="mailto:criattor@gmail.com.br" className="w-9 h-9 rounded-full bg-dark-600 border border-white/10 flex items-center justify-center hover:border-gold-400 hover:text-gold-400 transition-all text-white/50">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-5">Navegação</p>
            <div className="flex flex-col gap-3">
              {[['/', 'Início'], ['/designs', 'Designs prontos'], ['/editor', 'Editor'], ['/contato', 'Contato']].map(([to, label]) => (
                <Link key={to} to={to} className="text-white/50 hover:text-gold-400 text-sm transition-colors">{label}</Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-5">Funcionalidades</p>
            <div className="flex flex-col gap-3">
              {['Designs prontos', 'Upload de arte', 'IA generativa', 'Simulador 3D'].map(item => (
                <span key={item} className="text-white/50 text-sm">{item}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-mono">© 2025 CRIATTO. Todos os direitos reservados.</p>
          <p className="text-white/20 text-xs">Feito com 🖤 no Brasil</p>
        </div>
      </div>
    </footer>
  )
}
