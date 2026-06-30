import Link from "next/link";
import ModulosAccordion from "./ModulosAccordion";

export default function Capacitacao() {
  return (
    <main className="min-h-screen bg-[#05132b] px-5 py-14 pb-28 text-white">

      {/* TOPO */}
      <section className=" text-center mx-auto mb-10 max-w-lg">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-[#3BA7FF]">
          Capacitação
        </p>
        <h1 className="mb-3 text-4xl font-black leading-tight md:text-5xl">
          Aprenda no seu
          <span className="bg-gradient-to-r from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] bg-clip-text text-transparent">
            {" "}ritmo
          </span>
        </h1>
        <p className="text-sm leading-7 text-[#afbfd4]">
          Conteúdo para cuidadores. Escolha um módulo e comece agora.
        </p>
      </section>

      {/* MÓDULOS */}
      <section className="mx-auto max-w-lg">
        <ModulosAccordion />
      </section>

      {/* BOTTOM NAV */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(5,13,26,0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "0.5px solid rgba(59,167,255,0.12)",
        display: "flex", padding: "8px 0 12px", zIndex: 10,
      }}>
        {[
          { icon: "🏠", label: "Início", href: "/" },
          { icon: "👤", label: "Perfil", href: "/perfil" },
          { icon: "📚", label: "Aprender", href: "/capacitacao", active: true },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 0",
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#475569", fontWeight: active ? 600 : 400 }}>
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}