import React, { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combination';
import GameOver from './components/GameOver';

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

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

function deriveWinner(gameBoard,players){
  let winner ;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      console.log(`${firstSquareSymbol} wins`);
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array=>[...array])];
  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;

      gameBoard[row][col] = player;
  }
  return gameBoard;
}

const App = () => {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  let activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square : {row:rowIndex,col:colIndex},player:currentPlayer}, ...prevTurns];
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayers((prevPlayers)=>{
      return {
        ...prevPlayers,
        [symbol]:newName
      }
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
            <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'}/>
            <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  )
}

export default App