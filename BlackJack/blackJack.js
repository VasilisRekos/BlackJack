
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const newGameBtn = document.getElementById('new-game-btn');
const dealerCards = document.getElementById('dealer-cards');
const playerCards = document.getElementById('player-cards');
const dealerScore = document.getElementById('dealer-hand-value');
const playerScore = document.getElementById('player-hand-value');

const suits = ['C', 'D', 'S', 'H'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];

//creates a deck
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ value, suit });
        }
    }
    deck = shuffle(deck);
}

//shuffles the deck
function shuffle(cards) {
    let x = cards.length;
    let a, y;
    while (x !== 0) {
        y = Math.floor(Math.random() * x);
        x--;
        a = cards[x];
        cards[x] = cards[y];
        cards[y] = a;
    }
    return cards;
}

//Draws a card for either the player or the dealer via the function hit()
function dealCard(hand, element) {
    const card = deck.pop();
    hand.push(card);
    const img = document.createElement('img');
    img.src = `cards/${card.value}-${card.suit}.png`;
    img.classList.add('card');
    element.appendChild(img);
    updateScore(hand, element);
}

//updates the score
function updateScore(hand, element) {
    const value = calculateHandValue(hand);
    const handValueElem = element === dealerCards ? dealerScore : playerScore   ;
    handValueElem.textContent = `Value: ${value}`;
}

//resets the game and starts from the beginning
function newGame() {
    createDeck();
    dealerHand = [];
    playerHand = [];
    dealerCards.innerHTML = '';
    playerCards.innerHTML = '';
    dealCard(dealerHand, dealerCards);
    dealCard(dealerHand, dealerCards);
    dealCard(playerHand, playerCards);
    dealCard(playerHand, playerCards);
    hitBtn.disabled = false;
    standBtn.disabled = false;
}


//calculates the score
function calculateHandValue(hand) {
    let value = 0;
    let aceCount = 0;
    for (let card of hand) {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            value += 10;
        }
            else if (card.value === 'A') {
            aceCount++;
            value += 11;
        }
            else {
            value += parseInt(card.value);
        }
    }
    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
}

//allows the player to draw a card
function hit() {
    dealCard(playerHand, playerCards);
    const playerValue = calculateHandValue(playerHand);
    if (playerValue > 21) {
        alert("Your total score went past 21.You lose...:(");
        hitBtn.disabled = true;
        standBtn.disabled = true;
    }
}

//stops the players turn
function stand() {
    while (calculateHandValue(dealerHand) < calculateHandValue(playerHand)) {
        dealCard(dealerHand, dealerCards);
    }
    const playerValue = calculateHandValue(playerHand);
    const dealerValue = calculateHandValue(dealerHand);
    if (dealerValue > 21 || playerValue > dealerValue) {
        alert("Woohoo!!!You win!Dealers value:"+dealerValue);
    }
        else if (playerValue < dealerValue) {
        alert("Dang.Dealer wins! Dealers value:"+dealerValue);
    }
        else {
        alert("It's a tie!");
    }
    hitBtn.disabled = true;
    standBtn.disabled = true;
}

hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
newGameBtn.addEventListener('click', newGame);

newGame();
