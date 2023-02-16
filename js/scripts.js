const board = document.getElementById("quadro");
const cells = document.querySelectorAll("td");
const result = document.getElementById("resultado");
const startGameButton = document.getElementById("start-game-button");
const resetGameButton = document.getElementById("reset-game-button");

//const scoreX = document.getElementById("score-x");
//const scoreO = document.getElementById("score-o");

let currentPlayer = "x"; // Mantém o jogador atual
let gameOver = false; // Mantém o estado de fim de jogo

// Adiciona o evento de clique ao botão de início de jogo
startGameButton.addEventListener("click", startGame);

// Adiciona o evento de clique ao botão de reset de jogo
resetGameButton.addEventListener("click", startGame);

// Chama a função startGame para iniciar o jogo
startGame();

// Função para iniciar o jogo
function startGame() {
  gameOver = false; // Atualiza o estado de fim de jogo
  currentPlayer = "x"; // Atualiza o jogador atual
  result.textContent = ""; // Limpa o resultado da rodada anterior

  // Limpa o conteúdo de cada célula
  cells.forEach((cell) => {
    cell.textContent = "";
  });

  playTurn(); // Chama a função para jogar
}

// Função para jogar a vez
function playTurn() {
  // Verifica se o jogo já acabou
  if (gameOver) {
    return;
  }

  let emptyCells = []; // Mantém as células vazias
  // Percorre cada célula
  cells.forEach((cell, index) => {
    // Verifica se a célula está vazia
    if (cell.textContent === "") {
      // Adiciona a célula à lista de células vazias
      emptyCells.push(index);
    }
  });

  // Verifica se não há mais células vazias
  if (emptyCells.length === 0) {
    result.textContent = "Empate!"; // Atualiza o resultado para "Empate"
    gameOver = true; // Atualiza o estado de fim de jogo
    return;
  }

  // Seleciona uma célula vazia aleatória
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  let selectedCell = cells[emptyCells[randomIndex]];
  selectedCell.textContent = currentPlayer;

  // Verifica se o jogador atual venceu
  if (checkWin(currentPlayer)) {
    result.textContent = `O Computador ${currentPlayer.toUpperCase()} venceu!`;
    gameOver = true; // Atualiza o estado de fim de jogo
  } else {
    // Atualiza o jogador atual caso não haja vencedor
currentPlayer = currentPlayer === "x" ? "o" : "x";
setTimeout(playTurn, 1000); // Chama a função de jogada novamente após 1 segundo
}
}

// Função que verifica se o jogador atual venceu
function checkWin(player) {
// Combinações vitoriosas
const winningCombinations = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];

// Verifica cada combinação vitoriosa
for (let i = 0; i < winningCombinations.length; i++) {
const combination = winningCombinations[i];
// Verifica se todas as células da combinação são iguais ao jogador atual
if (
cells[combination[0]].textContent === player &&
cells[combination[1]].textContent === player &&
cells[combination[2]].textContent === player
) {
return true; // O jogador atual venceu
}
}
return false; // Não houve vencedor
}
