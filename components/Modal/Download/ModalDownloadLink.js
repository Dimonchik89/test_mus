import { Box, Button, Typography } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useSendMailHook from "../../../hooks/useSendMailHook";

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadLink = ({handleClose, handleOpenLinkAlert}) => {
    const {value, changeValue, handleSubit} = useSendMailHook(handleClose)

    return (
        <Box>
            <Typography
                className={modal.download__subtitle}
                align="center"
            >
                Paste the link to your video and we will take care of it
            </Typography>
            <Typography sx={{color: "#c4a70c", fontSize: "1.5rem"}} component="h3" align="center">
                &quot;You can do this later when your video is ready&quot;
            </Typography>
            <form
                onSubmit={(e) => {
                    handleSubit(e)
                    handleOpenLinkAlert()
                }}
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
    )
}
export default ModalDownloadLink;