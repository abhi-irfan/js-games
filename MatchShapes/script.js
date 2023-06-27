// Define the array of shapes
const shapes = ['circle', 'triangle', 'square', 'pentagon', 'hexagon', 'heptagon', 'octagon'];

// Define the array of tiles
const tiles = [{id: 0, shape: '', selected: false}, {id: 1, shape: '', selected: false}, {
    id: 2,
    shape: '',
    selected: false
}, {id: 3, shape: '', selected: false}];
// Define the variables to keep track of the selected tiles
let firstTile = null;
let secondTile = null;
$(document).ready(function () {

    const difficulty = findGetParameter("difficulty") ?? 'l';
    const mode = findGetParameter("mode") ?? 'lite';
    if(mode === "dark"){
        document.body.style.background = "#000";
        document.getElementById("game-board-title").style.color = "#FFF"
    }
    if (difficulty === 'l') {

    } else if (difficulty === 'm') {
        tiles.push({id: 4, shape: '', selected: false});
        tiles.push({id: 5, shape: '', selected: false});
    } else if (difficulty === 'h') {
        tiles.push({id: 4, shape: '', selected: false});
        tiles.push({id: 5, shape: '', selected: false});
        tiles.push({id: 6, shape: '', selected: false});
        tiles.push({id: 7, shape: '', selected: false});
    }
    for (let i = 0; i < tiles.length; i++) {
        const myDiv = document.getElementById("game-board-body");
        myDiv.innerHTML += `<div class="tile" id="tile-${i}">
            <div class="overlay"></div>
        </div>`;
    }

    // Add click event listeners to the tiles
    for (let i = 0; i < tiles.length; i++) {
        document.getElementById('tile-' + i).addEventListener('click', () => handleTileClick(i));
    }
    resizeGameBoard()

    // Reset the game
    resetGame();
})


function resizeGameBoard() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const tileSize = Math.min(screenWidth * 0.9, screenHeight * 0.9);
    const boardWidth = tileSize;
    let boardHeight = tileSize;
    const board = document.getElementById('game-board');
    board.style.width = boardWidth + 'px';
    const boardBody = document.getElementById('game-board-body');
    const height = document.getElementById("game-board-title").offsetHeight + 18

    if (tiles.length === 6) {
        $(".tile").css("width", ((47 * 2) / 3) + "%")
        boardHeight = boardWidth * 2 / 3 * 1.07
    } else if (tiles.length === 8) {
        $(".tile").css("width", ((46 * 2) / 4) + "%")
        boardHeight = boardWidth * 2 / 4 * 1.1
    }
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

// Define the function to shuffle the shapes
function shuffleShapes() {
    for (let i = shapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shapes[i], shapes[j]] = [shapes[j], shapes[i]];
    }
}

// Define the function to reset the game
function resetGame() {
    // Reset the tiles
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].shape = '';
        tiles[i].selected = false;
        document.getElementById('tile-' + i).classList.remove('selected');
    }

    // Shuffle the shapes
    shuffleShapes();

    // Assign the shapes to the tiles
    for (let i = 0; i < tiles.length - 1; i++) {
        tiles[i].shape = shapes[i];
        // tiles[i + 1].shape = shape;
    }
    tiles[tiles.length - 1].shape = tiles[Math.floor(Math.random() * 3)].shape
    shuffleShapes();

    // Update the game board
    updateGameBoard();
}

// Define the function to update the game board
function updateGameBoard() {
    for (let i = 0; i < tiles.length; i++) {
        const tile = document.getElementById('tile-' + i);
        tile.style.backgroundImage = 'url(img/' + tiles[i].shape + '.png)';
        tile.style.backgroundSize = 'contain';
        tile.style.backgroundPosition = 'center';
        if (tiles[i].selected) {
            tile.classList.add('selected');
        } else {
            tile.classList.remove('selected');
        }
    }
}


// Define the function to check if the selected tiles are a match
function checkMatch() {
    setTimeout(() => {
        const match = firstTile.shape === secondTile.shape;
        const message = match ? "You solved it!" : "You lost.";

        sendEventToWebView(match, message);

        if (match) {
            firstTile = null;
            secondTile = null;
            resetGame();
        } else {
            tiles[firstTile.id].selected = false;
            tiles[secondTile.id].selected = false;
            updateGameBoard();
            firstTile = null;
            secondTile = null;
        }
    }, 500);
}


// Define the function to handle the click event on a tile
function handleTileClick(tileId) {
    if (firstTile === null) {
        // This is the first tile selected
        firstTile = {id: tileId, shape: tiles[tileId].shape};
        tiles[tileId].selected = true;
        updateGameBoard();
    } else if (secondTile === null && tileId !== firstTile.id) {
        // This is the second tile selected
        secondTile = {id: tileId, shape: tiles[tileId].shape};
        tiles[tileId].selected = true;
        updateGameBoard();
        checkMatch();
    }
}