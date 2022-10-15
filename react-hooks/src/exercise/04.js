// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

const initialGameState = {
  history: [{
    squares: Array(9).fill(null),
    nextValue: "X",
    winner: null,
    status: ''
  }],
  gameStateHistoryIndex: 0,
}

const gameReducer = (state, action) => {
  switch(action.type) {
    case "next-move":{
      const {payload} = action
      const currentState = state.history[state.gameStateHistoryIndex]
      const gameStateHistoryIndex = state.gameStateHistoryIndex + 1;
      if(currentState.winner !== null) return state;
      const updatedSquares = currentState.squares.map((item, index) => {
          if (index === payload && item === null){
            return currentState.nextValue
          }
          return item;
      }) 
      const nextValue = calculateNextValue(updatedSquares)
      const winner = calculateWinner(updatedSquares)
      const status = calculateStatus(winner, updatedSquares, nextValue)
      return {...state, history: [...state.history, {...currentState, squares: updatedSquares, nextValue, winner, status}], gameStateHistoryIndex}
    }
    case "go-back": {
      const {payload} = action;
      return {...state, gameStateHistoryIndex: payload}
    }
    case "restart":{
      return initialGameState
    }
    default: {
      return state
    }
  }
}



function Board() {
  const [gameState, updateGameState] = React.useReducer(gameReducer, initialGameState);
  const currentGame =  gameState.history[gameState.gameStateHistoryIndex]
  // 🐨 squares is the state for this component. Add useState for squares
  // const [squares, setSquares] = useSquares()

  // // 🐨 We'll need the following bits of derived state:
  // // - nextValue ('X' or 'O')
  // const nextValue = calculateNextValue(squares)
  // // - winner ('X', 'O', or null)
  // const winner = calculateWinner(squares)
  // // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  // const status = calculateStatus(winner, squares, nextValue)
  // // 💰 I've written the calculations for you! So you can use my utilities
  // // below to create these variables



  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  // function selectSquare(square) {
  //   // 🐨 first, if there's already winner or there's already a value at the
  //   // given square index (like someone clicked a square that's already been
  //   // clicked), then return early so we don't make any state changes
  //   //
  //   if (winner !== null) return
  //   // 🦉 It's typically a bad idea to mutate or directly change state in React.
  //   // Doing so can lead to subtle bugs that can easily slip into production.
  //   //
  //   // 🐨 make a copy of the squares array
  //   // 💰 `[...squares]` will do it!)
  //   const squaresCopy = [...squares];
  //   // 🐨 set the value of the square that was selected
  //   // 💰 `squaresCopy[square] = nextValue`
  //   squaresCopy[square] = nextValue;
  //   // 🐨 set the squares to your copy
  //   setSquares(squaresCopy)
  // }

  // function restart() {
  //   // 🐨 reset the squares
  //   // 💰 `Array(9).fill(null)` will do it!
  //   setSquares(Array(9).fill(null))
  // }

  React.useEffect(()=> {
    localStorage.setItem("saved-game-1", JSON.stringify(gameState))
  },[gameState.history.length])

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => updateGameState({type: "next-move", payload: i })}>
        {currentGame.squares[i]}
      </button>
    )
  }

  return (
    <div>
      {/* 🐨 put the status in the div below */}
      <div className="status">STATUS: {currentGame.status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={() => updateGameState({type:"restart"})}>
        restart
      </button>

      {gameState.history.map((historySnap, index) => <button key={index} onClick={()=> updateGameState({type: "go-back",payload: index})}>Go to move {index}</button>)}
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}



function App() {
  return <Game />
}

export default App
