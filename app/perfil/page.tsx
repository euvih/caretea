"use client";

import Link from "next/link";
import { useState } from "react";

// ── TIPOS ────────────────────────────────────────────────────────────────────
type ContatoApoio = { nome: string; telefone: string; relacao: string };
type PessoaTEA = {
  nome: string;
  idade: string;
  nivelSuporte: "1" | "2" | "3" | "";
  gatilhos: string[];
  estrategias: string[];
};

// ── DADOS ────────────────────────────────────────────────────────────────────
const unidades = [
  { titulo: "Entendendo o TEA", modulo: "Fundamentos", concluida: true, bg: "#EEF6FF", icon: "🧠" },
  { titulo: "Comunicação", modulo: "Fundamentos", concluida: true, bg: "#EEF6FF", icon: "💬" },
  { titulo: "Alimentação", modulo: "Desafios do dia a dia", concluida: false, bg: "#F5F0FF", icon: "🍽️" },
  { titulo: "Rotina e organização", modulo: "Desafios do dia a dia", concluida: false, bg: "#EEF6FF", icon: "📅" },
  { titulo: "Socialização", modulo: "Desafios do dia a dia", concluida: false, bg: "#F5F0FF", icon: "👥" },
  { titulo: "Crises e desregulação", modulo: "Situações críticas", concluida: false, bg: "#FFF0F3", icon: "⚡" },
  { titulo: "Regulação emocional", modulo: "Situações críticas", concluida: false, bg: "#FFF0F3", icon: "🧩" },
  { titulo: "Segurança", modulo: "Situações críticas", concluida: false, bg: "#FFFBEB", icon: "🛡️" },
  { titulo: "Autonomia", modulo: "Desenvolvimento e autonomia", concluida: false, bg: "#F0F9FF", icon: "🌱" },
  { titulo: "Cuidando do cuidador", modulo: "Saúde do cuidador", concluida: false, bg: "#FDF4FF", icon: "❤️" },
];
const modulos = [...new Set(unidades.map((u) => u.modulo))];

const perguntasCheckin = [
  { id: "sono", label: "Como foi seu sono esta noite?", opcoes: ["Muito ruim", "Ruim", "Regular", "Bom", "Ótimo"] },
  { id: "apoio", label: "Você teve apoio de alguém hoje?", opcoes: ["Não", "Quase nada", "Um pouco", "Sim", "Muito"] },
  { id: "energia", label: "Como está seu nível de energia?", opcoes: ["Esgotado", "Cansado", "Regular", "Bem", "Ótimo"] },
  { id: "emocional", label: "Como você se sente emocionalmente?", opcoes: ["Muito mal", "Mal", "Regular", "Bem", "Muito bem"] },
];

const gatilhosOpcoes = ["Sons altos", "Mudanças de rotina", "Ambientes lotados", "Texturas", "Luzes fortes", "Espera", "Transições", "Alimentação seletiva"];
const estrategiasOpcoes = ["Objeto de conforto", "Fones de ouvido", "Aviso antecipado", "Timer visual", "Espaço calmo", "Música favorita", "Rotina visual", "Pausa sensorial"];
const nivelLabels: Record<string, { label: string; cor: string; desc: string }> = {
  "1": { label: "Nível 1", cor: "#3BA7FF", desc: "Necessita de apoio" },
  "2": { label: "Nível 2", cor: "#A855F7", desc: "Necessita de apoio substancial" },
  "3": { label: "Nível 3", cor: "#FF4D6D", desc: "Necessita de apoio muito substancial" },
};

