import React, { useState } from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'

const App = () => {

  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(){
    setActivePlayer((currActivePlayer)=>{
      return currActivePlayer === 'X' ? 'O' : 'X';
    })
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
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer} />
        </div>
        log
      </main>
    </>
  )
}

export default App