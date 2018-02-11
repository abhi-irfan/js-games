// most of this code is straight out of https://github.com/Mostafa-Samir/Tic-Tac-Toe-AI/blob/master/scripts/ai.js
// he wrote the code so well that i ended up using the same names too

var AIAction = function() {

    //public : the minimax value of the state that the action leads to when applied
    this.minimaxVal = 0;
};

/*
 * public static function that defines a rule for sorting AIActions in ascending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal > secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}

/*
 * public static function that defines a rule for sorting AIActions in descending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction]: the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal)
        return -1; //indicates that firstAction goes before secondAction
    else if(firstAction.minimaxVal < secondAction.minimaxVal)
        return 1; //indicates that secondAction goes before firstAction
    else
        return 0; //indicates a tie
}


/*
 * Constructs an AI player with a specific level of intelligence
 * @param level [String]: the desired level of intelligence
 */
var AI = function() {

    var game; // this is the game state to handle, in other words this is the parGameState variable
    /*
     * private recursive function that computes the minimax value of a game state
     * @param state [State] : the state to calculate its minimax value
     * @returns [Number]: the minimax value of the state
     */
    function minimaxValue(parGameState) {
        if(isGameOver(parGameState)) {
            //a terminal game state is the base case
            return Game.score(state); // TODO
        }
        else {
            var stateScore; // this stores the minimax value we'll compute

            if(parGameState.TURN === parGameState.SYMBOL.human)
            // X wants to maximize --> initialize to a value smaller than any possible score
                stateScore = -1000;
            else
            // O wants to minimize --> initialize to a value larger than any possible score
                stateScore = 1000;

            var availablePositions = parGameState.emptyCells();

            //enumerate next available states using the info form available positions
            var availableNextStates = availablePositions.map(function(row, col) {

                var nextState = markCell(row, col, parGameState);

                return nextState;
            });

            /* calculate the minimax value for all available next states
             * and evaluate the current state's value */
            availableNextStates.forEach(function(nextState) {
                var nextScore = minimaxValue(nextState);
                if(state.turn === "X") {
                    // X wants to maximize --> update stateScore iff nextScore is larger
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    // O wants to minimize --> update stateScore iff nextScore is smaller
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });

            return stateScore;
        }
    }

    /*
     * private function: make the ai player take a blind move
     * that is: choose the cell to place its symbol randomly
     * @param turn [String]: the player to play, either X or O
     */
    function takeAEasyMove() {
        var available_cells = game.emptyCells();
        var randomCell = available_cells[Math.floor(Math.random() * available_cells.length)];

        return randomCell;
    }

    /*
     * public function: notify the ai player that it's its turn
     * @param turn [String]: the player to play, either X or O
     */
    this.getBestRobotMove = function(parGameState) {
        console.log("Entering into getBestRobotMove");

        game = parGameState;
        var cell_to_play ; 

        console.log(game, parGameState, game.DIFFICULTY_LEVEL);

        switch(game.DIFFICULTY_LEVEL) {
            //invoke the desired behavior based on the level chosen
            case "Easy": 
                cell_to_play = takeAEasyMove(); 
                break;
            case "Medium": 
                cell_to_play = takeAEasyMove(); 
                // takeAMediumMove(turn); 
                break;
            case "Hard": 
                // takeAHardMove(turn); 
                break;
            default:
                console.log("Entered into default case, something is not right");
        }

        return cell_to_play;
    }
};