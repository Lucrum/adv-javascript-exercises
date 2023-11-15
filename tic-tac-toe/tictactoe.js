const gameboard = (function() {
  let fillerPlayer = createPlayer(null, " ")
  let board = Array(3).fill(Array(3).fill(fillerPlayer))
  const addPiece = (x, y, player) => {
    if (board[x][y] == false) { // falsy values indicate empty space
      board[x][y] = player
    }
  }

  const victoryCheck = () => {
    return false
  }

  return { addPiece }
})()

const victoryController = (function() {
  const checkTicTacToe = (board, coords) => {
    
  }
  return { checkTicTacToe }
})()

const displayController = (function() {
  const displayBoard = (board) => {
    console.log(`
       ${board[0][0].token} | ${board[0][1].token} | ${board[0][2].token}
      ---+---+---
       ${board[1][0].token} | ${board[1][1].token} | ${board[1][2].token}
      ---+---+---
       ${board[2][0].token} | ${board[2][1].token} | ${board[2][2].token}
    `)
  }

  return { displayBoard }
})

function createPlayer(name, token) {
  return { name, token }
}


function startGame(playerOne, playerTwo) {
  while (gameboard.victoryCheck() == false) {

  }
}