// function of countdown
const tiles =  document.querySelectorAll('.tile-card');
const resetBtn =  document.querySelector('.reset-button');
const dialog = document.getElementById('dialog');


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

//initialize game
initializeGame();

function initializeGame(){
    tiles.forEach(tile => tile.addEventListener('click',tileClicked));
    running =true;
};

function tileClicked(){
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
    console.log(tileIndex[tileIndex?.length - 1])
    updateOptions(currentPlayer["play"],tileIndex-1)
    checkWinner();
    changePlayer();
}

function updateOptions(play, index){
    options[index] = play; 
}

function changePlayer(){
    console.log(players)
    //switch between x and o
    currentPlayer = (currentPlayer["play"] === 'X')? players["player2"]: players["player1"];
    console.log("player switch",currentPlayer["name"]+ " " +"is next")
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
            alert(`${currentPlayer.name} wins!`);
            // running = false;
            dialog.showModal();
            UpdateScore(currentPlayer.name, 1)
            clearBoard();
            return;
        }
    }
    if (!options.includes('')) {
        alert('Draw!');
        running = false;
    }
}
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
