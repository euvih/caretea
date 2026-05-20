"use client";

import Link from "next/link";
import { useState } from "react";

const checklist = [
  "Entendi o que é o Transtorno do Espectro Autista",
  "Conheço os 3 níveis de suporte",
  "Sei identificar as principais características do TEA",
  "Compreendo que cada pessoa com TEA é única",
];

const quiz = [
  {
    pergunta: "O TEA é considerado um espectro porque:",
    opcoes: [
      "Afeta apenas crianças",
      "Se manifesta de formas muito variadas em cada pessoa",
      "Tem cura com o tempo",
      "É causado por vacinas",
    ],
    correta: 1,
    explicacao:
      "O TEA é chamado de espectro justamente porque suas manifestações variam muito — cada pessoa tem um perfil único de habilidades e desafios.",
  },
  {
    pergunta: "O Nível 1 de suporte no TEA indica:",
    opcoes: [
      "A pessoa não precisa de nenhuma ajuda",
      "A pessoa precisa de suporte intenso em todas as áreas",
      "A pessoa precisa de suporte leve, com boa capacidade de adaptação",
      "A pessoa tem deficiência intelectual grave",
    ],
    correta: 2,
    explicacao:
      "O Nível 1 indica necessidade de suporte leve. A pessoa pode apresentar dificuldades sociais e sensoriais, mas tem boa capacidade de adaptação com apoio.",
  },
  {
    pergunta: "Qual afirmação sobre o TEA é verdadeira?",
    opcoes: [
      "Pessoas com TEA não sentem emoções",
      "O TEA afeta apenas meninos",
      "O diagnóstico precoce melhora significativamente a qualidade de vida",
      "O TEA é causado por má criação",
    ],
    correta: 2,
    explicacao:
      "O diagnóstico e a intervenção precoce fazem grande diferença. Quanto antes a pessoa receber suporte adequado, maiores as possibilidades de desenvolvimento.",
  },
];

