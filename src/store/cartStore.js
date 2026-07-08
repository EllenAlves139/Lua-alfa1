import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export const useCartStore = create((set, get) => ({
  items: [],
  isLoading: false,

  // Carrega o carrinho do banco para o usuário atual
  loadCart: async (userId) => {
    if (!userId) {
      set({ items: [] })
      return
    }

    set({ isLoading: true })
    try {
      const { data, error } = await supabase
        .from('carts')
        .select('items')
        .eq('user_id', userId)
        .maybeSingle()

      if (error) throw error
      if (data) {
        set({ items: data.items || [] })
      } else {
        // Se não existir carrinho, cria um vazio
        await supabase.from('carts').insert({ user_id: userId, items: [] })
        set({ items: [] })
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  // Salva o carrinho no banco
  saveCart: async (items, userId) => {
    if (!userId || items === undefined) return

    try {
      const { error } = await supabase
        .from('carts')
        .update({ items, updated_at: new Date().toISOString() })
        .eq('user_id', userId)

      if (error) throw error
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error)
    }
  },

  addItem: (product) => {
    const state = get()
    const existing = state.items.find(item => item.id === product.id)
    let newItems
    if (existing) {
      newItems = state.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newItems = [...state.items, { ...product, quantity: 1 }]
    }
    set({ items: newItems })
    // Salva no banco (se usuário logado)
    // A sincronização é feita no componente AuthListener
  },

  removeItem: (id) => {
    const newItems = get().items.filter(item => item.id !== id)
    set({ items: newItems })
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    const newItems = get().items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
    set({ items: newItems })
  },

  clearCart: () => {
    set({ items: [] })
  },

  getTotalItems: () => {
    return get().items.reduce((acc, item) => acc + item.quantity, 0)
  },

  getTotalPrice: () => {
    return get().items.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'))
      return acc + (isNaN(price) ? 0 : price) * item.quantity
    }, 0)
  },

  // Sincroniza o estado atual com o banco
  syncWithDatabase: async (userId) => {
    if (!userId) return
    const { items } = get()
    await get().saveCart(items, userId)
  },
}))