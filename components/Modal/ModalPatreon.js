import { Box, Modal, Typography } from "@mui/material";

import modal from "../../styles/Modal.module.scss"

const ModalPatreon = ({show, handleClose}) => {

    return (
        <Modal
            open={show}
            onClose={handleClose}
            >
            <Box className={modal.body}>
                <Box className={modal.content}>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        If you used our music in your video then just put the link to the video bellow and associated copyright claims be relesed Free plan allows you to release 1 claim per month.
                        If you need additional 15, 30, or 60-second versions and loops in ultra-quality format, as well as unlimited claims release for your videos, please check our tariffs <a className={modal.link} href={process.env.NEXT_PUBLIC_PARTEON} target="_blank" onClick={handleClose}>here</a>
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalPatreon;