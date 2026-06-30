"use client";

import Link from "next/link";
import { useState } from "react";

// ── TIPOS ────────────────────────────────────────────────────────────────────
type Post = {
  id: number;
  autor: string;
  iniciais: string;
  corAvatar: string;
  corTexto: string;
  grupo: string;
  corGrupo: string;
  corGrupoBg: string;
  tempo: string;
  titulo: string;
  corpo: string;
  tags: string[];
  curtidas: number;
  respostas: number;
  especialista?: boolean;
  especialidadeAutor?: string;
  semResposta?: boolean;
  curtido?: boolean;
  salvo?: boolean;
};

type Grupo = {
  nome: string;
  icon: string;
  bg: string;
  cor: string;
  membros: number;
  notificacoes?: number;
};

// ── DADOS ────────────────────────────────────────────────────────────────────
const gruposIniciais: Grupo[] = [
  { nome: "Mães TEA Nível 2", icon: "❤️", bg: "#FFF0F3", cor: "#FF4D6D", membros: 312, notificacoes: 3 },
  { nome: "Crises e regulação", icon: "⚡", bg: "#EEF6FF", cor: "#3BA7FF", membros: 589 },
  { nome: "Seletividade alimentar", icon: "🍽️", bg: "#FDF4FF", cor: "#A855F7", membros: 204 },
  { nome: "Adultos autistas", icon: "🌱", bg: "#F0FFF4", cor: "#10B981", membros: 178 },
];

const postsIniciais: Post[] = [
  {
    id: 1,
    autor: "Ana Nunes",
    iniciais: "AN",
    corAvatar: "#EEF6FF",
    corTexto: "#3BA7FF",
    grupo: "Mães TEA N2",
    corGrupo: "#FF4D6D",
    corGrupoBg: "#FFF0F3",
    tempo: "Há 23 min",
    titulo: "Meu filho entrou em crise no supermercado hoje. O que vocês fazem nessa situação?",
    corpo: "Estava na fila do caixa e ele começou a se desregular com o barulho. Tentei sair mas foi difícil. Alguém tem estratégias que funcionam pra esse tipo de ambiente?",
    tags: ["crise", "sobrecarga sensorial", "ambiente externo"],
    curtidas: 24,
    respostas: 18,
    curtido: false,
    salvo: false,
  },
  {
    id: 2,
    autor: "Dra. Fernanda Costa",
    iniciais: "DF",
    corAvatar: "#EEF6FF",
    corTexto: "#3BA7FF",
    grupo: "Especialistas",
    corGrupo: "#10B981",
    corGrupoBg: "#F0FFF4",
    tempo: "Há 2h",
    titulo: "Como usar CAA com crianças que têm baixa motivação para comunicar?",
    corpo: "Uma dica prática: comece com o item de maior preferência da criança como primeiro símbolo. A motivação precede a habilidade — ofereça o símbolo sempre antes do reforço.",
    tags: ["CAA", "comunicação", "motivação"],
    curtidas: 91,
    respostas: 34,
    especialista: true,
    especialidadeAutor: "Fonoaudióloga",
    curtido: false,
    salvo: false,
  },
  {
    id: 3,
    autor: "Roberto Campos",
    iniciais: "RC",
    corAvatar: "#FDF4FF",
    corTexto: "#A855F7",
    grupo: "Seletividade alimentar",
    corGrupo: "#A855F7",
    corGrupoBg: "#FDF4FF",
    tempo: "Há 5h",
    titulo: "Filho de 11 anos só come 5 alimentos. Nutricionista disse que não é problema... mas fico preocupado.",
    corpo: "Já tentei de tudo — exposição gradual, alimentos disfarçados, novos formatos. Nada funciona. Alguém passou por isso e teve alguma evolução?",
    tags: ["alimentação", "neofobia"],
    curtidas: 47,
    respostas: 29,
    semResposta: true,
    curtido: false,
    salvo: false,
  },
  {
    id: 4,
    autor: "Juliana Moraes",
    iniciais: "JM",
    corAvatar: "#FFF0F3",
    corTexto: "#FF4D6D",
    grupo: "Mães TEA N2",
    corGrupo: "#FF4D6D",
    corGrupoBg: "#FFF0F3",
    tempo: "Há 8h",
    titulo: "Dicas para introduzir agenda visual? Meu filho de 7 anos ainda resiste muito.",
    corpo: "Usamos o PECS por um tempo mas ele destruiu os cartões. Agora estou pensando em algo digital no tablet. Alguém usa aplicativo de rotina visual?",
    tags: ["rotina visual", "agenda", "resistência"],
    curtidas: 33,
    respostas: 12,
    curtido: false,
    salvo: false,
  },
];

