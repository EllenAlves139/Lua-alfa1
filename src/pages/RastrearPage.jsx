import { useState } from 'react'
import { Search, Loader2 } from 'lucide-react'
import HelpLayout from '../components/layout/HelpLayout'
import toast from 'react-hot-toast'

export default function RastrearPage() {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!codigo.trim()) {
      toast.error('Digite o código de rastreio')
      return
    }
    setLoading(true)
    // Simulação de busca
    setTimeout(() => {
      setResultado({
        status: 'Em trânsito',
        data: '10/07/2026',
        localizacao: 'Centro de Distribuição - SP',
        historico: [
          { data: '05/07/2026', status: 'Pedido confirmado' },
          { data: '06/07/2026', status: 'Em produção' },
          { data: '08/07/2026', status: 'Despachado' },
          { data: '10/07/2026', status: 'Em trânsito - SP' },
        ]
      })
      setLoading(false)
      toast.success('Rastreio encontrado!')
    }, 1500)
  }

  return (
    <HelpLayout title="RASTREAR PEDIDO">
      <div className="space-y-6">
        <p className="text-white/60 text-sm">
          Digite o código de rastreio que você recebeu por e-mail para acompanhar o status do seu pedido.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Ex: LUA-2028-XXXX"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-gold py-3 px-6 flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            {loading ? 'Buscando...' : 'Rastrear'}
          </button>
        </form>

        {resultado && (
          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div>
                <p className="text-white font-bold">{resultado.status}</p>
                <p className="text-white/40 text-sm">{resultado.localizacao} • {resultado.data}</p>
              </div>
            </div>

            <div className="space-y-3">
              {resultado.historico.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5" />
                  <div>
                    <p className="text-white/70 text-sm">{item.status}</p>
                    <p className="text-white/30 text-xs">{item.data}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-dark-700/50 rounded-xl p-4">
          <p className="text-white/30 text-xs">
            Não encontrou seu pedido? Entre em contato pelo WhatsApp e nossa equipe irá ajudar.
          </p>
        </div>
      </div>
    </HelpLayout>
  )
}