import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, ShoppingCart, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCartStore } from '../store/cartStore'

// ════════════════════════════════════════════════════════════════════
// PRODUTOS COM AS NOVAS IMAGENS (ADULTO, ADOLESCENTE, CRIANÇA)
// ════════════════════════════════════════════════════════════════════
const PRODUCTS = [
  // ── ADULTOS ──
  {
    id: 1,
    name: 'Luna Core Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 149,90',
    img: '/imagens/aduto.png'
  },
  {
    id: 2,
    name: 'Vector Alpha Tee',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 159,90',
    img: '/imagens/aduto (3).png'
  },
  {
    id: 3,
    name: 'Pure Light Basic',
    category: 'Adultos',
    type: 'Sem Estampa',
    price: 'R$ 79,90',
    img: '/imagens/aduto (5).png'
  },
  {
    id: 4,
    name: 'Urban Wolf Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 139,90',
    img: '/imagens/aduto (6).png'
  },
  {
    id: 5,
    name: 'Nightshade Hoodie',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 229,90',
    img: '/imagens/aduto (7).png'
  },
  {
    id: 6,
    name: 'Classic Black Tee',
    category: 'Adultos',
    type: 'Sem Estampa',
    price: 'R$ 69,90',
    img: '/imagens/aduto (8).png'
  },
  {
    id: 7,
    name: 'Nocturnal Jacket',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 299,90',
    img: '/imagens/aduto (9).png'
  },
  {
    id: 8,
    name: 'Cosmic Bumblebotta',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 189,90',
    img: '/imagens/aduto (10).png'
  },
  {
    id: 9,
    name: 'Lunar Eclipse Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 179,90',
    img: '/imagens/aduto (11).png'
  },

  // ── ADOLESCENTES ──
  {
    id: 10,
    name: 'Alpha Basic Hoodie',
    category: 'Adolescentes',
    type: 'Sem Estampa',
    price: 'R$ 149,90',
    img: '/imagens/adolesente.png'
  },
  {
    id: 11,
    name: 'Urban Wolf Oversized',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 159,90',
    img: '/imagens/adolesente (6).png'
  },
  {
    id: 12,
    name: 'Neon Light Tee',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 129,90',
    img: '/imagens/adolesente (9).png'
  },
  {
    id: 13,
    name: 'Street Style Hoodie',
    category: 'Adolescentes',
    type: 'Personalizáveis',
    price: 'R$ 199,90',
    img: '/imagens/adolesente (10).png'
  },
  {
    id: 14,
    name: 'Basic Cotton Tee',
    category: 'Adolescentes',
    type: 'Sem Estampa',
    price: 'R$ 59,90',
    img: '/imagens/adolesente (11).png'
  },
  {
    id: 15,
    name: 'Skater Mesh Tee',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 109,90',
    img: '/imagens/adolesente (12).png'
  },
  {
    id: 16,
    name: 'Graffiti Hoodie',
    category: 'Adolescentes',
    type: 'Personalizáveis',
    price: 'R$ 189,90',
    img: '/imagens/adolesente (13).png'
  },
  {
    id: 17,
    name: 'Retro Wave Tee',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 139,90',
    img: '/imagens/adolesente (14).png'
  },
  {
    id: 18,
    name: 'Winter Warm Hoodie',
    category: 'Adolescentes',
    type: 'Sem Estampa',
    price: 'R$ 169,90',
    img: '/imagens/adolesente (15).png'
  },
  {
    id: 19,
    name: 'Sporty Crewneck',
    category: 'Adolescentes',
    type: 'Personalizáveis',
    price: 'R$ 159,90',
    img: '/imagens/adolesente (16).png'
  },
  {
    id: 20,
    name: 'Bold Graphic Tee',
    category: 'Adolescentes',
    type: 'Com Estampa',
    price: 'R$ 119,90',
    img: '/imagens/adolesente (17).png'
  },

  // ── CRIANÇAS ──
  {
    id: 21,
    name: 'Mini Wolf Tee',
    category: 'Crianças',
    type: 'Com Estampa',
    price: 'R$ 89,90',
    img: '/imagens/crianca.png'
  },
  {
    id: 22,
    name: 'Happy Bear Hoodie',
    category: 'Crianças',
    type: 'Sem Estampa',
    price: 'R$ 129,90',
    img: '/imagens/crianca (2).png'
  },
  {
    id: 23,
    name: 'Rainbow Basic Tee',
    category: 'Crianças',
    type: 'Sem Estampa',
    price: 'R$ 49,90',
    img: '/imagens/crianca (3).png'
  },
  {
    id: 24,
    name: 'Dino Adventure Tee',
    category: 'Crianças',
    type: 'Com Estampa',
    price: 'R$ 99,90',
    img: '/imagens/crianca (4).png'
  },
  {
    id: 25,
    name: 'Star Rider Hoodie',
    category: 'Crianças',
    type: 'Personalizáveis',
    price: 'R$ 149,90',
    img: '/imagens/crianca (5).png'
  },
  {
    id: 26,
    name: 'Animal Print Tee',
    category: 'Crianças',
    type: 'Com Estampa',
    price: 'R$ 79,90',
    img: '/imagens/crianca (6).png'
  },
  {
    id: 27,
    name: 'Cozy Fleece Hoodie',
    category: 'Crianças',
    type: 'Sem Estampa',
    price: 'R$ 119,90',
    img: '/imagens/crianca (7).png'
  },
  {
    id: 28,
    name: 'Space Explorer Tee',
    category: 'Crianças',
    type: 'Com Estampa',
    price: 'R$ 89,90',
    img: '/imagens/crianca (8).png'
  },
  {
    id: 29,
    name: 'Cute Monster Hoodie',
    category: 'Crianças',
    type: 'Personalizáveis',
    price: 'R$ 139,90',
    img: '/imagens/crianca (9).png'
  },
  
  
]

