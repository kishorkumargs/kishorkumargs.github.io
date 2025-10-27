let score = JSON.parse(localStorage.getItem('score')) || {
                    win: 0,
                    lose: 0,
                    tie: 0
                };
let wins = document.getElementById('win');
let loses = document.getElementById('lose');
let ties = document.getElementById('tie');
let resultText = document.querySelector('.result');
let moves = document.querySelector('.moves');
const toggleBtn = document.getElementById('theme-toggled')

// Load saved score
wins.textContent = score.win;
loses.textContent = score.lose;
ties.textContent = score.tie;
resultText.textContent = JSON.parse(localStorage.getItem('resultText')) || '';
moves.innerHTML = JSON.parse(localStorage.getItem('moves')) || '';

// Reset progress
function reset(){
    console.log('Progress reset!');
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    wins.textContent = score.win;
    loses.textContent = score.lose;
    ties.textContent = score.tie;
    resultText.textContent = '';
    moves.innerHTML = '';
    localStorage.removeItem('score');
    localStorage.removeItem('resultText');
    localStorage.removeItem('moves');
}
// Pick computer move
function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if( randomNumber >= 0 && randomNumber < 1/3){
        computerMove = 'rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
        computerMove = 'paper';
    }else if(randomNumber >= 2/3 && randomNumber < 1){
        computerMove = 'scissor';
    }
    return computerMove;
}

// Play game
function playGame(playerMove){
    const computerMove = pickComputerMove();
    let result = '';

    if( playerMove === 'rock'){

        if(computerMove === 'rock'){
            result = 'Tie';
        }else if(computerMove === 'paper'){
            result = 'You lose';
        }else if(computerMove === 'scissor'){
            result = 'You win';
        }

    }else if( playerMove === 'paper'){

        if(computerMove === 'rock'){
            result = 'You win';
        }else if(computerMove === 'paper'){
            result = 'Tie';
        }else if(computerMove === 'scissor'){
            result = 'You lose';
        }

    }else if( playerMove === 'scissor'){

        if(computerMove === 'rock'){
            result = 'You lose';
        }else if(computerMove === 'paper'){
            result = 'You win';
        }else if(computerMove === 'scissor'){
            result = 'Tie';
        }
    }

    let currentMove = `You <img src="icons/${playerMove}-emoji.png" class="move-icon">
    - <img src="icons/${computerMove}-emoji.png" class="move-icon"> Computer`;
    resultText.textContent = result;
    moves.innerHTML = currentMove;

    if( result === 'You win'){
        score.win += 1;
        wins.textContent = score.win;
    }
    else if( result === 'You lose'){
        score.lose +=1;
        loses.textContent = score.lose;
    }
    else if( result === 'Tie'){
        score.tie +=1;
        ties.textContent = score.tie;
    }

    localStorage.setItem('resultText', JSON.stringify(result));
    localStorage.setItem('moves', JSON.stringify(currentMove));
    localStorage.setItem('score', JSON.stringify(score));
}

// Toggle theme
if(localStorage.getItem('theme') === 'light'){
    document.body.classList.add('light-theme');
    toggleBtn.classList.remove('toggled');
    toggleBtn.textContent = 'Dark Mode';
}
// Event listener for toggle button
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    toggleBtn.classList.toggle('toggled');

    if(document.body.classList.contains('light-theme')){
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});