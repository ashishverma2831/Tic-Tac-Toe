import React, { useState } from 'react'

const Player = ({initialName,symbol,isActive,onChangeName}) => {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing)=> !editing);
        if(isEditing){
            onChangeName(symbol,playerName);
        }
    }

    return (
        <>
            <li className={isActive?'active':undefined}>
                <span className='player'>
                    {/* <span className='player-name'>{name}</span> */}
                    {
                        isEditing ? <input type='text' required  value={playerName} onChange={(e)=>{setPlayerName(e.target.value)}} /> : <span className='player-name'>{playerName}</span>
                    }
                    <span className='player-symbol'>{symbol}</span>
                </span>
                <button onClick={handleEditClick}> {isEditing?'Save':'Edit'} </button>
            </li>
        </>
    )
}

export default Player