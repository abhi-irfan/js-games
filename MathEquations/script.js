

// Define the array of tiles
const tiles = [{id: 0, value: ''}, {id: 1, value: ''}, {id: 2, value: ''}, {id: 3, value: ''}];

let correctAnswer = "";
$(document).ready(function () {
    resetGame();
})

function resetGame(){
    const myDiv = document.getElementById("game-board-body");
    myDiv.innerHTML = "";
    const difficulty = findGetParameter("difficulty") ?? 'l';
    const mode = findGetParameter("mode") ?? 'lite';
    if(mode === "dark"){
        document.body.style.background = "#000";
        document.getElementById("game-board-title").style.color = "#FFF"
        document.getElementById("game-board-problem").style.color = "#FFF"
    }
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let num3 = Math.floor(Math.random() * 10) + 1;
    let operator1 = "";
    let operator2 = "";
    let equation = "";
    let possibleAnswers = [];

    if (difficulty === "l") {
        operator1 = ["+", "-"][Math.floor(Math.random() * 2)];
        equation = num1 + " " + operator1 + " " + num2;
        correctAnswer = eval(equation);
        possibleAnswers = [correctAnswer, correctAnswer + 1, correctAnswer - 1, correctAnswer + 2];
    } else if (difficulty === "m") {
        operator1 = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        if (operator1 === "*"){
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
        }
        equation = num1 + " " + operator1 + " " + num2;
        correctAnswer = eval(equation);
        possibleAnswers = [correctAnswer, correctAnswer + 5, correctAnswer - 5, correctAnswer + 10];
    } else if (difficulty === "h") {
        num1 = Math.floor(Math.random() * 51) + 50;
        num2 = Math.floor(Math.random() * 51) + 50;
        operator1 = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        do {
            operator2 = ["+", "-", "*"][Math.floor(Math.random() * 3)];
        } while (operator2 === operator1);
        if (operator1 === "*"){
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            num3 = Math.floor(Math.random() * 51) + 50;
        } else if (operator2 === "*"){
            num1 = Math.floor(Math.random() * 51) + 50;
            num2 = Math.floor(Math.random() * 10) + 1;
            num3 = Math.floor(Math.random() * 10) + 1;
        }
        equation = num1 + " " + operator1 + " (" + num2 + " " + operator2 + " " + num3 + ")";
        correctAnswer = eval(equation);
        possibleAnswers = [correctAnswer, correctAnswer + 10, correctAnswer - 10, correctAnswer + 20];
    }
    possibleAnswers = possibleAnswers.sort(() => Math.random() - 0.5);
    tiles[0].value = possibleAnswers[0];
    tiles[1].value = possibleAnswers[1];
    tiles[2].value = possibleAnswers[2];
    tiles[3].value = possibleAnswers[3];
    $("#game-board-problem").html(`${equation} = ?`);
    for (let i = 0; i < tiles.length; i++) {
        const myDiv = document.getElementById("game-board-body");
        myDiv.innerHTML += `<div class="tile" id="tile-${i}">
            <div class="answer">${tiles[i].value}</div>
        </div>`;
    }
    // Add click event listeners to the tiles
    for (let i = 0; i < tiles.length; i++) {
        document.getElementById('tile-' + i).addEventListener('click', () => handleTileClick(i));
    }
}


function resizeGameBoard() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const tileSize = Math.min(screenWidth * 0.9, screenHeight * 0.9);
    const boardWidth = tileSize;
    let boardHeight = tileSize;
    const board = document.getElementById('game-board');
    board.style.width = boardWidth + 'px';
    const boardBody = document.getElementById('game-board-body');
    const height = document.getElementById("game-board-title").offsetHeight + document.getElementById("game-board-problem").offsetHeight + 18


    if (boardWidth + height < screenHeight) {
        boardBody.style.width = (boardWidth) + 'px';
        boardBody.style.height = (boardHeight) + 'px';
        board.style.height = (boardHeight + height) + 'px';
    } else {
        boardBody.style.width = (boardWidth - height) + 'px';
        boardBody.style.height = (boardHeight - height) + 'px';
        board.style.height = (boardHeight) + 'px';
    }
}

window.onresize = function () {
    resizeGameBoard()
}
resizeGameBoard();


// Define the function to handle the click event on a tile
function handleTileClick(tileId) {
    tiles[tileId].selected = true;
    let message = "You lost.";
    if(correctAnswer === tiles[tileId].value){
        message = "You solved it!";
        sendEventToWebView(true, message);
        resetGame();
    } else {
        sendEventToWebView(false, message);
    }
}