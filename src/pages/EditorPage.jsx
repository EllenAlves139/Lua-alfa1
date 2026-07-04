import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import {
  LayoutGrid, Upload, Sparkles, RotateCcw, ShoppingBag,
  ChevronLeft, ChevronRight, Wand2, RefreshCw, Check, Loader2
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { HexColorPicker } from "react-colorful"
import Shirt3D from '../components/Shirt3D'

// Cores, tamanhos...
const SHIRT_COLORS = [
  { hex: '#FFFFFF', label: 'Branco' },
  { hex: '#F5F5F0', label: 'Off-white' },
  { hex: '#1a1a1a', label: 'Preto' },
  { hex: '#374151', label: 'Grafite' },
  { hex: '#1D4ED8', label: 'Azul' },
  { hex: '#DC2626', label: 'Vermelho' },
  { hex: '#16A34A', label: 'Verde' },
  { hex: '#9333EA', label: 'Roxo' },
  { hex: '#EA580C', label: 'Laranja' },
  { hex: '#FFD700', label: 'Dourado' },
  { hex: '#EC4899', label: 'Rosa' },
  { hex: '#0891B2', label: 'Ciano' },
]

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG']

// ─── MODELOS 3D DISPONÍVEIS ───
const MODELS = [
  { id: 'tshirt', name: 'Camiseta', path: '/models/tshirt-mannequin.glb', icon: '👕' },
  { id: 'hoodie', name: 'Moletom com Capuz', path: '/models/hoodie_with_hood_up.glb', icon: '🧥' },
  { id: 'sweatshirt', name: 'Moletom', path: '/models/sweatshirt_warm.glb', icon: '🧶' },
]

const AI_STYLES = [
  { id: 'realista', label: 'Realista', icon: '🎨' },
  { id: 'cartoon', label: 'Cartoon', icon: '✏️' },
  { id: 'abstrato', label: 'Abstrato', icon: '🌀' },
  { id: 'tipografico', label: 'Tipográfico', icon: '🔤' },
  { id: 'aquarela', label: 'Aquarela', icon: '🖌️' },
  { id: 'futurista', label: 'Futurista', icon: '🚀' },
  { id: 'minimalista', label: 'Minimalista', icon: '◽' },
  { id: 'retro', label: 'Retrô', icon: '📻' },
]

const AI_ELEMENTS = [
  { id: 'animais', label: 'Animais', icon: '🐆' },
  { id: 'natureza', label: 'Natureza', icon: '🌿' },
  { id: 'geometria', label: 'Geometria', icon: '⬡' },
  { id: 'cultura_pop', label: 'Cultura Pop', icon: '🎮' },
  { id: 'frases', label: 'Frases', icon: '💬' },
  { id: 'simbolos', label: 'Símbolos', icon: '⚡' },
  { id: 'espaco', label: 'Espaço', icon: '🌌' },
  { id: 'urbano', label: 'Urbano', icon: '🏙️' },
  { id: 'esporte', label: 'Esporte', icon: '⚽' },
  { id: 'musica', label: 'Música', icon: '🎵' },
]

const MODES = [
  { id: 'upload', label: 'Upload de Arte', icon: <Upload size={16} /> },
  { id: 'ai', label: 'IA Generativa', icon: <Sparkles size={16} /> },
]

const AI_GENERATED_SAMPLES = [
  'https://plus.unsplash.com/premium_photo-1779703288699-435130748577?w=300&q=80',
  'https://plus.unsplash.com/premium_photo-1779703288699-435130748577?w=300&q=80',
  'https://plus.unsplash.com/premium_photo-1779703288699-435130748577?w=300&q=80',
  'https://plus.unsplash.com/premium_photo-1779703288699-435130748577?w=300&q=80',
]

export default function EditorPage() {
  // ─── ESTADOS ───
  const [mode, setMode] = useState('upload')
  const [shirtColor, setShirtColor] = useState('#FFFFFF')
  const [size, setSize] = useState('M')
  const [selectedModel, setSelectedModel] = useState(MODELS[0])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [stampScale, setStampScale] = useState(30)
  const [aiStyle, setAiStyle] = useState([])
  const [aiElements, setAiElements] = useState([])
  const [aiResult, setAiResult] = useState(null)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [ordering, setOrdering] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [showOrderForm, setShowOrderForm] = useState(false)

  // ─── DROPZONE ───
  const onDrop = useCallback(files => {
    const file = files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = e => setUploadedImage(e.target.result)
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.svg', '.webp'] },
    maxFiles: 1,
  })

  const currentArt = mode === 'upload' ? uploadedImage : aiResult

  // ─── IA ───
  function toggleAiStyle(id) {
    setAiStyle(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleAiElement(id) {
    setAiElements(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  async function generateAI() {
    if (aiStyle.length === 0 && aiElements.length === 0) {
      toast.error('Selecione pelo menos um estilo ou elemento')
      return
    }
    setAiGenerating(true)
    setAiResult(null)
    await new Promise(r => setTimeout(r, 2200))
    const sample = AI_GENERATED_SAMPLES[Math.floor(Math.random() * AI_GENERATED_SAMPLES.length)]
    setAiResult(sample)

    await supabase.from('ai_generations').insert({
      style: aiStyle.join(', '),
      elements: aiElements,
      prompt_used: `Estilo: ${aiStyle.join(', ')} | Elementos: ${aiElements.join(', ')}`,
      result_url: sample,
    })

    setAiGenerating(false)
    toast.success('Arte gerada com sucesso!')
  }

  function surpriseMe() {
    const randStyles = AI_STYLES.sort(() => .5 - Math.random()).slice(0, 2).map(s => s.id)
    const randElements = AI_ELEMENTS.sort(() => .5 - Math.random()).slice(0, 3).map(e => e.id)
    setAiStyle(randStyles)
    setAiElements(randElements)
    toast('Combinação aleatória selecionada ✨')
  }

  // ─── UPLOAD PARA SUPABASE ───
  async function uploadImageToSupabase(base64Data) {
    try {
      const response = await fetch(base64Data)
      const blob = await response.blob()
      const fileExt = blob.type.split('/')[1] || 'png'
      const fileName = `design-${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`

      const { error } = await supabase.storage
        .from('camisas-artes')
        .upload(fileName, blob)
      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('camisas-artes')
        .getPublicUrl(fileName)
      return publicUrlData.publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      return null
    }
  }

  // ─── PEDIDO ───
  async function handleOrder() {
    if (!customerName || !customerEmail) {
      toast.error('Preencha nome e e-mail')
      return
    }
    if (!currentArt && mode !== 'ai') {
      toast.error('Selecione ou crie uma arte primeiro')
      return
    }

    setOrdering(true)

    let finalArtUrl = currentArt

    if (mode === 'upload' && uploadedImage) {
      const uploadedUrl = await uploadImageToSupabase(uploadedImage)
      if (uploadedUrl) {
        finalArtUrl = uploadedUrl
      } else {
        setOrdering(false)
        toast.error('Erro ao processar a imagem do upload. Tente novamente.')
        return
      }
    }

    const designData = {
      mode,
      model: selectedModel.id,
      art: finalArtUrl || null,
      designName: mode === 'ai' ? `IA: ${aiStyle.join('+')}` : 'Upload personalizado',
    }

    const { error } = await supabase.from('orders').insert({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone || null,
      design_type: mode === 'upload' ? 'upload' : 'ai',
      design_data: designData,
      shirt_color: shirtColor,
      shirt_size: size,
      quantity: 1,
      position: 'front',
      total_price: 59.9,
    })

    setOrdering(false)

    if (error) {
      toast.error('Erro ao enviar pedido. Tente novamente.')
      return
    }

    const numWhatsEmpresa = "5532984521595"
    const corLabel = SHIRT_COLORS.find(c => c.hex === shirtColor)?.label || shirtColor
    const totalFormatado = '59,90'

    const textoMensagem = `Olá! Acabei de fazer um pedido personalizado pelo site:

👤 *DADOS DO CLIENTE:*
• Nome: ${customerName}
• E-mail: ${customerEmail}
• WhatsApp: ${customerPhone || 'Não informado'}

👕 *DETALHES DA CAMISA:*
• Modelo: ${selectedModel.name}
• Arte: ${designData.designName}
• Cor da Camisa: ${corLabel}
• Tamanho: ${size}
• Quantidade: 1 unidade

💰 *VALOR TOTAL:*
• *R$ ${totalFormatado}*

🖼️ *FOTO DA ESTAMPA SELECIONADA:*
${finalArtUrl}`

    const textoCodificado = encodeURIComponent(textoMensagem)
    const urlWhatsapp = `https://wa.me/${numWhatsEmpresa}?text=${textoCodificado}`

    window.open(urlWhatsapp, '_blank')

    setOrderDone(true)
    setShowOrderForm(false)
    toast.success('Pedido enviado! Redirecionando para o WhatsApp... 🎉')
  }

  if (orderDone) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
            <Check size={36} className="text-dark-900" />
          </div>
          <h2 className="font-display text-5xl tracking-wider mb-4">PEDIDO ENVIADO!</h2>
          <p className="text-white/50 mb-8">Recebemos seu pedido e entraremos em contato em breve.</p>
          <button onClick={() => { setOrderDone(false); setUploadedImage(null); setAiResult(null) }} className="btn-gold">
            Criar outro
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <span className="text-gold-400 text-xs font-mono tracking-widest uppercase block mb-2">Editor</span>
          <h1 className="font-display text-4xl md:text-5xl tracking-wider">PERSONALIZAR CAMISA</h1>
        </div>

        {/* Mode selector */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {MODES.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-gold-400 text-dark-900'
                  : 'border border-white/10 text-white/50 hover:border-gold-400/40 hover:text-gold-400'
              }`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ── LEFT PANEL ── */}
          <div className="space-y-6">

            {/* ─── ESCOLHER MODELO ─── */}
            <div className="glass-card p-6">
              <h3 className="font-display text-xl tracking-wider mb-5 text-gold-400">ESCOLHER MODELO</h3>
              <div className="grid grid-cols-3 gap-3">
                {MODELS.map(model => (
                  <button
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all bg-dark-600 flex flex-col items-center justify-center ${
                      selectedModel?.id === model.id ? 'border-gold-400 scale-105' : 'border-transparent hover:border-white/20'
                    }`}
                  >
                    <span className="text-5xl mb-2">{model.icon}</span>
                    <span className="text-white text-xs font-mono tracking-wider text-center px-1">{model.name}</span>
                    {selectedModel?.id === model.id && (
                      <div className="absolute inset-0 bg-gold-400/20 flex items-center justify-center">
                        <Check size={20} className="text-gold-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode: Upload */}
            {mode === 'upload' && (
              <div className="glass-card p-6">
                <h3 className="font-display text-xl tracking-wider mb-5 text-gold-400">ENVIAR SUA ARTE</h3>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                    isDragActive ? 'border-gold-400 bg-gold-400/5' : 'border-white/10 hover:border-gold-400/40 hover:bg-white/2'
                  }`}
                >
                  <input {...getInputProps()} />
                  {uploadedImage ? (
                    <div className="space-y-3">
                      <img src={uploadedImage} alt="Upload" className="w-32 h-32 object-contain mx-auto rounded-xl" />
                      <p className="text-gold-400 text-sm">Arte carregada! Clique para trocar.</p>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-white/20 mx-auto mb-3" />
                      <p className="text-white/50 text-sm mb-1">Arraste ou clique para enviar</p>
                      <p className="text-white/25 text-xs">PNG, JPG, SVG · Recomendado 300 DPI mínimo</p>
                    </>
                  )}
                </div>
                {uploadedImage && (
                  <>
                    <button onClick={() => setUploadedImage(null)} className="mt-3 text-white/30 hover:text-red-400 text-xs flex items-center gap-1 transition-colors">
                      <RotateCcw size={12} /> Remover
                    </button>
                    <div className="mt-4">
                      <label className="text-white/40 text-xs block mb-1">Tamanho da estampa: {stampScale}%</label>
                      <input
                        type="range"
                        min="10"
                        max="80"
                        value={stampScale}
                        onChange={(e) => setStampScale(Number(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Mode: AI */}
            {mode === 'ai' && (
              <div className="glass-card p-6 space-y-6">
                <h3 className="font-display text-xl tracking-wider text-gold-400">GERADOR DE ARTE IA</h3>

                <div>
                  <p className="text-white/50 text-sm mb-3">Estilo</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_STYLES.map(s => (
                      <button
                        key={s.id}
                        onClick={() => toggleAiStyle(s.id)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${
                          aiStyle.includes(s.id) ? 'bg-gold-400 text-dark-900 font-medium' : 'border border-white/10 text-white/50 hover:border-gold-400/40'
                        }`}
                      >
                        <span>{s.icon}</span> {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white/50 text-sm mb-3">Elementos</p>
                  <div className="flex flex-wrap gap-2">
                    {AI_ELEMENTS.map(e => (
                      <button
                        key={e.id}
                        onClick={() => toggleAiElement(e.id)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1.5 ${
                          aiElements.includes(e.id) ? 'bg-gold-400/20 text-gold-400 border border-gold-400/50 font-medium' : 'border border-white/10 text-white/50 hover:border-gold-400/40'
                        }`}
                      >
                        <span>{e.icon}</span> {e.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={generateAI}
                    disabled={aiGenerating}
                    className="flex-1 btn-gold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {aiGenerating ? <><Loader2 size={16} className="animate-spin" /> Gerando...</> : <><Wand2 size={16} /> Gerar Arte</>}
                  </button>
                  <button
                    onClick={surpriseMe}
                    className="btn-outline-gold px-4 flex items-center gap-2 text-sm"
                  >
                    <RefreshCw size={14} /> Surpreenda-me
                  </button>
                </div>
              </div>
            )}

            {/* Shirt Options (apenas cor e tamanho) */}
            <div className="glass-card p-6">
              <h3 className="font-display text-xl tracking-wider mb-5 text-gold-400">CONFIGURAÇÕES</h3>

              {/* Color */}
              <div className="mb-5">
                <p className="text-white/50 text-sm mb-3">Cor da camisa</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {SHIRT_COLORS.map(c => (
                    <button
                      key={c.hex}
                      title={c.label}
                      onClick={() => setShirtColor(c.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-125 ${
                        shirtColor === c.hex ? 'border-gold-400 scale-125' : 'border-transparent'
                      }`}
                      style={{
                        backgroundColor: c.hex,
                        boxShadow: c.hex === '#FFFFFF' ? 'inset 0 0 0 1px rgba(255,255,255,0.1)' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-center mb-4">
                  <HexColorPicker color={shirtColor} onChange={setShirtColor} />
                </div>
                <input
                  type="text"
                  value={shirtColor}
                  onChange={(e) => setShirtColor(e.target.value)}
                  placeholder="#FFFFFF"
                  className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50"
                />
              </div>

              {/* Size */}
              <div>
                <p className="text-white/50 text-sm mb-3">Tamanho</p>
                <div className="flex gap-2">
                  {SIZES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                        size === s ? 'bg-gold-400 text-dark-900' : 'border border-white/10 text-white/50 hover:border-gold-400/40'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL: Preview ── */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-display text-xl tracking-wider mb-5 text-gold-400">
                PRÉ-VISUALIZAÇÃO 3D
              </h3>
              <Shirt3D
                color={shirtColor}
                image={currentArt}
                scale={stampScale}
                modelPath={selectedModel.path}
              />
            </div>

            {/* Order form */}
            {!showOrderForm ? (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full btn-gold flex items-center justify-center gap-2 py-4 text-base animate-glow-pulse"
              >
                <ShoppingBag size={18} /> Fazer Pedido · R$ 59,90
              </button>
            ) : (
              <div className="glass-card p-6 space-y-4">
                <h3 className="font-display text-xl tracking-wider text-gold-400">DADOS DO PEDIDO</h3>
                <input
                  type="text"
                  placeholder="Seu nome *"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail *"
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp (opcional)"
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-dark-600 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="btn-outline-gold flex-1"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleOrder}
                    disabled={ordering}
                    className="btn-gold flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {ordering ? <><Loader2 size={15} className="animate-spin" /> Enviando...</> : <><Check size={15} /> Confirmar</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}