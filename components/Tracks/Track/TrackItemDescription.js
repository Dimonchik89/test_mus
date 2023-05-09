import { Box, Typography } from "@mui/material";

import tracks from "../../../styles/Tracks.module.scss"

const TrackItemDescription = ({description}) => {

    return (
        <Box>
            <Typography
                variant="h6"
                component="span"
                className={`${tracks.text} _text__1`}
            >
                {description}
            </Typography>
        </Box>
    )
}
export default TrackItemDescription;