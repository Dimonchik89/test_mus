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
                        Just put the link to the video bellow and associated copyright claims be relesed. Free plan allows you to release 1 claim per month.
                    </Typography>
                    {/* <Typography
                        className={modal.download__text}
                        align="center"
                    >
                        To get an 
                        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}} component="span"> additional </Typography>
                        versions and loops in 
                        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}} component="span"> ultra-quality format</Typography>
                        , as well as 
                        <Typography sx={{fontWeight: "700", fontSize: "1.5rem"}} component="span"> unlimited claims release  </Typography>
                        for your videos, check our tariffs
                    </Typography>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        <a className={modal.link} href={process.env.NEXT_PUBLIC_PATREON} target="_blank">
                            here
                        </a>
                    </Typography> */}
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
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                        sx={{marginTop: "1.5rem"}}
                    >
                        To get an 
                        <Typography variant="h4" sx={{color: "#c4a70c"}} component="span"> additional </Typography>
                        versions and loops in 
                        <Typography variant="h4" sx={{color: "#c4a70c"}} component="span"> ultra-quality format</Typography>
                        , as well as 
                        <Typography variant="h4" sx={{color: "#c4a70c"}} component="span"> unlimited claims release  </Typography>
                        for your videos, check our tariffs
                    </Typography>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        <a className={modal.link} href={process.env.NEXT_PUBLIC_PATREON} target="_blank">
                            here
                        </a>
                    </Typography>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalFix;