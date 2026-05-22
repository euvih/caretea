"use client";

import { useState } from "react";
import Link from "next/link";

// ── TIPOS ────────────────────────────────────────────────────────────────────
type Faixa = "0-18m" | "18m-3a" | "3-6a" | "6-12a" | "12+";

type Sinal = {
  texto: string;
  peso: "alto" | "medio" | "baixo";
};

type FaixaEtaria = {
  id: Faixa;
  label: string;
  idade: string;
  emoji: string;
  cor: string;
  corClara: string;
  sinais: {
    categoria: string;
    emoji: string;
    itens: Sinal[];
  }[];
};

type Categoria = "social" | "comunicacao" | "comportamento" | "sensorial";

// ── DADOS: SINAIS POR FAIXA ETÁRIA ─────────────────────────────────────────
const faixas: FaixaEtaria[] = [
  {
    id: "0-18m",
    label: "0 a 18 meses",
    idade: "Bebê",
    emoji: "👶",
    cor: "#3BA7FF",
    corClara: "#EEF6FF",
    sinais: [
      {
        categoria: "Contato social",
        emoji: "👁️",
        itens: [
          { texto: "Pouco ou nenhum contato visual mesmo quando chamado", peso: "alto" },
          { texto: "Não sorri de volta quando alguém sorri para ele(a)", peso: "alto" },
          { texto: "Não responde ao próprio nome aos 12 meses", peso: "alto" },
          { texto: "Não aponta para objetos para chamar atenção (ex: mostrar um brinquedo) até os 14 meses", peso: "alto" },
          { texto: "Não imita gestos simples como bater palmas ou dar tchau", peso: "medio" },
        ],
      },
      {
        categoria: "Comunicação",
        emoji: "💬",
        itens: [
          { texto: "Não balbucia (faz sons como 'bababa', 'mamama') até os 12 meses", peso: "alto" },
          { texto: "Não usa gestos (apontar, acenar) até os 12 meses", peso: "alto" },
          { texto: "Não fala nenhuma palavra aos 16 meses", peso: "alto" },
          { texto: "Perde habilidades de fala ou sociais que já havia adquirido", peso: "alto" },
        ],
      },
      {
        categoria: "Comportamento",
        emoji: "🔄",
        itens: [
          { texto: "Interessa-se muito mais em objetos do que em pessoas", peso: "medio" },
          { texto: "Parece não notar quando os pais saem ou voltam", peso: "medio" },
          { texto: "Reage de forma muito intensa (ou muito pouca) a sons e texturas", peso: "baixo" },
        ],
      },
    ],
  },
  {
    id: "18m-3a",
    label: "18 meses a 3 anos",
    idade: "Toddler",
    emoji: "🧒",
    cor: "#A855F7",
    corClara: "#F5F0FF",
    sinais: [
      {
        categoria: "Comunicação",
        emoji: "💬",
        itens: [
          { texto: "Não usa frases de 2 palavras espontâneas aos 24 meses (ex: 'mais água')", peso: "alto" },
          { texto: "Repete frases ou palavras fora de contexto (ecolalia)", peso: "medio" },
          { texto: "Usa a mão do outro como se fosse uma ferramenta, sem olhar para a pessoa", peso: "alto" },
          { texto: "Dificuldade para iniciar ou manter uma conversa simples", peso: "medio" },
          { texto: "Fala sobre um único tema repetidamente e com intensidade", peso: "baixo" },
        ],
      },
      {
        categoria: "Interação social",
        emoji: "👥",
        itens: [
          { texto: "Prefere brincar sozinho e não demonstra interesse em outras crianças", peso: "medio" },
          { texto: "Não brinca de 'faz de conta' (ex: fazer de conta que toma chá, que é um médico)", peso: "alto" },
          { texto: "Dificuldade para entender emoções básicas dos outros", peso: "medio" },
          { texto: "Não compartilha interesses espontaneamente ('olha isso!')", peso: "medio" },
        ],
      },
      {
        categoria: "Comportamentos repetitivos",
        emoji: "🔄",
        itens: [
          { texto: "Alinha, empilha ou organiza objetos de forma muito rígida e perturbação gera angústia intensa", peso: "medio" },
          { texto: "Movimentos repetitivos com corpo, mãos ou objetos (balançar, girar)", peso: "medio" },
          { texto: "Reação muito intensa a mudanças na rotina", peso: "medio" },
          { texto: "Apego intenso a objetos específicos e incomuns", peso: "baixo" },
        ],
      },
    ],
  },
  {
    id: "3-6a",
    label: "3 a 6 anos",
    idade: "Pré-escolar",
    emoji: "🎒",
    cor: "#10B981",
    corClara: "#ECFDF5",
    sinais: [
      {
        categoria: "Comunicação e linguagem",
        emoji: "💬",
        itens: [
          { texto: "Dificuldade para entender perguntas indiretas ou metáforas simples", peso: "medio" },
          { texto: "Fala de forma muito formal, robotizada ou com sotaque incomum para a idade", peso: "medio" },
          { texto: "Repete falas de filmes, séries ou músicas em contextos inapropriados", peso: "medio" },
          { texto: "Dificuldade para contar uma história de forma sequencial", peso: "baixo" },
        ],
      },
      {
        categoria: "Interação social",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade para fazer ou manter amizades com crianças da mesma idade", peso: "medio" },
          { texto: "Não entende regras implícitas das brincadeiras em grupo", peso: "medio" },
          { texto: "Reação desproporcional quando não é o primeiro, perde um jogo ou a rotina muda", peso: "medio" },
          { texto: "Não percebe quando o outro está chateado, bravo ou desconfortável", peso: "medio" },
        ],
      },
      {
        categoria: "Sensorial e comportamental",
        emoji: "🌡️",
        itens: [
          { texto: "Recusa categoricamente certos alimentos por textura, cor ou cheiro", peso: "baixo" },
          { texto: "Evita ou busca intensamente estímulos sensoriais (luz, som, toque)", peso: "medio" },
          { texto: "Dificuldade para usar banheiros públicos ou ambientes barulhentos", peso: "baixo" },
          { texto: "Interesses muito intensos e restritos a um tema específico", peso: "medio" },
        ],
      },
    ],
  },
  {
    id: "6-12a",
    label: "6 a 12 anos",
    idade: "Escolar",
    emoji: "📚",
    cor: "#F59E0B",
    corClara: "#FFFBEB",
    sinais: [
      {
        categoria: "Social e relacional",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade para entender ironias, sarcasmo e piadas", peso: "medio" },
          { texto: "Interpreta tudo de forma literal ('você tem olhos nas costas?' gera confusão)", peso: "medio" },
          { texto: "Dificuldade para iniciar conversas ou mantê-las fora de seus temas de interesse", peso: "medio" },
          { texto: "Relata não entender por que foi excluído socialmente mesmo seguindo regras", peso: "medio" },
          { texto: "Prefere conversar com adultos ou crianças muito mais novas", peso: "baixo" },
        ],
      },
      {
        categoria: "Comportamento e rotina",
        emoji: "🔄",
        itens: [
          { texto: "Dificuldade intensa para transitar entre atividades ou encerrar uma tarefa", peso: "medio" },
          { texto: "Rituais específicos que, se quebrados, causam angústia intensa", peso: "medio" },
          { texto: "Dificuldade para lidar com imprevistos mesmo pequenos", peso: "medio" },
          { texto: "Perda de habilidades sociais em situações novas ou estressantes", peso: "alto" },
        ],
      },
      {
        categoria: "Escolar e cognitivo",
        emoji: "🧠",
        itens: [
          { texto: "Dificuldade para trabalhar em grupo mesmo com boa capacidade individual", peso: "baixo" },
          { texto: "Habilidades muito desiguais: pode ser muito avançado em uma área e defasado em outra", peso: "medio" },
          { texto: "Dificuldade para entender contexto, subentendidos e intenções alheias", peso: "medio" },
        ],
      },
    ],
  },
  {
    id: "12+",
    label: "12 anos ou mais",
    idade: "Adolescente/Adulto",
    emoji: "🧑",
    cor: "#FF4D6D",
    corClara: "#FFF0F3",
    sinais: [
      {
        categoria: "Social e comunicação",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade intensa para ler 'regras sociais não ditas' (quando é hora de ir embora, quando está sendo inconveniente)", peso: "medio" },
          { texto: "Sente-se 'diferente' dos outros mas não consegue nomear por quê", peso: "medio" },
          { texto: "Desenvolve 'máscaras sociais' — aprende a imitar comportamentos sem entender naturalmente (masking)", peso: "alto" },
          { texto: "Exaustão intensa após interações sociais que parecem simples para os outros", peso: "medio" },
          { texto: "Dificuldade para manter relacionamentos mesmo querendo muito", peso: "medio" },
        ],
      },
      {
        categoria: "Comportamento e interesses",
        emoji: "🔄",
        itens: [
          { texto: "Interesses muito intensos e específicos que dominam o tempo e energia", peso: "medio" },
          { texto: "Dificuldade para lidar com críticas, mesmo quando dadas com cuidado", peso: "baixo" },
          { texto: "Rotinas rígidas e desconforto intenso quando quebradas", peso: "medio" },
          { texto: "Tendência a hiperfoco: faz uma coisa com intensidade total e esquece tudo ao redor", peso: "medio" },
        ],
      },
      {
        categoria: "Saúde mental associada",
        emoji: "💙",
        itens: [
          { texto: "Histórico de ansiedade ou depressão sem causa clara identificada", peso: "baixo" },
          { texto: "Sensação constante de não pertencer ou ser 'alien' no mundo social", peso: "medio" },
          { texto: "Burnout autístico: períodos de colapso total após esforço social prolongado", peso: "alto" },
        ],
      },
    ],
  },
];

