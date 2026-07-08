import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuth } from '../context/AuthContext'
import { ArrowLeft, ShoppingBag, User, Mail, Phone, MapPin } from 'lucide-react'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuth()
  const navigate = useNavigate()
  const total = getTotalPrice()

  const [customerName, setCustomerName] = useState(user?.user_metadata?.name || '')
  const [customerEmail, setCustomerEmail] = useState(user?.email || '')
  const [customerPhone, setCustomerPhone] = useState('')
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
          <h2 className="font-display text-3xl mb-2">CARRINHO VAZIO</h2>
          <p className="text-white/50 mb-6">Adicione produtos antes de finalizar.</p>
          <Link to="/designs" className="btn-gold">Ver produtos</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Monta mensagem para o WhatsApp
    const itemsList = items.map(item => 
      `${item.name} x${item.quantity} = R$ ${(parseFloat(item.price.replace('R$ ', '').replace(',', '.')) * item.quantity).toFixed(2)}`
    ).join('%0A')

    const message = 
      `*NOVO PEDIDO - LUA ALFA*%0A%0A` +
      `*CLIENTE*%0A` +
      `Nome: ${customerName}%0A` +
      `E-mail: ${customerEmail}%0A` +
      `WhatsApp: ${customerPhone || 'Não informado'}%0A` +
      `Endereço: ${address || 'Não informado'}%0A%0A` +
      `*ITENS DO CARRINHO*%0A${itemsList}%0A%0A` +
      `*TOTAL: R$ ${total.toFixed(2)}*`

    window.open(`https://wa.me/5532984521595?text=${message}`, '_blank')
    clearCart()
    setLoading(false)
    toast.success('Pedido enviado para o WhatsApp!')
    navigate('/')
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        <Link to="/designs" className="inline-flex items-center gap-2 text-white/40 hover:text-gold-400 transition-colors mb-6">
          <ArrowLeft size={16} /> Voltar para loja
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Resumo do pedido */}
          <div className="glass-card p-6">
            <h2 className="font-display text-2xl tracking-wider mb-4">SEU PEDIDO</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 border-b border-white/5 pb-3">
                  <img src={item.img} alt={item.name} className="w-12 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-gold-400 text-sm">{item.price}</p>
                    <p className="text-white/30 text-xs">Qtd: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-bold">
              <span>TOTAL</span>
              <span className="text-gold-400 text-xl">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Formulário de dados */}
          <div className="glass-card p-6">
            <h2 className="font-display text-2xl tracking-wider mb-4">DADOS DO PEDIDO</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">Nome completo</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">E-mail</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">WhatsApp</label>
                <div className="relative">
                  <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="(31) 9 9999-9999"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/30 text-xs font-mono uppercase tracking-widest block mb-1">Endereço (opcional)</label>
                <div className="relative">
                  <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Rua, número, bairro, cidade"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold flex items-center justify-center gap-2 py-3.5 disabled:opacity-50"
              >
                {loading ? 'Enviando...' : 'FINALIZAR PEDIDO'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}