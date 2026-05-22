"use client";

import Link from "next/link";
import { useState } from "react";

const modulos = [
  {
    numero: "01",
    titulo: "Fundamentos",
    descricao: "O ponto de partida para todo cuidador. Entenda o TEA e aprenda a se comunicar melhor.",
    cor: "from-[#3BA7FF] to-[#2563EB]",
    corTexto: "text-[#2563EB]",
    corFundo: "bg-[#3BA7FF]/10",
    unidades: [
      {
        emoji: "🧠",
        titulo: "Entendendo o TEA",
        descricao: "O que é o espectro, como ele se manifesta e o que esperar em cada nível.",
        rota: "/capacitacao/unidades/entendendo-o-tea",
        cor: "from-[#3BA7FF] to-[#2563EB]",
        corTexto: "text-[#2563EB]",
        corFundo: "bg-[#3BA7FF]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(59,167,255,0.22)]",
      },
      {
        emoji: "💬",
        titulo: "Comunicação",
        descricao: "Formas de se comunicar, evitar gatilhos e criar conexões mais saudáveis.",
        rota: "/capacitacao/unidades/comunicacao",
        cor: "from-[#A855F7] to-[#7E22CE]",
        corTexto: "text-[#7E22CE]",
        corFundo: "bg-[#A855F7]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(168,85,247,0.22)]",
      },
      {
    emoji: "🔍",
    titulo: "Sinais de Alerta",
    descricao: "Aprenda a identificar sinais que podem indicar TEA e quando buscar avaliação profissional.",
    rota: "/capacitacao/unidades/sinais-de-alerta",
    cor: "from-[#3BA7FF] to-[#1D4ED8]",
    corTexto: "text-[#1D4ED8]",
    corFundo: "bg-[#3BA7FF]/10",
    corSombra: "hover:shadow-[0_20px_40px_rgba(59,167,255,0.22)]",
  },
    ],
  },
  /*{
    numero: "02",
    titulo: "Desafios do dia a dia",
    descricao: "Estratégias práticas para os desafios mais comuns da rotina com TEA.",
    cor: "from-[#FFD93D] to-[#F59E0B]",
    corTexto: "text-[#B45309]",
    corFundo: "bg-[#FFD93D]/10",
    unidades: [
      {
        emoji: "🍽️",
        titulo: "Alimentação",
        descricao: "Seletividade alimentar, estratégias e como lidar com recusas e rotinas à mesa.",
        rota: "/capacitacao/unidades/alimentacao",
        cor: "from-[#FFD93D] to-[#F59E0B]",
        corTexto: "text-[#B45309]",
        corFundo: "bg-[#FFD93D]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(255,217,61,0.22)]",
      },
      {
        emoji: "📅",
        titulo: "Rotina e organização",
        descricao: "Criar previsibilidade, reduzir ansiedade e estruturar o dia a dia.",
        rota: "/capacitacao/unidades/rotina",
        cor: "from-[#38BDF8] to-[#0EA5E9]",
        corTexto: "text-[#0369A1]",
        corFundo: "bg-[#38BDF8]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(56,189,248,0.22)]",
      },
      {
        emoji: "👥",
        titulo: "Socialização",
        descricao: "Desenvolvimento social e adaptação em ambientes externos e coletivos.",
        rota: "/capacitacao/unidades/socializacao",
        cor: "from-[#34D399] to-[#059669]",
        corTexto: "text-[#059669]",
        corFundo: "bg-[#34D399]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(52,211,153,0.22)]",
      },
    ],
  },*/
  {
    numero: "03",
    titulo: "Situações críticas",
    descricao: "Como agir com segurança e serenidade nos momentos mais desafiadores.",
    cor: "from-[#FF4D6D] to-[#DC2626]",
    corTexto: "text-[#DC2626]",
    corFundo: "bg-[#FF4D6D]/10",
    unidades: [
      {
        emoji: "⚡",
        titulo: "Crises e desregulação",
        descricao: "Identificar sinais, prevenir e agir com segurança em momentos de crise.",
        rota: "/capacitacao/unidades/crises",
        cor: "from-[#FF4D6D] to-[#DC2626]",
        corTexto: "text-[#DC2626]",
        corFundo: "bg-[#FF4D6D]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(255,77,109,0.22)]",
      },
      {
        emoji: "🧩",
        titulo: "Regulação emocional",
        descricao: "Como ajudar a pessoa a identificar e regular suas próprias emoções.",
        rota: "/capacitacao/unidades/regulacao-emocional",
        cor: "from-[#F472B6] to-[#DB2777]",
        corTexto: "text-[#DB2777]",
        corFundo: "bg-[#F472B6]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(244,114,182,0.22)]",
      },
      {
        emoji: "🛡️",
        titulo: "Segurança",
        descricao: "Prevenção de situações de risco, fugas e comportamentos perigosos.",
        rota: "/capacitacao/unidades/seguranca",
        cor: "from-[#FB923C] to-[#EA580C]",
        corTexto: "text-[#EA580C]",
        corFundo: "bg-[#FB923C]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(251,146,60,0.22)]",
      },
    ],
  },
  /*{
    numero: "04",
    titulo: "Desenvolvimento e autonomia",
    descricao: "Estimule a independência e o crescimento gradual de quem você cuida.",
    cor: "from-[#4ADE80] to-[#16A34A]",
    corTexto: "text-[#16A34A]",
    corFundo: "bg-[#4ADE80]/10",
    unidades: [
      {
        emoji: "🌱",
        titulo: "Autonomia",
        descricao: "Estimular independência nas atividades diárias de forma gradual e respeitosa.",
        rota: "/capacitacao/unidades/autonomia",
        cor: "from-[#4ADE80] to-[#16A34A]",
        corTexto: "text-[#16A34A]",
        corFundo: "bg-[#4ADE80]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(74,222,128,0.22)]",
      },
    ],
  },*/
  {
    numero: "05",
    titulo: "Saúde do cuidador",
    descricao: "Você também importa. Aprenda a se cuidar para continuar cuidando.",
    cor: "from-[#FDA4AF] to-[#E11D48]",
    corTexto: "text-[#E11D48]",
    corFundo: "bg-[#FDA4AF]/10",
    unidades: [
      {
        emoji: "❤️",
        titulo: "Cuidando do cuidador",
        descricao: "Reconhecer burnout, sobrecarga emocional e cuidar da própria saúde mental.",
        rota: "/capacitacao/unidades/cuidando-do-cuidador",
        cor: "from-[#FDA4AF] to-[#E11D48]",
        corTexto: "text-[#E11D48]",
        corFundo: "bg-[#FDA4AF]/10",
        corSombra: "hover:shadow-[0_20px_40px_rgba(253,164,175,0.22)]",
      },
    ],
  },
];

