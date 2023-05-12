import { Box, Modal, Typography, Button } from "@mui/material"

import modal from "../../styles/Modal.module.scss"

const ModalUserError = ({show, handleClose, title}) => {

    return (
        <Modal
            open={show}
            onClose={handleClose}
        >
            <Box className={modal.body}>
                <Box className={modal.wrapper}>
                    <Typography 
                        variant="h3" 
                        component="h2"
                        align="center"
                    >
                        Error
                    </Typography>
                    <Typography 
                        variant="h4" 
                        component="h2"
                        align="center"
                        sx={{marginTop: "2rem"}}
                    >
                        {title}
                    </Typography>
                    <Button
                        onClick={handleClose}
                        className={modal.reload}
                    >
                        Close
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalUserError;