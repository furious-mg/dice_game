'use strict';

const main_score_0 = document.querySelector('.main-score-0');
const main_score_1 = document.querySelector('.main-score-1');
const current_0 = document.getElementById('current-score-0');
const current_1 = document.getElementById('current-score-1');

const dice_image = document.getElementById('dice-image');
const roll_dice = document.querySelector('.roll-dice');
const play_again = document.querySelector('.play-again');
const hold_score = document.querySelector('.hold-score');
const play_first = document.querySelector('.play');

function initialise() {
    document.querySelector('.modal-window').classList.toggle('hidden');
}

play_first.addEventListener('click', initialise);

let playing;
let scores;
let currentscore;
let current;

function init() {
    dice_image.classList.add('hidden');
    main_score_0.textContent = 0;
    main_score_1.textContent = 0;
    current_0.textContent = 0;
    current_1.textContent = 0;
    playing = true;
    current = 0;
    currentscore = 0;
    scores = [0,0];
    console.log('init executed');
    document.querySelector('.player-0').classList.remove('winner');
    document.querySelector('.player-1').classList.remove('winner');
    document.querySelector(`.player-${current}`).classList.add('active');
}

init();

function roll() {
    if(playing) {
        const number = Math.trunc(Math.random() * 6) + 1;
        console.log(number);
        dice_image.classList.remove('hidden');
        dice_image.src = `dice-${number}.png`;
        if(number == 1) {
            document.querySelector(`.player-${current}`).classList.remove('active');
            document.getElementById(`current-score-${current}`).textContent = 0;
            current = (current + 1) % 2;
            document.querySelector(`.player-${current}`).classList.add('active');
            currentscore = 0;
        }
        else {
            currentscore += number;
            document.getElementById(`current-score-${current}`).textContent = currentscore;
        }
    }
}


function hold() {
    if(playing) {
        scores[current] += currentscore;
        currentscore = 0;
        document.getElementById(`current-score-${current}`).textContent = 0;
        document.querySelector(`.main-score-${current}`).textContent = scores[current];
        document.querySelector(`.player-${current}`).classList.toggle('active');
        if(scores[current] >= 100) {
            playing = false;
            document.querySelector(`.player-${current}`).classList.remove('active')
            document.querySelector(`.player-${current}`).classList.add('winner');
            document.getElementById(`current-label-${current}`).textContent = 'WINNER';
            document.getElementById(`current-score-${current}`).textContent = '🎉';
            current = (current + 1 ) % 2;
            document.getElementById(`current-label-${current}`).textContent = 'LOSER';
            document.getElementById(`current-score-${current}`).textContent = '🥲';
        }
        else {
            current = (current + 1 ) % 2;
            document.querySelector(`.player-${current}`).classList.toggle('active');
        }
    }
}

function again() {
    init();
}

roll_dice.addEventListener('click', roll);
play_again.addEventListener('click', again);
hold_score.addEventListener('click', hold);
