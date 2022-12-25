window.addEventListener('load', main); //call the main method once the page has loaded

//references to the play button and the game (originally created in CSS)
const playButton = document.querySelector('.button-class'); 
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
    hitButton.addEventListener('click', makeMove("hit", player));
    stayButton.addEventListener('click', makeMove("stay", player));

    //create a deck
    const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
    //for every suit and every value (suit * value combinations), enter card into deck
    for(let suit in suits){
        for(let value in values){
            deck.push({suit: suit, value: value, face: "shown"}); 
        }
    }

    shuffleDeck();
    gameLoop();
}

function gameLoop(){
    //game loop logic (follow the flowchart)


    setInterval(gameLoop, 1000/60); //gameLoop() executed 60 times per second
    //clearInterval() stops the loop
}

function makeGameVisible(){
    playButton.style.visibility = "hidden";
    game.style.visibility = "visible";
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
function makeMove(action, participant){
    if(action == "hit"){
        drawCard(participant);
        displayCard(newCard, participant);
        checkAndInitiateWin();
    } 

    if(action == "stay"){
        //hide the hit and stay buttons
        
    }
}

/*
    function to draw card
*/
function drawCard(participant){
    //if this is the dealer's second card, it must be face down
    if(participant == dealer && participant.hand.length == 1){ 
        let newCard = deck.pop();
        newCard.face = "hidden";
        dealer.hand.push(newCard);
    } else {
        if(participant == player){
            player.hand.push(deck.pop());
        } else {
            dealer.hand.push(deck.pop());
        }
    }
}

/*
    function to check win, tie
*/
function checkAndInitiateWin(){
    let game = true; //true if game is still running
    if(dealer.hand > player.hand){
        displayWin(dealer);
        game = false;
    } else if(player.hand > dealer.hand) {
        displayWin(player);
        game = false;
    } else {
        displayWin("tie");
        game = false;
    }
    return game;
}


/*
    function to display a drawn card
*/
function displayCard(newCard, participant){
    /*
        Use CSS flexbox to display a card. 

        Add the respective card image to the next open container 
        on the side of the participant who drew a card

        if "shown" is false, show a face-down card
    */
    if(newCard.face == "hidden") {
        //show a face-down card
    } else {
        if(participant == dealer){
            //show the respective card face-up 
        } else {
            //show the respective card face-up 
        }
    }
}

/*
    function to display win, tie
*/
function displayWin(winner){
    if(winner == player){
        //display player winning screen
    } 

    if(winner == dealer) {
        //display dealer winning screen
    }

    if(winner == "tie") {
        //display tie
    }
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

    participant.hand = hand; //update the participant's hand
}

/*
// Deal the initial cards
dealCard(player);
dealCard(dealer);
dealCard(player);
dealCard(dealer);
*/




