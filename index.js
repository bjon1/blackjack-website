window.addEventListener('DOMContentLoaded', () => { //Wait till the DOM is fully loaded before we execute any JS

    //references to the play button and the game (originally created in CSS)
    const playButton = document.querySelector('.button-class'); 
    const game = document.querySelector('.game-class');

    /*
        TO DO: CREATE REFERENCES TO:
        hitButton
        stayButton

    */
  
    //make the game visible if the play button is clicked
    playButton.addEventListener('click', () => makeGameVisible()); 
    
    function makeGameVisible(){
      playButton.style.visibility = "hidden";
      game.style.visibility = "visible";
    }

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

    hitButton.addEventListener('click', makeMove("hit", player));
    stayButton.addEventListener('click', makeMove("stay", player));

    /* 
        function that runs the process of making a move
    */
    function makeMove(action, participant){
        if(action == "hit"){
            drawCard(participant);
            updateHandTotal(participant);
        } 

        if(action == "stay"){
            
        }
    }

    /*
        function to draw a card from a deck of cards and place it in hand
    */
    function drawCard(participant){

    }

    /*
        function to create and shuffle the deck
    */

    /*
        function to display win, tie
    */
    
    /*
        function to check win, tie
    */
    function checkAndInitiateWin(){
        let game = true; //true if game is still running
        if(dealer.hand > player.hand){
            //dealer wins
            game = false;
        } else if(player.hand > dealer.hand) {
            //player wins
            game = false;
        } else {
            //tie
            game = false;
        }
        return game;
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
})
