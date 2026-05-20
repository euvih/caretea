"use client";

import Link from "next/link";
import { useState } from "react";

const unidades = [
  { titulo: "Entendendo o TEA", modulo: "Fundamentos", concluida: true, cor: "from-[#3BA7FF] to-[#2563EB]", emoji: "🧠" },
  { titulo: "Comunicação", modulo: "Fundamentos", concluida: true, cor: "from-[#A855F7] to-[#7E22CE]", emoji: "💬" },
  { titulo: "Alimentação", modulo: "Desafios do dia a dia", concluida: false, cor: "from-[#FFD93D] to-[#F59E0B]", emoji: "🍽️" },
  { titulo: "Rotina e organização", modulo: "Desafios do dia a dia", concluida: false, cor: "from-[#38BDF8] to-[#0EA5E9]", emoji: "📅" },
  { titulo: "Socialização", modulo: "Desafios do dia a dia", concluida: false, cor: "from-[#34D399] to-[#059669]", emoji: "👥" },
  { titulo: "Crises e desregulação", modulo: "Situações críticas", concluida: false, cor: "from-[#FF4D6D] to-[#DC2626]", emoji: "⚡" },
  { titulo: "Regulação emocional", modulo: "Situações críticas", concluida: false, cor: "from-[#F472B6] to-[#DB2777]", emoji: "🧩" },
  { titulo: "Segurança", modulo: "Situações críticas", concluida: false, cor: "from-[#FB923C] to-[#EA580C]", emoji: "🛡️" },
  { titulo: "Autonomia", modulo: "Desenvolvimento e autonomia", concluida: false, cor: "from-[#4ADE80] to-[#16A34A]", emoji: "🌱" },
  { titulo: "Cuidando do cuidador", modulo: "Saúde do cuidador", concluida: false, cor: "from-[#FDA4AF] to-[#E11D48]", emoji: "❤️" },
];

