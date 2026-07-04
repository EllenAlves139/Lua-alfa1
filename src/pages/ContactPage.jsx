import { useState } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Preencha todos os campos')
      return
    }
    setLoading(true)

    const { error } = await supabase.from('contacts').insert({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    })

    setLoading(false)
    if (error) {
      toast.error('Erro ao enviar. Tente novamente.')
      return
    }

    setSent(true)
    toast.success('Mensagem enviada! Responderemos em breve.')
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
            <svg className="w-10 h-10 text-dark-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-5xl tracking-wider mb-4">ENVIADO!</h2>
          <p className="text-white/50 mb-8">Recebemos sua mensagem. Nossa equipe responderá em breve.</p>
          <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }} className="btn-outline-gold">
            Enviar outra mensagem
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-2">Suporte</span>
          <h1 className="font-display text-5xl md:text-6xl tracking-wider mb-3">SUPORTE</h1>
          <p className="text-white/50 text-sm max-w-md">
            Dúvidas sobre pedidos, trocas ou personalização? Estamos aqui para ajudar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* ─── INFORMAÇÕES (ESQUERDA) ─── */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white/20 text-xs font-mono uppercase tracking-widest mb-2">E-MAIL</h3>
              <p className="text-white text-sm">contato@luaalfa.com.br</p>
            </div>

            <div>
              <h3 className="text-white/20 text-xs font-mono uppercase tracking-widest mb-2">WHATSAPP</h3>
              <p className="text-white text-sm">+55 (31) 9 9999-9999</p>
            </div>

            <div>
              <h3 className="text-white/20 text-xs font-mono uppercase tracking-widest mb-2">LOCALIZAÇÃO</h3>
              <p className="text-white text-sm">Centro, 147, Muriaé-MG</p>
            </div>

            <div>
              <h3 className="text-white/20 text-xs font-mono uppercase tracking-widest mb-2">HORÁRIO DE ATENDIMENTO</h3>
              <div className="space-y-1 text-sm text-white/60">
                <p><span className="text-white/30">Segunda — Sexta</span> 08h – 18h</p>
                <p><span className="text-white/30">Sábado</span> 09h – 13h</p>
                <p><span className="text-white/30">Domingo</span> <span className="text-white/20">Fechado</span></p>
              </div>
            </div>
          </div>

          {/* ─── FORMULÁRIO (DIREITA) ─── */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-widest mb-2">NOME</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-widest mb-2">E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-widest mb-2">ASSUNTO</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Sobre o que é?"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/30 text-xs font-mono uppercase tracking-widest mb-2">MENSAGEM</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={5}
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar mensagem'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}