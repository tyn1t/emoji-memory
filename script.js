import translate, {
  currentLanguage,
  setLanguage
} from "./translations.js";

// DOM Elements - Navigation & Menus
const mainMenu = document.querySelector("#mainMenu");
const gameScreen = document.querySelector("#gameScreen");
const playButton = document.querySelector("#playButton");
const continueButton = document.querySelector("#continueButton");
const menuBestScore = document.querySelector("#menuBestScore");
const menuLevel = document.querySelector("#menuLevel");
const languageSelect = document.querySelector("#languageSelect");

// DOM Elements - Game Controls & HUD
const board = document.querySelector("#board");
const levelElement = document.querySelector("#level");
const scoreElement = document.querySelector("#score");
const attemptsElement = document.querySelector("#attempts");
const timeElement = document.querySelector("#time");
const progressElement = document.querySelector("#progress");
const messageElement = document.querySelector("#message");
const feedbackElement = document.querySelector("#feedback");
const restartButton = document.querySelector("#restart");
const hintButton = document.querySelector("#hintButton");

const LOCAL_SAVE_KEY = "emoji-memory-save";

let bestScore = 0;
let saveReady = false;
let saveQueue = Promise.resolve();

// ====================================================================
// SAVE / LOAD SYSTEM
// ====================================================================

function getSaveData() {
  return {
    version: 1,
    level: level,
    score: score,
    bestScore: bestScore
  };
}

async function saveProgress() {
  if (!saveReady) return;

  const rawData = JSON.stringify(getSaveData());

  // Validação estrita para o teste do SDK (< 3 MiB)
  if (new Blob([rawData]).size >= 3 * 1024 * 1024) {
    console.warn("Dados salvos excedem o limite de 3 MiB.");
    return;
  }

  if (
    typeof ytgame === "undefined" ||
    !ytgame.IN_PLAYABLES_ENV
  ) {
    try {
      localStorage.setItem(LOCAL_SAVE_KEY, rawData);
    } catch (error) {
      console.warn("Não foi possível salvar localmente.", error);
    }
    return;
  }

  saveQueue = saveQueue
    .catch(() => {})
    .then(() => ytgame.game.saveData(rawData));

  try {
    await saveQueue;
  } catch (error) {
    console.warn("Falha ao salvar na nuvem do YouTube.", error);
  }
}

function applySaveData(data) {
  if (!data || typeof data !== "object") return;

  const savedLevel = Number(data.level);
  const savedScore = Number(data.score);
  const savedBest = Number(data.bestScore);

  if (
    Number.isInteger(savedLevel) &&
    savedLevel >= 1 &&
    savedLevel <= pairsPerLevel.length
  ) {
    level = savedLevel;
  }

  if (Number.isSafeInteger(savedScore) && savedScore >= 0) {
    score = savedScore;
  }

  if (Number.isSafeInteger(savedBest) && savedBest >= 0) {
    bestScore = savedBest;
  }

  bestScore = Math.max(bestScore, score);
}

async function loadProgress() {
  try {
    let rawData = "";

    if (
      typeof ytgame !== "undefined" &&
      ytgame.IN_PLAYABLES_ENV
    ) {
      rawData = await ytgame.game.loadData();
    } else {
      rawData = localStorage.getItem(LOCAL_SAVE_KEY) || "";
    }

    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        applySaveData(data);
      } catch (error) {
        console.warn("Dados salvos inválidos.", error);
      }
    }
  } catch (error) {
    console.warn("Não foi possível carregar o progresso.", error);
  } finally {
    saveReady = true;
  }
}

// ====================================================================
// TRANSLATION & LOCALIZATION
// ====================================================================

