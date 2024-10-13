export const STORAGE_KEY = 'JANKENPO';
export const PLAYER = 'PLAYER';
export const COMPUTER = 'COMPUTER';
export const ID_MESSAGE_RESULT = 'message-result';

export function isLocalStorageExist() {
  if (typeof (Storage) === undefined) {
    alert('Your browser does not support local storage');

    return false;
  }

  return true;
};

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

  if (isLocalStorageExist()) {
    const parsedResult = JSON.stringify({
      playerScore: updatedPlayerScore,
      computerScore: updatedComputerScore
    });

    localStorage.setItem(STORAGE_KEY, parsedResult);
  }
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
  intro.setAttribute("id", ID_MESSAGE_RESULT)
  intro.appendChild(playerIntro)
  intro.appendChild(computerIntro)
  intro.appendChild(resultIntro)

  if (messageElement.childNodes.length > 0) {
    const element = document.getElementById(ID_MESSAGE_RESULT)
    element.remove();
  }

  messageElement.appendChild(intro);
};

export function updateFinalMessage(winner) {
  let finalMessageElement = document.getElementById('final-message');
  let finalMessage = '';

  if (winner === PLAYER) {
    finalMessage = 'YOU WIN!';
  } else {
    finalMessage = 'YOU LOSE';
  }

  const finalMessageTextNode = document.createTextNode(finalMessage);

  let newParagraphElement = document.createElement('p');
  newParagraphElement.setAttribute('id', 'final-message-result');
  newParagraphElement.appendChild(finalMessageTextNode);

  finalMessageElement.appendChild(newParagraphElement);
};
