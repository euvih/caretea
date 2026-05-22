import Link from "next/link";

export default function Home() {
  return (
    <>
      <main style={{
        minHeight: "100vh",
        background: "#d7ddf0",
        color: "#1E293B",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        overflow: "hidden",
        paddingBottom: "80px",
        position: "relative",
      }}>

        <style>{`
          .card-blue:hover  { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(59,167,255,0.18); }
          .card-red:hover   { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(255,77,109,0.18); }
          .card-purple:hover{ transform: translateY(-4px); box-shadow: 0 12px 32px rgba(168,85,247,0.18); }
          .card-blue, .card-red, .card-purple { transition: transform 0.2s, box-shadow 0.2s; }
        `}</style>

        {/* BACKGROUND DECOR */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 280, height: 280, borderRadius: "50%", background: "rgba(59,167,255,0.20)", filter: "blur(80px)", pointerEvents: "none", transform: "translate(-40%, -30%)" }} />
        <div style={{ position: "absolute", right: 0, top: 120, width: 280, height: 280, borderRadius: "50%", background: "rgba(168,85,247,0.15)", filter: "blur(80px)", pointerEvents: "none", transform: "translateX(30%)" }} />
        <div style={{ position: "absolute", bottom: 200, left: "15%", width: 260, height: 260, borderRadius: "50%", background: "rgba(255,217,61,0.12)", filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: 100, right: 0, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,77,109,0.10)", filter: "blur(80px)", pointerEvents: "none", transform: "translateX(20%)" }} />

        {/* HERO */}
        <section style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 1.25rem 2rem",
          textAlign: "center",
        }}>

          <div style={{ marginBottom: "0.5rem" }}>
            <img src="/cordaorender.png" alt="CareTEA" style={{ width: 48 }} />
          </div>

          <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.45em", color: "#3BA7FF", marginBottom: "0.75rem" }}>
            Plataforma inteligente para cuidadores
          </p>

          <h1 style={{ fontSize: "clamp(3rem, 12vw, 6rem)", fontWeight: 900, lineHeight: 1, marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
            <span style={{ color: "#152641" }}>Care</span>
            <span style={{ background: "linear-gradient(90deg, #3BA7FF, #A855F7, #FF4D6D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TEA</span>
          </h1>

          <p style={{ maxWidth: 480, fontSize: "clamp(0.85rem, 3vw, 1.05rem)", lineHeight: 1.7, color: "#334E8A", marginBottom: "2rem" }}>
            Capacitação prática, suporte emergencial e acompanhamento
            personalizado para cuidadores de pessoas com TEA.
          </p>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
            border: "0.5px solid rgba(255,255,255,0.7)", borderRadius: 999,
            padding: "8px 18px", fontSize: 12, color: "#475569", marginBottom: "2.5rem",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3BA7FF", flexShrink: 0 }} />
            Mais do que informação — um sistema de apoio real
          </div>

          {/* 3 CARDS CORE */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
            width: "100%",
            maxWidth: 900,
          }}>

            <Link href="/capacitacao" style={{ textDecoration: "none" }}>
              <div className="card-blue" style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(10px)",
                borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.7)",
                borderTop: "4px solid #3BA7FF", padding: "1.5rem", textAlign: "left",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🎓</div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#152641", marginBottom: 6 }}>Capacitação</h2>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#475569", marginBottom: 14 }}>
                  Aulas organizadas por nível de suporte, simulações práticas e orientações para o dia a dia com TEA.
                </p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#3BA7FF", display: "flex", alignItems: "center", gap: 4 }}>
                  Acessar módulos →
                </span>
              </div>
            </Link>

            <Link href="/sos" style={{ textDecoration: "none" }}>
              <div className="card-red" style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(10px)",
                borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.7)",
                borderTop: "4px solid #FF4D6D", padding: "1.5rem", textAlign: "left",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🚨</div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#152641", marginBottom: 6 }}>SOS Cuidador</h2>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#475569", marginBottom: 14 }}>
                  Ajuda imediata em crises sensoriais, sobrecarga emocional e situações de emergência.
                </p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#FF4D6D", display: "flex", alignItems: "center", gap: 4 }}>
                  Acionar SOS →
                </span>
              </div>
            </Link>

            <Link href="/perfil" style={{ textDecoration: "none" }}>
              <div className="card-purple" style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(10px)",
                borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.7)",
                borderTop: "4px solid #A855F7", padding: "1.5rem", textAlign: "left",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>👤</div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#152641", marginBottom: 6 }}>Perfil Personalizado</h2>
                <p style={{ fontSize: 13, lineHeight: 1.65, color: "#475569", marginBottom: 14 }}>
                  Cadastro do perfil da pessoa com TEA para personalizar conteúdos, orientações e protocolos de crise.
                </p>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#A855F7", display: "flex", alignItems: "center", gap: 4 }}>
                  Ver meu perfil →
                </span>
              </div>
            </Link>

          </div>
        </section>

        {/* DIFERENCIAL */}
        <section style={{ padding: "1rem 1.25rem 2rem" }}>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            background: "rgba(255,255,255,0.65)", backdropFilter: "blur(10px)",
            borderRadius: 24, border: "0.5px solid rgba(255,255,255,0.7)",
            padding: "2rem 1.5rem", textAlign: "center",
          }}>
            <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.3em", color: "#A855F7", marginBottom: 12 }}>
              Nosso diferencial
            </p>
            <h2 style={{ fontSize: "clamp(1.4rem, 5vw, 2.2rem)", fontWeight: 900, color: "#152641", lineHeight: 1.25, marginBottom: 14 }}>
              Foco no cuidador,<br />não só no autista.
            </h2>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "#475569", maxWidth: 520, margin: "0 auto 1.5rem" }}>
              Enquanto outras soluções focam apenas na pessoa com TEA ou em conteúdos genéricos,
              o CareTEA acompanha a rotina emocional do cuidador e oferece suporte real para situações do dia a dia.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
              {[
                { label: "Suporte imediato", color: "#FF4D6D", bg: "rgba(255,77,109,0.08)" },
                { label: "Capacitação prática", color: "#3BA7FF", bg: "rgba(59,167,255,0.08)" },
                { label: "Prevenção do burnout", color: "#A855F7", bg: "rgba(168,85,247,0.08)" },
              ].map(({ label, color, bg }) => (
                <span key={label} style={{
                  fontSize: 12, fontWeight: 600, color, background: bg,
                  border: `1px solid ${color}40`, borderRadius: 999, padding: "6px 16px",
                }}>{label}</span>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{
          borderTop: "0.5px solid rgba(200,209,232,0.6)",
          background: "rgba(255,255,255,0.55)",
          padding: "1.25rem 1.5rem",
          textAlign: "center",
          backdropFilter: "blur(8px)",
        }}>
          <p style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>
            © 2026 CareTEA • Startup acadêmica de inovação em saúde
          </p>
        </footer>

      </main>

      {/* NAV FORA do main — não sofre overflow: hidden */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        borderTop: "0.5px solid rgba(59,167,255,0.15)",
        display: "flex", padding: "8px 0 12px", zIndex: 10,
      }}>
        {[
          { icon: "🏠", label: "Início", href: "/", active: true },
          { icon: "👤", label: "Perfil", href: "/perfil" },
          { icon: "📚", label: "Aprender", href: "/capacitacao" },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 0",
          }}>
            <span style={{ fontSize: 20 }}>{icon}</span>
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#94A3B8", fontWeight: active ? 600 : 400 }}>
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </>
  );
}