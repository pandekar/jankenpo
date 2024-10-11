import { getComputerChoice, playRound } from './game.js';
import { updateScore, updateMessage } from './ui.js';

// TODO: Select DOM elements
const playerSubmitButton = document.getElementById('player-submit-button');

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
