'use strict';

//user dice roll
///if not 1 then add dice to current score.
//if one swicth player

//selecting elements
const player0BlockEle = document.querySelector('.player--0');
const player1BlockEle = document.querySelector('.player--1');
const currentScore1Ele = document.getElementById('current--1');
const currentScore0Ele = document.getElementById('current--0');
const score1Ele = document.getElementById('score--1');
const score0Ele = document.getElementById('score--0');

const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//setting initial condition to call at start and end of game
const initialConditions = function () {
  //holds scores of player 0 and 1
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  //Startign conditions
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  currentScore0Ele.textContent = 0;
  currentScore1Ele.textContent = 0;

  diceEle.classList.add('hidden');
  //so you can play game again
  playing = true;
  //setting mode back to 0
  activePlayer = 0;
};

initialConditions();

const swicthPlayer = function () {
  //reset currentscore for the next player to be zero, so when udpating new score, textcontent will be new current score for active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //element created with class to toggle css on or off
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle player
  //adds from active player
  player0BlockEle.classList.toggle('player--active');
  //removes to active player
  player1BlockEle.classList.toggle('player--active');
  //change dice image?
};

//rolling Dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generate random dice roll
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    console.log(diceRoll);
    //2. display dice
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${diceRoll}.png`;
    //3. check for rolled one, if not add to current score
    if (diceRoll !== 1) {
      //add dice to current score
      currentScore += diceRoll;
      //display on current score of active player dynammically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //4.swicth to next player by udating score board to zero first
      swicthPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log('hold');
    //1.add current score to total score of active player
    //score for each player held in array
    //score[1] = score[1] + current score
    scores[activePlayer] += currentScore;
    console.log('currentScore');
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if score equal or higher than 20, player wins
    if (scores[activePlayer] >= 20) {
      //fishing playing
      playing = false;
      //player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //remove the active player switch color
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // remove dice image
      diceEle.classList.add('hidden');
      //4. if not switch player
    } else swicthPlayer();
  }
});

btnNew.addEventListener('click', function () {
  //remove winning panel on the active player who just won
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  initialConditions();
});
