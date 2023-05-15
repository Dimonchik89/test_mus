import { Box, IconButton, Modal } from "@mui/material"
import ModalDownloadHeader from "./ModalDownloadHeader"
import ModalDownloadWrapper from "./ModalDownloadWrapper";
import ModalDownloadYoutube from "./ModalDownloadYoutube";
import ModalDownloadSoundLink from "./ModalDownloadSoundLink";
import ModalDownloadLink from "./ModalDownloadLink";
import CloseIcon from '@mui/icons-material/Close';

import modal from "../../../styles/Modal.module.scss";
import ModalDownloadPatreon from "./ModalDownloadPatreon";

const ModalDownload = ({show, handleClose, trackId}) => {

    return (
        <Modal
            open={show}
            onClose={handleClose}
            >
            <Box className={modal.body}>
                <Box className={modal.download__block}>
                    <ModalDownloadHeader/>
                    <ModalDownloadWrapper>
                        <ModalDownloadYoutube/>
                    </ModalDownloadWrapper>
                    <ModalDownloadWrapper>
                        <ModalDownloadSoundLink trackId={trackId}/>
                    </ModalDownloadWrapper>
                    <ModalDownloadWrapper>
                        <ModalDownloadLink handleClose={handleClose}/>
                    </ModalDownloadWrapper>
                    <ModalDownloadWrapper>
                        <ModalDownloadPatreon/>
                    </ModalDownloadWrapper>
                </Box>
                <IconButton 
                    onClick={handleClose} 
                    className={modal.close}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
            </Box>
        </Modal>
    )
}
export default ModalDownload