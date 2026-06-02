import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Filter } from 'lucide-react'
import { supabase } from '../lib/supabase'

const CATEGORIES = ['Todos', 'Urbano', 'Minimalista', 'Streetwear', 'Corporativo', 'Natureza', 'Retrô']

const FALLBACK_DESIGNS = [
  { id: '1', name: 'Urban Lines', category: 'Urbano', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80' },
  { id: '2', name: 'Minimal Logo', category: 'Minimalista', image_url: 'https://static.dafiti.com.br/p/Evoltenn-Camiseta-Basica-Milano-Moda-Urbana-Fashion-Logo-Minimalista-Off-White-7743-51213151-1-product.jpg' },
  { id: '3', name: 'Street Art', category: 'Streetwear', image_url: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQKY1WG4DALLGGncZJjsBaCaD7TjTe5HLDq1rn4j1LO4v0RpgonZDIgkF4PtvWyqiADejg8hTTSjGpfNuHbvstdPMCYez1gRQ' },
  { id: '4', name: 'Corporate Pro', category: 'Corporativo', image_url: 'https://www.berettadobrasil.com.br/media/tmp/webp/catalog/product/cache/1/image/800x/9df78eab33525d08d6e5fb8d27136e95/m/p/mp431_grey_1_jpg.webp' },
  { id: '5', name: 'Nature Vibes', category: 'Natureza', image_url: 'https://http2.mlstatic.com/D_NQ_NP_967813-MLB83900671468_042025-O-camisa-oversized-nature-psicodelic-good-vibes-masculino.webp' },
  { id: '6', name: 'Retro Wave', category: 'Retrô', image_url: 'https://r2.mont.ink/nmt/estampas/montink2.lojavirtualnuvem.com.br/Preto_51926970.png' },
  { id: '7', name: 'Dark Vibes', category: 'Urbano', image_url: 'https://blacknine.cdn.magazord.com.br/img/2024/06/produto/3802/frente-503ad331-23cf-4b71-aa33-0f1b4f3e2650.jpeg' },
  { id: '8', name: 'Clean Type', category: 'Minimalista', image_url: 'https://down-br.img.susercontent.com/file/br-11134207-81zu7-mky56anpbugz22' },
]

export default function DesignsPage() {
  const [designs, setDesigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('Todos')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error } = await supabase
        .from('designs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })

      if (error || !data || data.length === 0) {
        setDesigns(FALLBACK_DESIGNS)
      } else {
        setDesigns(data)
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = designs.filter(d => {
    const matchCat = category === 'Todos' || d.category === category
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Biblioteca</span>
          <h1 className="section-title mb-4">DESIGNS<br />PRONTOS</h1>
          <p className="section-subtitle max-w-md">
            Escolha um design profissional, personalize as cores e o tamanho, e leve para o editor.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Buscar design..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-dark-700 border border-white/10 rounded-full pl-11 pr-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-gold-400 text-dark-900'
                    : 'border border-white/10 text-white/50 hover:border-gold-400/40 hover:text-gold-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-dark-700 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filtered.map(d => (
              <DesignCard key={d.id} design={d} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-4 text-center py-20 text-white/30">
                <p className="font-display text-3xl tracking-wider mb-2">NENHUM DESIGN</p>
                <p className="text-sm">Tente outra categoria ou busca</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function DesignCard({ design }) {
  return (
    <Link
      to={`/editor?design=${design.id}`}
      className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-dark-700 hover:scale-[1.02] transition-transform duration-300 block"
    >
      <img
        src={design.image_url}
        alt={design.name}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-gold-400 text-xs font-mono uppercase tracking-widest">{design.category}</p>
        <p className="font-display text-lg tracking-wider mt-0.5 leading-tight">{design.name}</p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-gold-400 text-dark-900 rounded-full px-5 py-2 text-sm font-semibold flex items-center gap-2">
          Usar este <ArrowRight size={13} />
        </div>
      </div>
    </Link>
  )
}
