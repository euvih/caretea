"use client";

import { useState } from "react";
import Link from "next/link";

// ─── CONTEÚDO DA UNIDADE ───────────────────────────────────────────────────

const secoes = [
  {
    id: "o-que-e",
    titulo: "O que é o TEA?",
    conteudo: `O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento caracterizada por diferenças na comunicação social e por padrões de comportamento repetitivos ou restritos. Não é uma doença — é uma forma diferente de o cérebro funcionar.

O termo "espectro" existe porque o TEA se manifesta de formas muito variadas: duas pessoas com TEA podem ter características completamente diferentes. Alguns falam muito, outros não falam. Alguns têm alto desempenho acadêmico, outros precisam de suporte intenso em todas as atividades da vida diária.

O diagnóstico é clínico — feito por observação do comportamento e histórico de desenvolvimento — e pode ocorrer em qualquer idade, embora sinais apareçam nos primeiros anos de vida.`,
  },
  {
    id: "niveis",
    titulo: "Os 3 níveis de suporte",
    conteudo: `O DSM-5 (manual diagnóstico americano) organiza o TEA em 3 níveis conforme a necessidade de suporte — não de capacidade ou inteligência:

**Nível 1 — Suporte leve:** A pessoa consegue se comunicar verbalmente, mas pode ter dificuldades em iniciar ou manter conversas, dificuldades de adaptação a mudanças e interações sociais que parecem "diferentes" para o entorno. Pode passar despercebido por anos.

**Nível 2 — Suporte moderado:** Déficits mais evidentes na comunicação verbal e não-verbal. Comportamentos repetitivos mais frequentes e visivelmente inflexíveis. A pessoa precisa de suporte em contextos sociais e rotineiros.

**Nível 3 — Suporte intenso:** Déficits graves na comunicação — fala muito limitada ou ausente. Comportamentos repetitivos interferem significativamente no funcionamento. Suporte constante é necessário para atividades básicas.

É importante lembrar: o nível pode mudar ao longo da vida com suporte adequado, e uma pessoa pode estar em níveis diferentes conforme o contexto (ex: nível 1 em casa, nível 2 em ambientes novos).`,
  },
  {
    id: "caracteristicas",
    titulo: "Características principais",
    conteudo: `O TEA se manifesta em duas grandes áreas, segundo o DSM-5:

**1. Comunicação e interação social:**
Dificuldade em reciprocidade emocional (ex: não responder ao nome, não compartilhar interesse em objetos). Linguagem corporal, expressões faciais e contato visual podem ser diferentes do esperado. Dificuldade em desenvolver, manter e compreender relacionamentos.

**2. Padrões restritos e repetitivos:**
Movimentos repetitivos como balançar o corpo, bater as mãos (stimming). Insistência em rotinas rígidas — mudanças causam grande ansiedade. Interesses muito intensos e focados em assuntos específicos. Hiper ou hipossensibilidade sensorial: sons, texturas, luzes, cheiros podem ser vivenciados com intensidade muito maior ou menor do que o usual.

**O que NÃO define o TEA:**
Ausência de empatia (mito!), deficiência intelectual obrigatória, comportamento "mal-educado" ou fruto de criação inadequada.`,
  },
  {
    id: "sensorial",
    titulo: "Processamento sensorial",
    conteudo: `Uma das características menos compreendidas — e mais impactantes — do TEA é a diferença no processamento sensorial. O cérebro autista pode processar estímulos do ambiente de forma muito mais intensa (hipersensibilidade) ou muito menos intensa (hipossensibilidade) do que o esperado.

**Hipersensibilidade (muito sensível):**
Sons altos como liquidificador ou buzina podem causar dor física. Etiquetas de roupas ou tecidos específicos podem ser insuportáveis. Luz fluorescente pode causar desconforto visual intenso. Cheiros que outros mal percebem podem ser nauseantes.

**Hipossensibilidade (pouco sensível):**
A pessoa pode não perceber dor, frio ou calor com intensidade normal. Pode buscar ativamente estímulos — balançar, girar, morder objetos — para regular o sistema nervoso.

**O que isso significa para o cuidador:**
O ambiente importa muito. Um ambiente com muitos estímulos simultâneos (barulho, movimento, luzes) pode ser o gatilho de uma crise — não "mau comportamento". Reduzir o estímulo ambiental é uma das intervenções mais eficazes e imediatas.`,
  },
];

