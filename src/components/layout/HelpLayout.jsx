export default function HelpLayout({ title, children }) {
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

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-2">Ajuda & Suporte</span>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider">{title}</h1>
        </div>
        <div className="glass-card p-8 md:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}