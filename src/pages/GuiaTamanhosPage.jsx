import HelpLayout from '../components/layout/HelpLayout'

export default function GuiaTamanhosPage() {
  return (
    <HelpLayout title="GUIA DE TAMANHOS">
      <div className="space-y-6">
        <p className="text-white/60 text-sm">
          Meça seu corpo e encontre o tamanho ideal para sua peça LUA ALFA.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gold-400 font-mono text-xs">TAMANHO</th>
                <th className="text-left py-3 px-4 text-gold-400 font-mono text-xs">PEITO (cm)</th>
                <th className="text-left py-3 px-4 text-gold-400 font-mono text-xs">COMPRIMENTO (cm)</th>
                <th className="text-left py-3 px-4 text-gold-400 font-mono text-xs">OMBROS (cm)</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-bold text-white">PP</td><td className="py-3 px-4">86-91</td><td className="py-3 px-4">64</td><td className="py-3 px-4">42</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-bold text-white">P</td><td className="py-3 px-4">91-96</td><td className="py-3 px-4">66</td><td className="py-3 px-4">44</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-bold text-white">M</td><td className="py-3 px-4">96-101</td><td className="py-3 px-4">68</td><td className="py-3 px-4">46</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-bold text-white">G</td><td className="py-3 px-4">101-106</td><td className="py-3 px-4">70</td><td className="py-3 px-4">48</td></tr>
              <tr className="border-b border-white/5"><td className="py-3 px-4 font-bold text-white">GG</td><td className="py-3 px-4">106-111</td><td className="py-3 px-4">72</td><td className="py-3 px-4">50</td></tr>
              <tr><td className="py-3 px-4 font-bold text-white">XGG</td><td className="py-3 px-4">111-116</td><td className="py-3 px-4">74</td><td className="py-3 px-4">52</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-dark-700/50 rounded-xl p-4">
          <p className="text-white/40 text-xs">
            📏 <strong className="text-white/60">Como medir:</strong> Meça a circunferência do peito na parte mais larga, o comprimento do ombro à barra e a largura dos ombros de ponta a ponta.
          </p>
        </div>
      </div>
    </HelpLayout>
  )
}