const checklistItems = [
  { id: 1, texto: "Entendi que TEA é um espectro — não existe um único perfil autista" },
  { id: 2, texto: "Sei que os 3 níveis descrevem necessidade de suporte, não capacidade" },
  { id: 3, texto: "Compreendo que comportamentos repetitivos (stimming) têm função regulatória" },
  { id: 4, texto: "Entendi que sensibilidade sensorial pode causar desconforto real e intenso" },
  { id: 5, texto: "Sei que autismo não é causado por criação inadequada ou falta de afeto" },
  { id: 6, texto: "Reconheço que cada pessoa autista é única — generalizar atrapalha o cuidado" },
];

const quizPerguntas = [
  {
    id: 1,
    pergunta: "O que o termo 'espectro' no diagnóstico de TEA significa?",
    opcoes: [
      "Que o autismo é uma doença progressiva",
      "Que o TEA se manifesta de formas muito variadas entre as pessoas",
      "Que existem apenas 3 tipos de autismo",
      "Que o autismo afeta apenas a comunicação verbal",
    ],
    correta: 1,
    explicacao:
      "'Espectro' significa diversidade de manifestações. Duas pessoas com TEA podem ter perfis completamente diferentes em comunicação, comportamento e necessidades.",
  },
  {
    id: 2,
    pergunta: "O que os níveis 1, 2 e 3 do TEA descrevem?",
    opcoes: [
      "O grau de inteligência da pessoa",
      "A gravidade do autismo de forma permanente",
      "A necessidade de suporte em comunicação e comportamento",
      "A capacidade de aprendizagem escolar",
    ],
    correta: 2,
    explicacao:
      "Os níveis descrevem necessidade de suporte — não inteligência nem capacidade. Uma pessoa pode mudar de nível ao longo da vida com suporte adequado.",
  },
  {
    id: 3,
    pergunta: "Uma criança autista bate as mãos repetidamente (stimming). Isso é:",
    opcoes: [
      "Comportamento agressivo que precisa ser extinto",
      "Sinal de que ela está sendo malcriada",
      "Uma forma de autorregulação sensorial e emocional",
      "Sintoma de outro transtorno, não do TEA",
    ],
    correta: 2,
    explicacao:
      "O stimming (movimentos repetitivos) tem função regulatória: ajuda o sistema nervoso a processar estímulos e regular emoções. Suprimi-lo sem oferecer alternativas pode aumentar a ansiedade.",
  },
  {
    id: 4,
    pergunta: "Uma pessoa autista hipersensível ao som tem uma crise em um ambiente barulhento. A melhor resposta imediata é:",
    opcoes: [
      "Pedir que ela se acalme e preste atenção",
      "Ignorar e continuar a atividade normalmente",
      "Reduzir ou remover o estímulo sensorial do ambiente",
      "Aumentar o estímulo para que ela se acostume",
    ],
    correta: 2,
    explicacao:
      "Para quem tem hipersensibilidade, o estímulo causa desconforto físico real. Reduzir o ambiente (sair do local, usar abafadores) é a intervenção mais eficaz e respeitosa.",
  },
];

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────

