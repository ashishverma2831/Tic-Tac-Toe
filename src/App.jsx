import React from 'react'
import Player from './components/Player'
import GameBoard from './components/GameBoard'

const App = () => {
  return (
    <>
      <header>
        <img src='game-logo.png' alt='Tic Tac Toe' />
        <h1>Tic Tac Toe</h1>
      </header> 
      <main>
        <div id='game-container'>
          <ol id='players'>
            <Player initialName='Player 1' symbol='X' />
            <Player initialName='Player 2' symbol='O' />
          </ol>
          <GameBoard />
        </div>
        log
      </main>
    </>
  )
}

export default App