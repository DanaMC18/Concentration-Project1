
//create array for cards and push cards into array
var cards = [];
cards.push(document.querySelectorAll('.card'));

//empty selections array, add selections with each turn to compare later
var selections = [];


var makeFacedown = function(){
  target.classList.add('facedown');
};


//take last two cards selected and turn face down if they don't match
var noMatch = function(){
  selections[selections.length - 1].classList.add('facedown');
  selections[selections.length - 2].classList.add('facedown');
};

//compare last two cards selected to see if they match
// var determineMatch = function(){
//   if (selections[selections.length - 1].classList === selections[selections.length - 2].classList) {
//     selections[selections.length - 1].removeEventListener('click', flipCard);
//     selections[selections.length - 2].removeEventListener('click', flipCard);
//     selections[selections.length - 1].removeEventListener('dblclick', makeFacedown);
//     selections[selections.length - 2].removeEventListener('dblclick', makeFacedown);
  
//   } else {
//     window.setTimeout(noMatch, 2000);
//   }
// };

//basic function to flip a card over when it is selected
var flipCard = function(event){
  target = event.target;
  console.log(target);
  target.classList.remove('facedown');
  selections.push(target); //push targets to an array to compare

//if two cards are selected determine if they match
  if (selections.length % 2 === 0) {
    
    if (selections[selections.length - 1].classList === selections[selections.length - 2].classList) {
      selections[selections.length - 1].removeEventListener('click', flipCard);
      selections[selections.length - 2].removeEventListener('click', flipCard);
    
      selections[selections.length - 1].removeEventListener('dblclick', makeFacedown);
      selections[selections.length - 2].removeEventListener('dblclick', makeFacedown);

      selections[selections.length - 1].classList.add('match');
      selections[selections.length - 2].classList.add('match');
  
    } else if (selections[selections.length - 1].classList !== selections[selections.length - 2].classList){
      window.setTimeout(noMatch, 2000);
   }
  }
};


//put event listeners on all the cards
var createEventListeners = function(){
  for (var i = 0; i < cards[0].length; i++) {
    var card = cards[0][i];
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