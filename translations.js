const translations = {
  "pt-BR": {
    subtitle: "DESAFIO DA MEMÓRIA",
    title: "🧠 Emoji Memory",
    description: "Combine os pares e desbloqueie novas fases!",
    play: "▶ Jogar",
    continue: "↻ Continuar partida",
    restart: "Reiniciar jogo",
    hint: "🎁 Ganhar uma dica",
    phase: "Fase",
    score: "Pontos",
    attempts: "Tentativas",
    time: "Tempo",
    menuRecord: {
      scoreLevel: "🔓 Fase:",
      bestScore: "🏆 Recorde:"
    },
    message: {
      findPairs: "Encontre todos os pares!",
      phaseCompleted: (level) => `Fase ${level} concluída!`,
      victory: "🎉 Parabéns! Você completou todas as fases!"
    },
    feedback: {
      goodLuck: "Boa sorte!",
      findPair: "Encontre o par correspondente.",
      matched: "Par encontrado! 🎉",
      mismatch: "Não foi dessa vez. Tente novamente!",
      bonus: (bonus) => `Bônus de tempo/tentativas: +${bonus} pts`,
      finalScore: (score) => `Pontuação final: ${score} pts`,
      rewardAvailable: "Anúncios de recompensa indisponíveis no momento.",
      rewardNotUnlocked: "Recompensa não desbloqueada.",
      adError: "Erro ao carregar o anúncio.",
      hintLocked: "Dica indisponível no momento.",
      hintRevealed: "Dica revelada! Olhe bem as cartas."
    }
  },
  en: {
    subtitle: "MEMORY CHALLENGE",
    title: "🧠 Emoji Memory",
    description: "Match the pairs and unlock new levels!",
    play: "▶ Play",
    continue: "↻ Continue Game",
    restart: "Restart Game",
    hint: "🎁 Get a Hint",
    phase: "Level",
    score: "Score",
    attempts: "Attempts",
    time: "Time",
    menuRecord: {
      scoreLevel: "🔓 Level:",
      bestScore: "🏆 Best Score:"
    },
    message: {
      findPairs: "Find all the pairs!",
      phaseCompleted: (level) => `Level ${level} completed!`,
      victory: "🎉 Congratulations! You completed all levels!"
    },
    feedback: {
      goodLuck: "Good luck!",
      findPair: "Find the matching pair.",
      matched: "Match found! 🎉",
      mismatch: "Not quite. Try again!",
      bonus: (bonus) => `Time/Attempts bonus: +${bonus} pts`,
      finalScore: (score) => `Final score: ${score} pts`,
      rewardAvailable: "Rewarded ads currently unavailable.",
      rewardNotUnlocked: "Reward not unlocked.",
      adError: "Error loading ad.",
      hintLocked: "Hint currently unavailable.",
      hintRevealed: "Hint revealed! Look closely."
    }
  },
  es: {
    subtitle: "DESAFÍO DE MEMORIA",
    title: "🧠 Emoji Memory",
    description: "¡Combina las parejas y desbloquea nuevos niveles!",
    play: "▶ Jugar",
    continue: "↻ Continuar partida",
    restart: "Reiniciar juego",
    hint: "🎁 Obtener pista",
    phase: "Nivel",
    score: "Puntos",
    attempts: "Intentos",
    time: "Tiempo",
    menuRecord: {
      scoreLevel: "🔓 Nivel:",
      bestScore: "🏆 Récord:"
    },
    message: {
      findPairs: "¡Encuentra todas las parejas!",
      phaseCompleted: (level) => `¡Nivel ${level} completado!`,
      victory: "🎉 ¡Felicitaciones! ¡Completaste todos los niveles!"
    },
    feedback: {
      goodLuck: "¡Buena suerte!",
      findPair: "Encuentra la pareja correspondiente.",
      matched: "¡Pareja encontrada! 🎉",
      mismatch: "No fue así. ¡Inténtalo de nuevo!",
      bonus: (bonus) => `Bono de tiempo/intentos: +${bonus} pts`,
      finalScore: (score) => `Puntuación final: ${score} pts`,
      rewardAvailable: "Anuncios de recompensa no disponibles.",
      rewardNotUnlocked: "Recompensa no desbloqueada.",
      adError: "Error al cargar el anuncio.",
      hintLocked: "Pista no disponible en este momento.",
      hintRevealed: "¡Pista revelada! Mira bien las cartas."
    }
  },
  fr: {
    subtitle: "DÉFI MÉMOIRE",
    title: "🧠 Emoji Memory",
    description: "Associez les paires et débloquez de nouveaux niveaux !",
    play: "▶ Jouer",
    continue: "↻ Continuer",
    restart: "Recommencer",
    hint: "🎁 Obtenir un indice",
    phase: "Niveau",
    score: "Score",
    attempts: "Essais",
    time: "Temps",
    menuRecord: {
      scoreLevel: "🔓 Niveau :",
      bestScore: "🏆 Meilleurs score :"
    },
    message: {
      findPairs: "Trouvez toutes les paires !",
      phaseCompleted: (level) => `Niveau ${level} terminé !`,
      victory: "🎉 Félicitations ! Vous avez terminé tous les niveaux !"
    },
    feedback: {
      goodLuck: "Bonne chance !",
      findPair: "Trouvez la paire correspondante.",
      matched: "Paire trouvée ! 🎉",
      mismatch: "Raté. Réessayez !",
      bonus: (bonus) => `Bonus temps/essais : +${bonus} pts`,
      finalScore: (score) => `Score final : ${score} pts`,
      rewardAvailable: "Publicités récompensées indisponibles.",
      rewardNotUnlocked: "Récompense non débloquée.",
      adError: "Erreur de chargement de la publicité.",
      hintLocked: "Indice indisponible pour le moment.",
      hintRevealed: "Indice révélé ! Regardez bien."
    }
  },
  de: {
    subtitle: "GEDÄCHTNIS-HERAUSFORDERUNG",
    title: "🧠 Emoji Memory",
    description: "Finde die Paare und schalte neue Level frei!",
    play: "▶ Spielen",
    continue: "↻ Fortsetzen",
    restart: "Neu starten",
    hint: "🎁 Hinweis erhalten",
    phase: "Level",
    score: "Punkte",
    attempts: "Versuche",
    time: "Zeit",
    menuRecord: {
      scoreLevel: "🔓 Level:",
      bestScore: "🏆 Bestwert:"
    },
    message: {
      findPairs: "Finde alle Paare!",
      phaseCompleted: (level) => `Level ${level} abgeschlossen!`,
      victory: "🎉 Glückwunsch! Du hast alle Level geschafft!"
    },
    feedback: {
      goodLuck: "Viel Glück!",
      findPair: "Finde das passende Paar.",
      matched: "Paar gefunden! 🎉",
      mismatch: "Leider falsch. Versuch es noch einmal!",
      bonus: (bonus) => `Zeit-/Versuchs-Bonus: +${bonus} Pkt`,
      finalScore: (score) => `Endstand: ${score} Pkt`,
      rewardAvailable: "Belohnte Werbung derzeit nicht verfügbar.",
      rewardNotUnlocked: "Belohnung nicht freigeschaltet.",
      adError: "Fehler beim Laden der Werbung.",
      hintLocked: "Hinweis derzeit nicht verfügbar.",
      hintRevealed: "Hinweis aufgedeckt! Schau genau hin."
    }
  },
  ja: {
    subtitle: "メモリーチャレンジ",
    title: "🧠 絵文字メモリー",
    description: "ペアを見つけて新しいステージをアンロックしよう！",
    play: "▶ プレイ",
    continue: "↻ つづきから",
    restart: "リスタート",
    hint: "🎁 ヒントを見る",
    phase: "ステージ",
    score: "スコア",
    attempts: "試行回数",
    time: "タイム",
    menuRecord: {
      scoreLevel: "🔓 ステージ:",
      bestScore: "🏆 ベストスコア:"
    },
    message: {
      findPairs: "すべてのペアを見つけよう！",
      phaseCompleted: (level) => `ステージ ${level} クリア！`,
      victory: "🎉 おめでとうございます！全ステージクリアです！"
    },
    feedback: {
      goodLuck: "がんばって！",
      findPair: "同じ絵文字のペアを探そう。",
      matched: "ペア発見！ 🎉",
      mismatch: "ざんねん！もう一度挑戦してね。",
      bonus: (bonus) => `ボーナスポイント: +${bonus} pt`,
      finalScore: (score) => `最終スコア: ${score} pt`,
      rewardAvailable: "現在リワード広告を利用できません。",
      rewardNotUnlocked: "報酬がアンロックされませんでした。",
      adError: "広告の読み込みに失敗しました。",
      hintLocked: "現在ヒントは使えません。",
      hintRevealed: "ヒント公開！カードをよく見てね。"
    }
  }
};

export let currentLanguage = "pt-BR";

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
  }
  return currentLanguage;
}

export default function translate(keyPath) {
  const keys = keyPath.split(".");
  let result = translations[currentLanguage];

  for (const key of keys) {
    if (result && result[key] !== undefined) {
      result = result[key];
    } else {
      // Fallback para português caso falte alguma chave
      let fallback = translations["pt-BR"];
      for (const k of keys) {
        if (fallback && fallback[k] !== undefined) {
          fallback = fallback[k];
        } else {
          return keyPath;
        }
      }
      return fallback;
    }
  }
  return result;
}