"use client";

import { useState } from "react";
import Link from "next/link";

// ── TIPOS ────────────────────────────────────────────────────────────────────
type Secao = "visao-geral" | "modulo" | "aula";

type Aula = {
  id: string;
  titulo: string;
  duracao: string;
  tipo: "video" | "leitura" | "pratica" | "quiz";
  concluida: boolean;
  conteudo: {
    intro: string;
    topicos: { titulo: string; texto: string }[];
    exercicio?: { titulo: string; descricao: string; passos: string[] };
    reflexao?: string;
  };
};

type Modulo = {
  id: string;
  titulo: string;
  descricao: string;
  emoji: string;
  cor: string;
  corClara: string;
  aulas: Aula[];
};

// ── DADOS ────────────────────────────────────────────────────────────────────
const modulos: Modulo[] = [
  {
    id: "burnout",
    titulo: "Reconhecendo o esgotamento",
    descricao: "Identifique os sinais de burnout antes que ele chegue ao limite.",
    emoji: "🔋",
    cor: "#FF4D6D",
    corClara: "#FFF0F3",
    aulas: [
      {
        id: "b1",
        titulo: "O que é burnout do cuidador?",
        duracao: "8 min",
        tipo: "leitura",
        concluida: true,
        conteudo: {
          intro: "O burnout do cuidador é um estado de exaustão física, emocional e mental causado pelo estresse prolongado de cuidar de outra pessoa. Não é fraqueza — é uma resposta humana a uma demanda que excede os recursos disponíveis.",
          topicos: [
            { titulo: "Por que cuidadores são mais vulneráveis", texto: "Cuidadores de pessoas com TEA frequentemente colocam as necessidades do outro acima das próprias por longos períodos. Sem pausas regulares, o sistema nervoso entra em estado crônico de alerta — o que esgota as reservas emocionais e físicas gradualmente." },
            { titulo: "A diferença entre cansaço e burnout", texto: "O cansaço passa com descanso. O burnout não. Se você dormiu e ainda acorda exausto, se perdeu o prazer em coisas que antes gostava, se sente que não importa o quanto faz nunca é suficiente — esses são sinais de burnout, não de preguiça." },
            { titulo: "O ciclo do cuidador invisível", texto: "Muitos cuidadores relatam sentir culpa ao cuidar de si mesmos. Esse ciclo — cuidar do outro, negligenciar a si, sentir culpa ao tentar descansar — é um dos padrões mais comuns e mais prejudiciais para a saúde a longo prazo." },
          ],
          reflexao: "Pense na última vez que você fez algo apenas por você — sem culpa. Quando foi? O que sentiu? Anote no seu caderno ou na seção de notas do app.",
        },
      },
      {
        id: "b2",
        titulo: "Sinais físicos e emocionais de alerta",
        duracao: "10 min",
        tipo: "pratica",
        concluida: true,
        conteudo: {
          intro: "O corpo avisa antes da mente aceitar. Aprender a reconhecer esses sinais é o primeiro passo para intervir a tempo.",
          topicos: [
            { titulo: "Sinais físicos", texto: "Dores de cabeça frequentes, tensão muscular (especialmente pescoço e ombros), distúrbios do sono, quedas de imunidade, alterações no apetite, fadiga que não passa com descanso." },
            { titulo: "Sinais emocionais", texto: "Irritabilidade crescente, sensação de vazio, choro fácil ou incapacidade de chorar, sentimento de inutilidade, ansiedade constante, dificuldade de concentração, afastamento de pessoas próximas." },
            { titulo: "Sinais comportamentais", texto: "Isolamento social, abandono de hobbies, negligência com alimentação e exercício, aumento no consumo de álcool, café ou medicamentos, procrastinação intensa." },
          ],
          exercicio: {
            titulo: "Mapa corporal do estresse",
            descricao: "Faça uma varredura do seu corpo agora. Leva 3 minutos.",
            passos: [
              "Sente-se confortavelmente e feche os olhos",
              "Comece pelos pés — há tensão? Dor? Formigamento?",
              "Suba pelos joelhos, quadris, abdômen",
              "Observe o peito — está apertado? A respiração está curta?",
              "Chegue ao pescoço e ombros — onde está a tensão?",
              "Anote as 3 regiões com mais desconforto",
            ],
          },
        },
      },
      {
        id: "b3",
        titulo: "Teste: qual é meu nível de esgotamento?",
        duracao: "5 min",
        tipo: "quiz",
        concluida: false,
        conteudo: {
          intro: "Responda às perguntas com honestidade. Não existe resposta certa ou errada — existe apenas a sua realidade agora.",
          topicos: [
            { titulo: "Como interpretar seu resultado", texto: "O questionário avalia 4 dimensões: exaustão física, exaustão emocional, despersonalização e realização pessoal. O objetivo não é te assustar, mas te dar clareza para agir." },
            { titulo: "O que fazer com o resultado", texto: "Se o resultado indicar esgotamento moderado ou severo, recomendamos buscar apoio profissional. O CareTEA pode te ajudar a encontrar recursos na sua região." },
          ],
          reflexao: "Resultados de questionários são pontos de partida, não diagnósticos. Use como ferramenta de autoconhecimento.",
        },
      },
    ],
  },
  {
    id: "autocuidado",
    titulo: "Autocuidado na prática",
    descricao: "Estratégias reais para quem tem pouco tempo e muita responsabilidade.",
    emoji: "🌱",
    cor: "#10B981",
    corClara: "#ECFDF5",
    aulas: [
      {
        id: "a1",
        titulo: "Micro-pausas: descanso em 3 minutos",
        duracao: "6 min",
        tipo: "pratica",
        concluida: false,
        conteudo: {
          intro: "Você não precisa de um dia de spa para se recuperar. Micro-pausas de 3 a 5 minutos, praticadas consistentemente, têm impacto comprovado na redução do cortisol e na restauração da capacidade cognitiva.",
          topicos: [
            { titulo: "Por que 3 minutos funcionam", texto: "O sistema nervoso autônomo pode começar a se recuperar do estado de alerta em menos de 3 minutos com as técnicas certas. Não é sobre duração — é sobre qualidade da pausa." },
            { titulo: "Tipos de micro-pausa", texto: "Pausa sensorial (foco em 5 sentidos), pausa de movimento (alongamento simples), pausa de respiração (técnica 4-7-8), pausa de gratidão (3 coisas simples). Qualquer uma serve — o que importa é sair do modo automático por alguns minutos." },
          ],
          exercicio: {
            titulo: "Micro-pausa agora",
            descricao: "Faça isso antes de continuar. Leva exatamente 3 minutos.",
            passos: [
              "Pare o que está fazendo e coloque os pés no chão",
              "Inspire lentamente pelo nariz contando até 4",
              "Segure o ar por 4 segundos",
              "Expire pela boca contando até 8",
              "Repita 4 vezes",
              "Abra os olhos devagar e observe 3 cores no ambiente",
            ],
          },
        },
      },
      {
        id: "a2",
        titulo: "Sono e recuperação para cuidadores",
        duracao: "12 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "O sono interrompido é uma das queixas mais comuns entre cuidadores de pessoas com TEA. Mesmo sem poder controlar quando será acordado, existem estratégias para melhorar a qualidade do sono que você consegue ter.",
          topicos: [
            { titulo: "A dívida de sono e seus efeitos", texto: "Privação crônica de sono compromete o julgamento emocional, aumenta a reatividade a situações estressantes, reduz a empatia e a paciência — exatamente as habilidades mais exigidas de um cuidador." },
            { titulo: "Higiene do sono para cuidadores", texto: "Mesmo que não consiga 8 horas seguidas: mantenha horários consistentes, exponha-se à luz natural pela manhã, evite telas por 30 minutos antes de dormir, crie um ritual simples de 5 minutos antes de deitar." },
            { titulo: "O poder dos cochilos estratégicos", texto: "Cochilos de 10 a 20 minutos (não mais que isso) entre 13h e 15h restauram funções cognitivas sem prejudicar o sono noturno. São chamados de 'naps de energia' e são amplamente usados em contextos de cuidado intensivo." },
          ],
          reflexao: "Anote sua rotina de sono da última semana. Quais são os maiores obstáculos? O que você conseguiria mudar amanhã mesmo, mesmo que minimamente?",
        },
      },
      {
        id: "a3",
        titulo: "Alimentação e energia no dia a dia",
        duracao: "8 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "Cuidadores frequentemente pulam refeições, comem no automático ou em pé. A nutrição afeta diretamente a regulação emocional, a tolerância ao estresse e a energia disponível para cuidar.",
          topicos: [
            { titulo: "Os 3 erros mais comuns", texto: "1) Pular o café da manhã — o cortisol está no pico pela manhã e sem combustível a irritabilidade aumenta. 2) Excesso de cafeína — mascara o cansaço sem resolver a causa. 3) Refeições ultra-processadas como padrão — inflamam o sistema nervoso e pioram o humor." },
            { titulo: "Alimentação de emergência funcional", texto: "Para dias caóticos: ovos (10 min, proteína completa), banana com pasta de amendoim, iogurte natural, castanhas. Não é sobre perfeição — é sobre não deixar o tanque vazio." },
            { titulo: "Hidratação e clareza mental", texto: "Desidratação leve (menos de 2% do peso) já compromete memória, foco e humor. Um copo de água ao acordar, antes de cada refeição e à tarde é suficiente para a maioria das pessoas." },
          ],
        },
      },
    ],
  },
  {
    id: "emocional",
    titulo: "Regulação emocional",
    descricao: "Ferramentas para lidar com culpa, raiva, tristeza e sobrecarga.",
    emoji: "🧘",
    cor: "#A855F7",
    corClara: "#F5F0FF",
    aulas: [
      {
        id: "e1",
        titulo: "Culpa: o peso que cuidadores carregam",
        duracao: "10 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "A culpa é uma das emoções mais universais entre cuidadores. Culpa por se cansar. Por ter raiva. Por querer um tempo só para si. Por não ser suficiente. Entender de onde vem esse sentimento é o primeiro passo para não deixá-lo te consumir.",
          topicos: [
            { titulo: "De onde vem a culpa do cuidador", texto: "A culpa surge do conflito entre o que sentimos e o que achamos que deveríamos sentir. Cuidadores frequentemente internalizam a ideia de que precisam ser pacientes, amorosos e resilientes 24 horas por dia — o que é humanamente impossível." },
            { titulo: "Culpa adaptativa vs. culpa tóxica", texto: "A culpa adaptativa é um sinal útil — indica que algo precisa mudar. A culpa tóxica é crônica, não resolve nada e corrói a saúde mental. Aprender a distinguir as duas é uma habilidade que pode ser desenvolvida." },
            { titulo: "O que fazer quando a culpa aparecer", texto: "Reconheça sem julgar ('Estou sentindo culpa agora'). Pergunte: essa culpa é baseada em algo real ou em uma expectativa impossível? Se for real, o que posso mudar? Se for impossível, pratique a autocompaixão ativa." },
          ],
          exercicio: {
            titulo: "Carta para si mesmo",
            descricao: "Escreva como se estivesse consolando um amigo próximo que está passando pelo que você passa.",
            passos: [
              "Pegue papel e caneta (ou abra uma nota no celular)",
              "Comece com: 'Querido(a) [seu nome],'",
              "Descreva o que seu amigo está enfrentando com compaixão",
              "Diga o que você diria a ele — sem julgamento",
              "Termine com uma frase de encorajamento real",
              "Releia em voz alta se possível",
            ],
          },
        },
      },
      {
        id: "e2",
        titulo: "Como lidar com a raiva sem destruir conexões",
        duracao: "9 min",
        tipo: "pratica",
        concluida: false,
        conteudo: {
          intro: "Raiva é uma emoção válida. Cuidadores têm razão em senti-la. O problema não é a raiva em si — é o que fazemos com ela quando estamos no limite. Esta aula ensina a processar a raiva antes que ela exploda.",
          topicos: [
            { titulo: "A fisiologia da raiva", texto: "Quando a raiva surge, o sistema nervoso simpático entra em modo de luta. O coração acelera, a adrenalina sobe, o córtex pré-frontal (responsável pelo raciocínio) fica temporariamente comprometido. Você literalmente não pensa direito com raiva intensa." },
            { titulo: "A janela de 90 segundos", texto: "A resposta fisiológica à raiva dura cerca de 90 segundos. Se você conseguir não agir nesses 90 segundos, a intensidade começa a cair. A técnica é simples: pause, respire, espere." },
            { titulo: "Válvulas de escape saudáveis", texto: "Exercício físico intenso (mesmo 10 minutos), escrita expressiva (escreva tudo sem filtro e não envie), choro (libera cortisol), conversa com alguém de confiança, vocalização (gritar em travesseiro, cantar alto no carro)." },
          ],
          exercicio: {
            titulo: "Protocolo dos 90 segundos",
            descricao: "Para usar no momento da raiva intensa.",
            passos: [
              "Reconheça: 'Estou com raiva. É normal.'",
              "Afaste-se fisicamente da situação se possível",
              "Coloque uma mão no peito e respire fundo 3 vezes",
              "Conte até 90 em silêncio (1 minuto e meio)",
              "Pergunte: o que eu realmente preciso agora?",
              "Só então decida como responder à situação",
            ],
          },
        },
      },
      {
        id: "e3",
        titulo: "Autocompaixão: a base de tudo",
        duracao: "11 min",
        tipo: "pratica",
        concluida: false,
        conteudo: {
          intro: "Autocompaixão não é autocomiseração nem fraqueza. É a capacidade de se tratar com a mesma gentileza que você trataria um bom amigo. Pesquisas mostram que pessoas com maior autocompaixão são mais resilientes, não menos.",
          topicos: [
            { titulo: "Os 3 componentes da autocompaixão", texto: "1) Mindfulness — reconhecer o sofrimento sem exagerar nem minimizar. 2) Humanidade compartilhada — lembrar que sofrer faz parte da experiência humana, você não está sozinho. 3) Gentileza consigo — responder ao sofrimento com cuidado, não com crítica." },
            { titulo: "Por que cuidadores resistem à autocompaixão", texto: "Cuidadores frequentemente confundem autocompaixão com egoísmo. Na verdade, é o oposto: quem cuida de si tem mais recursos para cuidar do outro. É como a orientação dos aviões — coloque a máscara antes de ajudar." },
          ],
          exercicio: {
            titulo: "Pausa de autocompaixão (3 min)",
            descricao: "Para momentos de sofrimento intenso.",
            passos: [
              "Coloque as mãos sobre o coração",
              "Diga mentalmente: 'Este é um momento de sofrimento'",
              "Continue: 'Sofrimento faz parte da vida. Não estou sozinho(a).'",
              "Por fim: 'Que eu possa me tratar com gentileza agora'",
              "Respire fundo 3 vezes",
              "Pergunte: do que eu preciso neste momento?",
            ],
          },
        },
      },
    ],
  },
  {
    id: "rede",
    titulo: "Construindo sua rede de apoio",
    descricao: "Como pedir ajuda, delegar e não carregar tudo sozinho.",
    emoji: "👥",
    cor: "#3BA7FF",
    corClara: "#EEF6FF",
    aulas: [
      {
        id: "r1",
        titulo: "Por que cuidadores não pedem ajuda",
        duracao: "7 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "Pedir ajuda é uma das coisas mais difíceis para cuidadores. Não por orgulho — mas por uma série de crenças e medos que, ao serem nomeados, perdem parte do seu poder.",
          topicos: [
            { titulo: "As barreiras mais comuns", texto: "'Ninguém vai fazer do jeito certo.' 'Não quero ser um peso.' 'Vou pedir e a pessoa vai recusar.' 'Se eu precisar de ajuda é porque sou fraco(a).' Reconhece alguma dessas? Todas são compreensíveis. Nenhuma é verdade absoluta." },
            { titulo: "O custo de não pedir", texto: "Cuidadores que não pedem ajuda chegam mais rapidamente ao burnout, têm relacionamentos mais desgastados e, paradoxalmente, acabam sendo menos capazes de cuidar bem da pessoa com TEA. Pedir ajuda não é abandono — é sustentabilidade." },
            { titulo: "O que as pessoas ao redor precisam", texto: "Na maioria dos casos, as pessoas próximas querem ajudar mas não sabem como. Elas esperam que você diga o que precisa. A barreira está frequentemente mais de um lado do que do outro." },
          ],
          reflexao: "Liste 3 pessoas na sua vida que poderiam ajudar de alguma forma. Para cada uma, pense em UMA coisa específica que você poderia pedir. Específico é mais fácil de receber e de dar.",
        },
      },
      {
        id: "r2",
        titulo: "Como estruturar sua rede em 5 círculos",
        duracao: "9 min",
        tipo: "pratica",
        concluida: false,
        conteudo: {
          intro: "Uma rede de apoio sólida não depende de uma única pessoa ou de muitas. Depende de pessoas certas nos papéis certos. O modelo dos 5 círculos ajuda a visualizar e construir isso de forma consciente.",
          topicos: [
            { titulo: "Os 5 círculos", texto: "1) Apoio imediato (quem liga quando entra em crise). 2) Apoio prático (quem pode ficar com seu filho em emergências). 3) Apoio emocional (quem escuta sem julgamento). 4) Apoio profissional (terapeuta, médico, assistente social). 5) Comunidade (grupos de cuidadores, online ou presencial)." },
            { titulo: "Identificando lacunas", texto: "Muitos cuidadores têm pessoas no círculo 3 mas ninguém no círculo 2, ou têm apoio prático mas não emocional. Mapear as lacunas ajuda a saber onde investir energia." },
          ],
          exercicio: {
            titulo: "Mapeie sua rede agora",
            descricao: "Faça no papel ou na seção de contatos do CareTEA.",
            passos: [
              "Desenhe 5 círculos concêntricos",
              "No centro: você",
              "Preencha cada círculo com nomes reais",
              "Círculos vazios = lacunas a preencher",
              "Escolha 1 lacuna prioritária",
              "Defina UMA ação para começar a preenchê-la esta semana",
            ],
          },
        },
      },
    ],
  },
  {
    id: "limites",
    titulo: "Limites saudáveis e sustentabilidade",
    descricao: "Como cuidar por anos sem se perder no processo.",
    emoji: "🛡️",
    cor: "#F59E0B",
    corClara: "#FFFBEB",
    aulas: [
      {
        id: "l1",
        titulo: "O que são limites e por que importam",
        duracao: "8 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "Limites não são paredes que separam você dos outros — são os contornos que definem onde você começa e onde o outro termina. Para cuidadores, estabelecer limites não é egoísmo: é a condição para cuidar por anos, não por meses.",
          topicos: [
            { titulo: "Limites físicos vs. emocionais", texto: "Físicos: quantidade de horas, tarefas que você pode e não pode fazer, necessidades de sono e alimentação. Emocionais: o que você permite que entre no seu espaço interno — críticas, exigências, expectativas alheias." },
            { titulo: "O sinal de que um limite foi violado", texto: "Ressentimento. É a emoção que surge quando damos mais do que temos, ficamos calados quando deveríamos falar, ou toleramos o que não deveríamos. O ressentimento é um dado importante — não um julgamento moral." },
            { titulo: "Limites no contexto do TEA", texto: "Cuidar de uma pessoa com TEA envolve demandas imprevisíveis. Isso torna os limites ainda mais importantes — e mais difíceis de manter. Flexibilidade não significa ausência de limites: significa limites que se adaptam sem desaparecer." },
          ],
          reflexao: "Em quais áreas da sua vida você sente mais ressentimento? Que limite não estabelecido pode estar por trás disso?",
        },
      },
      {
        id: "l2",
        titulo: "Sustentabilidade: cuidar por anos, não por meses",
        duracao: "10 min",
        tipo: "leitura",
        concluida: false,
        conteudo: {
          intro: "Cuidar de uma pessoa com TEA é uma maratona, não uma corrida de 100 metros. Estratégias de sprint — intensidade máxima sem pausas — levam ao colapso. A sustentabilidade exige um ritmo diferente.",
          topicos: [
            { titulo: "A mentalidade da maratona", texto: "Maratonistas treinam com intensidades variadas, têm dias de recuperação, monitoram seus sinais físicos e ajustam o ritmo. Cuidadores sustentáveis fazem o mesmo: alternam períodos de alta demanda com recuperação intencional." },
            { titulo: "Planejamento de longo prazo", texto: "Pense em: quem cuida de mim quando eu adoecer? O que acontece com minha saúde mental em 5 anos se eu continuar nesse ritmo? Que sistemas de apoio preciso construir agora para garantir que ainda estarei bem em 10 anos?" },
            { titulo: "Identidade além do cuidado", texto: "Cuidadores que mantêm partes de sua identidade além do papel de cuidador têm melhor saúde mental. Hobbies, amizades, projetos pessoais — não são luxos. São parte da estrutura que sustenta o cuidado." },
          ],
          exercicio: {
            titulo: "Meu projeto de sustentabilidade",
            descricao: "Planejamento simples para os próximos 3 meses.",
            passos: [
              "Identifique 1 hábito de saúde para iniciar ou retomar",
              "Escolha 1 pessoa para fortalecer o vínculo este mês",
              "Reserve 1 atividade só sua (não negociável) por semana",
              "Agende 1 consulta de saúde preventiva",
              "Defina 1 meta de aprendizado (pode ser no CareTEA)",
              "Escreva: daqui 3 meses, quero me sentir ___",
            ],
          },
        },
      },
    ],
  },
];

