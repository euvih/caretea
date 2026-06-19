"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── TYPES ─────────────────────────────────────────────────────────────────
type BlocoTexto     = { tipo: "texto";    conteudo: string };
type BlocoDestaque  = { tipo: "destaque"; conteudo: string };
type BlocoCard      = { tipo: "card";     cor: string; titulo: string; conteudo: string };
type BlocoTopico    = { tipo: "topico";   icone: string; titulo: string; conteudo: string };
type Bloco = BlocoTexto | BlocoDestaque | BlocoCard | BlocoTopico;

interface Secao {
  id: string;
  titulo: string;
  emoji: string;
  conteudo: Bloco[];
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────
const passos = [
  {
    emoji: "💙",
    titulo: "Bem-vindo ao CareTEA",
    descricao:
      "Estamos aqui para ajudar você a entender, aprender e cuidar com mais confiança — no seu ritmo.",
    botao: "Começar →",
  },
  {
    emoji: "📖",
    titulo: "Como funciona uma aula?",
    descricao:
      "Cada aula tem vídeo do especialista, resumo rápido, texto explicativo com ilustrações, exemplos reais, exercício prático e quiz de fixação.",
    botao: "Entendi →",
  },
  {
    emoji: "✅",
    titulo: "Marque o que aprendeu",
    descricao:
      "Ao longo da aula, você vai marcar os pontos que já entendeu. Isso ajuda a acompanhar seu progresso e revisar depois.",
    botao: "Entendi →",
  },
  {
    emoji: "🎯",
    titulo: "Por onde começar?",
    descricao:
      "Esta é sua primeira aula: Entendendo o TEA. É o ponto de partida ideal para qualquer cuidador ou familiar.",
    botao: "Começar a aula →",
  },
];

// ─── CONTEÚDO COMPLETO ─────────────────────────────────────────────────────

// Resumo rápido
const resumoRapido = [
  { icone: "🧠", texto: "TEA é uma condição do neurodesenvolvimento, não uma doença" },
  { icone: "🌈", texto: "Espectro = cada pessoa autista é única e diferente" },
  { icone: "📊", texto: "3 níveis descrevem necessidade de suporte, não capacidade" },
  { icone: "🔄", texto: "Stimming é regulação — não comportamento ruim" },
  { icone: "🌡️", texto: "Sensibilidade sensorial causa desconforto físico real" },
];

// Seções de texto
const secoes: Secao[] = [
  {
    id: "o-que-e",
    titulo: "O que é o TEA?",
    emoji: "🧠",
    conteudo: [
      {
        tipo: "texto",
        conteudo:
          "O Transtorno do Espectro Autista (TEA) é uma condição do neurodesenvolvimento — uma forma diferente de o cérebro funcionar. Não é uma doença. Não tem cura. E não é culpa de ninguém.",
      },
      {
        tipo: "destaque",
        conteudo:
          '"Espectro" significa que o TEA se manifesta de formas muito diferentes em cada pessoa. Duas pessoas com TEA podem ser completamente diferentes.',
      },
      {
        tipo: "texto",
        conteudo:
          "Alguns falam muito, outros não falam. Alguns têm alto desempenho escolar, outros precisam de apoio intenso em todas as atividades do dia. O que une todas essas pessoas é a forma como o cérebro processa o mundo ao redor.",
      },
      {
        tipo: "texto",
        conteudo:
          "O diagnóstico é feito por observação clínica do comportamento e do histórico de desenvolvimento. Não existe exame de sangue ou imagem para confirmar TEA.",
      },
    ],
  },
  {
    id: "nao-e",
    titulo: "O que NÃO é o TEA",
    emoji: "❌",
    conteudo: [
      {
        tipo: "texto",
        conteudo:
          "Existem muitos mitos sobre o autismo que dificultam o cuidado e a inclusão. Conhecer o que o TEA não é é tão importante quanto entender o que ele é.",
      },
      {
        tipo: "topico",
        icone: "❌",
        titulo: "Não é falta de empatia",
        conteudo:
          "Pessoas autistas sentem empatia — mas a expressam de formas diferentes. O que pode parecer indiferença é geralmente dificuldade de processamento social, não ausência de sentimento.",
      },
      {
        tipo: "topico",
        icone: "❌",
        titulo: "Não é deficiência intelectual obrigatória",
        conteudo:
          "O TEA não implica baixa inteligência. Muitas pessoas autistas têm inteligência típica ou acima da média. As condições podem coexistir, mas são independentes.",
      },
      {
        tipo: "topico",
        icone: "❌",
        titulo: "Não é resultado de criação inadequada",
        conteudo:
          "O autismo tem base neurológica e genética. Não é causado por estilo de criação, vacinação, dieta, ou qualquer escolha dos pais.",
      },
      {
        tipo: "topico",
        icone: "❌",
        titulo: "Não é sempre visível",
        conteudo:
          "Muitas pessoas autistas — especialmente mulheres e meninas — aprendem a mascarar suas diferenças. O diagnóstico tardio é muito comum.",
      },
    ],
  },
  {
    id: "niveis",
    titulo: "Os 3 níveis de suporte",
    emoji: "📊",
    conteudo: [
      {
        tipo: "texto",
        conteudo:
          "O DSM-5 (manual diagnóstico internacional) organiza o TEA em 3 níveis. Esses níveis descrevem a necessidade de suporte — não a inteligência nem a capacidade da pessoa.",
      },
      {
        tipo: "card",
        cor: "#3BA7FF",
        titulo: "Nível 1 — Suporte leve",
        conteudo:
          "A pessoa se comunica verbalmente, mas pode ter dificuldades em conversas, adaptação a mudanças e interações sociais. Muitas vezes passa despercebido por anos.",
      },
      {
        tipo: "card",
        cor: "#A855F7",
        titulo: "Nível 2 — Suporte moderado",
        conteudo:
          "Dificuldades mais evidentes na comunicação e nos comportamentos. A pessoa precisa de apoio em situações sociais e rotinas do dia a dia.",
      },
      {
        tipo: "card",
        cor: "#FF4D6D",
        titulo: "Nível 3 — Suporte intenso",
        conteudo:
          "Fala muito limitada ou ausente. Comportamentos repetitivos intensos. A pessoa precisa de suporte constante para atividades básicas.",
      },
      {
        tipo: "destaque",
        conteudo:
          "Importante: o nível pode mudar ao longo da vida com suporte adequado. Não é definitivo.",
      },
    ],
  },
  {
    id: "caracteristicas",
    titulo: "Como o TEA se manifesta",
    emoji: "🔍",
    conteudo: [
      {
        tipo: "texto",
        conteudo:
          "O TEA se manifesta em duas grandes áreas: a forma como a pessoa se comunica e se relaciona com outros, e os padrões de comportamento que ela repete.",
      },
      {
        tipo: "topico",
        icone: "💬",
        titulo: "Comunicação e relações",
        conteudo:
          "Pode ser difícil responder ao próprio nome, manter contato visual, compartilhar interesse em coisas, ou entender expressões faciais e linguagem corporal.",
      },
      {
        tipo: "topico",
        icone: "🔄",
        titulo: "Comportamentos repetitivos",
        conteudo:
          "Movimentos repetitivos como balançar o corpo ou bater as mãos (chamados de stimming), apego intenso a rotinas, e interesses muito focados em assuntos específicos.",
      },
    ],
  },
  {
    id: "sensorial",
    titulo: "Processamento sensorial",
    emoji: "🌡️",
    conteudo: [
      {
        tipo: "texto",
        conteudo:
          "O cérebro autista pode processar sons, luzes, cheiros e texturas de forma muito mais intensa ou muito menos intensa do que o esperado. Isso é real e afeta o dia a dia de forma profunda.",
      },
      {
        tipo: "topico",
        icone: "🔊",
        titulo: "Hipersensibilidade (muito sensível)",
        conteudo:
          "Sons do liquidificador ou buzina podem causar dor. Etiquetas de roupa podem ser insuportáveis. Luz fluorescente pode causar desconforto intenso.",
      },
      {
        tipo: "topico",
        icone: "🔕",
        titulo: "Hipossensibilidade (pouco sensível)",
        conteudo:
          "A pessoa pode não perceber dor, frio ou calor com intensidade normal. Pode buscar estímulos — balançar, girar, morder objetos — para regular o sistema nervoso.",
      },
      {
        tipo: "destaque",
        conteudo:
          "Para o cuidador: o ambiente importa muito. Muitos estímulos ao mesmo tempo podem ser o gatilho de uma crise — não \"mau comportamento\".",
      },
    ],
  },
];

// Infográfico do espectro
const espectroItens = [
  { cor: "#3BA7FF", label: "Comunicação verbal", low: "Usa frases completas", high: "Comunicação não-verbal" },
  { cor: "#A855F7", label: "Interação social", low: "Busca contato social", high: "Prefere isolamento" },
  { cor: "#22C55E", label: "Rotina e flexibilidade", low: "Adapta com facilidade", high: "Rigidez intensa" },
  { cor: "#F59E0B", label: "Sensibilidade sensorial", low: "Pouco sensível", high: "Muito sensível" },
  { cor: "#FF4D6D", label: "Necessidade de suporte", low: "Suporte leve", high: "Suporte intenso" },
];

// Exemplos reais
const exemplosReais = [
  {
    nome: "Maria, 7 anos — Nível 2",
    descricao: "Maria não fala em frases completas, mas usa um tablet com pranchas de comunicação para pedir água, expressar dor e escolher atividades. Tem rotina rígida e crise intensa se algo muda sem aviso.",
    emoji: "👧",
    cor: "#A855F7",
  },
  {
    nome: "João, 12 anos — Nível 1",
    descricao: "João vai à escola regular, tem ótimo desempenho em matemática e ciências, mas dificuldade em grupos e em entender sarcasmo. Parece 'normal' para muitos, mas se sente perdido em situações sociais.",
    emoji: "👦",
    cor: "#3BA7FF",
  },
  {
    nome: "Ana, 35 anos — Diagnóstico tardio",
    descricao: "Ana recebeu diagnóstico aos 33 anos. Por décadas mascarou suas diferenças, sentindo-se esgotada sem entender o porquê. O diagnóstico trouxe alívio e autocompreensão.",
    emoji: "👩",
    cor: "#22C55E",
  },
];

// Exercício prático
const exercicioPratico = {
  titulo: "Exercício: Observe sem julgar",
  descricao: "Nas próximas 24 horas, quando notar um comportamento diferente da pessoa que você cuida, pare e se pergunte:",
  perguntas: [
    "Esse comportamento tem uma função? (regular emoções, processar sensação...)",
    "Há algum estímulo no ambiente que pode estar causando isso?",
    "Estou interpretando como 'mau comportamento' algo que pode ser uma necessidade?",
  ],
  nota: "Escreva suas observações em um caderno. Esse exercício de atenção consciente é o primeiro passo para um cuidado mais empático.",
};

// Checklist
const checklistItems = [
  { id: 1, texto: "TEA é um espectro — não existe um único perfil autista" },
  { id: 2, texto: "Os 3 níveis descrevem necessidade de suporte, não capacidade" },
  { id: 3, texto: "Comportamentos repetitivos (stimming) têm função regulatória" },
  { id: 4, texto: "Sensibilidade sensorial pode causar desconforto físico real" },
  { id: 5, texto: "Autismo não é causado por criação inadequada ou falta de afeto" },
  { id: 6, texto: "Cada pessoa autista é única — generalizar atrapalha o cuidado" },
];

// Quiz
const quizPerguntas = [
  {
    pergunta: "O que o termo 'espectro' no TEA significa?",
    opcoes: [
      "Que o autismo é uma doença progressiva",
      "Que o TEA se manifesta de formas muito variadas",
      "Que existem apenas 3 tipos de autismo",
      "Que o autismo afeta só a fala",
    ],
    correta: 1,
    explicacao:
      "'Espectro' significa diversidade. Duas pessoas com TEA podem ser completamente diferentes em comunicação, comportamento e necessidades.",
  },
  {
    pergunta: "Os níveis 1, 2 e 3 do TEA descrevem:",
    opcoes: [
      "O grau de inteligência da pessoa",
      "A gravidade permanente do autismo",
      "A necessidade de suporte no dia a dia",
      "A capacidade de aprendizagem escolar",
    ],
    correta: 2,
    explicacao:
      "Os níveis descrevem necessidade de suporte — não inteligência. Uma pessoa pode mudar de nível ao longo da vida com apoio adequado.",
  },
  {
    pergunta: "Uma criança autista bate as mãos repetidamente. Isso é:",
    opcoes: [
      "Comportamento agressivo a ser extinto",
      "Sinal de que está sendo malcriada",
      "Uma forma de autorregulação sensorial",
      "Sintoma de outro transtorno",
    ],
    correta: 2,
    explicacao:
      "O stimming tem função regulatória: ajuda o sistema nervoso a processar estímulos. Suprimi-lo sem oferecer alternativas pode aumentar a ansiedade.",
  },
  {
    pergunta: "Uma pessoa autista tem crise em ambiente muito barulhento. O melhor a fazer é:",
    opcoes: [
      "Pedir que ela se acalme",
      "Ignorar e continuar normalmente",
      "Reduzir ou remover o estímulo sensorial",
      "Aumentar o estímulo para ela se acostumar",
    ],
    correta: 2,
    explicacao:
      "Para quem tem hipersensibilidade, o barulho causa desconforto físico real. Reduzir o ambiente é a resposta mais eficaz e respeitosa.",
  },
];

// Material complementar
const materialComplementar = [
  { icone: "📄", titulo: "Cartilha: O que é o TEA (CFM)", tipo: "PDF", cor: "#FF4D6D" },
  { icone: "🎥", titulo: "Documentário: O Mundo Autista", tipo: "Vídeo", cor: "#3BA7FF" },
  { icone: "📚", titulo: "Livro: Pensar em Imagens — Temple Grandin", tipo: "Livro", cor: "#A855F7" },
  { icone: "🌐", titulo: "Site: Autism Speaks Brasil", tipo: "Site", cor: "#22C55E" },
];

// ─── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────
export default function EntendendoOTEA() {
  const [onboardingVisto, setOnboardingVisto] = useState(false);
  const [passoAtual, setPassoAtual]           = useState(0);
  const [secaoAtiva, setSecaoAtiva]           = useState(0);
  const [tabAtiva, setTabAtiva]               = useState<"video" | "audio">("video");
  const [checados, setChecados]               = useState<number[]>([]);
  const [quizAtual, setQuizAtual]             = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [quizRespondido, setQuizRespondido]   = useState<boolean[]>(new Array(quizPerguntas.length).fill(false));
  const [acertos, setAcertos]                 = useState(0);
  const [quizFinalizado, setQuizFinalizado]   = useState(false);
  const [concluida, setConcluida]             = useState(false);
  const [secaoExpandida, setSecaoExpandida]   = useState<string | null>(null);

  useEffect(() => {
    const visto = localStorage.getItem("caretea_onboarding_tea");
    if (visto) setOnboardingVisto(true);
  }, []);

  const finalizarOnboarding = () => {
    localStorage.setItem("caretea_onboarding_tea", "1");
    setOnboardingVisto(true);
  };

  const toggleCheck = (id: number) => {
    setChecados((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const responder = (index: number) => {
    if (quizRespondido[quizAtual]) return;
    setRespostaSelecionada(index);
    const novo = [...quizRespondido];
    novo[quizAtual] = true;
    setQuizRespondido(novo);
    if (index === quizPerguntas[quizAtual].correta) setAcertos((a) => a + 1);
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

  // Progresso geral = checklist + quiz finalizado
  const totalItens = checklistItems.length + 1; // +1 para o quiz
  const itensFeitos = checados.length + (quizFinalizado ? 1 : 0);
  const progresso = Math.round((itensFeitos / totalItens) * 100);

  const secaoAtual = secoes[secaoAtiva];

  // ── ONBOARDING ──
  if (!onboardingVisto) {
    const passo = passos[passoAtual];
    const ehUltimo = passoAtual === passos.length - 1;
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050d1a] px-6">
        <div className="mb-10 flex gap-2">
          {passos.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === passoAtual ? 24 : 8,
                background: i === passoAtual ? "#3BA7FF" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-sm text-center">
          <div
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl text-5xl"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {passo.emoji}
          </div>
          <h2 className="mb-4 text-2xl font-black text-white">{passo.titulo}</h2>
          <p className="mb-10 text-sm leading-7 text-[#94A3B8]">{passo.descricao}</p>

          <button
            onClick={() => { if (ehUltimo) finalizarOnboarding(); else setPassoAtual((p) => p + 1); }}
            className="mb-4 w-full rounded-2xl bg-[#3BA7FF] py-4 text-sm font-bold text-white transition hover:bg-[#2563EB]"
          >
            {passo.botao}
          </button>

          {!ehUltimo && (
            <button onClick={finalizarOnboarding} className="text-xs text-[#475569] underline transition hover:text-[#64748B]">
              Pular apresentação
            </button>
          )}

          {passoAtual > 0 && (
            <button onClick={() => setPassoAtual((p) => p - 1)} className="mt-3 block w-full text-xs text-[#334155] transition hover:text-[#475569]">
              ← Voltar
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── PÁGINA DA AULA ──
  return (
    <main className="min-h-screen bg-[#050d1a] pb-28 text-white">

      {/* HEADER FIXO */}
      <div className="sticky top-0 z-20 border-b border-white/5 bg-[#050d1a]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4">
          <Link
            href="/capacitacao"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm text-[#94A3B8] transition hover:bg-white/10"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            ←
          </Link>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3BA7FF]">
              Módulo 01 · Fundamentos
            </p>
            <p className="truncate text-sm font-bold text-white">Entendendo o TEA</p>
          </div>
          <span className="shrink-0 text-xs font-bold text-[#3BA7FF]">{progresso}%</span>
        </div>
        <div className="h-[3px] bg-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] transition-all duration-700"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-xl px-5">

        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="pt-8 pb-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-[#3BA7FF]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3BA7FF]">
              Unidade 1
            </span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-[#475569]">~15 min</span>
            <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-[#475569]">Módulo 1</span>
          </div>
          <h1 className="mb-3 text-3xl font-black leading-tight">
            Entendendo o{" "}
            <span className="bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] bg-clip-text text-transparent">
              TEA
            </span>
          </h1>
          <p className="mb-5 text-sm leading-7 text-[#64748B]">
            Conheça o espectro autista de verdade — o que é, como se manifesta e
            o que isso muda na prática para quem cuida.
          </p>

          {/* Índice da aula */}
          <div className="rounded-2xl border border-white/5 p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#334155]">Nesta aula</p>
            <div className="flex flex-col gap-2">
              {[
                { n: "01", label: "Vídeo do especialista" },
                { n: "02", label: "Resumo rápido" },
                { n: "03", label: "Conteúdo em texto" },
                { n: "04", label: "Infográfico do espectro" },
                { n: "05", label: "Exemplos reais" },
                { n: "06", label: "Exercício prático" },
                { n: "07", label: "Quiz de fixação" },
                { n: "08", label: "Material complementar" },
              ].map(({ n, label }) => (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-[#3BA7FF] w-5">{n}</span>
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-xs text-[#475569]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 1. VÍDEO / ÁUDIO ─────────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="01" label="Vídeo do especialista" />

          <div className="overflow-hidden rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex border-b border-white/5">
              {(["video", "audio"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabAtiva(tab)}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition ${
                    tabAtiva === tab
                      ? "border-b-2 border-[#3BA7FF] text-[#3BA7FF]"
                      : "text-[#334155] hover:text-[#475569]"
                  }`}
                >
                  {tab === "video" ? "▶  Vídeo" : "🎧  Áudio"}
                </button>
              ))}
            </div>

            {tabAtiva === "video" && (
  <div className="flex flex-col items-center gap-3 p-6 text-center">
    

    <p className="text-sm font-semibold text-white">
      Introdução ao TEA
    </p>

    <div className="w-full max-w-xl overflow-hidden rounded-2xl">
      <iframe
        className="h-64 w-full"
        src="https://www.youtube.com/embed/y-_Ly5Tqggc"
        title="Introdução ao TEA"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
)}

            {tabAtiva === "audio" && (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-2xl">🎧</div>
                <p className="text-sm font-semibold text-white">Versão em áudio</p>
                <p className="text-xs leading-6 text-[#475569]">Ideal para ouvir enquanto cuida.</p>
                <div className="w-full rounded-xl bg-white/5 p-4">
                  <div className="mb-3 flex justify-between text-xs text-[#475569]">
                    <span>Entendendo o TEA</span><span>12:40</span>
                  </div>
                  <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[30%] rounded-full bg-[#A855F7]" />
                  </div>
                  <div className="flex items-center justify-center gap-6">
                    <button className="text-xl text-[#334155] hover:text-white">⏮</button>
                    <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#A855F7] text-white hover:bg-[#9333EA]">▶</button>
                    <button className="text-xl text-[#334155] hover:text-white">⏭</button>
                  </div>
                </div>
                <div
                  className="w-full rounded-xl border border-dashed border-white/10 p-3 text-[10px] text-[#334155]"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  {`<audio src="URL_DO_AUDIO" controls />`}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 2. RESUMO RÁPIDO ─────────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="02" label="Resumo rápido" />

          <div className="rounded-2xl border border-[#3BA7FF]/20 bg-[#3BA7FF]/5 p-5">
            <p className="mb-4 text-xs font-bold text-[#3BA7FF]">5 pontos essenciais desta aula</p>
            <div className="flex flex-col gap-3">
              {resumoRapido.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">{item.icone}</span>
                  <p className="text-sm leading-6 text-[#CBD5E1]">{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 3. CONTEÚDO EM TEXTO ─────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="03" label="Conteúdo em texto" />

          {/* abas de seção */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
            {secoes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSecaoAtiva(i)}
                className="shrink-0 flex items-center gap-2 rounded-2xl px-4 py-3 text-xs font-bold transition"
                style={{
                  background: secaoAtiva === i ? "#3BA7FF" : "rgba(255,255,255,0.05)",
                  color: secaoAtiva === i ? "#fff" : "#475569",
                }}
              >
                <span>{s.emoji}</span>
                <span>{s.titulo}</span>
              </button>
            ))}
          </div>

          {/* card de conteúdo */}
          <div className="rounded-2xl border border-white/5 p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3BA7FF]/15 text-xl">
                {secaoAtual.emoji}
              </div>
              <h2 className="text-base font-black text-white">{secaoAtual.titulo}</h2>
            </div>

            <div className="flex flex-col gap-4">
              {secaoAtual.conteudo.map((bloco, i) => {
                if (bloco.tipo === "texto") {
                  return (
                    <p key={i} className="text-sm leading-7 text-[#94A3B8]">{bloco.conteudo}</p>
                  );
                }
                if (bloco.tipo === "destaque") {
                  return (
                    <div key={i} className="rounded-xl border border-[#3BA7FF]/20 bg-[#3BA7FF]/10 p-4">
                      <p className="text-sm leading-7 text-[#CBD5E1]">{bloco.conteudo}</p>
                    </div>
                  );
                }
                if (bloco.tipo === "card") {
                  return (
                    <div
                      key={i}
                      className="rounded-xl p-4"
                      style={{ background: `${bloco.cor}12`, border: `1px solid ${bloco.cor}25` }}
                    >
                      <p className="mb-1 text-xs font-black" style={{ color: bloco.cor }}>{bloco.titulo}</p>
                      <p className="text-xs leading-6 text-[#94A3B8]">{bloco.conteudo}</p>
                    </div>
                  );
                }
                if (bloco.tipo === "topico") {
                  return (
                    <div key={i} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-base">
                        {bloco.icone}
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-bold text-white">{bloco.titulo}</p>
                        <p className="text-xs leading-6 text-[#64748B]">{bloco.conteudo}</p>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* navegação entre seções */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setSecaoAtiva((s) => Math.max(0, s - 1))}
              disabled={secaoAtiva === 0}
              className="rounded-xl px-4 py-2 text-xs font-bold text-[#334155] transition disabled:opacity-30 hover:text-[#94A3B8]"
            >
              ← Anterior
            </button>
            <span className="text-xs text-[#334155]">{secaoAtiva + 1} / {secoes.length}</span>
            <button
              onClick={() => setSecaoAtiva((s) => Math.min(secoes.length - 1, s + 1))}
              disabled={secaoAtiva === secoes.length - 1}
              className="rounded-xl px-4 py-2 text-xs font-bold text-[#3BA7FF] transition disabled:opacity-30"
            >
              Próximo →
            </button>
          </div>
        </section>

        {/* ─── 4. INFOGRÁFICO DO ESPECTRO ───────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="04" label="Infográfico: O espectro" />

          <div className="rounded-2xl border border-white/5 p-5" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="mb-1 text-sm font-bold text-white">O espectro não é uma linha reta</p>
            <p className="mb-5 text-xs leading-6 text-[#64748B]">
              Cada pessoa autista tem um perfil único. Veja como as características variam em cada dimensão:
            </p>

            <div className="flex flex-col gap-5">
              {espectroItens.map((item, i) => (
                <div key={i}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: item.cor }}>{item.label}</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/10">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full"
                      style={{
                        width: "100%",
                        background: `linear-gradient(to right, ${item.cor}33, ${item.cor})`,
                      }}
                    />
                    {/* Indicador de espectro */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-white shadow-lg"
                      style={{
                        left: `${[30, 60, 45, 70, 40][i]}%`,
                        background: item.cor,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between">
                    <span className="text-[10px] text-[#334155]">{item.low}</span>
                    <span className="text-[10px] text-[#334155]">{item.high}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-white/5 p-4">
              <p className="text-xs leading-6 text-[#64748B]">
                💡 <span className="font-bold text-white">Como ler este gráfico:</span> o ponto colorido mostra um exemplo de onde uma pessoa autista pode estar em cada dimensão. Cada pessoa tem um ponto diferente — por isso o autismo é um espectro.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. EXEMPLOS REAIS ────────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="05" label="Exemplos reais" />
          <p className="mb-4 text-xs leading-6 text-[#475569]">
            Conheça três perfis diferentes para entender na prática como o espectro se manifesta.
          </p>

          <div className="flex flex-col gap-4">
            {exemplosReais.map((ex, i) => (
              <div
                key={i}
                className="rounded-2xl border p-5"
                style={{
                  background: `${ex.cor}08`,
                  border: `1px solid ${ex.cor}20`,
                }}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl"
                    style={{ background: `${ex.cor}20` }}
                  >
                    {ex.emoji}
                  </div>
                  <p className="text-sm font-bold text-white">{ex.nome}</p>
                </div>
                <p className="text-xs leading-6 text-[#94A3B8]">{ex.descricao}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. EXERCÍCIO PRÁTICO ─────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="06" label="Exercício prático" />

          <div className="rounded-2xl border border-[#22C55E]/20 bg-[#22C55E]/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#22C55E]/20 text-xl">
                ✍️
              </div>
              <p className="text-sm font-bold text-white">{exercicioPratico.titulo}</p>
            </div>
            <p className="mb-4 text-xs leading-6 text-[#94A3B8]">{exercicioPratico.descricao}</p>

            <div className="flex flex-col gap-3 mb-4">
              {exercicioPratico.perguntas.map((p, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl bg-white/5 p-3">
                  <span className="text-xs font-bold text-[#22C55E] mt-0.5">{i + 1}.</span>
                  <p className="text-xs leading-6 text-[#94A3B8]">{p}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-3">
              <p className="text-xs leading-6 text-[#CBD5E1]">
                <span className="font-bold text-[#22C55E]">💡 Dica: </span>
                {exercicioPratico.nota}
              </p>
            </div>
          </div>
        </section>

        {/* ─── CHECKLIST ────────────────────────────────────────────────── */}
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#334155]">O que aprendi</p>
            <span className="text-xs font-bold text-[#3BA7FF]">{checados.length} de {checklistItems.length}</span>
          </div>
          <p className="mb-4 text-xs leading-6 text-[#475569]">
            Marque os pontos que você já entendeu. Não precisa marcar tudo agora — volte quando quiser.
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
            {checklistItems.map((item, i) => {
              const checked = checados.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`flex w-full items-start gap-4 px-5 py-4 text-left transition hover:bg-white/5 active:bg-white/10 ${
                    i < checklistItems.length - 1 ? "border-b border-white/5" : ""
                  }`}
                >
                  <div
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition"
                    style={{
                      background: checked ? "#3BA7FF" : "transparent",
                      border: checked ? "none" : "1.5px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    {checked && <span className="text-[11px] font-bold text-white">✓</span>}
                  </div>
                  <p
                    className="text-sm leading-6 transition"
                    style={{
                      color: checked ? "#475569" : "#CBD5E1",
                      textDecoration: checked ? "line-through" : "none",
                    }}
                  >
                    {item.texto}
                  </p>
                </button>
              );
            })}
          </div>

          {checados.length === checklistItems.length && (
            <div className="mt-3 rounded-2xl bg-[#3BA7FF]/10 p-4 text-center">
              <p className="text-sm font-bold text-[#3BA7FF]">🎉 Você marcou todos os pontos. Ótimo trabalho!</p>
            </div>
          )}
        </section>

        {/* ─── 7. QUIZ ──────────────────────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="07" label="Quiz de fixação" />
          <p className="mb-4 text-xs leading-6 text-[#475569]">
            Não é uma prova — é só para ajudar a fixar o que você aprendeu.
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/5" style={{ background: "rgba(255,255,255,0.03)" }}>
            {!quizFinalizado ? (
              <div className="p-5">
                <div className="mb-5 flex gap-2">
                  {quizPerguntas.map((_, i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition"
                      style={{
                        background:
                          i < quizAtual
                            ? "#3BA7FF"
                            : i === quizAtual
                            ? "rgba(59,167,255,0.4)"
                            : "rgba(255,255,255,0.08)",
                      }}
                    />
                  ))}
                </div>

                <p className="mb-1 text-[10px] text-[#475569]">
                  Pergunta {quizAtual + 1} de {quizPerguntas.length}
                </p>
                <p className="mb-5 text-sm font-bold leading-6 text-white">
                  {quizPerguntas[quizAtual].pergunta}
                </p>

                <div className="flex flex-col gap-2">
                  {quizPerguntas[quizAtual].opcoes.map((opcao, i) => {
                    const respondido = quizRespondido[quizAtual];
                    const correta = quizPerguntas[quizAtual].correta;
                    let bg = "rgba(255,255,255,0.04)";
                    let border = "rgba(255,255,255,0.08)";
                    let color = "#94A3B8";
                    if (respondido) {
                      if (i === correta) { bg = "rgba(34,197,94,0.10)"; border = "rgba(34,197,94,0.30)"; color = "#22c55e"; }
                      else if (i === respostaSelecionada) { bg = "rgba(255,77,109,0.10)"; border = "rgba(255,77,109,0.30)"; color = "#FF4D6D"; }
                      else { bg = "rgba(255,255,255,0.02)"; border = "rgba(255,255,255,0.04)"; color = "#334155"; }
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => responder(i)}
                        disabled={respondido}
                        className="rounded-xl px-4 py-4 text-left text-sm font-medium leading-6 transition"
                        style={{ background: bg, border: `1px solid ${border}`, color }}
                      >
                        <span className="mr-2 font-bold opacity-40">{["A", "B", "C", "D"][i]}.</span>
                        {opcao}
                      </button>
                    );
                  })}
                </div>

                {quizRespondido[quizAtual] && (
                  <div className="mt-4 rounded-xl bg-white/5 p-4">
                    <p className="mb-4 text-xs leading-6 text-[#94A3B8]">
                      <span className="font-bold text-white">Explicação: </span>
                      {quizPerguntas[quizAtual].explicacao}
                    </p>
                    <button
                      onClick={proximaPergunta}
                      className="w-full rounded-xl bg-[#3BA7FF] py-4 text-sm font-bold text-white transition hover:bg-[#2563EB]"
                    >
                      {quizAtual < quizPerguntas.length - 1 ? "Próxima →" : "Ver resultado →"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#3BA7FF]/15 text-4xl">
                  {acertos === quizPerguntas.length ? "🏆" : acertos >= quizPerguntas.length / 2 ? "⭐" : "📚"}
                </div>
                <p className="mb-1 text-3xl font-black text-white">{acertos}/{quizPerguntas.length}</p>
                <p className="mb-2 text-sm font-semibold text-[#3BA7FF]">
                  {acertos === quizPerguntas.length ? "Perfeito!" : acertos >= quizPerguntas.length / 2 ? "Muito bem!" : "Continue aprendendo!"}
                </p>
                <p className="mb-6 text-xs leading-6 text-[#64748B]">
                  {acertos === quizPerguntas.length
                    ? "Você dominou o conteúdo desta unidade."
                    : acertos >= quizPerguntas.length / 2
                    ? "Você está no caminho certo. Revise os pontos que errou."
                    : "Releia o conteúdo com calma e tente novamente quando quiser."}
                </p>
                <button
                  onClick={reiniciarQuiz}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 text-sm font-bold text-[#64748B] transition hover:bg-white/10"
                >
                  Refazer quiz
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── 8. MATERIAL COMPLEMENTAR ─────────────────────────────────── */}
        <section className="mb-8">
          <SectionLabel number="08" label="Material complementar" />
          <p className="mb-4 text-xs leading-6 text-[#475569]">
            Quer se aprofundar? Separamos recursos confiáveis para você explorar no seu ritmo.
          </p>

          <div className="flex flex-col gap-3">
            {materialComplementar.map((m, i) => (
              <button
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-white/5 px-4 py-4 text-left transition hover:bg-white/5"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background: `${m.cor}20` }}
                >
                  {m.icone}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">{m.titulo}</p>
                  <p className="text-[10px] text-[#475569]">{m.tipo}</p>
                </div>
                <span className="text-sm text-[#334155]">→</span>
              </button>
            ))}
          </div>
        </section>

        {/* ─── BOTÃO MARCAR COMO CONCLUÍDA ──────────────────────────────── */}
        <section className="mb-8">
          {!concluida ? (
            <button
              onClick={() => setConcluida(true)}
              className="w-full rounded-2xl bg-gradient-to-r from-[#3BA7FF] to-[#A855F7] py-5 text-sm font-black text-white shadow-lg transition hover:opacity-90"
            >
              ✓ Marcar aula como concluída
            </button>
          ) : (
            <div className="rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 p-5 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-sm font-black text-[#22C55E]">Aula concluída!</p>
              <p className="text-xs text-[#475569] mt-1">Progresso salvo. Continue para a próxima unidade.</p>
            </div>
          )}
        </section>

        {/* ─── AJUDA ────────────────────────────────────────────────────── */}
        <div
          className="mb-6 flex items-center justify-between rounded-2xl border border-white/5 px-5 py-4"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <p className="text-xs text-[#334155]">Ficou com dúvida sobre algo?</p>
          <button
            onClick={() => {
              localStorage.removeItem("caretea_onboarding_tea");
              setOnboardingVisto(false);
              setPassoAtual(0);
            }}
            className="text-xs font-bold text-[#3BA7FF] underline"
          >
            Ver tutorial
          </button>
        </div>

        {/* ─── PRÓXIMA UNIDADE ──────────────────────────────────────────── */}
        <Link
          href="/capacitacao/unidades/comunicacao"
          className="mb-8 flex items-center gap-4 rounded-2xl border border-white/5 p-5 transition hover:bg-white/5"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A855F7]/15 text-2xl">
            💬
          </div>
          <div className="flex-1">
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#334155]">Próxima unidade</p>
            <p className="text-sm font-bold text-white">Comunicação</p>
            <p className="text-xs text-[#475569]">Como se comunicar e evitar gatilhos</p>
          </div>
          <span className="text-lg text-[#A855F7]">→</span>
        </Link>

      </div>

      {/* ─── BOTTOM NAV ───────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          background: "rgba(5,13,26,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "0.5px solid rgba(59,167,255,0.10)",
          display: "flex",
          padding: "10px 0 14px",
          zIndex: 10,
        }}
      >
        {[
          { icon: "🏠", label: "Início",    href: "/" },
          { icon: "👤", label: "Perfil",    href: "/perfil" },
          { icon: "📚", label: "Aprender",  href: "/capacitacao", active: true },
          { icon: "📅", label: "Rotina",    href: "/rotina" },
          { icon: "👥", label: "Comunidade",href: "/comunidade" },
        ].map(({ icon, label, href, active }) => (
          <Link
            key={label}
            href={href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              textDecoration: "none",
              padding: "4px 0",
            }}
          >
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ fontSize: 10, color: active ? "#3BA7FF" : "#334155", fontWeight: active ? 700 : 400 }}>
              {label}
            </span>
          </Link>
        ))}
      </nav>https://youtu.be/y-_Ly5Tqggc?si=YiOKRHzT9G_i7sTbhttps://youtu.be/y-_Ly5Tqggc?si=YiOKRHzT9G_i7sTbhttps://youtu.be/y-_Ly5Tqggc?si=YiOKRHzT9G_i7sTb
    </main>
  );
}

// ─── COMPONENTE AUXILIAR ───────────────────────────────────────────────────
function SectionLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#3BA7FF]/15 text-[11px] font-black text-[#3BA7FF]">
        {number}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#334155]">{label}</p>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}