import { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import button from "../../styles/Button.module.scss"

const PlayButton = ({handleClick, play, disabled, playRef}) => {
    const [style, setStyle] = useState(button.play)

    const content = play ? <PauseIcon
            fontSize='large'
            sx={{color: "white"}}
        /> : <PlayArrowIcon 
            fontSize='large' 
            sx={{color: "white"}}
        />

    useEffect(() => {
        if(disabled) {
            setStyle(`${button.play} ${button._disabled}`)
        } else {
            setStyle(`${button.play}`)
        }
    }, [disabled])
        
    return (
        <button 
            onClick={handleClick}
            className={style}
            disabled={disabled}
            ref={playRef}
        >
            {content}
        </button>
    )
}

export default PlayButton;