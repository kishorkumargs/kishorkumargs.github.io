// Variables and constants
const score = JSON.parse(localStorage.getItem('score')) || {
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
let total = document.getElementById('total');
let resultText = document.querySelector('.result');
let moves = document.querySelector('.moves');
let rank = document.getElementById('rank');
let highScore = parseInt(localStorage.getItem('high_score')) || 0;
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
const gameOverSound = new Howl({
    src: ['sounds/game_over.wav'],
    volume: 0.8
});
const highScoreSound = new Howl({
    src:['sounds/high_score.wav'],
    volume: 0.8
});

// Load saved score
wins.textContent = score.win;
loses.textContent = score.lose;
ties.textContent = score.tie;
total.textContent = score.total;
rank.textContent = score.rank;
tries.textContent = 50 - score.tries;
document.getElementById('high_score_main').textContent = highScore;
document.getElementById('high_score_modal').textContent = highScore;

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
    "In 2005, a man won a $20 million art deal using Rock Paper Scissors!",
    "Did you know that this game first appeared in China in the 17th century? Yes, it was not invented in Europe or America but in Asia. Europe started to play this game only in 19th century",
    "Statistics say that people usually choose Scissors in the first round and Rock in the second",
    "There is a robot developed in Japan which wins with 100% chance. It analyzes movement of your hand muscles to predict what choice you'll show",
    "The World Rock Paper Scissors Championship has been held annually since 2002",
    "There are online tournaments, local competitions, and even professional leagues with cash prizes reaching thousands of dollars"
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
    if( totalPoints >= 55){
        score.rank = 'Pro';
        return rank.textContent = score.rank;
    } 
    else if( totalPoints >= 35){
        score.rank = 'Intermediate';
        return rank.textContent = score.rank;
    }
    else if( totalPoints >= 20){
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
        gameOverSound.play();
        setTimeout(() => {
            gameOverModal.classList.remove('hide-model');
            document.getElementById('final-score').textContent = score.total;
            if(score.total > highScore){
                highScoreSound.play();
                highScore = score.total;
                localStorage.setItem('high_score', highScore);
            }
            document.getElementById('high_score_main').textContent = highScore;
            document.getElementById('high_score_modal').textContent = highScore;
        }, 700);
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