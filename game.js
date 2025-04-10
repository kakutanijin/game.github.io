const nameForm = document.getElementById("nameForm");
const gameArea = document.getElementById("gameArea");
const resultText = document.getElementById("resultText");
const status = document.getElementById("status");

let playerName = "";
let winCount = 0;

// 名前フォームが送信されたときの処理
nameForm.addEventListener("submit", function(e) {
  e.preventDefault(); // ページがリロードされないように
  const input = document.getElementById("playerName");
  playerName = input.value || "ななしさん";
  nameForm.style.display = "none";
  gameArea.style.display = "block";
  status.textContent = `がんばってね、${playerName}！`;
});

let correctDirection = "";
let directionResultText = document.getElementById("directionResult");
let directionArea = document.getElementById("directionArea");
const jankenButtons = gameArea.querySelectorAll('button'); // じゃんけんボタンを取得
const directionButtons = directionArea.querySelectorAll('button'); // あっち向いてホイボタンを取得

function playJanken(playerHand) {
  const hands = ["グー", "チョキ", "パー"];
  const cpuHand = hands[Math.floor(Math.random() * 3)];

  let result = "";

  if (playerHand === cpuHand) {
    result = "あいこ！もう一回";
  } else if (
    (playerHand === "グー" && cpuHand === "チョキ") ||
    (playerHand === "チョキ" && cpuHand === "パー") ||
    (playerHand === "パー" && cpuHand === "グー")
  ) {
    result = `勝ち！ あっち向いてホイへ！`;
    // 勝ったので、あっち向いてホイに進む
    status.textContent = "あっち向いてホイ！方向を選んでね。";
    directionArea.style.display = "block";
    correctDirection = ["上", "下", "左", "右"][Math.floor(Math.random() * 4)]; // ランダムで方向を決める
    gameArea.style.display = "none";
  } else {
    result = `負け！ゲーム終了！あなたのスコア: ${winCount}勝`;
    resultText.textContent = `あなた: ${playerHand} / 相手: ${cpuHand} → ${result}`;
    gameOver(); // ゲーム終了処理を呼び出す
  }

  resultText.textContent = `あなた: ${playerHand} / 相手: ${cpuHand} → ${result}`;
}

// あっち向いてホイで方向を選んだとき
function selectDirection(selectedDirection) {
  if (selectedDirection === correctDirection) {
    directionResultText.textContent = "正解！おめでとう！";
    status.textContent = "次の戦いへ！";
    winCount++; // 正解したので勝ち数を増やす
    // → ここで次の戦いに進む（じゃんけんに戻る）
    setTimeout(resetGame, 2000); // 2秒後に次の戦いに進む
  } else {
    directionResultText.textContent = `残念！正解は「${correctDirection}」でした。`;
    status.textContent = `ゲーム終了！あなたのスコア: ${winCount}勝`;
    gameOver(); // ゲーム終了処理を呼び出す
  }
}

// ゲーム終了時の処理
function gameOver() {
  status.textContent = `ゲーム終了！あなたのスコア: ${winCount}勝`;
  // じゃんけんボタンを非表示
  jankenButtons.forEach(button => {
    button.style.display = 'none';
  });
  // あっち向いてホイボタンを非表示
  directionButtons.forEach(button => {
    button.style.display = 'none';
  });
  gameArea.style.display = 'block'; // ゲームエリアは表示したまま
  directionArea.style.display = 'none';
  directionResultText.textContent = "";
  correctDirection = "";
}

// ゲームをリセットして次の戦いに進む
function resetGame() {
  gameArea.style.display = "block";
  directionArea.style.display = "none";
  resultText.textContent = "";
  directionResultText.textContent = "";
  correctDirection = "";
  status.textContent = "じゃんけんしよう！";
  // じゃんけんボタンを再表示
  jankenButtons.forEach(button => {
    button.style.display = 'inline-block';
  });
  // あっち向いてホイボタンを再表示
  directionButtons.forEach(button => {
    button.style.display = 'inline-block';
  });
}
