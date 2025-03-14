// function of countdown
const tiles =  document.querySelectorAll('.tile-card');
const resetBtn =  document.querySelector('.reset-button');
const winConditions = [

    //game variables
    [0, 1, 2],//rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],//columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //diagonals
    [2, 4, 6]
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
//initialize game
initializeGame();

function initializeGame(){
 tiles.forEach(tile => tile.addEventListener('click',tileClicked()));
 resetBtn.addEventListener('click', restartGame);
 running =true;
}

function tileClicked(){
    this.innerHtml = 'X';
    //getting tile index 0-8
    //const tileIndex = parseInt(this.getAttribute('id').replace('tile', '')) - 1; 
    /* 
if (options[tileIndex]!= '' || !running){
    return;
}
updateTile(this, tileIndex);
//switching players
changePlayer();
checkWinner(); 
*/
}

function updateTile(tile, index){
options[index] = currentPlayer; 
tile.textContent = currentPlayer; //update the tiles text content
}

function changePlayer(){
    //switch between x and o
currentPlayer = (currentPlayer === 'X')? 'O': 'X';
}

function checkWinner() {
    
}
function restartGame() {
    
}