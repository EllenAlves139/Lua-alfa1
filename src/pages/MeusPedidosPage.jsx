import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { Loader2 } from 'lucide-react'

export default function MeusPedidosPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao buscar pedidos:', error)
      } else {
        setOrders(data || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg">Você precisa estar logado para ver seus pedidos.</p>
          <Link to="/" className="btn-gold inline-block mt-6">Voltar ao início</Link>
        </div>
      </div>
    )
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
        <h1 className="font-display text-5xl tracking-wider mb-8">MEUS PEDIDOS</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-gold-400" size={40} />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="font-display text-3xl">NENHUM PEDIDO</p>
            <p className="text-sm mt-2">Você ainda não fez nenhum pedido.</p>
            <Link to="/designs" className="btn-gold inline-block mt-6">Explorar loja</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="glass-card p-6">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <p className="text-white/40 text-xs font-mono uppercase tracking-widest">Pedido #{order.id.slice(0, 8)}</p>
                    <p className="text-white/60 text-sm mt-1">{new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    order.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                    order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'delivered' ? 'bg-gold-400/20 text-gold-400' :
                    'bg-white/10 text-white/40'
                  }`}>
                    {order.status === 'pending' ? 'Aguardando' :
                     order.status === 'approved' ? 'Aprovado' :
                     order.status === 'shipped' ? 'Enviado' :
                     order.status === 'delivered' ? 'Entregue' : order.status}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-white/50">
                  <p><span className="text-white/30">Modelo:</span> {order.design_data?.model || '-'}</p>
                  <p><span className="text-white/30">Cor:</span> {order.shirt_color}</p>
                  <p><span className="text-white/30">Tamanho:</span> {order.shirt_size}</p>
                  <p><span className="text-white/30">Total:</span> <span className="text-gold-400">R$ {order.total_price?.toFixed(2) || '59,90'}</span></p>
                </div>
                {order.design_data?.art && (
                  <div className="mt-3">
                    <img src={order.design_data.art} alt="Arte do pedido" className="h-16 w-16 object-cover rounded-lg" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}