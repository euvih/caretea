"use client";

import { useState } from "react";
import Link from "next/link";

type Passo = {
  emoji: string;
  titulo: string;
  descricao: string;
};

type Crise = {
  id: string;
  emoji: string;
  titulo: string;
  cor: string;
  corTexto: string;
  corBorda: string;
  sombra: string;
  passos: Passo[];
  frase: string;
};

const crises: Crise[] = [
  {
    id: "sensorial",
    emoji: "👂",
    titulo: "Crise Sensorial",
    cor: "from-[#3BA7FF] to-[#2563EB]",
    corTexto: "text-[#2563EB]",
    corBorda: "border-[#3BA7FF]",
    sombra: "shadow-[0_8px_30px_rgba(59,167,255,0.35)]",
    frase: "Reduza os estímulos ao máximo agora.",
    passos: [
      { emoji: "🔇", titulo: "Reduza o som", descricao: "Desligue TV, música e afaste fontes de barulho." },
      { emoji: "💡", titulo: "Diminua a luz", descricao: "Apague luzes fortes ou leve para um lugar mais escuro." },
      { emoji: "🧸", titulo: "Ofereça conforto", descricao: "Um objeto favorito, cobertor ou brinquedo sensorial." },
      { emoji: "🗣️", titulo: "Fale pouco", descricao: "Use frases curtas e voz calma. Evite perguntas agora." },
      { emoji: "⏳", titulo: "Aguarde", descricao: "Dê espaço e tempo. Não force contato físico." },
    ],
  },
  {
    id: "agressividade",
    emoji: "⚡",
    titulo: "Agressividade",
    cor: "from-[#FF4D6D] to-[#DC2626]",
    corTexto: "text-[#DC2626]",
    corBorda: "border-[#FF4D6D]",
    sombra: "shadow-[0_8px_30px_rgba(255,77,109,0.35)]",
    frase: "Mantenha a calma. Você consegue.",
    passos: [
      { emoji: "🛡️", titulo: "Garanta segurança", descricao: "Remova objetos perigosos do alcance imediatamente." },
      { emoji: "↔️", titulo: "Dê espaço", descricao: "Recue alguns passos. Não bloqueie a saída." },
      { emoji: "😐", titulo: "Mantenha expressão neutra", descricao: "Evite gritar, chorar ou reagir com emoção intensa." },
      { emoji: "🗣️", titulo: "Voz firme e baixa", descricao: "Diga o nome da pessoa uma vez. Espere. Não repita várias vezes." },
      { emoji: "🏠", titulo: "Mude o ambiente", descricao: "Se possível, conduza para um local mais calmo e familiar." },
    ],
  },
  {
    id: "sobrecarga",
    emoji: "😮‍💨",
    titulo: "Sobrecarga Emocional",
    cor: "from-[#A855F7] to-[#7E22CE]",
    corTexto: "text-[#7E22CE]",
    corBorda: "border-[#A855F7]",
    sombra: "shadow-[0_8px_30px_rgba(168,85,247,0.35)]",
    frase: "Cuide de você também. Isso importa.",
    passos: [
      { emoji: "🌬️", titulo: "Respire agora", descricao: "Inspire 4 segundos, segure 4, expire 4. Repita 3 vezes." },
      { emoji: "📞", titulo: "Peça ajuda", descricao: "Chame alguém de confiança para ficar com a pessoa por um momento." },
      { emoji: "💧", titulo: "Beba água", descricao: "Hidrate-se. Parece simples, mas ajuda o corpo a regular." },
      { emoji: "🚶", titulo: "Saia por 5 minutos", descricao: "Se houver alguém para ficar, dê uma pausa curta." },
      { emoji: "❤️", titulo: "Você não está errado(a)", descricao: "Sentir-se sobrecarregado é humano. Procure apoio depois." },
    ],
  },
  {
    id: "fuga",
    emoji: "🏃",
    titulo: "Fuga / Evasão",
    cor: "from-[#FFD93D] to-[#F59E0B]",
    corTexto: "text-[#B45309]",
    corBorda: "border-[#FFD93D]",
    sombra: "shadow-[0_8px_30px_rgba(255,217,61,0.35)]",
    frase: "Segurança primeiro. Aja com calma.",
    passos: [
      { emoji: "👁️", titulo: "Não perca de vista", descricao: "Mantenha contato visual ou físico seguro sem assustar." },
      { emoji: "🚪", titulo: "Bloqueie saídas perigosas", descricao: "Feche portas, portões e afaste de vias movimentadas." },
      { emoji: "📢", titulo: "Chame pelo nome", descricao: "Voz calma e firme. Não grite. Aproxime-se devagar." },
      { emoji: "🧸", titulo: "Use um atrativo", descricao: "Ofereça um objeto favorito, comida preferida ou atividade." },
      { emoji: "📍", titulo: "Acione ajuda se necessário", descricao: "Se não encontrar em 2 minutos, chame alguém ou ligue 190." },
    ],
  },
  {
    id: "hiperfoco",
    emoji: "🔁",
    titulo: "Hiperfoco / Repetição",
    cor: "from-[#34D399] to-[#059669]",
    corTexto: "text-[#059669]",
    corBorda: "border-[#34D399]",
    sombra: "shadow-[0_8px_30px_rgba(52,211,153,0.35)]",
    frase: "Não force a interrupção. Redirecione.",
    passos: [
      { emoji: "⏰", titulo: "Avise antes", descricao: "Diga com antecedência: 'Em 5 minutos vamos parar.' Use timer visual." },
      { emoji: "🔀", titulo: "Ofereça transição", descricao: "Apresente a próxima atividade como algo positivo." },
      { emoji: "🎯", titulo: "Redirecione o interesse", descricao: "Conecte o tema do hiperfoco com a próxima tarefa se possível." },
      { emoji: "🚫", titulo: "Evite retirar bruscamente", descricao: "Tirar o objeto de forma abrupta pode gerar crise maior." },
      { emoji: "✅", titulo: "Valide o interesse", descricao: "Diga que o assunto é legal e que voltarão depois." },
    ],
  },
  {
    id: "publica",
    emoji: "🏪",
    titulo: "Crise em Público",
    cor: "from-[#FB923C] to-[#EA580C]",
    corTexto: "text-[#EA580C]",
    corBorda: "border-[#FB923C]",
    sombra: "shadow-[0_8px_30px_rgba(251,146,60,0.35)]",
    frase: "Ignore os olhares. Foque na pessoa.",
    passos: [
      { emoji: "🚶", titulo: "Saia do local", descricao: "Leve para um canto mais vazio, quieto e sem movimento." },
      { emoji: "🙈", titulo: "Ignore quem olha", descricao: "Seu foco é a pessoa. Os outros não importam agora." },
      { emoji: "📱", titulo: "Use cartão de autismo", descricao: "Se tiver, mostre para quem precisar entender a situação." },
      { emoji: "🧸", titulo: "Ofereça suporte sensorial", descricao: "Fone de ouvido, óculos de sol, objeto favorito." },
      { emoji: "🏠", titulo: "Avalie ir para casa", descricao: "Se a crise persistir, o melhor pode ser encerrar o passeio." },
    ],
  },
];