// ── MITOS E VERDADES ─────────────────────────────────────────────────────────
const mitosVerdades = [
  {
    mito: "Toda criança com TEA não fala",
    verdade: "Pessoas com TEA têm perfis muito variados. Muitas falam fluentemente — o desafio está na comunicação social, não necessariamente na fala.",
  },
  {
    mito: "Se a criança faz contato visual, não pode ser TEA",
    verdade: "Contato visual existe em diferentes graus no TEA. Algumas pessoas aprendem a fazê-lo mesmo sem ser natural. Ausência de contato visual isolada não confirma nem descarta TEA.",
  },
  {
    mito: "TEA só aparece em crianças, nunca em adultos",
    verdade: "Muitos adultos são diagnosticados tardiamente, especialmente mulheres e pessoas que desenvolveram habilidades de mascaramento. O TEA não some — muda de forma.",
  },
  {
    mito: "A criança é inteligente demais para ter TEA",
    verdade: "Inteligência não exclui TEA. Algumas pessoas têm QI muito acima da média e ainda assim apresentam dificuldades significativas de funcionamento social.",
  },
  {
    mito: "Quem tem TEA não tem empatia",
    verdade: "Pessoas com TEA frequentemente sentem as emoções dos outros de forma muito intensa — o desafio está em interpretar e responder às emoções, não em senti-las.",
  },
];

