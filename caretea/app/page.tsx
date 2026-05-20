import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#d7ddf0] text-[#1E293B]">

      {/* BACKGROUND DECOR */}
      <div className="absolute left-[-120px] top-[-100px] h-[320px] w-[320px] rounded-full bg-[#3BA7FF]/20 blur-3xl" />
      <div className="absolute right-[-100px] top-[120px] h-[320px] w-[320px] rounded-full bg-[#A855F7]/15 blur-3xl" />
      <div className="absolute bottom-[-120px] left-[15%] h-[320px] w-[320px] rounded-full bg-[#FFD93D]/15 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[15%] h-[280px] w-[280px] rounded-full bg-[#FF4D6D]/12 blur-3xl" />

      {/* HERO */}
      <section className="relative flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-8">
        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* LOGO */}
          <div className="mb-2 flex justify-center">
            <img src="/cordaorender.png" alt="CareTEA" className="w-10 md:w-60" />
          </div>

          {/* TITULO */}
          <div className="text-center mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#3BA7FF]">
              Plataforma inteligente para cuidadores
            </p>
            <h1 className="mb-5 text-5xl font-black leading-tight md:text-8xl">
              <span className="text-[#152641]">Care</span>
              <span className="bg-gradient-to-r from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] bg-clip-text text-transparent">TEA</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm leading-6 text-[#334E8A] md:text-lg md:leading-8">
              Capacitação, apoio emocional e assistência imediata
              para reduzir o esgotamento de cuidadores de pessoas com TEA.
            </p>
          </div>

          {/* CARDS */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

            <Link href="/capacitacao"
              className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md border-t-4 border-t-[#3BA7FF]">
              <h2 className="mb-2 text-lg font-bold text-[#1E293B]">🎓 Capacitação</h2>
              <p className="text-sm leading-6 text-[#475569]">
                Aulas, simulações, vídeos e orientações para diferentes níveis de suporte do TEA.
              </p>
            </Link>

            <Link href="/sos"
              className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md border-t-4 border-t-[#FF4D6D]">
              <h2 className="mb-2 text-lg font-bold text-[#1E293B]">🚨 SOS</h2>
              <p className="text-sm leading-6 text-[#475569]">
                Ajuda rápida em momentos de crise sensorial, agressividade e sobrecarga emocional.
              </p>
            </Link>

            <Link href="/componentes"
              className="group rounded-2xl bg-white/80 backdrop-blur-sm border border-white/60 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md border-t-4 border-t-[#FFD93D]">
              <h2 className="mb-2 text-lg font-bold text-[#1E293B]">🧩 Componentes</h2>
              <p className="text-sm leading-6 text-[#475569]">
                Recursos visuais, ferramentas práticas e apoio complementar para o cuidado diário.
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* DIFERENCIAL */}
      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white/70 backdrop-blur-sm border border-white/60 px-8 py-14 text-center md:px-20 shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#A855F7]">
            Nosso diferencial
          </p>
          <h2 className="mb-6 text-3xl font-black leading-tight text-[#152641] md:text-5xl">
            Mais do que informação.<br />
            Um sistema de apoio real.
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-[#475569]">
            O CareTEA combina tecnologia, acolhimento e capacitação prática
            para transformar a rotina de cuidadores de pessoas com TEA.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#c8d1e8] bg-white/60 px-6 py-8 text-center backdrop-blur-md mb-16">
        <p className="text-sm font-medium text-[#64748B]">
          © 2026 CareTEA • Startup acadêmica de inovação em saúde
        </p>
      </footer>

      {/* BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-10 flex border-t border-[#c8d1e8] bg-white/90 backdrop-blur-md px-0 pb-3 pt-2">
        {[
          { icon: "🏠", label: "Início", href: "/", active: true },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👤", label: "Perfil", href: "/perfil" },
          { icon: "📚", label: "Aprender", href: "/capacitacao" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href}
            className="flex flex-1 flex-col items-center gap-1 py-1 no-underline">
            <span className="text-xl">{icon}</span>
            <span className={`text-[10px] font-${active ? "600" : "400"} ${active ? "text-[#3BA7FF]" : "text-[#94A3B8]"}`}>
              {label}
            </span>
          </Link>
        ))}
      </nav>

    </main>
  );
}