export default function ModulosAccordion() {
  const [moduloAberto, setModuloAberto] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {modulos.map((modulo) => {
        const aberto = moduloAberto === modulo.numero;
        return (
          <div
            key={modulo.numero}
            className="overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/50 backdrop-blur-md"
          >
            <button
              type="button"
              onClick={() => setModuloAberto(aberto ? null : modulo.numero)}
              className="flex w-full items-center gap-4 px-6 py-6 transition hover:bg-white/40 active:bg-white/60"
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${modulo.cor} text-lg font-black text-white shadow-md`}
              >
                {modulo.numero}
              </div>
              <div className="text-left">
                <h3 className={`text-xl font-black ${modulo.corTexto}`}>
                  {modulo.titulo}
                </h3>
                <p className="mt-1 text-sm text-[#64748B]">
                  {modulo.descricao}
                </p>
              </div>
              <div className="ml-auto shrink-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f5f9] text-xl transition duration-300 ${
                    aberto ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </div>
              </div>
            </button>

            <div
              className={`grid transition-all duration-500 ease-in-out ${
                aberto
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-4 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
                  {modulo.unidades.map((unidade, i) => (
                    <Link
                      key={i}
                      href={unidade.rota}
                      className={`group overflow-hidden rounded-[2rem] bg-gradient-to-br ${unidade.cor} p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 ${unidade.corSombra}`}
                    >
                      <div className="flex h-full flex-col rounded-[2rem] bg-white px-6 py-6">
                        <div
                          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${unidade.corFundo} text-2xl`}
                        >
                          {unidade.emoji}
                        </div>
                        <h3 className={`mb-2 text-base font-black ${unidade.corTexto}`}>
                          {unidade.titulo}
                        </h3>
                        <p className="mb-5 text-xs leading-6 text-[#64748B]">
                          {unidade.descricao}
                        </p>
                        <div className="mt-auto">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${unidade.cor} px-3 py-1 text-xs font-bold text-white`}
                          >
                            Ir para aula →
                          </span>
                        </div>
                      </div>
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