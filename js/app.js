/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// deck of all cards in game
const deck = document.querySelector(".deck");

// array for opened cards
var openedCards = [];

// shuffle cards and display each card in the deck when page is loaded
window.onload = startGame();

// loop to add event listeners to each card
for(var i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", displayCard);
	cards[i].addEventListener("click", cardOpen);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// start game function
function startGame() {
	var shuffledCards = shuffle(cards);
	for(var i=0; i<shuffledCards.length; i++) {
		[].forEach.call(shuffledCards, function(item) {
			deck.appendChild(item);
		});
	}
}

// counts a move on selecting two cards
function moveCounter() {
	moves++;
	counter.innerHTML = moves;
}

// toggles open, show and disabled classes
function displayCard() {
	this.classList.toggle("open");
	this.classList.toggle("show");
	this.classList.toggle("disabled");
}

// add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
	openedCards.push(this);
	var len = openedCards.length;
	if(len === 2) {
		moveCounter();
		if(openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
}

// for when cards match
function matched() {
	openedCards[0].classList.add("match");
	openedCards[1].classList.add("match");
	openedCards[0].classList.remove("show", "open");
	openedCards[1].classList.remove("show", "open");
	openedCards = [];
}

// for when cards don't match
function unmatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open", "unmatched");
		openedCards[1].classList.remove("show", "open", "unmatched");
	}, 1100);
}

// disable cards temporarily
function disable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.add("disabled");
	});
}

// enable cards and disable matched cards
function enable() {
	Array.prototype.filter.call(cards, function(card) {
		card.classList.remove("disabled");
		for(var i=0; i<matchedCard.length; i++) {
			matchedCard[i].classList.add("disabled");
		}
	});
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */