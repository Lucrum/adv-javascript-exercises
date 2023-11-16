wrapper = document.querySelector("div.content-wrapper")
playerForm = document.querySelector("form#players-form")

playerForm.addEventListener("submit", (e) => gameController.setup(e))

function createPlayer(name, token) {
  return { name, token }
}

const gameController = (function() {
  let turn
  let players
  const setup = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    playerOne = createPlayer(data.get("player-one"), "X")
    playerTwo = createPlayer(data.get("player-two"), "O")
    playerForm.remove()

    players = [playerOne, playerTwo]
    turn = playerOne

    boardArea = document.createElement("div")
    boardArea.id = "board-area"
    wrapper.appendChild(boardArea)
    displayController.displayBoardDOM(gameBoard.board, boardArea)
  }

  const processInput = (x, y) => {
    gameBoard.addPiece(x, y, turn)
    turn = turn === players[0] ? players[1] : players[0]
  }

  return { setup, processInput }
})()

// game functionality
const gameBoard = (function() {
  let board = Array.from({length: 3}, e => Array(3).fill(" "))
  const addPiece = (x, y, player) => { // returns true if success
    if (board[x][y] == false) { // falsy values indicate empty space
      board[x][y] = player.token
      return true
    } else {
      return false
    }
  }

  // victory checking
  const checkVictory = (x, y, player) => {
    // checks the row that the given piece is
    if (checkRow(x, player)) return true
    // checks the column that the given piece is
    if (checkColumn(y, player)) return true
    // will always check the diagonals
    if (checkDiagonals(player)) return true
    return false
  }

  const checkRow = (row, player) => {
    return board[row].every(p => p === player.token)
  }

  const checkColumn = (col, player) => {
    return board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] === player.token
  }

  const checkDiagonals = (player) => {
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] === player.token) return true
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] === player.token) return true
    return false
  }

  return { addPiece, checkVictory, board }
})()

// display a given board
const displayController = (function() {
  const displayBoardConsole = (board) => {
    console.log(`
       ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
      ---+---+---
       ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
      ---+---+---
       ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
    `)
  }

  const displayBoardDOM = (board, area) => {
    table = document.createElement("table")
    table.id = "game-board"
    for (const [y, row] of board.entries()) {
      table.insertRow()
      console.log("Generating for row: " + row)

      for (const [x, value] of row.entries()) {
        const newCell = table.rows[table.rows.length - 1].insertCell()
        newCell.textContent = value
        newCell.addEventListener("click", gameController.processInput(x, y))
      }
    }
    area.replaceChildren(table);
  }
  return { displayBoardConsole, displayBoardDOM }
})()
