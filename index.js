// function of countdown
document.addEventListener("DOMContentLoaded",()=>{
    const tiles =  document.querySelectorAll('.tile-card');
    const resetBtn =  document.querySelector('.reset-button');
    const startBtn =  document.querySelector('.start-button');
    const endBtn =  document.querySelector('.end-button');
    const dialog = document.getElementById('dialog');
    
    const minuteDisplay = document.getElementById("minute");
    const secondDisplay = document.getElementById("seconds");
    
    document.querySelector(".reset-button").addEventListener("click", resetGame);
    
    let options = ['', '', '', '', '', '', '', '', ''];
    
    const players = {
        "player1" : {
            name: "player1",
            play: "X",
            score: 0
        },
        "player2" : {
            name: "player2",
            play: "O",
            score: 0 
        }
    };
    
    let currentPlayer = players["player1"];
    let running = false;
    let timeLeft = 10;  // 10 seconds per turn
    let timer;
    
    startBtn.addEventListener("click",()=>{
        //initialize game
        initializeGame();
        startBtn.classList.add("hidden")
        endBtn.classList.remove("hidden")
        resetBtn.classList.remove("hidden")
    
    });
    
    endBtn.addEventListener("click",()=>{
        //initialize game
        endGame();
        startBtn.classList.remove("hidden");
        endBtn.classList.add("hidden")
        resetBtn.classList.add("hidden")
    })
    
    function initializeGame(){
        tiles.forEach(tile => tile.addEventListener('click',tileClicked));
        running =true;
        startTimer();  // Start the timer when the game starts

        DialogBox(`Game started: ${currentPlayer.name} starts`)  
    };
      
    function startTimer() {
        clearInterval(timer);
        timeLeft = 10; // Reset timer
        updateTimerDisplay();
    
        timer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
    
            if (timeLeft <= 0) {
                clearInterval(timer);
                DialogBox(`Time's up! ${currentPlayer.name} loses the turn.`)
                changePlayer();
                startTimer(); // Restart for next player
            }
        }, 1000);
    
    }
    
    function updateTimerDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        minuteDisplay.textContent = String(minutes).padStart(2, '0');
        secondDisplay.textContent = String(seconds).padStart(2, '0');
    }
    
    function tileClicked(){
        if(!running){
            console.log('first')
            DialogBox("You need to start the game!")
            return
        }
        console.log('clicked',this);
    
        // know when to put O and when to put X; [done]
        // We need to know players Turn and Allocation [done]
        // secure the fields
        if(this.querySelector('span')){
            return console.log('exists')
        }
        const spanElement = document.createElement("span"); //  <div><span>X</span></div>
        spanElement.textContent = currentPlayer["play"];
        this.appendChild(spanElement);
        // update played options
        // get the index of tile and push option in options object e.g ['x','O','x'] 0, 1,2
        let tileIndex = this.getAttribute('id').split(""); // tile1 -> split word -> ['t',..'1']
        tileIndex = tileIndex[tileIndex?.length - 1];
        console.log(tileIndex[tileIndex?.length - 1]);
        
        updateOptions(currentPlayer["play"],tileIndex-1)
        checkWinner();
        startTimer();
    }
    
    function updateOptions(play, index){
        options[index] = play; 
    }
    
    function changePlayer(){
        console.log(players)
        //switch between x and o
        currentPlayer = (currentPlayer["play"] === 'X')? players["player2"]: players["player1"];
        console.log("player switch",currentPlayer["name"]+ " " +"is next");
    
        DialogBox(`${currentPlayer.name} turn to play.`)
    }
    
    function checkWinner() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    
        for (const condition of winConditions) {
            const [a, b, c] = condition; 
            if (options[a] !== '' && options[a] === options[b] && options[b] === options[c]) {
                clearInterval(timer);
                // running = false;

                DialogBox(`${currentPlayer.name} wins!`)
                
                UpdateScore(currentPlayer.name, 1)
                setTimeout(()=>{
                    clearBoard();
                    changePlayer();
                },2000)
                return;
            }
        };
        if (!options.includes('')) {
            clearInterval(timer);
            DialogBox(`Its a Draw!!`)
            running = false;
        }
        
        changePlayer();
    };
    
    function resetGame() {
        clearInterval(timer);
        
        clearBoard();
    
        players["player1"].score = 0;
        players["player2"].score = 0;
    
        document.querySelectorAll(".score-count")[0].textContent = "0";
        document.querySelectorAll(".score-count")[1].textContent = "0";
    
        currentPlayer = players["player1"];
        running = true;
        startTimer();
        DialogBox(`Game has been reset!`)
    };
    
    function endGame() {
        clearBoard();
    
        players["player1"].score = 0;
        players["player2"].score = 0;
    
        document.querySelectorAll(".score-count")[0].textContent = "0";
        document.querySelectorAll(".score-count")[1].textContent = "0";
    
        currentPlayer = players["player1"];
        running = false;
        
        clearInterval(timer);
        timeLeft = 10; // Reset timer
        DialogBox(`Game ended!`)
    };
    
    function clearBoard(){
        // clear options
    
        options = ['', '', '', '', '', '', '', '', ''];    
        // clear tiles
        for(let tile of tiles){
            const span = tile?.querySelector("span") // <div><span>X</span></div> -> <div></div>
            span?.remove()
        }
    }
    
    function UpdateScore(playerName,point){
        players[playerName]["score"] += point;
        // update player scores in html
        for(let player in players){
            document.getElementById(player).textContent = players[player]["score"]
        }
    }
    function DialogBox(message='this is a tes'){
        dialog.showModal();
        dialog.innerHTML = '';
        const dialogDiv = document.createElement("div");
        const spanElement = document.createElement("span");
        const iconSspanElement = document.createElement("span");
        spanElement.textContent=message;
        iconSspanElement.innerHTML='<i class="fa-solid fa-circle-info"></i>'

        dialogDiv.classList.add('dialog-container')
        spanElement.classList.add('dialog-text')
        dialogDiv.appendChild(iconSspanElement)
        dialogDiv.appendChild(spanElement)
        dialog.appendChild(dialogDiv)

        setTimeout(()=>{
            dialog.close();
        },500)
    }
})

/*
// Function to clear only the tiles
function clearTiles() {
    const tiles = document.querySelectorAll('.tile-card');
    tiles.forEach(tile => {
      tile.textContent = "";
});
}
  
  document.querySelector(".reset-button").addEventListener("click", clearTiles);
  */