const abas = ["Recentes", "Em alta", "Sem resposta", "Especialistas", "Salvos"];

// ── MODAL NOVO POST ───────────────────────────────────────────────────────────
function NovoPostModal({ onPublicar, onFechar }: {
  onPublicar: (post: Omit<Post, "id" | "curtidas" | "respostas" | "curtido" | "salvo">) => void;
  onFechar: () => void;
}) {
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [grupo, setGrupo] = useState("Mães TEA N2");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const adicionarTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const publicar = () => {
    if (!titulo.trim()) return;
    onPublicar({
      autor: "Vitória Kelly",
      iniciais: "VK",
      corAvatar: "#EEF6FF",
      corTexto: "#3BA7FF",
      grupo,
      corGrupo: "#3BA7FF",
      corGrupoBg: "#EEF6FF",
      tempo: "Agora",
      titulo,
      corpo,
      tags,
    });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(15,23,42,0.7)", backdropFilter: "blur(4px)",
      overflowY: "auto", padding: "1.5rem",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
    }}>
      <div style={{
        background: "#fff", borderRadius: 28, padding: "1.75rem 1.5rem",
        width: "100%", maxWidth: 500,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#1E293B" }}>Nova publicação</h3>
          <button onClick={onFechar} style={{
            background: "#F1F5F9", border: "none", borderRadius: 10,
            width: 34, height: 34, cursor: "pointer", fontSize: 16, fontFamily: "inherit",
          }}>✕</button>
        </div>

        {/* grupo */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Grupo</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["Mães TEA N2", "Crises e regulação", "Seletividade alimentar", "Adultos autistas"].map((g) => (
            <button key={g} onClick={() => setGrupo(g)} style={{
              borderRadius: 999, padding: "6px 14px", fontSize: 12, fontWeight: 600,
              border: grupo === g ? "1.5px solid #3BA7FF" : "1.5px solid #EEF2FF",
              background: grupo === g ? "#EEF6FF" : "#F8FAFF",
              color: grupo === g ? "#3BA7FF" : "#94A3B8",
              cursor: "pointer", fontFamily: "inherit",
            }}>{g}</button>
          ))}
        </div>

        {/* título */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Título</p>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Qual é a sua dúvida ou situação?"
          style={{
            width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF",
            background: "#F8FAFF", padding: "10px 12px",
            fontSize: 14, color: "#1E293B", outline: "none", fontFamily: "inherit",
            marginBottom: 14,
          }}
        />

        {/* corpo */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Descrição</p>
        <textarea
          value={corpo}
          onChange={(e) => setCorpo(e.target.value)}
          rows={4}
          placeholder="Conte mais detalhes. Quanto mais contexto, melhores as respostas."
          style={{
            width: "100%", borderRadius: 12, border: "1.5px solid #EEF2FF",
            background: "#F8FAFF", padding: "10px 12px",
            fontSize: 13, color: "#1E293B", outline: "none", fontFamily: "inherit",
            resize: "none", marginBottom: 14,
          }}
        />

        {/* tags */}
        <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Tags</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && adicionarTag()}
            placeholder="Ex: crise, rotina..."
            style={{
              flex: 1, borderRadius: 12, border: "1.5px solid #EEF2FF",
              background: "#F8FAFF", padding: "8px 12px",
              fontSize: 13, color: "#1E293B", outline: "none", fontFamily: "inherit",
            }}
          />
          <button onClick={adicionarTag} style={{
            background: "#EEF6FF", border: "1.5px solid #3BA7FF40",
            borderRadius: 12, padding: "8px 14px", fontSize: 13, fontWeight: 700,
            color: "#3BA7FF", cursor: "pointer", fontFamily: "inherit",
          }}>+ Add</button>
        </div>
        {tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
            {tags.map((t) => (
              <span key={t} onClick={() => setTags((prev) => prev.filter((x) => x !== t))} style={{
                fontSize: 12, fontWeight: 600, color: "#A855F7", background: "#FDF4FF",
                borderRadius: 999, padding: "4px 12px", cursor: "pointer",
                border: "1px solid #A855F740",
              }}>{t} ✕</span>
            ))}
          </div>
        )}

        <button onClick={publicar} style={{
          width: "100%", background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          border: "none", borderRadius: 16, padding: "14px",
          fontSize: 15, fontWeight: 800, color: "#fff",
          cursor: "pointer", fontFamily: "inherit",
        }}>Publicar</button>
      </div>
    </div>
  );
}

