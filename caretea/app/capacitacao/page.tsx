import Link from "next/link";
import ModulosAccordion from "./ModulosAccordion";

const niveis = [
  {
    titulo: "Nível 1",
    subtitulo: "Suporte Leve",
    descricao:
      "Necessita de suporte leve. Pode apresentar dificuldades sociais, sensoriais e emocionais com boa capacidade de adaptação.",
    cor: "from-[#3BA7FF] to-[#2563EB]",
    corTexto: "text-[#2563EB]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(59,167,255,0.28)]",
    rota: "/capacitacao/nivel-1",
    unidades: 6,
    badge: "Recomendado para iniciar",
    badgeCor: "bg-[#3BA7FF]/10 text-[#2563EB]",
  },
  {
    titulo: "Nível 2",
    subtitulo: "Suporte Moderado",
    descricao:
      "Necessita de suporte moderado. Pode apresentar crises mais intensas, dificuldades de comunicação e maior dependência.",
    cor: "from-[#A855F7] to-[#7E22CE]",
    corTexto: "text-[#7E22CE]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(168,85,247,0.28)]",
    rota: "/capacitacao/nivel-2",
    unidades: 6,
    badge: "Nível intermediário",
    badgeCor: "bg-[#A855F7]/10 text-[#7E22CE]",
  },
  {
    titulo: "Nível 3",
    subtitulo: "Suporte Intenso",
    descricao:
      "Necessita de suporte intenso. Pode apresentar dependência elevada, crises severas e dificuldades funcionais importantes.",
    cor: "from-[#FF4D6D] to-[#DC2626]",
    corTexto: "text-[#DC2626]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(255,77,109,0.28)]",
    rota: "/capacitacao/nivel-3",
    unidades: 6,
    badge: "Nível avançado",
    badgeCor: "bg-[#FF4D6D]/10 text-[#DC2626]",
  },
];

export default function Capacitacao() {
  return (
    <main className="min-h-screen bg-[#d7ddf0] px-6 py-16 text-[#1E293B]">

      {/* TOPO */}
      <section className="mx-auto mb-16 max-w-3xl text-center">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#3BA7FF]">
          Capacitação inteligente
        </p>
        <h1 className="mb-5 text-4xl font-black leading-tight md:text-7xl">
          Aprenda no seu
          <span className="bg-gradient-to-r from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] bg-clip-text text-transparent">
            {" "}ritmo
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-8 text-[#475569] md:text-lg">
          Escolha um tema para ir direto ao conteúdo, ou selecione o nível de
          suporte para seguir uma trilha progressiva e completa.
        </p>
      </section>

      {/* MÓDULOS */}
      <section className="mx-auto mb-6 max-w-7xl">
        <div className="mb-8">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#A855F7]">
            Unidades
          </p>
          <h2 className="text-2xl font-black md:text-4xl">
            O que você vai aprender
          </h2>
        </div>

        <ModulosAccordion />
      </section>

      {/* DIVISOR */}
      <div className="mx-auto my-16 max-w-7xl">
        <div className="flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#cbd5e1]" />
          <p className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#64748B] shadow-sm">
            ou siga uma trilha completa
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#cbd5e1]" />
        </div>
      </div>

      {/* NÍVEIS DE SUPORTE */}
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#FF4D6D]">
            Trilhas por nível
          </p>
          <h2 className="text-2xl font-black md:text-4xl">
            Nível de suporte
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#475569]">
            Cada trilha é uma sequência progressiva de aulas adaptadas ao perfil
            de quem você cuida.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {niveis.map((item) => (
            <Link
              key={item.titulo}
              href={item.rota}
              className={`group overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${item.cor} p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 ${item.corSombra}`}
            >
              <div className="flex h-full flex-col rounded-[2.5rem] bg-white p-8">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className={`text-3xl font-black ${item.corTexto}`}>
                      {item.titulo}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-[#94A3B8]">
                      {item.subtitulo}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.badgeCor}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="mb-8 leading-7 text-[#475569]">{item.descricao}</p>
                <div className="mt-auto flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#94A3B8]">
                    {item.unidades} unidades
                  </p>
                  <span
                    className={`rounded-full bg-gradient-to-r ${item.cor} px-4 py-2 text-xs font-bold text-white`}
                  >
                    Começar trilha →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-white px-8 py-6 text-center shadow-sm">
          <p className="text-sm leading-7 text-[#64748B]">
            💡 <strong>Não sabe qual nível escolher?</strong> Comece pelo Nível
            1. Ele apresenta os fundamentos essenciais para todos os cuidadores,
            independente do perfil da pessoa com TEA.
          </p>
        </div>
      </section>

    </main>
  );
}