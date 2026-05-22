"use client";

import Link from "next/link";
import { useState } from "react";

const unidades = [
  { titulo: "Entendendo o TEA", modulo: "Fundamentos", concluida: true, bg: "#EEF6FF", color: "#1356b4", icon: "🧠" },
  { titulo: "Comunicação", modulo: "Fundamentos", concluida: true, bg: "#EEF6FF", color: "#1356b4", icon: "💬" },
  { titulo: "Alimentação", modulo: "Desafios do dia a dia", concluida: false, bg: "#F5F0FF", color: "#7E22CE", icon: "🍽️" },
  { titulo: "Rotina e organização", modulo: "Desafios do dia a dia", concluida: false, bg: "#EEF6FF", color: "#2563EB", icon: "📅" },
  { titulo: "Socialização", modulo: "Desafios do dia a dia", concluida: false, bg: "#F5F0FF", color: "#6D28D9", icon: "👥" },
  { titulo: "Crises e desregulação", modulo: "Situações críticas", concluida: false, bg: "#FFF0F3", color: "#BE123C", icon: "⚡" },
  { titulo: "Regulação emocional", modulo: "Situações críticas", concluida: false, bg: "#FFF0F3", color: "#9F1239", icon: "🧩" },
  { titulo: "Segurança", modulo: "Situações críticas", concluida: false, bg: "#FFFBEB", color: "#B45309", icon: "🛡️" },
  { titulo: "Autonomia", modulo: "Desenvolvimento e autonomia", concluida: false, bg: "#F0F9FF", color: "#0369A1", icon: "🌱" },
  { titulo: "Cuidando do cuidador", modulo: "Saúde do cuidador", concluida: false, bg: "#FDF4FF", color: "#7E22CE", icon: "❤️" },
];

const modulos = [...new Set(unidades.map((u) => u.modulo))];

const configuracoes = [
  { icon: "🔔", titulo: "Notificações", descricao: "Lembretes de estudo" },
  { icon: "🌙", titulo: "Tema escuro", descricao: "Aparência do app" },
  { icon: "🔒", titulo: "Privacidade", descricao: "Dados e permissões" },
  { icon: "❓", titulo: "Ajuda e suporte", descricao: "Dúvidas e contato" },
];