export default function EntendendoOTea() {
  const [checklistMarcado, setChecklistMarcado] = useState<boolean[]>(
    Array(checklist.length).fill(false)
  );
  const [quizAtual, setQuizAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [quizRespondido, setQuizRespondido] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  const toggleChecklist = (i: number) => {
    setChecklistMarcado((prev) => {
      const novo = [...prev];
      novo[i] = !novo[i];
      return novo;
    });
  };

  const responder = (i: number) => {
    if (quizRespondido) return;
    setRespostaSelecionada(i);
    setQuizRespondido(true);
    if (i === quiz[quizAtual].correta) {
      setAcertos((a) => a + 1);
    }
  };

  const proximaPergunta = () => {
    if (quizAtual + 1 < quiz.length) {
      setQuizAtual((q) => q + 1);
      setRespostaSelecionada(null);
      setQuizRespondido(false);
    } else {
      setQuizFinalizado(true);
    }
  };

  const reiniciarQuiz = () => {
    setQuizAtual(0);
    setRespostaSelecionada(null);
    setQuizRespondido(false);
    setAcertos(0);
    setQuizFinalizado(false);
  };

  const progresso = Math.round(
    (checklistMarcado.filter(Boolean).length / checklist.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#d7ddf0] px-4 py-10 text-[#1E293B] md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* VOLTAR */}
        <Link
          href="/capacitacao"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#2563EB]"
        >
          ← Voltar para Capacitação
        </Link>

        {/* HEADER */}
        <div className="mb-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3BA7FF] to-[#2563EB] p-8 text-white shadow-[0_20px_50px_rgba(59,167,255,0.3)]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">
            Módulo 01 · Fundamentos
          </p>
          <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
            🧠 Entendendo o TEA
          </h1>
          <p className="text-base leading-7 opacity-90">
            O que é o espectro, como ele se manifesta e o que esperar em cada nível.
          </p>
          {/* BARRA DE PROGRESSO */}
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-xs font-semibold opacity-80">
              <span>Seu progresso</span>
              <span>{progresso}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/30">
              <div
                className="h-2 rounded-full bg-white transition-all duration-500"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        {/* TEXTO EXPLICATIVO */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#2563EB]">
            O que é o TEA?
          </h2>
          <p className="mb-4 leading-8 text-[#475569]">
            O Transtorno do Espectro Autista (TEA) é uma condição neurológica e de desenvolvimento que afeta a forma como a pessoa percebe o mundo, se comunica e interage socialmente. É chamado de "espectro" porque se manifesta de maneiras muito diferentes em cada pessoa.
          </p>
          <p className="mb-4 leading-8 text-[#475569]">
            Algumas pessoas com TEA podem falar fluentemente e ter alto desempenho acadêmico, enquanto outras podem ter dificuldades significativas de comunicação e maior dependência no dia a dia. Não existe um "rosto único" do autismo.
          </p>
          <p className="leading-8 text-[#475569]">
            O diagnóstico é dividido em <strong className="text-[#1E293B]">3 níveis de suporte</strong>, que indicam a intensidade de apoio que a pessoa precisa — do Nível 1 (suporte leve) ao Nível 3 (suporte intenso).
          </p>
        </section>

        {/* VÍDEO */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#2563EB]">
            Assista: Introdução ao TEA
          </h2>
          <div className="overflow-hidden rounded-2xl bg-[#e2e8f0]">
            <div className="aspect-video flex items-center justify-center text-[#94A3B8]">
              <div className="text-center">
                <div className="mb-3 text-5xl">▶️</div>
                <p className="text-sm font-semibold">Adicione o link do vídeo aqui</p>
                <p className="mt-1 text-xs">Substitua este bloco por um iframe do YouTube</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-[#94A3B8]">
            💡 Para adicionar um vídeo real, substitua o bloco acima por:{" "}
            <code className="rounded bg-[#f1f5f9] px-1 py-0.5 text-[#475569]">
              &lt;iframe src="https://youtube.com/embed/SEU_ID" /&gt;
            </code>
          </p>
        </section>

        {/* DICAS PRÁTICAS */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#2563EB]">
            💡 Dicas práticas
          </h2>
          <div className="space-y-4">
            {[
              {
                emoji: "👁️",
                titulo: "Observe sem julgar",
                texto:
                  "Cada comportamento tem uma razão. Antes de reagir, tente entender o que a pessoa está comunicando através do comportamento.",
              },
              {
                emoji: "📚",
                titulo: "Busque informação de qualidade",
                texto:
                  "Converse com profissionais especializados (neuropediatra, psicólogo, fonoaudiólogo) e evite generalizações encontradas em redes sociais.",
              },
              {
                emoji: "❤️",
                titulo: "Celebre as conquistas",
                texto:
                  "Pequenas conquistas são grandes vitórias. Reconheça e celebre cada avanço, por menor que pareça.",
              },
              {
                emoji: "🤝",
                titulo: "Conecte-se com outros cuidadores",
                texto:
                  "Grupos de apoio e comunidades de famílias com TEA são fontes valiosas de experiência e acolhimento.",
              },
            ].map((dica, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl bg-[#f8fafc] p-5"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#3BA7FF]/10 text-2xl">
                  {dica.emoji}
                </div>
                <div>
                  <h3 className="mb-1 font-black text-[#1E293B]">{dica.titulo}</h3>
                  <p className="text-sm leading-6 text-[#64748B]">{dica.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHECKLIST */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-2 text-xl font-black text-[#2563EB]">
            ✅ Checklist de aprendizado
          </h2>
          <p className="mb-5 text-sm text-[#64748B]">
            Marque o que você já aprendeu nessa aula:
          </p>
          <div className="space-y-3">
            {checklist.map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleChecklist(i)}
                className="flex w-full items-center gap-4 rounded-2xl bg-[#f8fafc] px-5 py-4 text-left transition hover:bg-[#f1f5f9] active:bg-[#e2e8f0]"
              >
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    checklistMarcado[i]
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-[#cbd5e1]"
                  }`}
                >
                  {checklistMarcado[i] && (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    checklistMarcado[i] ? "text-[#2563EB] line-through" : "text-[#475569]"
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* QUIZ */}
        <section className="mb-10 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-2 text-xl font-black text-[#2563EB]">
            🧩 Quiz
          </h2>
          <p className="mb-6 text-sm text-[#64748B]">
            Teste o que você aprendeu:
          </p>

          {!quizFinalizado ? (
            <>
              {/* PROGRESSO DO QUIZ */}
              <div className="mb-6 flex items-center gap-3">
                {quiz.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      i < quizAtual
                        ? "bg-[#2563EB]"
                        : i === quizAtual
                        ? "bg-[#3BA7FF]"
                        : "bg-[#e2e8f0]"
                    }`}
                  />
                ))}
                <span className="text-xs font-semibold text-[#94A3B8]">
                  {quizAtual + 1}/{quiz.length}
                </span>
              </div>

              <p className="mb-5 text-base font-black text-[#1E293B]">
                {quiz[quizAtual].pergunta}
              </p>

              <div className="space-y-3">
                {quiz[quizAtual].opcoes.map((opcao, i) => {
                  let estilo =
                    "border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#475569]";
                  if (quizRespondido) {
                    if (i === quiz[quizAtual].correta)
                      estilo = "border-2 border-[#16A34A] bg-[#f0fdf4] text-[#16A34A] font-bold";
                    else if (i === respostaSelecionada)
                      estilo = "border-2 border-[#DC2626] bg-[#fef2f2] text-[#DC2626] font-bold";
                    else
                      estilo = "border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#94A3B8]";
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => responder(i)}
                      className={`w-full rounded-2xl px-5 py-4 text-left text-sm transition ${estilo} ${
                        !quizRespondido ? "hover:border-[#3BA7FF] hover:bg-[#eff6ff]" : ""
                      }`}
                    >
                      {opcao}
                    </button>
                  );
                })}
              </div>

              {quizRespondido && (
                <div className="mt-5 rounded-2xl bg-[#f0fdf4] p-5">
                  <p className="text-sm font-semibold text-[#16A34A]">
                    💡 {quiz[quizAtual].explicacao}
                  </p>
                  <button
                    type="button"
                    onClick={proximaPergunta}
                    className="mt-4 rounded-full bg-gradient-to-r from-[#3BA7FF] to-[#2563EB] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90"
                  >
                    {quizAtual + 1 < quiz.length ? "Próxima pergunta →" : "Ver resultado →"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="mb-4 text-6xl">
                {acertos === quiz.length ? "🏆" : acertos >= quiz.length / 2 ? "👏" : "📚"}
              </div>
              <h3 className="mb-2 text-2xl font-black text-[#1E293B]">
                {acertos}/{quiz.length} acertos
              </h3>
              <p className="mb-6 text-sm text-[#64748B]">
                {acertos === quiz.length
                  ? "Perfeito! Você dominou esse conteúdo."
                  : acertos >= quiz.length / 2
                  ? "Bom trabalho! Revise os pontos que errou."
                  : "Continue estudando! Releia o conteúdo e tente novamente."}
              </p>
              <button
                type="button"
                onClick={reiniciarQuiz}
                className="rounded-full border-2 border-[#2563EB] px-6 py-2 text-sm font-bold text-[#2563EB] transition hover:bg-[#2563EB] hover:text-white"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </section>

        {/* NAVEGAÇÃO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/capacitacao"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#2563EB] hover:text-[#2563EB]"
          >
            ← Voltar ao menu
          </Link>
          <Link
            href="/capacitacao/unidades/comunicacao"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#3BA7FF] to-[#2563EB] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
          >
            Próxima aula: Comunicação →
          </Link>
        </div>

      </div>
    </main>
  );
}