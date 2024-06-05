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

const App = () => {

  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);

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
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  )
}

export default App