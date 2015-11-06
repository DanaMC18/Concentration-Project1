
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
        window.setTimeout(noMatch, 1000);      
      }
    }
  } 
};


var classes = [
            'stark', 'stark', 
            'lannister', 'lannister', 
            'baratheon', 'baratheon', 
            'targaryen', 'targaryen', 
            'greyjoy', 'greyjoy'];


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


var resetBoard = function(){
  var newClasses = shuffle(classes);

  for (var i = 0; i < newClasses.length; i++){ 
    cards[i].classList.add(newClasses[i]);
  }
}


//added event listener to parent element as per this article: http://www.kirupa.com/html5/handling_events_for_many_elements.htm
var paintedTable = document.querySelector('#painted-table');

paintedTable.addEventListener('click', flipCard, false);
paintedTable.addEventListener('dblclick', makeFacedown, false);











