const CONSTANTS  = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSOR: 'scissors'
};

const CHOICES = [CONSTANTS.ROCK, CONSTANTS.PAPER, CONSTANTS.SCISSOR];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export function getComputerChoice() {
  // TODO: Implement computer choice logic
  return CHOICES[getRandomInt(CHOICES.length)];
};

export function playRound(playerChoice, computerChoice) {
  // TODO: Implement round logic
  let scores = {
    playerScore: 0,
    computerScore: 0
  };

  if (playerChoice === CONSTANTS.ROCK && computerChoice === CONSTANTS.SCISSOR) {
    scores.playerScore += 1;
  }

  if (playerChoice === CONSTANTS.ROCK && computerChoice === CONSTANTS.PAPER) {
    scores.computerScore += 1;
  }

  if (playerChoice === CONSTANTS.PAPER && computerChoice === CONSTANTS.ROCK) {
    scores.playerScore += 1;
  }

  if (playerChoice === CONSTANTS.PAPER && computerChoice === CONSTANTS.SCISSOR) {
    scores.computerScore += 1;
  }

  if (playerChoice === CONSTANTS.SCISSOR && computerChoice === CONSTANTS.PAPER) {
    scores.playerScore += 1;
  }

  if (playerChoice === CONSTANTS.SCISSOR && computerChoice === CONSTANTS.ROCK) {
    scores.computerScore += 1;
  }

  return scores;
};
