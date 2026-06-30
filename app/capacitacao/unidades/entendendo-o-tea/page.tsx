"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── TIPOS ─────────────────────────────────────────────────────────────────
type Medalha = { id: string; emoji: string; titulo: string; desbloqueada: boolean };
type Modulo  = {
  id: string; titulo: string; descricao: string; emoji: string;
  cor: string; corClara: string; xp: number; aulas: number;
  minutos: number; dificuldade: "Iniciante" | "Intermediário" | "Avançado";
  desbloqueado: boolean; concluido: boolean; progresso: number;
  link: string;
};

// ─── DADOS ─────────────────────────────────────────────────────────────────
const MODULOS: Modulo[] = [
  {
    id: "tea", titulo: "Entendendo o TEA", emoji: "🧠",
    descricao: "Fundamentos do espectro, como ele se manifesta e o que isso muda no cuidado.",
    cor: "#3BA7FF", corClara: "#EEF6FF", xp: 200, aulas: 5, minutos: 45,
    dificuldade: "Iniciante", desbloqueado: true, concluido: false, progresso: 60,
    link: "/capacitacao/unidades/entendendo-o-tea",
  },
  {
    id: "comunicacao", titulo: "Comunicação", emoji: "💬",
    descricao: "Como se comunicar com quem tem TEA, evitar gatilhos e apoiar a fala.",
    cor: "#A855F7", corClara: "#F5F0FF", xp: 240, aulas: 6, minutos: 55,
    dificuldade: "Iniciante", desbloqueado: false, concluido: false, progresso: 0,
    link: "/capacitacao/unidades/comunicacao",
  },
  {
    id: "rotina", titulo: "Rotina e Estrutura", emoji: "📅",
    descricao: "Montagem de rotinas visuais, antecipação de mudanças e previsibilidade.",
    cor: "#22C55E", corClara: "#ECFDF5", xp: 260, aulas: 6, minutos: 60,
    dificuldade: "Intermediário", desbloqueado: false, concluido: false, progresso: 0,
    link: "/capacitacao/unidades/rotina",
  },
  {
    id: "crise", titulo: "Crises e Regulação", emoji: "⚡",
    descricao: "Prevenção, resposta e recuperação. Como agir com calma e eficácia.",
    cor: "#FF4D6D", corClara: "#FFF0F3", xp: 300, aulas: 7, minutos: 65,
    dificuldade: "Intermediário", desbloqueado: false, concluido: false, progresso: 0,
    link: "/capacitacao/unidades/crises",
  },
  {
    id: "sensorial", titulo: "Processamento Sensorial", emoji: "🌡️",
    descricao: "Hiper e hipossensibilidade, adaptações de ambiente e suporte sensorial.",
    cor: "#F59E0B", corClara: "#FFFBEB", xp: 280, aulas: 6, minutos: 58,
    dificuldade: "Intermediário", desbloqueado: false, concluido: false, progresso: 0,
    link: "/capacitacao/unidades/sensorial",
  },
  {
    id: "autocuidado", titulo: "Autocuidado do Cuidador", emoji: "❤️",
    descricao: "Saúde emocional, prevenção de burnout e rede de apoio.",
    cor: "#EC4899", corClara: "#FDF2F8", xp: 220, aulas: 5, minutos: 42,
    dificuldade: "Avançado", desbloqueado: false, concluido: false, progresso: 0,
    link: "/capacitacao/unidades/autocuidado",
  },
];

const MEDALHAS: Medalha[] = [
  { id: "primeiro", emoji: "⭐", titulo: "Primeira aula", desbloqueada: true },
  { id: "streak3",  emoji: "🔥", titulo: "3 dias seguidos", desbloqueada: true },
  { id: "xp100",   emoji: "💎", titulo: "100 XP ganhos", desbloqueada: true },
  { id: "tea",      emoji: "🧠", titulo: "Módulo TEA", desbloqueada: false },
  { id: "quiz10",   emoji: "🏆", titulo: "10 quizzes", desbloqueada: false },
  { id: "streak7",  emoji: "🌟", titulo: "7 dias seguidos", desbloqueada: false },
];