export default function Perfil() {
  const [nome, setNome] = useState("Vitória Kelly");
  const [email, setEmail] = useState("vitoria@email.com");
  const [sobre, setSobre] = useState("Cuidadora há 3 anos. Mãe de uma criança com TEA nível 2.");
  const [editando, setEditando] = useState(false);
  const [nomeTemp, setNomeTemp] = useState(nome);
  const [emailTemp, setEmailTemp] = useState(email);
  const [sobreTemp, setSobreTemp] = useState(sobre);

  const concluidas = unidades.filter((u) => u.concluida).length;
  const progresso = Math.round((concluidas / unidades.length) * 100);
  const circunferencia = 2 * Math.PI * 52;
  const offset = circunferencia - (progresso / 100) * circunferencia;

  const salvar = () => { setNome(nomeTemp); setEmail(emailTemp); setSobre(sobreTemp); setEditando(false); };
  const cancelar = () => { setNomeTemp(nome); setEmailTemp(email); setSobreTemp(sobre); setEditando(false); };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B",
      paddingBottom: "5rem",
    }}>

      {/* TOP BAR */}
      <header style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(59,167,255,0.15)",
        padding: "0 1.5rem",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3BA7FF" }} />
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: 20, color: "#152641", letterSpacing: "-0.02em" }}>
            CareTEA
          </span>
        </div>
        <Link href="/capacitacao" style={{ fontSize: 13, color: "#3BA7FF", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          ← Voltar
        </Link>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem 0" }}>

        {/* HERO DO PERFIL */}
        <section style={{
          background: "linear-gradient(135deg, #3BA7FF 0%, #A855F7 60%, #FF4D6D 100%)",
          borderRadius: 24,
          padding: "2rem 1.5rem 1.5rem",
          marginBottom: "1rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.10)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 50, bottom: -50, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem", position: "relative" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, fontWeight: 700, color: "#fff",
                border: "3px solid rgba(255,255,255,0.5)",
              }}>
                {nome.charAt(0)}
              </div>
              <button type="button" onClick={() => setEditando(true)} style={{
                position: "absolute", bottom: 0, right: 0,
                width: 26, height: 26, borderRadius: "50%",
                background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
              }}>✏️</button>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: 2 }}>
                Cuidadora principal
              </p>
              {!editando ? (
                <>
                  <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{nome}</h1>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: 6 }}>{email}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5, marginBottom: 10 }}>{sobre}</p>
                  <button type="button" onClick={() => setEditando(true)} style={{
                    fontSize: 12, fontWeight: 600, color: "#fff",
                    background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.4)",
                    borderRadius: 20, padding: "5px 16px", cursor: "pointer",
                  }}>Editar perfil</button>
                </>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[{ val: nomeTemp, set: setNomeTemp, ph: "Seu nome" }, { val: emailTemp, set: setEmailTemp, ph: "Seu e-mail" }].map(({ val, set, ph }) => (
                    <input key={ph} value={val} onChange={(e) => set(e.target.value)} placeholder={ph} style={{
                      width: "100%", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.5)",
                      background: "rgba(255,255,255,0.2)", padding: "8px 14px",
                      fontSize: 13, color: "#fff", outline: "none", fontFamily: "inherit",
                    }} />
                  ))}
                  <textarea value={sobreTemp} onChange={(e) => setSobreTemp(e.target.value)} rows={2} placeholder="Sobre você" style={{
                    width: "100%", borderRadius: 12, border: "1.5px solid rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.2)", padding: "8px 14px",
                    fontSize: 13, color: "#fff", outline: "none", resize: "none", fontFamily: "inherit",
                  }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button type="button" onClick={salvar} style={{
                      background: "#fff", color: "#152641", border: "none",
                      borderRadius: 20, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}>Salvar</button>
                    <button type="button" onClick={cancelar} style={{
                      background: "rgba(255,255,255,0.15)", color: "#fff",
                      border: "0.5px solid rgba(255,255,255,0.4)",
                      borderRadius: 20, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    }}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", position: "relative" }}>
            {["Nível Avançado", "3 certificados", "TEA — Nível 2"].map((b) => (
              <span key={b} style={{
                fontSize: 12, padding: "4px 14px", borderRadius: 20,
                background: "rgba(255,255,255,0.2)", color: "#fff",
                fontWeight: 500, border: "0.5px solid rgba(255,255,255,0.35)",
              }}>{b}</span>
            ))}
          </div>
        </section>

        {/* BOTÃO SOS */}
        <Link href="/sos" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#FF4D6D", borderRadius: 16, padding: "1rem 1.25rem",
          marginBottom: "1.5rem", textDecoration: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🚨</div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>Botão SOS — Preciso de ajuda agora</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>Protocolo imediato para crises · Guia passo a passo</p>
            </div>
          </div>
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 20 }}>›</span>
        </Link>

        {/* PROGRESSO GERAL */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600, marginBottom: "1rem" }}>Minha capacitação</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <svg width={120} height={120} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={60} cy={60} r={52} fill="none" stroke="#EEF2FF" strokeWidth={10} />
                <circle cx={60} cy={60} r={52} fill="none" stroke="#3BA7FF" strokeWidth={10}
                  strokeDasharray={`${circunferencia}`} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 400, color: "#3BA7FF", lineHeight: 1 }}>{progresso}%</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 400, color: "#152641", lineHeight: 1, marginBottom: 4 }}>{concluidas}/{unidades.length}</p>
              <p style={{ fontSize: 13, color: "#64748B", marginBottom: 6 }}>unidades concluídas</p>
              <p style={{ fontSize: 12, color: "#94A3B8" }}>{unidades.length - concluidas} restantes</p>
            </div>
          </div>

          {modulos.map((mod) => (
            <div key={mod} style={{ marginBottom: "1rem" }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94A3B8", fontWeight: 600, marginBottom: 8 }}>{mod}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {unidades.filter((u) => u.modulo === mod).map((u, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: "#F8FAFF", borderRadius: 12, padding: "10px 14px",
                    border: "0.5px solid rgba(59,167,255,0.1)",
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: u.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
                      {u.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.titulo}</p>
                    </div>
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: u.concluida ? "#3BA7FF" : "transparent",
                      border: u.concluida ? "none" : "1.5px solid #CBD5E1",
                      fontSize: 11, color: u.concluida ? "#fff" : "#CBD5E1", fontWeight: 700,
                    }}>{u.concluida ? "✓" : "·"}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* DETECTOR DE ESGOTAMENTO */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.5rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600 }}>Bem-estar do cuidador</p>
            <span style={{ fontSize: 12, color: "#B45309", fontWeight: 600 }}>Atenção moderada</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: "1rem" }}>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 300, color: "#A855F7", lineHeight: 1 }}>62</p>
              <p style={{ fontSize: 12, color: "#94A3B8" }}>de 100</p>
            </div>
            <div style={{ flex: 1, paddingBottom: 20 }}>
              <div style={{ background: "#EEF2FF", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 6 }}>
                <div style={{ height: "100%", width: "62%", borderRadius: 4, background: "linear-gradient(90deg, #3BA7FF, #A855F7, #FF4D6D)" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8" }}>
                <span>Baixo</span><span>Moderado</span><span>Alto</span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { icon: "🌙", text: "Sono médio abaixo do recomendado nos últimos 5 dias" },
              { icon: "👥", text: "Você não registra rede de apoio ativa esta semana" },
              { icon: "✨", text: "Tente um exercício de pausa guiada — leva 3 minutos" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>{icon}</span>
                {text}
              </div>
            ))}
          </div>
        </section>

        {/* CONFIGURAÇÕES */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600, marginBottom: "1rem" }}>Configurações</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {configuracoes.map(({ icon, titulo, descricao }) => (
              <button key={titulo} type="button" style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#F8FAFF", border: "0.5px solid rgba(59,167,255,0.1)",
                borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                textAlign: "left", width: "100%", fontFamily: "inherit",
              }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                  {icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", marginBottom: 2 }}>{titulo}</p>
                  <p style={{ fontSize: 12, color: "#94A3B8" }}>{descricao}</p>
                </div>
                <span style={{ color: "#CBD5E1", fontSize: 18 }}>›</span>
              </button>
            ))}
          </div>
        </section>

        {/* SAIR */}
        <button type="button" style={{
          width: "100%", borderRadius: 16,
          border: "1px solid rgba(255,77,109,0.3)",
          background: "rgba(255,255,255,0.75)",
          padding: "1rem", fontSize: 13, fontWeight: 600,
          color: "#FF4D6D", cursor: "pointer", fontFamily: "inherit",
        }}>Sair da conta</button>

      </div>

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