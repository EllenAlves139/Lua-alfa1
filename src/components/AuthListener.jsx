import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCartStore } from '../store/cartStore'

export default function AuthListener() {
  const { user } = useAuth()
  const { loadCart, syncWithDatabase, items } = useCartStore()

  // Quando usuário muda, carrega carrinho correspondente
  useEffect(() => {
    if (user) {
      loadCart(user.id)
    }
  }, [user, loadCart])

  // Sincroniza o carrinho no banco sempre que ele mudar (apenas se logado)
  useEffect(() => {
    if (user && items.length >= 0) {
      syncWithDatabase(user.id)
    }
  }, [items, user, syncWithDatabase])

  return null
}