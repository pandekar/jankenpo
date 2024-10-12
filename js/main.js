import { getComputerChoice, playRound } from './game.js';
import { updateScore, updateMessage, isLocalStorageExist, STORAGE_KEY } from './ui.js';

// TODO: Select DOM elements
const playerSubmitButton = document.getElementById('player-submit-button');
let playerScoreElement = document.getElementById('player-score');
let computerScoreElement = document.getElementById('computer-score');

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

playerSubmitButton.addEventListener('click', () => game(playerChoice));

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
