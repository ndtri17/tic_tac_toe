// Constants for player symbols
  const PLAYER_O = 'O';
  const PLAYER_X = 'X';

// Game state variables
  let board = Array(9).fill('');
  let currentPlayer = PLAYER_O;

  //2P
  let xPoint = 0;
  let oPoint = 0;
  let tieCount = 0;
  
  //1P
  let xVsBotPoint = 0;
  let botPoint = 0;
  let tieCountVsBot = 0;
  let isOnePlayerMode = false;
  
  
  
  // Winning combinations using board indices
  const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  
// DOM elements for displaying scores
const oScoreHtml = document.querySelector('#o_score');
const xScoreHtml = document.querySelector('#x_score');
const tieScoreHtml = document.querySelector('#tie_score');

// DOM element for changing mode
const toggle_mode_btn = document.querySelector("#toggle_mode_btn");
  // Toggle between 2P and 1P modes
    toggle_mode_btn.addEventListener('click', () => { 
      isOnePlayerMode = !isOnePlayerMode;
      toggle_mode_btn.textContent = isOnePlayerMode ? '1P' : '2P';
      document.querySelector('#o_label').textContent = isOnePlayerMode ? 'Bot(O)' : 'Player(O)';
      oScoreHtml.textContent = isOnePlayerMode ? botPoint : oPoint;
      xScoreHtml.textContent = isOnePlayerMode ? xVsBotPoint : xPoint;
      tieScoreHtml.textContent = isOnePlayerMode ? tieCountVsBot : tieCount;
      document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
      board.fill('');
      if (isOnePlayerMode) bot(); 
    })

// Initializes the game and setups event listeners on cells
  function startGame() {
    document.querySelectorAll('.cell').forEach((cell, index) => {
      cell.addEventListener('click', () => handleCellClick(cell, index));
    });
  }

// Handles cell clicks, updates the board, and checks for end of the game
  function handleCellClick(clickedCell, index) {
    if (board[index] === "") {
      
      board[index] = currentPlayer;
      clickedCell.innerHTML = currentPlayer;

      if (checkWin()) {
        updateScore(currentPlayer);
        setTimeout(resetBoard, 500);
      } else if (checkDraw()) {
        tieCount += 1;
        tieScoreHtml.textContent = tieCount;
        setTimeout(resetBoard, 500);
      } else { 
        currentPlayer = currentPlayer === PLAYER_O ? PLAYER_X : PLAYER_O;
        if (isOnePlayerMode && currentPlayer === PLAYER_O) {
          bot();
        }
      }
    }
  }

// Bot player
  function bot() { 
    let bestMove = findBestMove();
    board[bestMove] = PLAYER_O;
    document.getElementById(`cell_${bestMove}`).textContent = PLAYER_O;
    if (checkWin()) {
      updateScore(currentPlayer);
      setTimeout(resetBoard, 500);
    } else if (checkDraw()) {
      tieCountVsBot += 1;
      tieScoreHtml.textContent = tieCountVsBot;
      setTimeout(resetBoard, 500);
    } else { 
      currentPlayer = PLAYER_X;
    }
  }

  function findBestMove() {   
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < board.length; i++) { 
      if (board[i] == '') { 
        board[i] = PLAYER_O;
        let score = miniMax(board, 0, false);
        board[i] = '';
        if (score > bestScore) { 
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  let scores = {
    [PLAYER_O]: 1,
    [PLAYER_X]: -1,
    'tie': 0
  };

  function miniMax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = PLAYER_O;
          let score = miniMax(board, depth + 1, false);
          board[i] = '';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
          board[i] = PLAYER_X;
          let score = miniMax(board, depth + 1, true);
          board[i] = '';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  }

  function checkWinner() {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every(cell => cell !== '')) {
      return 'tie';
    }
    return null;
  }  

// Resets the board and reinitializes the game
  function resetBoard() {
    board.fill("");
    currentPlayer = PLAYER_O;
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    if (isOnePlayerMode) bot(); 
  }

// Updates the score for the winning player
  function updateScore(winner) {
    if (!isOnePlayerMode) { 
      if (winner === PLAYER_O) {
        oPoint += 1;
        oScoreHtml.textContent = oPoint;
      } else {
        xPoint += 1;
        xScoreHtml.textContent = xPoint;
      }
    } else { 
      if (winner === PLAYER_O) {
        botPoint += 1;
        oScoreHtml.textContent = botPoint;
      } else {
        xVsBotPoint += 1;
        xScoreHtml.textContent = xVsBotPoint;
      }
    }
  }

// Checks if the current board configuration is a win
  function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => board[index] === currentPlayer);
    });
  }

// Checks if the game is a draw
  function checkDraw() {
    return board.every(cell => cell !== '');
  }


// Initialize the game
  startGame();

