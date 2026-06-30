"use client";

import { useState } from "react";
import Link from "next/link";

type Faixa = "0-18m" | "18m-3a" | "3-6a" | "6-12a" | "12+";

type Sinal = {
  texto: string;
  peso: "alto" | "medio" | "baixo";
};

type FaixaEtaria = {
  id: Faixa;
  label: string;
  emoji: string;
  cor: string;
  corBg: string;
  sinais: {
    categoria: string;
    emoji: string;
    itens: Sinal[];
  }[];
};

const faixas: FaixaEtaria[] = [
  {
    id: "0-18m",
    label: "0 a 18 meses",
    emoji: "👶",
    cor: "#3BA7FF",
    corBg: "rgba(59,167,255,0.12)",
    sinais: [
      {
        categoria: "Contato social",
        emoji: "👁️",
        itens: [
          { texto: "Pouco ou nenhum contato visual mesmo quando chamado", peso: "alto" },
          { texto: "Não sorri de volta quando alguém sorri para ele(a)", peso: "alto" },
          { texto: "Não responde ao próprio nome aos 12 meses", peso: "alto" },
          { texto: "Não aponta para objetos para chamar atenção até os 14 meses", peso: "alto" },
          { texto: "Não imita gestos simples como bater palmas ou dar tchau", peso: "medio" },
        ],
      },
      {
        categoria: "Comunicação",
        emoji: "💬",
        itens: [
          { texto: "Não balbucia (sons como 'bababa', 'mamama') até os 12 meses", peso: "alto" },
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
    label: "18m a 3 anos",
    emoji: "🧒",
    cor: "#A855F7",
    corBg: "rgba(168,85,247,0.12)",
    sinais: [
      {
        categoria: "Comunicação",
        emoji: "💬",
        itens: [
          { texto: "Não usa frases de 2 palavras espontâneas aos 24 meses", peso: "alto" },
          { texto: "Repete frases ou palavras fora de contexto (ecolalia)", peso: "medio" },
          { texto: "Usa a mão do outro como ferramenta, sem olhar para a pessoa", peso: "alto" },
          { texto: "Dificuldade para iniciar ou manter uma conversa simples", peso: "medio" },
          { texto: "Fala sobre um único tema repetidamente e com intensidade", peso: "baixo" },
        ],
      },
      {
        categoria: "Interação social",
        emoji: "👥",
        itens: [
          { texto: "Prefere brincar sozinho e não demonstra interesse em outras crianças", peso: "medio" },
          { texto: "Não brinca de faz de conta (ex: fazer de conta que toma chá)", peso: "alto" },
          { texto: "Dificuldade para entender emoções básicas dos outros", peso: "medio" },
          { texto: "Não compartilha interesses espontaneamente ('olha isso!')", peso: "medio" },
        ],
      },
      {
        categoria: "Comportamentos repetitivos",
        emoji: "🔄",
        itens: [
          { texto: "Alinha, empilha ou organiza objetos de forma muito rígida", peso: "medio" },
          { texto: "Movimentos repetitivos com corpo, mãos ou objetos", peso: "medio" },
          { texto: "Reação muito intensa a mudanças na rotina", peso: "medio" },
          { texto: "Apego intenso a objetos específicos e incomuns", peso: "baixo" },
        ],
      },
    ],
  },
  {
    id: "3-6a",
    label: "3 a 6 anos",
    emoji: "🎒",
    cor: "#10B981",
    corBg: "rgba(16,185,129,0.12)",
    sinais: [
      {
        categoria: "Comunicação e linguagem",
        emoji: "💬",
        itens: [
          { texto: "Dificuldade para entender perguntas indiretas ou metáforas simples", peso: "medio" },
          { texto: "Fala de forma muito formal, robotizada ou com sotaque incomum", peso: "medio" },
          { texto: "Repete falas de filmes ou músicas em contextos inapropriados", peso: "medio" },
          { texto: "Dificuldade para contar uma história de forma sequencial", peso: "baixo" },
        ],
      },
      {
        categoria: "Interação social",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade para fazer ou manter amizades com crianças da mesma idade", peso: "medio" },
          { texto: "Não entende regras implícitas das brincadeiras em grupo", peso: "medio" },
          { texto: "Reação desproporcional quando perde um jogo ou a rotina muda", peso: "medio" },
          { texto: "Não percebe quando o outro está chateado ou desconfortável", peso: "medio" },
        ],
      },
      {
        categoria: "Sensorial e comportamental",
        emoji: "🌡️",
        itens: [
          { texto: "Recusa categoricamente certos alimentos por textura, cor ou cheiro", peso: "baixo" },
          { texto: "Evita ou busca intensamente estímulos sensoriais", peso: "medio" },
          { texto: "Dificuldade para usar banheiros públicos ou ambientes barulhentos", peso: "baixo" },
          { texto: "Interesses muito intensos e restritos a um tema específico", peso: "medio" },
        ],
      },
    ],
  },
  {
    id: "6-12a",
    label: "6 a 12 anos",
    emoji: "📚",
    cor: "#F59E0B",
    corBg: "rgba(245,158,11,0.12)",
    sinais: [
      {
        categoria: "Social e relacional",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade para entender ironias, sarcasmo e piadas", peso: "medio" },
          { texto: "Interpreta tudo de forma literal", peso: "medio" },
          { texto: "Dificuldade para iniciar conversas fora de seus temas de interesse", peso: "medio" },
          { texto: "Relata não entender por que foi excluído socialmente", peso: "medio" },
          { texto: "Prefere conversar com adultos ou crianças muito mais novas", peso: "baixo" },
        ],
      },
      {
        categoria: "Comportamento e rotina",
        emoji: "🔄",
        itens: [
          { texto: "Dificuldade intensa para transitar entre atividades", peso: "medio" },
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
          { texto: "Habilidades muito desiguais: avançado em uma área e defasado em outra", peso: "medio" },
          { texto: "Dificuldade para entender contexto, subentendidos e intenções alheias", peso: "medio" },
        ],
      },
    ],
  },
  {
    id: "12+",
    label: "12 anos ou mais",
    emoji: "🧑",
    cor: "#FF4D6D",
    corBg: "rgba(255,77,109,0.12)",
    sinais: [
      {
        categoria: "Social e comunicação",
        emoji: "👥",
        itens: [
          { texto: "Dificuldade para ler 'regras sociais não ditas'", peso: "medio" },
          { texto: "Sente-se 'diferente' mas não consegue nomear por quê", peso: "medio" },
          { texto: "Desenvolve máscaras sociais (masking) — imita sem entender naturalmente", peso: "alto" },
          { texto: "Exaustão intensa após interações sociais simples", peso: "medio" },
          { texto: "Dificuldade para manter relacionamentos mesmo querendo muito", peso: "medio" },
        ],
      },
      {
        categoria: "Comportamento e interesses",
        emoji: "🔄",
        itens: [
          { texto: "Interesses muito intensos e específicos que dominam tempo e energia", peso: "medio" },
          { texto: "Dificuldade para lidar com críticas, mesmo dadas com cuidado", peso: "baixo" },
          { texto: "Rotinas rígidas e desconforto intenso quando quebradas", peso: "medio" },
          { texto: "Hiperfoco: faz uma coisa com intensidade total e esquece tudo ao redor", peso: "medio" },
        ],
      },
      {
        categoria: "Saúde mental associada",
        emoji: "💙",
        itens: [
          { texto: "Histórico de ansiedade ou depressão sem causa clara identificada", peso: "baixo" },
          { texto: "Sensação constante de não pertencer no mundo social", peso: "medio" },
          { texto: "Burnout autístico: colapso total após esforço social prolongado", peso: "alto" },
        ],
      },
    ],
  },
];

const mitosVerdades = [
  {
    mito: "Toda criança com TEA não fala",
    verdade: "Pessoas com TEA têm perfis muito variados. Muitas falam fluentemente — o desafio está na comunicação social, não na fala em si.",
  },
  {
    mito: "Se faz contato visual, não pode ser TEA",
    verdade: "Contato visual existe em graus variados no TEA. Algumas pessoas aprendem a fazê-lo mesmo sem ser natural.",
  },
  {
    mito: "TEA só aparece em crianças",
    verdade: "Muitos adultos são diagnosticados tardiamente, especialmente mulheres. O TEA não some — muda de forma.",
  },
  {
    mito: "Quem é inteligente demais não tem TEA",
    verdade: "Inteligência não exclui TEA. Algumas pessoas têm QI elevado e ainda assim apresentam dificuldades significativas de funcionamento social.",
  },
  {
    mito: "Quem tem TEA não tem empatia",
    verdade: "Pessoas com TEA frequentemente sentem as emoções dos outros de forma intensa — o desafio está em interpretar e responder, não em sentir.",
  },
];

const proximosPassos = [
  { icon: "📋", titulo: "Registre o que observa", descricao: "Anote situações com data, contexto e comportamento. Isso é essencial para qualquer profissional que for avaliar." },
  { icon: "👨‍⚕️", titulo: "Procure um pediatra ou clínico", descricao: "Peça encaminhamento para neuropediatra, psiquiatra infantil ou psicólogo especializado em TEA." },
  { icon: "🧠", titulo: "Avaliação multidisciplinar", descricao: "O diagnóstico é feito por equipe multiprofissional. Não existe exame de sangue ou imagem para TEA." },
  { icon: "💙", titulo: "Você não precisa esperar o laudo", descricao: "Estratégias de comunicação e regulação emocional beneficiam qualquer pessoa — com ou sem diagnóstico." },
];

const pesoInfo = {
  alto: { label: "Alto impacto", cor: "#FF4D6D", bg: "rgba(255,77,109,0.12)", border: "rgba(255,77,109,0.25)" },
  medio: { label: "Relevante", cor: "#F59E0B", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
  baixo: { label: "Atenção", cor: "#3BA7FF", bg: "rgba(59,167,255,0.12)", border: "rgba(59,167,255,0.25)" },
};

export default function SinaisDeAlerta() {
  const [faixaSelecionada, setFaixaSelecionada] = useState<Faixa>("18m-3a");
  const [expandidoIndex, setExpandidoIndex] = useState<number | null>(0);
  const [mitoAberto, setMitoAberto] = useState<number | null>(null);
  const [checados, setChecados] = useState<Record<string, boolean>>({});

  const faixaAtual = faixas.find((f) => f.id === faixaSelecionada)!;
  const totalChecados = Object.values(checados).filter(Boolean).length;
  const altosPeso = faixaAtual.sinais.flatMap((c) => c.itens).filter((i) => i.peso === "alto" && checados[i.texto]).length;
  const nivelAlerta = altosPeso >= 3 ? "alto" : altosPeso >= 1 || totalChecados >= 4 ? "medio" : totalChecados >= 2 ? "baixo" : null;

  const alertaInfo = {
    alto: { label: "Recomendamos buscar avaliação profissional", cor: "#FF4D6D", bg: "rgba(255,77,109,0.10)", emoji: "🔴" },
    medio: { label: "Vale conversar com um pediatra sobre o que observou", cor: "#F59E0B", bg: "rgba(245,158,11,0.10)", emoji: "🟡" },
    baixo: { label: "Continue observando e registrando", cor: "#3BA7FF", bg: "rgba(59,167,255,0.10)", emoji: "🔵" },
  };

  const toggleChecado = (texto: string) => {
    setChecados((c) => ({ ...c, [texto]: !c[texto] }));
  };

  return (
    <main className="min-h-screen bg-[#050d1a] pb-24 text-white">

      {/* HEADER */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#050d1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 py-4">
          <Link
            href="/capacitacao"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm text-[#94A3B8] transition hover:bg-white/15"
          >←</Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3BA7FF]">Módulo 01 · Fundamentos</p>
            <p className="text-sm font-bold text-white truncate">Sinais de Alerta para o TEA</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3BA7FF]/15 text-base">🔍</div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5">

        {/* HERO */}
        <section className="py-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[#3BA7FF]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3BA7FF]">Unidade 3</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold text-[#64748B]">Interativo</span>
          </div>
          <h1 className="mb-3 text-3xl font-black leading-tight">
            Sinais de{" "}
            <span className="bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] bg-clip-text text-transparent">alerta</span>
          </h1>
          <p className="text-sm leading-7 text-[#64748B]">
            Selecione a faixa etária e marque os sinais que você observa. Esta ferramenta não faz diagnóstico — orienta quando buscar avaliação profissional.
          </p>
        </section>

        {/* AVISO */}
        <div className="mb-6 flex gap-3 rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/8 p-4">
          <span className="shrink-0 text-lg">⚠️</span>
          <p className="text-xs leading-6 text-[#94A3B8]">
            <span className="font-bold text-white">Importante: </span>
            Sinais isolados não confirmam TEA. Crianças se desenvolvem em ritmos diferentes. Use esta lista para orientar observações e conversas com profissionais.
          </p>
        </div>

        {/* SELETOR DE FAIXA */}
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#475569]">Selecione a faixa etária</p>
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {faixas.map((f) => {
            const ativa = faixaSelecionada === f.id;
            return (
              <button
                key={f.id}
                onClick={() => { setFaixaSelecionada(f.id); setExpandidoIndex(0); setChecados({}); }}
                className="shrink-0 rounded-2xl px-4 py-3 text-left transition"
                style={{
                  background: ativa ? f.corBg : "rgba(255,255,255,0.04)",
                  border: ativa ? `1.5px solid ${f.cor}50` : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="mb-1 text-base">{f.emoji}</p>
                <p className="text-[10px] font-bold whitespace-nowrap" style={{ color: ativa ? f.cor : "#475569" }}>{f.label}</p>
              </button>
            );
          })}
        </div>

        {/* LEGENDA */}
        <div className="mb-5 flex flex-wrap gap-2">
          {Object.entries(pesoInfo).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2 rounded-full px-3 py-1" style={{ background: v.bg }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: v.cor }} />
              <span className="text-[10px] font-bold" style={{ color: v.cor }}>{v.label}</span>
            </div>
          ))}
        </div>

        {/* CATEGORIAS */}
        <div className="mb-6 flex flex-col gap-3">
          {faixaAtual.sinais.map((cat, ci) => {
            const aberto = expandidoIndex === ci;
            return (
              <div key={ci} className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
                <button
                  onClick={() => setExpandidoIndex(aberto ? null : ci)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/5"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                    style={{ background: faixaAtual.corBg }}
                  >{cat.emoji}</div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white">{cat.categoria}</p>
                    <p className="text-xs text-[#475569]">{cat.itens.length} sinais</p>
                  </div>
                  <span className={`text-[#475569] transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}>⌄</span>
                </button>

                {aberto && (
                  <div className="border-t border-white/5 px-5 pb-5 pt-3">
                    <div className="flex flex-col gap-2">
                      {cat.itens.map((sinal, si) => {
                        const info = pesoInfo[sinal.peso];
                        const marcado = !!checados[sinal.texto];
                        return (
                          <button
                            key={si}
                            onClick={() => toggleChecado(sinal.texto)}
                            className="flex items-start gap-3 rounded-xl px-4 py-3 text-left transition"
                            style={{
                              background: marcado ? info.bg : "rgba(255,255,255,0.03)",
                              border: marcado ? `1px solid ${info.border}` : "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <div
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white transition"
                              style={{
                                background: marcado ? info.cor : "transparent",
                                border: marcado ? "none" : `1.5px solid ${info.cor}50`,
                              }}
                            >{marcado ? "✓" : ""}</div>
                            <div className="flex-1">
                              <p className="text-xs leading-6 text-[#CBD5E1]">{sinal.texto}</p>
                              <span
                                className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold"
                                style={{ background: info.bg, color: info.cor }}
                              >{info.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* RESULTADO */}
        {totalChecados > 0 && nivelAlerta && (
          <div
            className="mb-6 rounded-2xl p-5"
            style={{ background: alertaInfo[nivelAlerta].bg, border: `1px solid ${alertaInfo[nivelAlerta].cor}25` }}
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xl">{alertaInfo[nivelAlerta].emoji}</span>
              <div>
                <p className="text-sm font-black text-white">{totalChecados} sinal(is) marcado(s)</p>
                <p className="text-xs font-semibold" style={{ color: alertaInfo[nivelAlerta].cor }}>
                  {alertaInfo[nivelAlerta].label}
                </p>
              </div>
            </div>
            <p className="mb-3 text-xs leading-6 text-[#94A3B8]">
              {altosPeso >= 3
                ? "Foram marcados múltiplos sinais de alto impacto. Recomendamos fortemente buscar avaliação com neuropediatra ou psicólogo especializado em TEA."
                : altosPeso >= 1
                ? "Há sinais de alto impacto marcados. Converse com o pediatra e peça encaminhamento se necessário."
                : "Vários sinais marcados. Vale registrar essas observações e discutir com um profissional de saúde."}
            </p>
            <button
              onClick={() => setChecados({})}
              className="text-[11px] text-[#475569] underline transition hover:text-[#94A3B8]"
            >Limpar seleção</button>
          </div>
        )}

        {/* MITOS E VERDADES */}
        <section className="mb-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#475569]">Mitos e verdades</p>
          <div className="flex flex-col gap-2">
            {mitosVerdades.map((mv, i) => {
              const aberto = mitoAberto === i;
              return (
                <div key={i} className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
                  <button
                    onClick={() => setMitoAberto(aberto ? null : i)}
                    className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-white/5"
                  >
                    <span className="shrink-0 rounded-full bg-[#FF4D6D]/15 px-2 py-0.5 text-[10px] font-bold text-[#FF4D6D]">MITO</span>
                    <p className="flex-1 text-xs font-semibold text-[#CBD5E1]">{mv.mito}</p>
                    <span className={`text-[#475569] transition-transform duration-300 ${aberto ? "rotate-180" : ""}`}>⌄</span>
                  </button>
                  {aberto && (
                    <div className="border-t border-white/5 px-5 pb-4 pt-3">
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">VERDADE</span>
                        <p className="text-xs leading-6 text-[#94A3B8]">{mv.verdade}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* PRÓXIMOS PASSOS */}
        <section className="mb-6">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#475569]">O que fazer se identificar sinais?</p>
          <div className="flex flex-col gap-3">
            {proximosPassos.map((p, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3BA7FF]/12 text-lg">{p.icon}</div>
                <div>
                  <p className="mb-1 text-sm font-bold text-white">{p.titulo}</p>
                  <p className="text-xs leading-6 text-[#64748B]">{p.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MENSAGEM FINAL */}
        <div className="mb-6 rounded-2xl border border-white/8 bg-white/3 p-6 text-center">
          <p className="mb-2 text-2xl">💙</p>
          <p className="mb-2 text-sm font-black text-white">Observar é um ato de amor</p>
          <p className="text-xs leading-6 text-[#64748B]">
            O fato de você estar aqui, aprendendo a reconhecer sinais, já mostra o cuidado que você tem. Diagnóstico precoce abre portas — e você pode ser o primeiro a abri-las.
          </p>
        </div>

        {/* PRÓXIMA UNIDADE */}
        <Link
          href="/capacitacao/unidades/crises"
          className="mb-6 flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition hover:bg-white/6"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF4D6D]/15 text-2xl">⚡</div>
          <div className="flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#475569]">Próxima unidade · Módulo 02</p>
            <p className="text-sm font-bold text-white">Crises e desregulação</p>
            <p className="text-xs text-[#475569]">Como identificar sinais e agir com segurança</p>
          </div>
          <span className="text-[#FF4D6D]">→</span>
        </Link>

      </div>

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
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#475569", fontWeight: active ? 600 : 400 }}>{label}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}