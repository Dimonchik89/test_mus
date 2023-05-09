import { Box } from "@mui/material";
import PlayButton from "../Buttons/PlayButton";
import ShareButton from "../Buttons/ShareButton";
import ShareBlock from "../ShareBlock/ShareBlock";
import CircularProgress from '@mui/material/CircularProgress';
import { trackLoaded } from "../../store/tracks";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { downloadFile } from "../../api/downloadApi";

import button from "../../styles/Button.module.scss";


const ButtonsController = ({handlePlay, play, handleShare, share, disabled, trackLoaded, trackId, track}) => {
    const router = useRouter()

    const shareBlock = share ? <ShareBlock trackId={track?.id}/> : null
    return (
        <Box className={button.controll}>
            <PlayButton handleClick={handlePlay} play={play} disabled={disabled}/>

            {!trackLoaded && +router.query.sound === track?.id ? <CircularProgress sx={{color: "#F2D22B", width: "30px !important", height: "30px !important"}}/> : null}

            <Box className={button.btn__right}>
                <ShareButton handleShare={handleShare} share={share}/>
                <button 
                    className={`${button.btn__download}`}
                    onClick={(e) => downloadFile({e, track})}
                >
                    <p>Download</p>
                </button>
                {shareBlock}
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    trackLoaded
})

export default connect(mapStateToProps)(ButtonsController);