// ── ÍCONES DE TIPO ───────────────────────────────────────────────────────────
const tipoInfo = {
  video:   { icon: "▶️", label: "Vídeo",    cor: "#3BA7FF" },
  leitura: { icon: "📖", label: "Leitura",  cor: "#A855F7" },
  pratica: { icon: "✍️", label: "Prática",  cor: "#10B981" },
  quiz:    { icon: "🧩", label: "Quiz",     cor: "#F59E0B" },
};

// ── COMPONENTE: AULA ─────────────────────────────────────────────────────────
function TelaAula({ aula, modulo, onVoltar }: { aula: Aula; modulo: Modulo; onVoltar: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [concluida, setConcluida] = useState(aula.concluida);

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>
      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(215,221,240,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.5)",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={onVoltar} style={{
          width: 40, height: 40, borderRadius: 14, background: "#fff",
          border: "none", fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", flexShrink: 0,
        }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: modulo.cor, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
            {modulo.emoji} {modulo.titulo}
          </p>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {aula.titulo}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.25rem 1.25rem 0" }}>

        {/* HERO DA AULA */}
        <div style={{
          background: modulo.cor, borderRadius: 24,
          padding: "1.75rem 1.5rem", marginBottom: "1.25rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -20, top: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
          <div style={{ position: "absolute", right: 30, bottom: -30, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, position: "relative" }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)",
              background: "rgba(255,255,255,0.2)", borderRadius: 999,
              padding: "4px 12px", textTransform: "uppercase", letterSpacing: "0.08em",
            }}>
              {tipoInfo[aula.tipo].icon} {tipoInfo[aula.tipo].label} • {aula.duracao}
            </span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.3, position: "relative" }}>
            {aula.titulo}
          </h1>
        </div>

        {/* INTRO */}
        <div style={{
          background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "1.5rem", marginBottom: "1rem",
          borderLeft: `4px solid ${modulo.cor}`,
        }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#334E8A", fontWeight: 500 }}>
            {aula.conteudo.intro}
          </p>
        </div>

        {/* TÓPICOS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: "1rem" }}>
          {aula.conteudo.topicos.map((t, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.8)", backdropFilter: "blur(8px)",
              borderRadius: 20, padding: "1.25rem",
              border: "0.5px solid rgba(255,255,255,0.6)",
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: modulo.corClara,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, color: modulo.cor,
                }}>{i + 1}</div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>{t.titulo}</p>
                  <p style={{ fontSize: 13, lineHeight: 1.75, color: "#475569" }}>{t.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EXERCÍCIO */}
        {aula.conteudo.exercicio && (
          <div style={{
            background: modulo.corClara,
            border: `1.5px solid ${modulo.cor}30`,
            borderRadius: 20, padding: "1.25rem", marginBottom: "1rem",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>✍️</span>
              <p style={{ fontSize: 11, fontWeight: 700, color: modulo.cor, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Exercício prático
              </p>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1E293B", marginBottom: 6 }}>
              {aula.conteudo.exercicio.titulo}
            </h3>
            <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, marginBottom: 14 }}>
              {aula.conteudo.exercicio.descricao}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {aula.conteudo.exercicio.passos.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                    background: modulo.cor,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 800, color: "#fff",
                  }}>{i + 1}</div>
                  <p style={{ fontSize: 13, color: "#334E8A", lineHeight: 1.6, paddingTop: 2 }}>{p}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REFLEXÃO */}
        {aula.conteudo.reflexao && (
          <div style={{
            background: "rgba(255,255,255,0.7)", borderRadius: 20,
            padding: "1.25rem", marginBottom: "1rem",
            border: "0.5px solid rgba(255,255,255,0.6)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>💭</span>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#A855F7", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Para refletir
              </p>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: "#475569", fontStyle: "italic" }}>
              {aula.conteudo.reflexao}
            </p>
          </div>
        )}

        {/* BOTÃO CONCLUIR */}
        <button
          onClick={() => setConcluida(true)}
          style={{
            width: "100%",
            background: concluida ? "#F1F5F9" : modulo.cor,
            border: "none", borderRadius: 18, padding: "16px",
            fontSize: 15, fontWeight: 800,
            color: concluida ? "#94A3B8" : "#fff",
            cursor: concluida ? "default" : "pointer",
            fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transition: "all 0.3s",
          }}
        >
          {concluida ? "✓ Aula concluída" : "Marcar como concluída"}
        </button>
      </div>
    </main>
  );
}

// ── COMPONENTE: MÓDULO ───────────────────────────────────────────────────────
function TelaModulo({ modulo, onVoltar, onAbrirAula }: {
  modulo: Modulo;
  onVoltar: () => void;
  onAbrirAula: (aula: Aula) => void;
}) {
  const concluidas = modulo.aulas.filter((a) => a.concluida).length;
  const pct = Math.round((concluidas / modulo.aulas.length) * 100);

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>
      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(215,221,240,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.5)",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <button onClick={onVoltar} style={{
          width: 40, height: 40, borderRadius: 14, background: "#fff",
          border: "none", fontSize: 16, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>←</button>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#1E293B" }}>Saúde do Cuidador</span>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.25rem 1.25rem 0" }}>

        {/* HERO MÓDULO */}
        <div style={{
          background: modulo.cor, borderRadius: 24,
          padding: "2rem 1.5rem 1.5rem", marginBottom: "1.25rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.12)" }} />
          <p style={{ fontSize: 44, marginBottom: 10, position: "relative" }}>{modulo.emoji}</p>
          <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 8, position: "relative" }}>
            {modulo.titulo}
          </h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 16, position: "relative" }}>
            {modulo.descricao}
          </p>

          {/* progresso */}
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{concluidas}/{modulo.aulas.length} aulas</span>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontWeight: 700 }}>{pct}%</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.25)", borderRadius: 999, height: 6, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#fff", borderRadius: 999, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>

        {/* AULAS */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 10 }}>
          Aulas do módulo
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {modulo.aulas.map((aula, i) => {
            const tipo = tipoInfo[aula.tipo];
            const bloqueada = i > 0 && !modulo.aulas[i - 1].concluida && !aula.concluida;
            return (
              <button
                key={aula.id}
                onClick={() => !bloqueada && onAbrirAula(aula)}
                style={{
                  background: aula.concluida ? modulo.corClara : "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(8px)",
                  border: aula.concluida ? `1.5px solid ${modulo.cor}30` : "0.5px solid rgba(255,255,255,0.6)",
                  borderRadius: 18, padding: "1rem 1.25rem",
                  cursor: bloqueada ? "default" : "pointer",
                  fontFamily: "inherit", textAlign: "left",
                  opacity: bloqueada ? 0.5 : 1,
                  display: "flex", alignItems: "center", gap: 14,
                  transition: "all 0.2s",
                }}
              >
                {/* ícone tipo */}
                <div style={{
                  width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                  background: aula.concluida ? modulo.cor : "#F1F5F9",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18,
                }}>
                  {aula.concluida ? "✓" : bloqueada ? "🔒" : tipo.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: tipo.cor,
                      background: tipo.cor + "15", borderRadius: 999, padding: "2px 8px",
                    }}>{tipo.label}</span>
                    <span style={{ fontSize: 11, color: "#94A3B8" }}>• {aula.duracao}</span>
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#1E293B", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {aula.titulo}
                  </p>
                </div>

                <span style={{ color: "#CBD5E1", fontSize: 18, flexShrink: 0 }}>›</span>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}

// ── VISÃO GERAL ──────────────────────────────────────────────────────────────
function VisaoGeral({ onAbrirModulo }: { onAbrirModulo: (m: Modulo) => void }) {
  const totalAulas = modulos.reduce((s, m) => s + m.aulas.length, 0);
  const totalConcluidas = modulos.reduce((s, m) => s + m.aulas.filter((a) => a.concluida).length, 0);
  const pct = Math.round((totalConcluidas / totalAulas) * 100);
  const circunferencia = 2 * Math.PI * 44;
  const offset = circunferencia - (pct / 100) * circunferencia;

  return (
    <main style={{
      minHeight: "100vh", background: "#d7ddf0",
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      color: "#1E293B", paddingBottom: "2rem",
    }}>

      {/* HEADER */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(215,221,240,0.92)", backdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.5)",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <Link href="/capacitacao" style={{
          width: 40, height: 40, borderRadius: 14, background: "#fff",
          textDecoration: "none", color: "#1E293B", fontSize: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", flexShrink: 0,
        }}>←</Link>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.1em" }}>Capacitação</p>
          <p style={{ fontSize: 15, fontWeight: 800, color: "#152641" }}>Saúde do Cuidador</p>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.25rem 1.25rem 0" }}>

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #A855F7 0%, #3BA7FF 100%)",
          borderRadius: 24, padding: "2rem 1.5rem", marginBottom: "1.25rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", right: -30, top: -30, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.10)" }} />
          <div style={{ position: "absolute", left: -20, bottom: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", position: "relative" }}>
            {/* donut */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <svg width={100} height={100} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={50} cy={50} r={44} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={8} />
                <circle cx={50} cy={50} r={44} fill="none" stroke="#fff" strokeWidth={8}
                  strokeDasharray={`${circunferencia}`} strokeDashoffset={offset} strokeLinecap="round" />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{pct}%</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 600, marginBottom: 4 }}>Sua jornada</p>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
                Saúde do<br />Cuidador
              </h1>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
                {totalConcluidas}/{totalAulas} aulas • {modulos.length} módulos
              </p>
            </div>
          </div>
        </div>

        {/* FRASE DE ABERTURA */}
        <div style={{
          background: "rgba(255,255,255,0.75)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "1.25rem", marginBottom: "1.25rem",
          borderLeft: "4px solid #A855F7",
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: "#334E8A", fontWeight: 500, fontStyle: "italic" }}>
            "Você não pode despejar de um copo vazio. Cuidar de si mesmo não é egoísmo — é o que torna o cuidado sustentável."
          </p>
          <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 8, fontWeight: 600 }}>
            Fundamento da capacitação CareTEA
          </p>
        </div>

        {/* MÓDULOS */}
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94A3B8", marginBottom: 12 }}>
          Módulos do curso
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {modulos.map((mod) => {
            const conc = mod.aulas.filter((a) => a.concluida).length;
            const p = Math.round((conc / mod.aulas.length) * 100);
            return (
              <button key={mod.id} onClick={() => onAbrirModulo(mod)} style={{
                background: "rgba(255,255,255,0.80)", backdropFilter: "blur(8px)",
                border: `0.5px solid rgba(255,255,255,0.6)`,
                borderTop: `4px solid ${mod.cor}`,
                borderRadius: 20, padding: "1.25rem",
                cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                    background: mod.corClara,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                  }}>{mod.emoji}</div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#1E293B", marginBottom: 4, lineHeight: 1.3 }}>
                      {mod.titulo}
                    </h3>
                    <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5, marginBottom: 12 }}>
                      {mod.descricao}
                    </p>

                    {/* barra progresso */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, background: "#EEF2FF", borderRadius: 999, height: 5, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${p}%`, background: mod.cor, borderRadius: 999, transition: "width 0.6s ease" }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: mod.cor, flexShrink: 0 }}>
                        {conc}/{mod.aulas.length}
                      </span>
                    </div>
                  </div>

                  <span style={{ color: "#CBD5E1", fontSize: 18, flexShrink: 0, marginTop: 2 }}>›</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* AVISO PROFISSIONAL */}
        <div style={{
          background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "1.25rem", marginTop: "1.25rem",
          border: "0.5px solid rgba(255,255,255,0.6)",
          display: "flex", alignItems: "flex-start", gap: 12,
        }}>
          <span style={{ fontSize: 20, flexShrink: 0 }}>💙</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1E293B", marginBottom: 4 }}>
              Este conteúdo não substitui apoio profissional
            </p>
            <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>
              Se você sente sinais de esgotamento severo, depressão ou ansiedade intensa, procure um psicólogo ou médico. O CareTEA apoia — mas não substitui — o cuidado profissional.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}

// ── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function SaudeDoCuidador() {
  const [secao, setSecao] = useState<Secao>("visao-geral");
  const [moduloAtivo, setModuloAtivo] = useState<Modulo | null>(null);
  const [aulaAtiva, setAulaAtiva] = useState<Aula | null>(null);

  if (secao === "aula" && aulaAtiva && moduloAtivo) {
    return (
      <TelaAula
        aula={aulaAtiva}
        modulo={moduloAtivo}
        onVoltar={() => { setSecao("modulo"); setAulaAtiva(null); }}
      />
    );
  }

  if (secao === "modulo" && moduloAtivo) {
    return (
      <TelaModulo
        modulo={moduloAtivo}
        onVoltar={() => { setSecao("visao-geral"); setModuloAtivo(null); }}
        onAbrirAula={(aula) => { setAulaAtiva(aula); setSecao("aula"); }}
      />
    );
  }

  return (
    <VisaoGeral
      onAbrirModulo={(m) => { setModuloAtivo(m); setSecao("modulo"); }}
    />
  );
}