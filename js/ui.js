export function updateScore(playerScore, computerScore) {
  // TODO: Implement score update logic
  let playerScoreElement = document.getElementById('player-score');
  let computerScoreElement = document.getElementById('computer-score');

  const currentPlayerScore = parseInt(playerScoreElement.innerText);
  const currentComputerScore = parseInt(computerScoreElement.innerText);

  const updatedPlayerScore = currentPlayerScore + playerScore;
  const updatedComputerScore = currentComputerScore + computerScore;

  playerScoreElement.innerText = updatedPlayerScore;
  computerScoreElement.innerText = updatedComputerScore;
};

export function updateMessage(result, playerChoice, computerChoice) {
  // TODO: Implement message update logic
  let messageElement = document.getElementById('message');
  let message = '';

  if (result.playerScore === result.computerScore) {
    message = 'it\'s a DRAW';
  } else if (result.playerScore === 1) {
    message = 'Player WINS'
  } else {
    message = 'Computer WINS'
  }
  
  const playerIntro = document.createTextNode(`Player uses ${playerChoice.toUpperCase()}\n`);
  const computerIntro = document.createTextNode(`Computer uses ${computerChoice.toUpperCase()}\n`);
  const resultIntro = document.createTextNode(message)

  let intro = document.createElement("p");
  intro.setAttribute("id", "message-result")
  intro.appendChild(playerIntro)
  intro.appendChild(computerIntro)
  intro.appendChild(resultIntro)

  if (messageElement.childNodes.length > 0) {
    const element = document.getElementById('message-result')
    element.remove();
  }

  messageElement.appendChild(intro);
};
