import { Box, Typography } from "@mui/material";
import TrackItem from "./Track/TrackItem";
import { setSelectTrack, tracks, selectTrack } from "../../store/tracks";
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux";

import tracksStyle from "../../styles/Tracks.module.scss"

//
import { useEffect } from "react";
import { useRouter } from "next/router";
import { bindActionCreators } from "@reduxjs/toolkit";

const TracksList = ({tracks, setSelectTrack, selectTrack}) => {
    const router = useRouter()

    const content = tracks?.map(track => <TrackItem key={track.id} track={track}/>)

    // useEffect(() => {
    //     console.log("router.query?.sound0", router.query?.sound);
    //   if(router.query?.sound && tracks) {
    //     console.log("router.query?.sound", router.query?.sound);
    //       if(+router.query?.sound !== selectTrack?.id) {
    //         const track = tracks?.find(item => item?.id == +router?.query?.sound)
    //         if(track) {
    //             setSelectTrack(track)
    //         }
    //       }
    //   }
    // }, [tracks, router.query?.sound])

    // useEffect(() => {
    //     console.log("router.query?.sound0", router.query?.sound);
    //   if(router.query?.sound && tracks) {
    //     console.log("router.query?.sound", router.query?.sound);
    //       if(+router.query?.sound !== selectTrack?.id) {
    //         const track = tracks?.find(item => item?.id == +router?.query?.sound)
    //         if(track) {
    //             setSelectTrack(track)
    //         }
    //       }
    //   }
    // }, [router.query?.sound])

    return (
        <Box className={tracksStyle.list}>
            {content}
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    tracks,
    selectTrack
})

const mapDispatchToPtops = dispatch => ({
    setSelectTrack: bindActionCreators(setSelectTrack, dispatch)
})

export default connect(mapStateToProps, mapDispatchToPtops)(TracksList);