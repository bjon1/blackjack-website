window.addEventListener('load', main); //call the main method once the page has loaded

//references to the play button and the game (originally created in CSS)
const buttons = document.querySelector('.buttons');
const playButton = document.querySelector('.play-button'); 
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const game = document.querySelector('.game');
const result = document.getElementById('result');
const dealerCards = document.getElementById("dealer-cards");
const playerCards = document.getElementById("player-cards");
const dealerTotal = document.getElementById("total-dealer");
const playerTotal = document.getElementById("total-player");
const resetButton = document.getElementById("reset-button");
const playerScore = document.getElementById("player-score");
const dealerScore = document.getElementById("dealer-score");

game.style.color = "gray";
 
let cardImgHidden = document.createElement("img"); 
cardImgHidden.src = "./cards/facedown.png";

/*
    TO DO: CREATE REFERENCES TO:
    hitButton
    stayButton
*/

// Define the player and dealer
let player = {
    hand: [],
    bet: undefined,
    total: 0,
    score: 0
};
let dealer = {
    hand: [],
    bet: undefined,
    total: 0,
    score: 0
};
let deck = [];

function main() {

    playButton.addEventListener('click', () => makeGameVisible()); 
    hitButton.addEventListener('click', () => makeMove(player));
    stayButton.addEventListener('click', () => dealerTurn());
    resetButton.addEventListener('click', () => resetGame());
    
    initializeDeck();
  

    shuffleDeck();
    //if a card is drawn, it is displayed
    drawCard(dealer);
    drawCard(player);
    drawCard(dealer);
    drawCard(player);
}

function makeGameVisible(){
    playButton.remove();
    game.style.display = "inline";
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
}

/*
    function to create a deck
*/
function initializeDeck(){
    deck = [];
    //create a deck
    const suits = ['S', 'D', 'H', 'C'];
    const values = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    //for every suit and every value (suit * value combinations), enter card into deck
    for(let suit of suits){
        for(let value of values){
            deck.push({suit: suit, value: value, face: "shown"}); 
        }
    }
    shuffleDeck();
}

/*
    function to reset the game
*/
function resetGame(){
    //document.location.reload(); won't save the score
    [player.bet, player.total, dealer.bet, dealer.total] = [0, 0, 0, 0];
    [player.hand, dealer.hand] = [[],[]];
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
    initializeDeck();
    result.innerHTML = '';
    playerCards.innerHTML = '';
    dealerCards.innerHTML = '';
    playerTotal.innerHTML = '';
    dealerTotal.innerHTML = '';
    resetButton.style.display = "none";

    drawCard(dealer);
    drawCard(player);
    drawCard(dealer);
    drawCard(player);
}


/*
    function to shuffle the deck
*/
function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * i + 1);
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

/* 
    function that runs the process of making a move
*/
function makeMove(participant){
    if(participant == player){
        console.log("Player Hit");
    } else {
        console.log("Dealer Hit");
    }
    drawCard(participant);
    updateHandTotal(participant);
    return checkIfBust(participant);
}

/*
    function that checks if a hand is greater than 21 
*/
function checkIfBust(participant){
    if(participant.total > 21){ //check if bust
        if(participant == dealer){
            displayBust(dealer);
            return true;
        } else {
            displayBust(player);
            return true;
        }
    } else {
        return false;
    }
}

/*
    function to execute dealer's choices
*/
function dealerTurn(){
    //dealer reveals hidden card
    dealer.hand[1].face = "shown";
    cardImgHidden.src = "./cards/" + dealer.hand[1].value + "-" + dealer.hand[1].suit + ".png";    
    
    let bust;
    //reveal card
    while(dealer.total <= 16 ){
        bust = makeMove(dealer);
    }

    if(!bust){
        compareTotals();
    }
}

/*
    function to draw card, calls displayCard()
*/
function drawCard(participant){
    let newCard;
    //if this is the dealer's second card, it must be face down
    if(participant == dealer && participant.hand.length == 1){ 
        newCard = deck.pop();
        newCard.face = "hidden";
        dealer.hand.push(newCard);
        displayCard(newCard, participant);
    } else {
        if(participant == player){
            newCard = deck.pop();
            player.hand.push(newCard);
        } else {
            newCard = deck.pop();
            dealer.hand.push(newCard);
        }
        displayCard(newCard, participant);
    }
}

/*
    function to compare totals; calls displayGameResult() with the appropriate result
*/
function compareTotals(){
    if(dealer.total > player.total){
        displayGameResult(dealer);
    } else if(player.total > dealer.total) {
        displayGameResult(player);
    } else {
        displayGameResult("tie");
    }
}

/* 
    function to display the bust screen
*/
function displayBust(participant){
    if(participant == player){
        result.innerHTML = "Bust. You lose!";
        dealer.score++;
        dealerScore.innerHTML = dealer.score;
    } else if (participant == dealer){
        result.innerHTML = "Bust. You win!";
        player.score++;
        playerScore.innerHTML = player.score;
    }
    //update the totals
    updateHandTotal(dealer);
    updateHandTotal(player);
    //dealer reveals hidden card
    dealer.hand[1].face = "shown";
    cardImgHidden.src = "./cards/" + dealer.hand[1].value + "-" + dealer.hand[1].suit + ".png";    
    //reveal the totals    
    playerTotal.innerHTML = player.total;
    dealerTotal.innerHTML = dealer.total;
    //hide the hit buttons
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    resetButton.style.display = "inline-block";
}

/*
    function to display a drawn card
*/
function displayCard(card, participant){
    if(card.face == "hidden") {
        dealerCards.append(cardImgHidden);
    } else {
        let cardImg = document.createElement("img");
        if(participant == dealer){
            cardImg.src = "./cards/" + card.value + "-" + card.suit + ".png";
            dealerCards.append(cardImg);
        } else {
            cardImg.src = "./cards/" + card.value + "-" + card.suit + ".png";
            playerCards.append(cardImg);
        }
    }
}

/*
    function to display win, tie
*/
function displayGameResult(winner){
    //hide hit and stay buttons
    if(winner == player){
        player.score++;
        playerScore.innerHTML = player.score;
        result.innerHTML = "You won!";
    } else if(winner == dealer) {
        dealer.score++;
        dealerScore.innerHTML = dealer.score;
        result.innerHTML = "Dealer won!";
        
    } else if(winner == "tie") {
        result.innerHTML = "Tie.";
    }
    //hide the hit buttons
    hitButton.style.display = "none";
    stayButton.style.display = "none";
    //update the totals
    updateHandTotal(dealer);
    updateHandTotal(player);
    //display the totals
    playerTotal.innerHTML = player.total;
    dealerTotal.innerHTML = dealer.total;
    //display the reset button
    resetButton.style.display = "inline-block";
}


/*
    function is called if and only if 1) the game has started or 2) someone "hits"
*/
function updateHandTotal(participant){     
    let total = 0;
    let aceCount = 0;
    let hand = participant.hand;
    for (let card of hand) {
        if (card.value === 'A') {
            aceCount++;
            total += 11;
        } else if (typeof card.value === 'number') {
            total += card.value;
        } else {
            total += 10;
        }
    }
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }

    participant.total = total; //update the participant's hand
}
