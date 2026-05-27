"use client";

import Link from "next/link";
import { useState } from "react";

const modulos = [
  {
    numero: "01",
    titulo: "Fundamentos",
    descricao: "O ponto de partida para todo cuidador.",
    emoji: "📖",
    cor: "#3BA7FF",
    corBg: "rgba(59,167,255,0.12)",
    unidades: [
      {
        emoji: "🧠",
        titulo: "Entendendo o TEA",
        descricao: "O que é o espectro e como ele se manifesta em cada nível.",
        rota: "/capacitacao/unidades/entendendo-o-tea",
        cor: "#3BA7FF",
      },
      {
        emoji: "💬",
        titulo: "Comunicação",
        descricao: "Evite gatilhos e crie conexões mais saudáveis.",
        rota: "/capacitacao/unidades/comunicacao",
        cor: "#3BA7FF",
      },
      {
        emoji: "🔍",
        titulo: "Sinais de alerta",
        descricao: "Identifique sinais e saiba quando buscar avaliação profissional.",
        rota: "/capacitacao/unidades/sinais-de-alerta",
        cor: "#3BA7FF",
      },
    ],
  },
  {
    numero: "02",
    titulo: "Situações críticas",
    descricao: "Como agir com segurança nos momentos mais desafiadores.",
    emoji: "⚡",
    cor: "#FF4D6D",
    corBg: "rgba(255,77,109,0.12)",
    unidades: [
      {
        emoji: "⚡",
        titulo: "Crises e desregulação",
        descricao: "Prevenir e agir com segurança em momentos de crise.",
        rota: "/capacitacao/unidades/crises",
        cor: "#FF4D6D",
      },
      {
        emoji: "🧩",
        titulo: "Regulação emocional",
        descricao: "Ajude a identificar e regular as próprias emoções.",
        rota: "/capacitacao/unidades/regulacao-emocional",
        cor: "#FF4D6D",
      },
      {
        emoji: "🛡️",
        titulo: "Segurança",
        descricao: "Prevenção de riscos, fugas e comportamentos perigosos.",
        rota: "/capacitacao/unidades/seguranca",
        cor: "#FF4D6D",
      },
    ],
  },
  {
    numero: "03",
    titulo: "Saúde do cuidador",
    descricao: "Você também importa. Aprenda a se cuidar para continuar cuidando.",
    emoji: "❤️",
    cor: "#A855F7",
    corBg: "rgba(168,85,247,0.12)",
    unidades: [
      {
        emoji: "❤️",
        titulo: "Cuidando do cuidador",
        descricao: "Reconheça burnout e cuide da sua saúde mental.",
        rota: "/capacitacao/unidades/cuidando-do-cuidador",
        cor: "#A855F7",
      },
    ],
  },
];

export default function ModulosAccordion() {
  const [moduloAberto, setModuloAberto] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {modulos.map((modulo) => {
        const aberto = moduloAberto === modulo.numero;
        return (
          <div
            key={modulo.numero}
            className="overflow-hidden rounded-[1.5rem] border border-white/40 bg-white/60 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setModuloAberto(aberto ? null : modulo.numero)}
              className="flex w-full items-center gap-4 px-5 py-5 transition hover:bg-white/40 active:bg-white/60"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                style={{ background: modulo.corBg }}
              >
                {modulo.emoji}
              </div>
              <div className="flex-1 text-left">
                <p className="text-base font-black text-[#1E293B]">{modulo.titulo}</p>
                <p className="mt-0.5 text-xs text-[#64748B]">{modulo.descricao}</p>
              </div>
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-sm transition-transform duration-300 ${
                  aberto ? "rotate-180" : ""
                }`}
              >
                ⌄
              </div>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                aberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-white/50">
                  {modulo.unidades.map((unidade, i) => (
                    <Link
                      key={i}
                      href={unidade.rota}
                      className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/50 active:bg-white/70"
                    >
                      <span className="text-2xl">{unidade.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1E293B]">{unidade.titulo}</p>
                        <p className="mt-0.5 text-xs leading-5 text-[#64748B]">{unidade.descricao}</p>
                      </div>
                      <span className="shrink-0 text-sm font-bold" style={{ color: unidade.cor }}>
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}