// ── CARD DE POST ──────────────────────────────────────────────────────────────
function PostCard({ post, onCurtir, onSalvar }: {
  post: Post;
  onCurtir: (id: number) => void;
  onSalvar: (id: number) => void;
}) {
  return (
    <div style={{
      background: post.especialista ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.75)",
      backdropFilter: "blur(8px)",
      border: post.especialista
        ? "1px solid rgba(16,185,129,0.35)"
        : "0.5px solid rgba(255,255,255,0.6)",
      borderRadius: 20,
      padding: "1.25rem",
      marginBottom: "0.75rem",
    }}>
      {/* badge especialista */}
      {post.especialista && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <span style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 999,
            background: "#F0FFF4", color: "#10B981", fontWeight: 700,
            border: "1px solid rgba(16,185,129,0.3)",
          }}>
            🩺 Resposta de especialista
          </span>
        </div>
      )}

      {/* badge sem resposta */}
      {post.semResposta && (
        <div style={{ marginBottom: 10 }}>
          <span style={{
            fontSize: 11, padding: "3px 10px", borderRadius: 999,
            background: "#FFF0F3", color: "#FF4D6D", fontWeight: 700,
            border: "1px solid rgba(255,77,109,0.3)",
          }}>
            ⚠️ Aguardando resposta de especialista
          </span>
        </div>
      )}

      {/* cabeçalho */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: post.corAvatar, color: post.corTexto,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>{post.iniciais}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>{post.autor}</p>
            {post.especialista && (
              <span style={{
                width: 14, height: 14, borderRadius: "50%",
                background: "#10B981", color: "#fff",
                fontSize: 9, display: "inline-flex",
                alignItems: "center", justifyContent: "center", fontWeight: 700,
              }}>✓</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#94A3B8" }}>
            <span>{post.especialidadeAutor ? `${post.especialidadeAutor} · ` : ""}{post.tempo}</span>
            <span>·</span>
            <span style={{
              padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: post.corGrupoBg, color: post.corGrupo,
            }}>{post.grupo}</span>
          </div>
        </div>
      </div>

      {/* conteúdo */}
      <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 6, lineHeight: 1.4 }}>{post.titulo}</p>
      {post.corpo && (
        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 10 }}>{post.corpo}</p>
      )}

      {/* tags */}
      {post.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {post.tags.map((t) => (
            <span key={t} style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 999,
              border: "0.5px solid #EEF2FF", color: "#94A3B8", background: "#F8FAFF",
            }}>{t}</span>
          ))}
        </div>
      )}

      {/* rodapé */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        paddingTop: 10, borderTop: "0.5px solid rgba(59,167,255,0.1)",
      }}>
        <button
          onClick={() => onCurtir(post.id)}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 12, color: post.curtido ? "#FF4D6D" : "#94A3B8",
            border: "none", background: "none", cursor: "pointer",
            fontFamily: "inherit", padding: 0, fontWeight: post.curtido ? 700 : 400,
          }}
        >
          {post.curtido ? "❤️" : "🤍"} {post.curtidas + (post.curtido ? 1 : 0)}
        </button>

        <button style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 12, color: "#94A3B8",
          border: "none", background: "none", cursor: "pointer",
          fontFamily: "inherit", padding: 0,
        }}>
          💬 {post.respostas} respostas
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => onSalvar(post.id)}
            style={{
              fontSize: 12, color: post.salvo ? "#A855F7" : "#94A3B8",
              border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", padding: 0,
            }}
          >
            {post.salvo ? "🔖" : "📄"}
          </button>
          <button style={{
            fontSize: 12, color: "#94A3B8",
            border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", padding: 0,
          }}>
            ↗
          </button>
        </div>
      </div>
    </div>
  );
}

