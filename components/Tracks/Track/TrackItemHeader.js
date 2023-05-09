import { Box, Typography } from "@mui/material";

import tracks from "../../../styles/Tracks.module.scss"

const TrackItemHeader = ({name, handleSelect}) => {

    return (
        <Box className={tracks.track__header}>
            <Typography
                variant="h3"
                component="h3"
                className={tracks.track__title}
                onClick={handleSelect}
            >
                {name}
            </Typography>

            <Typography
                variant="h3"
                component="h3"
                className={tracks.track__subtitle}
            >
                Tunebox
            </Typography>
        </Box>
    )
}
export default TrackItemHeader;