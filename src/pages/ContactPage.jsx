import { useState } from 'react'
import { Mail, MessageCircle, MapPin, Send, Loader2, Check } from 'lucide-react'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm px-6">
          <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
            <Check size={36} className="text-dark-900" />
          </div>
          <h2 className="font-display text-5xl tracking-wider mb-4">ENVIADO!</h2>
          <p className="text-white/50 mb-8">Recebemos sua mensagem. Nossa equipe responderá em breve pelo e-mail informado.</p>
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
        <div className="mb-14">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-3">Fale conosco</span>
          <h1 className="section-title mb-4">ENTRE EM<br />CONTATO</h1>
          <p className="section-subtitle max-w-md">
            Dúvidas sobre pedidos, parcerias ou quer bater um papo? Estamos aqui.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <InfoCard icon={<Mail size={20} />} label="E-mail" value="criatto@gmail.com.br" href="mailto:contato@criatto.com.br" />
            
            <InfoCard
              icon={<MessageCircle size={20} />}
              label="WhatsApp"
              value="+55 (32) 99852-1595"
              href="https://wa.me/32984521595?text=Olá! Vim pelo site da CRIATTO e gostaria de mais informações."
            />
            <InfoCard icon={<MapPin size={20} />} label="Localização" value="Minas Gerais, Brasil" />

            <div className="glass-card p-6">
              <p className="text-white/30 text-xs font-mono uppercase tracking-widest mb-4">Horário de atendimento</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Segunda — Sexta</span>
                  <span className="text-gold-400 font-mono">08h — 18h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Sábado</span>
                  <span className="text-gold-400 font-mono">09h — 13h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Domingo</span>
                  <span className="text-white/20 font-mono">Fechado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Nome" name="name" value={form.name} onChange={handleChange} placeholder="Seu nome completo" />
                <InputField label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} placeholder="seu@email.com" />
              </div>
              <InputField label="Assunto" name="subject" value={form.subject} onChange={handleChange} placeholder="Sobre o que é?" />
              <div>
                <label className="block text-white/40 text-xs font-mono uppercase tracking-widest mb-2">Mensagem</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Escreva sua mensagem aqui..."
                  rows={5}
                  className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                  : <><Send size={16} /> Enviar mensagem</>
                }
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon, label, value, href }) {
  const content = (
    <div className="glass-card p-5 flex items-center gap-4 hover:border-gold-400/20 transition-colors">
      <div className="w-10 h-10 rounded-xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest">{label}</p>
        <p className="text-white text-sm mt-0.5">{value}</p>
      </div>
    </div>
  )

  return href
    ? <a href={href} target="_blank" rel="noreferrer">{content}</a>
    : content
}

function InputField({ label, name, type = 'text', value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-white/40 text-xs font-mono uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
      />
    </div>
  )
}
