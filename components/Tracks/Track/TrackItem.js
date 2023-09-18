import { Box } from "@mui/material";
import TrackItemLogo from "./TrackItemLogo";
import TrackItemHeader from "./TrackItemHeader";
import TrackItemDescription from "./TrackItemDescription";
import { selectTrack, setChangePlay, setChangeSelectTrackPlay, setTrackLoaded, stopAllTrack } from "../../../store/tracks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { createStructuredSelector } from 'reselect';
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import ButtonsController from "../../Buttons/ButtonsController";
import { trackLoaded } from "../../../store/tracks";
import { useRouter } from "next/router";
import ModalDownload from "../../Modal/Download/ModalDownload";
import useChangeModalHook from "../../../hooks/useChangeModalHook";

import button from "../../../styles/Button.module.scss"
import helper from "../../../styles/Helper.module.scss"
import tracks from "../../../styles/Tracks.module.scss"


const TrackItem = ({track, selectTrack, setChangePlay, setChangeSelectTrackPlay, trackLoaded, setTrackLoaded, stopAllTrack, openPatreonModal}) => {
    const [share, setShare] = useState(false)
    const [activeStyle, setActiveStyle] = useState(tracks.item)
    const router = useRouter();
    const { downloadModal, closeDownloadModal, openDownloadModal } = useChangeModalHook()

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

    useEffect(() => {
        if(+router.query?.sound === track?.id) {
            setActiveStyle(`${tracks.item} ${tracks.item__active}`)
        } else {
            setActiveStyle(tracks.item)
        }
    }, [router.query?.sound])

    return (
        <Box className={activeStyle}>
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
                    controlStyle={`${button.controll} ${helper._align__end}`}
                    timecodButton={true}
                    openPatreonModal={openPatreonModal}
                    openDownload={openDownloadModal}
                />
            </Box>
            <ModalDownload 
                show={downloadModal} 
                handleClose={closeDownloadModal}
                trackId={track.id}
                trackName={track.name}
            />
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    selectTrack,
    trackLoaded,
})

const mapDispathToProps = dispatch => ({
    setChangePlay: bindActionCreators(setChangePlay, dispatch),
    setChangeSelectTrackPlay: bindActionCreators(setChangeSelectTrackPlay, dispatch),
    setTrackLoaded: bindActionCreators(setTrackLoaded, dispatch),
    stopAllTrack: bindActionCreators(stopAllTrack, dispatch),
})

export default connect(mapStateToProps, mapDispathToProps)(TrackItem);