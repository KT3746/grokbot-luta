/* LUTA - campanha de 10 círculos (Nara vs rivais originais). Visual 1.11.0 · Three.js arena. */
(() => {
  "use strict";

  function fx3d(nome, ...args) {
    const api = window.LUTA3D;
    if (!api || !api.ready || typeof api[nome] !== "function") return;
    try {
      api[nome](...args);
    } catch (_) {}
  }

  const VERSAO = "1.11.0";
  const CACHE_V = "202610070428";
  const CHAVE = "duelo-rapido";
  const TOTAL_CIRCULOS = 10;

  const TEXTO = {
    titulo: "LUTA",
    suaVez: "Sua vez",
    resolvendo: "Resolvendo…",
    vezInimigo: "Rival agindo…",
    rivalPreparaAtacar: "Rival prepara o golpe…",
    rivalPreparaDefender: "Rival levanta a guarda…",
    rivalPreparaMagia: "Rival canaliza magia…",
    suaVezDrama: "Sua vez: escolha!",
    turno: (n) => `Turno ${n}`,
    circulo: (n) => `Círculo ${n}/${TOTAL_CIRCULOS}`,
    voceAtacou: (dano, nome) => `Ataque: −${dano} em ${nome}.`,
    voceMagia: (dano, nome) => `Clarão: −${dano} em ${nome}.`,
    voceDefendeu: (n) => `Guarda. +${n} essência.`,
    inimigoAtacou: (nome, dano) => `${nome}: −${dano} em você.`,
    inimigoMagia: (nome, magia, dano) => `${nome} · ${magia}: −${dano} em você.`,
    inimigoDefendeu: (nome, n) => `${nome} defendeu. +${n} essência.`,
    acertoPreciso: "Acerto preciso!",
    escudoAbsorveu: "O escudo absorveu parte do golpe.",
    essenciaCurta: "Essência insuficiente para magia.",
    recuouEssencia: (n) => `+${n}`,
    vitoria: "Vitória",
    derrota: "Derrota",
    campanhaVencida: "Campanha encerrada",
    venceuEm: (nome, rival, turnos) => `${nome} derrotou ${rival} em ${turnos} turnos.`,
    venceuCampanha: (rival, turnos) => `Nara fechou os dez círculos. ${rival} caiu no turno ${turnos}. O círculo inteiro é dela.`,
    resumoCampanha: (s) => `Resumo: ${s.circulos} círculos · ${s.turnos} turnos · ${s.danoFeito} dano causado · ${s.danoTomado} dano sofrido.`,
    perdeuPara: (rival) => `${rival} venceu este círculo. Tente de novo ou recomece a campanha.`,
    fimSeloWin: "Círculo encerrado",
    fimSeloLose: "Você caiu",
    fimSeloCampanha: "Dez círculos",
    inicioRelato: (titulo, nota) => `${titulo} entra no círculo. ${nota} Escolha o primeiro golpe.`,
    suaVezCurta: "Sua vez: uma ação.",
    dicaMinuto: "Primeiro minuto: Atacar, Defender ou Magia. Some ao primeiro toque.",
    pausadoAba: "Pausado: volte a esta aba para continuar.",
    som: "Som",
    mudo: "Mudo",
    rival: "Rival",
    chefe: "Chefe",
    chefeFinal: "Chefe final",
    entradaChefe: "Chefe",
    entradaChefeFinal: "Chefe final",
    entradaChefeTexto: (titulo, nota) => `${titulo} toma o círculo. ${nota}`,
    descansoSelo: (n) => `Círculo ${n}/${TOTAL_CIRCULOS} concluído`,
    descansoTexto: "Nara recupera o fôlego. O próximo círculo já espera: escolha um reforço.",
    proximo: "Próximo círculo",
    proximoChefe: "Próximo chefe",
    proximoFinal: "Chefe final",
    continuar: (n) => `Continuar · Círculo ${n}/10`,
    metaHojeZero: "Hoje: ainda sem vitória de círculo",
    metaHoje: (n) => (n === 1 ? "Hoje: 1 círculo" : `Hoje: ${n} círculos`),
    metaSeq: (n) => `Sequência: ${n}`,
    metaMelhor: (n) => `Melhor sequência: ${n}`,
    seloCritico: "Acerto preciso!",
    seloMagia: "Clarão!",
    magiaFalta: (n) => `Faltam ${n} · Defenda`,
    magiaNega: (n, g) => `Faltam ${n} de essência para o Clarão. Defender recarrega +${g}.`,
    koTitulo: "K.O.!",
    koFinal: "K.O. final!",
    koDerrota: "Caiu…",
    koPerfeito: "Perfeito · sem dano",
    koResumo: (t, d) => `${t} ${t === 1 ? "turno" : "turnos"} · −${d} vida`,
    koDerrotaSub: (nome) => `${nome} venceu o círculo`,
    /* Onda 4 */
    contraPronto: "Guarda segurou! Contra-golpe pronto: o próximo Atacar bate +40%.",
    contraSelo: "Contra-golpe!",
    contraRelato: "Contra-golpe!",
    previaAtaque: (min, max, nome, restoMin, restoMax) =>
      `Atacar: ${min}–${max} de dano. ${nome} fica com ${restoMin}–${restoMax}.`,
    previaMagia: (min, max, nome, restoMin, restoMax, custo) =>
      `Clarão: ${min}–${max} de dano (${custo} essência). ${nome} fica com ${restoMin}–${restoMax}.`,
    previaMagiaCurta: (falta) => `Clarão: faltam ${falta} de essência. Defenda para recarregar.`,
    previaDefender: (ganho, pct) => `Defender: +${ganho} essência e o próximo golpe perde ${pct}%.`,
    previaKO: " Garante o K.O.!",
    previaSolte: " Solte fora do botão para cancelar.",
    leituraVazia: "Sem leitura ainda",
    pausaTitulo: "Pausa",
    pausaLuta: (c, nome) => `Círculo ${c}/10 contra ${nome}. O duelo espera por você.`,
    pausaDescanso: (c) => `Respiro antes do círculo ${c}/10. Seu reforço espera.`,
    /* Onda 5 */
    combo: (n) => `Combo ×${n}`,
    comboSelo: (n) => `Combo ×${n}!`,
    bannerSuaVez: "Sua vez",
    bannerVezRival: "Vez do rival",
    perigo: "Perigo",
    quaseSelo: "Quase!",
    quaseRelato: "Quase! O rival mal se segura.",
  };

  const BONUS_CONTRA = 1.4;

  const NARA = {
    id: "nara",
    nome: "Nara",
    vidaMax: 100,
    essenciaMax: 40,
    ataque: { min: 12, max: 16 },
    magia: { min: 24, max: 30, custo: 16, nome: "Clarão", perfuracao: 0.5, dreno: 0 },
    guardaReducao: 0.6,
    essenciaDefesa: 5,
    critico: 0.12,
  };

  const RIVAIS = {
    liro: {
      id: "liro",
      nome: "Liro",
      titulo: "Liro das Dunas",
      nota: "Batedor magro, golpes rápidos e fracos.",
      vidaMax: 72,
      essenciaMax: 24,
      ataque: { min: 8, max: 11 },
      magia: { min: 15, max: 19, custo: 12, nome: "Farpa", perfuracao: 0.25, dreno: 0 },
      guardaReducao: 0.45,
      essenciaDefesa: 4,
      critico: 0.08,
      estilo: "agressivo",
      tema: "areia",
      chefe: false,
    },
    dagro: {
      id: "dagro",
      nome: "Dagro",
      titulo: "Dagro das Forjas",
      nota: "Bruto das forjas. Encara de frente.",
      vidaMax: 95,
      essenciaMax: 32,
      ataque: { min: 11, max: 15 },
      magia: { min: 20, max: 26, custo: 14, nome: "Brasa", perfuracao: 0.35, dreno: 0 },
      guardaReducao: 0.55,
      essenciaDefesa: 4,
      critico: 0.1,
      estilo: "agressivo",
      tema: "forja",
      chefe: false,
    },
    velin: {
      id: "velin",
      nome: "Velin",
      titulo: "Velin da Sombra",
      nota: "Manto violeta. Drena essência com o Dreno.",
      vidaMax: 90,
      essenciaMax: 48,
      ataque: { min: 10, max: 14 },
      magia: { min: 21, max: 27, custo: 15, nome: "Dreno", perfuracao: 0.55, dreno: 5 },
      guardaReducao: 0.5,
      essenciaDefesa: 6,
      critico: 0.12,
      estilo: "astuto",
      tema: "sombra",
      chefe: false,
    },
    bruma: {
      id: "bruma",
      nome: "Bruma",
      titulo: "Bruma do Véu",
      nota: "Dança na névoa e se guarda o tempo todo.",
      vidaMax: 108,
      essenciaMax: 36,
      ataque: { min: 10, max: 13 },
      magia: { min: 18, max: 23, custo: 14, nome: "Névoa", perfuracao: 0.4, dreno: 0 },
      guardaReducao: 0.62,
      essenciaDefesa: 6,
      critico: 0.1,
      estilo: "defensivo",
      tema: "nevoa",
      chefe: false,
    },
    korr: {
      id: "korr",
      nome: "Korr",
      titulo: "Korr da Laje",
      nota: "Primeiro chefe. Pedra viva, muito durão.",
      vidaMax: 155,
      essenciaMax: 28,
      ataque: { min: 14, max: 18 },
      magia: { min: 22, max: 28, custo: 16, nome: "Laje", perfuracao: 0.3, dreno: 0 },
      guardaReducao: 0.58,
      essenciaDefesa: 5,
      critico: 0.08,
      estilo: "tanque",
      tema: "pedra",
      chefe: "chefe",
    },
    sile: {
      id: "sile",
      nome: "Sile",
      titulo: "Sile da Geada",
      nota: "Magia gelada. Pouca vida, Clarão rival pesado.",
      vidaMax: 92,
      essenciaMax: 54,
      ataque: { min: 9, max: 12 },
      magia: { min: 26, max: 33, custo: 14, nome: "Gélido", perfuracao: 0.6, dreno: 0 },
      guardaReducao: 0.42,
      essenciaDefesa: 7,
      critico: 0.11,
      estilo: "mago",
      tema: "geada",
      chefe: false,
    },
    ravo: {
      id: "ravo",
      nome: "Ravó",
      titulo: "Ravó Ígneo",
      nota: "Berserker. Quase não defende; só avança.",
      vidaMax: 118,
      essenciaMax: 30,
      ataque: { min: 16, max: 21 },
      magia: { min: 20, max: 25, custo: 16, nome: "Ímpeto", perfuracao: 0.25, dreno: 0 },
      guardaReducao: 0.4,
      essenciaDefesa: 3,
      critico: 0.16,
      estilo: "berserker",
      tema: "fogo",
      chefe: false,
    },
    neme: {
      id: "neme",
      nome: "Neme",
      titulo: "Neme da Fresta",
      nota: "Assassina da fresta. Perfura guarda e acerta preciso.",
      vidaMax: 100,
      essenciaMax: 40,
      ataque: { min: 13, max: 17 },
      magia: { min: 23, max: 29, custo: 15, nome: "Fresta", perfuracao: 0.7, dreno: 0 },
      guardaReducao: 0.48,
      essenciaDefesa: 5,
      critico: 0.2,
      estilo: "astuto",
      tema: "fresta",
      chefe: false,
    },
    orvane: {
      id: "orvane",
      nome: "Orvane",
      titulo: "Orvane do Pacto",
      nota: "Segundo chefe. Armadura, capa e magia pesada.",
      vidaMax: 170,
      essenciaMax: 44,
      ataque: { min: 15, max: 20 },
      magia: { min: 26, max: 32, custo: 16, nome: "Pacto", perfuracao: 0.45, dreno: 4 },
      guardaReducao: 0.6,
      essenciaDefesa: 6,
      critico: 0.12,
      estilo: "tanque",
      tema: "pacto",
      chefe: "chefe",
    },
    aurenegra: {
      id: "aurenegra",
      nome: "Aurenegra",
      titulo: "Aurenegra",
      nota: "Senhora do eclipse. O último círculo.",
      vidaMax: 210,
      essenciaMax: 56,
      ataque: { min: 17, max: 23 },
      magia: { min: 30, max: 38, custo: 16, nome: "Eclipse", perfuracao: 0.55, dreno: 6 },
      guardaReducao: 0.58,
      essenciaDefesa: 6,
      critico: 0.14,
      estilo: "chefe",
      tema: "eclipse",
      chefe: "final",
    },
  };

  const CAMPANHA = ["liro", "dagro", "velin", "bruma", "korr", "sile", "ravo", "neme", "orvane", "aurenegra"];

  const ARTES = {
    liro: `<img class="lutador__sprite" src="img/liro.webp?v=${CACHE_V}" alt="">`,
    dagro: `<img class="lutador__sprite" src="img/dagro.webp?v=${CACHE_V}" alt="">`,
    velin: `<img class="lutador__sprite" src="img/velin.webp?v=${CACHE_V}" alt="">`,
    bruma: `<img class="lutador__sprite" src="img/bruma.webp?v=${CACHE_V}" alt="">`,
    korr: `<img class="lutador__sprite" src="img/korr.webp?v=${CACHE_V}" alt="">`,
    sile: `<img class="lutador__sprite" src="img/sile.webp?v=${CACHE_V}" alt="">`,
    ravo: `<img class="lutador__sprite" src="img/ravo.webp?v=${CACHE_V}" alt="">`,
    neme: `<img class="lutador__sprite" src="img/neme.webp?v=${CACHE_V}" alt="">`,
    orvane: `<img class="lutador__sprite" src="img/orvane.webp?v=${CACHE_V}" alt="">`,
    aurenegra: `<img class="lutador__sprite" src="img/aurenegra.webp?v=${CACHE_V}" alt="">`,
  };

  const MELHORIAS = [
    {
      id: "cura",
      tipo: "cura",
      selo: "Cura",
      nome: "Curar feridas",
      disponivel: (j) => j.vida < j.vidaMax,
      detalhe: (j) => {
        const ganho = curaValor(j);
        return `Vida ${j.vida}/${j.vidaMax} → ${Math.min(j.vidaMax, j.vida + ganho)}/${j.vidaMax}.`;
      },
      aplicar: (j) => {
        j.vida = Math.min(j.vidaMax, j.vida + curaValor(j));
      },
    },
    {
      id: "vidaMax",
      tipo: "poder",
      selo: "Poder",
      nome: "Corpo firme",
      detalhe: (j) => `Vida máxima ${j.vidaMax} → ${j.vidaMax + 12}. Cura 12 agora.`,
      aplicar: (j) => {
        j.vidaMax += 12;
        j.vida = Math.min(j.vidaMax, j.vida + 12);
      },
    },
    {
      id: "essMax",
      tipo: "magia",
      selo: "Magia",
      nome: "Poço de essência",
      detalhe: (j) => `Essência máxima ${j.essenciaMax} → ${j.essenciaMax + 8}. Recarrega 16.`,
      aplicar: (j) => {
        j.essenciaMax += 8;
        j.essencia = Math.min(j.essenciaMax, j.essencia + 16);
      },
    },
    {
      id: "ataque",
      tipo: "poder",
      selo: "Poder",
      nome: "Gume afiado",
      detalhe: (j) => `Ataque ${j.ataque.min}–${j.ataque.max} → ${j.ataque.min + 2}–${j.ataque.max + 2}.`,
      aplicar: (j) => {
        j.ataque.min += 2;
        j.ataque.max += 2;
      },
    },
    {
      id: "magiaDano",
      tipo: "magia",
      selo: "Magia",
      nome: "Clarão maior",
      detalhe: (j) => `Magia ${j.magia.min}–${j.magia.max} → ${j.magia.min + 4}–${j.magia.max + 4}.`,
      aplicar: (j) => {
        j.magia.min += 4;
        j.magia.max += 4;
      },
    },
    {
      id: "magiaBarata",
      tipo: "magia",
      selo: "Magia",
      nome: "Foco sereno",
      disponivel: (j) => j.magia.custo > 10,
      detalhe: (j) => `Custo da magia ${j.magia.custo} → ${Math.max(10, j.magia.custo - 3)} essência.`,
      aplicar: (j) => {
        j.magia.custo = Math.max(10, j.magia.custo - 3);
      },
    },
    {
      id: "critico",
      tipo: "poder",
      selo: "Poder",
      nome: "Olho certeiro",
      disponivel: (j) => j.critico < 0.36,
      detalhe: (j) => `Acerto preciso ${Math.round(j.critico * 100)}% → ${Math.round((j.critico + 0.08) * 100)}%.`,
      aplicar: (j) => {
        j.critico = Math.min(0.4, j.critico + 0.08);
      },
    },
    {
      id: "guarda",
      tipo: "defesa",
      selo: "Defesa",
      nome: "Guarda de aço",
      disponivel: (j) => j.guardaReducao < 0.78,
      detalhe: () => "Defender reduz ainda mais o próximo golpe.",
      aplicar: (j) => {
        j.guardaReducao = Math.min(0.82, j.guardaReducao + 0.08);
      },
    },
    {
      id: "folego",
      tipo: "cura",
      selo: "Cura",
      nome: "Segundo fôlego",
      disponivel: (j) => j.vida < j.vidaMax,
      detalhe: (j) => `Cura 30 de vida (${j.vida} → ${Math.min(j.vidaMax, j.vida + 30)}) e +12 essência.`,
      aplicar: (j) => {
        j.vida = Math.min(j.vidaMax, j.vida + 30);
        j.essencia = Math.min(j.essenciaMax, j.essencia + 12);
      },
    },
    {
      id: "essDefesa",
      tipo: "defesa",
      selo: "Defesa",
      nome: "Postura viva",
      disponivel: (j) => j.essenciaDefesa < 12,
      detalhe: (j) => `Defender recupera ${j.essenciaDefesa} → ${j.essenciaDefesa + 3} essência.`,
      aplicar: (j) => {
        j.essenciaDefesa += 3;
      },
    },
    {
      id: "perfura",
      tipo: "magia",
      selo: "Magia",
      nome: "Clarão cortante",
      disponivel: (j) => j.magia.perfuracao < 0.74,
      detalhe: () => "Sua magia ignora mais a guarda do rival.",
      aplicar: (j) => {
        j.magia.perfuracao = Math.min(0.8, j.magia.perfuracao + 0.1);
      },
    },
  ];

  function curaValor(j) {
    return Math.max(28, Math.round(j.vidaMax * 0.45));
  }

  const els = {
    app: document.getElementById("app"),
    telaTitulo: document.getElementById("tela-titulo"),
    telaLuta: document.getElementById("tela-luta"),
    telaDescanso: document.getElementById("tela-descanso"),
    btnComecar: document.getElementById("btn-comecar"),
    btnContinuar: document.getElementById("btn-continuar"),
    btnNova: document.getElementById("btn-nova"),
    btnSom: document.getElementById("btn-som"),
    btnSomTxt: document.querySelector(".btn-som__txt"),
    modalTutorial: document.getElementById("modal-tutorial"),
    btnEntendi: document.getElementById("btn-entendi"),
    modalChefe: document.getElementById("modal-chefe"),
    chefeSelo: document.getElementById("chefe-selo"),
    chefeTitulo: document.getElementById("chefe-titulo"),
    chefeTexto: document.getElementById("chefe-texto"),
    modalFim: document.getElementById("modal-fim"),
    fimSelo: document.getElementById("fim-selo"),
    fimTitulo: document.getElementById("fim-titulo"),
    fimTexto: document.getElementById("fim-texto"),
    fimResumo: document.getElementById("fim-resumo"),
    btnRetry: document.getElementById("btn-retry"),
    btnReiniciar: document.getElementById("btn-reiniciar"),
    btnInicio: document.getElementById("btn-inicio"),
    relato: document.getElementById("relato"),
    txtRodada: document.getElementById("txt-rodada"),
    txtVez: document.getElementById("txt-vez"),
    txtCirculo: document.getElementById("txt-circulo"),
    pips: document.getElementById("pips"),
    acoes: document.getElementById("acoes"),
    btnAtacar: document.getElementById("btn-atacar"),
    btnDefender: document.getElementById("btn-defender"),
    btnMagia: document.getElementById("btn-magia"),
    detalheAtacar: document.getElementById("detalhe-atacar"),
    detalheDefender: document.getElementById("detalhe-defender"),
    detalheMagia: document.getElementById("detalhe-magia"),
    nomeJogador: document.getElementById("nome-jogador"),
    nomeInimigo: document.getElementById("nome-inimigo"),
    papelInimigo: document.getElementById("papel-inimigo"),
    placaJogador: document.getElementById("placa-jogador"),
    placaInimigo: document.getElementById("placa-inimigo"),
    lutadorJogador: document.getElementById("lutador-jogador"),
    lutadorInimigo: document.getElementById("lutador-inimigo"),
    corpoInimigo: document.getElementById("corpo-inimigo"),
    flutuantesJogador: document.getElementById("flutuantes-jogador"),
    flutuantesInimigo: document.getElementById("flutuantes-inimigo"),
    arena: document.getElementById("arena"),
    arenaFlash: document.getElementById("arena-flash"),
    arenaFaixas: document.getElementById("arena-faixas"),
    descansoSelo: document.getElementById("descanso-selo"),
    descansoTexto: document.getElementById("descanso-texto"),
    descansoStatus: document.getElementById("descanso-status"),
    proximoRival: document.getElementById("proximo-rival"),
    proximoSilhueta: document.getElementById("proximo-silhueta"),
    proximoRotulo: document.getElementById("proximo-rotulo"),
    proximoNome: document.getElementById("proximo-nome"),
    proximoNota: document.getElementById("proximo-nota"),
    melhorias: document.getElementById("melhorias"),
    dicaMinuto: document.getElementById("dica-minuto"),
    pausaVis: document.getElementById("pausa-visibilidade"),
    arenaKo: document.getElementById("arena-ko"),
    arenaKoTitulo: document.getElementById("arena-ko-titulo"),
    arenaKoSub: document.getElementById("arena-ko-sub"),
    btnPausa: document.getElementById("btn-pausa"),
    modalPausa: document.getElementById("modal-pausa"),
    pausaTexto: document.getElementById("pausa-texto"),
    btnPausaVoltar: document.getElementById("btn-pausa-voltar"),
    btnPausaSom: document.getElementById("btn-pausa-som"),
    btnPausaSair: document.getElementById("btn-pausa-sair"),
    leitura: document.getElementById("leitura-rival"),
    leituraTrilha: document.getElementById("leitura-trilha"),
    combo: document.getElementById("combo"),
    comboValor: document.getElementById("combo-valor"),
    comboPips: document.getElementById("combo-pips"),
    chipPerigo: document.getElementById("chip-perigo"),
    arenaVignette: document.getElementById("arena-vignette"),
    bannerTurno: document.getElementById("banner-turno"),
    bannerTurnoTxt: document.getElementById("banner-turno-txt"),
  };

  const estado = {
    tela: "titulo",
    ocupado: false,
    mudo: lerFlag("mudo", false),
    viuTutorial: lerFlag("tutorial", false),
    viuDicaMinuto: lerFlag("dica-minuto", false),
    circulo: 0,
    fase: "titulo",
    rodada: 1,
    jogador: null,
    inimigo: null,
    melhorias: [],
    resultado: null,
    audio: null,
    tutorialTravado: false,
    ignorarTituloAte: 0,
    stats: { turnos: 0, danoFeito: 0, danoTomado: 0, circulos: 0 },
    lutaDanoTomado: 0,
    pausaMenu: false,
    geracao: 0,
    leitura: [],
    previa: null,
    ignorarCliqueAte: 0,
    combo: 0,
    melhorComboLuta: 0,
  };

  function resetStats() {
    estado.stats = { turnos: 0, danoFeito: 0, danoTomado: 0, circulos: 0 };
  }

  function diaBRT() {
    try {
      return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
    } catch (_) {
      const d = new Date();
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
  }

  function lerMeta() {
    const hoje = diaBRT();
    const padrao = { dia: hoje, vitoriasHoje: 0, sequencia: 0, melhorSequencia: 0 };
    try {
      const bruto = localStorage.getItem(`${CHAVE}:meta`);
      if (!bruto) return padrao;
      const m = JSON.parse(bruto);
      const seq = m.sequencia | 0;
      const melhor = Math.max(m.melhorSequencia | 0, seq);
      if (m.dia !== hoje) {
        return { dia: hoje, vitoriasHoje: 0, sequencia: seq, melhorSequencia: melhor };
      }
      return {
        dia: hoje,
        vitoriasHoje: m.vitoriasHoje | 0,
        sequencia: seq,
        melhorSequencia: melhor,
      };
    } catch (_) {
      return padrao;
    }
  }

  function gravarMeta(m) {
    try {
      localStorage.setItem(`${CHAVE}:meta`, JSON.stringify(m));
    } catch (_) {}
  }

  function pintarTituloMeta() {
    const el = document.getElementById("titulo-meta");
    if (!el) return;
    const m = lerMeta();
    const partes = [];
    partes.push(m.vitoriasHoje > 0 ? TEXTO.metaHoje(m.vitoriasHoje) : TEXTO.metaHojeZero);
    if (m.sequencia > 0) partes.push(TEXTO.metaSeq(m.sequencia));
    if (m.melhorSequencia > 0) partes.push(TEXTO.metaMelhor(m.melhorSequencia));
    el.textContent = partes.join(" · ");
  }

  function registrarVitoriaCirculo() {
    const m = lerMeta();
    m.dia = diaBRT();
    m.vitoriasHoje = (m.vitoriasHoje | 0) + 1;
    m.sequencia = (m.sequencia | 0) + 1;
    m.melhorSequencia = Math.max(m.melhorSequencia | 0, m.sequencia);
    gravarMeta(m);
    pintarTituloMeta();
  }

  function registrarDerrotaMeta() {
    const m = lerMeta();
    m.dia = diaBRT();
    m.sequencia = 0;
    gravarMeta(m);
    pintarTituloMeta();
  }

  function lerFlag(nome, padrao) {
    try {
      const bruto = localStorage.getItem(`${CHAVE}:${nome}`);
      if (bruto === null) return padrao;
      return JSON.parse(bruto);
    } catch {
      return padrao;
    }
  }

  function gravarFlag(nome, valor) {
    try {
      localStorage.setItem(`${CHAVE}:${nome}`, JSON.stringify(valor));
    } catch {
      /* armazenamento opcional */
    }
  }

  function lerCampanha() {
    try {
      const bruto = localStorage.getItem(`${CHAVE}:campanha`);
      if (!bruto) return null;
      const dados = JSON.parse(bruto);
      if (!dados || dados.v !== VERSAO) return dados && dados.jogador ? dados : null;
      return dados;
    } catch {
      return null;
    }
  }

  function gravarCampanha() {
    if (!estado.jogador) return;
    const dados = {
      v: VERSAO,
      circulo: estado.circulo,
      fase: estado.fase,
      jogador: serializarJogador(estado.jogador),
      melhorias: estado.melhorias.map((m) => m.id),
      concluida: estado.fase === "concluida",
    };
    try {
      localStorage.setItem(`${CHAVE}:campanha`, JSON.stringify(dados));
    } catch {
      /* armazenamento opcional */
    }
  }

  function apagarCampanha() {
    try {
      localStorage.removeItem(`${CHAVE}:campanha`);
    } catch {
      /* ignore */
    }
  }

  function serializarJogador(j) {
    return {
      vidaMax: j.vidaMax,
      essenciaMax: j.essenciaMax,
      vida: j.vida,
      essencia: j.essencia,
      ataque: { ...j.ataque },
      magia: { ...j.magia },
      guardaReducao: j.guardaReducao,
      essenciaDefesa: j.essenciaDefesa,
      critico: j.critico,
    };
  }

  function hidratarJogador(salvo) {
    const j = clonarLutador(NARA);
    j.vidaMax = salvo.vidaMax;
    j.essenciaMax = salvo.essenciaMax;
    j.vida = salvo.vida;
    j.essencia = salvo.essencia;
    j.ataque = { ...NARA.ataque, ...salvo.ataque };
    j.magia = { ...NARA.magia, ...salvo.magia };
    j.guardaReducao = salvo.guardaReducao;
    j.essenciaDefesa = salvo.essenciaDefesa;
    j.critico = salvo.critico;
    j.guarda = false;
    return j;
  }

  function entre(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  function pausado() {
    return document.hidden || estado.pausaMenu;
  }

  function esperar(ms) {
    const geracao = estado.geracao;
    return new Promise((resolve) => {
      let remaining = ms;
      let start = performance.now();
      let timer = null;

      function clear() {
        if (timer != null) {
          clearTimeout(timer);
          timer = null;
        }
      }

      function done() {
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("luta:pausa", onVis);
        clear();
        /* Saiu do duelo pelo menu: a sequência antiga não continua. */
        if (geracao !== estado.geracao) return;
        resolve();
      }

      function schedule() {
        clear();
        if (pausado()) return;
        start = performance.now();
        timer = setTimeout(done, remaining);
      }

      function onVis() {
        if (geracao !== estado.geracao) {
          done();
          return;
        }
        if (pausado()) {
          if (timer != null) {
            remaining = Math.max(0, remaining - (performance.now() - start));
            clear();
          }
        } else {
          schedule();
        }
      }

      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("luta:pausa", onVis);
      schedule();
    });
  }


  const prefersReduced = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mostrarDicaMinuto() {
    if (!els.dicaMinuto || estado.viuDicaMinuto) return;
    els.dicaMinuto.hidden = false;
    els.telaLuta.classList.add("is-dica-minuto");
  }

  function dispensarDicaMinuto() {
    if (!els.dicaMinuto || estado.viuDicaMinuto) {
      if (els.dicaMinuto) els.dicaMinuto.hidden = true;
      els.telaLuta.classList.remove("is-dica-minuto");
      return;
    }
    estado.viuDicaMinuto = true;
    gravarFlag("dica-minuto", true);
    els.dicaMinuto.hidden = true;
    els.telaLuta.classList.remove("is-dica-minuto");
  }

  function setPausaVisibilidade(pausado) {
    if (!els.pausaVis) return;
    const show = !!pausado && estado.tela === "luta";
    els.pausaVis.hidden = !show;
    els.app.classList.toggle("is-pausado-aba", show);
    if (show && els.pausaVis.querySelector(".pausa-visibilidade__txt")) {
      els.pausaVis.querySelector(".pausa-visibilidade__txt").innerHTML =
        "<strong>Pausado</strong>: volte a esta aba para continuar o duelo.";
    }
  }

  function embaralhar(lista) {
    const arr = lista.slice();
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const k = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[k]] = [arr[k], arr[i]];
    }
    return arr;
  }

  function clonarLutador(modelo) {
    return {
      id: modelo.id,
      nome: modelo.nome,
      titulo: modelo.titulo || modelo.nome,
      nota: modelo.nota || "",
      vidaMax: modelo.vidaMax,
      essenciaMax: modelo.essenciaMax,
      vida: modelo.vidaMax,
      essencia: modelo.essenciaMax,
      ataque: { ...modelo.ataque },
      magia: { ...modelo.magia },
      guardaReducao: modelo.guardaReducao,
      essenciaDefesa: modelo.essenciaDefesa,
      critico: modelo.critico,
      guarda: false,
      contra: false,
      atingidoNestaRodada: false,
      ultimaAcao: null,
      estilo: modelo.estilo || "jogador",
      tema: modelo.tema || "",
      chefe: modelo.chefe || false,
    };
  }

  function rivalAtual() {
    return RIVAIS[CAMPANHA[estado.circulo]];
  }

  function papelDe(rival) {
    if (rival.chefe === "final") return TEXTO.chefeFinal;
    if (rival.chefe) return TEXTO.chefe;
    return TEXTO.rival;
  }

  function criarAudio() {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0.72;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.knee.value = 18;
    comp.ratio.value = 6;
    comp.attack.value = 0.004;
    comp.release.value = 0.16;
    master.connect(comp);
    comp.connect(ctx.destination);

    const ruidoBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const ruidoData = ruidoBuf.getChannelData(0);
    for (let i = 0; i < ruidoData.length; i++) {
      ruidoData[i] = (Math.random() * 2 - 1) * (1 - i / ruidoData.length);
    }

    function agora() {
      return ctx.currentTime;
    }

    function env(gainNode, t0, a, d, s, r, peak) {
      const g = gainNode.gain;
      g.cancelScheduledValues(t0);
      g.setValueAtTime(0.0001, t0);
      g.exponentialRampToValueAtTime(Math.max(0.0002, peak), t0 + Math.max(0.008, a));
      g.exponentialRampToValueAtTime(Math.max(0.0002, peak * s), t0 + a + d);
      g.exponentialRampToValueAtTime(0.0001, t0 + a + d + r);
    }

    function out() {
      const g = ctx.createGain();
      g.connect(master);
      return g;
    }

    function tone(tipo, freq, t0, dur, peak, slide) {
      if (estado.mudo || ctx.state === "closed") return;
      const o = ctx.createOscillator();
      const g = out();
      o.type = tipo;
      o.frequency.setValueAtTime(freq, t0);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t0 + dur);
      o.connect(g);
      env(g, t0, 0.012, dur * 0.22, 0.45, Math.max(0.06, dur * 0.62), peak);
      o.start(t0);
      o.stop(t0 + dur + 0.06);
    }

    function noise(t0, dur, peak, tipo, freq, q) {
      if (estado.mudo || ctx.state === "closed") return;
      const src = ctx.createBufferSource();
      src.buffer = ruidoBuf;
      src.loop = true;
      const f = ctx.createBiquadFilter();
      f.type = tipo || "bandpass";
      f.frequency.setValueAtTime(freq || 800, t0);
      f.Q.value = q == null ? 1.1 : q;
      const g = out();
      src.connect(f);
      f.connect(g);
      env(g, t0, 0.004, dur * 0.18, 0.28, dur * 0.72, peak);
      src.start(t0);
      src.stop(t0 + dur + 0.03);
    }

    function clickUi(t0) {
      tone("sine", 880, t0, 0.045, 0.05);
      tone("triangle", 1320, t0, 0.03, 0.018);
    }

    return {
      ctx,
      acordar() {
        if (estado.mudo) return;
        if (ctx.state === "suspended") ctx.resume();
      },
      /** Aba oculta: corta o AudioContext pra não vazar som no fundo. */
      suspend() {
        if (ctx.state === "running") {
          try { ctx.suspend(); } catch (_) { /* ok */ }
        }
      },
      resume() {
        if (estado.mudo) return;
        if (ctx.state === "suspended") {
          try { ctx.resume(); } catch (_) { /* ok */ }
        }
      },
      atacar() {
        const t = agora();
        noise(t, 0.09, 0.1, "highpass", 1400, 0.7);
        tone("sawtooth", 190, t, 0.13, 0.07, 70);
        tone("triangle", 92, t + 0.015, 0.16, 0.08);
        noise(t + 0.04, 0.07, 0.055, "bandpass", 420, 1.4);
      },
      defender() {
        const t = agora();
        tone("triangle", 310, t, 0.09, 0.07);
        tone("sine", 620, t + 0.02, 0.16, 0.045);
        tone("sine", 930, t + 0.04, 0.2, 0.03);
        noise(t, 0.08, 0.04, "lowpass", 900, 0.8);
      },
      magia() {
        const t = agora();
        tone("sawtooth", 280, t, 0.16, 0.045, 720);
        tone("sine", 540, t + 0.03, 0.22, 0.05);
        tone("sine", 810, t + 0.07, 0.24, 0.04);
        tone("triangle", 1080, t + 0.1, 0.2, 0.028);
        noise(t + 0.02, 0.16, 0.055, "bandpass", 2400, 2.2);
        noise(t + 0.08, 0.12, 0.03, "highpass", 3200, 0.6);
      },
      hit() {
        const t = agora();
        noise(t, 0.09, 0.14, "lowpass", 380, 0.7);
        tone("square", 110, t, 0.08, 0.05, 48);
        tone("triangle", 68, t, 0.16, 0.09);
        noise(t + 0.02, 0.06, 0.06, "bandpass", 900, 1.6);
      },
      vitoria() {
        const t = agora();
        const notas = [523.25, 659.25, 783.99, 987.77, 1174.66];
        notas.forEach((f, i) => {
          tone("sine", f, t + i * 0.09, 0.28, 0.055);
          tone("triangle", f * 2, t + i * 0.09, 0.18, 0.016);
        });
        noise(t + 0.28, 0.2, 0.025, "highpass", 2800, 0.5);
      },
      derrota() {
        const t = agora();
        tone("sawtooth", 196, t, 0.34, 0.055, 78);
        tone("triangle", 147, t + 0.1, 0.4, 0.05);
        tone("sine", 92, t + 0.18, 0.48, 0.06);
        noise(t, 0.28, 0.045, "lowpass", 260, 0.6);
      },
      melhorar() {
        const t = agora();
        [392, 523.25, 659.25, 784].forEach((f, i) => {
          tone("sine", f, t + i * 0.055, 0.2, 0.04);
        });
        noise(t + 0.04, 0.12, 0.022, "highpass", 2600, 0.7);
      },
      chefe() {
        const t = agora();
        noise(t, 0.28, 0.08, "lowpass", 180, 0.5);
        tone("sawtooth", 70, t, 0.32, 0.07, 140);
        tone("triangle", 110, t + 0.08, 0.36, 0.05);
        tone("sine", 220, t + 0.18, 0.32, 0.04);
        tone("sine", 330, t + 0.3, 0.36, 0.03);
      },
      ui() {
        clickUi(agora());
      },
      aviso() {
        const t = agora();
        tone("triangle", 220, t, 0.08, 0.04);
        tone("sine", 330, t + 0.05, 0.1, 0.03);
      },
      critico() {
        const t = agora();
        noise(t, 0.1, 0.16, "lowpass", 320, 0.6);
        tone("square", 160, t, 0.1, 0.06, 55);
        tone("sawtooth", 90, t, 0.18, 0.08, 40);
        tone("sine", 880, t + 0.04, 0.12, 0.035);
        noise(t + 0.03, 0.08, 0.07, "bandpass", 1200, 1.4);
      },
      cura() {
        const t = agora();
        [523.25, 659.25, 783.99].forEach((f, i) => {
          tone("sine", f, t + i * 0.05, 0.18, 0.035);
        });
      },
      turno() {
        const t = agora();
        tone("sine", 440, t, 0.07, 0.03);
        tone("triangle", 660, t + 0.04, 0.09, 0.025);
      },
    };
  }

  function atualizarSomUi() {
    els.btnSom.classList.toggle("is-mudo", estado.mudo);
    els.btnSom.setAttribute("aria-pressed", estado.mudo ? "true" : "false");
    els.btnSomTxt.textContent = estado.mudo ? TEXTO.mudo : TEXTO.som;
    els.btnSom.setAttribute("aria-label", estado.mudo ? "Ativar sons" : "Silenciar sons");
  }

  function mostrarTela(nome) {
    estado.tela = nome;
    els.telaTitulo.classList.toggle("is-ativa", nome === "titulo");
    els.telaTitulo.hidden = nome !== "titulo";
    els.telaLuta.classList.toggle("is-ativa", nome === "luta");
    els.telaLuta.hidden = nome !== "luta";
    if (nome !== "luta") setPausaVisibilidade(false);
    fx3d("setVisible", nome === "luta");
    els.telaDescanso.classList.toggle("is-ativa", nome === "descanso");
    els.telaDescanso.hidden = nome !== "descanso";
    atualizarBtnPausa();
  }

  function flutuantesDe(lado) {
    return lado === "jogador" ? els.flutuantesJogador : els.flutuantesInimigo;
  }

  function soltarNumero(lado, texto, classe) {
    const caixa = flutuantesDe(lado);
    const no = document.createElement("span");
    no.className = `numero-flutuante ${classe}`;
    no.textContent = texto;
    caixa.appendChild(no);
    setTimeout(() => no.remove(), 1500);
  }

  function animar(el, classe, ms, opts) {
    el.classList.remove(classe);
    void el.offsetWidth;
    el.classList.add(classe);
    const lado = el === els.lutadorJogador ? "jogador" : el === els.lutadorInimigo ? "inimigo" : null;
    if (lado) {
      if (classe === "is-ataque") fx3d("act", lado, "ataque");
      else if (classe === "is-magia") fx3d("act", lado, "magia");
      else if (classe === "is-hit") fx3d("hit", lado, opts || {});
    }
    return esperar(ms).then(() => el.classList.remove(classe));
  }

  function mostrarSeloJuice(texto, tipo) {
    const el = document.getElementById("arena-selo-juice");
    if (!el) return;
    el.hidden = false;
    el.textContent = texto;
    el.className = `arena__selo-juice is-${tipo || "critico"}`;
    el.setAttribute("aria-hidden", "false");
    window.clearTimeout(mostrarSeloJuice._t);
    const ms = prefersReduced() ? 520 : 720;
    mostrarSeloJuice._t = window.setTimeout(() => {
      el.hidden = true;
      el.textContent = "";
      el.className = "arena__selo-juice";
      el.setAttribute("aria-hidden", "true");
    }, ms);
  }

  function limparFlashArena() {
    els.arena.classList.remove(
      "is-treme",
      "is-treme-forte",
      "is-flash",
      "is-flash-ataque",
      "is-flash-magia",
      "is-flash-critico",
      "is-flash-guarda"
    );
  }

  function soltarFaixas(tipo) {
    if (!els.arenaFaixas || prefersReduced()) return;
    const caixa = els.arenaFaixas;
    caixa.innerHTML = "";
    const n = tipo === "critico" ? 14 : tipo === "magia" ? 10 : 7;
    for (let i = 0; i < n; i++) {
      const p = document.createElement("span");
      p.className = `faixa faixa--${tipo || "ataque"}`;
      p.style.setProperty("--x", `${(Math.random() * 70 + 15).toFixed(1)}%`);
      p.style.setProperty("--y", `${(Math.random() * 45 + 25).toFixed(1)}%`);
      p.style.setProperty("--d", `${(Math.random() * 0.18).toFixed(2)}s`);
      p.style.setProperty("--r", `${(Math.random() * 50 - 25).toFixed(0)}deg`);
      caixa.appendChild(p);
    }
    window.setTimeout(() => {
      if (caixa) caixa.innerHTML = "";
    }, 520);
  }

  function tremerArena(forte, tipo) {
    limparFlashArena();
    if (prefersReduced()) {
      // Juice mínimo sem shake: outline/tipo estático (sem tremor)
      els.arena.dataset.juice = tipo || "ataque";
      els.app.classList.remove("is-juice-hit", "is-juice-block", "is-juice-crit", "is-juice-magia");
      const juiceCls =
        tipo === "guarda"
          ? "is-juice-block"
          : tipo === "critico"
            ? "is-juice-crit"
            : tipo === "magia"
              ? "is-juice-magia"
              : "is-juice-hit";
      els.app.classList.add(juiceCls);
      fx3d("shake", false, tipo || "ataque");
      return esperar(180).then(() => {
        delete els.arena.dataset.juice;
        els.app.classList.remove("is-juice-hit", "is-juice-block", "is-juice-crit", "is-juice-magia");
        limparFlashArena();
      });
    }
    void els.arena.offsetWidth;
    const flash = tipo === "magia"
      ? "is-flash-magia"
      : tipo === "critico"
        ? "is-flash-critico"
        : tipo === "guarda"
          ? "is-flash-guarda"
          : "is-flash-ataque";
    const treme = forte || tipo === "critico" ? "is-treme-forte" : "is-treme";
    els.arena.classList.add(flash, treme);
    // Extra juice: tela/hit ring no app
    els.app.classList.remove("is-juice-hit", "is-juice-block", "is-juice-crit", "is-juice-magia");
    void els.app.offsetWidth;
    const juiceCls =
      tipo === "guarda"
        ? "is-juice-block"
        : tipo === "critico"
          ? "is-juice-crit"
          : tipo === "magia"
            ? "is-juice-magia"
            : "is-juice-hit";
    els.app.classList.add(juiceCls);
    window.setTimeout(
      () => els.app.classList.remove("is-juice-hit", "is-juice-block", "is-juice-crit", "is-juice-magia"),
      tipo === "critico" || tipo === "magia" ? 420 : 320
    );
    soltarFaixas(tipo || "ataque");
    fx3d("shake", !!forte, tipo || "ataque");
    return esperar(forte || tipo === "critico" ? 460 : 340).then(limparFlashArena);
  }

  function pulsarAcao(acao) {
    const btn = acao === "atacar" ? els.btnAtacar : acao === "defender" ? els.btnDefender : els.btnMagia;
    if (!btn) return;
    btn.classList.remove("is-pulso");
    void btn.offsetWidth;
    btn.classList.add("is-pulso");
    window.setTimeout(() => btn.classList.remove("is-pulso"), 280);
  }

  function precarregarArtes() {
    const base = "img";
    const urls = [`${base}/nara.webp?v=${CACHE_V}`].concat(
      Object.keys(ARTES).map((id) => `${base}/${id}.webp?v=${CACHE_V}`)
    );
    urls.forEach((src) => {
      const im = new Image();
      im.decoding = "async";
      im.src = src;
    });
  }

  function setBarra(preenchimento, meter, atual, maximo, txt, barraPai) {
    const pct = Math.max(0, Math.min(1, atual / maximo));
    const prev = Number(preenchimento.dataset.pct || pct);
    preenchimento.style.transform = `scaleX(${pct})`;
    preenchimento.dataset.pct = String(pct);
    meter.setAttribute("aria-valuemax", String(maximo));
    meter.setAttribute("aria-valuenow", String(atual));
    txt.textContent = `${atual}/${maximo}`;
    if (barraPai) {
      barraPai.classList.toggle("is-baixa", pct <= 0.3);
      let ghost = barraPai.querySelector(".barra__fantasma");
      if (!ghost) {
        ghost = document.createElement("div");
        ghost.className = "barra__fantasma";
        const trilha = barraPai.querySelector(".barra__trilha");
        if (trilha) trilha.insertBefore(ghost, preenchimento);
      }
      if (pct < prev - 0.01) {
        ghost.style.transform = `scaleX(${prev})`;
        ghost.classList.remove("is-sumindo");
        void ghost.offsetWidth;
        ghost.classList.add("is-sumindo");
        ghost.style.transform = `scaleX(${pct})`;
      } else {
        ghost.style.transform = `scaleX(${pct})`;
      }
    }
  }

  function pintarPips() {
    els.txtCirculo.textContent = TEXTO.circulo(estado.circulo + 1);
    els.pips.innerHTML = CAMPANHA.map((id, i) => {
      const chefe = RIVAIS[id].chefe ? " is-chefe" : "";
      let estadoPip = "";
      if (i < estado.circulo) estadoPip = " is-feito";
      else if (i === estado.circulo) estadoPip = " is-atual";
      return `<li class="${chefe}${estadoPip}"></li>`;
    }).join("");
  }

  function pintarHud() {
    const j = estado.jogador;
    const i = estado.inimigo;
    if (!j || !i) return;
    els.nomeJogador.textContent = j.nome;
    els.nomeInimigo.textContent = i.nome;
    els.papelInimigo.textContent = papelDe(i);
    els.placaInimigo.classList.toggle("is-chefe", !!i.chefe);
    els.txtRodada.textContent = TEXTO.turno(estado.rodada);
    pintarPips();
    setBarra(
      document.getElementById("vida-jogador-bar"),
      document.getElementById("vida-jogador-meter"),
      j.vida,
      j.vidaMax,
      document.getElementById("vida-jogador-txt"),
      document.querySelector("#placa-jogador .barra[data-tipo='vida']")
    );
    setBarra(
      document.getElementById("essencia-jogador-bar"),
      document.getElementById("essencia-jogador-meter"),
      j.essencia,
      j.essenciaMax,
      document.getElementById("essencia-jogador-txt")
    );
    setBarra(
      document.getElementById("vida-inimigo-bar"),
      document.getElementById("vida-inimigo-meter"),
      i.vida,
      i.vidaMax,
      document.getElementById("vida-inimigo-txt"),
      document.querySelector("#placa-inimigo .barra[data-tipo='vida']")
    );
    setBarra(
      document.getElementById("essencia-inimigo-bar"),
      document.getElementById("essencia-inimigo-meter"),
      i.essencia,
      i.essenciaMax,
      document.getElementById("essencia-inimigo-txt")
    );
    els.lutadorJogador.classList.toggle("is-guarda", j.guarda);
    els.lutadorInimigo.classList.toggle("is-guarda", i.guarda);
    els.placaJogador.classList.toggle("is-critica", j.vida / j.vidaMax <= 0.3);
    els.placaInimigo.classList.toggle("is-critica", i.vida / i.vidaMax <= 0.3);
    els.detalheAtacar.textContent = j.contra
      ? `${Math.round(j.ataque.min * BONUS_CONTRA)}–${Math.round(j.ataque.max * BONUS_CONTRA)} contra`
      : `${j.ataque.min}–${j.ataque.max} dano`;
    els.detalheMagia.textContent = `${j.magia.custo} essência · ${j.magia.min}–${j.magia.max}`;
    els.detalheDefender.textContent = `Guarda +${j.essenciaDefesa} essência`;
    pintarDicasAcoes(!els.btnAtacar.disabled && !estado.ocupado);
    atualizarPerigo();
    pintarCombo();
  }

  /* Onda 3: dano mínimo garante o K.O.? (crítico só aumenta, então é exato). */
  function koGarantido(ator, alvo, tipo) {
    if (!ator || !alvo) return false;
    if (tipo === "magia" && ator.essencia < ator.magia.custo) return false;
    const faixa = tipo === "magia" ? ator.magia : ator.ataque;
    const perf = tipo === "magia" ? ator.magia.perfuracao : 0;
    let dano = Math.max(1, faixa.min);
    if (tipo === "atacar" && ator.contra) dano = Math.round(dano * BONUS_CONTRA);
    if (alvo.guarda) dano = Math.max(1, Math.round(dano * (1 - alvo.guardaReducao * (1 - perf))));
    return dano >= alvo.vida;
  }

  function pintarDicasAcoes(ativos) {
    const j = estado.jogador;
    const i = estado.inimigo;
    if (!j) return;
    const curta = j.essencia < j.magia.custo;
    const carga = Math.max(0, Math.min(1, j.essencia / j.magia.custo));
    els.btnMagia.style.setProperty("--carga", carga.toFixed(3));
    els.btnMagia.classList.toggle("is-curta", curta);
    els.btnMagia.setAttribute("aria-disabled", curta ? "true" : "false");
    if (curta) {
      els.detalheMagia.textContent = TEXTO.magiaFalta(j.magia.custo - j.essencia);
    }
    const koAtk = !!(ativos && i && koGarantido(j, i, "atacar"));
    const koMag = !!(ativos && i && !koAtk && koGarantido(j, i, "magia"));
    els.btnAtacar.classList.toggle("is-finaliza", koAtk);
    els.btnAtacar.classList.toggle("is-contra", !!(j.contra && !koAtk));
    els.btnMagia.classList.toggle("is-finaliza", koMag);
    els.btnAtacar.setAttribute(
      "aria-label",
      koAtk ? "Atacar (finaliza o rival)" : j.contra ? "Atacar (contra-golpe +40%)" : "Atacar"
    );
    els.btnMagia.setAttribute(
      "aria-label",
      koMag ? "Magia (finaliza o rival)" : curta ? `Magia (faltam ${j.magia.custo - j.essencia} de essência)` : "Magia"
    );
  }

  function negarMagia() {
    const j = estado.jogador;
    if (!j) return;
    const falta = Math.max(1, j.magia.custo - j.essencia);
    relatar(TEXTO.magiaNega(falta, j.essenciaDefesa));
    if (estado.audio) estado.audio.aviso();
    vibrar([12, 40, 12]);
    const m = els.btnMagia;
    m.classList.remove("is-nega");
    void m.offsetWidth;
    m.classList.add("is-nega");
    window.setTimeout(() => m.classList.remove("is-nega"), 460);
    const d = els.btnDefender;
    d.classList.remove("is-sugestao");
    void d.offsetWidth;
    d.classList.add("is-sugestao");
    window.clearTimeout(negarMagia._t);
    negarMagia._t = window.setTimeout(() => d.classList.remove("is-sugestao"), 1800);
  }

  function setBotoes(ativos) {
    els.btnAtacar.disabled = !ativos;
    els.btnDefender.disabled = !ativos;
    /* Magia sem essência fica tocável (aria-disabled) para explicar o que falta. */
    els.btnMagia.disabled = !ativos;
    pintarDicasAcoes(!!ativos);
    els.acoes.setAttribute("aria-disabled", ativos ? "false" : "true");
    els.telaLuta.classList.toggle("is-sua-vez", !!ativos);
    if (els.txtVez) {
      els.txtVez.classList.toggle("is-destaque-vez", !!ativos);
    }
  }

  function setVezInimigo(aguardando) {
    els.telaLuta.classList.toggle("is-vez-inimigo", aguardando);
    if (els.txtVez) {
      els.txtVez.classList.toggle("is-vez-rival", !!aguardando);
      els.txtVez.classList.toggle("is-destaque-vez", !aguardando && !estado.ocupado);
    }
  }

  function relatar(msg) {
    els.relato.textContent = msg;
  }

  function vibrar(ms) {
    if (estado.mudo) return;
    if (navigator.vibrate) navigator.vibrate(ms);
  }

  /* ===== Onda 5: combo, banner de turno, ripple, perigo/quase ===== */
  function pintarCombo() {
    const n = estado.combo | 0;
    if (!els.combo) return;
    if (n < 2) {
      els.combo.hidden = true;
      els.combo.classList.remove("is-quente", "is-topo", "is-bump");
      els.app.classList.remove("is-combo-quente");
      if (els.comboValor) els.comboValor.textContent = "×1";
      if (els.comboPips) els.comboPips.innerHTML = "";
      return;
    }
    els.combo.hidden = false;
    els.comboValor.textContent = `×${n}`;
    els.combo.setAttribute("aria-label", TEXTO.combo(n));
    els.combo.classList.toggle("is-quente", n >= 3);
    els.combo.classList.toggle("is-topo", n >= 5);
    els.app.classList.toggle("is-combo-quente", n >= 3);
    if (els.comboPips) {
      const maxPips = 5;
      const filled = Math.min(maxPips, n);
      els.comboPips.innerHTML = Array.from({ length: maxPips }, (_, i) =>
        `<li class="combo__pip${i < filled ? " is-on" : ""}${i === filled - 1 ? " is-nova" : ""}"></li>`
      ).join("");
    }
  }

  function resetCombo(motivo) {
    if ((estado.combo | 0) === 0) return;
    estado.combo = 0;
    pintarCombo();
    if (motivo === "dano") {
      els.combo?.classList.remove("is-quebra");
      void els.combo?.offsetWidth;
    }
  }

  function bumpCombo() {
    estado.combo = (estado.combo | 0) + 1;
    if (estado.combo > (estado.melhorComboLuta | 0)) estado.melhorComboLuta = estado.combo;
    pintarCombo();
    if (estado.combo >= 3) {
      mostrarSeloJuice(TEXTO.comboSelo(estado.combo), "combo");
      vibrar(estado.combo >= 5 ? [10, 30, 14, 30, 18] : [10, 40, 16]);
      if (estado.audio && estado.audio.critico && estado.combo >= 5) estado.audio.critico();
      else if (estado.audio && estado.audio.turno) estado.audio.turno();
    } else if (estado.combo === 2) {
      vibrar(10);
    }
    els.combo?.classList.remove("is-bump");
    void els.combo?.offsetWidth;
    els.combo?.classList.add("is-bump");
    window.setTimeout(() => els.combo?.classList.remove("is-bump"), 320);
  }

  function mostrarBannerTurno(tipo) {
    if (!els.bannerTurno || !els.bannerTurnoTxt) return;
    if (prefersReduced()) return;
    const txt = tipo === "rival" ? TEXTO.bannerVezRival : TEXTO.bannerSuaVez;
    els.bannerTurnoTxt.textContent = txt;
    els.bannerTurno.hidden = false;
    els.bannerTurno.classList.remove("is-sua", "is-rival", "is-in");
    void els.bannerTurno.offsetWidth;
    els.bannerTurno.classList.add(tipo === "rival" ? "is-rival" : "is-sua", "is-in");
    window.clearTimeout(mostrarBannerTurno._t);
    mostrarBannerTurno._t = window.setTimeout(() => {
      els.bannerTurno.classList.remove("is-in");
      els.bannerTurno.hidden = true;
    }, 720);
  }

  function atualizarPerigo() {
    const j = estado.jogador;
    const perigo = !!(j && j.vida > 0 && j.vida / j.vidaMax <= 0.25);
    els.app.classList.toggle("is-perigo", perigo);
    els.telaLuta?.classList.toggle("is-perigo", perigo);
    els.placaJogador?.classList.toggle("is-perigo", perigo);
    if (els.chipPerigo) {
      els.chipPerigo.hidden = !perigo;
      els.chipPerigo.textContent = TEXTO.perigo;
    }
    if (els.arenaVignette) {
      els.arenaVignette.classList.toggle("is-on", perigo);
    }
  }

  function checarQuase(alvoVidaAntes, alvoVidaDepois, alvoMax) {
    if (alvoVidaDepois <= 0) return;
    if (alvoVidaAntes <= 0) return;
    const pct = alvoVidaDepois / alvoMax;
    if (pct > 0.12) return;
    if (alvoVidaAntes / alvoMax <= 0.12) return;
    mostrarSeloJuice(TEXTO.quaseSelo, "quase");
    vibrar([8, 40, 12]);
    relatar(`${els.relato.textContent} ${TEXTO.quaseRelato}`);
  }

  async function hitStop(ms) {
    if (prefersReduced()) return;
    const dur = Math.max(40, Math.min(160, ms | 0));
    els.app.classList.add("is-hitstop");
    await esperar(dur);
    els.app.classList.remove("is-hitstop");
  }

  function rippleNoBotao(btn, ev) {
    if (!btn || prefersReduced()) return;
    const rect = btn.getBoundingClientRect();
    const x = (ev && ev.clientX != null ? ev.clientX : rect.left + rect.width / 2) - rect.left;
    const y = (ev && ev.clientY != null ? ev.clientY : rect.top + rect.height / 2) - rect.top;
    const onda = document.createElement("span");
    onda.className = "acao__ripple";
    const size = Math.max(rect.width, rect.height) * 2.2;
    onda.style.width = `${size}px`;
    onda.style.height = `${size}px`;
    onda.style.left = `${x}px`;
    onda.style.top = `${y}px`;
    btn.appendChild(onda);
    window.setTimeout(() => onda.remove(), 520);
  }

  function prepararRivalVisual(rival) {
    els.corpoInimigo.innerHTML = ARTES[rival.id];
    els.lutadorInimigo.classList.toggle("is-chefe", !!rival.chefe);
    els.lutadorJogador.classList.remove("is-cair", "is-hit", "is-ataque", "is-magia");
    els.lutadorInimigo.classList.remove("is-cair", "is-hit", "is-ataque", "is-magia");
    els.arena.dataset.tema = rival.tema;
    els.arena.classList.toggle("is-chefe", !!rival.chefe);
    els.placaInimigo.classList.toggle("is-chefe", !!rival.chefe);
    fx3d("startFight", { id: rival.id, tema: rival.tema, chefe: !!rival.chefe });
    fx3d("setVisible", true);
  }

  async function mostrarEntradaChefe(rival) {
    if (!els.modalChefe) return;
    const final = rival.chefe === "final";
    els.chefeSelo.textContent = final ? TEXTO.entradaChefeFinal : TEXTO.entradaChefe;
    els.chefeTitulo.textContent = rival.titulo || rival.nome;
    els.chefeTexto.textContent = TEXTO.entradaChefeTexto(rival.titulo || rival.nome, rival.nota || "");
    els.modalChefe.hidden = false;
    els.telaLuta.classList.add("is-entrada-chefe");
    if (estado.audio) estado.audio.chefe();
    vibrar(final ? 36 : 24);
    await esperar(final ? 1600 : 1300);
    els.modalChefe.hidden = true;
    els.telaLuta.classList.remove("is-entrada-chefe");
  }

  async function iniciarCirculo(opcoes) {
    const opts = opcoes || {};
    const rival = rivalAtual();
    if (opts.curarJogador || estado.jogador.vida <= 0) {
      estado.jogador.vida = estado.jogador.vidaMax;
      estado.jogador.essencia = estado.jogador.essenciaMax;
    }
    estado.geracao += 1;
    fecharPausa(true);
    limparPrevia();
    estado.jogador.guarda = false;
    estado.jogador.contra = false;
    estado.leitura = [];
    pintarLeitura();
    estado.jogador.ultimaAcao = null;
    estado.jogador.atingidoNestaRodada = false;
    estado.inimigo = clonarLutador(rival);
    estado.rodada = 1;
    estado.lutaDanoTomado = 0;
    estado.combo = 0;
    estado.melhorComboLuta = 0;
    pintarCombo();
    atualizarPerigo();
    esconderKO();
    estado.ocupado = true;
    estado.fase = "luta";
    estado.resultado = null;
    els.app.classList.remove("is-vitoria", "is-derrota");
    els.modalFim.hidden = true;
    if (els.modalChefe) els.modalChefe.hidden = true;
    prepararRivalVisual(rival);
    mostrarTela("luta");
    mostrarDicaMinuto();
    pintarHud();
    els.txtVez.textContent = TEXTO.suaVez;
    setVezInimigo(false);
    relatar(TEXTO.inicioRelato(rival.titulo, rival.nota));
    setBotoes(false);
    gravarCampanha();
    if (rival.chefe) {
      await mostrarEntradaChefe(rival);
    }
    estado.ocupado = false;
    setBotoes(true);
    if (estado.audio) estado.audio.turno();
    els.txtVez.textContent = TEXTO.suaVezDrama;
    mostrarBannerTurno("sua");
    if (document.activeElement && typeof document.activeElement.blur === "function") {
      const ae = document.activeElement;
      if (ae === els.btnComecar || ae === els.btnContinuar || ae === els.btnNova || ae === els.btnEntendi) {
        ae.blur();
      }
    }
    els.btnAtacar.focus();
  }

  function danoBruto(ator, tipo) {
    const faixa = tipo === "magia" ? ator.magia : ator.ataque;
    let valor = entre(faixa.min, faixa.max);
    let critico = false;
    let contra = false;
    if (tipo === "atacar" && ator.contra) {
      valor = Math.round(valor * BONUS_CONTRA);
      contra = true;
    }
    if (tipo === "atacar" && Math.random() < ator.critico) {
      valor = Math.round(valor * 1.5);
      critico = true;
    }
    return { valor, critico, contra };
  }

  function aplicarDano(alvo, bruto, perfuracao) {
    alvo.atingidoNestaRodada = true;
    if (!alvo.guarda) {
      const dano = Math.max(1, bruto);
      alvo.vida = Math.max(0, alvo.vida - dano);
      return { dano, bloqueado: false };
    }
    const reducao = alvo.guardaReducao * (1 - perfuracao);
    const dano = Math.max(1, Math.round(bruto * (1 - reducao)));
    alvo.vida = Math.max(0, alvo.vida - dano);
    alvo.guarda = false;
    return { dano, bloqueado: true };
  }

  function estimarDano(ator, alvo, tipo) {
    const base = tipo === "magia"
      ? Math.round((ator.magia.min + ator.magia.max) / 2)
      : Math.round((ator.ataque.min + ator.ataque.max) / 2);
    if (!alvo.guarda) return base;
    const perf = tipo === "magia" ? ator.magia.perfuracao : 0;
    const reducao = alvo.guardaReducao * (1 - perf);
    return Math.max(1, Math.round(base * (1 - reducao)));
  }

  function escolherAcaoIA() {
    const eu = estado.inimigo;
    const alvo = estado.jogador;
    const podeMagia = eu.essencia >= eu.magia.custo;
    const estAtk = estimarDano(eu, alvo, "atacar");
    const estMag = podeMagia ? estimarDano(eu, alvo, "magia") : 0;
    const vidaBaixa = eu.vida / eu.vidaMax;
    const estilo = eu.estilo;

    if (alvo.vida <= estAtk) return "atacar";
    if (alvo.vida <= estMag) return "magia";

    if (estilo === "berserker") {
      if (vidaBaixa <= 0.14 && eu.ultimaAcao !== "defender") return "defender";
      if (podeMagia && Math.random() < 0.32) return "magia";
      return "atacar";
    }

    if (estilo === "mago") {
      if (podeMagia) return "magia";
      if (vidaBaixa <= 0.4 && eu.ultimaAcao !== "defender") return "defender";
      return "atacar";
    }

    if (estilo === "defensivo") {
      if (vidaBaixa <= 0.55 && eu.ultimaAcao !== "defender") return "defender";
      if (alvo.guarda && podeMagia) return "magia";
      if (podeMagia && Math.random() < 0.34) return "magia";
      if (eu.ultimaAcao !== "defender" && Math.random() < 0.38) return "defender";
      return "atacar";
    }

    if (estilo === "tanque") {
      if (vidaBaixa <= 0.5 && eu.ultimaAcao !== "defender") return "defender";
      if (alvo.guarda && podeMagia) return "magia";
      if (podeMagia && Math.random() < 0.3) return "magia";
      return "atacar";
    }

    if (estilo === "chefe") {
      if (vidaBaixa <= 0.35) {
        if (podeMagia) return "magia";
        return "atacar";
      }
      if (alvo.guarda && podeMagia) return "magia";
      if (vidaBaixa <= 0.42 && eu.ultimaAcao !== "defender") return "defender";
      if (podeMagia && Math.random() < 0.48) return "magia";
      return "atacar";
    }

    if (vidaBaixa <= 0.28 && eu.ultimaAcao !== "defender") return "defender";
    if (alvo.guarda && podeMagia) return "magia";
    if (estilo === "astuto" && podeMagia && alvo.essencia >= alvo.magia.custo && Math.random() < 0.4) {
      return "magia";
    }
    if (podeMagia && vidaBaixa > 0.32) {
      const chance = estilo === "astuto" ? 0.5 : 0.38;
      if (Math.random() < chance) return "magia";
    }
    if (vidaBaixa <= 0.45 && eu.ultimaAcao !== "defender" && Math.random() < 0.34) {
      return "defender";
    }
    return "atacar";
  }

  async function resolverAcao(atorChave, acao) {
    const ator = estado[atorChave];
    const alvoChave = atorChave === "jogador" ? "inimigo" : "jogador";
    const alvo = estado[alvoChave];
    const elAtor = atorChave === "jogador" ? els.lutadorJogador : els.lutadorInimigo;
    const elAlvo = alvoChave === "jogador" ? els.lutadorJogador : els.lutadorInimigo;
    const ladoAlvo = alvoChave;

    ator.ultimaAcao = acao;
    if (atorChave === "inimigo") registrarLeitura(acao);
    const contraAtivo = atorChave === "jogador" && acao === "atacar" && !!ator.contra;
    if (atorChave === "jogador") ator.contra = false;

    if (acao === "defender") {
      ator.guarda = true;
      const ganho = ator.essenciaDefesa;
      ator.essencia = Math.min(ator.essenciaMax, ator.essencia + ganho);
      elAtor.classList.add("is-guarda");
      fx3d("act", atorChave, "guarda");
      if (estado.audio) {
        estado.audio.defender();
        estado.audio.cura();
      }
      if (atorChave === "jogador") {
        pulsarAcao("defender");
        resetCombo("defesa");
      }
      relatar(atorChave === "jogador" ? TEXTO.voceDefendeu(ganho) : TEXTO.inimigoDefendeu(ator.nome, ganho));
      soltarNumero(atorChave, TEXTO.recuouEssencia(ganho), "numero-flutuante--cura");
      pintarHud();
      await tremerArena(false, "guarda");
      return;
    }

    if (acao === "magia") {
      if (ator.essencia < ator.magia.custo) {
        if (atorChave === "jogador") relatar(TEXTO.essenciaCurta);
        return;
      }
      ator.essencia -= ator.magia.custo;
      const { valor } = danoBruto(ator, "magia");
      const vidaAntesMag = alvo.vida;
      const resultado = aplicarDano(alvo, valor, ator.magia.perfuracao);
      if (ator.magia.dreno) {
        const roubo = Math.min(ator.magia.dreno, alvo.essencia);
        alvo.essencia -= roubo;
        ator.essencia = Math.min(ator.essenciaMax, ator.essencia + roubo);
        if (roubo) soltarNumero(atorChave, `+${roubo}`, "numero-flutuante--cura");
      }
      if (estado.audio) estado.audio.magia();
      if (atorChave === "jogador") pulsarAcao("magia");
      await animar(elAtor, "is-magia", 460);
      if (estado.audio) estado.audio.hit();
      vibrar(ator.chefe ? 32 : 20);
      if (atorChave === "jogador") estado.stats.danoFeito += resultado.dano;
      else {
        estado.stats.danoTomado += resultado.dano;
        estado.lutaDanoTomado += resultado.dano;
      }
      soltarNumero(
        ladoAlvo,
        `−${resultado.dano}`,
        resultado.bloqueado ? "numero-flutuante--guarda" : "numero-flutuante--magia"
      );
      const extra = resultado.bloqueado ? ` ${TEXTO.escudoAbsorveu}` : "";
      if (atorChave === "jogador") {
        relatar(`${TEXTO.voceMagia(resultado.dano, alvo.nome)}${extra}`);
      } else {
        relatar(`${TEXTO.inimigoMagia(ator.nome, ator.magia.nome, resultado.dano)}${extra}`);
      }
      armarContra(atorChave, alvo, resultado);
      if (atorChave === "jogador") {
        bumpCombo();
        checarQuase(vidaAntesMag, alvo.vida, alvo.vidaMax);
      } else if (resultado.dano > 0) {
        resetCombo("dano");
        if (estado.jogador && estado.jogador.vida / estado.jogador.vidaMax <= 0.25) {
          vibrar([18, 40, 22, 40, 28]);
        }
      }
      pintarHud();
      if (!resultado.bloqueado) mostrarSeloJuice(TEXTO.seloMagia, "magia");
      if (atorChave === "jogador" && (estado.combo | 0) >= 3) await hitStop(70);
      else if (ator.chefe) await hitStop(55);
      const hit = animar(elAlvo, "is-hit", ator.chefe ? 560 : 460, {
        tipo: "magia",
        forte: !!ator.chefe,
      });
      const treme = tremerArena(!!ator.chefe, resultado.bloqueado ? "guarda" : "magia");
      await Promise.all([hit, treme]);
      return;
    }

    if (contraAtivo) ator.contra = true;
    const { valor, critico, contra } = danoBruto(ator, "atacar");
    ator.contra = false;
    const vidaAntesAtk = alvo.vida;
    const resultado = aplicarDano(alvo, valor, 0);
    if (estado.audio) estado.audio.atacar();
    if (atorChave === "jogador") pulsarAcao("atacar");
    await animar(elAtor, "is-ataque", 400);
    if (estado.audio) {
      if (critico) estado.audio.critico();
      else estado.audio.hit();
    }
    vibrar(critico ? 28 : contra ? [16, 30, 22] : ator.chefe ? 22 : 12);
    const classeNum = critico
      ? "numero-flutuante--critico"
      : contra
        ? "numero-flutuante--contra"
      : resultado.bloqueado
        ? "numero-flutuante--guarda"
        : "numero-flutuante--dano";
    if (atorChave === "jogador") estado.stats.danoFeito += resultado.dano;
    else {
      estado.stats.danoTomado += resultado.dano;
      estado.lutaDanoTomado += resultado.dano;
    }
    soltarNumero(ladoAlvo, critico ? `−${resultado.dano}!` : `−${resultado.dano}`, classeNum);
    const partes = [];
    if (atorChave === "jogador") partes.push(TEXTO.voceAtacou(resultado.dano, alvo.nome));
    else partes.push(TEXTO.inimigoAtacou(ator.nome, resultado.dano));
    if (contra) partes.unshift(TEXTO.contraRelato);
    if (critico) partes.push(TEXTO.acertoPreciso);
    if (resultado.bloqueado) partes.push(TEXTO.escudoAbsorveu);
    relatar(partes.join(" "));
    armarContra(atorChave, alvo, resultado);
    if (atorChave === "jogador") {
      bumpCombo();
      checarQuase(vidaAntesAtk, alvo.vida, alvo.vidaMax);
    } else if (resultado.dano > 0) {
      resetCombo("dano");
      if (estado.jogador && estado.jogador.vida / estado.jogador.vidaMax <= 0.25) {
        vibrar([18, 40, 22, 40, 28]);
      }
    }
    pintarHud();
    const tipoFlash = critico || contra ? "critico" : resultado.bloqueado ? "guarda" : "ataque";
    if (critico) mostrarSeloJuice(TEXTO.seloCritico, "critico");
    else if (contra) mostrarSeloJuice(TEXTO.contraSelo, "contra");
    if (critico || contra || (atorChave === "jogador" && (estado.combo | 0) >= 3)) await hitStop(critico || contra ? 90 : 60);
    else if (ator.chefe) await hitStop(55);
    const hit = animar(elAlvo, "is-hit", critico || contra || ator.chefe ? 540 : 420, {
      critico: !!(critico || contra),
      tipo: tipoFlash,
      forte: !!(critico || contra || ator.chefe),
    });
    const treme = tremerArena(!!(critico || contra || ator.chefe), tipoFlash);
    await Promise.all([hit, treme]);
  }

  function algumMorreu() {
    return estado.jogador.vida <= 0 || estado.inimigo.vida <= 0;
  }

  function mostrarFim(tipo) {
    estado.ocupado = true;
    setVezInimigo(false);
    setBotoes(false);
    if (els.fimResumo && tipo !== "campanha") {
      els.fimResumo.hidden = true;
      els.fimResumo.textContent = "";
    }
    els.app.classList.toggle("is-vitoria", tipo !== "derrota");
    if (tipo === "derrota") fx3d("defeat");
    else fx3d("victory");
    els.app.classList.toggle("is-derrota", tipo === "derrota");
    els.btnRetry.hidden = tipo !== "derrota";
    els.btnReiniciar.hidden = tipo === "campanha";
    if (tipo === "derrota") {
      els.btnReiniciar.hidden = false;
      els.btnRetry.textContent = "Tentar de novo";
      els.btnReiniciar.textContent = "Reiniciar campanha";
    } else if (tipo === "campanha") {
      els.btnRetry.hidden = false;
      els.btnRetry.textContent = "Nova campanha";
      els.btnReiniciar.hidden = true;
    }
    els.modalFim.hidden = false;
    const foco = tipo === "derrota" ? els.btnRetry : (tipo === "campanha" ? els.btnRetry : els.btnInicio);
    foco.focus();
  }

  function mostrarKO(vitoria) {
    const el = els.arenaKo;
    if (!el) return;
    const final = vitoria && estado.circulo >= TOTAL_CIRCULOS - 1;
    const perfeito = vitoria && estado.lutaDanoTomado === 0;
    els.arenaKoTitulo.textContent = vitoria ? (final ? TEXTO.koFinal : TEXTO.koTitulo) : TEXTO.koDerrota;
    els.arenaKoSub.textContent = vitoria
      ? perfeito
        ? TEXTO.koPerfeito
        : TEXTO.koResumo(estado.rodada, estado.lutaDanoTomado)
      : TEXTO.koDerrotaSub(estado.inimigo ? estado.inimigo.nome : TEXTO.rival);
    el.className = `arena__ko ${vitoria ? "is-vitoria" : "is-derrota"}${perfeito ? " is-perfeito" : ""}${final ? " is-final" : ""}`;
    el.hidden = false;
    els.arena.classList.add("is-ko");
  }

  function esconderKO() {
    if (els.arenaKo) {
      els.arenaKo.hidden = true;
      els.arenaKo.className = "arena__ko";
    }
    els.arena.classList.remove("is-ko");
  }

  async function encerrar(vitoria) {
    if (vitoria) {
      els.lutadorInimigo.classList.add("is-cair");
      els.arena.classList.add("is-vitoria-arena");
      fx3d("ko", "inimigo");
      mostrarKO(true);
      if (estado.audio) estado.audio.vitoria();
      vibrar([30, 50, 70]);
      await esperar(prefersReduced() ? 900 : 1300);
      els.arena.classList.remove("is-vitoria-arena");
      esconderKO();
      if (estado.circulo >= TOTAL_CIRCULOS - 1) {
        estado.stats.circulos = TOTAL_CIRCULOS;
        estado.fase = "concluida";
        registrarVitoriaCirculo();
        gravarCampanha();
        els.fimSelo.textContent = TEXTO.fimSeloCampanha;
        els.fimTitulo.textContent = TEXTO.campanhaVencida;
        els.fimTexto.textContent = TEXTO.venceuCampanha(estado.inimigo.titulo, estado.rodada);
        if (els.fimResumo) {
          els.fimResumo.hidden = false;
          els.fimResumo.textContent = TEXTO.resumoCampanha(estado.stats);
        }
        mostrarFim("campanha");
        return;
      }
      irAoDescanso();
      return;
    }
    els.lutadorJogador.classList.add("is-cair");
    fx3d("ko", "jogador");
    mostrarKO(false);
    if (estado.audio) estado.audio.derrota();
    vibrar([60, 40, 60]);
    await esperar(prefersReduced() ? 700 : 1000);
    estado.fase = "luta";
    registrarDerrotaMeta();
    gravarCampanha();
    els.fimSelo.textContent = TEXTO.fimSeloLose;
    els.fimTitulo.textContent = TEXTO.derrota;
    els.fimTexto.textContent = TEXTO.perdeuPara(estado.inimigo.titulo);
    mostrarFim("derrota");
  }

  function descansoCuraLeve() {
    const j = estado.jogador;
    const ganho = Math.ceil(j.vidaMax * 0.12);
    const antes = j.vida;
    j.vida = Math.min(j.vidaMax, j.vida + ganho);
    j.essencia = j.essenciaMax;
    j.guarda = false;
    estado.curaDescanso = {
      vida: j.vida - antes,
      essencia: true,
    };
  }

  function melhoriaPorId(id) {
    return MELHORIAS.find((m) => m.id === id);
  }

  function sortearMelhorias(jogador) {
    const pool = MELHORIAS.filter((m) => !m.disponivel || m.disponivel(jogador));
    const escolhidas = [];
    const vidaBaixa = jogador.vida / jogador.vidaMax <= 0.5;
    if (vidaBaixa) {
      const cura = pool.find((m) => m.id === "cura") || pool.find((m) => m.id === "folego");
      if (cura) escolhidas.push(cura);
    }
    const resto = embaralhar(pool.filter((m) => !escolhidas.includes(m)));
    while (escolhidas.length < 3 && resto.length) escolhidas.push(resto.shift());
    if (escolhidas.length < 3) {
      const extra = embaralhar(MELHORIAS.filter((m) => !escolhidas.includes(m)));
      while (escolhidas.length < 3 && extra.length) escolhidas.push(extra.shift());
    }
    return escolhidas.slice(0, 3);
  }

  function placaStatus(titulo, valor) {
    return `<span class="descanso-chip"><span class="descanso-chip__k">${titulo}</span><span class="descanso-chip__v">${valor}</span></span>`;
  }

  function pintarDescanso() {
    const j = estado.jogador;
    const proximo = rivalAtual();
    els.descansoSelo.textContent = TEXTO.descansoSelo(estado.circulo);
    const cura = estado.curaDescanso;
    let textoCura = TEXTO.descansoTexto;
    let chipCura = "";
    if (cura && cura.vida > 0) {
      textoCura = `Descanso: +${cura.vida} de vida e essência cheia. Escolha um reforço.`;
      chipCura = placaStatus("Descanso", `+${cura.vida} vida · essência cheia`);
    } else if (cura) {
      textoCura = "Descanso: essência cheia. Escolha um reforço.";
      chipCura = placaStatus("Descanso", "Essência cheia");
    }
    els.descansoTexto.textContent = textoCura;
    els.descansoTexto.classList.toggle("is-cura", !!cura);
    els.descansoStatus.innerHTML =
      chipCura +
      placaStatus("Vida", `${j.vida}/${j.vidaMax}`) +
      placaStatus("Essência", `${j.essencia}/${j.essenciaMax}`) +
      placaStatus("Ataque", `${j.ataque.min}–${j.ataque.max}`) +
      placaStatus("Magia", `${j.magia.min}–${j.magia.max} · custo ${j.magia.custo}`);
    els.proximoRival.classList.toggle("is-chefe", !!proximo.chefe);
    els.proximoSilhueta.innerHTML = ARTES[proximo.id];
    els.proximoRotulo.textContent = proximo.chefe === "final"
      ? TEXTO.proximoFinal
      : proximo.chefe
        ? TEXTO.proximoChefe
        : TEXTO.proximo;
    els.proximoNome.textContent = proximo.titulo;
    els.proximoNota.textContent = proximo.nota;
    els.melhorias.innerHTML = "";
    estado.melhorias.forEach((m) => {
      const btn = document.createElement("button");
      btn.type = "button";
      const tipo = m.tipo || "poder";
      btn.className = `melhoria melhoria--${tipo}`;
      btn.dataset.melhoria = m.id;
      btn.dataset.tipo = tipo;
      const detalhe = m.detalhe(j);
      const selo = m.selo || "Reforço";
      btn.setAttribute("aria-label", `${selo}. ${m.nome}. ${detalhe}`);
      btn.innerHTML = `<span class="melhoria__selo">${selo}</span><span class="melhoria__nome">${m.nome}</span><span class="melhoria__desc">${detalhe}</span>`;
      btn.addEventListener("click", () => escolherMelhoria(m.id));
      els.melhorias.appendChild(btn);
    });
  }

  function irAoDescanso() {
    descansoCuraLeve();
    estado.stats.circulos += 1;
    estado.circulo += 1;
    registrarVitoriaCirculo();
    estado.fase = "descanso";
    estado.melhorias = sortearMelhorias(estado.jogador);
    estado.ocupado = false;
    els.modalFim.hidden = true;
    mostrarTela("descanso");
    pintarDescanso();
    gravarCampanha();
    const primeiro = els.melhorias.querySelector(".melhoria");
    if (primeiro) primeiro.focus();
  }

  async function escolherMelhoria(id) {
    if (estado.tela !== "descanso" || estado.ocupado || estado.pausaMenu) return;
    const m = estado.melhorias.find((x) => x.id === id) || melhoriaPorId(id);
    if (!m) return;
    estado.ocupado = true;
    m.aplicar(estado.jogador);
    if (estado.audio) estado.audio.melhorar();
    [...els.melhorias.querySelectorAll(".melhoria")].forEach((btn) => {
      btn.disabled = true;
      btn.classList.toggle("is-escolhida", btn.dataset.melhoria === id);
    });
    const j = estado.jogador;
    els.descansoStatus.innerHTML =
      placaStatus("Vida", `${j.vida}/${j.vidaMax}`) +
      placaStatus("Essência", `${j.essencia}/${j.essenciaMax}`) +
      placaStatus("Ataque", `${j.ataque.min}–${j.ataque.max}`) +
      placaStatus("Magia", `${j.magia.min}–${j.magia.max} · custo ${j.magia.custo}`);
    await esperar(640);
    estado.melhorias = [];
    iniciarCirculo({ curarJogador: false });
  }


  function textoTelegraph(acao) {
    if (acao === "defender") return TEXTO.rivalPreparaDefender;
    if (acao === "magia") return TEXTO.rivalPreparaMagia;
    return TEXTO.rivalPreparaAtacar;
  }

  async function telegraphInimigo(acao) {
    els.lutadorInimigo.classList.remove("is-telegraph-ataque", "is-telegraph-defesa", "is-telegraph-magia");
    fx3d("telegraph", acao);
    void els.lutadorInimigo.offsetWidth;
    const cls = acao === "defender"
      ? "is-telegraph-defesa"
      : acao === "magia"
        ? "is-telegraph-magia"
        : "is-telegraph-ataque";
    els.lutadorInimigo.classList.add(cls);
    relatar(textoTelegraph(acao));
    if (estado.audio) estado.audio.aviso();
    await esperar(acao === "magia" ? 720 : 580);
    els.lutadorInimigo.classList.remove(cls);
    fx3d("clearTelegraph");
  }

  async function turnoJogador(acao) {
    if (document.hidden || estado.pausaMenu || estado.ocupado || estado.tela !== "luta" || !els.modalFim.hidden) return;
    limparPrevia();
    if (acao === "magia" && estado.jogador.essencia < estado.jogador.magia.custo) {
      negarMagia();
      return;
    }
    dispensarDicaMinuto();
    limparPrevia();
    estado.ocupado = true;
    setBotoes(false);
    els.txtVez.textContent = TEXTO.resolvendo;
    estado.jogador.atingidoNestaRodada = false;
    estado.inimigo.atingidoNestaRodada = false;
    await resolverAcao("jogador", acao);
    const recapJogador = els.relato.textContent;
    if (algumMorreu()) {
      estado.stats.turnos += 1;
      encerrar(estado.inimigo.vida <= 0);
      return;
    }

    els.txtVez.textContent = TEXTO.vezInimigo;
    setVezInimigo(true);
    mostrarBannerTurno("rival");
    pintarHud();
    void els.txtVez.offsetWidth;
    await esperar(420);
    const acaoIA = escolherAcaoIA();
    await telegraphInimigo(acaoIA);
    await resolverAcao("inimigo", acaoIA);
    const recapInimigo = els.relato.textContent;
    if (algumMorreu()) {
      estado.stats.turnos += 1;
      encerrar(estado.inimigo.vida <= 0);
      return;
    }

    for (const lutador of [estado.jogador, estado.inimigo]) {
      if (lutador.guarda && !lutador.atingidoNestaRodada) {
        lutador.guarda = false;
      }
    }
    estado.rodada += 1;
    estado.stats.turnos += 1;
    els.arena.classList.remove("is-rodada");
    void els.arena.offsetWidth;
    els.arena.classList.add("is-rodada");
    els.txtVez.textContent = TEXTO.suaVezDrama;
    setVezInimigo(false);
    mostrarBannerTurno("sua");
    pintarHud();
    relatar(
      estado.jogador.contra
        ? `${recapInimigo} ${TEXTO.contraPronto}`
        : `${recapJogador} · ${recapInimigo}`
    );
    if (estado.audio) estado.audio.turno();
    estado.ocupado = false;
    setBotoes(true);
    gravarCampanha();
    window.setTimeout(() => els.arena.classList.remove("is-rodada"), 480);
  }

  /* ===== Onda 4: contra-golpe ===== */
  function armarContra(atorChave, alvo, resultado) {
    if (atorChave !== "inimigo" || !resultado.bloqueado || alvo !== estado.jogador) return;
    if (alvo.vida <= 0) return;
    alvo.contra = true;
    soltarNumero("jogador", "Contra!", "numero-flutuante--contra");
  }

  /* ===== Onda 4: leitura do rival (últimas ações) ===== */
  function registrarLeitura(acao) {
    estado.leitura.push(acao);
    if (estado.leitura.length > 4) estado.leitura.shift();
    pintarLeitura(true);
  }

  function pintarLeitura(nova) {
    if (!els.leituraTrilha) return;
    const nomes = { atacar: "ataque", defender: "guarda", magia: "magia" };
    const lista = estado.leitura;
    els.leituraTrilha.innerHTML = lista.length
      ? lista
          .map((a, idx) => {
            const ultimo = idx === lista.length - 1;
            const cls = `leitura__pip leitura__pip--${a}${ultimo && nova ? " is-nova" : ""}${ultimo ? " is-ultima" : ""}`;
            return `<li class="${cls}" title="${nomes[a] || a}"></li>`;
          })
          .join("")
      : `<li class="leitura__vazia">${TEXTO.leituraVazia}</li>`;
    if (els.leitura) {
      const falado = lista.map((a) => nomes[a] || a).join(", ");
      els.leitura.setAttribute("aria-label", lista.length ? `Últimas ações do rival: ${falado}` : TEXTO.leituraVazia);
    }
  }

  /* ===== Onda 4: segure a ação para ver o dano ===== */
  function faixaDano(ator, alvo, tipo) {
    const faixa = tipo === "magia" ? ator.magia : ator.ataque;
    const perf = tipo === "magia" ? ator.magia.perfuracao : 0;
    const mult = tipo === "atacar" && ator.contra ? BONUS_CONTRA : 1;
    const calc = (v) => {
      let d = Math.max(1, Math.round(v * mult));
      if (alvo.guarda) d = Math.max(1, Math.round(d * (1 - alvo.guardaReducao * (1 - perf))));
      return d;
    };
    return { min: calc(faixa.min), max: calc(faixa.max) };
  }

  function barraPrevia(trilha) {
    let el = trilha.querySelector(".barra__previa");
    if (!el) {
      el = document.createElement("div");
      el.className = "barra__previa";
      trilha.appendChild(el);
    }
    return el;
  }

  function mostrarPrevia(acao) {
    if (!combatePodeReceberAtalho() || estado.pausaMenu) return;
    const j = estado.jogador;
    const i = estado.inimigo;
    if (!j || !i) return;
    const relatoAntes = estado.previa ? estado.previa.relatoAntes : els.relato.textContent;
    limparPrevia(true);
    let texto = "";
    let trilha = null;
    let deMin = 0;
    let deMax = 0;
    let maximo = 1;
    if (acao === "defender") {
      const ganho = Math.min(j.essenciaDefesa, j.essenciaMax - j.essencia);
      texto = TEXTO.previaDefender(ganho, Math.round(j.guardaReducao * 100));
      trilha = document.getElementById("essencia-jogador-meter");
      maximo = j.essenciaMax;
      deMin = j.essencia;
      deMax = j.essencia + ganho;
    } else if (acao === "magia" && j.essencia < j.magia.custo) {
      texto = TEXTO.previaMagiaCurta(j.magia.custo - j.essencia);
    } else {
      const f = faixaDano(j, i, acao);
      const restoMin = Math.max(0, i.vida - f.max);
      const restoMax = Math.max(0, i.vida - f.min);
      texto = acao === "magia"
        ? TEXTO.previaMagia(f.min, f.max, i.nome, restoMin, restoMax, j.magia.custo)
        : TEXTO.previaAtaque(f.min, f.max, i.nome, restoMin, restoMax);
      if (restoMax <= 0) texto += TEXTO.previaKO;
      trilha = document.getElementById("vida-inimigo-meter");
      maximo = i.vidaMax;
      deMin = restoMin;
      deMax = i.vida;
    }
    els.relato.textContent = texto;
    els.relato.classList.add("is-previa");
    let barra = null;
    if (trilha) {
      barra = barraPrevia(trilha);
      const a = Math.max(0, Math.min(1, deMin / maximo));
      const b = Math.max(0, Math.min(1, deMax / maximo));
      barra.style.left = `${(a * 100).toFixed(2)}%`;
      barra.style.width = `${Math.max(0.6, (b - a) * 100).toFixed(2)}%`;
      barra.dataset.tipo = acao;
      barra.classList.add("is-on");
      trilha.closest(".placa")?.classList.add("is-previa");
    }
    estado.previa = { acao, relatoAntes, texto, barra };
  }

  function limparPrevia(manterRelato) {
    const p = estado.previa;
    if (!p) return;
    estado.previa = null;
    if (p.barra) {
      p.barra.classList.remove("is-on");
      p.barra.closest(".placa")?.classList.remove("is-previa");
    }
    els.relato.classList.remove("is-previa");
    if (!manterRelato && els.relato.textContent === p.texto) els.relato.textContent = p.relatoAntes;
  }

  function ligarPrevia() {
    let timer = null;
    let botao = null;
    let segurou = false;
    const SEGURAR_MS = 380;
    const reset = () => {
      window.clearTimeout(timer);
      timer = null;
      botao = null;
      segurou = false;
    };
    els.acoes.addEventListener("pointerdown", (ev) => {
      const btn = ev.target.closest("[data-acao]");
      if (!btn || btn.disabled || ev.button > 0) return;
      rippleNoBotao(btn, ev);
      reset();
      botao = btn;
      timer = window.setTimeout(() => {
        if (!botao) return;
        mostrarPrevia(botao.dataset.acao);
        if (!estado.previa) return;
        segurou = true;
        els.relato.textContent = estado.previa.texto + TEXTO.previaSolte;
        estado.previa.texto = els.relato.textContent;
        botao.classList.add("is-segurando");
        vibrar(8);
      }, SEGURAR_MS);
    });
    /* Na janela: o mouse pode soltar fora da barra de ações. */
    window.addEventListener("pointerup", (ev) => {
      if (!botao) return;
      const btn = botao;
      const foiSegurado = segurou;
      reset();
      if (btn) btn.classList.remove("is-segurando");
      if (!foiSegurado) return;
      /* Segurou: soltar em cima do mesmo botão age; fora, cancela. O clique nativo é ignorado. */
      estado.ignorarCliqueAte = Date.now() + 450;
      const sob = document.elementFromPoint(ev.clientX, ev.clientY);
      const alvo = sob && sob.closest ? sob.closest("[data-acao]") : null;
      if (alvo === btn && !btn.disabled) {
        garantirAudio();
        turnoJogador(btn.dataset.acao);
      } else {
        limparPrevia();
      }
    });
    window.addEventListener("pointercancel", () => {
      if (!botao) return;
      botao.classList.remove("is-segurando");
      reset();
      limparPrevia();
    });
    els.acoes.addEventListener("pointerleave", (ev) => {
      if (ev.pointerType === "mouse" && !botao) limparPrevia();
    });
    els.acoes.addEventListener("contextmenu", (ev) => {
      if (ev.target.closest("[data-acao]")) ev.preventDefault();
    });
    /* Mouse: passar por cima já mostra a prévia. */
    els.acoes.addEventListener("pointerover", (ev) => {
      if (ev.pointerType !== "mouse" || botao) return;
      const btn = ev.target.closest("[data-acao]");
      if (!btn || btn.disabled) return;
      if (estado.previa && estado.previa.acao === btn.dataset.acao) return;
      mostrarPrevia(btn.dataset.acao);
    });
  }

  /* ===== Onda 4: menu de pausa ===== */
  function podePausar() {
    return (estado.tela === "luta" || estado.tela === "descanso")
      && els.modalFim.hidden
      && els.modalTutorial.hidden
      && !estado.pausaMenu;
  }

  function atualizarBtnPausa() {
    if (!els.btnPausa) return;
    els.btnPausa.hidden = !(estado.tela === "luta" || estado.tela === "descanso");
  }

  function abrirPausa() {
    if (!els.modalPausa || !podePausar()) return;
    limparPrevia();
    estado.pausaMenu = true;
    window.dispatchEvent(new Event("luta:pausa"));
    const rival = rivalAtual();
    els.pausaTexto.textContent = estado.tela === "descanso"
      ? TEXTO.pausaDescanso(estado.circulo + 1)
      : TEXTO.pausaLuta(estado.circulo + 1, rival ? rival.nome : TEXTO.rival);
    atualizarPausaSom();
    els.modalPausa.hidden = false;
    els.app.classList.add("is-pausa-menu");
    if (estado.audio) estado.audio.ui();
    els.btnPausaVoltar.focus();
  }

  function atualizarPausaSom() {
    if (!els.btnPausaSom) return;
    els.btnPausaSom.textContent = estado.mudo ? "Som: desligado" : "Som: ligado";
    els.btnPausaSom.setAttribute("aria-pressed", estado.mudo ? "true" : "false");
  }

  function fecharPausa(silencioso) {
    if (!els.modalPausa) return;
    const estava = estado.pausaMenu;
    estado.pausaMenu = false;
    els.modalPausa.hidden = true;
    els.app.classList.remove("is-pausa-menu");
    if (estava) window.dispatchEvent(new Event("luta:pausa"));
    if (!silencioso && estava) {
      if (estado.audio) estado.audio.ui();
      if (estado.tela === "luta" && !estado.ocupado) els.btnAtacar.focus();
      else if (els.btnPausa) els.btnPausa.focus();
    }
  }

  function sairParaInicio() {
    /* A campanha já foi salva no fim do último turno / ao entrar no Respiro. */
    estado.geracao += 1;
    fecharPausa(true);
    limparPrevia();
    estado.ocupado = false;
    estado.jogador && (estado.jogador.contra = false);
    els.lutadorInimigo.classList.remove("is-telegraph-ataque", "is-telegraph-defesa", "is-telegraph-magia");
    fx3d("clearTelegraph");
    esconderKO();
    setVezInimigo(false);
    if (estado.fase !== "descanso") gravarCampanha();
    atualizarTituloBotoes();
    mostrarTela("titulo");
    const foco = els.btnContinuar.hidden ? els.btnComecar : els.btnContinuar;
    foco.focus();
  }

  function novaCampanha() {
    apagarCampanha();
    estado.circulo = 0;
    estado.fase = "luta";
    estado.jogador = clonarLutador(NARA);
    estado.melhorias = [];
    resetStats();
    iniciarCirculo({ curarJogador: true });
  }

  function continuarCampanha() {
    const save = lerCampanha();
    if (!save || !save.jogador || save.concluida) {
      novaCampanha();
      return;
    }
    if (!estado.stats || !estado.stats.turnos) resetStats();
    estado.circulo = Math.max(0, Math.min(TOTAL_CIRCULOS - 1, save.circulo | 0));
    estado.jogador = hidratarJogador(save.jogador);
    if (save.fase === "descanso") {
      estado.fase = "descanso";
      const ids = Array.isArray(save.melhorias) && save.melhorias.length
        ? save.melhorias
        : sortearMelhorias(estado.jogador).map((m) => m.id);
      estado.melhorias = ids.map(melhoriaPorId).filter(Boolean);
      if (!estado.melhorias.length) estado.melhorias = sortearMelhorias(estado.jogador);
      mostrarTela("descanso");
      pintarDescanso();
      return;
    }
    iniciarCirculo({ curarJogador: false });
  }

  function atualizarTituloBotoes() {
    pintarTituloMeta();
    const save = lerCampanha();
    const ativa = save && save.jogador && !save.concluida;
    els.btnContinuar.hidden = !ativa;
    if (ativa) {
      const n = Math.max(1, Math.min(TOTAL_CIRCULOS, (save.circulo | 0) + 1));
      els.btnContinuar.textContent = TEXTO.continuar(n);
    }
    els.btnComecar.hidden = ativa;
    els.btnNova.hidden = !ativa;
    if (!ativa) {
      els.btnComecar.textContent = save && save.concluida ? "Jogar de novo" : "Começar campanha";
    }
  }

  function mostrarTutorial(depois) {
    els.modalFim.hidden = true;
    estado.aposTutorial = depois || novaCampanha;
    estado.tutorialTravado = true;
    els.app.classList.add("is-tutorial");
    els.modalTutorial.hidden = false;
    els.btnEntendi.disabled = true;
    /* Evita o toque em Começar/Nova cair no Entendi (mesmo lugar da tela). */
    window.setTimeout(() => {
      if (els.modalTutorial.hidden) return;
      estado.tutorialTravado = false;
      els.btnEntendi.disabled = false;
      els.btnEntendi.focus();
    }, 550);
  }

  function fecharTutorial() {
    if (els.btnEntendi.disabled || estado.tutorialTravado) return;
    if (els.modalTutorial.hidden) return;
    estado.tutorialTravado = true;
    estado.viuTutorial = true;
    gravarFlag("tutorial", true);
    estado.ignorarTituloAte = Date.now() + 900;
    const cb = estado.aposTutorial || novaCampanha;
    estado.aposTutorial = null;
    cb();
    els.modalTutorial.hidden = true;
    els.app.classList.remove("is-tutorial");
    window.setTimeout(() => {
      estado.tutorialTravado = false;
    }, 900);
  }

  function garantirAudio() {
    if (!estado.audio) estado.audio = criarAudio();
    if (estado.audio) estado.audio.acordar();
  }

  function combatePodeReceberAtalho() {
    return estado.tela === "luta"
      && !document.hidden
      && !estado.ocupado
      && !estado.pausaMenu
      && els.modalFim.hidden
      && els.modalTutorial.hidden
      && els.telaDescanso.hidden;
  }

  function ligarEventos() {
    els.btnComecar.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!els.modalTutorial.hidden) return;
      garantirAudio();
      if (estado.audio) estado.audio.ui();
      mostrarTutorial(novaCampanha);
    });
    els.btnContinuar.addEventListener("click", () => {
      if (!els.modalTutorial.hidden) return;
      garantirAudio();
      if (estado.audio) estado.audio.ui();
      continuarCampanha();
    });
    els.btnNova.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (!els.modalTutorial.hidden) return;
      apagarCampanha();
      garantirAudio();
      if (estado.audio) estado.audio.ui();
      mostrarTutorial(novaCampanha);
    });
    els.btnEntendi.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      garantirAudio();
      if (estado.audio) estado.audio.ui();
      fecharTutorial();
    });
    els.btnSom.addEventListener("click", () => {
      estado.mudo = !estado.mudo;
      gravarFlag("mudo", estado.mudo);
      atualizarSomUi();
      atualizarPausaSom();
      if (!estado.mudo) garantirAudio();
    });
    els.acoes.addEventListener("click", (ev) => {
      const btn = ev.target.closest("[data-acao]");
      if (!btn || btn.disabled) return;
      if (Date.now() < (estado.ignorarCliqueAte || 0)) return;
      garantirAudio();
      turnoJogador(btn.dataset.acao);
    });
    ligarPrevia();
    if (els.btnPausa) {
      els.btnPausa.addEventListener("click", () => {
        garantirAudio();
        abrirPausa();
      });
      els.btnPausaVoltar.addEventListener("click", () => fecharPausa(false));
      els.btnPausaSom.addEventListener("click", () => els.btnSom.click());
      els.btnPausaSair.addEventListener("click", () => sairParaInicio());
      els.modalPausa.addEventListener("click", (ev) => {
        if (ev.target === els.modalPausa) fecharPausa(false);
      });
    }
    els.btnRetry.addEventListener("click", () => {
      garantirAudio();
      if (estado.fase === "concluida") {
        mostrarTutorial(novaCampanha);
        return;
      }
      iniciarCirculo({ curarJogador: true });
    });
    els.btnReiniciar.addEventListener("click", () => {
      garantirAudio();
      mostrarTutorial(novaCampanha);
    });
    els.btnInicio.addEventListener("click", () => {
      if (els.modalFim.hidden) return;
      els.modalFim.hidden = true;
      atualizarTituloBotoes();
      mostrarTela("titulo");
      const foco = els.btnContinuar.hidden ? els.btnComecar : els.btnContinuar;
      foco.focus();
    });
    /* Aba/app oculta mid-duelo: suspende áudio; timers (esperar) congelam; 3D não simula. */
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        try { estado.audio && estado.audio.suspend && estado.audio.suspend(); } catch (_) { /* ok */ }
        setPausaVisibilidade(true);
        return;
      }
      setPausaVisibilidade(false);
      try {
        if (!estado.mudo && estado.audio && estado.audio.resume) estado.audio.resume();
      } catch (_) { /* ok */ }
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape" || ev.key === "p" || ev.key === "P") {
        if (estado.pausaMenu) {
          ev.preventDefault();
          fecharPausa(false);
          return;
        }
        if (podePausar()) {
          ev.preventDefault();
          abrirPausa();
          return;
        }
      }
      if (estado.pausaMenu) return;
      if (ev.key === "s" || ev.key === "S") {
        if (ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA")) return;
        els.btnSom.click();
        return;
      }
      if (!els.modalTutorial.hidden && (ev.key === "Enter" || ev.key === " ")) {
        ev.preventDefault();
        if (!els.btnEntendi.disabled) els.btnEntendi.click();
        return;
      }
      if (estado.tela === "titulo" && (ev.key === "Enter" || ev.key === " ")) {
        if (!els.modalTutorial.hidden || Date.now() < estado.ignorarTituloAte) {
          ev.preventDefault();
          return;
        }
        ev.preventDefault();
        if (!els.btnContinuar.hidden) els.btnContinuar.click();
        else els.btnComecar.click();
        return;
      }
      const mapaLuta = { "1": "atacar", a: "atacar", A: "atacar", "2": "defender", d: "defender", D: "defender", "3": "magia", m: "magia", M: "magia" };
      if (mapaLuta[ev.key]) {
        if (!combatePodeReceberAtalho()) {
          ev.preventDefault();
          return;
        }
        ev.preventDefault();
        turnoJogador(mapaLuta[ev.key]);
      }
    });
  }

  function iniciar() {
    precarregarArtes();
    atualizarSomUi();
    atualizarTituloBotoes();
    pintarTituloMeta();
    mostrarTela("titulo");
    ligarEventos();
    document.title = TEXTO.titulo;
    els.app.dataset.versao = VERSAO;
    const verEl = document.getElementById("titulo-versao");
    if (verEl) verEl.textContent = `v${VERSAO}`;
  }

  iniciar();
})();