// ── PRÓXIMOS PASSOS ──────────────────────────────────────────────────────────
const proximosPassos = [
  { icon: "📋", titulo: "Registre o que observa", descricao: "Anote situações específicas com data, contexto e comportamento. Isso é ouro para qualquer profissional que for avaliar." },
  { icon: "👨‍⚕️", titulo: "Procure um pediatra ou clínico", descricao: "O primeiro passo é uma avaliação clínica. Peça encaminhamento para neuropediatra, psiquiatra infantil ou psicólogo especializado em TEA." },
  { icon: "🧠", titulo: "Avaliação multidisciplinar", descricao: "O diagnóstico de TEA é feito por equipe multiprofissional: psicólogo, fonoaudiólogo, neuropediatra. Não existe exame de sangue ou imagem para TEA." },
  { icon: "⏳", titulo: "O diagnóstico pode demorar", descricao: "No Brasil, filas do SUS podem ser longas. Clínicas privadas e ONGs especializadas podem acelerar o processo. Não espere o laudo para buscar apoio." },
  { icon: "💙", titulo: "Você não precisa de laudo para começar", descricao: "Estratégias de comunicação, rotina e regulação emocional beneficiam qualquer criança — com ou sem diagnóstico. Comece agora." },
];

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function SinaisDeAlerta() {
  const [faixaSelecionada, setFaixaSelecionada] = useState<Faixa>("18m-3a");
  const [expandidoIndex, setExpandidoIndex] = useState<number | null>(0);
  const [mitoAberto, setMitoAberto] = useState<number | null>(null);
  const [checados, setChecados] = useState<Record<string, boolean>>({});

  const faixaAtual = faixas.find((f) => f.id === faixaSelecionada)!;
  const totalSinais = faixaAtual.sinais.reduce((s, c) => s + c.itens.length, 0);
  const totalChecados = Object.values(checados).filter(Boolean).length;
  const altosPeso = faixaAtual.sinais.flatMap((c) => c.itens).filter((i) => i.peso === "alto" && checados[i.texto]).length;

  const nivelAlerta = altosPeso >= 3 ? "alto" : altosPeso >= 1 || totalChecados >= 4 ? "medio" : totalChecados >= 2 ? "baixo" : null;

  const pesoInfo = {
    alto: { label: "Sinal de alto impacto", cor: "#FF4D6D", bg: "#FFF0F3" },
    medio: { label: "Sinal relevante", cor: "#F59E0B", bg: "#FFFBEB" },
    baixo: { label: "Sinal de atenção", cor: "#3BA7FF", bg: "#EEF6FF" },
  };

  const alertaInfo = {
    alto: { label: "Recomendamos buscar avaliação profissional", cor: "#FF4D6D", bg: "#FFF0F3", emoji: "🔴" },
    medio: { label: "Vale conversar com um pediatra sobre o que observou", cor: "#F59E0B", bg: "#FFFBEB", emoji: "🟡" },
    baixo: { label: "Continue observando e registrando", cor: "#3BA7FF", bg: "#EEF6FF", emoji: "🔵" },
  };

  const toggleChecado = (texto: string) => {
    setChecados((c) => ({ ...c, [texto]: !c[texto] }));
  };

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>

      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(215,221,240,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.5)",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Link href="/capacitacao" style={{
          width: 40, height: 40, borderRadius: 14, background: "#fff",
          textDecoration: "none", color: "#1E293B", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", flexShrink: 0,
        }}>←</Link>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#3BA7FF", textTransform: "uppercase", letterSpacing: "0.1em" }}>Fundamentos • Módulo 01</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#152641" }}>Sinais de Alerta para o TEA</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "1.25rem 1.25rem 0" }}>

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #3BA7FF 0%, #2563EB 100%)",
          borderRadius: 24, padding: "1.75rem 1.5rem", marginBottom: "1.25rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
          <div style={{ position: "absolute", left: -20, bottom: -40, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 36, display: "block", marginBottom: 10, position: "relative" }}>🔍</span>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 8, position: "relative" }}>
            Sinais de alerta para o TEA
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, position: "relative" }}>
            Estes sinais <strong>não são diagnóstico</strong> — são indicadores que podem sinalizar a necessidade de avaliação profissional. Conhecê-los é o primeiro passo.
          </p>
        </div>

        {/* AVISO IMPORTANTE */}
        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "1.25rem", marginBottom: "1.25rem",
          borderLeft: "4px solid #F59E0B",
          display: "flex", gap: 12, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>
              Leia antes de continuar
            </p>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
              Esta página apresenta sinais de alerta baseados no DSM-5 e em evidências clínicas. Nenhuma lista de sinais substitui avaliação profissional. Crianças se desenvolvem em ritmos diferentes — a presença de um ou dois sinais isolados não significa diagnóstico de TEA.
            </p>
          </div>
        </div>

        {/* SELETOR DE FAIXA ETÁRIA */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 10 }}>
          Selecione a faixa etária
        </p>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: "1.25rem" }}>
          {faixas.map((f) => {
            const ativa = faixaSelecionada === f.id;
            return (
              <button key={f.id} onClick={() => { setFaixaSelecionada(f.id); setExpandidoIndex(0); setChecados({}); }} style={{
                flexShrink: 0, borderRadius: 16,
                padding: "8px 14px",
                border: ativa ? `2px solid ${f.cor}` : "1.5px solid rgba(255,255,255,0.6)",
                background: ativa ? f.cor : "rgba(255,255,255,0.75)",
                cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
              }}>
                <p style={{ fontSize: 16, marginBottom: 2 }}>{f.emoji}</p>
                <p style={{ fontSize: 10, fontWeight: 800, color: ativa ? "#fff" : "#64748B", whiteSpace: "nowrap" }}>{f.label}</p>
              </button>
            );
          })}
        </div>

        {/* CABEÇALHO DA FAIXA */}
        <div style={{
          background: faixaAtual.corClara, borderRadius: 20,
          padding: "1.25rem", marginBottom: "1rem",
          border: `1.5px solid ${faixaAtual.cor}25`,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ fontSize: 36 }}>{faixaAtual.emoji}</div>
          <div>
            <p style={{ fontSize: 16, fontWeight: 900, color: faixaAtual.cor, marginBottom: 2 }}>{faixaAtual.label}</p>
            <p style={{ fontSize: 12, color: "#64748B" }}>{faixaAtual.sinais.reduce((s, c) => s + c.itens.length, 0)} sinais para observar nessa faixa</p>
          </div>
        </div>

        {/* LEGENDA */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem" }}>
          {Object.entries(pesoInfo).map(([k, v]) => (
            <div key={k} style={{
              display: "flex", alignItems: "center", gap: 6,
              background: v.bg, borderRadius: 999, padding: "4px 12px",
              border: `1px solid ${v.cor}25`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: v.cor }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: v.cor }}>{v.label}</span>
            </div>
          ))}
        </div>

        {/* CATEGORIAS DE SINAIS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: "1.25rem" }}>
          {faixaAtual.sinais.map((cat, ci) => {
            const aberto = expandidoIndex === ci;
            return (
              <div key={ci} style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)",
                borderRadius: 20, border: "0.5px solid rgba(255,255,255,0.6)",
                overflow: "hidden",
              }}>
                {/* cabeçalho categoria */}
                <button onClick={() => setExpandidoIndex(aberto ? null : ci)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12,
                  padding: "1rem 1.25rem", background: "transparent", border: "none",
                  cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: faixaAtual.corClara,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>{cat.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#1E293B" }}>{cat.categoria}</p>
                    <p style={{ fontSize: 12, color: "#94A3B8" }}>{cat.itens.length} sinais</p>
                  </div>
                  <span style={{
                    fontSize: 16, color: "#CBD5E1",
                    transform: aberto ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s", display: "block",
                  }}>⌄</span>
                </button>

                {/* sinais */}
                {aberto && (
                  <div style={{ padding: "0 1.25rem 1.25rem", display: "flex", flexDirection: "column", gap: 8 }}>
                    {cat.itens.map((sinal, si) => {
                      const info = pesoInfo[sinal.peso];
                      const marcado = !!checados[sinal.texto];
                      return (
                        <button key={si} onClick={() => toggleChecado(sinal.texto)} style={{
                          display: "flex", alignItems: "flex-start", gap: 12,
                          background: marcado ? info.bg : "#F8FAFF",
                          border: marcado ? `1.5px solid ${info.cor}40` : "1px solid #EEF2FF",
                          borderRadius: 14, padding: "12px 14px",
                          cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                          transition: "all 0.2s",
                        }}>
                          {/* checkbox */}
                          <div style={{
                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                            background: marcado ? info.cor : "transparent",
                            border: marcado ? "none" : `2px solid ${info.cor}60`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 11, color: "#fff", fontWeight: 800,
                            transition: "all 0.2s",
                          }}>
                            {marcado ? "✓" : ""}
                          </div>

                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: "#1E293B", lineHeight: 1.6 }}>
                              {sinal.texto}
                            </p>
                            <span style={{
                              display: "inline-block", marginTop: 4,
                              fontSize: 10, fontWeight: 700, color: info.cor,
                              background: info.bg, borderRadius: 999, padding: "2px 8px",
                            }}>{info.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PAINEL DE RESULTADO */}
        {totalChecados > 0 && (
          <div style={{
            background: nivelAlerta ? alertaInfo[nivelAlerta].bg : "#F8FAFF",
            border: nivelAlerta ? `1.5px solid ${alertaInfo[nivelAlerta].cor}30` : "1px solid #EEF2FF",
            borderRadius: 20, padding: "1.25rem", marginBottom: "1.25rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22 }}>{nivelAlerta ? alertaInfo[nivelAlerta].emoji : "🔵"}</span>
              <p style={{ fontSize: 15, fontWeight: 800, color: "#1E293B" }}>
                {totalChecados} sinal(is) marcado(s)
              </p>
            </div>
            {nivelAlerta && (
              <p style={{ fontSize: 13, fontWeight: 600, color: alertaInfo[nivelAlerta].cor, marginBottom: 8 }}>
                {alertaInfo[nivelAlerta].label}
              </p>
            )}
            <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.7 }}>
              {altosPeso >= 3
                ? "Foram marcados múltiplos sinais de alto impacto. Isso não é um diagnóstico, mas recomendamos fortemente buscar avaliação com neuropediatra ou psicólogo especializado em TEA."
                : altosPeso >= 1
                ? "Há sinais de alto impacto marcados. Converse com o pediatra da criança sobre o que você observou e peça encaminhamento se necessário."
                : totalChecados >= 4
                ? "Vários sinais marcados. Vale registrar essas observações e discutir com um profissional de saúde."
                : "Continue observando. Registre situações específicas com data e contexto para compartilhar com profissionais se necessário."}
            </p>
            <button
              onClick={() => setChecados({})}
              style={{
                marginTop: 12, background: "transparent", border: "none",
                fontSize: 12, color: "#94A3B8", cursor: "pointer",
                fontFamily: "inherit", textDecoration: "underline",
              }}
            >
              Limpar seleção
            </button>
          </div>
        )}

        {/* MITOS E VERDADES */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 12 }}>
            Mitos e verdades sobre o TEA
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mitosVerdades.map((mv, i) => {
              const aberto = mitoAberto === i;
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)",
                  borderRadius: 16, border: "0.5px solid rgba(255,255,255,0.6)",
                  overflow: "hidden",
                }}>
                  <button onClick={() => setMitoAberto(aberto ? null : i)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "14px 16px", background: "transparent", border: "none",
                    cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: "#FF4D6D",
                      background: "#FFF0F3", borderRadius: 999, padding: "3px 10px",
                      flexShrink: 0,
                    }}>MITO</span>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", flex: 1 }}>{mv.mito}</p>
                    <span style={{
                      fontSize: 14, color: "#CBD5E1", flexShrink: 0,
                      transform: aberto ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s",
                    }}>⌄</span>
                  </button>
                  {aberto && (
                    <div style={{ padding: "0 16px 14px" }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <span style={{
                          fontSize: 10, fontWeight: 800, color: "#10B981",
                          background: "#ECFDF5", borderRadius: 999, padding: "3px 10px",
                          flexShrink: 0, marginTop: 2,
                        }}>VERDADE</span>
                        <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{mv.verdade}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* PRÓXIMOS PASSOS */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 12 }}>
            O que fazer se identificar sinais?
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {proximosPassos.map((p, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)",
                borderRadius: 18, padding: "1rem 1.25rem",
                border: "0.5px solid rgba(255,255,255,0.6)",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: "#EEF6FF",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>{p.icon}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 4 }}>{p.titulo}</p>
                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65 }}>{p.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AVISO FINAL */}
        <div style={{
          background: "linear-gradient(135deg, #3BA7FF15, #A855F715)",
          borderRadius: 20, padding: "1.25rem",
          border: "0.5px solid rgba(59,167,255,0.15)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 22, marginBottom: 8 }}>💙</p>
          <p style={{ fontSize: 14, fontWeight: 800, color: "#152641", marginBottom: 6 }}>
            Observar é um ato de amor
          </p>
          <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>
            O fato de você estar aqui, aprendendo a reconhecer sinais, já mostra o cuidado que você tem. Diagnóstico precoce abre portas — e você pode ser o primeiro a abri-las.
          </p>
        </div>

      </div>
    </main>
  );
}