const gameboard = (function() {
  let board = Array.from({length: 3}, e => Array(3).fill(" "))
  const addPiece = (x, y, player) => { // returns true if success
    if (board[x][y] == false) { // falsy values indicate empty space
      board[x][y] = player.token
      return true
    } else {
      return false
    }
  }
  return { addPiece, board }
})()

const victoryController = (function() {
  // checks if a particular player has won
  const checkTicTacToe = (board, coords, player) => {
    // checks the row that the given piece is
    if (checkRow(board, coords[0], player)) return true
    // checks the column that the given piece is
    if (checkColumn(board, coords[1], player)) return true
    // will always check the diagonals
    if (checkDiagonals(board, player)) return true
    return false
  }

  const checkRow = (board, row, player) => {
    return board[row].every(p => p === player.token)
  }

  const checkColumn = (board, col, player) => {
    return board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === player.token
  }

  const checkDiagonals = (board, player) => {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === player.token) return true
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === player.token) return true
    return false
  }

  return { checkTicTacToe }
})()

const displayController = (function() {
  const displayBoard = (board) => {
    console.log(`
       ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
      ---+---+---
       ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
      ---+---+---
       ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
    `)
  }
  return { displayBoard }
})()

function createPlayer(name, token) {
  return { name, token }
}


function startGame(playerOne, playerTwo) {
  while (gameboard.victoryCheck() == false) {

  }
}