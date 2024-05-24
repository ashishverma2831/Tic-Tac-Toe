import React, { useState } from 'react'

const Player = ({initialName,symbol}) => {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <>
            <li>
                <span className='player'>
                    {/* <span className='player-name'>{name}</span> */}
                    {
                        isEditing ? <input type='text' required  value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}} /> : <span className='player-name'>{playerName}</span>
                    }
                    <span className='player-symbol'>{symbol}</span>
                </span>
                <button onClick={()=>{setIsEditing((editing)=> !editing)}}> {isEditing?'Save':'Edit'} </button>
            </li>
        </>
    )
}

export default Player