// ── CHECK-IN ─────────────────────────────────────────────────────────────────
function CheckinModal({ onConcluir }: { onConcluir: (score: number, respostas: Record<string, number>) => void }) {
  const [step, setStep] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});

  const pergunta = perguntasCheckin[step];
  const isUltima = step === perguntasCheckin.length - 1;

  const responder = (valor: number) => {
    const novas = { ...respostas, [pergunta.id]: valor };
    setRespostas(novas);
    if (isUltima) {
      const total = Object.values(novas).reduce((a, b) => a + b, 0);
      const score = Math.round((total / (perguntasCheckin.length * 4)) * 100);
      onConcluir(score, novas);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1.5rem",
    }}>
      <div style={{
        background: "#fff", borderRadius: 28, padding: "2rem 1.5rem",
        width: "100%", maxWidth: 400,
      }}>
        {/* progresso */}
        <div style={{ display: "flex", gap: 6, marginBottom: "1.75rem" }}>
          {perguntasCheckin.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 999,
              background: i <= step ? "#A855F7" : "#EEF2FF",
              transition: "background 0.3s",
            }} />
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 10 }}>
          Pergunta {step + 1} de {perguntasCheckin.length}
        </p>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1E293B", lineHeight: 1.3, marginBottom: "1.5rem" }}>
          {pergunta.label}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pergunta.opcoes.map((op, i) => (
            <button key={op} onClick={() => responder(i)} style={{
              background: "#F8FAFF", border: "1.5px solid #EEF2FF",
              borderRadius: 14, padding: "13px 16px",
              fontSize: 14, fontWeight: 600, color: "#1E293B",
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
              display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.15s",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "#EEF2FF", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#94A3B8", flexShrink: 0,
              }}>{i + 1}</span>
              {op}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PERFIL TEA MODAL ─────────────────────────────────────────────────────────
function PerfilTEAModal({ pessoa, onSalvar, onFechar }: {
  pessoa: PessoaTEA;
  onSalvar: (p: PessoaTEA) => void;
  onFechar: () => void;
}) {
  const [form, setForm] = useState<PessoaTEA>(pessoa);

  const toggleTag = (campo: "gatilhos" | "estrategias", valor: string) => {
    setForm((f) => ({
      ...f,
      [campo]: f[campo].includes(valor) ? f[campo].filter((x) => x !== valor) : [...f[campo], valor],
    }));
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)",
      overflowY: "auto", padding: "1.5rem",
    }}>
      <div style={{ background: "#fff", borderRadius: 28, padding: "1.75rem 1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>Perfil da pessoa com TEA</h3>
          <button onClick={onFechar} style={{ background: "#F1F5F9", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        {/* nome + idade */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Nome", val: form.nome, key: "nome", ph: "Ex: Lucas" },
            { label: "Idade", val: form.idade, key: "idade", ph: "Ex: 8" },
          ].map(({ label, val, key, ph }) => (
            <div key={key} style={{ flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</p>
              <input
                value={val}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                placeholder={ph}
                style={{
                  width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF",
                  background: "#F8FAFF", padding: "10px 12px",
                  fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          ))}
        </div>

        {/* nível de suporte */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Nível de suporte</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {(["1", "2", "3"] as const).map((n) => {
            const info = nivelLabels[n];
            const ativo = form.nivelSuporte === n;
            return (
              <button key={n} onClick={() => setForm((f) => ({ ...f, nivelSuporte: n }))} style={{
                flex: 1, borderRadius: 14, padding: "10px 6px",
                border: ativo ? `2px solid ${info.cor}` : "1.5px solid #EEF2FF",
                background: ativo ? info.cor + "12" : "#F8FAFF",
                cursor: "pointer", fontFamily: "inherit",
              }}>
                <p style={{ fontSize: 13, fontWeight: 800, color: ativo ? info.cor : "#94A3B8", marginBottom: 2 }}>{info.label}</p>
                <p style={{ fontSize: 10, color: ativo ? info.cor : "#CBD5E1", lineHeight: 1.3 }}>{info.desc}</p>
              </button>
            );
          })}
        </div>

        {/* gatilhos */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Gatilhos conhecidos</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {gatilhosOpcoes.map((g) => {
            const ativo = form.gatilhos.includes(g);
            return (
              <button key={g} onClick={() => toggleTag("gatilhos", g)} style={{
                borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                border: ativo ? "1.5px solid #FF4D6D" : "1.5px solid #EEF2FF",
                background: ativo ? "#FFF0F3" : "#F8FAFF",
                color: ativo ? "#FF4D6D" : "#94A3B8",
                cursor: "pointer", fontFamily: "inherit",
              }}>{g}</button>
            );
          })}
        </div>

        {/* estratégias */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Estratégias que funcionam</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {estrategiasOpcoes.map((e) => {
            const ativo = form.estrategias.includes(e);
            return (
              <button key={e} onClick={() => toggleTag("estrategias", e)} style={{
                borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                border: ativo ? "1.5px solid #3BA7FF" : "1.5px solid #EEF2FF",
                background: ativo ? "#EEF6FF" : "#F8FAFF",
                color: ativo ? "#3BA7FF" : "#94A3B8",
                cursor: "pointer", fontFamily: "inherit",
              }}>{e}</button>
            );
          })}
        </div>

        <button onClick={() => onSalvar(form)} style={{
          width: "100%", background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          border: "none", borderRadius: 16, padding: "14px",
          fontSize: 15, fontWeight: 800, color: "#fff",
          cursor: "pointer", fontFamily: "inherit",
        }}>Salvar perfil</button>
      </div>
    </div>
  );
}

// ── CONTATOS MODAL ────────────────────────────────────────────────────────────
function ContatosModal({ contatos, onSalvar, onFechar }: {
  contatos: ContatoApoio[];
  onSalvar: (c: ContatoApoio[]) => void;
  onFechar: () => void;
}) {
  const [lista, setLista] = useState<ContatoApoio[]>(contatos);
  const [novoNome, setNovoNome] = useState("");
  const [novoTel, setNovoTel] = useState("");
  const [novaRelacao, setNovaRelacao] = useState("");

  const adicionar = () => {
    if (!novoNome || !novoTel) return;
    setLista((l) => [...l, { nome: novoNome, telefone: novoTel, relacao: novaRelacao }]);
    setNovoNome(""); setNovoTel(""); setNovaRelacao("");
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)",
      overflowY: "auto", padding: "1.5rem",
    }}>
      <div style={{ background: "#fff", borderRadius: 28, padding: "1.75rem 1.5rem", maxWidth: 500, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>Rede de apoio</h3>
          <button onClick={onFechar} style={{ background: "#F1F5F9", border: "none", borderRadius: 10, width: 34, height: 34, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        {/* lista */}
        {lista.length === 0 && (
          <p style={{ fontSize: 13, color: "#94A3B8", textAlign: "center", marginBottom: 16 }}>Nenhum contato adicionado ainda.</p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {lista.map((c, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "#F8FAFF", borderRadius: 14, padding: "12px 14px",
              border: "0.5px solid rgba(59,167,255,0.1)",
            }}>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 2 }}>{c.nome}</p>
                <p style={{ fontSize: 12, color: "#94A3B8" }}>{c.relacao} • {c.telefone}</p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a href={`tel:${c.telefone}`} style={{
                  background: "#EEF6FF", border: "none", borderRadius: 10,
                  width: 34, height: 34, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 16, textDecoration: "none",
                }}>📞</a>
                <button onClick={() => setLista((l) => l.filter((_, j) => j !== i))} style={{
                  background: "#FFF0F3", border: "none", borderRadius: 10,
                  width: 34, height: 34, cursor: "pointer", fontSize: 14, color: "#FF4D6D",
                }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* adicionar */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Adicionar contato</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {[
            { val: novoNome, set: setNovoNome, ph: "Nome" },
            { val: novoTel, set: setNovoTel, ph: "Telefone" },
            { val: novaRelacao, set: setNovaRelacao, ph: "Relação (ex: terapeuta, mãe...)" },
          ].map(({ val, set, ph }) => (
            <input key={ph} value={val} onChange={(e) => set(e.target.value)} placeholder={ph} style={{
              width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF",
              background: "#F8FAFF", padding: "10px 12px",
              fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit",
            }} />
          ))}
          <button onClick={adicionar} style={{
            background: "#EEF6FF", border: "1.5px solid #3BA7FF40",
            borderRadius: 12, padding: "11px", fontSize: 13, fontWeight: 700,
            color: "#3BA7FF", cursor: "pointer", fontFamily: "inherit",
          }}>+ Adicionar</button>
        </div>

        <button onClick={() => onSalvar(lista)} style={{
          width: "100%", background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          border: "none", borderRadius: 16, padding: "14px",
          fontSize: 15, fontWeight: 800, color: "#fff",
          cursor: "pointer", fontFamily: "inherit",
        }}>Salvar contatos</button>
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function Perfil() {
  const [nome, setNome] = useState("Vitória Kelly");
  const [email, setEmail] = useState("vitoria@email.com");
  const [sobre, setSobre] = useState("Cuidadora há 3 anos. Mãe de uma criança com TEA nível 2.");
  const [editando, setEditando] = useState(false);
  const [nomeTemp, setNomeTemp] = useState(nome);
  const [emailTemp, setEmailTemp] = useState(email);
  const [sobreTemp, setSobreTemp] = useState(sobre);

  // check-in
  const [checkinAberto, setCheckinAberto] = useState(false);
  const [scoreCheckin, setScoreCheckin] = useState<number | null>(62);
  const [respostasCheckin, setRespostasCheckin] = useState<Record<string, number>>({
    sono: 1, apoio: 0, energia: 1, emocional: 1,
  });

  // perfil TEA
  const [perfilTEAAberto, setPerfilTEAAberto] = useState(false);
  const [pessoaTEA, setPessoaTEA] = useState<PessoaTEA>({
    nome: "Lucas", idade: "8",
    nivelSuporte: "2",
    gatilhos: ["Sons altos", "Mudanças de rotina"],
    estrategias: ["Objeto de conforto", "Aviso antecipado"],
  });

  // contatos
  const [contatosAberto, setContatosAberto] = useState(false);
  const [contatos, setContatos] = useState<ContatoApoio[]>([
    { nome: "Dra. Ana Paula", telefone: "84999990001", relacao: "Terapeuta" },
    { nome: "Marcos (pai)", telefone: "84999990002", relacao: "Familiar" },
  ]);

  const concluidas = unidades.filter((u) => u.concluida).length;
  const progresso = Math.round((concluidas / unidades.length) * 100);
  const circunferencia = 2 * Math.PI * 52;
  const offset = circunferencia - (progresso / 100) * circunferencia;

  const salvar = () => { setNome(nomeTemp); setEmail(emailTemp); setSobre(sobreTemp); setEditando(false); };
  const cancelar = () => { setNomeTemp(nome); setEmailTemp(email); setSobreTemp(sobre); setEditando(false); };

  // score → cor e status
  const scoreInfo = scoreCheckin === null ? null : scoreCheckin >= 70
    ? { cor: "#10B981", label: "Bem-estar saudável", emoji: "🟢" }
    : scoreCheckin >= 40
    ? { cor: "#F59E0B", label: "Atenção moderada", emoji: "🟡" }
    : { cor: "#FF4D6D", label: "Sobrecarga detectada", emoji: "🔴" };

  const alertasCheckin = () => {
    const alertas = [];
    if (respostasCheckin.sono !== undefined && respostasCheckin.sono <= 1)
      alertas.push({ icon: "🌙", text: "Sono abaixo do recomendado — tente descansar hoje" });
    if (respostasCheckin.apoio !== undefined && respostasCheckin.apoio <= 1)
      alertas.push({ icon: "👥", text: "Você está sem apoio — considere acionar sua rede" });
    if (respostasCheckin.energia !== undefined && respostasCheckin.energia <= 1)
      alertas.push({ icon: "⚡", text: "Energia baixa detectada — faça uma pausa breve" });
    if (alertas.length === 0)
      alertas.push({ icon: "✨", text: "Você está indo bem. Continue cuidando de si." });
    return alertas;
  };

  // badges dinâmicos
  const nivelLabel = concluidas >= 8 ? "Nível Expert" : concluidas >= 5 ? "Nível Avançado" : concluidas >= 2 ? "Nível Intermediário" : "Nível Iniciante";
  const certificados = Math.floor(concluidas / 3);
  const nivelTEA = pessoaTEA.nivelSuporte ? nivelLabels[pessoaTEA.nivelSuporte] : null;

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "5rem",
    }}>

      {/* MODAIS */}
      {checkinAberto && (
        <CheckinModal onConcluir={(score, respostas) => {
          setScoreCheckin(score);
          setRespostasCheckin(respostas);
          setCheckinAberto(false);
        }} />
      )}
      {perfilTEAAberto && (
        <PerfilTEAModal
          pessoa={pessoaTEA}
          onSalvar={(p) => { setPessoaTEA(p); setPerfilTEAAberto(false); }}
          onFechar={() => setPerfilTEAAberto(false)}
        />
      )}
      {contatosAberto && (
        <ContatosModal
          contatos={contatos}
          onSalvar={(c) => { setContatos(c); setContatosAberto(false); }}
          onFechar={() => setContatosAberto(false)}
        />
      )}

      {/* TOP BAR */}
      <header style={{
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(59,167,255,0.15)",
        padding: "0 1.5rem", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3BA7FF" }} />
          <span style={{ fontFamily: "Georgia, serif", fontWeight: 600, fontSize: 20, color: "#152641", letterSpacing: "-0.02em" }}>CareTEA</span>
        </div>
        <Link href="/" style={{ fontSize: 13, color: "#3BA7FF", textDecoration: "none" }}>← Início</Link>
      </header>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem 1rem 0" }}>

        {/* ── HERO PERFIL CUIDADOR ── */}
        <section style={{
          background: "linear-gradient(135deg, #3BA7FF 0%, #A855F7 60%, #FF4D6D 100%)",
          borderRadius: 24, padding: "2rem 1.5rem 1.5rem",
          marginBottom: "1rem", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.10)", pointerEvents: "none" }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem", position: "relative" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div style={{
                width: 68, height: 68, borderRadius: "50%",
                background: "rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, fontWeight: 700, color: "#fff",
                border: "3px solid rgba(255,255,255,0.5)",
              }}>{nome.charAt(0)}</div>
              <button type="button" onClick={() => setEditando(true)} style={{
                position: "absolute", bottom: 0, right: 0, width: 26, height: 26,
                borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.08)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
              }}>✏️</button>
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: 2 }}>
                Cuidadora principal
              </p>
              {!editando ? (
                <>
                  <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 600, color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{nome}</h1>
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

          {/* badges dinâmicos */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", position: "relative" }}>
            {[
              nivelLabel,
              certificados > 0 ? `${certificados} certificado${certificados > 1 ? "s" : ""}` : "Sem certificados",
              nivelTEA ? `TEA — ${nivelTEA.label}` : "TEA — não definido",
            ].map((b) => (
              <span key={b} style={{
                fontSize: 12, padding: "4px 14px", borderRadius: 20,
                background: "rgba(255,255,255,0.2)", color: "#fff",
                fontWeight: 500, border: "0.5px solid rgba(255,255,255,0.35)",
              }}>{b}</span>
            ))}
          </div>
        </section>

        {/* ── SOS ── */}
        <Link href="/sos" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#FF4D6D", borderRadius: 16, padding: "1rem 1.25rem",
          marginBottom: "1rem", textDecoration: "none",
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

        {/* ── PERFIL DA PESSOA COM TEA ── */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600 }}>Pessoa com TEA</p>
            <button onClick={() => setPerfilTEAAberto(true)} style={{
              background: "#EEF6FF", border: "none", borderRadius: 10,
              padding: "5px 12px", fontSize: 12, fontWeight: 700, color: "#3BA7FF",
              cursor: "pointer", fontFamily: "inherit",
            }}>Editar</button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "1rem" }}>
            <div style={{
              width: 52, height: 52, borderRadius: 16,
              background: nivelTEA ? nivelTEA.cor + "18" : "#EEF2FF",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0,
            }}>🧒</div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: "#1E293B", marginBottom: 2 }}>
                {pessoaTEA.nome || "—"}{pessoaTEA.idade ? `, ${pessoaTEA.idade} anos` : ""}
              </p>
              {nivelTEA && (
                <span style={{
                  fontSize: 12, fontWeight: 700, color: nivelTEA.cor,
                  background: nivelTEA.cor + "15", borderRadius: 999,
                  padding: "3px 10px",
                }}>{nivelTEA.label} — {nivelTEA.desc}</span>
              )}
            </div>
          </div>

          {pessoaTEA.gatilhos.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Gatilhos</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {pessoaTEA.gatilhos.map((g) => (
                  <span key={g} style={{ fontSize: 12, fontWeight: 600, color: "#FF4D6D", background: "#FFF0F3", borderRadius: 999, padding: "4px 12px" }}>{g}</span>
                ))}
              </div>
            </div>
          )}
          {pessoaTEA.estrategias.length > 0 && (
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>O que funciona</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {pessoaTEA.estrategias.map((e) => (
                  <span key={e} style={{ fontSize: 12, fontWeight: 600, color: "#3BA7FF", background: "#EEF6FF", borderRadius: 999, padding: "4px 12px" }}>{e}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── BEM-ESTAR DO CUIDADOR (check-in dinâmico) ── */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600 }}>Bem-estar do cuidador</p>
            {scoreInfo && <span style={{ fontSize: 12, color: scoreInfo.cor, fontWeight: 600 }}>{scoreInfo.emoji} {scoreInfo.label}</span>}
          </div>

          {scoreCheckin !== null ? (
            <>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: "1rem" }}>
                <div>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 44, fontWeight: 300, color: scoreInfo?.cor ?? "#A855F7", lineHeight: 1 }}>{scoreCheckin}</p>
                  <p style={{ fontSize: 12, color: "#94A3B8" }}>de 100</p>
                </div>
                <div style={{ flex: 1, paddingBottom: 20 }}>
                  <div style={{ background: "#EEF2FF", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 6 }}>
                    <div style={{ height: "100%", width: `${scoreCheckin}%`, borderRadius: 4, background: `linear-gradient(90deg, #3BA7FF, ${scoreInfo?.cor ?? "#A855F7"})`, transition: "width 0.6s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8" }}>
                    <span>Baixo</span><span>Moderado</span><span>Alto</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                {alertasCheckin().map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#475569", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0 }}>{icon}</span>{text}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 14, lineHeight: 1.6 }}>
              Faça o check-in diário para monitorar seu bem-estar e receber alertas personalizados.
            </p>
          )}

          <button onClick={() => setCheckinAberto(true)} style={{
            width: "100%", background: "linear-gradient(90deg, #A855F7, #3BA7FF)",
            border: "none", borderRadius: 14, padding: "12px",
            fontSize: 13, fontWeight: 700, color: "#fff",
            cursor: "pointer", fontFamily: "inherit",
          }}>
            {scoreCheckin !== null ? "🔄 Refazer check-in de hoje" : "✦ Fazer check-in de bem-estar"}
          </button>
        </section>

        {/* ── REDE DE APOIO ── */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.25rem", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
            <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600 }}>Rede de apoio</p>
            <button onClick={() => setContatosAberto(true)} style={{
              background: "#EEF6FF", border: "none", borderRadius: 10,
              padding: "5px 12px", fontSize: 12, fontWeight: 700, color: "#3BA7FF",
              cursor: "pointer", fontFamily: "inherit",
            }}>Gerenciar</button>
          </div>

          {contatos.length === 0 ? (
            <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 12 }}>Nenhum contato salvo ainda.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {contatos.map((c, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  background: "#F8FAFF", borderRadius: 14, padding: "10px 14px",
                  border: "0.5px solid rgba(59,167,255,0.1)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EEF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👤</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 1 }}>{c.nome}</p>
                      <p style={{ fontSize: 11, color: "#94A3B8" }}>{c.relacao}</p>
                    </div>
                  </div>
                  <a href={`tel:${c.telefone}`} style={{
                    background: "#3BA7FF", borderRadius: 10, width: 36, height: 36,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, textDecoration: "none",
                  }}>📞</a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── PROGRESSO CAPACITAÇÃO ── */}
        <section style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)", padding: "1.5rem", marginBottom: "1rem" }}>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94A3B8", fontWeight: 600, marginBottom: "1rem" }}>Minha capacitação</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <svg width={110} height={110} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={55} cy={55} r={46} fill="none" stroke="#EEF2FF" strokeWidth={9} />
                <circle cx={55} cy={55} r={46} fill="none" stroke="#3BA7FF" strokeWidth={9}
                  strokeDasharray={`${2 * Math.PI * 46}`}
                  strokeDashoffset={2 * Math.PI * 46 - (progresso / 100) * 2 * Math.PI * 46}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, color: "#3BA7FF", lineHeight: 1 }}>{progresso}%</span>
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 400, color: "#152641", lineHeight: 1, marginBottom: 4 }}>{concluidas}/{unidades.length}</p>
              <p style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>unidades concluídas</p>
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
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: u.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{u.icon}</div>
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

        {/* ── SAIR ── */}
        <button type="button" style={{
          width: "100%", borderRadius: 16,
          border: "1px solid rgba(255,77,109,0.3)",
          background: "rgba(255,255,255,0.75)",
          padding: "1rem", fontSize: 13, fontWeight: 600,
          color: "#FF4D6D", cursor: "pointer", fontFamily: "inherit",
          marginBottom: "1rem",
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