import { getComputerChoice, playRound } from './game.js';
import {
  updateScore,
  updateMessage,
  isLocalStorageExist,
  STORAGE_KEY,
  PLAYER,
  COMPUTER,
  updateFinalMessage,
  ID_MESSAGE_RESULT
} from './ui.js';

// TODO: Select DOM elements
const playerSubmitButton = document.getElementById('player-submit-button');
const playerResetButton = document.getElementById('player-reset-button');
let playerScoreElement = document.getElementById('player-score');
let computerScoreElement = document.getElementById('computer-score');
let messageElement = document.getElementById('message');
let finalMessageElement = document.getElementById('final-message');
let gameRoundContainer = document.getElementById('game-round-container');
let gameBoardContainer = document.getElementById('game-board-container');
let playerStartButton = document.getElementById('player-start-button');
let roundNumberSignElement = document.getElementById('round-number-sign');

playerStartButton.addEventListener('click', () => startGame());
playerSubmitButton.addEventListener('click', () => game(playerChoice));
playerResetButton.addEventListener('click', () => resetScore());

// TODO: Initialize game variables
let playerChoice;
let bestOfRounds = 0;
const NEW_SELECTION = 'NEW_SELECTION';
const NEW_ROUND_SELECTION = 'NEW_ROUND_SELECTION';
const CALCULATE_SCORE = 'CALCULATE_SCORE';

// TODO: Add event listeners to choice buttons
const choices = document.getElementsByClassName('choice');
const rounds = document.getElementsByClassName('round');

// Main game logic
function game(playerChoice) {
  // TODO: Implement main game logic
  const computerChoice = getComputerChoice();
  const result = playRound(playerChoice, computerChoice);

  updateScore(result.playerScore, result.computerScore);
  updateMessage(result, playerChoice, computerChoice);
  document.dispatchEvent(new Event(CALCULATE_SCORE));
};

/**
 * Reset game score
 */
const resetScore = () => {
  const defaultScore = JSON.stringify({
    playerScore: 0,
    computerScore: 0
  });

  localStorage.setItem(STORAGE_KEY, defaultScore);
  loadDataFromLocalStorage();
  document.dispatchEvent(new Event(NEW_SELECTION));

  // CLEAN MESSAGE RESULT during BEST OF ROUND
  if (messageElement.childNodes.length > 0) {
    const element = document.getElementById(ID_MESSAGE_RESULT)
    element.remove();
  }

  // reset game
  gameRoundContainer.classList.toggle('hidden');
  gameBoardContainer.classList.toggle('hidden');
  document.dispatchEvent(new Event(NEW_ROUND_SELECTION));
  bestOfRounds = 0;
  playerStartButton.disabled = true;
  playerSubmitButton.disabled = false;
  
  // CLEAN BEST OF ROUND element
  roundNumberSignElement.innerHTML = '';

  // CLEAN FINAL MESSAGE RESULT
  finalMessageElement.innerHTML = '';
};

/**
 * Save best of round for the game
 */
const saveRound = () => {
  let roundNumbers = document.createElement("p");
  roundNumbers.setAttribute('id', 'round-numbers-text');
  roundNumbers.appendChild(document.createTextNode(bestOfRounds));

  roundNumberSignElement.appendChild(roundNumbers)
};

/**
 * Start the game
 */
const startGame = () => {
  gameRoundContainer.classList.toggle('hidden');
  gameBoardContainer.classList.toggle('hidden');

  saveRound();
};

/**
 * Load persistent data from browser local storage
 */
const loadDataFromLocalStorage = () => {
  const localStorageResult = JSON.parse(localStorage.getItem(STORAGE_KEY));

  playerScoreElement.innerText = localStorageResult.playerScore;
  computerScoreElement.innerText = localStorageResult.computerScore;
};

/**
 * Initialize best of round selection buttons
 */
const initRoundButtons = () => {
  for (let i = 0; i < choices.length; i++) {
    rounds[i].addEventListener('click', (e) => {
      bestOfRounds = parseInt(e.target.innerText);

      document.dispatchEvent(new Event(NEW_ROUND_SELECTION));
      rounds[i].classList.toggle('selected');
    });
  };
};

/**
 * Initialize rock paper scissor buttons
 */
const initJankenpoButtons = () => {
  for (let i = 0; i < choices.length; i++) {
    choices[i].addEventListener('click', (e) => {
      playerChoice = e.target.attributes[1].value
  
      document.dispatchEvent(new Event(NEW_SELECTION))
      choices[i].classList.toggle('selected');
    });
  };
};

/**
 * Event handler CALCULATE_SCORE for BEST OF ROUNDS
 */
document.addEventListener(CALCULATE_SCORE, () => {
  const localStorageResult = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const { playerScore, computerScore } = localStorageResult;

  switch (bestOfRounds) {
    case 3:
      if (playerScore === 2) {
        updateFinalMessage(PLAYER);
        playerSubmitButton.disabled = true;
      }

      if (computerScore === 2) {
        updateFinalMessage(COMPUTER);
        playerSubmitButton.disabled = true;
      }
    case 5:
      if (playerScore === 3) {
        updateFinalMessage(PLAYER);
        playerSubmitButton.disabled = true;
      }

      if (computerScore === 3) {
        updateFinalMessage(COMPUTER);
        playerSubmitButton.disabled = true;
      }
    default:
      if (playerScore === 4) {
        updateFinalMessage(PLAYER);
        playerSubmitButton.disabled = true;
      }

      if (computerScore === 4) {
        updateFinalMessage(COMPUTER);
        playerSubmitButton.disabled = true;
      }
  }
});

/**
 * Event handler NEW_SELECTION rock paper scissors
 */
document.addEventListener(NEW_SELECTION, () => {
  for (let i = 0; i < choices.length; i++) {
    choices[i].classList.remove('selected')
  };
});

/**
 * Event handler NEW_ROUND_SELECTION best of rounds
 */
document.addEventListener(NEW_ROUND_SELECTION, () => {
  for (let i = 0; i < rounds.length; i++) {
    rounds[i].classList.remove('selected')
  };

  playerStartButton.disabled = false;
});

/**
 * Actions taken when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  if (isLocalStorageExist()) {
    loadDataFromLocalStorage();
  }

  initRoundButtons();
  initJankenpoButtons();
});
