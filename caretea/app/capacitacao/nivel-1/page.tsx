import Link from "next/link";

const unidades = [
  {
    titulo: "Entendendo o TEA",
    descricao:
      "Aprenda o que é o Transtorno do Espectro Autista, sinais, comportamentos e necessidades do nível 1.",
    cor: "from-[#3BA7FF] to-[#2563EB]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(59,167,255,0.25)]",
    corBarra: "from-[#3BA7FF] to-[#2563EB]",
    icone: "🧠",
    rota: "/capacitacao/nivel-1/unidade-1",
    progresso: 20,
  },
  {
    titulo: "Comunicação",
    descricao:
      "Como se comunicar melhor, evitar gatilhos e criar conexões mais saudáveis.",
    cor: "from-[#A855F7] to-[#7E22CE]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(168,85,247,0.25)]",
    corBarra: "from-[#A855F7] to-[#7E22CE]",
    icone: "💬",
    rota: "/capacitacao/nivel-1/unidade-2",
    progresso: 0,
  },
  {
    titulo: "Crises e desregulação",
    descricao:
      "Como identificar sinais antes das crises e agir de forma segura e acolhedora.",
    cor: "from-[#FF4D6D] to-[#DC2626]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(255,77,109,0.25)]",
    corBarra: "from-[#FF4D6D] to-[#DC2626]",
    icone: "🆘",
    rota: "/capacitacao/nivel-1/unidade-3",
    progresso: 0,
  },
  {
    titulo: "Rotina e organização",
    descricao:
      "Estratégias para criar previsibilidade e reduzir ansiedade no dia a dia.",
    cor: "from-[#FFD93D] to-[#F59E0B]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(255,217,61,0.25)]",
    corBarra: "from-[#FFD93D] to-[#F59E0B]",
    icone: "📅",
    rota: "/capacitacao/nivel-1/unidade-4",
    progresso: 0,
  },
  {
    titulo: "Socialização",
    descricao:
      "Ajude no desenvolvimento social e na adaptação em ambientes externos.",
    cor: "from-[#38BDF8] to-[#0EA5E9]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(56,189,248,0.25)]",
    corBarra: "from-[#38BDF8] to-[#0EA5E9]",
    icone: "👥",
    rota: "/capacitacao/nivel-1/unidade-5",
    progresso: 0,
  },
  {
    titulo: "Cuidando do cuidador",
    descricao:
      "Aprenda a identificar burnout, sobrecarga emocional e esgotamento.",
    cor: "from-[#F472B6] to-[#DB2777]",
    corSombra: "hover:shadow-[0_25px_50px_rgba(244,114,182,0.25)]",
    corBarra: "from-[#F472B6] to-[#DB2777]",
    icone: "❤️",
    rota: "/capacitacao/nivel-1/unidade-6",
    progresso: 0,
  },
];

export default function Nivel1() {
  return (
    <main className="min-h-screen bg-[#d7ddf0] px-5 py-10 text-[#1E293B]">

      {/* TOPO */}
      <section className="mx-auto max-w-6xl">

        <Link
          href="/capacitacao"
          className="mb-10 inline-flex rounded-full bg-white px-5 py-3 font-medium text-[#475569] shadow-md transition hover:scale-105"
        >
          ← Voltar
        </Link>

        <div className="mb-12 text-center">

          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#3BA7FF]">
            Capacitação • Nível 1
          </p>

          <h1 className="text-3xl font-black md:text-7xl">
            <span className="text-[#152641]">Suporte</span>
            <span className="bg-gradient-to-r from-[#3BA7FF] to-[#2563EB] bg-clip-text text-transparent">
              {" "}Nível 1
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#475569] md:text-base">
            6 unidades de aprendizagem para cuidadores de pessoas com TEA nível 1.
            Avance no seu ritmo.
          </p>

          {/* PROGRESSO GERAL */}
          <div className="mx-auto mt-6 max-w-sm">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-semibold text-[#64748B]">Progresso geral</span>
              <span className="text-xs font-bold text-[#3BA7FF]">1 / 6 unidades</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
              <div className="h-full w-[16%] rounded-full bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] transition-all duration-700" />
            </div>
          </div>

        </div>

      </section>

      {/* UNIDADES */}
      <section className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 xl:grid-cols-3">

        {unidades.map((unidade, index) => (
          <Link
            key={index}
            href={unidade.rota}
            className={`group overflow-hidden rounded-[2.5rem] bg-gradient-to-br ${unidade.cor} p-[1px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-2 ${unidade.corSombra}`}
          >
            <div className="flex h-full flex-col rounded-[2.5rem] bg-white p-8">

              {/* NÚMERO + ÍCONE */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#f4f7ff] text-3xl">
                  {unidade.icone}
                </div>
                <span className={`text-5xl font-black bg-gradient-to-br ${unidade.cor} bg-clip-text text-transparent opacity-20`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mb-4 text-2xl font-black text-[#1E293B]">
                {unidade.titulo}
              </h2>

              <p className="mb-8 leading-8 text-[#475569]">
                {unidade.descricao}
              </p>

              {/* PROGRESSO */}
              <div className="mt-auto">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#64748B]">
                    {unidade.progresso > 0 ? "Em andamento" : "Não iniciado"}
                  </p>
                  <p className="text-xs font-bold text-[#94A3B8]">
                    {unidade.progresso}%
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${unidade.corBarra} transition-all duration-700`}
                    style={{ width: `${unidade.progresso}%` }}
                  />
                </div>
              </div>

            </div>
          </Link>
        ))}

      </section>

    </main>
  );
}