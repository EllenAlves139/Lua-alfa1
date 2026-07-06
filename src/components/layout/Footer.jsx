import { Link } from 'react-router-dom'
import { Instagram, MessageCircle, Mail, Shield, Truck, Star } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="LUA ALFA" 
                className="w-14 h-14 object-contain" 
              />
              <span className="font-display text-2xl tracking-[0.15em]">LUA <span className="text-gold-400">ALFA</span></span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Nascemos da energia noturna. Unimos streetwear, tecnologia e personalização para quem vive a cidade depois do sol se pôr.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-gold-400 transition-colors"><Instagram size={18} /></a>
              <a href="https://wa.me/5531999999999" target="_blank" rel="noreferrer" className="text-white/40 hover:text-gold-400 transition-colors"><MessageCircle size={18} /></a>
              <a href="mailto:contato@luaalfa.com.br" className="text-white/40 hover:text-gold-400 transition-colors"><Mail size={18} /></a>
            </div>
          </div>

          {/* Loja */}
          <div>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-5">Loja</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/designs" className="text-white/50 hover:text-gold-400">Catálogo Completo</Link></li>
              <li><Link to="/designs?cat=Adultos" className="text-white/50 hover:text-gold-400">Adultos</Link></li>
              <li><Link to="/designs?cat=Adolescentes" className="text-white/50 hover:text-gold-400">Adolescentes</Link></li>
              <li><Link to="/designs?cat=Crianças" className="text-white/50 hover:text-gold-400">Crianças</Link></li>
              <li><Link to="/editor" className="text-white/50 hover:text-gold-400">Personalizar</Link></li>
            </ul>
          </div>

          {/* Ajuda */}
          <div>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-5">Ajuda & Suporte</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contato" className="text-white/50 hover:text-gold-400">Central de Ajuda</Link></li>
              <li><span className="text-white/50">Como Comprar</span></li>
              <li><span className="text-white/50">Trocas e Devoluções</span></li>
              <li><span className="text-white/50">Guia de Tamanhos</span></li>
              <li><span className="text-white/50">Rastrear Pedido</span></li>
              <li><Link to="/contato" className="text-white/50 hover:text-gold-400">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contato & Pagamento */}
          <div>
            <p className="text-white/20 text-xs font-mono uppercase tracking-widest mb-5">Contato & Pagamento</p>
            <ul className="space-y-2 text-sm text-white/50">
              <li>contato@luaalfa.com.br</li>
              <li>(31) 9 9999-9999</li>
              <li className="text-white/30 text-xs">Seg - Sex: 9h às 18h</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs bg-dark-600 px-3 py-1 rounded-full text-white/50">PIX</span>
              <span className="text-xs bg-dark-600 px-3 py-1 rounded-full text-white/50">Cartão</span>
              <span className="text-xs bg-dark-600 px-3 py-1 rounded-full text-white/50">Boleto</span>
              <span className="text-xs bg-dark-600 px-3 py-1 rounded-full text-white/50">PayPal</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-white/30 text-xs">
              <span className="flex items-center gap-1"><Shield size={14} /> Compra Segura</span>
              <span className="flex items-center gap-1"><Truck size={14} /> Entrega Rápida</span>
              <span className="flex items-center gap-1"><Star size={14} /> Trocas Grátis</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs font-mono">© 2026 LUA ALFA. PROJETADO PARA A VIDA NOTURNA. CNPJ: 00.000.000/0001-00</p>
          <p className="text-white/20 text-xs">criado por E&T. ELLEN E THAISON</p>
        </div>
      </div>
    </footer>
  )
}