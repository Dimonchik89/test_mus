import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import modal from "../../styles/Modal.module.scss";

const ModalFix = ({show, handleClose}) => {
    const [value, setValue] = useState("")

    const handleSubit = (e) => {
        e.preventDefault()
        console.log(value);

        setValue("")
        handleClose()
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box className={modal.body}>
                <Box className={modal.content}>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        If you used music from tuneboxmusic.org, then just put the link to the video bellow and associated copyright claims be relesed
                    </Typography>
                    <form
                        onSubmit={handleSubit}
                        className={modal.form}
                    >
                        <YouTubeIcon sx={{fontSize: "40px"}}/>
                        <input
                            type="text"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Youtube video link"
                        />
                        <Button 
                            type="submit"
                            className={modal.submit}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalFix;