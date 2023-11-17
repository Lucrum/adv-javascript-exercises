wrapper = document.querySelector("div.content-wrapper")
playerForm = document.querySelector("form#players-form")

playerForm.addEventListener("submit", (e) => gameController.setup(e))

function createPlayer(name, token) {
  return { name, token }
}

const gameController = (function() {
  let turn = 0
  let players
  let ongoing
  const messageArea = document.createElement("div")
  const setup = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    playerOne = createPlayer(data.get("player-one"), "X")
    playerTwo = createPlayer(data.get("player-two"), "O")
    playerForm.remove()

    players = [playerOne, playerTwo]
    ongoing = true

    boardArea = document.createElement("div")
    boardArea.id = "board-area"
    wrapper.appendChild(messageArea)
    messageArea.textContent = playerOne.name + " begins!"
    wrapper.appendChild(boardArea)
    displayController.displayBoardDOM(gameBoard.board, boardArea)
  }

  const processInput = (x, y) => {
    let currentPlayer = (turn % 2 === 0) ? players[0] : players[1]
    let otherPlayer = (turn % 2 === 0 ) ? players[1] : players[0]
    if (!ongoing) return false
    gameBoard.addPiece(x, y, currentPlayer)
    displayController.displayBoardDOM(gameBoard.board, boardArea)
    if (gameBoard.checkVictory(x, y, currentPlayer)) {
      triggerVictory(currentPlayer)
    } else if (turn === 8) {
      triggerVictory(false)
    } else {
      messageArea.textContent = otherPlayer.name + "'s turn!"
      turn++
    }
  }

  const triggerVictory = (victor) => {
    if (victor) {
      messageArea.textContent = victor.name + " wins!"
    } else {
      messageArea.textContent = "It's a tie!"
    }
    ongoing = false
  }

  return { setup, processInput }
})()

// game functionality
const gameBoard = (function() {
  let board = Array.from({length: 3}, e => Array(3).fill(" "))
  const addPiece = (x, y, player) => { // returns true if success
    if (board[x][y] == false) { // falsy values indicate empty space
      board[x][y] = player.token
      console.log("adding " + player.token + " to coord " + [x, y])
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

  // the one good reason the board is stored as a 2d array
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
    let gameBoard = document.createElement("div")
    gameBoard.id = "game-board"
    for (const [x, row] of board.entries()) {
      for (const [y, value] of row.entries()) {
        let newCell = document.createElement("div")
        newCell.classList.add("cell")
        newCell.textContent = value
        newCell.addEventListener("click", () => gameController.processInput(x, y))
        gameBoard.appendChild(newCell)
      }
    }
    area.replaceChildren(gameBoard);
    console.log("Rendered board")
  }
  return { displayBoardConsole, displayBoardDOM }
})()
