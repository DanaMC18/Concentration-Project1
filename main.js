
//create array for cards and push cards into array
var cards = document.querySelectorAll('.card');


//an empty selections array, add selections with each turn to compare later
var selections = [];
    

var makeFacedown = function(){
  target.classList.add('facedown');
};


//take last two cards selected and turn face down if they don't match
var noMatch = function(){
  selections[selections.length - 2].classList.add('facedown');
  selections[selections.length - 1].classList.add('facedown');
};


//basic function to flip a card over when it is selected
var flipCard = function(event) {
  target = event.target;
  console.log(target);


  if (target.classList.contains('facedown')) {
    target.classList.remove('facedown');
    selections.push(target); //push targets to an array to compare
    
    var firstChoice = selections[selections.length - 2]; 
    var secondChoice = selections[selections.length - 1];
    
    //if two cards are selected determine if they match
    if (selections.length % 2 === 0) {

      if (firstChoice.classList.toString().split(' ')[1] === secondChoice.classList.toString().split(' ')[1] &&
          firstChoice.id !== secondChoice.id){

        firstChoice.removeEventListener('click', flipCard);
        secondChoice.removeEventListener('click', flipCard);
    
        firstChoice.removeEventListener('dblclick', makeFacedown);
        secondChoice.removeEventListener('dblclick', makeFacedown);

        selections[selections.length - 1].classList.add('match');
        selections[selections.length - 2].classList.add('match');
  
      } else if (firstChoice.classList.toString().split(' ')[1] !== secondChoice.classList.toString().split(' ')[1]) {
        window.setTimeout(noMatch, 2000);      
      }
    }
  } 
};

//Fisher-Yates (aka Knuth) Shuffle: found on 



// function shuffle(cards) {
//   var currentIndex = cards.length, temporaryValue, randomIndex ;

//   // While there remain elements to shuffle...
//   while (0 !== currentIndex) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     // And swap it with the current element.
//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }




//put event listeners on all the cards
var createEventListeners = function(){
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    card.addEventListener('click', flipCard);
    card.addEventListener('dblclick', makeFacedown); 
  }
};

createEventListeners();



//STARTED TRYING TO USE jQUERY BUT AM HAVING TOO MANY ISSUES KEEPING VARIABLES STRAIGHT
//I'M NOT COMFORTABLE ENOUGH YET WITH jQUERY TO USE IT ON SUCH A BIG PROJECT

//jQuery
$(document).ready(function(){


// $cards.push($('.card'));


// $('.card').click(flipCard);


});