"use client";

import { useState } from "react";
import Link from "next/link";

// ── TIPOS ────────────────────────────────────────────────────────────────────
type Periodo = "manha" | "tarde" | "noite";
type HumorTEA = "otimo" | "bom" | "regular" | "dificil" | "crise";
type TipoAtividade = "higiene" | "alimentacao" | "terapia" | "escola" | "lazer" | "descanso" | "outro";

type Atividade = {
  id: string;
  titulo: string;
  horario: string;
  periodo: Periodo;
  tipo: TipoAtividade;
  concluida: boolean;
  observacao?: string;
};

type Terapia = {
  id: string;
  nome: string;
  profissional: string;
  diaSemana: string;
  horario: string;
  local: string;
  cor: string;
};

type RegistroHumor = {
  hora: string;
  humor: HumorTEA;
  nota: string;
};

type Aba = "rotina" | "terapias" | "humor";

// ── DADOS INICIAIS ───────────────────────────────────────────────────────────
const atividadesIniciais: Atividade[] = [
  { id: "1", titulo: "Acordar e higiene matinal", horario: "07:00", periodo: "manha", tipo: "higiene", concluida: false },
  { id: "2", titulo: "Café da manhã", horario: "07:30", periodo: "manha", tipo: "alimentacao", concluida: false },
  { id: "3", titulo: "Escola", horario: "08:00", periodo: "manha", tipo: "escola", concluida: false },
  { id: "4", titulo: "Almoço", horario: "12:00", periodo: "tarde", tipo: "alimentacao", concluida: false },
  { id: "5", titulo: "Terapia ABA", horario: "14:00", periodo: "tarde", tipo: "terapia", concluida: false },
  { id: "6", titulo: "Tempo livre / lazer", horario: "16:00", periodo: "tarde", tipo: "lazer", concluida: false },
  { id: "7", titulo: "Jantar", horario: "18:30", periodo: "noite", tipo: "alimentacao", concluida: false },
  { id: "8", titulo: "Banho e rotina noturna", horario: "19:30", periodo: "noite", tipo: "higiene", concluida: false },
  { id: "9", titulo: "Hora de dormir", horario: "21:00", periodo: "noite", tipo: "descanso", concluida: false },
];

const terapiasIniciais: Terapia[] = [
  { id: "t1", nome: "Terapia ABA", profissional: "Dra. Camila Souza", diaSemana: "Seg, Qua, Sex", horario: "14:00", local: "Clínica NeuroVida", cor: "#3BA7FF" },
  { id: "t2", nome: "Fonoaudiologia", profissional: "Dr. Rafael Lima", diaSemana: "Ter, Qui", horario: "10:00", local: "Clínica NeuroVida", cor: "#A855F7" },
  { id: "t3", nome: "Terapia Ocupacional", profissional: "Dra. Beatriz Costa", diaSemana: "Quarta", horario: "16:00", local: "Clínica Integrar", cor: "#10B981" },
];

// ── CONFIGURAÇÕES VISUAIS ────────────────────────────────────────────────────
const periodoConfig = {
  manha:  { label: "Manhã",  emoji: "🌅", cor: "#F59E0B", corClara: "#FFFBEB", inicio: "06:00", fim: "12:00" },
  tarde:  { label: "Tarde",  emoji: "☀️", cor: "#3BA7FF", corClara: "#EEF6FF", inicio: "12:00", fim: "18:00" },
  noite:  { label: "Noite",  emoji: "🌙", cor: "#A855F7", corClara: "#F5F0FF", inicio: "18:00", fim: "23:59" },
};

