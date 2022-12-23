window.addEventListener('DOMContentLoaded', () => { //Wait till the DOM is fully loaded before we execute any JS

    //references to the play button and the game (originally created in CSS)
    const playButton = document.querySelector('.button-class'); 
    const game = document.querySelector('.game-class');
  
    //make the game visible if the play button is clicked
    playButton.addEventListener('click', () => makeGameVisible()); 
    
    function makeGameVisible(){
      playButton.style.visibility = "hidden";
      game.style.visibility = "visible";
    }

        // Define the player and dealer
    let player = {
        hand: [],
    };
    let dealer = {
        hand: [],
    };
  
    /*
        function is called if and only if 1) the game has started or 2) someone "hits"
    */
    function checkHandTotal(hand){     
        let total = 0;
        let aceCount = 0;
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
        return total;
    }
})