export default function Perfil() {
  const [nome, setNome] = useState("Vitória Kelly");
  const [email, setEmail] = useState("vitoria@email.com");
  const [sobre, setSobre] = useState("Cuidadora há 3 anos. Mãe de uma criança com TEA nível 2.");
  const [editando, setEditando] = useState(false);
  const [nomeTemp, setNomeTemp] = useState(nome);
  const [emailTemp, setEmailTemp] = useState(email);
  const [sobreTemp, setSobreTemp] = useState(sobre);

  const concluidas = unidades.filter((u) => u.concluida).length;
  const progresso = Math.round((concluidas / unidades.length) * 100);

  const salvar = () => {
    setNome(nomeTemp);
    setEmail(emailTemp);
    setSobre(sobreTemp);
    setEditando(false);
  };

  const cancelar = () => {
    setNomeTemp(nome);
    setEmailTemp(email);
    setSobreTemp(sobre);
    setEditando(false);
  };

  return (
    <main className="min-h-screen bg-[#d7ddf0] px-4 py-10 text-[#1E293B] md:px-8">
      <div className="mx-auto max-w-3xl">

        {/* VOLTAR */}
        <Link
          href="/capacitacao"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#64748B] transition hover:text-[#3BA7FF]"
        >
          ← Voltar
        </Link>

        {/* HEADER DO PERFIL */}
        <div className="mb-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#3BA7FF] via-[#A855F7] to-[#FF4D6D] p-[1px] shadow-[0_20px_50px_rgba(59,167,255,0.2)]">
          <div className="rounded-[2.5rem] bg-white p-8">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">

              {/* AVATAR */}
              <div className="relative shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#3BA7FF] to-[#A855F7] text-4xl font-black text-white shadow-lg">
                  {nome.charAt(0)}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-sm border border-[#e2e8f0] transition hover:bg-[#f1f5f9]"
                >
                  ✏️
                </button>
              </div>

              {/* DADOS */}
              <div className="flex-1 text-center sm:text-left">
                {!editando ? (
                  <>
                    <h1 className="text-2xl font-black text-[#1E293B]">{nome}</h1>
                    <p className="mt-1 text-sm text-[#64748B]">{email}</p>
                    <p className="mt-3 text-sm leading-6 text-[#475569]">{sobre}</p>
                    <button
                      type="button"
                      onClick={() => setEditando(true)}
                      className="mt-4 rounded-full border-2 border-[#e2e8f0] px-5 py-2 text-xs font-bold text-[#64748B] transition hover:border-[#3BA7FF] hover:text-[#3BA7FF]"
                    >
                      Editar perfil
                    </button>
                  </>
                ) : (
                  <div className="space-y-3 w-full">
                    <input
                      value={nomeTemp}
                      onChange={(e) => setNomeTemp(e.target.value)}
                      className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm font-bold text-[#1E293B] outline-none focus:border-[#3BA7FF]"
                      placeholder="Seu nome"
                    />
                    <input
                      value={emailTemp}
                      onChange={(e) => setEmailTemp(e.target.value)}
                      className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#475569] outline-none focus:border-[#3BA7FF]"
                      placeholder="Seu e-mail"
                    />
                    <textarea
                      value={sobreTemp}
                      onChange={(e) => setSobreTemp(e.target.value)}
                      rows={2}
                      className="w-full rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-4 py-2 text-sm text-[#475569] outline-none focus:border-[#3BA7FF] resize-none"
                      placeholder="Sobre você"
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={salvar}
                        className="rounded-full bg-gradient-to-r from-[#3BA7FF] to-[#2563EB] px-5 py-2 text-xs font-bold text-white transition hover:opacity-90"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelar}
                        className="rounded-full border-2 border-[#e2e8f0] px-5 py-2 text-xs font-bold text-[#64748B] transition hover:border-[#DC2626] hover:text-[#DC2626]"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESSO GERAL */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-black text-[#1E293B]">📊 Seu progresso</h2>

          <div className="mb-6 flex items-center gap-6">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke="url(#grad)" strokeWidth="3"
                  strokeDasharray={`${progresso} ${100 - progresso}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3BA7FF" />
                    <stop offset="100%" stopColor="#A855F7" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-black text-[#1E293B]">{progresso}%</span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#1E293B]">{concluidas}/{unidades.length}</p>
              <p className="text-sm text-[#64748B]">unidades concluídas</p>
              <p className="mt-2 text-xs text-[#94A3B8]">
                {unidades.length - concluidas} unidades restantes
              </p>
            </div>
          </div>

          {/* LISTA DE UNIDADES */}
          <div className="space-y-2">
            {unidades.map((unidade, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl bg-[#f8fafc] px-4 py-3"
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${unidade.cor} text-base`}
                >
                  {unidade.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-[#1E293B]">{unidade.titulo}</p>
                  <p className="text-xs text-[#94A3B8]">{unidade.modulo}</p>
                </div>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                    unidade.concluida
                      ? "bg-[#16A34A] text-white"
                      : "border-2 border-[#e2e8f0] text-[#cbd5e1]"
                  }`}
                >
                  {unidade.concluida ? (
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    "·"
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONFIGURAÇÕES */}
        <section className="mb-8 rounded-[2rem] bg-white/70 backdrop-blur-md p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-black text-[#1E293B]">⚙️ Configurações</h2>
          <div className="space-y-3">
            {[
              { emoji: "🔔", titulo: "Notificações", descricao: "Lembretes de estudo" },
              { emoji: "🌙", titulo: "Tema escuro", descricao: "Aparência do app" },
              { emoji: "🔒", titulo: "Privacidade", descricao: "Dados e permissões" },
              { emoji: "❓", titulo: "Ajuda e suporte", descricao: "Dúvidas e contato" },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                className="flex w-full items-center gap-4 rounded-2xl bg-[#f8fafc] px-5 py-4 transition hover:bg-[#f1f5f9] active:bg-[#e2e8f0]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                  {item.emoji}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-[#1E293B]">{item.titulo}</p>
                  <p className="text-xs text-[#94A3B8]">{item.descricao}</p>
                </div>
                <span className="text-[#cbd5e1]">›</span>
              </button>
            ))}
          </div>
        </section>

        {/* SAIR */}
        <button
          type="button"
          className="w-full rounded-[2rem] border-2 border-[#fecdd3] bg-white/70 px-8 py-5 text-sm font-bold text-[#DC2626] backdrop-blur-md transition hover:bg-[#fef2f2]"
        >
          Sair da conta
        </button>

      </div>
    </main>
  );
}