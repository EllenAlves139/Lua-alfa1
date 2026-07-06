import HelpLayout from '../components/layout/HelpLayout'

export default function TrocasPage() {
  return (
    <HelpLayout title="TROCAS E DEVOLUÇÕES">
      <div className="space-y-6 text-white/70">
        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">POLÍTICA DE TROCA</h3>
          <p className="leading-relaxed">
            Aceitamos trocas em até <strong className="text-white">30 dias</strong> após o recebimento do produto. A peça deve estar sem uso, com as etiquetas originais e na embalagem original.
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">COMO SOLICITAR</h3>
          <ol className="list-decimal list-inside space-y-2 pl-4">
            <li>Entre em contato pelo WhatsApp ou e-mail</li>
            <li>Informe o número do pedido e o motivo da troca</li>
            <li>Envie fotos do produto (se houver defeito)</li>
            <li>Aguardar a análise e aprovação</li>
            <li>Envie o produto de volta (o frete é por nossa conta em caso de erro nosso)</li>
          </ol>
        </div>

        <div>
          <h3 className="font-display text-2xl tracking-wider text-gold-400 mb-3">REEMBOLSO</h3>
          <p className="leading-relaxed">
            O reembolso é realizado em até <strong className="text-white">7 dias úteis</strong> após o recebimento e análise do produto devolvido. O valor é creditado na mesma forma de pagamento utilizada.
          </p>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6">
          <p className="text-white/40 text-sm">
            ⚠️ Produtos personalizados (com estampa própria) não podem ser trocados, a menos que haja defeito de fabricação.
          </p>
        </div>
      </div>
    </HelpLayout>
  )
}