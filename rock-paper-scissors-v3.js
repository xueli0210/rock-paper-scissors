//need to convert localStorage string back to JS object
let score = JSON.parse(localStorage.getItem('score')) || 
{
  wins: 0,
  losses: 0,
  ties: 0
}; // default for when score is not found

// display score tab
updateScoreElement();

// play the game
function playGame(playerMove) {
  //we can call other functions inside a function
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
    result = 'You lose.';
    } else if (computerMove === 'paper') {
    result = 'You win.';
    } else {
    result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win.';
    }
  }

  //update the score
  if (result === 'You win.') {
    score.wins ++
  } else if (result === 'You lose.') {
    score.losses ++
  } else if (result === 'Tie.') {
    score.ties ++
  }

  //store result in local storage
  //local storage only supports strings
  localStorage.setItem('score', JSON.stringify(score));

  //display result
  document.querySelector('.js-result')
    .innerHTML = result;

  //display moves
  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
<img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
Computer`;

  //update score
  updateScoreElement();
  
}


function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


//let computerMove = ''; //global variables

function pickComputerMove() {
  const randomNumber = Math.random();
  if(randomNumber >= 2/3) {
    computerMove = 'scissors'
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper'
  } else {
    computerMove = 'rock';
  }

  return computerMove; //returning a value, ending the function immediately
  //returning a variable is preferred over using a global variable
  //best practice is keeping variables inside a scope if we can
}
