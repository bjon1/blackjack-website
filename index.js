window.addEventListener('load', main); //call the main method once the page has loaded

//references to the play button and the game (originally created in CSS)
const playButton = document.querySelector('.play-button'); 
const hitButton = document.getElementById('hit-button');
const stayButton = document.getElementById('stay-button');
const game = document.querySelector('.game-class');

/*
    TO DO: CREATE REFERENCES TO:
    hitButton
    stayButton
*/

// Define the player and dealer
let player = {
    hand: [],
    bet: undefined,
    total: 0
};
let dealer = {
    hand: [],
    bet: undefined,
    total: 0
};
let deck = [];

function main() {

    playButton.addEventListener('click', () => makeGameVisible()); 
    hitButton.addEventListener('click', () => makeMove(player));
    stayButton.addEventListener('click', () => dealerTurn());
    

    //create a deck
    const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    //for every suit and every value (suit * value combinations), enter card into deck
    for(let suit of suits){
        for(let value of values){
            deck.push({suit: suit, value: value, face: "shown"}); 
        }
    }
  

    shuffleDeck();
    console.log(deck);
    //if a card is drawn, it is displayed
    drawCard(dealer);
    drawCard(player);
    drawCard(dealer);
    drawCard(player);

    console.log("PLAYER'S HAND");
    console.log(player.hand);
    console.log("DEALER'S HAND");
    console.log(dealer.hand);

    
    
}

function makeGameVisible(){
    playButton.remove();
    game.style.visibility = "visible";
    hitButton.style.visibility = "visible";
    stayButton.style.visibility = "visible";
    
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
    hitButton.style.visibility = "hidden";
    stayButton.style.visibility = "hidden";
    if(participant == player){
        console.log("Player Bust! Dealer Wins!");
    } else if (participant == dealer){
        console.log("Dealer Bust! Player wins!");
    }
}

/*
    function to display a drawn card
*/
function displayCard(card, participant){
    /*
        Use CSS flexbox to display a card. 

        Add the respective card image to the next open container 
        on the side of the participant who drew a card

        if "shown" is false, show a face-down card
    */
    if(card.face == "hidden") {
        console.log(card);
        //show a face-down card
    } else {
        if(participant == dealer){
            console.log(card);
            //show the respective card face-up 
        } else {
            console.log(card);
            //show the respective card face-up 
        }
    }
}

/*
    function to display win, tie
*/
function displayGameResult(winner){
    //hide hit and stay buttons
    if(winner == player){
        console.log("Player win");
        //display player winning screen
    } else if(winner == dealer) {
        console.log("Dealer win");
        //display dealer winning screen
    } else if(winner == "tie") {
        console.log("Tie");
        //display tie
    }
    hitButton.style.visibility = "hidden";
    stayButton.style.visibility = "hidden";
}


/*
    function is called if and only if 1) the game has started or 2) someone "hits"
*/
function updateHandTotal(participant){     
    let total = 0;
    let aceCount = 0;
    let hand = participant.hand;
    for (let card of hand) {
        if (card.value === 'Ace') {
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
