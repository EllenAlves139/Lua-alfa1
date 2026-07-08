import { useCartStore } from '../store/cartStore'
import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function CartDropdown({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore()
  const { user } = useAuth()
  const total = getTotalPrice()

  if (!isOpen) return null

  const handleCheckout = () => {
    // Se não estiver logado, pede login
    if (!user) {
      toast.error('Faça login para finalizar o pedido')
      onClose()
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('openAuthModal'))
      }, 300)
      return
    }
    // Redireciona para o checkout
    window.location.href = '/checkout'
  }

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-md bg-dark-800 border-l border-white/10 h-full flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="font-display text-2xl tracking-wider">SEU CARRINHO</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-white/40">
              <p className="font-display text-2xl mb-2">CARRINHO VAZIO</p>
              <p className="text-sm">Adicione produtos para começar</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-dark-700/50 rounded-xl p-3">
                <img src={item.img} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-gold-400 text-sm">{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-white/50 hover:text-gold-400 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm text-white/70 w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-white/50 hover:text-gold-400 transition-colors">
                      <Plus size={14} />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="ml-auto text-white/30 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/10 p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>TOTAL</span>
              <span className="text-gold-400">R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={clearCart} className="flex-1 text-white/50 text-sm hover:text-white/70 transition-colors">
                Limpar
              </button>
              <button onClick={handleCheckout} className="flex-1 btn-gold text-center py-2.5 text-sm">
                {user ? 'FINALIZAR PEDIDO' : 'FAZER LOGIN'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}