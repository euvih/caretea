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
      {/* BOTTOM NAV */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.90)", backdropFilter: "blur(12px)",
        borderTop: "0.5px solid rgba(59,167,255,0.15)",
        display: "flex", padding: "8px 0 12px", zIndex: 10,
      }}>
        {[
          { icon: "🏠", label: "Início", href: "/" },
          { icon: "👤", label: "Perfil", href: "/perfil", active: true },
          { icon: "📚", label: "Aprender", href: "/capacitacao" },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 0",
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#94A3B8", fontWeight: active ? 600 : 400 }}>{label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}