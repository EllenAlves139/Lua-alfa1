import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import DesignsPage from './pages/DesignsPage'
import ContactPage from './pages/ContactPage'
import CollectionPage from './pages/CollectionPage'
import ComoComprarPage from './pages/ComoComprarPage'
import TrocasPage from './pages/TrocasPage'
import GuiaTamanhosPage from './pages/GuiaTamanhosPage'
import RastrearPage from './pages/RastrearPage'
import MeusPedidosPage from './pages/MeusPedidosPage'
import CheckoutPage from './pages/CheckoutPage'

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-dark-900 flex flex-col">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#fff',
              border: '1px solid rgba(0,163,255,0.2)',
              fontFamily: 'DM Sans, sans-serif',
            },
            success: {
              iconTheme: { primary: '#00A3FF', secondary: '#0A0A0A' },
            },
          }}
        />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/editor" element={<EditorPage />} />
            <Route path="/designs" element={<DesignsPage />} />
            <Route path="/contato" element={<ContactPage />} />
            <Route path="/colecao-2028" element={<CollectionPage />} />
            <Route path="/como-comprar" element={<ComoComprarPage />} />
            <Route path="/trocas" element={<TrocasPage />} />
            <Route path="/guia-tamanhos" element={<GuiaTamanhosPage />} />
            <Route path="/rastrear" element={<RastrearPage />} />
            <Route path="/meus-pedidos" element={<MeusPedidosPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}