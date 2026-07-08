import { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import {
  Check,
  Loader2,
  Palette,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Upload,
  Wand2,
  X,
} from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import Shirt3D from '../components/Shirt3D'
import { supabase } from '../lib/supabase'

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
  { hex: '#EC4899', label: 'Rosa' },
  { hex: '#0891B2', label: 'Ciano' },
]

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG']

const MODELS = [
  { id: 'tshirt', name: 'Camiseta', path: '/models/tshirt-mannequin.glb' },
  { id: 'hoodie', name: 'Moletom com Capuz', path: '/models/hoodie_with_hood_up.glb' },
  { id: 'sweatshirt', name: 'Moletom', path: '/models/sweatshirt_warm.glb' },
]

const AI_STYLES = [
  { id: 'realista', label: 'Realista' },
  { id: 'cartoon', label: 'Cartoon' },
  { id: 'abstrato', label: 'Abstrato' },
  { id: 'tipografico', label: 'Tipográfico' },
  { id: 'aquarela', label: 'Aquarela' },
  { id: 'futurista', label: 'Futurista' },
  { id: 'minimalista', label: 'Minimalista' },
  { id: 'retro', label: 'Retrô' },
]

const AI_ELEMENTS = [
  { id: 'animais', label: 'Animais' },
  { id: 'natureza', label: 'Natureza' },
  { id: 'geometria', label: 'Geometria' },
  { id: 'cultura_pop', label: 'Cultura Pop' },
  { id: 'frases', label: 'Frases' },
  { id: 'simbolos', label: 'Símbolos' },
  { id: 'espaco', label: 'Espaço' },
  { id: 'urbano', label: 'Urbano' },
  { id: 'esporte', label: 'Esporte' },
  { id: 'musica', label: 'Música' },
]

const AI_GENERATED_SAMPLES = [
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=700&q=80',
  'https://images.unsplash.com/photo-1635776063043-ab23b4c226f6?w=700&q=80',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=700&q=80',
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=700&q=80',
]

function PillButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition-all ${
        active
          ? 'bg-gold-400 text-dark-900 font-semibold'
          : 'border border-white/10 text-white/55 hover:border-gold-400/50 hover:text-gold-400'
      }`}
    >
      {children}
    </button>
  )
}

function Field({ label, children }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">{label}</span>
      {children}
    </label>
  )
}

export default function EditorPage() {
  const [mode, setMode] = useState('upload')
  const [shirtColor, setShirtColor] = useState('#FFFFFF')
  const [size, setSize] = useState('M')
  const [selectedModel, setSelectedModel] = useState(MODELS[0])
  const [uploadedImage, setUploadedImage] = useState(null)
  const [stampScale, setStampScale] = useState(30)
  const [stampX, setStampX] = useState(0)
  const [stampY, setStampY] = useState(0.15)
  const [stampRotation, setStampRotation] = useState(0)
  const [aiStyle, setAiStyle] = useState([])
  const [aiElements, setAiElements] = useState([])
  const [aiResult, setAiResult] = useState(null)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [ordering, setOrdering] = useState(false)
  const [orderDone, setOrderDone] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  const currentArt = mode === 'upload' ? uploadedImage : aiResult

  const stampPosition = useMemo(() => ({ x: stampX, y: stampY }), [stampX, stampY])

  const onDrop = useCallback(files => {
    const file = files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Envie um arquivo de imagem válido.')
      return
    }

    const reader = new FileReader()
    reader.onload = event => {
      setUploadedImage(event.target.result)
      setMode('upload')
      toast.success('Arte carregada com sucesso!')
    }
    reader.onerror = () => toast.error('Não foi possível ler a imagem.')
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'image/svg+xml': ['.svg'],
    },
    maxFiles: 1,
    multiple: false,
  })

  function toggleItem(setter, id) {
    setter(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  function resetStamp() {
    setStampScale(30)
    setStampX(0)
    setStampY(0.15)
    setStampRotation(0)
  }

  async function generateAI() {
    if (aiStyle.length === 0 && aiElements.length === 0) {
      toast.error('Selecione pelo menos um estilo ou elemento.')
      return
    }

    setAiGenerating(true)
    setAiResult(null)

    await new Promise(resolve => setTimeout(resolve, 1600))

    const sample = AI_GENERATED_SAMPLES[Math.floor(Math.random() * AI_GENERATED_SAMPLES.length)]
    setAiResult(sample)

    const { error } = await supabase.from('ai_generations').insert({
      style: aiStyle.join(', '),
      elements: aiElements,
      prompt_used: `Estilo: ${aiStyle.join(', ')} | Elementos: ${aiElements.join(', ')}`,
      result_url: sample,
    })

    if (error) console.error('Erro ao salvar geração IA:', error)

    setAiGenerating(false)
    toast.success('Arte gerada com sucesso!')
  }

  function surpriseMe() {
    const randomStyles = [...AI_STYLES].sort(() => 0.5 - Math.random()).slice(0, 2).map(item => item.id)
    const randomElements = [...AI_ELEMENTS].sort(() => 0.5 - Math.random()).slice(0, 3).map(item => item.id)

    setAiStyle(randomStyles)
    setAiElements(randomElements)
    toast('Combinação aleatória selecionada ✨')
  }

  async function uploadImageToSupabase(base64Data) {
    try {
      const response = await fetch(base64Data)
      const blob = await response.blob()
      const fileExt = blob.type.split('/')[1] || 'png'
      const fileName = `design-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`

      const { error } = await supabase.storage.from('camisas-artes').upload(fileName, blob, {
        cacheControl: '3600',
        upsert: false,
        contentType: blob.type,
      })

      if (error) throw error

      const { data } = supabase.storage.from('camisas-artes').getPublicUrl(fileName)
      return data.publicUrl
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error)
      return null
    }
  }

  async function handleOrder(event) {
    event.preventDefault()

    if (!customerName.trim() || !customerEmail.trim()) {
      toast.error('Preencha nome e e-mail.')
      return
    }

    if (!currentArt) {
      toast.error('Envie ou gere uma arte antes de finalizar.')
      return
    }

    setOrdering(true)

    let finalArtUrl = currentArt

    if (mode === 'upload' && uploadedImage) {
      const uploadedUrl = await uploadImageToSupabase(uploadedImage)
      if (!uploadedUrl) {
        setOrdering(false)
        toast.error('Erro ao processar a imagem do upload. Tente novamente.')
        return
      }
      finalArtUrl = uploadedUrl
    }

    const designData = {
      mode,
      model: selectedModel.id,
      art: finalArtUrl,
      designName: mode === 'ai' ? `IA: ${aiStyle.join('+') || 'personalizada'}` : 'Upload personalizado',
      stamp: {
        scale: stampScale,
        x: stampX,
        y: stampY,
        rotation: stampRotation,
      },
    }

    const { error } = await supabase.from('orders').insert({
      customer_name: customerName.trim(),
      customer_email: customerEmail.trim(),
      customer_phone: customerPhone.trim() || null,
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
      console.error('Erro ao salvar pedido:', error)
      toast.error('Erro ao enviar pedido. Tente novamente.')
      return
    }

    const companyWhatsApp = '5532984521595'
    const colorLabel = SHIRT_COLORS.find(item => item.hex === shirtColor)?.label || shirtColor
    const message = `Olá! Acabei de fazer um pedido personalizado pelo site LUA ALFA.%0A%0A*DADOS DO CLIENTE*%0A• Nome: ${customerName}%0A• E-mail: ${customerEmail}%0A• WhatsApp: ${customerPhone || 'Não informado'}%0A%0A*DETALHES DA PEÇA*%0A• Modelo: ${selectedModel.name}%0A• Arte: ${designData.designName}%0A• Cor: ${colorLabel} (${shirtColor})%0A• Tamanho: ${size}%0A• Quantidade: 1 unidade%0A• Escala da estampa: ${stampScale}%25%0A• Posição: X ${stampX} / Y ${stampY}%0A• Rotação: ${stampRotation}°%0A%0A*VALOR TOTAL:* R$ 59,90%0A%0A*ARTE SELECIONADA:* ${finalArtUrl}`
    window.open(`https://wa.me/${companyWhatsApp}?text=${message}`, '_blank')

    setOrderDone(true)
    setShowOrderForm(false)
    toast.success('Pedido enviado! Redirecionando para o WhatsApp...')
  }

  if (orderDone) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-dark-900 px-4 py-28 text-white">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />
        <section className="relative mx-auto max-w-xl rounded-3xl border border-white/10 bg-dark-700/70 p-8 text-center backdrop-blur-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-dark-900">
            <Check size={34} />
          </div>
          <p className="mb-2 text-sm uppercase tracking-[0.35em] text-gold-400">Pedido enviado</p>
          <h1 className="font-display text-5xl tracking-wide">Tudo certo!</h1>
          <p className="mt-3 text-white/55">Recebemos seu pedido e abrimos o WhatsApp com os dados da personalização.</p>
          <button
            type="button"
            onClick={() => {
              setOrderDone(false)
              setUploadedImage(null)
              setAiResult(null)
              setCustomerName('')
              setCustomerEmail('')
              setCustomerPhone('')
              resetStamp()
            }}
            className="btn-gold mt-8"
          >
            Criar outro pedido
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-dark-900 px-4 py-24 text-white">
      <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold-400/15 blur-3xl" />

      <section className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-gold-400">Editor LUA ALFA</p>
          <h1 className="font-display text-5xl tracking-wide md:text-7xl">Personalizar peça</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/55">
            Envie sua arte, ajuste posição, tamanho e rotação da estampa, escolha o modelo e finalize pelo WhatsApp.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="space-y-5">
            <div className="glass-card p-5">
              <div className="mb-4 flex gap-3">
                <PillButton active={mode === 'upload'} onClick={() => setMode('upload')}>
                  <Upload className="mr-2 inline" size={16} /> Upload
                </PillButton>
                <PillButton active={mode === 'ai'} onClick={() => setMode('ai')}>
                  <Sparkles className="mr-2 inline" size={16} /> IA
                </PillButton>
              </div>

              {mode === 'upload' ? (
                <div>
                  <h2 className="mb-3 font-display text-3xl tracking-wide">Enviar arte</h2>
                  <div
                    {...getRootProps()}
                    className={`cursor-pointer rounded-2xl border border-dashed p-6 text-center transition-all ${
                      isDragActive
                        ? 'border-gold-400 bg-gold-400/10'
                        : 'border-white/15 bg-dark-600/80 hover:border-gold-400/60'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {uploadedImage ? (
                      <div className="space-y-3">
                        <img src={uploadedImage} alt="Arte enviada" className="mx-auto h-28 max-w-full rounded-xl object-contain" />
                        <p className="text-sm text-gold-400">Arte carregada. Clique para trocar.</p>
                      </div>
                    ) : (
                      <div className="space-y-2 text-white/50">
                        <Upload className="mx-auto text-gold-400" size={34} />
                        <p>Arraste ou clique para enviar</p>
                        <p className="text-xs">PNG, JPG, SVG ou WEBP</p>
                      </div>
                    )}
                  </div>

                  {uploadedImage && (
                    <button
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="mt-3 flex items-center gap-2 text-xs text-white/35 transition hover:text-red-400"
                    >
                      <X size={14} /> Remover arte
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <h2 className="mb-3 font-display text-3xl tracking-wide">Gerador IA</h2>

                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/40">Estilo</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {AI_STYLES.map(item => (
                      <PillButton key={item.id} active={aiStyle.includes(item.id)} onClick={() => toggleItem(setAiStyle, item.id)}>
                        {item.label}
                      </PillButton>
                    ))}
                  </div>

                  <p className="mb-2 text-xs uppercase tracking-[0.22em] text-white/40">Elementos</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {AI_ELEMENTS.map(item => (
                      <PillButton key={item.id} active={aiElements.includes(item.id)} onClick={() => toggleItem(setAiElements, item.id)}>
                        {item.label}
                      </PillButton>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={generateAI} disabled={aiGenerating} className="btn-gold flex flex-1 items-center justify-center gap-2">
                      {aiGenerating ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
                      {aiGenerating ? 'Gerando...' : 'Gerar arte'}
                    </button>
                    <button type="button" onClick={surpriseMe} className="btn-outline-gold px-4">
                      Surpresa
                    </button>
                  </div>

                  {aiResult && (
                    <img src={aiResult} alt="Arte gerada por IA" className="mt-4 h-28 w-full rounded-2xl object-cover" />
                  )}
                </div>
              )}
            </div>

            <div className="glass-card p-5">
              <h2 className="mb-4 font-display text-3xl tracking-wide">Modelo</h2>
              <div className="grid grid-cols-3 gap-3">
                {MODELS.map(model => (
                  <button
                    type="button"
                    key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className={`rounded-2xl border p-3 text-center text-sm transition ${
                      selectedModel.id === model.id
                        ? 'border-gold-400 bg-gold-400/10 text-gold-400'
                        : 'border-white/10 bg-dark-600 text-white/55 hover:border-gold-400/50'
                    }`}
                  >
                    {model.name}
                  </button>
                ))}
              </div>
            </div>

            {/* SEÇÃO DE CORES CORRIGIDA */}
            <div className="glass-card space-y-5 p-5">
              <h2 className="font-display text-3xl tracking-wide">Configurações</h2>

              <Field label="Cor da peça">
                <div className="flex flex-wrap gap-2">
                  {SHIRT_COLORS.map(({ hex, label }) => (
                    <button
                      key={hex}
                      type="button"
                      aria-label={label}
                      onClick={() => setShirtColor(hex)}
                      className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${
                        shirtColor === hex ? 'border-gold-400 scale-110' : 'border-white/10'
                      }`}
                      style={{ backgroundColor: hex }}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-col sm:flex-row gap-3">
                  <input
                    type="color"
                    value={shirtColor}
                    onChange={e => setShirtColor(e.target.value)}
                    className="h-12 w-full sm:w-20 rounded-xl border border-white/10 bg-dark-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={shirtColor}
                    onChange={e => setShirtColor(e.target.value)}
                    className="flex-1 rounded-xl border border-white/10 bg-dark-600 px-4 py-2 text-sm text-white outline-none focus:border-gold-400/60"
                    placeholder="#FFFFFF"
                  />
                </div>
              </Field>

              <Field label="Tamanho da peça">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(item => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setSize(item)}
                      className={`h-10 w-12 rounded-xl text-sm font-semibold transition ${
                        size === item ? 'bg-gold-400 text-dark-900' : 'border border-white/10 text-white/50 hover:border-gold-400/50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </aside>

          <section className="space-y-5">
            <div className="glass-card p-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-3xl tracking-wide">Pré-visualização 3D</h2>
                  <p className="text-sm text-white/45">Gire o modelo e ajuste a estampa em tempo real.</p>
                </div>
                <button type="button" onClick={resetStamp} className="btn-outline-gold flex items-center justify-center gap-2 px-4 py-2 text-sm">
                  <RotateCcw size={16} /> Resetar estampa
                </button>
              </div>

                        <Shirt3D
  key={`${selectedModel.id}-${shirtColor}-${currentArt}`}
  color={shirtColor}
  image={currentArt}
  scale={stampScale}
  stampPosition={stampPosition}
  stampRotation={stampRotation}
  modelPath={selectedModel.path}
/>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="glass-card space-y-4 p-5">
                <h3 className="font-display text-2xl tracking-wide">Ajuste da estampa</h3>

                <Field label={`Tamanho: ${stampScale}%`}>
                  <input type="range" min="8" max="100" value={stampScale} onChange={event => setStampScale(Number(event.target.value))} className="w-full accent-gold-400" />
                </Field>

                <Field label={`Posição horizontal: ${stampX}`}>
                  <input type="range" min="-1.4" max="1.4" step="0.05" value={stampX} onChange={event => setStampX(Number(event.target.value))} className="w-full accent-gold-400" />
                </Field>

                <Field label={`Posição vertical: ${stampY}`}>
                  <input type="range" min="-1.2" max="1.4" step="0.05" value={stampY} onChange={event => setStampY(Number(event.target.value))} className="w-full accent-gold-400" />
                </Field>

                <Field label={`Rotação: ${stampRotation}°`}>
                  <input type="range" min="-180" max="180" value={stampRotation} onChange={event => setStampRotation(Number(event.target.value))} className="w-full accent-gold-400" />
                </Field>
              </div>

              <div className="glass-card p-5">
                {!showOrderForm ? (
                  <div className="flex h-full flex-col justify-between gap-5">
                    <div>
                      <h3 className="font-display text-3xl tracking-wide">Resumo</h3>
                      <div className="mt-4 space-y-2 text-sm text-white/55">
                        <p>Modelo: <span className="text-white">{selectedModel.name}</span></p>
                        <p>Cor: <span className="text-white">{SHIRT_COLORS.find(item => item.hex === shirtColor)?.label || shirtColor}</span></p>
                        <p>Tamanho: <span className="text-white">{size}</span></p>
                        <p>Arte: <span className="text-white">{currentArt ? 'Selecionada' : 'Pendente'}</span></p>
                        <p className="text-2xl font-bold text-gold-400">R$ 59,90</p>
                      </div>
                    </div>

                    <button type="button" onClick={() => setShowOrderForm(true)} className="btn-gold flex w-full items-center justify-center gap-2 py-4">
                      <ShoppingBag size={19} /> Fazer pedido
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleOrder} className="space-y-4">
                    <h3 className="font-display text-3xl tracking-wide">Dados do pedido</h3>
                    <input
                      value={customerName}
                      onChange={event => setCustomerName(event.target.value)}
                      placeholder="Nome completo"
                      className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
                    />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={event => setCustomerEmail(event.target.value)}
                      placeholder="E-mail"
                      className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
                    />
                    <input
                      value={customerPhone}
                      onChange={event => setCustomerPhone(event.target.value)}
                      placeholder="WhatsApp"
                      className="w-full rounded-xl border border-white/10 bg-dark-600 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-gold-400/60"
                    />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setShowOrderForm(false)} className="btn-outline-gold flex-1">
                        Voltar
                      </button>
                      <button type="submit" disabled={ordering} className="btn-gold flex flex-1 items-center justify-center gap-2">
                        {ordering && <Loader2 className="animate-spin" size={17} />}
                        {ordering ? 'Enviando...' : 'Confirmar'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}