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
                        To get an additional 15, 30, or 60-second versions and loops in ultra-quality format, as well as unlimited claims release for your videos, please check our tariffs 
                    </Typography>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        <a className={modal.link} href={process.env.NEXT_PUBLIC_PATREON} target="_blank" onClick={handleClose}>here</a>
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalPatreon;