import { useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useRouter } from 'next/router';

import button from "../../styles/Button.module.scss"

const PlayButton = ({handleClick, play, disabled, playRef, trackId}) => {
    const router = useRouter()
    const [style, setStyle] = useState(button.play)
    const [activeSound, setActiveSound] = useState(null)

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
    
    useEffect(() => {
        if(trackId === +router.query?.sound) {
            setActiveSound(button._active)
        } else {
            setActiveSound(null)
        }
    }, [router.query?.sound])
        
    return (
        <button 
            onClick={handleClick}
            className={`${style} ${activeSound}`}
            disabled={disabled}
            ref={playRef}
        >
            {content}
        </button>
    )
}

export default PlayButton;