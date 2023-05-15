import { Box, Button, Modal, Typography } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useSendMailHook from "../../hooks/useSendMailHook";

import modal from "../../styles/Modal.module.scss";

const ModalFix = ({show, handleClose, openError}) => {
    const {value, changeValue, handleSubit} = useSendMailHook(handleClose)

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
                        If you need additional 15, 30, or 60-second versions and loops in ultra-quality format, as well as unlimited claims release for your videos, please check our tariffs <a className={modal.link} href={process.env.NEXT_PUBLIC_PARTEON} target="_blank">here</a>
                    </Typography>
                    <form
                        onSubmit={handleSubit}
                        className={modal.form}
                    >
                        <YouTubeIcon sx={{fontSize: "40px"}}/>
                        <input
                            type="text"
                            value={value}
                            onChange={e => changeValue(e.target.value)}
                            placeholder="Youtube video link"
                            className={modal.fix__input}
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