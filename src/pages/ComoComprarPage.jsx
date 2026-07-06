import HelpLayout from '../components/layout/HelpLayout'

export default function ComoComprarPage() {
  return (
    <HelpLayout title="COMO COMPRAR">
      <div className="space-y-6 text-white/70">
        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">1. ESCOLHA O PRODUTO</h3>
          <p className="leading-relaxed">
            Navegue pelo nosso catálogo e encontre a peça perfeita para você. Use os filtros para refinar sua busca por categoria, tipo e tamanho.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">2. PERSONALIZE</h3>
          <p className="leading-relaxed">
            No editor, escolha a cor da camisa, faça upload da sua arte ou use nossa IA generativa para criar uma estampa exclusiva. Ajuste o tamanho e a posição da estampa em tempo real.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">3. FINALIZE O PEDIDO</h3>
          <p className="leading-relaxed">
            Preencha seus dados e confirme o pedido. Você será redirecionado para o WhatsApp para finalizar o pagamento e combinar os detalhes da entrega.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">4. RECEBA SUA PEÇA</h3>
          <p className="leading-relaxed">
            Produzimos sua peça com todo cuidado e enviamos para o endereço informado. Você receberá um código de rastreio para acompanhar a entrega.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-white/40 text-sm">
            ⏱️ Prazo de produção: 5 a 7 dias úteis • Entrega: 3 a 7 dias úteis (dependendo da região)
          </p>
        </div>
      </div>
    </HelpLayout>
  )
}