const NIVEIS = [
  { min: 0,    max: 200,  titulo: "Cuidador Iniciante",    cor: "#64748B" },
  { min: 200,  max: 500,  titulo: "Cuidador Preparado",    cor: "#3BA7FF" },
  { min: 500,  max: 1000, titulo: "Cuidador Experiente",   cor: "#A855F7" },
  { min: 1000, max: 2000, titulo: "Especialista CareTEA",  cor: "#F59E0B" },
  { min: 2000, max: 9999, titulo: "Mentor CareTEA",        cor: "#FF4D6D" },
];

const FRASES_MOTIVACAO = [
  "Você estudou 3 dias seguidos. Continue assim! 🔥",
  "Faltam apenas 80 XP para subir de nível! 💎",
  "Você já completou 60% do módulo TEA.",
  "Cada aula concluída é um cuidado melhor amanhã. 💙",
];

// ─── HOOKS ─────────────────────────────────────────────────────────────────
function useGameState() {
  const [xp, setXp]             = useState(120);
  const [streak, setStreak]     = useState(3);
  const [minHoje, setMinHoje]   = useState(15);
  const [xpHoje, setXpHoje]     = useState(40);
  const [metaDias, setMetaDias] = useState(5);

  const nivel = NIVEIS.find(n => xp >= n.min && xp < n.max) ?? NIVEIS[0];
  const xpParaProximo = nivel.max - xp;
  const pctNivel = Math.round(((xp - nivel.min) / (nivel.max - nivel.min)) * 100);

  return { xp, streak, minHoje, xpHoje, metaDias, nivel, xpParaProximo, pctNivel };
}

// ─── COMPONENTES AUXILIARES ─────────────────────────────────────────────────

// Barra de XP animada
function XPBar({ pct, cor }: { pct: number; cor: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), 300); return () => clearTimeout(t); }, [pct]);
  return (
    <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 999,
        background: `linear-gradient(90deg, ${cor}, ${cor}cc)`,
        width: `${width}%`,
        transition: "width 1s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: `0 0 8px ${cor}66`,
      }} />
    </div>
  );
}

// Streak badge animado
function StreakBadge({ streak }: { streak: number }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const t = setInterval(() => { setPulse(p => !p); }, 2000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 5,
      background: "rgba(251,146,60,0.12)",
      border: "1px solid rgba(251,146,60,0.25)",
      borderRadius: 999, padding: "5px 12px",
      transition: "box-shadow 0.4s",
      boxShadow: pulse ? "0 0 12px rgba(251,146,60,0.3)" : "none",
    }}>
      <span style={{ fontSize: 14 }}>🔥</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: "#FB923C" }}>{streak}</span>
      <span style={{ fontSize: 10, color: "#94A3B8", fontWeight: 600 }}>dias</span>
    </div>
  );
}

// Card de stat do dashboard
function StatCard({ icon, valor, label, cor, sub }: {
  icon: string; valor: string | number; label: string; cor: string; sub?: string;
}) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 18, padding: "1rem",
      display: "flex", flexDirection: "column", gap: 6,
      transition: "border-color 0.2s",
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${cor}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 17,
      }}>{icon}</div>
      <div>
        <p style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{valor}</p>
        {sub && <p style={{ fontSize: 11, color: cor, fontWeight: 700, marginTop: 1 }}>{sub}</p>}
        <p style={{ fontSize: 11, color: "#475569", marginTop: 2, fontWeight: 500 }}>{label}</p>
      </div>
    </div>
  );
}