export default function EntendendoOTEA() {
  const [secaoAtiva, setSecaoAtiva] = useState("o-que-e");
  const [checados, setChecados] = useState<number[]>([]);
  const [quizAtual, setQuizAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [quizRespondido, setQuizRespondido] = useState<boolean[]>(new Array(quizPerguntas.length).fill(false));
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);
  const [tabAtiva, setTabAtiva] = useState<"video" | "audio">("video");

  const toggleCheck = (id: number) => {
    setChecados((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const responder = (index: number) => {
    if (quizRespondido[quizAtual]) return;
    setRespostaSelecionada(index);
    const novoRespondido = [...quizRespondido];
    novoRespondido[quizAtual] = true;
    setQuizRespondido(novoRespondido);
    if (index === quizPerguntas[quizAtual].correta) {
      setAcertos((a) => a + 1);
    }
  };

  const proximaPergunta = () => {
    if (quizAtual < quizPerguntas.length - 1) {
      setQuizAtual((q) => q + 1);
      setRespostaSelecionada(null);
    } else {
      setQuizFinalizado(true);
    }
  };

  const reiniciarQuiz = () => {
    setQuizAtual(0);
    setRespostaSelecionada(null);
    setQuizRespondido(new Array(quizPerguntas.length).fill(false));
    setAcertos(0);
    setQuizFinalizado(false);
  };

  const secaoAtual = secoes.find((s) => s.id === secaoAtiva)!;
  const progresso = Math.round((checados.length / checklistItems.length) * 100);

  const renderTexto = (texto: string) =>
    texto.split("\n\n").map((paragrafo, i) => {
      if (paragrafo.startsWith("**") && paragrafo.includes(":**")) {
        const [bold, ...rest] = paragrafo.split(":**");
        return (
          <p key={i} className="mb-4 text-sm leading-7 text-[#94A3B8]">
            <span className="font-bold text-white">{bold.replace(/\*\*/g, "")}:</span>
            {rest.join(":**")}
          </p>
        );
      }
      return (
        <p key={i} className="mb-4 text-sm leading-7 text-[#94A3B8]">
          {paragrafo}
        </p>
      );
    });

  return (
    <main className="min-h-screen bg-[#061731] pb-24 text-white">

      {/* ── HEADER ── */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#050d1a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 py-4">
          <Link
            href="/capacitacao"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/8 text-sm text-[#94A3B8] transition hover:bg-white/15"
          >
            ←
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3BA7FF]">
              Módulo 01 · Fundamentos
            </p>
            <p className="truncate text-sm font-bold text-white">Entendendo o TEA</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3BA7FF]/15 text-xs font-bold text-[#3BA7FF]">
            🧠
          </div>
        </div>

        {/* barra de progresso */}
        <div className="h-[2px] bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] transition-all duration-700"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-5">

        {/* ── HERO ── */}
        <section className="py-8">
          <div className="mb-3 flex items-center gap-2">
            <span className="rounded-full bg-[#3BA7FF]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3BA7FF]">
              Unidade 1
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-semibold text-[#64748B]">
              ~15 min
            </span>
          </div>
          <h1 className="mb-3 text-3xl font-black leading-tight">
            Entendendo o{" "}
            <span className="bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] bg-clip-text text-transparent">
              TEA
            </span>
          </h1>
          <p className="text-sm leading-7 text-[#cbdbf1]">
            Conheça o espectro autista de verdade — o que é, como se manifesta e o que isso significa na prática para quem cuida.
          </p>
        </section>

        {/* ── VÍDEO / ÁUDIO ── */}
        <section className="mb-8 overflow-hidden rounded-2xl border border-white/8 bg-white/3">
          {/* tabs */}
          <div className="flex border-b border-white/8">
            {(["video", "audio"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setTabAtiva(tab)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                  tabAtiva === tab
                    ? "border-b-2 border-[#3BA7FF] text-[#3BA7FF]"
                    : "text-[#475569] hover:text-[#94A3B8]"
                }`}
              >
                {tab === "video" ? "▶ Vídeo" : "🎧 Áudio"}
              </button>
            ))}
          </div>

          {tabAtiva === "video" && (
            <div className="flex flex-col items-center justify-center gap-3 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#3BA7FF]/15 text-3xl">
                ▶
              </div>
              <p className="text-sm font-semibold text-white">Introdução ao TEA</p>
              <p className="text-center text-xs text-[#cbdbf1]">
                Adicione aqui o embed do vídeo introdutório da unidade.
                <br />
                Sugerido: YouTube, Vimeo ou arquivo .mp4 hospedado.
              </p>
              <div className="mt-2 w-full rounded-xl border border-dashed border-white/10 bg-white/3 p-4 text-center text-[10px] text-[#334155]">
                {`<iframe src="URL_DO_VIDEO" ... />`}
              </div>
            </div>
          )}

          {tabAtiva === "audio" && (
            <div className="flex flex-col items-center justify-center gap-3 p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-3xl">
                🎧
              </div>
              <p className="text-sm font-semibold text-white">Versão em áudio</p>
              <p className="text-center text-xs text-[#cbdbf1]">
                Ideal para escutar enquanto cuida. Adicione o player de áudio aqui.
              </p>
              {/* player mockup */}
              <div className="mt-2 w-full rounded-xl bg-white/5 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs text-[#64748B]">Entendendo o TEA</span>
                  <span className="text-xs text-[#475569]">12:40</span>
                </div>
                <div className="mb-3 h-1 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[30%] rounded-full bg-[#A855F7]" />
                </div>
                <div className="flex items-center justify-center gap-6">
                  <button className="text-lg text-[#475569] transition hover:text-white">⏮</button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#A855F7] text-white transition hover:bg-[#9333EA]">
                    ▶
                  </button>
                  <button className="text-lg text-[#475569] transition hover:text-white">⏭</button>
                </div>
              </div>
              <div className="mt-1 w-full rounded-xl border border-dashed border-white/10 bg-white/3 p-3 text-center text-[10px] text-[#334155]">
                {`<audio src="URL_DO_AUDIO" controls />`}
              </div>
            </div>
          )}
        </section>

        {/* ── CONTEÚDO (TABS DE SEÇÃO) ── */}
        <section className="mb-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#475569]">
            Conteúdo da unidade
          </p>

          {/* nav de seções */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {secoes.map((s) => (
              <button
                key={s.id}
                onClick={() => setSecaoAtiva(s.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
                  secaoAtiva === s.id
                    ? "bg-[#3BA7FF] text-white"
                    : "bg-white/5 text-[#475569] hover:bg-white/10 hover:text-[#94A3B8]"
                }`}
              >
                {s.titulo}
              </button>
            ))}
          </div>

          {/* conteúdo da seção */}
          <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
            <h2 className="mb-5 text-lg font-black text-white">{secaoAtual.titulo}</h2>
            <div>{renderTexto(secaoAtual.conteudo)}</div>
          </div>
        </section>

        {/* ── CHECKLIST ── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#475569]">
              Checklist de aprendizado
            </p>
            <span className="text-xs font-bold text-[#3BA7FF]">
              {checados.length}/{checklistItems.length}
            </span>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
            {checklistItems.map((item, i) => {
              const checked = checados.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-white/5 ${
                    i < checklistItems.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                      checked
                        ? "border-[#3BA7FF] bg-[#3BA7FF] text-white"
                        : "border-white/20 bg-transparent text-transparent"
                    }`}
                  >
                    <span className="text-[10px]">✓</span>
                  </div>
                  <p
                    className={`text-sm leading-6 transition ${
                      checked ? "text-[#64748B] line-through" : "text-[#CBD5E1]"
                    }`}
                  >
                    {item.texto}
                  </p>
                </button>
              );
            })}
          </div>

          {checados.length === checklistItems.length && (
            <div className="mt-3 rounded-2xl bg-[#3BA7FF]/10 p-4 text-center">
              <p className="text-sm font-bold text-[#3BA7FF]">
                ✓ Checklist completo! Você absorveu os pontos essenciais desta unidade.
              </p>
            </div>
          )}
        </section>

        {/* ── QUIZ ── */}
        <section className="mb-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#475569]">
            Quiz de fixação
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/3">
            {!quizFinalizado ? (
              <div className="p-6">
                {/* progresso do quiz */}
                <div className="mb-5 flex items-center gap-3">
                  {quizPerguntas.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition ${
                        i < quizAtual
                          ? "bg-[#3BA7FF]"
                          : i === quizAtual
                          ? "bg-[#3BA7FF]/50"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <p className="mb-1 text-[10px] font-semibold text-[#475569]">
                  Pergunta {quizAtual + 1} de {quizPerguntas.length}
                </p>
                <p className="mb-6 text-sm font-bold leading-6 text-white">
                  {quizPerguntas[quizAtual].pergunta}
                </p>

                <div className="flex flex-col gap-2">
                  {quizPerguntas[quizAtual].opcoes.map((opcao, i) => {
                    const respondido = quizRespondido[quizAtual];
                    const correta = quizPerguntas[quizAtual].correta;
                    let estilo =
                      "border border-white/10 bg-white/3 text-[#cbdbf1] hover:bg-white/8 hover:border-white/20";
                    if (respondido) {
                      if (i === correta) {
                        estilo = "border border-[#22c55e]/40 bg-[#22c55e]/10 text-[#22c55e]";
                      } else if (i === respostaSelecionada && i !== correta) {
                        estilo = "border border-[#FF4D6D]/40 bg-[#FF4D6D]/10 text-[#FF4D6D]";
                      } else {
                        estilo = "border border-white/5 bg-white/2 text-[#334155]";
                      }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => responder(i)}
                        disabled={respondido}
                        className={`rounded-xl px-4 py-3 text-left text-xs font-medium leading-5 transition ${estilo}`}
                      >
                        <span className="mr-2 font-bold opacity-50">
                          {["A", "B", "C", "D"][i]}.
                        </span>
                        {opcao}
                      </button>
                    );
                  })}
                </div>

                {quizRespondido[quizAtual] && (
                  <div className="mt-4 rounded-xl bg-white/5 p-4">
                    <p className="mb-3 text-xs leading-5 text-[#94A3B8]">
                      <span className="font-bold text-white">Explicação: </span>
                      {quizPerguntas[quizAtual].explicacao}
                    </p>
                    <button
                      onClick={proximaPergunta}
                      className="w-full rounded-xl bg-[#3BA7FF] py-3 text-xs font-bold text-white transition hover:bg-[#2563EB]"
                    >
                      {quizAtual < quizPerguntas.length - 1
                        ? "Próxima pergunta →"
                        : "Ver resultado →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#3BA7FF]/15 text-4xl">
                  {acertos === quizPerguntas.length ? "🏆" : acertos >= quizPerguntas.length / 2 ? "⭐" : "📚"}
                </div>
                <p className="mb-1 text-2xl font-black text-white">
                  {acertos}/{quizPerguntas.length} acertos
                </p>
                <p className="mb-5 text-sm text-[#64748B]">
                  {acertos === quizPerguntas.length
                    ? "Excelente! Você dominou o conteúdo desta unidade."
                    : acertos >= quizPerguntas.length / 2
                    ? "Bom trabalho! Revise os pontos que errou."
                    : "Revise o conteúdo e tente novamente."}
                </p>
                <button
                  onClick={reiniciarQuiz}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-bold text-[#94A3B8] transition hover:bg-white/10"
                >
                  Refazer quiz
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── PRÓXIMA UNIDADE ── */}
        <section className="mb-8">
          <Link
            href="/capacitacao/unidades/comunicacao"
            className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 transition hover:bg-white/6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-2xl">
              💬
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[#cbdbf1]">
                Próxima unidade
              </p>
              <p className="text-sm font-bold text-white">Comunicação</p>
              <p className="text-xs text-[#475569]">
                Formas de se comunicar e evitar gatilhos
              </p>
            </div>
            <span className="text-[#A855F7]">→</span>
          </Link>
        </section>

      </div>

      {/* ── BOTTOM NAV ── */}
      <nav
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "rgba(5,13,26,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: "0.5px solid rgba(59,167,255,0.12)",
          display: "flex", padding: "8px 0 12px", zIndex: 10,
        }}
      >
        {[
          { icon: "🏠", label: "Início", href: "/" },
          { icon: "👤", label: "Perfil", href: "/perfil" },
          { icon: "📚", label: "Aprender", href: "/capacitacao", active: true },
          { icon: "📅", label: "Rotina", href: "/rotina" },
          { icon: "👥", label: "Comunidade", href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link
            key={label}
            href={href}
            style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3, textDecoration: "none", padding: "4px 0",
            }}
          >
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