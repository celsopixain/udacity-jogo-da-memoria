// list that holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// array for opened cards
var openedCards = [];

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// declaring moves variable
let moves = 0;

// declaring counter variable
let CounterSet = function(moves) {
	this.target = document.querySelector(".moves");
	this.moves = moves;
	this.target.innerHTML = this.moves;
}

CounterSet.prototype.add = function() {
	this.moves++;
	this.target.innerHTML = this.moves;
};

CounterSet.prototype.restart = function() {
	this.moves = 0;
	this.target.innerHTML = this.moves;
};

let counter = new CounterSet(moves);

// stars and starRating
const stars = document.querySelectorAll(".fa-star");

let starRating = {
	restart: function() {
		for(var i=0; i<stars.length; i++) {
			stars[i].classList.add("shine");
		}
	},
	rate: function() {
		if(moves > 12 && moves < 18) {
			stars[2].classList.remove("shine");
		} else if(moves > 18) {
			stars[1].classList.remove("shine");
		}
	}
};

// shuffle cards and display each card in the deck when page is loaded
window.onload = startGame();

// loop to add event listeners to each card
for(var i = 0; i < cards.length; i++) {
	cards[i].addEventListener("click", displayCard);
	cards[i].addEventListener("click", cardOpen);
}

// restart button
document.querySelector(".restart").addEventListener("click", startGame);

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

// start a new game
function startGame() {
	for(var i=0; i<shuffle(cards).length; i++) {
		document.querySelector(".deck").innerHTML = "";
		[].forEach.call(shuffle(cards), function(item) {
			document.querySelector(".deck").appendChild(item);
		});
	}

	counter.restart();
	starRating.restart();
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
	if(openedCards.length === 2) {
		counter.add();
		starRating.rate();
		if(openedCards[0].type === openedCards[1].type) {
			matched();
		} else {
			unmatched();
		}
	}
}

// for when cards match
function matched() {
	openedCards[0].classList.add("match", "disabled");
	openedCards[1].classList.add("match", "disabled");
	openedCards[0].classList.remove("show", "open", "no-event");
	openedCards[1].classList.remove("show", "open", "no-event");
	openedCards = [];
}

// for when cards don't match
function unmatched() {
	openedCards[0].classList.add("unmatched");
	openedCards[1].classList.add("unmatched");
	disable();
	setTimeout(function() {
		openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
		openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
		enable();
		openedCards = [];
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