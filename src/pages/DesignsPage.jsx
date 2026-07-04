import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

// Produtos (mesmos dados)
const PRODUCTS = [
  {
    id: 1,
    name: 'Luna Core Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 149,90',
    img: '/imagens/24.png',
    badge: 'Personalizável'
  },
  {
    id: 2,
    name: 'Vector Alpha Tee',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 159,90',
    img: '/imagens/10.png',
    badge: 'Personalizável'
  },
  {
    id: 3,
    name: 'Pure Light Basic',
    category: 'Adultos',
    type: 'Sem Estampa',
    price: 'R$ 79,90',
    img: '/imagens/14.png'
  },
  {
    id: 4,
    name: 'Urban Wolf Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 139,90',
    img: '/imagens/16.png'
  },
  {
    id: 5,
    name: 'Alpha Basic Black',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 79,90',
    img: '/imagens/12.png'
  },
  {
    id: 6,
    name: 'Nocturnal Alpha Jacket',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 249,90',
    img: '/imagens/11.png'
  },
  {
    id: 7,
    name: 'Street Graphic',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 119,80',
    img: '/imagens/17.png'
  },
  {
    id: 8,
    name: 'Nightshade Hood',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 129,90',
    img: '/imagens/19.png'
  },
  {
    id: 9,
    name: 'Core Heart Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 149,90',
    img: '/imagens/18.png'
  },
  {
    id: 10,
    name: 'Urban Wolf Special',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 139,90',
    img: '/imagens/20.png'
  },
  {
    id: 11,
    name: 'Flamengo Edition',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 159,90',
    img: '/imagens/22.png'
  },
]

const CATEGORIES = ['Todas as Camisetas', 'Adultos', 'Adolescentes', 'Crianças']
const TYPES = ['Com Estampa', 'Sem Estampa (Básicas)', 'Personalizáveis']

export default function DesignsPage() {
  const [category, setCategory] = useState('Todas as Camisetas')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [search, setSearch] = useState('')

  // Filtragem
  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'Todas as Camisetas' || p.category === category
    const matchType = selectedTypes.length === 0 || selectedTypes.includes(p.type)
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchType && matchSearch
  })

  const getCount = (cat) => {
    if (cat === 'Todas as Camisetas') return PRODUCTS.length
    return PRODUCTS.filter(p => p.category === cat).length
  }

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <span className="text-white/30 text-xs font-mono tracking-widest uppercase">LUA ALFA / <span className="text-gold-400">LOJA</span></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ─── SIDEBAR ESQUERDA ─── */}
          <div className="lg:col-span-1 space-y-8">
            {/* Título */}
            <h1 className="font-display text-4xl tracking-wider">LOJA</h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Explore nossa coleção completa. Encontre a peça perfeita para expressar sua essência.
            </p>

            {/* Catálogo */}
            <div>
              <h3 className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Catálogo</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`block w-full text-left text-sm transition-all ${
                      category === cat
                        ? 'text-gold-400 font-medium'
                        : 'text-white/50 hover:text-white/70'
                    }`}
                  >
                    {cat} <span className="text-white/20 text-xs">({getCount(cat)})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo */}
            <div>
              <h3 className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Tipo</h3>
              <div className="space-y-2">
                {TYPES.map(type => (
                  <label key={type} className="flex items-center gap-2 text-sm text-white/50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="w-4 h-4 rounded border-white/20 bg-dark-600 text-gold-400 focus:ring-gold-400 focus:ring-offset-0"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Barra de pesquisa com botão limpar */}
            <div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-dark-700 border border-white/10 rounded-full pl-9 pr-10 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Banner DROP DA TEMPORADA */}
            <div className="border-t border-white/5 pt-6">
              <span className="text-white/20 text-xs font-mono uppercase tracking-widest block">DOP DA TEMPORADA</span>
              <h4 className="font-display text-2xl tracking-wider text-gold-400 mt-1">
                NOCTURNAL ALFA
              </h4>
              <p className="text-white/30 text-xs leading-relaxed mt-1">
                Feita para quem domina a cidade. Minimalismo com identidade forte e personalização única.
              </p>
            </div>

            {/* Contador */}
            <div className="border-t border-white/5 pt-6">
              <span className="text-white/40 text-sm font-mono">Mostrando {filtered.length} produtos</span>
            </div>
          </div>

          {/* ─── GRADE DE PRODUTOS (DIREITA) ─── */}
          <div className="lg:col-span-3">
            {filtered.some(p => p.badge) && (
              <div className="mb-4">
                <span className="text-gold-400 text-xs font-mono border border-gold-400/20 rounded-full px-3 py-1">
                  Personalizável
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map(p => (
                <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-dark-700 hover:scale-[1.02] transition-transform duration-300">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 bg-gold-400 text-dark-900 text-[10px] font-mono px-2 py-0.5 rounded-full">
                        {p.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{p.category} - {p.type}</p>
                      <p className="text-white font-display text-lg leading-tight">{p.name}</p>
                      <p className="text-gold-400 font-body font-bold text-lg">{p.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-white/30">
                <p className="font-display text-3xl">NENHUM PRODUTO</p>
                <p className="text-sm">Tente outros filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}