// Dias da semana (meta semanal)
function MetaSemanal({ streak }: { streak: number }) {
  const dias = ["S", "T", "Q", "Q", "S", "S", "D"];
  const hoje = new Date().getDay();
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {dias.map((d, i) => {
        const concluido = i < Math.min(streak, 7);
        const ehHoje = i === hoje;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
            <div style={{
              width: "100%", aspectRatio: "1",
              borderRadius: 10,
              background: concluido ? "#3BA7FF" : ehHoje ? "rgba(59,167,255,0.12)" : "rgba(255,255,255,0.04)",
              border: ehHoje && !concluido ? "1.5px solid rgba(59,167,255,0.4)" : "1px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11,
              transition: "all 0.3s",
              boxShadow: concluido ? "0 0 8px rgba(59,167,255,0.3)" : "none",
            }}>
              {concluido ? <span style={{ color: "#fff", fontSize: 12 }}>✓</span> : null}
            </div>
            <span style={{ fontSize: 9, color: ehHoje ? "#3BA7FF" : "#334155", fontWeight: ehHoje ? 800 : 400 }}>{d}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── TRILHA ────────────────────────────────────────────────────────────────

// Card de módulo na trilha
function ModuloCard({ modulo, index, total }: { modulo: Modulo; index: number; total: number }) {
  const [hovered, setHovered] = useState(false);
  const isEsquerda = index % 2 === 0;
  const isUltimo = index === total - 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

      {/* Conector para próximo */}
      {!isUltimo && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 2,
          height: 40,
          background: modulo.concluido
            ? `linear-gradient(to bottom, ${modulo.cor}, ${MODULOS[index + 1]?.cor ?? modulo.cor})`
            : "rgba(255,255,255,0.06)",
          zIndex: 0,
        }} />
      )}

      {/* Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          background: hovered && modulo.desbloqueado
            ? `rgba(255,255,255,0.05)` : "rgba(255,255,255,0.03)",
          border: modulo.desbloqueado
            ? `1px solid ${modulo.cor}30`
            : "1px solid rgba(255,255,255,0.06)",
          borderLeft: modulo.desbloqueado ? `3px solid ${modulo.cor}` : "3px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: "1.1rem",
          position: "relative", zIndex: 1,
          transition: "all 0.22s",
          transform: hovered && modulo.desbloqueado ? "translateY(-2px)" : "none",
          opacity: modulo.desbloqueado ? 1 : 0.45,
          cursor: modulo.desbloqueado ? "pointer" : "default",
          marginBottom: 40,
        }}
      >
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
          {/* Ícone */}
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: modulo.desbloqueado ? `${modulo.cor}18` : "rgba(255,255,255,0.04)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
            border: modulo.desbloqueado ? `1px solid ${modulo.cor}25` : "1px solid rgba(255,255,255,0.06)",
          }}>
            {modulo.desbloqueado ? modulo.emoji : "🔒"}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badges topo */}
            <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
              <span style={{
                fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                padding: "2px 7px", borderRadius: 999,
                background: modulo.desbloqueado ? `${modulo.cor}18` : "rgba(255,255,255,0.04)",
                color: modulo.desbloqueado ? modulo.cor : "#334155",
              }}>
                {modulo.dificuldade}
              </span>
              <span style={{
                fontSize: 9, fontWeight: 700,
                padding: "2px 7px", borderRadius: 999,
                background: "rgba(255,255,255,0.04)", color: "#475569",
              }}>
                +{modulo.xp} XP
              </span>
            </div>

            <h3 style={{
              fontSize: 14, fontWeight: 800,
              color: modulo.desbloqueado ? "#fff" : "#334155",
              lineHeight: 1.25, marginBottom: 3,
            }}>
              {modulo.titulo}
            </h3>
            <p style={{ fontSize: 11, color: "#475569", lineHeight: 1.5 }}>
              {modulo.descricao}
            </p>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 12, marginBottom: modulo.progresso > 0 ? 10 : 0 }}>
          {[
            { icon: "📖", val: `${modulo.aulas} aulas` },
            { icon: "⏱", val: `${modulo.minutos} min` },
          ].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11 }}>{m.icon}</span>
              <span style={{ fontSize: 10, color: "#475569", fontWeight: 500 }}>{m.val}</span>
            </div>
          ))}
        </div>

        {/* Barra de progresso */}
        {modulo.progresso > 0 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{ fontSize: 10, color: "#475569" }}>Progresso</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: modulo.cor }}>{modulo.progresso}%</span>
            </div>
            <XPBar pct={modulo.progresso} cor={modulo.cor} />
          </div>
        )}

        {/* Botão / status */}
        {modulo.desbloqueado && (
          <Link href={modulo.link} style={{ textDecoration: "none" }}>
            <div style={{
              marginTop: 12,
              background: modulo.concluido
                ? "rgba(34,197,94,0.12)"
                : `linear-gradient(135deg, ${modulo.cor}28, ${modulo.cor}18)`,
              border: modulo.concluido
                ? "1px solid rgba(34,197,94,0.25)"
                : `1px solid ${modulo.cor}30`,
              borderRadius: 12, padding: "10px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <span style={{
                fontSize: 12, fontWeight: 700,
                color: modulo.concluido ? "#22C55E" : modulo.cor,
              }}>
                {modulo.concluido ? "✓ Concluído" : modulo.progresso > 0 ? "Continuar" : "Começar"}
              </span>
              {!modulo.concluido && (
                <span style={{ fontSize: 13, color: modulo.cor }}>→</span>
              )}
            </div>
          </Link>
        )}

        {/* Cadeado */}
        {!modulo.desbloqueado && (
          <div style={{
            marginTop: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "10px 14px",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 12 }}>🔒</span>
            <span style={{ fontSize: 11, color: "#334155" }}>
              Conclua o módulo anterior para desbloquear
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── HEADER DO AVATAR ──────────────────────────────────────────────────────
function AvatarHeader({ xp, nivel, pctNivel, xpParaProximo, streak }: {
  xp: number; nivel: ReturnType<typeof useGameState>["nivel"];
  pctNivel: number; xpParaProximo: number; streak: number;
}) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(59,167,255,0.08), rgba(168,85,247,0.06))",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: 24, padding: "1.25rem",
      marginBottom: "1.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
        {/* Avatar */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: `linear-gradient(135deg, ${nivel.cor}30, ${nivel.cor}15)`,
            border: `2px solid ${nivel.cor}50`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26,
          }}>
            💙
          </div>
          <div style={{
            position: "absolute", bottom: -4, right: -4,
            background: nivel.cor, borderRadius: 999,
            padding: "2px 6px",
            fontSize: 9, fontWeight: 900, color: "#fff",
            border: "2px solid #050D1A",
          }}>
            Nv.2
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, color: "#475569", fontWeight: 600, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Seu nível atual
          </p>
          <p style={{ fontSize: 15, fontWeight: 900, color: "#fff", marginBottom: 2 }}>{nivel.titulo}</p>
          <p style={{ fontSize: 11, color: nivel.cor, fontWeight: 600 }}>{xp} XP · Faltam {xpParaProximo} para subir</p>
        </div>

        {/* Streak */}
        <StreakBadge streak={streak} />
      </div>

      {/* Barra de nível */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: "#334155" }}>Progresso do nível</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: nivel.cor }}>{pctNivel}%</span>
        </div>
        <XPBar pct={pctNivel} cor={nivel.cor} />
      </div>
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ───────────────────────────────────────────────────────
export default function Capacitacao() {
  const game = useGameState();
  const [fraseIdx] = useState(() => Math.floor(Math.random() * FRASES_MOTIVACAO.length));
  const [tab, setTab] = useState<"trilha" | "conquistas">("trilha");
  const [mostrarTodas, setMostrarTodas] = useState(false);

  // Próxima aula desbloqueada
  const proximoModulo = MODULOS.find(m => m.desbloqueado && !m.concluido);

  return (
    <main style={{
      minHeight: "100dvh",
      background: "#050D1A",
      color: "#fff",
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      paddingBottom: 90,
    }}>

      {/* ── HEADER ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(5,13,26,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(59,167,255,0.10)",
        padding: "14px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#3BA7FF", marginBottom: 1 }}>
            CareTEA
          </p>
          <p style={{ fontSize: 16, fontWeight: 900, color: "#fff" }}>Capacitação</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(59,167,255,0.12)", border: "1px solid rgba(59,167,255,0.2)",
            borderRadius: 999, padding: "5px 12px",
          }}>
            <span style={{ fontSize: 13 }}>💎</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#3BA7FF" }}>{game.xp} XP</span>
          </div>
          <Link href="/sos" style={{
            width: 36, height: 36, borderRadius: 12,
            background: "rgba(255,77,109,0.12)", border: "1px solid rgba(255,77,109,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 15, textDecoration: "none",
          }}>🆘</Link>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px 0" }}>

        {/* ── AVATAR + NÍVEL ── */}
        <AvatarHeader
          xp={game.xp}
          nivel={game.nivel}
          pctNivel={game.pctNivel}
          xpParaProximo={game.xpParaProximo}
          streak={game.streak}
        />

        {/* ── FRASE MOTIVACIONAL ── */}
        <div style={{
          background: "rgba(59,167,255,0.06)",
          border: "1px solid rgba(59,167,255,0.15)",
          borderRadius: 14, padding: "10px 14px",
          marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>💙</span>
          <p style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
            {FRASES_MOTIVACAO[fraseIdx]}
          </p>
        </div>

        {/* ── DASHBOARD STATS ── */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155", marginBottom: 10 }}>
            Hoje
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <StatCard icon="⏱" valor={`${game.minHoje}min`} label="Estudados hoje" cor="#3BA7FF" sub="Meta: 20 min" />
            <StatCard icon="⚡" valor={`+${game.xpHoje}`} label="XP ganho hoje" cor="#A855F7" sub="de 50 XP" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <StatCard icon="📚" valor="3" label="Aulas concluídas" cor="#22C55E" />
            <StatCard icon="🏆" valor="3" label="Conquistas" cor="#F59E0B" />
          </div>

          {/* Meta semanal */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 18, padding: "1rem",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#CBD5E1" }}>Meta semanal</p>
              <span style={{ fontSize: 11, color: "#3BA7FF", fontWeight: 700 }}>{game.streak} de {game.metaDias} dias</span>
            </div>
            <MetaSemanal streak={game.streak} />
          </div>
        </div>

        {/* ── PRÓXIMA AULA ── */}
        {proximoModulo && (
          <div style={{ marginBottom: "1.5rem" }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#334155", marginBottom: 10 }}>
              Continue de onde parou
            </p>
            <Link href={proximoModulo.link} style={{ textDecoration: "none" }}>
              <div style={{
                background: `linear-gradient(135deg, ${proximoModulo.cor}18, ${proximoModulo.cor}08)`,
                border: `1px solid ${proximoModulo.cor}30`,
                borderRadius: 20, padding: "1.1rem",
                display: "flex", gap: 14, alignItems: "center",
                transition: "transform 0.2s",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                  background: `${proximoModulo.cor}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24,
                }}>
                  {proximoModulo.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 10, color: proximoModulo.cor, fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    Em andamento · +{proximoModulo.xp} XP
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 4 }}>{proximoModulo.titulo}</p>
                  <XPBar pct={proximoModulo.progresso} cor={proximoModulo.cor} />
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 12, flexShrink: 0,
                  background: proximoModulo.cor,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, color: "#fff",
                }}>→</div>
              </div>
            </Link>
          </div>
        )}

        {/* ── TABS ── */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 4 }}>
          {(["trilha", "conquistas"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "9px 0", borderRadius: 10, border: "none",
              background: tab === t ? "rgba(59,167,255,0.15)" : "transparent",
              color: tab === t ? "#3BA7FF" : "#475569",
              fontSize: 12, fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.2s",
              textTransform: "capitalize",
            }}>
              {t === "trilha" ? "🗺 Trilha" : "🏆 Conquistas"}
            </button>
          ))}
        </div>

        {/* ── TRILHA ── */}
        {tab === "trilha" && (
          <div>
            {/* Progresso da trilha */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18, padding: "1rem", marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#CBD5E1" }}>Progresso geral</p>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#3BA7FF" }}>
                  {MODULOS.filter(m => m.concluido).length}/{MODULOS.length} módulos
                </span>
              </div>
              <XPBar pct={Math.round((MODULOS.filter(m => m.concluido).length / MODULOS.length) * 100)} cor="#3BA7FF" />
              <p style={{ fontSize: 10, color: "#334155", marginTop: 6, textAlign: "right" }}>
                {MODULOS.filter(m => m.concluido).length === 0
                  ? "Comece pelo primeiro módulo!"
                  : `${Math.round((MODULOS.filter(m => m.concluido).length / MODULOS.length) * 100)}% da trilha concluída`}
              </p>
            </div>

            {/* Mapa da trilha */}
            <div style={{ position: "relative" }}>
              {/* Linha de fundo */}
              <div style={{
                position: "absolute",
                left: "50%", top: 0, bottom: 0,
                width: 2, transform: "translateX(-50%)",
                background: "rgba(255,255,255,0.04)",
                zIndex: 0,
              }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {MODULOS.map((modulo, i) => (
                  <ModuloCard key={modulo.id} modulo={modulo} index={i} total={MODULOS.length} />
                ))}
              </div>

              {/* Coroa final */}
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 8, paddingTop: 8,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, #F59E0B30, #F59E0B10)",
                  border: "2px solid rgba(245,158,11,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26,
                }}>👑</div>
                <p style={{ fontSize: 11, color: "#475569", textAlign: "center" }}>Certificado CareTEA</p>
              </div>
            </div>
          </div>
        )}

        {/* ── CONQUISTAS ── */}
        {tab === "conquistas" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: "1rem" }}>
              {MEDALHAS.map((m) => (
                <div key={m.id} style={{
                  background: m.desbloqueada ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                  border: m.desbloqueada ? "1px solid rgba(245,158,11,0.25)" : "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 16, padding: "1rem 0.5rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  opacity: m.desbloqueada ? 1 : 0.4,
                  transition: "all 0.2s",
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: m.desbloqueada ? "rgba(245,158,11,0.15)" : "rgba(255,255,255,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 22,
                    filter: m.desbloqueada ? "none" : "grayscale(1)",
                  }}>
                    {m.emoji}
                  </div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: m.desbloqueada ? "#CBD5E1" : "#334155", textAlign: "center", lineHeight: 1.3 }}>
                    {m.titulo}
                  </p>
                  {m.desbloqueada && (
                    <span style={{ fontSize: 9, color: "#F59E0B", fontWeight: 700 }}>✓ Conquistada</span>
                  )}
                </div>
              ))}
            </div>

            {/* Próximas conquistas */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 18, padding: "1rem",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", marginBottom: 10 }}>Próximas conquistas</p>
              {[
                { emoji: "🧠", texto: "Conclua o módulo TEA", progresso: 60 },
                { emoji: "🌟", texto: "7 dias consecutivos", progresso: Math.round((3/7)*100) },
                { emoji: "🏆", texto: "10 quizzes respondidos", progresso: 30 },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 12 : 0 }}>
                  <span style={{ fontSize: 18, filter: "grayscale(0.7)" }}>{c.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 11, color: "#64748B", marginBottom: 4 }}>{c.texto}</p>
                    <XPBar pct={c.progresso} cor="#F59E0B" />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#F59E0B", minWidth: 30, textAlign: "right" }}>{c.progresso}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── BOTTOM NAV ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(5,13,26,0.97)",
        backdropFilter: "blur(16px)",
        borderTop: "0.5px solid rgba(59,167,255,0.10)",
        display: "flex", padding: "10px 0 14px", zIndex: 10,
      }}>
        {[
          { icon: "🏠", label: "Início",     href: "/" },
          { icon: "👤", label: "Perfil",     href: "/perfil" },
          { icon: "📚", label: "Aprender",   href: "/capacitacao", active: true },
          { icon: "📅", label: "Rotina",     href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link key={label} href={href} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 0",
          }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#334155", fontWeight: active ? 700 : 400 }}>
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </main>
  );
}