import { Box, Typography } from "@mui/material";
import TrackItem from "./Track/TrackItem";
import { setSelectTrack, tracks, selectTrack } from "../../store/tracks";
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux";

import tracksStyle from "../../styles/Tracks.module.scss"

//
import { useEffect } from "react";
import { useRouter } from "next/router";
import useChangeModalHook from "../../hooks/useChangeModalHook";
import ModalPatreon from "../Modal/ModalPatreon";

const TracksList = ({tracks, handleOpenLinkAlert}) => {
    const router = useRouter()
    const {patreonModal, openPatreonModal, closePatreonModal} = useChangeModalHook()

    const content = tracks?.map(track => <TrackItem key={track.id} track={track} openPatreonModal={openPatreonModal} handleOpenLinkAlert={handleOpenLinkAlert}/>)

    return (
        <Box className={tracksStyle.list}>
            {content}
            <ModalPatreon show={patreonModal} handleClose={closePatreonModal}/>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    tracks
})

export default connect(mapStateToProps)(TracksList);