import { useState } from 'react'
import { X, Loader2, Mail, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signUp } = useAuth()

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        await signIn(email, password)
        toast.success('Bem-vindo de volta!')
      } else {
        if (!name.trim()) {
          toast.error('Digite seu nome')
          setLoading(false)
          return
        }
        await signUp(email, password, name)
        toast.success('Conta criada! Verifique seu e-mail para confirmar.')
      }
      onClose()
      setEmail('')
      setPassword('')
      setName('')
    } catch (error) {
      toast.error(error.message || 'Erro na autenticação')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-dark-800 border border-white/10 rounded-2xl p-6 shadow-2xl animate-fade-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          {/* 👇 LOGO AUMENTADA (w-20 h-20) */}
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="LUA ALFA" className="w-20 h-20 object-contain" />
          </div>
          <h2 className="font-display text-3xl tracking-wider">
            {isLogin ? 'BEM-VINDO' : 'CRIAR CONTA'}
          </h2>
          <p className="text-white/40 text-sm mt-1">
            {isLogin ? 'Entre para acessar seus pedidos' : 'Cadastre-se para personalizar e comprar'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="password"
              placeholder="Senha (mínimo 6 caracteres)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold flex items-center justify-center gap-2 py-3.5 disabled:opacity-50"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : null}
            {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-white/40 hover:text-gold-400 text-sm transition-colors"
          >
            {isLogin ? 'Ainda não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </button>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">Ao continuar, você concorda com nossos termos</p>
        </div>
      </div>
    </div>
  )
}