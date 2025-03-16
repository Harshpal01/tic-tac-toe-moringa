const tiles = document.querySelectorAll('.tile-card');
const resetBtn = document.querySelector('.reset-button');
const dialog = document.getElementById('dialog');

const minuteDisplay = document.getElementById("minute");
const secondDisplay = document.getElementById("seconds");

let options = ['', '', '', '', '', '', '', '', ''];

const players = {
    "player1": {
        name: "player1",
        play: "X",
        score: 0
    },
    "player2": {
        name: "player2",
        play: "O",
        score: 0
    }
};

let currentPlayer = players["player1"];
let running = false;
let timeLeft = 10;  // 10 seconds per turn
let timer;

initializeGame();

function initializeGame() {
    tiles.forEach(tile => tile.addEventListener('click', tileClicked));
    resetBtn.addEventListener("click", resetGame);
    running = true;
    startTimer();  // Start the timer when the game starts
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 10; // Reset timer
    updateTimerDisplay();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert(`Time's up! ${currentPlayer.name} loses the turn.`);
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

function tileClicked() {
    if (this.querySelector('span')) {
        return console.log('Tile already occupied');
    }

    const spanElement = document.createElement("span");
    spanElement.textContent = currentPlayer["play"];
    this.appendChild(spanElement);

    let tileIndex = this.getAttribute('id').split("").pop();
    updateOptions(currentPlayer["play"], tileIndex - 1);
    checkWinner();
    changePlayer();
    startTimer();  // Restart timer when a player makes a move
}

function updateOptions(play, index) {
    options[index] = play;
}

function changePlayer() {
    currentPlayer = (currentPlayer["play"] === 'X') ? players["player2"] : players["player1"];
    console.log(`${currentPlayer.name} is next`);
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
            alert(`${currentPlayer.name} wins!`);
            dialog.showModal();
            updateScore(currentPlayer.name, 1);
            clearBoard();
            return;
        }
    }

    if (!options.includes('')) {
        clearInterval(timer);
        alert('Draw!');
        running = false;
    }
}

function clearBoard() {
    options = ['', '', '', '', '', '', '', '', ''];
    tiles.forEach(tile => {
        const span = tile.querySelector("span");
        span?.remove();
    });
}

function updateScore(playerName, point) {
    console.log(`Updating score for ${playerName}, adding ${point} point`); // Debug log

    // Increase player score
    players[playerName]["score"] += point;

    // Get all score elements
    const scoreElements = document.querySelectorAll(".vote-count");

    if (playerName === "player1") {
        scoreElements[0].textContent = players["player1"]["score"];
    } else {
        scoreElements[1].textContent = players["player2"]["score"];
    }
}

function resetGame() {
    clearInterval(timer);
    options = ['', '', '', '', '', '', '', '', ''];
    tiles.forEach(tile => {
        const span = tile.querySelector("span");
        span?.remove();
    });

    players["player1"].score = 0;
    players["player2"].score = 0;

    document.querySelectorAll(".vote-count")[0].textContent = "0";
    document.querySelectorAll(".vote-count")[1].textContent = "0";


    currentPlayer = players["player1"];
    running = true;
    startTimer();
}