const tipoConfig: Record<TipoAtividade, { emoji: string; label: string; cor: string; bg: string }> = {
  higiene:     { emoji: "🚿", label: "Higiene",     cor: "#3BA7FF", bg: "#EEF6FF" },
  alimentacao: { emoji: "🍽️", label: "Alimentação", cor: "#10B981", bg: "#ECFDF5" },
  terapia:     { emoji: "🧠", label: "Terapia",     cor: "#A855F7", bg: "#F5F0FF" },
  escola:      { emoji: "📚", label: "Escola",       cor: "#F59E0B", bg: "#FFFBEB" },
  lazer:       { emoji: "🎮", label: "Lazer",        cor: "#FF4D6D", bg: "#FFF0F3" },
  descanso:    { emoji: "😴", label: "Descanso",     cor: "#64748B", bg: "#F1F5F9" },
  outro:       { emoji: "📌", label: "Outro",        cor: "#94A3B8", bg: "#F8FAFF" },
};

const humorConfig: Record<HumorTEA, { emoji: string; label: string; cor: string; bg: string }> = {
  otimo:   { emoji: "😄", label: "Ótimo",    cor: "#10B981", bg: "#ECFDF5" },
  bom:     { emoji: "🙂", label: "Bom",      cor: "#3BA7FF", bg: "#EEF6FF" },
  regular: { emoji: "😐", label: "Regular",  cor: "#F59E0B", bg: "#FFFBEB" },
  dificil: { emoji: "😟", label: "Difícil",  cor: "#FF4D6D", bg: "#FFF0F3" },
  crise:   { emoji: "😰", label: "Em crise", cor: "#DC2626", bg: "#FEF2F2" },
};

const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const hoje = new Date();
const diaSemanaHoje = diasSemana[hoje.getDay()];
const dataHoje = hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "long" });

