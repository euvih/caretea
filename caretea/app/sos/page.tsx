"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

type Passo = {
  emoji: string;
  titulo: string;
  descricao: string;
  timer?: number; // segundos
  respiracao?: boolean;
};

type Crise = {
  id: string;
  emoji: string;
  titulo: string;
  cor: string;
  corSolida: string;
  corClara: string;
  frase: string;
  passos: Passo[];
};

const crises: Crise[] = [
  {
    id: "sensorial",
    emoji: "👂",
    titulo: "Crise Sensorial",
    cor: "#3BA7FF",
    corSolida: "#2563EB",
    corClara: "#EEF6FF",
    frase: "Reduza os estímulos ao máximo agora.",
    passos: [
      { emoji: "🔇", titulo: "Reduza o som", descricao: "Desligue TV, música e afaste fontes de barulho.", timer: 0 },
      { emoji: "💡", titulo: "Diminua a luz", descricao: "Apague luzes fortes ou leve para um lugar mais escuro.", timer: 0 },
      { emoji: "🧸", titulo: "Ofereça conforto", descricao: "Um objeto favorito, cobertor ou brinquedo sensorial.", timer: 0 },
      { emoji: "🗣️", titulo: "Fale pouco", descricao: "Use frases curtas e voz calma. Evite perguntas agora.", timer: 0 },
      { emoji: "⏳", titulo: "Aguarde com calma", descricao: "Dê espaço e tempo. Não force contato físico.", timer: 120 },
    ],
  },
  {
    id: "agressividade",
    emoji: "⚡",
    titulo: "Agressividade",
    cor: "#FF4D6D",
    corSolida: "#DC2626",
    corClara: "#FFF0F3",
    frase: "Mantenha a calma. Você consegue.",
    passos: [
      { emoji: "🛡️", titulo: "Garanta segurança", descricao: "Remova objetos perigosos do alcance imediatamente.", timer: 0 },
      { emoji: "↔️", titulo: "Dê espaço", descricao: "Recue alguns passos. Não bloqueie a saída.", timer: 0 },
      { emoji: "😐", titulo: "Expressão neutra", descricao: "Evite gritar, chorar ou reagir com emoção intensa.", timer: 0 },
      { emoji: "🗣️", titulo: "Voz firme e baixa", descricao: "Diga o nome uma vez. Espere. Não repita.", timer: 30 },
      { emoji: "🏠", titulo: "Mude o ambiente", descricao: "Conduza para um local mais calmo e familiar.", timer: 0 },
    ],
  },
  {
    id: "sobrecarga",
    emoji: "😮‍💨",
    titulo: "Sobrecarga Emocional",
    cor: "#A855F7",
    corSolida: "#7E22CE",
    corClara: "#F5F0FF",
    frase: "Cuide de você também. Isso importa.",
    passos: [
      { emoji: "🌬️", titulo: "Respire agora", descricao: "Inspire 4s, segure 4s, expire 4s. Repita 3 vezes.", timer: 36, respiracao: true },
      { emoji: "📞", titulo: "Peça ajuda", descricao: "Chame alguém de confiança para ficar com a pessoa.", timer: 0 },
      { emoji: "💧", titulo: "Beba água", descricao: "Hidrate-se. Ajuda o corpo a regular.", timer: 0 },
      { emoji: "🚶", titulo: "Pausa de 5 minutos", descricao: "Se houver alguém para ficar, dê uma pausa curta.", timer: 300 },
      { emoji: "❤️", titulo: "Você não está errado(a)", descricao: "Sentir-se sobrecarregado é humano. Procure apoio depois.", timer: 0 },
    ],
  },
  {
    id: "fuga",
    emoji: "🏃",
    titulo: "Fuga / Evasão",
    cor: "#F59E0B",
    corSolida: "#B45309",
    corClara: "#FFFBEB",
    frase: "Segurança primeiro. Aja com calma.",
    passos: [
      { emoji: "👁️", titulo: "Não perca de vista", descricao: "Mantenha contato visual ou físico seguro sem assustar.", timer: 0 },
      { emoji: "🚪", titulo: "Bloqueie saídas perigosas", descricao: "Feche portas, portões e afaste de vias movimentadas.", timer: 0 },
      { emoji: "📢", titulo: "Chame pelo nome", descricao: "Voz calma e firme. Não grite. Aproxime-se devagar.", timer: 0 },
      { emoji: "🧸", titulo: "Use um atrativo", descricao: "Ofereça objeto favorito, comida preferida ou atividade.", timer: 0 },
      { emoji: "📍", titulo: "Acione ajuda", descricao: "Se não encontrar em 2 minutos, chame alguém ou ligue 190.", timer: 120 },
    ],
  },
  {
    id: "hiperfoco",
    emoji: "🔁",
    titulo: "Hiperfoco / Repetição",
    cor: "#10B981",
    corSolida: "#059669",
    corClara: "#ECFDF5",
    frase: "Não force a interrupção. Redirecione.",
    passos: [
      { emoji: "⏰", titulo: "Avise antes", descricao: "Diga: 'Em 5 minutos vamos parar.' Use timer visual.", timer: 300 },
      { emoji: "🔀", titulo: "Ofereça transição", descricao: "Apresente a próxima atividade como algo positivo.", timer: 0 },
      { emoji: "🎯", titulo: "Redirecione o interesse", descricao: "Conecte o tema do hiperfoco com a próxima tarefa.", timer: 0 },
      { emoji: "🚫", titulo: "Não retire bruscamente", descricao: "Tirar o objeto de forma abrupta pode gerar crise maior.", timer: 0 },
      { emoji: "✅", titulo: "Valide o interesse", descricao: "Diga que o assunto é legal e que voltarão depois.", timer: 0 },
    ],
  },
  {
    id: "publica",
    emoji: "🏪",
    titulo: "Crise em Público",
    cor: "#FB923C",
    corSolida: "#EA580C",
    corClara: "#FFF7ED",
    frase: "Ignore os olhares. Foque na pessoa.",
    passos: [
      { emoji: "🚶", titulo: "Saia do local", descricao: "Leve para um canto mais vazio, quieto e sem movimento.", timer: 0 },
      { emoji: "🙈", titulo: "Ignore quem olha", descricao: "Seu foco é a pessoa. Os outros não importam agora.", timer: 0 },
      { emoji: "📱", titulo: "Use cartão de autismo", descricao: "Se tiver, mostre para quem precisar entender a situação.", timer: 0 },
      { emoji: "🧸", titulo: "Suporte sensorial", descricao: "Fone de ouvido, óculos de sol, objeto favorito.", timer: 0 },
      { emoji: "🏠", titulo: "Avalie ir para casa", descricao: "Se a crise persistir, o melhor pode ser encerrar o passeio.", timer: 0 },
    ],
  },
];

