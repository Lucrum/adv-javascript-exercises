const gameboard = (function () {
  let board = [[null, null, null], [null, null, null], [null, null, null]]
  const addPiece = (x, y, player) => {
    if (board[x][y] == null) { // allow for falsey values to also stand in place of null
      board[x][y] = player.piece
    }
  }
})()

function createPlayer (name, token) {
  return { name, token }
}

