import { getComputerChoice, playRound } from './game.js';
import { updateScore, updateMessage, isLocalStorageExist, STORAGE_KEY } from './ui.js';

// TODO: Select DOM elements
const playerSubmitButton = document.getElementById('player-submit-button');
const playerResetButton = document.getElementById('player-reset-button');
let playerScoreElement = document.getElementById('player-score');
let computerScoreElement = document.getElementById('computer-score');
let messageElement = document.getElementById('message');

// TODO: Initialize game variables
let playerChoice;

// TODO: Add event listeners to choice buttons
const choices = document.getElementsByClassName('choice');
for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener('click', (e) => {
    playerChoice = e.target.attributes[1].value
  });
};

// Main game logic
function game(playerChoice) {
  // TODO: Implement main game logic
  const computerChoice = getComputerChoice();
  const result = playRound(playerChoice, computerChoice);

  updateScore(result.playerScore, result.computerScore);
  updateMessage(result, playerChoice, computerChoice);
};

const resetScore = () => {
  const defaultScore = JSON.stringify({
    playerScore: 0,
    computerScore: 0
  });

  localStorage.setItem(STORAGE_KEY, defaultScore);
  loadDataFromLocalStorage();
  if (messageElement.childNodes.length > 0) {
    const element = document.getElementById('message-result')
    element.remove();
  }
};

playerSubmitButton.addEventListener('click', () => game(playerChoice));
playerResetButton.addEventListener('click', () => resetScore());

const loadDataFromLocalStorage = () => {
  const localStorageResult = JSON.parse(localStorage.getItem(STORAGE_KEY));

  playerScoreElement.innerText = localStorageResult.playerScore;
  computerScoreElement.innerText = localStorageResult.computerScore;
};

document.addEventListener('DOMContentLoaded', () => {
  if (isLocalStorageExist()) {
    loadDataFromLocalStorage();
  }
});
