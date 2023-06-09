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
import TimecodeBlock from "./TimecodeBlock";

import button from "../../styles/Button.module.scss";

const ButtonsController = ({playRef, handlePlay, play, handleShare, share, disabled, trackLoaded, track, controlStyle, timecodButton, openPatreonModal, openDownload}) => {
    const router = useRouter()

    const shareBlock = share ? <ShareBlock trackId={track?.id}/> : null

    const timecodBlock = timecodButton ? <TimecodeBlock openPatreonModal={openPatreonModal}/> : null;

    const handleDownload = (e) => {
        downloadFile({e, track})
            .then(data => {
                openDownload()
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Box className={controlStyle}>
            <Box className={button.play__wrapper}>
                <PlayButton 
                    handleClick={handlePlay} 
                    play={play} 
                    disabled={disabled}
                    playRef={playRef}
                    trackId={track?.id}
                />

                {!trackLoaded && +router.query.sound === track?.id ? <CircularProgress sx={{color: "#F2D22B", width: "30px !important", height: "30px !important"}}/> : null}
            </Box>

            <Box className={button.btn__center}>
                <ShareButton handleShare={handleShare} share={share}/>
                <button 
                    className={`${button.btn__download}`}
                    onClick={handleDownload}
                >
                    <p>Download</p>
                </button>
                {shareBlock}
            </Box>
            {timecodBlock}
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    trackLoaded
})

export default connect(mapStateToProps)(ButtonsController);