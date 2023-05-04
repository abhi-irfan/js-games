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


function resizeGameBoard() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const tileSize = Math.min(screenWidth * 0.8 / 2, screenHeight * 0.8 / 2);
    const boardWidth = tileSize * 2;
    const boardHeight = tileSize * 2;
    const board = document.getElementById('game-board');
    board.style.width = boardWidth + 'px';
    board.style.height = (boardHeight) + 'px';
    const boardBody = document.getElementById('game-board-body');
    boardBody.style.width = boardWidth + 'px';
    boardBody.style.height = (boardHeight) + 'px';
}

window.onresize = function() {
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
    for (let i = 0; i < tiles.length-1; i++) {
        const shape = shapes[i];
        tiles[i].shape = shape;
        // tiles[i + 1].shape = shape;
    }
    tiles[tiles.length-1].shape = tiles[Math.floor(Math.random() * 3)].shape
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
        if (firstTile.shape === secondTile.shape) {
            alert("You Won");
            firstTile = null;
            secondTile = null;
            resetGame();
        } else {
            alert("No");
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

// Add click event listeners to the tiles
for (let i = 0; i < tiles.length; i++) {
    document.getElementById('tile-' + i).addEventListener('click', () => handleTileClick(i));
}


// Reset the game
resetGame();