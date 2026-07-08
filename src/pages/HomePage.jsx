import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Upload, LayoutGrid, Star, Shield, Truck, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

// ════════════════════════════════════════════════════════════════════
// CARDS DE DESTAQUE (PEÇAS SELECIONADAS) – IMAGENS ATUALIZADAS
// ════════════════════════════════════════════════════════════════════
const DESTAQUES = [
  { 
    id: 1, 
    name: 'LOBO NOTURNO OVERSIZED', 
    price: 'R$ 189,90', 
    img: '/imagens/aduto.png'          // NOVA IMAGEM
  },
  { 
    id: 2, 
    name: 'COSMICAL BUMBLEBOTTA AZUL', 
    price: 'R$ 129,90', 
    img: '/imagens/adolesente.png'     // NOVA IMAGEM
  },
  { 
    id: 3, 
    name: 'PINK BASE MOTUARDO', 
    price: 'R$ 299,90', 
    img: '/imagens/crianca.png'        // NOVA IMAGEM
  },
  { 
    id: 4, 
    name: 'NOVA CAMISETA', 
    price: 'R$ 149,90', 
    img: '/imagens/aduto (10).png'     // NOVA IMAGEM
  },
]

// ════════════════════════════════════════════════════════════════════
// IMAGENS DO CARROSSEL (já atualizadas por você)
// ════════════════════════════════════════════════════════════════════
const CARROSSEL_IMAGENS = [
  '/imagens/aduto.png',
  '/imagens/adolesente.png',
  '/imagens/crianca.png',
  '/imagens/aduto (10).png',
  '/imagens/crianca (4).png',
  '/imagens/adolesente (15).png',
  '/imagens/aduto (9).png',
]

const PERKS = [
  { icon: <Zap size={18} />, label: 'Entrega rápida' },
  { icon: <Shield size={18} />, label: 'Qualidade garantida' },
  { icon: <Truck size={18} />, label: 'Envio para todo Brasil' },
  { icon: <Star size={18} />, label: '4.9 / 5 estrelas' },
]

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % CARROSSEL_IMAGENS.length)
        setTimeout(() => {
          setIsTransitioning(false)
        }, 50)
      }, 400)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentImage = CARROSSEL_IMAGENS[currentIndex]
  const nextIndex = (currentIndex + 1) % CARROSSEL_IMAGENS.length
  const nextImage = CARROSSEL_IMAGENS[nextIndex]

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <div className="animate-fade-up">
            <h1 className="font-display text-7xl md:text-8xl xl:text-9xl leading-[0.9] tracking-wider mb-4">
              VISTA SUA<br />
              <span className="shimmer-gold">ESSÊNCIA</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
              Desperte sua alfa. Personalize sua camisa com estilo urbano e tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/editor" className="btn-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-7 animate-glow-pulse">
                PERSONALIZAR AGORA <ArrowRight size={16} />
              </Link>
              <Link to="/designs" className="btn-outline-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-7">
                VER COLEÇÃO
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              {PERKS.map(p => (
                <div key={p.label} className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-gold-400">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* ── CARROSSEL ── */}
          <div className="relative flex justify-center animate-float">
            <div className="relative w-72 h-80 md:w-80 md:h-96">
              {/* Imagem atual */}
              <div
                className={`absolute inset-0 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-opacity duration-400 ease-in-out ${
                  isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
              >
                <img
                  src={currentImage}
                  alt="Personalização"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-gold-400 text-xs font-mono">Coleção 2028</p>
                </div>
              </div>

              {/* Imagem seguinte */}
              <div
                className={`absolute inset-0 rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-opacity duration-400 ease-in-out ${
                  isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <img
                  src={nextImage}
                  alt="Personalização"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-gold-400 text-xs font-mono">Coleção 2028</p>
                </div>
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {CARROSSEL_IMAGENS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (idx !== currentIndex) {
                        setIsTransitioning(true)
                        setTimeout(() => {
                          setCurrentIndex(idx)
                          setTimeout(() => setIsTransitioning(false), 50)
                        }, 400)
                      }
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-gold-400 w-6'
                        : 'bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Ir para imagem ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTAQUES DO MÊS (PEÇAS SELECIONADAS) ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-2">Destaques do Mês</span>
              <h2 className="font-display text-5xl md:text-6xl tracking-wider">PEÇAS SELECIONADAS</h2>
            </div>
            <Link to="/designs" className="text-gold-400 text-sm flex items-center gap-1 hover:gap-2 transition-all">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          {/* Grid dos cards com as NOVAS IMAGENS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {DESTAQUES.map((item) => (
              <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-dark-700 hover:scale-[1.02] transition-transform duration-300">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-display text-xl leading-tight">{item.name}</p>
                  <p className="text-gold-400 font-body font-semibold text-lg">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAL LUA ALFA ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(#00A3FF 1px, transparent 1px), linear-gradient(90deg, #00A3FF 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Diferencial LUA ALFA</span>
              <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-6">
                CRIE SEU<br />PRÓPRIO ESTILO.
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Aqui, você não veste apenas roupas — você expressa quem é. Escolha um design da nossa curadoria ou crie o seu com acabamento premium.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                    <LayoutGrid size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl tracking-wider">CURADORIA ALFA</h4>
                    <p className="text-white/40 text-sm">Acesso a artes exclusivas criadas por artistas digitais independentes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                    <Upload size={18} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl tracking-wider">UPLOAD DE IDENTIDADE</h4>
                    <p className="text-white/40 text-sm">Envie sua logo ou estampa e deixe nossa engenharia fazer a mágica.</p>
                  </div>
                </div>
              </div>
              <Link to="/editor" className="btn-gold inline-flex items-center gap-2 mt-10">
                COMEÇAR PERSONALIZAÇÃO <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-dark-700 border border-white/10 overflow-hidden">
                <img
                  src="/imagens/minha-foto.png"
                  alt="Personalização"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card px-6 py-4">
                <p className="text-gold-400 font-mono text-sm">+500 clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-16 bg-dark-800 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card p-12 md:p-16 border-gold-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-400/3" />
            <div className="relative">
              <h2 className="font-display text-4xl md:text-5xl tracking-wider mb-4">
                RECEBA AS NOVIDADES<br />
                <span className="text-gold-400">LUA ALFA</span>
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto">
                Cadastre-se e receba lançamentos exclusivos em primeira mão.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 bg-dark-600 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50"
                />
                <button className="btn-gold py-3 px-6 text-sm">CADASTRAR</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}