// ── PÁGINA PRINCIPAL ──────────────────────────────────────────────────────────
export default function Comunidade() {
  const [abaAtiva, setAbaAtiva] = useState("Recentes");
  const [busca, setBusca] = useState("");
  const [posts, setPosts] = useState<Post[]>(postsIniciais);
  const [novoPostAberto, setNovoPostAberto] = useState(false);

  const curtir = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => p.id === id ? { ...p, curtido: !p.curtido } : p)
    );
  };

  const salvar = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => p.id === id ? { ...p, salvo: !p.salvo } : p)
    );
  };

  const publicar = (dados: Omit<Post, "id" | "curtidas" | "respostas" | "curtido" | "salvo">) => {
    const novo: Post = {
      ...dados,
      id: Date.now(),
      curtidas: 0,
      respostas: 0,
      curtido: false,
      salvo: false,
    };
    setPosts((prev) => [novo, ...prev]);
    setNovoPostAberto(false);
  };

  const postsFiltrados = posts.filter((p) => {
    if (busca && !p.titulo.toLowerCase().includes(busca.toLowerCase()) &&
      !p.corpo.toLowerCase().includes(busca.toLowerCase())) return false;
    if (abaAtiva === "Em alta") return p.curtidas >= 40;
    if (abaAtiva === "Sem resposta") return p.semResposta;
    if (abaAtiva === "Especialistas") return p.especialista;
    if (abaAtiva === "Salvos") return p.salvo;
    return true;
  });

  return (
    <main style={{
      minHeight: "100vh",
      background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B",
      paddingBottom: "5rem",
    }}>

      {/* MODAL NOVO POST */}
      {novoPostAberto && (
        <NovoPostModal
          onPublicar={publicar}
          onFechar={() => setNovoPostAberto(false)}
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
        <div style={{ display: "flex", gap: 8 }}>
          {/* Notificações */}
          <div style={{ position: "relative" }}>
            <button style={{
              width: 34, height: 34, borderRadius: 10,
              border: "0.5px solid rgba(59,167,255,0.2)",
              background: "#EEF6FF", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
            }}>🔔</button>
            <div style={{
              position: "absolute", top: 5, right: 5,
              width: 8, height: 8, borderRadius: "50%",
              background: "#FF4D6D", border: "1.5px solid #fff",
            }} />
          </div>
          <button style={{
            width: 34, height: 34, borderRadius: 10,
            border: "0.5px solid rgba(59,167,255,0.2)",
            background: "#EEF6FF", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
          }}>💬</button>
        </div>
      </header>

      {/* HERO */}
      <div style={{
        background: "linear-gradient(135deg, #3BA7FF 0%, #A855F7 60%, #FF4D6D 100%)",
        padding: "1.5rem 1.25rem 1.25rem",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.10)", pointerEvents: "none" }} />
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
          Comunidade
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginBottom: "1rem" }}>
          1.847 cuidadores · Informação verificada por especialistas
        </p>
        {/* busca */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,0.2)", border: "0.5px solid rgba(255,255,255,0.4)",
          borderRadius: 14, padding: "0 14px", height: 40,
        }}>
          <span style={{ fontSize: 15 }}>🔍</span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar dúvidas, estratégias..."
            style={{
              border: "none", background: "transparent",
              fontSize: 13, flex: 1, color: "#fff",
              fontFamily: "inherit", outline: "none",
            }}
          />
        </div>
      </div>

      {/* ABAS */}
      <div style={{
        display: "flex", gap: 6, padding: "0.75rem 1.25rem",
        background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(59,167,255,0.1)",
        overflowX: "auto",
      }}>
        {abas.map((aba) => (
          <button
            key={aba}
            onClick={() => setAbaAtiva(aba)}
            style={{
              padding: "5px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
              border: abaAtiva === aba ? "1.5px solid #3BA7FF" : "1.5px solid #EEF2FF",
              background: abaAtiva === aba ? "#EEF6FF" : "#F8FAFF",
              color: abaAtiva === aba ? "#3BA7FF" : "#94A3B8",
              cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
            }}
          >
            {aba}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.25rem 1rem 0" }}>

        {/* ── MEUS GRUPOS ── */}
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748B", fontWeight: 700, marginBottom: "0.75rem" }}>
          Meus grupos
        </p>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, marginBottom: "1.5rem" }}>
          {gruposIniciais.map((g) => (
            <div key={g.nome} style={{
              flexShrink: 0, width: 148,
              background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
              border: "0.5px solid rgba(255,255,255,0.6)",
              borderRadius: 20, padding: "1rem",
              cursor: "pointer", position: "relative",
            }}>
              {g.notificacoes && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#FF4D6D", color: "#fff",
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>{g.notificacoes}</div>
              )}
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: g.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 18, marginBottom: 8,
              }}>{g.icon}</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 3, lineHeight: 1.3 }}>{g.nome}</p>
              <p style={{ fontSize: 11, color: "#94A3B8" }}>{g.membros} membros</p>
            </div>
          ))}
          {/* explorar */}
          <div style={{
            flexShrink: 0, width: 148,
            background: "rgba(255,255,255,0.55)", backdropFilter: "blur(8px)",
            border: "1px dashed rgba(59,167,255,0.3)",
            borderRadius: 20, padding: "1rem",
            cursor: "pointer", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 12,
              background: "#F1F5F9", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 20,
            }}>＋</div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textAlign: "center" }}>Explorar grupos</p>
          </div>
        </div>

        {/* ── STRIP ESPECIALISTAS ── */}
        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(16,185,129,0.35)",
          borderRadius: 20, padding: "1rem 1.25rem",
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: "1.5rem", cursor: "pointer",
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "#F0FFF4", border: "1px solid rgba(16,185,129,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0,
          }}>🩺</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 2 }}>Respostas verificadas por especialistas</p>
            <p style={{ fontSize: 12, color: "#34D399" }}>Fonoaudiólogos, TOs e psicólogos respondem dúvidas</p>
          </div>
          <span style={{ color: "#10B981", fontSize: 20 }}>›</span>
        </div>

        {/* ── POSTS ── */}
        <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748B", fontWeight: 700, marginBottom: "0.75rem" }}>
          {abaAtiva === "Recentes" ? "Discussões recentes" : abaAtiva}
        </p>

        {postsFiltrados.length === 0 ? (
          <div style={{
            background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
            border: "0.5px solid rgba(255,255,255,0.6)",
            borderRadius: 20, padding: "2rem 1.25rem",
            textAlign: "center",
          }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>🔍</p>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
              {busca ? "Nenhum resultado encontrado" : "Nenhuma publicação aqui ainda"}
            </p>
            <p style={{ fontSize: 13, color: "#94A3B8" }}>
              {busca ? "Tente buscar por outros termos." : "Seja o primeiro a publicar!"}
            </p>
          </div>
        ) : (
          postsFiltrados.map((p) => (
            <PostCard key={p.id} post={p} onCurtir={curtir} onSalvar={salvar} />
          ))
        )}
      </div>

      {/* FAB NOVA PUBLICAÇÃO */}
      <button
        onClick={() => setNovoPostAberto(true)}
        style={{
          position: "fixed", bottom: 76, right: "1.25rem",
          display: "flex", alignItems: "center", gap: 8,
          background: "linear-gradient(90deg, #3BA7FF, #A855F7)",
          color: "#fff", border: "none", borderRadius: 999,
          padding: "11px 20px", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 20px rgba(59,167,255,0.35)",
          zIndex: 5,
        }}
      >
        ✦ Nova publicação
      </button>

      {/* BOTTOM NAV */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.90)", backdropFilter: "blur(12px)",
        borderTop: "0.5px solid rgba(59,167,255,0.15)",
        display: "flex", padding: "8px 0 12px", zIndex: 10,
      }}>
        {[
          { icon: "🏠", label: "Início", href: "/" },
          { icon: "👤", label: "Perfil", href: "/perfil" },
          { icon: "📚", label: "Aprender", href: "/capacitacao" },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade", active: true },
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
    </main>
  );
}