// ── RESPIRAÇÃO ANIMADA ──────────────────────────────────────────────────────
function RespiracaoGuiada({ cor }: { cor: string }) {
  const [fase, setFase] = useState<"inspire" | "segure" | "expire">("inspire");
  const [count, setCount] = useState(4);
  const [ciclo, setCiclo] = useState(1);

  useEffect(() => {
    if (ciclo > 3) return;
    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          setFase((f) => {
            if (f === "inspire") return "segure";
            if (f === "segure") return "expire";
            setCiclo((cy) => cy + 1);
            return "inspire";
          });
          return 4;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [ciclo]);

  const faseLabel = { inspire: "Inspire", segure: "Segure", expire: "Expire" }[fase];
  const scale = fase === "inspire" ? 1.3 : fase === "segure" ? 1.3 : 1;

  if (ciclo > 3) {
    return (
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
        <p style={{ fontSize: 15, fontWeight: 700, color: cor }}>Respiração concluída</p>
        <p style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>Muito bem. Continue para o próximo passo.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0.5rem 0 1rem" }}>
      <div style={{
        width: 100, height: 100, borderRadius: "50%",
        background: cor + "22",
        border: `3px solid ${cor}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: `scale(${scale})`,
        transition: "transform 0.8s ease-in-out",
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 32 }}>🌬️</span>
      </div>
      <p style={{ fontSize: 22, fontWeight: 900, color: cor, marginBottom: 4 }}>{faseLabel}</p>
      <p style={{ fontSize: 36, fontWeight: 900, color: "#1E293B" }}>{count}</p>
      <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 6 }}>Ciclo {ciclo} de 3</p>
    </div>
  );
}

// ── TIMER ───────────────────────────────────────────────────────────────────
function Timer({ segundos, cor }: { segundos: number; cor: string }) {
  const [restante, setRestante] = useState(segundos);
  const [ativo, setAtivo] = useState(false);
  const [concluido, setConcluido] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (ativo && restante > 0) {
      ref.current = setInterval(() => setRestante((r) => r - 1), 1000);
    } else if (restante === 0 && ativo) {
      setConcluido(true);
      setAtivo(false);
    }
    return () => { if (ref.current) clearInterval(ref.current); };
  }, [ativo, restante]);

  const min = Math.floor(restante / 60);
  const seg = restante % 60;
  const progresso = ((segundos - restante) / segundos) * 100;

  if (concluido) return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: cor + "15", borderRadius: 12, padding: "10px 14px", marginTop: 10 }}>
      <span style={{ fontSize: 18 }}>✅</span>
      <span style={{ fontSize: 13, fontWeight: 700, color: cor }}>Tempo concluído!</span>
    </div>
  );

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ background: "#F1F5F9", borderRadius: 999, height: 6, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ height: "100%", width: `${progresso}%`, background: cor, borderRadius: 999, transition: "width 1s linear" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: "#1E293B", fontVariantNumeric: "tabular-nums" }}>
          {min > 0 ? `${min}:${seg.toString().padStart(2, "0")}` : `${seg}s`}
        </span>
        <button
          onClick={() => ativo ? (setAtivo(false), ref.current && clearInterval(ref.current)) : setAtivo(true)}
          style={{
            background: ativo ? "#F1F5F9" : cor,
            color: ativo ? "#64748B" : "#fff",
            border: "none", borderRadius: 999,
            padding: "6px 16px", fontSize: 12, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          {ativo ? "⏸ Pausar" : restante < segundos ? "▶ Continuar" : "▶ Iniciar"}
        </button>
      </div>
    </div>
  );
}

// ── MODO CRISE (uma instrução por vez) ──────────────────────────────────────
function ModoCrise({ crise, onSair }: { crise: Crise; onSair: () => void }) {
  const [passoAtual, setPassoAtual] = useState(0);
  const [concluidos, setConcluidos] = useState<boolean[]>(new Array(crise.passos.length).fill(false));
  const passo = crise.passos[passoAtual];
  const isUltimo = passoAtual === crise.passos.length - 1;
  const todosConcluidos = concluidos.every(Boolean);

  const marcarConcluido = () => {
    const novo = [...concluidos];
    novo[passoAtual] = true;
    setConcluidos(novo);
    if (!isUltimo) setTimeout(() => setPassoAtual((p) => p + 1), 300);
  };

  if (todosConcluidos) {
    return (
      <div style={{
        minHeight: "100vh", background: crise.corClara,
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "2rem 1.5rem", textAlign: "center",
        fontFamily: "'DM Sans', -apple-system, sans-serif",
      }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>💙</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: crise.corSolida, marginBottom: 12 }}>
          Você conseguiu.
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "#475569", maxWidth: 320, marginBottom: 32 }}>
          Todos os passos foram concluídos. Respire. Você fez o possível pela pessoa que cuida.
        </p>
        <button onClick={onSair} style={{
          background: crise.cor, color: "#fff", border: "none",
          borderRadius: 999, padding: "14px 32px",
          fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
        }}>
          Voltar ao início
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: "100vh", background: "#0F172A",
      display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
    }}>
      {/* BARRA TOPO */}
      <div style={{
        padding: "1rem 1.25rem 0.75rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <button onClick={onSair} style={{
          background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12,
          width: 40, height: 40, color: "#fff", fontSize: 16,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}>←</button>
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)" }}>
          Modo Crise
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: crise.cor }}>
          {passoAtual + 1}/{crise.passos.length}
        </span>
      </div>

      {/* BARRA PROGRESSO */}
      <div style={{ display: "flex", gap: 4, padding: "0 1.25rem 1rem" }}>
        {crise.passos.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 999,
            background: i <= passoAtual ? crise.cor : "rgba(255,255,255,0.12)",
            transition: "background 0.3s",
          }} />
        ))}
      </div>

      {/* FRASE ÂNCORA */}
      <div style={{
        margin: "0 1.25rem 1rem",
        background: crise.cor + "20",
        borderRadius: 16, padding: "10px 16px",
        border: `1px solid ${crise.cor}40`,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: crise.cor, textAlign: "center" }}>
          {crise.frase}
        </p>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 1.25rem" }}>

        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: 72, marginBottom: 12, lineHeight: 1 }}>{passo.emoji}</div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: crise.cor, marginBottom: 8 }}>
            Passo {passoAtual + 1}
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 12 }}>
            {passo.titulo}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", maxWidth: 340, margin: "0 auto" }}>
            {passo.descricao}
          </p>
        </div>

        {/* RESPIRAÇÃO */}
        {passo.respiracao && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <RespiracaoGuiada cor={crise.cor} />
          </div>
        )}

        {/* TIMER */}
        {passo.timer && passo.timer > 0 && !passo.respiracao && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "1.25rem", marginBottom: "1.5rem" }}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              Temporizador
            </p>
            <Timer segundos={passo.timer} cor={crise.cor} />
          </div>
        )}

      </div>

      {/* BOTÃO CONCLUIR */}
      <div style={{ padding: "1rem 1.25rem 2rem" }}>
        <button
          onClick={marcarConcluido}
          style={{
            width: "100%", background: crise.cor, border: "none",
            borderRadius: 20, padding: "18px",
            fontSize: 17, fontWeight: 800, color: "#fff",
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {concluidos[passoAtual] ? "✓ Concluído" : isUltimo ? "✓ Finalizar" : "Fiz esse passo →"}
        </button>
        {passoAtual > 0 && (
          <button onClick={() => setPassoAtual((p) => p - 1)} style={{
            width: "100%", background: "transparent", border: "none",
            color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 12,
            cursor: "pointer", fontFamily: "inherit", padding: "4px",
          }}>
            ← Voltar ao passo anterior
          </button>
        )}
      </div>
    </div>
  );
}

// ── PROTOCOLO NORMAL ────────────────────────────────────────────────────────
function Protocolo({ crise, onVoltar }: { crise: Crise; onVoltar: () => void }) {
  const [modoAtivo, setModoAtivo] = useState(false);
  const [concluidos, setConcluidos] = useState<boolean[]>(new Array(crise.passos.length).fill(false));

  if (modoAtivo) return <ModoCrise crise={crise} onSair={() => setModoAtivo(false)} />;

  const marcar = (i: number) => {
    const novo = [...concluidos];
    novo[i] = !novo[i];
    setConcluidos(novo);
  };

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>

      {/* HEADER */}
      <div style={{ padding: "1.25rem 1.25rem 0", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onVoltar} style={{
          width: 44, height: 44, borderRadius: 16,
          background: "#fff", border: "none", fontSize: 18,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>←</button>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
          SOS • Protocolo
        </span>
      </div>

      {/* HERO CARD */}
      <div style={{ padding: "1rem 1.25rem" }}>
        <div style={{
          background: crise.cor, borderRadius: 24,
          padding: "1.5rem", position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
          <p style={{ fontSize: 40, marginBottom: 8 }}>{crise.emoji}</p>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{crise.titulo}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5, marginBottom: 16 }}>{crise.frase}</p>

          {/* BOTÃO MODO CRISE */}
          <button onClick={() => setModoAtivo(true)} style={{
            background: "#fff", color: crise.corSolida,
            border: "none", borderRadius: 999, padding: "10px 20px",
            fontSize: 13, fontWeight: 800, cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            ⚡ Ativar Modo Crise
          </button>
        </div>
      </div>

      {/* PASSOS */}
      <div style={{ padding: "0 1.25rem", display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 4 }}>
          Passos do protocolo
        </p>

        {crise.passos.map((passo, i) => (
          <div key={i} style={{
            background: concluidos[i] ? crise.corClara : "#fff",
            borderRadius: 20, padding: "1rem 1.25rem",
            border: concluidos[i] ? `1.5px solid ${crise.cor}40` : "0.5px solid rgba(0,0,0,0.06)",
            transition: "all 0.2s",
          }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                background: concluidos[i] ? crise.cor : "#F1F5F9",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
              }}>
                {concluidos[i] ? "✓" : passo.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: crise.cor, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Passo {i + 1}
                  </p>
                  <button onClick={() => marcar(i)} style={{
                    background: concluidos[i] ? crise.cor : "transparent",
                    border: `2px solid ${concluidos[i] ? crise.cor : "#CBD5E1"}`,
                    borderRadius: "50%", width: 24, height: 24,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: "#fff", transition: "all 0.2s",
                  }}>
                    {concluidos[i] ? "✓" : ""}
                  </button>
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>{passo.titulo}</p>
                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{passo.descricao}</p>

                {/* RESPIRAÇÃO */}
                {passo.respiracao && (
                  <div style={{ marginTop: 12, background: crise.corClara, borderRadius: 14, padding: "1rem" }}>
                    <RespiracaoGuiada cor={crise.cor} />
                  </div>
                )}

                {/* TIMER */}
                {passo.timer && passo.timer > 0 && !passo.respiracao && (
                  <div style={{ marginTop: 10 }}>
                    <Timer segundos={passo.timer} cor={crise.cor} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* APOIO FINAL */}
      <div style={{ padding: "1.25rem 1.25rem 0" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.25rem", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
            Você está fazendo o possível. 💙<br />
            Quando passar, respire e cuide de você também.
          </p>
          <button onClick={onVoltar} style={{
            marginTop: 12, background: "#F1F5F9", border: "none",
            borderRadius: 999, padding: "10px 24px",
            fontSize: 13, fontWeight: 600, color: "#64748B",
            cursor: "pointer", fontFamily: "inherit",
          }}>
            Ver outras situações
          </button>
        </div>
      </div>
    </main>
  );
}

// ── TELA PRINCIPAL ──────────────────────────────────────────────────────────
export default function SOS() {
  const [criseSelecionada, setCriseSelecionada] = useState<Crise | null>(null);

  if (criseSelecionada) {
    return <Protocolo crise={criseSelecionada} onVoltar={() => setCriseSelecionada(null)} />;
  }

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>

      {/* HEADER */}
      <div style={{ padding: "1.25rem 1.25rem 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/" style={{
          width: 44, height: 44, borderRadius: 16,
          background: "#fff", textDecoration: "none", fontSize: 18,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", color: "#1E293B",
        }}>←</Link>
        <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8" }}>
          CareTEA • SOS
        </span>
      </div>

      {/* TÍTULO */}
      <div style={{ padding: "1.25rem 1.25rem 1rem", textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>📢</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#1E293B", marginBottom: 8 }}>
          O que está acontecendo?
        </h1>
        <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6 }}>
          Toque na situação para ver o protocolo.<br />
          Use o <strong style={{ color: "#FF4D6D" }}>Modo Crise</strong> para guia passo a passo.
        </p>
      </div>

      {/* GRID */}
      <div style={{ padding: "0 1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {crises.map((crise) => (
          <button key={crise.id} onClick={() => setCriseSelecionada(crise)} style={{
            background: "#fff", border: `2px solid ${crise.cor}30`,
            borderTop: `4px solid ${crise.cor}`,
            borderRadius: 20, padding: "1.25rem 1rem",
            cursor: "pointer", fontFamily: "inherit",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, transition: "transform 0.15s",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}>
            <span style={{ fontSize: 36 }}>{crise.emoji}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", textAlign: "center", lineHeight: 1.3 }}>
              {crise.titulo}
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: crise.cor }}>Ver protocolo →</span>
          </button>
        ))}
      </div>

      {/* EMERGÊNCIA */}
      <div style={{ padding: "1.25rem" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: "1.25rem", textAlign: "center", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginBottom: 12 }}>
            Situação de risco grave?
          </p>
          <a href="tel:190" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#FF4D6D", color: "#fff", textDecoration: "none",
            borderRadius: 999, padding: "14px 24px",
            fontSize: 15, fontWeight: 800,
            boxShadow: "0 4px 16px rgba(255,77,109,0.3)",
          }}>
            📞 Ligar 190 — Emergência
          </a>
          <a href="tel:192" style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "#F1F5F9", color: "#475569", textDecoration: "none",
            borderRadius: 999, padding: "12px 24px",
            fontSize: 14, fontWeight: 700, marginTop: 8,
          }}>
            🚑 SAMU — 192
          </a>
        </div>
      </div>

    </main>
  );
}