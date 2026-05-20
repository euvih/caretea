"use client";

import Link from "next/link";
import { useState } from "react";

const checklist = [
  "Entendi as diferentes formas de comunicação no TEA",
  "Conheço estratégias para evitar gatilhos comunicativos",
  "Sei como adaptar minha linguagem para melhor comunicação",
  "Aprendi sobre comunicação alternativa e aumentativa",
];

const quiz = [
  {
    pergunta: "Quando uma pessoa com TEA não responde verbalmente, isso significa que:",
    opcoes: [
      "Ela está sendo ignorante ou mal-educada",
      "Ela pode estar se comunicando de outras formas ou precisando de mais tempo",
      "Ela não entendeu o que foi dito",
      "Ela não quer interagir com ninguém",
    ],
    correta: 1,
    explicacao:
      "A comunicação vai muito além das palavras. Expressões faciais, gestos, comportamentos e até o silêncio são formas de comunicação. Respeitar o tempo e o estilo de cada pessoa é essencial.",
  },
  {
    pergunta: "Qual é a melhor forma de dar uma instrução para uma pessoa com TEA?",
    opcoes: [
      "Falar rápido para não perder a atenção",
      "Usar frases longas e detalhadas",
      "Usar frases curtas, claras e diretas, uma instrução por vez",
      "Repetir várias instruções ao mesmo tempo",
    ],
    correta: 2,
    explicacao:
      "Frases curtas, diretas e uma instrução por vez facilitam muito o processamento. Evite ironias, sarcasmo e linguagem figurada, pois podem causar confusão.",
  },
  {
    pergunta: "A Comunicação Alternativa e Aumentativa (CAA) é indicada:",
    opcoes: [
      "Apenas para pessoas que nunca vão falar",
      "Somente para crianças pequenas",
      "Para qualquer pessoa que se beneficie de apoio visual ou alternativo à fala",
      "Apenas em ambientes clínicos",
    ],
    correta: 2,
    explicacao:
      "A CAA pode ser usada por qualquer pessoa que se beneficie de suporte comunicativo, seja com pranchas de figuras, aplicativos, gestos ou outros recursos. Não substitui a fala — a complementa.",
  },
];

export default function Comunicacao() {
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
    if (i === quiz[quizAtual].correta) setAcertos((a) => a + 1);
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
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#7E22CE]"
        >
          ← Voltar para Capacitação
        </Link>

        {/* HEADER */}
        <div className="mb-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#A855F7] to-[#7E22CE] p-8 text-white shadow-[0_20px_50px_rgba(168,85,247,0.3)]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">
            Módulo 01 · Fundamentos
          </p>
          <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
            💬 Comunicação
          </h1>
          <p className="text-base leading-7 opacity-90">
            Formas de se comunicar, evitar gatilhos e criar conexões mais saudáveis.
          </p>
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
          <h2 className="mb-5 text-xl font-black text-[#7E22CE]">
            Comunicação no TEA
          </h2>
          <p className="mb-4 leading-8 text-[#475569]">
            A comunicação é uma das áreas mais impactadas pelo TEA. Algumas pessoas falam muito, outras falam pouco, e algumas não usam a fala como principal forma de se expressar. O importante é entender que <strong className="text-[#1E293B]">toda forma de comunicação é válida</strong>.
          </p>
          <p className="mb-4 leading-8 text-[#475569]">
            Muitas pessoas com TEA processam a linguagem de forma diferente: levam mais tempo para responder, podem interpretar frases ao pé da letra e têm dificuldade com expressões figuradas como "choveu canivete" ou "quebre a perna".
          </p>
          <p className="leading-8 text-[#475569]">
            Como cuidador, adaptar sua forma de comunicar faz toda a diferença. Linguagem clara, tom calmo, contato visual sem exigência e respeito ao tempo de resposta são pilares de uma comunicação saudável.
          </p>
        </section>

        {/* VÍDEO */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#7E22CE]">
            Assista: Comunicação e TEA
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
        </section>

        {/* DICAS PRÁTICAS */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#7E22CE]">
            💡 Dicas práticas
          </h2>
          <div className="space-y-4">
            {[
              {
                emoji: "🗣️",
                titulo: "Use frases curtas e diretas",
                texto: "Evite instruções longas. Fale uma coisa por vez e aguarde a resposta antes de continuar. Ex: ao invés de 'Vai lá, pega o casaco e coloca o sapato', diga 'Pega o casaco' e espere.",
              },
              {
                emoji: "🚫",
                titulo: "Evite linguagem figurada",
                texto: "Expressões como 'estou de olho em você', 'dá um gás' ou 'isso não tem pé nem cabeça' podem ser interpretadas literalmente e causar confusão ou ansiedade.",
              },
              {
                emoji: "⏱️",
                titulo: "Respeite o tempo de resposta",
                texto: "Pessoas com TEA podem precisar de mais tempo para processar o que foi dito e formular uma resposta. Evite repetir a pergunta rapidamente — isso pode aumentar a ansiedade.",
              },
              {
                emoji: "🖼️",
                titulo: "Use apoio visual",
                texto: "Figuras, fotos, roteiros visuais e aplicativos de CAA podem facilitar muito a comunicação. O visual ancora a compreensão e reduz a dependência exclusiva da fala.",
              },
            ].map((dica, i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-[#f8fafc] p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#A855F7]/10 text-2xl">
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
          <h2 className="mb-2 text-xl font-black text-[#7E22CE]">
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
                      ? "border-[#7E22CE] bg-[#7E22CE] text-white"
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
                    checklistMarcado[i] ? "text-[#7E22CE] line-through" : "text-[#475569]"
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
          <h2 className="mb-2 text-xl font-black text-[#7E22CE]">🧩 Quiz</h2>
          <p className="mb-6 text-sm text-[#64748B]">Teste o que você aprendeu:</p>

          {!quizFinalizado ? (
            <>
              <div className="mb-6 flex items-center gap-3">
                {quiz.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      i < quizAtual ? "bg-[#7E22CE]" : i === quizAtual ? "bg-[#A855F7]" : "bg-[#e2e8f0]"
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
                  let estilo = "border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#475569]";
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
                        !quizRespondido ? "hover:border-[#A855F7] hover:bg-[#faf5ff]" : ""
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
                    className="mt-4 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7E22CE] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90"
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
                className="rounded-full border-2 border-[#7E22CE] px-6 py-2 text-sm font-bold text-[#7E22CE] transition hover:bg-[#7E22CE] hover:text-white"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </section>

        {/* NAVEGAÇÃO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/capacitacao/unidades/entendendo-o-tea"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#7E22CE] hover:text-[#7E22CE]"
          >
            ← Aula anterior
          </Link>
          <Link
            href="/capacitacao"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#7E22CE] hover:text-[#7E22CE]"
          >
            Ver todos os módulos
          </Link>
          <Link
            href="/capacitacao/unidades/alimentacao"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#7E22CE] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
          >
            Próxima aula →
          </Link>
        </div>

      </div>
    </main>
  );
}