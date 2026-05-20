"use client";

import Link from "next/link";
import { useState } from "react";

const checklist = [
  "Entendi o que é seletividade alimentar no TEA",
  "Conheço estratégias para introduzir novos alimentos",
  "Sei como tornar o momento da refeição mais tranquilo",
  "Aprendi a identificar gatilhos sensoriais relacionados à alimentação",
];

const quiz = [
  {
    pergunta: "A seletividade alimentar no TEA é causada principalmente por:",
    opcoes: [
      "Birra e mau comportamento da criança",
      "Falta de disciplina dos pais",
      "Hipersensibilidade sensorial e dificuldades de processamento",
      "Excesso de açúcar na dieta",
    ],
    correta: 2,
    explicacao:
      "A seletividade alimentar no TEA está ligada à hipersensibilidade sensorial — textura, cheiro, cor e temperatura dos alimentos podem ser intensamente desconfortáveis. Não é birra, é uma dificuldade neurológica real.",
  },
  {
    pergunta: "Qual estratégia é mais indicada para introduzir um alimento novo?",
    opcoes: [
      "Forçar a pessoa a comer até aceitar",
      "Esconder o alimento novo dentro de outro",
      "Apresentar o alimento gradualmente, sem pressão, em pequenas quantidades",
      "Retirar todos os alimentos preferidos até aceitar o novo",
    ],
    correta: 2,
    explicacao:
      "A exposição gradual e sem pressão é a abordagem mais eficaz. Forçar ou punir cria associações negativas com o alimento e com o momento da refeição, piorando a seletividade.",
  },
  {
    pergunta: "Durante a refeição, o ambiente ideal para uma pessoa com TEA é:",
    opcoes: [
      "Com TV ligada para distrair",
      "Com muitas pessoas ao redor para socializar",
      "Calmo, previsível e com poucos estímulos sensoriais",
      "Diferente a cada dia para estimular a adaptação",
    ],
    correta: 2,
    explicacao:
      "Ambientes calmos e previsíveis reduzem a ansiedade no momento da refeição. Rotinas alimentares consistentes — mesmo horário, mesmo lugar — ajudam muito pessoas com TEA.",
  },
];

export default function Alimentacao() {
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
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#B45309]"
        >
          ← Voltar para Capacitação
        </Link>

        {/* HEADER */}
        <div className="mb-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFD93D] to-[#F59E0B] p-8 text-white shadow-[0_20px_50px_rgba(255,217,61,0.3)]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest opacity-80">
            Módulo 02 · Desafios do dia a dia
          </p>
          <h1 className="mb-4 text-3xl font-black leading-tight md:text-5xl">
            🍽️ Alimentação
          </h1>
          <p className="text-base leading-7 opacity-90">
            Seletividade alimentar, estratégias e como lidar com recusas e rotinas à mesa.
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
          <h2 className="mb-5 text-xl font-black text-[#B45309]">
            Seletividade alimentar no TEA
          </h2>
          <p className="mb-4 leading-8 text-[#475569]">
            A seletividade alimentar é uma das queixas mais comuns entre famílias de pessoas com TEA. Ela vai muito além de "não gostar" de um alimento — envolve <strong className="text-[#1E293B]">hipersensibilidade sensorial</strong> a texturas, cheiros, cores, temperaturas e até a aparência dos alimentos no prato.
          </p>
          <p className="mb-4 leading-8 text-[#475569]">
            Para muitas pessoas com TEA, misturar alimentos no prato, sentir a textura de algo mole ou o cheiro forte de um tempero pode ser genuinamente insuportável — não uma escolha, mas uma resposta neurológica intensa.
          </p>
          <p className="leading-8 text-[#475569]">
            O momento da refeição pode se tornar um gatilho de ansiedade quando há muita pressão. A abordagem mais eficaz é a <strong className="text-[#1E293B]">exposição gradual, respeitosa e sem confronto</strong>, sempre priorizando a segurança alimentar e o bem-estar emocional.
          </p>
        </section>

        {/* VÍDEO */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-5 text-xl font-black text-[#B45309]">
            Assista: Alimentação e TEA
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
          <h2 className="mb-5 text-xl font-black text-[#B45309]">
            💡 Dicas práticas
          </h2>
          <div className="space-y-4">
            {[
              {
                emoji: "🐢",
                titulo: "Introduza novos alimentos devagar",
                texto:
                  "Comece apenas colocando o alimento novo no prato, sem exigir que coma. Na próxima vez, peça para tocar. Depois, cheirar. A exposição gradual reduz a ansiedade e aumenta a aceitação.",
              },
              {
                emoji: "🍽️",
                titulo: "Mantenha uma rotina na hora de comer",
                texto:
                  "Mesmo horário, mesmo lugar e uma sequência previsível (lavar as mãos, sentar, servir) ajudam a preparar o sistema nervoso para a refeição e reduzem a resistência.",
              },
              {
                emoji: "🔇",
                titulo: "Reduza os estímulos no ambiente",
                texto:
                  "TV desligada, ambiente silencioso e sem cheiros fortes competindo com a refeição. Para quem tem hipersensibilidade sensorial, menos estímulos = mais foco e tranquilidade para comer.",
              },
              {
                emoji: "🌟",
                titulo: "Valorize o que a pessoa já come",
                texto:
                  "Em vez de focar no que recusa, celebre os alimentos aceitos. Construa a segurança alimentar a partir do que já funciona e vá expandindo aos poucos, sem pressão.",
              },
            ].map((dica, i) => (
              <div key={i} className="flex gap-4 rounded-2xl bg-[#f8fafc] p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFD93D]/20 text-2xl">
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
          <h2 className="mb-2 text-xl font-black text-[#B45309]">
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
                      ? "border-[#B45309] bg-[#B45309] text-white"
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
                    checklistMarcado[i] ? "text-[#B45309] line-through" : "text-[#475569]"
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
          <h2 className="mb-2 text-xl font-black text-[#B45309]">🧩 Quiz</h2>
          <p className="mb-6 text-sm text-[#64748B]">Teste o que você aprendeu:</p>

          {!quizFinalizado ? (
            <>
              <div className="mb-6 flex items-center gap-3">
                {quiz.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full transition-all ${
                      i < quizAtual ? "bg-[#B45309]" : i === quizAtual ? "bg-[#F59E0B]" : "bg-[#e2e8f0]"
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
                        !quizRespondido ? "hover:border-[#F59E0B] hover:bg-[#fffbeb]" : ""
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
                    className="mt-4 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#F59E0B] px-6 py-2 text-sm font-bold text-white transition hover:opacity-90"
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
                className="rounded-full border-2 border-[#B45309] px-6 py-2 text-sm font-bold text-[#B45309] transition hover:bg-[#B45309] hover:text-white"
              >
                Tentar novamente
              </button>
            </div>
          )}
        </section>

        {/* NAVEGAÇÃO */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <Link
            href="/capacitacao/unidades/comunicacao"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#B45309] hover:text-[#B45309]"
          >
            ← Aula anterior
          </Link>
          <Link
            href="/capacitacao"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#cbd5e1] bg-white px-6 py-3 text-sm font-bold text-[#64748B] transition hover:border-[#B45309] hover:text-[#B45309]"
          >
            Ver todos os módulos
          </Link>
          <Link
            href="/capacitacao/unidades/rotina"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#F59E0B] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-90"
          >
            Próxima aula →
          </Link>
        </div>

      </div>
    </main>
  );
}