// ── MODAL: NOVA ATIVIDADE ────────────────────────────────────────────────────
function ModalNovaAtividade({ onSalvar, onFechar }: {
  onSalvar: (a: Omit<Atividade, "id" | "concluida">) => void;
  onFechar: () => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [horario, setHorario] = useState("08:00");
  const [tipo, setTipo] = useState<TipoAtividade>("outro");

  const periodo: Periodo = parseInt(horario.split(":")[0]) < 12 ? "manha"
    : parseInt(horario.split(":")[0]) < 18 ? "tarde" : "noite";

  const salvar = () => {
    if (!titulo) return;
    onSalvar({ titulo, horario, periodo, tipo });
    onFechar();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      padding: "0",
    }}>
      <div style={{
        background: "#fff", borderRadius: "28px 28px 0 0",
        padding: "1.5rem 1.25rem 2rem",
        width: "100%", maxWidth: 500,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1E293B" }}>Nova atividade</h3>
          <button onClick={onFechar} style={{ background: "#F1F5F9", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Nome da atividade</p>
            <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Ex: Terapia de fala"
              style={{ width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF", background: "#F8FAFF", padding: "10px 14px", fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit" }} />
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Horário</p>
            <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)}
              style={{ width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF", background: "#F8FAFF", padding: "10px 14px", fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit" }} />
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Tipo</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(Object.keys(tipoConfig) as TipoAtividade[]).map((t) => {
                const info = tipoConfig[t];
                const ativo = tipo === t;
                return (
                  <button key={t} onClick={() => setTipo(t)} style={{
                    borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600,
                    border: ativo ? `1.5px solid ${info.cor}` : "1.5px solid #EEF2FF",
                    background: ativo ? info.bg : "#F8FAFF",
                    color: ativo ? info.cor : "#94A3B8",
                    cursor: "pointer", fontFamily: "inherit",
                  }}>{info.emoji} {info.label}</button>
                );
              })}
            </div>
          </div>

          <div style={{ background: "#F8FAFF", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14 }}>{periodoConfig[periodo].emoji}</span>
            <p style={{ fontSize: 12, color: "#64748B" }}>Será adicionada no período da <strong>{periodoConfig[periodo].label}</strong></p>
          </div>
        </div>

        <button onClick={salvar} style={{
          width: "100%", marginTop: 20, background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          border: "none", borderRadius: 16, padding: "14px",
          fontSize: 15, fontWeight: 800, color: "#fff", cursor: "pointer", fontFamily: "inherit",
        }}>Adicionar à rotina</button>
      </div>
    </div>
  );
}

// ── MODAL: NOVA TERAPIA ──────────────────────────────────────────────────────
function ModalNovaTerapia({ onSalvar, onFechar }: {
  onSalvar: (t: Omit<Terapia, "id">) => void;
  onFechar: () => void;
}) {
  const cores = ["#3BA7FF", "#A855F7", "#10B981", "#FF4D6D", "#F59E0B", "#FB923C"];
  const [form, setForm] = useState({ nome: "", profissional: "", diaSemana: "", horario: "10:00", local: "", cor: "#3BA7FF" });

  const salvar = () => {
    if (!form.nome) return;
    onSalvar(form);
    onFechar();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.65)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      <div style={{ background: "#fff", borderRadius: "28px 28px 0 0", padding: "1.5rem 1.25rem 2rem", width: "100%", maxWidth: 500 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1E293B" }}>Nova terapia</h3>
          <button onClick={onFechar} style={{ background: "#F1F5F9", border: "none", borderRadius: 10, width: 32, height: 32, cursor: "pointer", fontSize: 14 }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { label: "Nome da terapia", key: "nome", ph: "Ex: Terapia ABA" },
            { label: "Profissional", key: "profissional", ph: "Ex: Dra. Ana Paula" },
            { label: "Dias da semana", key: "diaSemana", ph: "Ex: Seg, Qua, Sex" },
            { label: "Local / Clínica", key: "local", ph: "Ex: Clínica NeuroVida" },
          ].map(({ label, key, ph }) => (
            <div key={key}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{label}</p>
              <input value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} placeholder={ph}
                style={{ width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF", background: "#F8FAFF", padding: "10px 14px", fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit" }} />
            </div>
          ))}

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Horário</p>
            <input type="time" value={form.horario} onChange={(e) => setForm((f) => ({ ...f, horario: e.target.value }))}
              style={{ width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF", background: "#F8FAFF", padding: "10px 14px", fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit" }} />
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Cor de identificação</p>
            <div style={{ display: "flex", gap: 10 }}>
              {cores.map((c) => (
                <button key={c} onClick={() => setForm((f) => ({ ...f, cor: c }))} style={{
                  width: 32, height: 32, borderRadius: "50%", background: c, border: "none",
                  cursor: "pointer", outline: form.cor === c ? `3px solid ${c}` : "none",
                  outlineOffset: 2,
                }} />
              ))}
            </div>
          </div>
        </div>

        <button onClick={salvar} style={{
          width: "100%", marginTop: 20, background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          border: "none", borderRadius: 16, padding: "14px",
          fontSize: 15, fontWeight: 800, color: "#fff", cursor: "pointer", fontFamily: "inherit",
        }}>Adicionar terapia</button>
      </div>
    </div>
  );
}

// ── ABA: ROTINA VISUAL ───────────────────────────────────────────────────────
function AbaRotina({ atividades, onToggle, onAdicionar, onRemover }: {
  atividades: Atividade[];
  onToggle: (id: string) => void;
  onAdicionar: () => void;
  onRemover: (id: string) => void;
}) {
  const concluidas = atividades.filter((a) => a.concluida).length;
  const pct = atividades.length > 0 ? Math.round((concluidas / atividades.length) * 100) : 0;

  return (
    <div>
      {/* progresso do dia */}
      <div style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "1.25rem", marginBottom: "1rem", border: "0.5px solid rgba(255,255,255,0.6)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#1E293B" }}>Progresso de hoje</p>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#3BA7FF" }}>{concluidas}/{atividades.length}</span>
        </div>
        <div style={{ background: "#EEF2FF", borderRadius: 999, height: 8, overflow: "hidden", marginBottom: 6 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #3BA7FF, #A855F7)", borderRadius: 999, transition: "width 0.5s ease" }} />
        </div>
        <p style={{ fontSize: 12, color: "#94A3B8" }}>
          {pct === 100 ? "🎉 Rotina completa! Incrível!" : pct >= 50 ? "💪 Mais da metade concluída!" : "Vamos lá, um passo de cada vez."}
        </p>
      </div>

      {/* períodos */}
      {(["manha", "tarde", "noite"] as Periodo[]).map((periodo) => {
        const config = periodoConfig[periodo];
        const itens = atividades.filter((a) => a.periodo === periodo).sort((a, b) => a.horario.localeCompare(b.horario));
        if (itens.length === 0) return null;

        return (
          <div key={periodo} style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 16 }}>{config.emoji}</span>
              <p style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: config.cor }}>{config.label}</p>
              <div style={{ flex: 1, height: 1, background: `${config.cor}20` }} />
              <span style={{ fontSize: 11, color: "#94A3B8" }}>{config.inicio} – {config.fim}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {itens.map((at) => {
                const tipo = tipoConfig[at.tipo];
                return (
                  <div key={at.id} style={{
                    background: at.concluida ? tipo.bg : "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(8px)",
                    border: at.concluida ? `1.5px solid ${tipo.cor}30` : "0.5px solid rgba(255,255,255,0.6)",
                    borderRadius: 18, padding: "12px 14px",
                    display: "flex", alignItems: "center", gap: 12,
                    transition: "all 0.2s",
                  }}>
                    {/* checkbox */}
                    <button onClick={() => onToggle(at.id)} style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: at.concluida ? tipo.cor : "transparent",
                      border: at.concluida ? "none" : `2px solid ${tipo.cor}60`,
                      cursor: "pointer", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 12, color: "#fff", fontWeight: 800,
                      transition: "all 0.2s",
                    }}>{at.concluida ? "✓" : ""}</button>

                    {/* ícone tipo */}
                    <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: at.concluida ? tipo.cor + "20" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                      {tipo.emoji}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: at.concluida ? "#94A3B8" : "#1E293B", textDecoration: at.concluida ? "line-through" : "none", transition: "all 0.2s" }}>
                        {at.titulo}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                        <span style={{ fontSize: 11, color: config.cor, fontWeight: 600 }}>🕐 {at.horario}</span>
                        <span style={{ fontSize: 10, color: tipo.cor, background: tipo.bg, borderRadius: 999, padding: "1px 8px", fontWeight: 600 }}>{tipo.label}</span>
                      </div>
                    </div>

                    <button onClick={() => onRemover(at.id)} style={{ background: "transparent", border: "none", color: "#CBD5E1", cursor: "pointer", fontSize: 14, padding: 4, flexShrink: 0 }}>✕</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* botão adicionar */}
      <button onClick={onAdicionar} style={{
        width: "100%", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
        border: "1.5px dashed rgba(59,167,255,0.4)",
        borderRadius: 18, padding: "14px",
        fontSize: 14, fontWeight: 700, color: "#3BA7FF",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        <span style={{ fontSize: 18 }}>+</span> Adicionar atividade
      </button>
    </div>
  );
}

// ── ABA: TERAPIAS ────────────────────────────────────────────────────────────
function AbaTerapias({ terapias, onAdicionar, onRemover }: {
  terapias: Terapia[];
  onAdicionar: () => void;
  onRemover: (id: string) => void;
}) {
  return (
    <div>
      <div style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "1rem 1.25rem", marginBottom: "1rem", border: "0.5px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 20 }}>📅</span>
        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>
          <strong>Hoje é {diaSemanaHoje}.</strong> Verifique quais terapias acontecem hoje.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1rem" }}>
        {terapias.map((t) => {
          const hoje = diaSemanaHoje.substring(0, 3);
          const temHoje = t.diaSemana.includes(diaSemanaHoje.substring(0, 3)) || t.diaSemana.includes(diaSemanaHoje);
          return (
            <div key={t.id} style={{
              background: "rgba(255,255,255,0.85)", backdropFilter: "blur(8px)",
              borderRadius: 20, padding: "1.25rem",
              border: temHoje ? `1.5px solid ${t.cor}40` : "0.5px solid rgba(255,255,255,0.6)",
              borderLeft: `4px solid ${t.cor}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: t.cor + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧠</div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 2 }}>{t.nome}</p>
                    {temHoje && (
                      <span style={{ fontSize: 10, fontWeight: 800, color: t.cor, background: t.cor + "15", borderRadius: 999, padding: "2px 10px" }}>
                        ✓ Hoje às {t.horario}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => onRemover(t.id)} style={{ background: "#F1F5F9", border: "none", borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 12, color: "#94A3B8" }}>✕</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { icon: "👩‍⚕️", text: t.profissional },
                  { icon: "📅", text: t.diaSemana },
                  { icon: "🕐", text: t.horario },
                  { icon: "📍", text: t.local },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, width: 20, textAlign: "center" }}>{icon}</span>
                    <p style={{ fontSize: 13, color: "#64748B" }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button onClick={onAdicionar} style={{
        width: "100%", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
        border: "1.5px dashed rgba(168,85,247,0.4)",
        borderRadius: 18, padding: "14px",
        fontSize: 14, fontWeight: 700, color: "#A855F7",
        cursor: "pointer", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        <span style={{ fontSize: 18 }}>+</span> Adicionar terapia
      </button>
    </div>
  );
}

// ── ABA: HUMOR ───────────────────────────────────────────────────────────────
function AbaHumor({ registros, onAdicionar }: {
  registros: RegistroHumor[];
  onAdicionar: (r: RegistroHumor) => void;
}) {
  const [humorSelecionado, setHumorSelecionado] = useState<HumorTEA | null>(null);
  const [nota, setNota] = useState("");
  const [salvando, setSalvando] = useState(false);

  const salvar = () => {
    if (!humorSelecionado) return;
    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    onAdicionar({ hora, humor: humorSelecionado, nota });
    setHumorSelecionado(null);
    setNota("");
    setSalvando(true);
    setTimeout(() => setSalvando(false), 2000);
  };

  // gráfico simples
  const contagemHumor = (Object.keys(humorConfig) as HumorTEA[]).map((h) => ({
    humor: h,
    count: registros.filter((r) => r.humor === h).length,
  }));
  const maxCount = Math.max(...contagemHumor.map((c) => c.count), 1);

  return (
    <div>
      {/* registro rápido */}
      <div style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "1.25rem", marginBottom: "1rem", border: "0.5px solid rgba(255,255,255,0.6)" }}>
        <p style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 12 }}>
          Como {registros.length > 0 ? "está" : "está"} o Lucas agora?
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          {(Object.keys(humorConfig) as HumorTEA[]).map((h) => {
            const info = humorConfig[h];
            const ativo = humorSelecionado === h;
            return (
              <button key={h} onClick={() => setHumorSelecionado(h)} style={{
                flex: 1, marginRight: h === "crise" ? 0 : 6,
                borderRadius: 14, padding: "10px 4px",
                border: ativo ? `2px solid ${info.cor}` : "1.5px solid #EEF2FF",
                background: ativo ? info.bg : "#F8FAFF",
                cursor: "pointer", fontFamily: "inherit",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                transition: "all 0.15s",
              }}>
                <span style={{ fontSize: 22 }}>{info.emoji}</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: ativo ? info.cor : "#94A3B8" }}>{info.label}</span>
              </button>
            );
          })}
        </div>

        {humorSelecionado && (
          <>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Observação opcional (ex: acordou agitado, teve terapia hoje...)"
              rows={2}
              style={{
                width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF",
                background: "#F8FAFF", padding: "10px 14px",
                fontSize: 13, color: "#1E293B", outline: "none",
                resize: "none", fontFamily: "inherit", marginBottom: 10,
              }}
            />
            <button onClick={salvar} style={{
              width: "100%", background: humorConfig[humorSelecionado].cor,
              border: "none", borderRadius: 14, padding: "12px",
              fontSize: 14, fontWeight: 800, color: "#fff",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {salvando ? "✓ Registrado!" : "Registrar agora"}
            </button>
          </>
        )}
      </div>

      {/* gráfico do dia */}
      {registros.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "1.25rem", marginBottom: "1rem", border: "0.5px solid rgba(255,255,255,0.6)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 14 }}>
            Distribuição de hoje
          </p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80, marginBottom: 8 }}>
            {contagemHumor.map(({ humor, count }) => {
              const info = humorConfig[humor];
              const altura = count > 0 ? Math.max((count / maxCount) * 64, 8) : 4;
              return (
                <div key={humor} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: altura, background: count > 0 ? info.cor : "#EEF2FF", borderRadius: 6, transition: "height 0.5s ease" }} />
                  <span style={{ fontSize: 16 }}>{info.emoji}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* histórico */}
      {registros.length > 0 && (
        <div style={{ background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "1.25rem", border: "0.5px solid rgba(255,255,255,0.6)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 12 }}>
            Registros de hoje
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...registros].reverse().map((r, i) => {
              const info = humorConfig[r.humor];
              return (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: info.bg, borderRadius: 14, padding: "10px 14px", border: `1px solid ${info.cor}20` }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{info.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: r.nota ? 4 : 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: info.cor }}>{info.label}</span>
                      <span style={{ fontSize: 11, color: "#94A3B8" }}>às {r.hora}</span>
                    </div>
                    {r.nota && <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{r.nota}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {registros.length === 0 && (
        <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 20, padding: "2rem", textAlign: "center", border: "0.5px solid rgba(255,255,255,0.6)" }}>
          <p style={{ fontSize: 32, marginBottom: 8 }}>📊</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>Nenhum registro ainda</p>
          <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6 }}>Registre o humor ao longo do dia para identificar padrões e gatilhos.</p>
        </div>
      )}
    </div>
  );
}

// ── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function Rotina() {
  const [aba, setAba] = useState<Aba>("rotina");
  const [atividades, setAtividades] = useState<Atividade[]>(atividadesIniciais);
  const [terapias, setTerapias] = useState<Terapia[]>(terapiasIniciais);
  const [registrosHumor, setRegistrosHumor] = useState<RegistroHumor[]>([]);
  const [modalAtividade, setModalAtividade] = useState(false);
  const [modalTerapia, setModalTerapia] = useState(false);

  const toggleAtividade = (id: string) => {
    setAtividades((prev) => prev.map((a) => a.id === id ? { ...a, concluida: !a.concluida } : a));
  };

  const adicionarAtividade = (a: Omit<Atividade, "id" | "concluida">) => {
    setAtividades((prev) => [...prev, { ...a, id: Date.now().toString(), concluida: false }]);
  };

  const removerAtividade = (id: string) => {
    setAtividades((prev) => prev.filter((a) => a.id !== id));
  };

  const adicionarTerapia = (t: Omit<Terapia, "id">) => {
    setTerapias((prev) => [...prev, { ...t, id: Date.now().toString() }]);
  };

  const removerTerapia = (id: string) => {
    setTerapias((prev) => prev.filter((t) => t.id !== id));
  };

  const adicionarHumor = (r: RegistroHumor) => {
    setRegistrosHumor((prev) => [...prev, r]);
  };

  const abaConfig = {
    rotina:   { label: "Rotina",   emoji: "📋", cor: "#3BA7FF" },
    terapias: { label: "Terapias", emoji: "🧠", cor: "#A855F7" },
    humor:    { label: "Humor",    emoji: "😊", cor: "#10B981" },
  };

  return (
    <>
      {modalAtividade && (
        <ModalNovaAtividade
          onSalvar={adicionarAtividade}
          onFechar={() => setModalAtividade(false)}
        />
      )}
      {modalTerapia && (
        <ModalNovaTerapia
          onSalvar={adicionarTerapia}
          onFechar={() => setModalTerapia(false)}
        />
      )}

      <main style={{
        minHeight: "100vh", background: "#d7ddf0",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
        color: "#1E293B", paddingBottom: "80px",
      }}>

        {/* HEADER */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: "rgba(215,221,240,0.92)", backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.5)",
          padding: "1rem 1.25rem",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>{diaSemanaHoje}</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: "#152641" }}>{dataHoje}</p>
            </div>
            <Link href="/" style={{
              width: 40, height: 40, borderRadius: 14, background: "#fff",
              textDecoration: "none", color: "#1E293B", fontSize: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}>🏠</Link>
          </div>

          {/* ABAS */}
          <div style={{ display: "flex", gap: 8 }}>
            {(Object.keys(abaConfig) as Aba[]).map((a) => {
              const config = abaConfig[a];
              const ativo = aba === a;
              return (
                <button key={a} onClick={() => setAba(a)} style={{
                  flex: 1, borderRadius: 12, padding: "8px 4px",
                  border: ativo ? `1.5px solid ${config.cor}` : "1.5px solid transparent",
                  background: ativo ? "#fff" : "rgba(255,255,255,0.4)",
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                  transition: "all 0.2s",
                }}>
                  <span style={{ fontSize: 16 }}>{config.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: ativo ? config.cor : "#94A3B8" }}>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.25rem 1.25rem 0" }}>

          {/* HERO COMPACTO */}
          <div style={{
            background: `linear-gradient(135deg, ${abaConfig[aba].cor} 0%, ${aba === "rotina" ? "#A855F7" : aba === "terapias" ? "#3BA7FF" : "#3BA7FF"} 100%)`,
            borderRadius: 20, padding: "1.25rem 1.5rem",
            marginBottom: "1.25rem", position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", gap: 16,
          }}>
            <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
            <div style={{ fontSize: 32 }}>{abaConfig[aba].emoji}</div>
            <div style={{ position: "relative" }}>
              <p style={{ fontSize: 17, fontWeight: 900, color: "#fff", marginBottom: 2 }}>
                {aba === "rotina" ? "Rotina do dia" : aba === "terapias" ? "Agenda de terapias" : "Registro de humor"}
              </p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>
                {aba === "rotina"
                  ? `${atividades.filter((a) => a.concluida).length} de ${atividades.length} atividades concluídas`
                  : aba === "terapias"
                  ? `${terapias.length} terapias cadastradas`
                  : `${registrosHumor.length} registro(s) hoje`}
              </p>
            </div>
          </div>

          {/* CONTEÚDO DA ABA */}
          {aba === "rotina" && (
            <AbaRotina
              atividades={atividades}
              onToggle={toggleAtividade}
              onAdicionar={() => setModalAtividade(true)}
              onRemover={removerAtividade}
            />
          )}
          {aba === "terapias" && (
            <AbaTerapias
              terapias={terapias}
              onAdicionar={() => setModalTerapia(true)}
              onRemover={removerTerapia}
            />
          )}
          {aba === "humor" && (
            <AbaHumor
              registros={registrosHumor}
              onAdicionar={adicionarHumor}
            />
          )}
        </div>

        {/* BOTTOM NAV */}
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
          borderTop: "0.5px solid rgba(59,167,255,0.15)",
          display: "flex", padding: "8px 0 12px", zIndex: 10,
        }}>
          {[
            { icon: "🏠", label: "Início", href: "/" },
            { icon: "👤", label: "Perfil", href: "/perfil" },
            { icon: "📚", label: "Aprender", href: "/capacitacao" },
            { icon: "📅", label: "Rotina", href: "/rotina", active: true },
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
    </>
  );
}