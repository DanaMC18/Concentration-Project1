
var paintedTable = document.querySelector('#painted-table');
var newGameBtn = document.querySelector('#new-game-btn');
var header = document.querySelector('header');
var timer = document.querySelector('#timer');

//create array for cards and push cards into array
var cards = document.querySelectorAll('.card');

//an empty selections array, add selections with each turn to compare later
var selections = [];

//array of classes to be shuffled/assigned when games start
var classes = [
            'stark', 'stark', 
            'lannister', 'lannister', 
            'baratheon', 'baratheon', 
            'targaryen', 'targaryen', 
            'greyjoy', 'greyjoy',
            'arryn', 'arryn',
            'tyrell', 'tyrell',
            'bolton', 'bolton',
            'martell', 'martell',
            'tully', 'tully'];



//ADD ANIMATION TO P ELEMENT AND POSSIBLY HEADER -- NOT WORKING
// var animateP = function() {
//   var pElement = document.querySelector('p');
//   pElement.classList.remove('hidden');
//   pElement.classList.add('pulse');
// }

// window.setTimeout(animateP, 2000);



var makeFacedown = function(){
  target.classList.add('facedown');
};



//take last two cards selected and turn face down if they don't match
var noMatch = function(){
  selections[selections.length - 2].classList.add('facedown');
  selections[selections.length - 1].classList.add('facedown');
};



var timeCount = 0;
var timeGame = function(){
  timeCount++;
  timer.textContent = timeCount;
}



//variables for determineWinner() below
var bestTime = 0;
var bestTimeElement = document.querySelector('#best-time');
var winner = document.createElement('p');
var bestTimeAlert = document.createElement('p');
var playAgain = document.createElement('p');

var determineWinner = function() {
  facedownCards = document.querySelectorAll('.facedown'); //array of cards still facedown AKA unmatched

  //if all cards have been matched game is over
  if (facedownCards.length === 0) {
      winner.textContent = 'Congrats you won in ' + timeCount + ' seconds!';
      header.appendChild(winner);

      //check for Best Time: if its the first game it will obviously be the best time, otherwise check if timeCount is less than bestTime
      if (timeCount < bestTime || bestTime === 0) {
        bestTime = timeCount;
        bestTimeElement.textContent = 'Best Time: ' + bestTime;
        bestTimeAlert.textContent = 'You got the best time! Play again and try to beat it!'
        header.appendChild(bestTimeAlert);

    } else {
        playAgain.textContent = 'Play again and try to beat the best time!';
        header.appendChild(playAgain);
    }
  }
}



//basic function to flip a card over when it is selected
var flipCard = function(event) {
  target = event.target;

  if (target.classList.contains('facedown')) {
    target.classList.remove('facedown');
    selections.push(target); //push targets to an array to compare later
    
    var firstChoice = selections[selections.length - 2]; 
    var secondChoice = selections[selections.length - 1];
    
    //if two cards are selected determine if they match
    if (selections.length % 2 === 0) {

      //if two choices have same class, its a match
      //but need to make sure if you clicked the same exact card, the game doesn't think you found a match--check ids
      if (firstChoice.classList[1] === secondChoice.classList[1] && firstChoice.id !== secondChoice.id){

        firstChoice.removeEventListener('click', flipCard);
        secondChoice.removeEventListener('click', flipCard);
    
        firstChoice.removeEventListener('dblclick', makeFacedown);
        secondChoice.removeEventListener('dblclick', makeFacedown);

        //highlights matches
        firstChoice.classList.add('match');
        secondChoice.classList.add('match');
  
      } else if (firstChoice.classList[1] !== secondChoice.classList[1]) {
        window.setTimeout(noMatch, 1000); //leave enough time for player to see cards
      }
    }
  } 
  determineWinner();
};



//Fisher-Yates (aka Knuth) Shuffle: http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



//classList is always going to have 3 classes -- '.facedown' gets replaced with '.match' when two cards have been matched
//so to reset the game the last two have to be removed and replaced with '.facedown' and a new class for matching purposes
var resetGame = function() {
  shuffle(classes);

  for (var i = 0; i < classes.length; i++) {
    cards[i].classList.remove(cards[i].classList[1]);
    cards[i].classList.remove(cards[i].classList[1]);

    cards[i].classList.add('facedown', classes[i]);
  }

  if (header.children.length > 5) { //if header has more than 5 children it indicates at least one game has already been played
    header.removeChild(header.children[5]); //remove end of game alerts so new game can start 
    header.removeChild(header.children[5]);
    
    timeCount = 0;
    timer.textContent = null; //reset timers

  } else {
    //start timer when New Game is selected but ONLY for very first game otherwise timer speeds up
    window.setInterval(timeGame, 1000);
  }

  //added event listener to children of parent element as per this article: http://www.kirupa.com/html5/handling_events_for_many_elements.htm
  //inside function so player must press New Game button before they can flip cards
  paintedTable.addEventListener('click', flipCard, false);
  paintedTable.addEventListener('dblclick', makeFacedown, false);
}



newGameBtn.addEventListener('click', resetGame);











