import { Box, Typography } from "@mui/material";

import tracks from "../../styles/Tracks.module.scss";
import TrackList from "./TracksList";
import Paginations from "../Paginations/Paginations";

const Tracks = () => {

    return (
        <Box className={tracks.tracks}>
            <Box className={`_container`}>
                <Box className={tracks.body}>
                    <Typography
                        variant="h1"
                        component="h1"
                        className={tracks.tracks__title}
                    >
                        New Tracks
                    </Typography>
                    <TrackList />
                    <Paginations/>
                </Box>
            </Box>
        </Box>
    )
}
export default Tracks;