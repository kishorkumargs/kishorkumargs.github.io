// Variables and constants
let score = JSON.parse(localStorage.getItem('score')) || {
                    win: 0,
                    lose: 0,
                    tie: 0,
                    total: 0,
                    rank: 'Newbie',
                    tries: 0
                };
let wins = document.getElementById('win');
let loses = document.getElementById('lose');
let ties = document.getElementById('tie');
let resultText = document.querySelector('.result');
let moves = document.querySelector('.moves');
let rank = document.getElementById('rank');
let tries = document.getElementById('tries');
const toggleBtn = document.getElementById('theme-toggled');
const gameOverModal = document.getElementById('game-over-modal');
const restartBtn = document.getElementById('restart-btn');
const savedTheme = localStorage.getItem('theme') || 'dark';

// Sound effects
const winSound = new Howl({
    src: ['sounds/win.wav'],
    volume: 0.8
});
const loseSound = new Howl({
    src: ['sounds/lose.wav'],
    volume: 0.8
});
const tieSound = new Howl({
    src: ['sounds/tie.m4a'],
    volume: 1
});
const btnClickSound = new Howl({
    src: ['sounds/click.mp3'],
    volume: 1
});

// Load saved score
wins.textContent = score.win;
loses.textContent = score.lose;
ties.textContent = score.tie;
total.textContent = score.total;
rank.textContent = score.rank;
tries.textContent = 50 - score.tries;

// Load saved result and moves
resultText.textContent = JSON.parse(localStorage.getItem('resultText')) || '';
moves.innerHTML = JSON.parse(localStorage.getItem('moves')) || '';

// Load theme
if(savedTheme === 'light'){
    document.body.classList.add('light-theme');
    toggleBtn.classList.add('toggled');
    toggleBtn.textContent = 'Dark Mode';
}else {
    document.body.classList.remove('light-theme');
    toggleBtn.classList.remove('toggled');
    toggleBtn.textContent = 'Light Mode';
}

// Display random fun fact
const facts = [
  "Rock Paper Scissors originated in ancient China over 2000 years ago.",
  `The game is known as "Jan-Ken" in Japan.`,
  `It's used to make decisions fairly in many countries!`,
  "In 2005, a man won a $20 million art deal using Rock Paper Scissors!"
];
document.querySelector("#fun-fact").textContent = facts[Math.floor(Math.random() * facts.length)];

// Reset progress
function reset(){
    btnClickSound.play();
    console.log('Progress reset!');

    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    score.total = 0;
    score.rank = 'Newbie';
    score.tries = 0;

    wins.textContent = score.win;
    loses.textContent = score.lose;
    ties.textContent = score.tie;
    total.textContent = score.total;
    rank.textContent = score.rank;
    tries.textContent = 50 - score.tries;

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

// Get rank based on total points
function getRank(totalPoints){
    if( totalPoints >= 50){
        score.rank = 'Pro';
        return rank.textContent = score.rank;
    } 
    else if( totalPoints >= 30){
        score.rank = 'Intermediate';
        return rank.textContent = score.rank;
    }
    else if( totalPoints >= 10){
        score.rank = 'Beginner';
        return rank.textContent = score.rank;
    }
    score.rank = 'Newbie';
    return rank.textContent = score.rank;
}

// Play sound based on result
function playSound(result){
    // Play sound based on result
    if(result === 'You win') winSound.play();
    else if(result === 'You lose') loseSound.play();
    else if(result === 'Tie') tieSound.play();
}

// Play game
function playGame(playerMove){
    // Check if a player reached 50 tries
    if(score.tries >= 50){
        gameOverModal.classList.remove('hide-model');
        document.getElementById('final-score').textContent = score.total;
        return;
    }
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

    score.tries += 1;
    tries.textContent = 50 - score.tries;
    let currentMove = `You <img src="icons/${playerMove}-emoji.png" class="move-icon">
    - <img src="icons/${computerMove}-emoji.png" class="move-icon"> Computer`;
    resultText.textContent = result;
    moves.innerHTML = currentMove;

    if( result === 'You win'){
        score.win += 1;
        score.total += 3;
        wins.textContent = score.win;
        total.textContent = score.total;
    }
    else if( result === 'You lose'){
        score.lose +=1;
        if( score.total > 0 ) score.total -= 1;
        total.textContent = score.total;
        loses.textContent = score.lose;
    }
    else if( result === 'Tie'){
        score.tie +=1;
        score.total += 1;
        total.textContent = score.total;
        ties.textContent = score.tie;
    }

    playSound(result);
    getRank(score.total);
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
    btnClickSound.play();
    document.body.classList.toggle('light-theme');
    toggleBtn.classList.toggle('toggled');
    closeBtn.classList.toggle('toggled');

    if(document.body.classList.contains('light-theme')){
        toggleBtn.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    } else {
        toggleBtn.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    }
});
// Event listener for close button in pop-up
const popUpContainer = document.getElementById('pop-up-container');
const closeBtn = document.querySelector('.close-btn');

closeBtn.addEventListener('click', () => {
    btnClickSound.play();
    popUpContainer.classList.add('hidden');
    setTimeout(() => {
        popUpContainer.style.display = 'none';
        popUpContainer.classList.remove('hidden');
    }, 500);
});

if(!localStorage.getItem('firstVisit')){
    popUpContainer.classList.remove('hide-model')
    popUpContainer.classList.remove('hidden');
    localStorage.setItem('firstVisit', 'true');
} else {
    popUpContainer.classList.add('hidden');
    popUpContainer.classList.add('hide-model');
}

// Event listener for restart button in game over modal
restartBtn.addEventListener('click', () => {
    btnClickSound.play();
    reset();
    gameOverModal.classList.add('hide-model');
});