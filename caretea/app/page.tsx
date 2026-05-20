import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#d7ddf0] text-[#1E293B]">

      {/* BACKGROUND DECOR */}
      <div className="absolute left-[-120px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#3BA7FF]/30 blur-3xl" />

      <div className="absolute right-[-100px] top-[120px] h-[320px] w-[320px] rounded-full bg-[#A855F7]/25 blur-3xl" />

      <div className="absolute bottom-[-120px] left-[15%] h-[320px] w-[320px] rounded-full bg-[#FFD93D]/25 blur-3xl" />

      <div className="absolute bottom-[-80px] right-[15%] h-[280px] w-[280px] rounded-full bg-[#FF4D6D]/20 blur-3xl" />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center px-6 py-8">

        <div className="relative z-10 mx-auto max-w-7xl">

          {/* LOGO */}
          <div className="mb-1 flex justify-center">
            <img
              src="/cordaorender.png"
              alt="CareTEA"
              className="w-10 md:w-60"
            />
          </div>

          {/* TITULO */}
          <div className="text-center">

            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#3BA7FF]">
              Plataforma inteligente para cuidadores
            </p>

            <h1 className="mb-8 text-5xl font-black leading-tight md:text-8xl">

              <span className="text-[#152641]">
                Care
              </span>

              <span className="bg-gradient-to-r  from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] bg-clip-text text-transparent">
                TEA
              </span>

            </h1>

            <p className="mx-auto mb-9 max-w-3xl text-sm leading-5 text-[#1356b4] md:text-2xl">
              Capacitação, apoio emocional e assistência imediata
              para reduzir o esgotamento de cuidadores de pessoas
              com TEA.
            </p>

          </div>

          {/* BOTÕES PRINCIPAIS */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

            {/* CAPACITAÇÃO */}
            <Link
              href="/capacitacao"
              className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3BA7FF] to-[#2563EB] p-[1px] shadow-[0_15px_40px_rgba(59,167,255,0.18)] transition duration-300 hover:-translate-y-2"
            >
              <div className="rounded-[2rem] bg-white p-6">

                <h2 className="mb-3 text-2xl font-bold text-[#3BA7FF]">
                 🎓 Capacitação 
                </h2>

                <p className="leading-8 text-[#475569]">
                  Aulas, simulações, vídeos e orientações para
                  diferentes níveis de suporte do TEA.
                </p>

              </div>
            </Link>

            {/* SOS */}
            <Link
              href="/sos"
              className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FF4D6D] to-[#DC2626] p-[1px] shadow-[0_15px_40px_rgba(255,77,109,0.18)] transition duration-300 hover:-translate-y-2"
            >
              <div className="rounded-[2rem] bg-white p-6">

                <h2 className="mb-3 text-2xl font-bold text-[#FF4D6D]">
                  🚨 SOS 
                </h2>

                <p className="leading-8 text-[#475569]">
                  Ajuda rápida em momentos de crise sensorial,
                  agressividade e sobrecarga emocional.
                </p>

              </div>
            </Link>

            {/* PERFIL */}
            <Link
              href="/perfil"
              className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] p-[1px] shadow-[0_15px_40px_rgba(168,85,247,0.18)] transition duration-300 hover:-translate-y-2"
            >
              <div className="rounded-[2rem] bg-white p-6">

                <h2 className="mb-3 text-2xl font-bold text-[#A855F7]">
                  👤 Perfil 
                </h2>

                <p className="leading-8 text-[#475569]">
                  Acompanhe progresso, histórico de aprendizado
                  e indicadores emocionais do cuidador.
                </p>

              </div>
            </Link>

            {/* COMPONENTES */}
            <Link
              href="/componentes"
              className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFD93D] to-[#F59E0B] p-[1px] shadow-[0_15px_40px_rgba(255,217,61,0.20)] transition duration-300 hover:-translate-y-2"
            >
              <div className="rounded-[2rem] bg-white p-6">

                <h2 className="mb-3 text-2xl font-bold text-[#C58A00]">
                  🧩 Componentes
                </h2>

                <p className="leading-8 text-[#475569]">
                  Recursos visuais, ferramentas práticas e apoio
                  complementar para o cuidado diário.
                </p>

              </div>
            </Link>

          </div>

        </div>

      </section>

      {/* DIFERENCIAL */}
      <section className="relative px-6 pb-24">

        <div className="mx-auto max-w-6xl rounded-[3rem] bg-gradient-to-r from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] p-[1px]">

          <div className="rounded-[3rem] bg-white px-8 py-16 text-center md:px-20">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#FFD93D]">
              Nosso diferencial
            </p>

            <h2 className="mb-8 text-4xl font-black leading-tight md:text-6xl">
              Mais do que informação.
              <br />
              Um sistema de apoio real.
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-9 text-[#475569]">
              O CareTEA combina tecnologia, acolhimento e
              capacitação prática para transformar a rotina de
              cuidadores de pessoas com TEA.
            </p>

          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#dbe7ff] bg-white/70 px-6 py-10 text-center backdrop-blur-md">

        <p className="font-medium text-[#64748B]">
          © 2026 CareTEA • Startup acadêmica de inovação em saúde
        </p>

      </footer>

    </main>
  );
}