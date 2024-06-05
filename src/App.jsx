import React, { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combination';

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
const App = () => {

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialGameBoard;
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;

      gameBoard[row][col] = player;
  }

  let winner = null;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      console.log(`${firstSquareSymbol} wins`);
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square : {row:rowIndex,col:colIndex},player:currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  return (
    <>
      <header>
        <img src='game-logo.png' alt='Tic Tac Toe' />
        <h1>Tic Tac Toe</h1>
      </header> 
      <main>
        <div id='game-container'>
          <ol id='players' className='highlight-player'>
            <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
            <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
          </ol>
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  )
}

export default App