var game = {
  board: [
  	['_', '_', '_'],
  	['_', '_', '_'],
  	['_', '_', '_']
  ],
  winningCombinations: [
  	[[0, 2], [0, 1], [0, 0]],
  	[[1, 2], [1, 1], [1, 0]],
  	[[2, 2], [2, 1], [2, 0]],
  	[[0, 2], [1, 2], [2, 2]],
  	[[0, 1], [1, 1], [2, 1]],
  	[[0, 0], [1, 0], [2, 0]],
  	[[0, 0], [1, 1], [2, 2]],
  	[[0, 2], [1, 1], [2, 0]],
  ],
  player: 'X',
  winnerExists: function(mark) {
  	var winner = false;

  	for (var i=0; i<this.winningCombinations.length; i++) {
  		// for each combination (there are 8)
  		var combination = this.winningCombinations[i];

  		// check for 3 matches
  		var matches = 0;

  		// for each coordinate (there are 3)
  		for (var j=0; j<combination.length; j++ ) {
  			var coordinate = combination[j];
  			var row = coordinate[0];
  			var column = coordinate[1];

  			if (this.board[row][column] == mark) {
  				matches++;
  			}
  		}

  		// check if there is three in a row
  		if (matches == 3) {
  			winner = true;
  			break;
  		} else {
  			matches = 0;
  		}

  	}

  	return winner;
  },
  isATie: function() {
  	var currentEmptySpaces = this.findEmptySpaces();
  	// make a boolean variable as the test
  	var tie = true;
  	// loop through the rows
  	for (var i=0; i<currentEmptySpaces.length; i++) {
  		var row = currentEmptySpaces[i];
  		for (var j=0; j<row.length; j++) {
  			var column = row[j];
  			if (column) {
  				tie = false;
  				break;
  			}
  		}
  	}
  	return tie;

  },
  placeMark: function(row, column, mark) {
  	this.board[row][column] = mark;
  },
  findEmptySpaces: function() {
  	var empty = [
  		['', '', ''],
  		['', '', ''],
  		['', '', '']
  	];

  	for (var i=0; i<this.board.length; i++) {
  		for (var j=0; j<this.board[i].length; j++) {
  			if (this.board[i][j] == '_') {
  				empty[i][j] = true
  			} else {
  				empty[i][j] = false
  			}
  		}
  	}

  	return empty;
  },
  gameIsOver: function() {
  	var check = false;

  	if (this.winnerExists('X')) {
  		check = true;
  		console.log('X is the winner!');
  		document.getElementById('stats').innerHTML = 'X is the winner!';
  	} else if (this.winnerExists('O')) {
  		check = true;
  		console.log('O is the winner!');
  		document.getElementById('stats').innerHTML = 'O is the winner!';
  	} else if (this.isATie()) {
  		check = true;
  		console.log('Tie!')
  		document.getElementById('stats').innerHTML = 'Tie!';
  	}

  	return check;
  },
  changeTurns: function() {
  	if (this.player == 'X') {
  		this.player = 'O';
  	} else {
  		this.player = 'X';
  	}

  	console.log(this.player);
    return this.player;
  },
  makeComputerChoice() {
  	// Plan A: check to see if winning is one move away for you
  	var winningSpace = this.checkIfNearlyWon('O');

  	// if winningSpace == null, move on to plan B

  	// else if so, choose the remaining space to win

  	// Plan B: if the other player is about to win, choose the space they need
  	winningSpace = this.checkIfNearlyWon('X');

  	// if winningSpace == null, move on to plan C

  	// else if so, choose the space to block the other player

  	// Plan C: choose a random available space

  	console.log(winningSpace)
  },
  checkIfNearlyWon(mark) {
  	var almostWinner = false;

    for (var i=0; i<this.winningCombinations.length; i++) {
    	// for each combination (there are 8)
    	var combination = this.winningCombinations[i];

    	// check for 2 matches
    	var matches = 0;

    	// for each coordinate (there are 3)
    	for (var j=0; j<combination.length; j++ ) {
    		var coordinate = combination[j];
    		var row = coordinate[0];
    		var column = coordinate[1];

    		if (this.board[row][column] == mark) {
    			matches++;
    		}
    	}

    	// check if there is two in a row
    	if (matches == 2) {
    		// ensure that there is an empty space available to win
        var isEmptySpace = combination.includes('_');

        if (isEmptySpace) {
          almostWinner = true;
          break;
        } else {
          matches = 0;
        }
    	} else {
    		matches = 0;
    	}
    }

  	return almostWinner;
  }
};

var controller = {
    placeMark: function(row, column, mark) {
      game.placeMark(row, column, mark);
      view.updateBoard();
      var checkTwo = false;
      if (game.gameIsOver()) {}
       else {
      	var nextPlayer = game.changeTurns();

      	this.controlTurns(nextPlayer);
      }
      return checkTwo;
    },
    controlTurns(player) {
    	if (player == 'O') {
    		// disable buttons (view)
    		view.disableButtons();
    		// initiate a computer decision (game)
    		game.makeComputerChoice();
    	} else {
    		// enable buttons (view)
    		view.enableButtons();
    	}
    },
    reload() {
    	window.location.reload();
    }
};

var view = {
  updateBoard: function() {
  	var gameBoard = game.board;
  	// get us a row
  	for (var i=0; i < gameBoard.length; i++) {
  		var row = gameBoard[i];
  		// get us a column
  		for (var j=0; j < row.length; j++) {
  			var column = gameBoard[i][j];
  			// fetch our ID
  			var id = '' + i + '' + j + '';
  			// replace the button
  			if (column !== '_') {
  				var newText = document.createElement('h3');
  				newText.innerHTML = column;
  				var cell = document.getElementById(id);

  				// clear the cell
  				cell.innerHTML = '';

  				cell.appendChild(newText);
  			}
  		}

  	}

  	console.log(gameBoard);
  },
  disableButtons: function() {
    var gameButtons = document.getElementsByClassName('tic-tac-operative');
    
    // loop through buttons
    for (var i=0; i<gameButtons.length; i++) {
    	var button = gameButtons[i];

    	button.disabled = true;
    }
  },
  enableButtons: function() {
	var gameButtons = document.getElementsByClassName('tic-tac-operative');
    
    // loop through buttons
    for (var i=0; i<gameButtons.length; i++) {
    	var button = gameButtons[i];

    	button.disabled = false;
    }
  }
};

// showBoard();
// play();