function updateLanguage() {
  if (!languageSelect) return;

  const language = setLanguage(languageSelect.value);
  document.documentElement.lang = language;

  const mainMenuEyebrow = document.querySelector("#mainMenu .eyebrow");
  if (mainMenuEyebrow) mainMenuEyebrow.textContent = translate("subtitle");

  const headerEyebrow = document.querySelector(".header .eyebrow");
  if (headerEyebrow) headerEyebrow.textContent = translate("subtitle");

  const menuTitle = document.querySelector("#mainMenu h1");
  if (menuTitle) menuTitle.textContent = translate("title");

  const menuDesc = document.querySelector("#mainMenu > p:not(.eyebrow)");
  if (menuDesc) menuDesc.textContent = translate("description");

  const scoreLevelEl = document.querySelector(".ScoreLevel");
  if (scoreLevelEl) scoreLevelEl.textContent = translate("menuRecord").scoreLevel;

  const bestScoreEl = document.querySelector(".BestScore");
  if (bestScoreEl) bestScoreEl.textContent = translate("menuRecord").bestScore;

  if (playButton) playButton.textContent = translate("play");
  if (continueButton) continueButton.textContent = translate("continue");
  if (restartButton) restartButton.textContent = translate("restart");
  if (hintButton) hintButton.textContent = translate("hint");

  updateMenu();

  document.querySelectorAll(".stat").forEach((stat, index) => {
    const keys = ["phase", "score", "attempts", "time"];
    const labelSpan = stat.querySelector("span");
    if (labelSpan && keys[index]) {
      labelSpan.textContent = translate(keys[index]);
    }
  });

  if (!gameStarted && !gameFinished) {
    if (messageElement) messageElement.textContent = translate("message").findPairs;
    if (feedbackElement) feedbackElement.textContent = translate("feedback").goodLuck;
  }
}

if (languageSelect) {
  languageSelect.addEventListener("change", updateLanguage);
}

// ====================================================================
// ADS & MONETIZATION
// ====================================================================

async function showInterstitialAd() {
  if (
    typeof ytgame === "undefined" ||
    !ytgame.IN_PLAYABLES_ENV ||
    !ytgame.ads
  ) {
    return;
  }

  try {
    await ytgame.ads.requestInterstitialAd();
    console.log("Solicitação de anúncio concluída.");
  } catch (error) {
    console.warn("Não foi possível solicitar o anúncio.", error);
  }
}

// ====================================================================
// GAME STATE & CONSTANTS
// ====================================================================

const emojis = [
  "🚀", "🍎", "🎮", "🐱", "🌎", "⚽",
  "🍕", "🐸", "🎸", "🌈", "🦊", "💎",
  "🐼", "🍉", "🔥", "⭐", "🦄", "🎯"
];

const pairsPerLevel = [6, 8, 10, 12, 15, 18];

let level = 1;
let score = 0;
let attempts = 0;
let matchedPairs = 0;

let firstCard = null;
let locked = false;
let timer = null;
let seconds = 0;
let gameStarted = false;
let gameFinished = false;
let mismatchTimeout = null;

// ====================================================================
// UTILITY FUNCTIONS
// ====================================================================

function updateAccessibleProgress(percentage) {
  const progressTrack = document.querySelector(".progress-track");
  if (!progressTrack) return;

  const value = Math.max(0, Math.min(100, percentage));
  progressTrack.setAttribute("aria-valuenow", value);
  progressTrack.setAttribute("aria-valuetext", `${Math.round(value)}% concluído`);
}

function updateMenu() {
  if (menuBestScore) menuBestScore.textContent = bestScore;
  if (menuLevel) menuLevel.textContent = level;
}

function showMenu() {
  stopTimer();
  if (mainMenu) mainMenu.hidden = false;
  if (gameScreen) gameScreen.hidden = true;
  updateMenu();
}

function playGame(continueSaved = false) {
  if (!continueSaved) {
    level = 1;
    score = 0;
  }

  if (mainMenu) mainMenu.hidden = true;
  if (gameScreen) gameScreen.hidden = false;

  startLevel();
}

if (playButton) {
  playButton.addEventListener("click", () => playGame(false));
}

