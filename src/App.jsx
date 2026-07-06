import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import EditorPage from './pages/EditorPage'
import DesignsPage from './pages/DesignsPage'
import ContactPage from './pages/ContactPage'
import CollectionPage from './pages/CollectionPage' // ← import

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid rgba(255,215,0,0.2)',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: {
            iconTheme: { primary: '#FFD700', secondary: '#0A0A0A' },
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
          <Route path="/colecao-2028" element={<CollectionPage />} /> {/* ← nova rota */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}