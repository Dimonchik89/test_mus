import { Box, Typography } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadHeader = () => {

    return (
        <Box className={modal.download__header}>
            <YouTubeIcon className={modal.youtube__icon}/>
            <Typography
                variant="h3"
                component="h3"
                className={modal.download__title}
                align="center"
            >
                Few steps to protect you video and release copyright claim
            </Typography>
        </Box>
    )
}
export default ModalDownloadHeader;