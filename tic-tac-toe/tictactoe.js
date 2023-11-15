const gameboard = (function () {
  let board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]]
  const addPiece = (x, y, player) => {
    if (board[x][y] == false) { // falsy values indicate empty space
      board[x][y] = player.token
    }
  }

  const displayBoard = () => {
    console.log(`
       ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
      ---+---+---
       ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
      ---+---+---
       ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
    `)
  }

  return { addPiece, displayBoard }
})()

function createPlayer (name, token) {
  return { name, token }
}