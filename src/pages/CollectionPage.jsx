import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

// Produtos da coleção 2028
const COLLECTION_PRODUCTS = [
  {
    id: 101,
    name: 'Nocturnal Alpha Jacket',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 249,90',
    img: '/imagens/2.png',
    badge: 'Coleção 2028'
  },
  {
    id: 102,
    name: 'Lunar Eclipse Tee',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 179,90',
    img: '/imagens/16.png',
    badge: 'Coleção 2028'
  },
  {
    id: 103,
    name: 'Urban Wolf Oversized',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 199,90',
    img: '/imagens/18.png',
    badge: 'Coleção 2028'
  },
  {
    id: 104,
    name: 'Alpha Basic Hoodie',
    category: 'Adultos',
    type: 'Sem Estampa',
    price: 'R$ 159,90',
    img: '/imagens/20.png',
    badge: 'Coleção 2028'
  },
  {
    id: 105,
    name: 'Nightshade Jacket',
    category: 'Adultos',
    type: 'Personalizáveis',
    price: 'R$ 299,90',
    img: '/imagens/24.png',
    badge: 'Coleção 2028'
  },
  {
    id: 106,
    name: 'Cosmic Bumblebotta',
    category: 'Adultos',
    type: 'Com Estampa',
    price: 'R$ 189,90',
    img: '/imagens/22.png',
    badge: 'Coleção 2028'
  },

  {
    id: 107,
     name: 'Lunar Eclipse Tee',
     category: 'Adultos',
     type: 'Com Estampa',
     price: 'R$ 179,90',
     img: '/imagens/23.png',
     badge: 'Coleção 2028'
   },

   {
     id: 108,
     name: 'Urban Wolf Oversized',
     category: 'Crianças',
     type: 'Com Estampa',
     price: 'R$ 149,90',
     img: '/imagens/15.png',
     badge: 'Coleção 2028'
   },

   {
     id: 109,
     name: 'Alpha Basic Hoodie',
     category: 'Adolescentes',
     type: 'Sem Estampa',
     price: 'R$ 159,90',
     img: '/imagens/14.png',
     badge: 'Coleção 2028'
   },

   {
     id: 110,
     name: 'Nightshade Jacket',
     category: 'Adolescentes',
     type: 'Personalizáveis',
     price: 'R$ 299,90',
     img: '/imagens/21.png',
     badge: 'Coleção 2028'
   },
]

export default function CollectionPage() {
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
        {/* Header da coleção */}
        <div className="mb-12 text-center">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Lançamento</span>
          <h1 className="font-display text-6xl md:text-7xl tracking-wider text-gold-400">
            NOVA COLEÇÃO 2028
          </h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mt-4">
            Feita para quem domina a cidade. Minimalismo com identidade forte e personalização única.
          </p>
          <div className="mt-6">
            <Link to="/designs" className="text-gold-400 hover:text-gold-300 transition-colors inline-flex items-center gap-2">
              Ver toda a coleção <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {COLLECTION_PRODUCTS.map(p => (
            <div key={p.id} className="group relative rounded-2xl overflow-hidden bg-dark-700 hover:scale-[1.02] transition-transform duration-300">
              <div className="aspect-[3/4] relative">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  loading="lazy"
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
                  <Link
                    to="/editor"
                    className="mt-2 inline-block w-full text-center bg-gold-400 text-dark-900 text-xs font-semibold py-2 rounded-full hover:bg-gold-300 transition-colors"
                  >
                    PERSONALIZAR AGORA
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA final */}
        <div className="mt-16 text-center">
          <Link to="/editor" className="btn-gold inline-flex items-center gap-2">
            Criar sua peça <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}