const CATEGORIES = ['Todas as Camisetas', 'Adultos', 'Adolescentes', 'Crianças']
const TYPES = ['Com Estampa', 'Sem Estampa (Básicas)', 'Personalizáveis']

const WHATSAPP_NUMBER = '5532984521595'

export default function DesignsPage() {
  const [category, setCategory] = useState('Todas as Camisetas')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [search, setSearch] = useState('')
  const addItem = useCartStore((state) => state.addItem)

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
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const handleAddToCart = (product) => {
    addItem(product)
    toast.success(`${product.name} adicionado ao carrinho!`)
  }

  const handleBuyNow = (product) => {
    const message = `Olá! Gostaria de comprar o produto *${product.name}*.%0A%0A` +
      `• Categoria: ${product.category}%0A` +
      `• Tipo: ${product.type}%0A` +
      `• Preço: ${product.price}%0A%0A` +
      `Quero finalizar a compra.`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-hidden">
      {/* Fundo azul */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <span className="text-white/30 text-xs font-mono tracking-widest uppercase">LUA ALFA / <span className="text-gold-400">LOJA</span></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── SIDEBAR ── */}
          <div className="lg:col-span-1 space-y-8">
            <h1 className="font-display text-4xl tracking-wider">LOJA</h1>
            <p className="text-white/40 text-sm leading-relaxed">
              Explore nossa coleção completa. Encontre a peça perfeita para expressar sua essência.
            </p>

            <div>
              <h3 className="text-white/30 text-xs font-mono uppercase tracking-widest mb-3">Catálogo</h3>
              <div className="space-y-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`block w-full text-left text-sm transition-all ${
                      category === cat ? 'text-gold-400 font-medium' : 'text-white/50 hover:text-white/70'
                    }`}
                  >
                    {cat} <span className="text-white/20 text-xs">({getCount(cat)})</span>
                  </button>
                ))}
              </div>
            </div>

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
                <button
                  onClick={() => {
                    setSelectedTypes([])
                    setCategory('Todas as Camisetas')
                    setSearch('')
                  }}
                  className="mt-3 text-xs text-white/30 hover:text-gold-400 transition-colors flex items-center gap-1"
                >
                  <span>✕</span> Limpar filtros
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-dark-700 border border-white/10 rounded-full pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>

            <div className="border-t border-white/5 pt-6">
              <span className="text-white/20 text-xs font-mono uppercase tracking-widest block">DROP DA TEMPORADA</span>
              <h4 className="font-display text-2xl tracking-wider text-gold-400 mt-1">NOCTURNAL ALFA</h4>
              <p className="text-white/30 text-xs leading-relaxed mt-1">
                Feita para quem domina a cidade. Minimalismo com identidade forte e personalização única.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6">
              <span className="text-white/40 text-sm font-mono">Mostrando {filtered.length} produtos</span>
            </div>
          </div>

          {/* ── GRID DE PRODUTOS ── */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map(p => (
                <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-dark-700 hover:scale-[1.02] transition-transform duration-300">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{p.category} - {p.type}</p>
                      <p className="text-white font-display text-lg leading-tight">{p.name}</p>
                      <p className="text-gold-400 font-body font-bold text-lg">{p.price}</p>

                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="flex-1 flex items-center justify-center gap-1 bg-gold-400 text-dark-900 text-xs font-semibold py-2 rounded-full hover:bg-gold-300 transition-colors"
                        >
                          <ShoppingCart size={14} /> Adicionar
                        </button>
                        <button
                          onClick={() => handleBuyNow(p)}
                          className="flex-1 flex items-center justify-center gap-1 border border-gold-400 text-gold-400 text-xs font-semibold py-2 rounded-full hover:bg-gold-400 hover:text-dark-900 transition-colors"
                        >
                          <ShoppingBag size={14} /> Comprar
                        </button>
                      </div>
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