import { Box } from "@mui/material";
import TrackItemLogo from "./TrackItemLogo";
import TrackItemHeader from "./TrackItemHeader";
import TrackItemDescription from "./TrackItemDescription";
import { setSelectTrack, selectTrack, setChangePlay, setChangeSelectTrackPlay, setTrackLoaded, stopAllTrack } from "../../../store/tracks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ButtonsController from "../../Buttons/ButtonsController";
import { trackLoaded } from "../../../store/tracks";
import { useRouter } from "next/router";

import tracks from "../../../styles/Tracks.module.scss"


const TrackItem = ({track, setSelectTrack, selectTrack, setChangePlay, setChangeSelectTrackPlay, trackLoaded, setTrackLoaded, stopAllTrack}) => {
    const [share, setShare] = useState(false)
    const router = useRouter();

    const trackRouter = () => {
        router.push({
                pathname: "/",
                query: {...router.query, sound: track?.id}
            }, null, {scroll: false, shallow: true})
    }

    const handleShare = () => {
        setShare(prev => !prev)
    }

    const handleSelectTrack = () => {
        setTrackLoaded(false)
        if(!selectTrack || selectTrack.id !== track.id) {
            trackRouter()
            stopAllTrack()
        } else {
            setTrackLoaded(true)
        }
    }

    const handlePlay = () => {
        if(selectTrack) {
            console.log("select tracl");
            if(selectTrack.id === track.id) {
                console.log("select == track");
                setTrackLoaded(true)
                setChangeSelectTrackPlay()
                setChangePlay(track?.id)
            } else {
                console.log("select !== track");
                stopAllTrack()
                setTrackLoaded(false)
                trackRouter()
            }
        } else {
            console.log("no select track");
            setTrackLoaded(false)
            trackRouter()


            // setChangePlay(track?.id)
        }
    }

    return (
        <Box className={tracks.item}>
            <TrackItemLogo handleSelect={handleSelectTrack} img={track?.img}/>
            <Box className={tracks.content}>
                <TrackItemHeader handleSelect={handleSelectTrack} name={track.name}/>
                <TrackItemDescription description={track.description}/>
                <ButtonsController
                    handlePlay={handlePlay} 
                    play={track?.play} 
                    handleShare={handleShare} 
                    share={share}
                    disabled={selectTrack?.id === track?.id ? !trackLoaded :false}
                    track={track}
                />
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    selectTrack,
    trackLoaded,
})

const mapDispathToProps = dispatch => ({
    setSelectTrack: bindActionCreators(setSelectTrack, dispatch),
    setChangePlay: bindActionCreators(setChangePlay, dispatch),
    setChangeSelectTrackPlay: bindActionCreators(setChangeSelectTrackPlay, dispatch),
    setTrackLoaded: bindActionCreators(setTrackLoaded, dispatch),
    stopAllTrack: bindActionCreators(stopAllTrack, dispatch),
})

export default connect(mapStateToProps, mapDispathToProps)(TrackItem);