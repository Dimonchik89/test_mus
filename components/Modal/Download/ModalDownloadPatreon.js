import { Box, Typography } from "@mui/material";

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadPatreon = () => {

    return (
        <Box className={modal.patreon}>
            <Typography
                className={modal.download__text}
                align="center"
            >
                If you used our music in your video then just put the link to the video above and the associated copyright claims be relesed Free plan allows you to release 1 claim per month.
            </Typography>
            <Typography
                className={modal.download__text}
                align="center"
            >
                If you need additional 15, 30, or 60-second versions and loops in ultra-quality format, as well as unlimited claims release for your videos, please check our tariffs <a className={modal.link} href={process.env.NEXT_PUBLIC_PARTEON} target="_blank">here</a>

            </Typography>
        </Box>
    )
}
export default ModalDownloadPatreon;