export default function SOS() {
  const [criseSelecionada, setCriseSelecionada] = useState<Crise | null>(null);

  if (criseSelecionada) {
    return (
      <main className="min-h-screen bg-[#d7ddf0] px-4 py-6 text-[#1E293B]">

        {/* HEADER */}
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => setCriseSelecionada(null)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-md"
          >
            ←
          </button>
          <span className="text-sm font-semibold uppercase tracking-widest text-[#475569]">
            SOS • Protocolo
          </span>
        </div>

        {/* FRASE DE APOIO */}
        <div className={`mb-6 rounded-[2rem] bg-gradient-to-br ${criseSelecionada.cor} p-[1px] ${criseSelecionada.sombra}`}>
          <div className="rounded-[2rem] bg-white px-6 py-5 text-center">
            <p className="text-4xl mb-2">{criseSelecionada.emoji}</p>
            <h1 className={`text-2xl font-black ${criseSelecionada.corTexto}`}>
              {criseSelecionada.titulo}
            </h1>
            <p className="mt-2 text-base font-semibold text-[#475569]">
              {criseSelecionada.frase}
            </p>
          </div>
        </div>

        {/* PASSOS */}
        <div className="flex flex-col gap-4">
          {criseSelecionada.passos.map((passo, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-[1.5rem] bg-white px-5 py-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1f5f9] text-2xl">
                {passo.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase tracking-widest ${criseSelecionada.corTexto}`}>
                    Passo {index + 1}
                  </span>
                </div>
                <p className="text-base font-bold text-[#1E293B]">{passo.titulo}</p>
                <p className="mt-1 text-sm leading-6 text-[#475569]">{passo.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RODAPÉ DE APOIO */}
        <div className="mt-8 rounded-[2rem] bg-white px-6 py-5 text-center shadow-sm">
          <p className="text-sm text-[#475569] leading-6">
            Você está fazendo o possível. 💙<br />
            Quando a crise passar, respire e cuide de você também.
          </p>
          <button
            onClick={() => setCriseSelecionada(null)}
            className="mt-4 rounded-full bg-[#f1f5f9] px-6 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#e2e8f0]"
          >
            Ver outras situações
          </button>
        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#d7ddf0] px-4 py-6 text-[#1E293B]">

      {/* HEADER */}
      <div className="mb-2 flex items-center gap-3">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-md"
        >
          ←
        </Link>
        <span className="text-sm font-semibold uppercase tracking-widest text-[#475569]">
          CareTEA • SOS
        </span>
      </div>

      {/* TITULO */}
      <div className="mb-6 text-center">
        <p className="text-4xl mb-1">📢</p>
        <h1 className="text-3xl font-black text-[#1E293B]">O que está acontecendo?</h1>
        <p className="mt-2 text-sm text-[#475569]">
          Toque na situação para ver o protocolo imediato.
        </p>
      </div>

      {/* GRID DE CRISES */}
      <div className="grid grid-cols-2 gap-4">
        {crises.map((crise) => (
          <button
            key={crise.id}
            onClick={() => setCriseSelecionada(crise)}
            className={`rounded-[2rem] bg-gradient-to-br ${crise.cor} p-[1px] ${crise.sombra} transition duration-200 active:scale-95`}
          >
            <div className="rounded-[2rem] bg-white px-4 py-6 text-center h-full flex flex-col items-center justify-center gap-2">
              <span className="text-4xl">{crise.emoji}</span>
              <span className={`text-sm font-bold leading-tight ${crise.corTexto}`}>
                {crise.titulo}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* AVISO EMERGÊNCIA */}
      <div className="mt-6 rounded-[2rem] bg-white px-5 py-5 text-center shadow-sm">
        <p className="text-sm font-semibold text-[#475569]">
          Situação de risco grave?
        </p>
        <a
          href="tel:190"
          className="mt-3 flex items-center justify-center gap-2 rounded-full bg-[#FF4D6D] px-6 py-3 text-base font-bold text-white shadow-md transition active:scale-95"
        >
          📞 Ligar 190 — Emergência
        </a>
      </div>

    </main>
  );
}