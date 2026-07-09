import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader2, LogIn, UserPlus } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password) {
      toast.error('Preencha e-mail e senha.')
      return
    }
    if (mode === 'signup' && !name.trim()) {
      toast.error('Informe seu nome.')
      return
    }

    setLoading(true)
    const result =
      mode === 'login'
        ? await login(email.trim(), password)
        : await signup(name.trim(), email.trim(), password)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
      return
    }

    if (result.pendingEmail) {
      toast.success('Cadastro criado! Confira seu e-mail para confirmar a conta.')
      setMode('login')
      return
    }

    toast.success(mode === 'login' ? 'Bem-vindo de volta!' : 'Conta criada com sucesso!')
    navigate('/')
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-28 pb-20">
      {/* Fundo azul */}
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-md px-6">
        <div className="mb-8 text-center">
          <span className="mb-2 block text-xs font-mono uppercase tracking-widest text-gold-400">Área do cliente</span>
          <h1 className="font-display text-5xl tracking-wider">{mode === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}</h1>
        </div>

        <div className="glass-card p-6">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-full border border-white/10 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`rounded-full py-2 text-sm font-semibold transition ${
                mode === 'login' ? 'bg-gold-400 text-dark-900' : 'text-white/50 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`rounded-full py-2 text-sm font-semibold transition ${
                mode === 'signup' ? 'bg-gold-400 text-dark-900' : 'text-white/50 hover:text-white'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <input
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Nome completo"
                className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
              />
            )}
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="E-mail"
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
            />
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Senha (mín. 6 caracteres)"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn-gold flex w-full items-center justify-center gap-2 py-3.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : mode === 'login' ? (
                <LogIn size={18} />
              ) : (
                <UserPlus size={18} />
              )}
              {loading ? 'Aguarde...' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-white/30">
            Ao continuar, você concorda com nossos termos.{' '}
            <Link to="/contato" className="text-gold-400 hover:text-gold-300">
              Precisa de ajuda?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
