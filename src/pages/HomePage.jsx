import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, Upload, LayoutGrid, Star, Zap, Shield, Truck } from 'lucide-react'

const SHIRT_COLORS = ['#FFFFFF', '#1a1a1a', '#2563EB', '#DC2626', '#16A34A', '#9333EA', '#EA580C', '#FFD700']

const SAMPLES = [
  { title: 'Urban Lines', cat: 'Urbano', img: 'https://dcdn-us.mitiendanube.com/stores/003/813/597/products/0c04d6874967e699d349dfb75e2353eb-7dba7fa03007d9dfa417547400679273-1024-1024.webp', color: 'from-blue-900/40' },
  { title: 'Minimal Logo', cat: 'Minimalista', img: 'https://cdn.awsli.com.br/2500x2500/1862/1862618/produto/105350821/25589c1883.jpg', color: 'from-zinc-900/40' },
  { title: 'Street Art', cat: 'Streetwear', img: 'https://cdn.awsli.com.br/2500x2500/505/505314/produto/140374809/2854ee727a.jpg', color: 'from-purple-900/40' },
  { title: 'Corporate Pro', cat: 'Corporativo', img: 'https://acdn-us.mitiendanube.com/stores/006/722/546/products/camiseta-pima-1420c5d6a77d8ffdbd17643280528489-480-0.webp', color: 'from-emerald-900/40' },
]

const FEATURES = [
  {
    icon: <LayoutGrid size={22} />,
    title: 'Designs Prontos',
    desc: 'Centenas de artes profissionais organizadas por categoria. Escolha, personalize as cores e peça.',
  },
  {
    icon: <Upload size={22} />,
    title: 'Sua Própria Arte',
    desc: 'Faça upload da sua estampa em PNG, JPG ou SVG. Posicione onde quiser e visualize em tempo real.',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'IA Generativa',
    desc: 'Escolha um estilo e elementos, e nossa IA cria uma arte exclusiva para você em segundos.',
  },
]

const PERKS = [
  { icon: <Zap size={18} />, label: 'Entrega rápida' },
  { icon: <Shield size={18} />, label: 'Qualidade garantida' },
  { icon: <Truck size={18} />, label: 'Envio para todo Brasil' },
  { icon: <Star size={18} />, label: 'Mais de 500 avaliações 5★' },
]

const TESTIMONIALS = [
  { name: 'Mariana S.', role: 'Designer', text: 'A qualidade é incrível! Usei o editor de IA e ficou exatamente como imaginei. Recomendo muito.', rating: 5 },
  { name: 'Carlos R.', role: 'Empresário', text: 'Fiz as camisas para minha equipe usando os designs corporativos. O resultado foi profissional demais.', rating: 5 },
  { name: 'Ana P.', role: 'Influencer', text: 'Simplesmente perfeito. O simulador 3D me ajudou muito antes de confirmar o pedido. Voltarei sempre.', rating: 5 },
]

export default function HomePage() {
  const heroRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('animate-fade-up')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/3 rounded-full blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(#FFD700 1px, transparent 1px), linear-gradient(90deg, #FFD700 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 border border-gold-400/30 rounded-full px-4 py-1.5 mb-8 bg-gold-400/5">
              <Sparkles size={13} className="text-gold-400" />
              <span className="text-gold-400 text-xs font-mono tracking-widest uppercase">IA Generativa • Simulador 3D</span>
            </div>

            <h1 className="font-display text-7xl md:text-8xl xl:text-9xl leading-[0.9] tracking-wider mb-6">
              CRIE.<br />
              <span className="shimmer-gold">VISTA.</span><br />
              IMPRESSIONE.
            </h1>

            <p className="text-white/50 text-lg leading-relaxed mb-10 max-w-md">
              Personalize sua camisa com designs exclusivos, sua própria arte ou deixa nossa IA criar algo único para você.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/editor" className="btn-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-7 animate-glow-pulse">
                Começar agora <ArrowRight size={16} />
              </Link>
              <Link to="/designs" className="btn-outline-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-7">
                Ver designs
              </Link>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-4 mt-10">
              {PERKS.map(p => (
                <div key={p.label} className="flex items-center gap-2 text-white/40 text-sm">
                  <span className="text-gold-400">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right — shirt mockup visual */}
          <div className="relative flex justify-center animate-float">
            <div className="relative">
              <div className="w-72 h-80 md:w-80 md:h-96 bg-dark-700 rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                <img
                  src="https://static.dafiti.com.br/p/ousy-Camiseta-Oversized-Los-Angeles-Estilo-Urbano-Minimalista-Off-White-0170-64311151-1-product.jpg"
                  alt="Camisa personalizada"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-gold-400 text-xs font-mono mt-0.5">Estilo Urbano</p>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -left-8 top-8 glass-card px-4 py-2.5 animate-fade-in">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-gold-400" />
                  <span className="text-white/80 text-xs font-mono">IA gerando arte...</span>
                </div>
              </div>
              <div className="absolute -left-8 bottom-12 glass-card px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-gold-400 fill-gold-400" />)}
                  </div>
                  <span className="text-white/60 text-xs">+500 avaliações</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AMOSTRAS ── */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Galeria</span>
              <h2 className="section-title">MODELOS EM<br />DESTAQUE</h2>
            </div>
            <Link to="/designs" className="btn-outline-gold self-start md:self-auto inline-flex items-center gap-2 text-sm">
              Ver todos <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SAMPLES.map((s, i) => (
              <Link key={s.title} to="/editor" className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-dark-700 hover:scale-[1.02] transition-transform duration-300">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.color} to-transparent`} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-gold-400 text-xs font-mono uppercase tracking-widest">{s.cat}</p>
                  <p className="font-display text-xl tracking-wider mt-0.5">{s.title}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-dark-900/60 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={14} className="text-gold-400" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUNCIONALIDADES ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Como funciona</span>
            <h2 className="section-title">3 FORMAS DE<br />PERSONALIZAR</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="glass-card p-8 hover:border-gold-400/20 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 mb-6 group-hover:bg-gold-400 group-hover:text-dark-900 transition-all">
                  {f.icon}
                </div>
                <div className="text-gold-400/40 font-mono text-xs mb-3">0{i+1}</div>
                <h3 className="font-display text-2xl tracking-wider mb-3">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{f.desc}</p>
                <Link to={f.to} className="inline-flex items-center gap-2 text-gold-400 text-sm font-medium hover:gap-3 transition-all">
                  {f.cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Depoimentos</span>
            <h2 className="section-title">O QUE DIZEM<br />NOSSOS CLIENTES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="glass-card p-7">
                <div className="flex gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} className="text-gold-400 fill-gold-400" />)}
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-400/20 flex items-center justify-center text-gold-400 font-display text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-card p-12 md:p-16 border-gold-glow relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-400/3" />
            <div className="relative">
              <Sparkles size={28} className="text-gold-400 mx-auto mb-6" />
              <h2 className="font-display text-5xl md:text-6xl tracking-wider mb-4">
                PRONTO PARA<br />
                <span className="shimmer-gold">CRIAR?</span>
              </h2>
              <p className="text-white/40 mb-8 max-w-sm mx-auto">
                Comece agora mesmo. É rápido, fácil e o resultado é incrível.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/editor" className="btn-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-8">
                  Criar minha camisa <ArrowRight size={16} />
                </Link>
                <Link to="/contato" className="btn-outline-gold inline-flex items-center gap-2 justify-center text-base py-3.5 px-8">
                  Falar com a gente
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