if (continueButton) {
  continueButton.addEventListener("click", () => playGame(true));
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getPairCount() {
  return pairsPerLevel[Math.min(level - 1, pairsPerLevel.length - 1)];
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const secondsLeft = totalSeconds % 60;
  return (
    String(minutes).padStart(2, "0") +
    ":" +
    String(secondsLeft).padStart(2, "0")
  );
}

function updateStats() {
  if (levelElement) levelElement.textContent = level;
  if (scoreElement) scoreElement.textContent = score;
  if (attemptsElement) attemptsElement.textContent = attempts;
  if (timeElement) timeElement.textContent = formatTime(seconds);

  const totalPairs = getPairCount();
  const percentage = (matchedPairs / totalPairs) * 100;

  if (progressElement) {
    progressElement.style.width = `${percentage}%`;
  }
  updateAccessibleProgress(percentage);
}

function startTimer() {
  if (timer !== null) return;

  timer = setInterval(() => {
    seconds++;
    if (timeElement) timeElement.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  if (timer !== null) {
    clearInterval(timer);
    timer = null;
  }
}

// ====================================================================
// BOARD & GAMEPLAY LOGIC
// ====================================================================

function createCard(emoji, index) {
  const card = document.createElement("button");

  card.type = "button";
  card.className = "card";
  card.dataset.emoji = emoji;
  card.dataset.index = index;
  card.textContent = "❔";
  card.setAttribute("aria-label", "Carta fechada");

  card.addEventListener("click", () => {
    handleCardClick(card);
  });

  return card;
}

function renderBoard() {
  if (!board) return;
  board.innerHTML = "";

  const pairCount = getPairCount();
  const selectedEmojis = shuffle(emojis).slice(0, pairCount);

  const cards = shuffle([
    ...selectedEmojis,
    ...selectedEmojis
  ]);

  const columns = pairCount <= 6 ? 4 : 5;
  board.style.gridTemplateColumns = `repeat(${columns}, minmax(0, 1fr))`;

  cards.forEach((emoji, index) => {
    board.appendChild(createCard(emoji, index));
  });
}

function revealCard(card) {
  card.classList.add("revealed");
  card.textContent = card.dataset.emoji;
  card.setAttribute("aria-label", `Carta revelada: ${card.dataset.emoji}`);
}

function hideCard(card) {
  card.classList.remove("revealed");
  card.textContent = "❔";
  card.setAttribute("aria-label", "Carta fechada");
}

function handleCardClick(card) {
  if (
    locked ||
    gameFinished ||
    card.classList.contains("revealed") ||
    card.classList.contains("matched")
  ) {
    return;
  }

  if (!gameStarted) {
    gameStarted = true;
    startTimer();
  }

  revealCard(card);

  if (firstCard === null) {
    firstCard = card;
    if (feedbackElement) feedbackElement.textContent = translate("feedback").findPair;
    return;
  }

  attempts++;

  const secondCard = card;
  locked = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.disabled = true;
    secondCard.disabled = true;

    firstCard.setAttribute("aria-label", "Par encontrado");
    secondCard.setAttribute("aria-label", "Par encontrado");

    matchedPairs++;
    score += 100;

    if (feedbackElement) feedbackElement.textContent = translate("feedback").matched;

    firstCard = null;
    locked = false;

    updateStats();

    if (matchedPairs === getPairCount()) {
      finishLevel();
    }
    return;
  }

  if (feedbackElement) feedbackElement.textContent = translate("feedback").mismatch;

  mismatchTimeout = setTimeout(() => {
    hideCard(firstCard);
    hideCard(secondCard);

    firstCard = null;
    locked = false;
    mismatchTimeout = null;

    updateStats();
  }, 800);

  updateStats();
}

async function finishLevel() {
  stopTimer();

  const bonus = Math.max(0, 500 - attempts * 10);
  score += bonus;

  bestScore = Math.max(bestScore, score);

  updateStats();
  await saveProgress();

  if (level < pairsPerLevel.length) {
    if (messageElement) messageElement.textContent = translate("message").phaseCompleted(level);
    if (feedbackElement) feedbackElement.textContent = translate("feedback").bonus(bonus);

    locked = true;

    setTimeout(async () => {
      level++;
      await saveProgress();
      startLevel();
    }, 1400);

  } else {
    gameFinished = true;
    locked = true;

    if (messageElement) messageElement.textContent = translate("message").victory;
    if (feedbackElement) feedbackElement.textContent = translate("feedback").finalScore(score);

  }
}

function startLevel() {
  stopTimer();

  if (mismatchTimeout !== null) {
    clearTimeout(mismatchTimeout);
    mismatchTimeout = null;
  }

  firstCard = null;
  locked = false;
  matchedPairs = 0;
  attempts = 0;
  seconds = 0;
  gameStarted = false;
  gameFinished = false;

  if (messageElement) messageElement.textContent = translate("message").findPairs;
  if (feedbackElement) feedbackElement.textContent = translate("feedback").goodLuck;

  renderBoard();
  updateStats();
}

function restartGame() {
  stopTimer();

  if (mismatchTimeout !== null) {
    clearTimeout(mismatchTimeout);
    mismatchTimeout = null;
  }

  level = 1;
  score = 0;
  startLevel();
}

if (restartButton) {
  restartButton.addEventListener("click", restartGame);
}

// ====================================================================
// HINT SYSTEM (REWARDED ADS)
// ====================================================================

if (hintButton) {
  hintButton.addEventListener("click", async () => {
    const sdkAvailable =
      typeof ytgame !== "undefined" &&
      ytgame.ads &&
      typeof ytgame.ads.requestRewardedAd === "function";

    if (!sdkAvailable || !ytgame.IN_PLAYABLES_ENV) {
      if (feedbackElement) feedbackElement.textContent = translate("feedback").rewardAvailable;
      return;
    }

    if (locked || gameFinished) return;

    hintButton.disabled = true;

    try {
      const rewardEarned = await ytgame.ads.requestRewardedAd("memory-hint");

      if (rewardEarned) {
        revealHint();
      } else {
        if (feedbackElement) feedbackElement.textContent = translate("feedback").rewardNotUnlocked;
      }
    } catch (error) {
      if (feedbackElement) feedbackElement.textContent = translate("feedback").adError;
    } finally {
      hintButton.disabled = false;
    }
  });
}

function revealHint() {
  if (!board) return;

  const unmatchedCards = [...board.querySelectorAll(".card:not(.matched)")];

  if (locked || firstCard !== null || unmatchedCards.length < 2) {
    if (feedbackElement) feedbackElement.textContent = translate("feedback").hintLocked;
    return;
  }

  const emojiCounts = new Map();
  unmatchedCards.forEach((card) => {
    const emoji = card.dataset.emoji;
    emojiCounts.set(emoji, (emojiCounts.get(emoji) || 0) + 1);
  });

  const availablePairs = [...emojiCounts.entries()]
    .filter(([, count]) => count === 2)
    .map(([emoji]) => emoji);

  if (availablePairs.length === 0) return;

  const emoji = availablePairs[Math.floor(Math.random() * availablePairs.length)];
  const pair = unmatchedCards.filter((card) => card.dataset.emoji === emoji);

  pair.forEach((card) => revealCard(card));
  locked = true;

  if (feedbackElement) feedbackElement.textContent = translate("feedback").hintRevealed;

  setTimeout(() => {
    pair.forEach((card) => hideCard(card));
    locked = false;
    if (feedbackElement) feedbackElement.textContent = translate("feedback").findPair;
  }, 1200);
}

// ====================================================================
// YOUTUBE PLAYABLES HIGH SCORE SUBMISSION
// ====================================================================

async function submitScore(score) {
    if (
        typeof ytgame === "undefined" ||
        !ytgame.engagement?.sendScore
    ) {
        return;
    }

    const scoreToSend = Math.floor(Number(score));

    if (!Number.isSafeInteger(scoreToSend) || scoreToSend < 0) {
        return;
    }

    try {
        await ytgame.engagement.sendScore({
            value: scoreToSend
        });

        console.log("Score enviado:", scoreToSend);
    } catch (error) {
        console.error("Erro ao enviar score:", error);
    }
}
// ====================================================================
// INITIALIZATION
// ====================================================================

async function initializeGame() {
  await loadProgress();
  updateLanguage();

  bestScore = Math.max(bestScore, score);

  updateStats();
  await saveProgress();
  await submitScore(bestScore);
  showMenu();

 if (
    typeof ytgame !== "undefined" &&
    ytgame.IN_PLAYABLES_ENV &&
    ytgame.game
  ) {
    ytgame.game.firstFrameReady();
    ytgame.game.gameReady();
  }
}

initializeGame();