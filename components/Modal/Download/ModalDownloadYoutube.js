import { Box, Typography } from "@mui/material"

import button from "../../../styles/Button.module.scss";
import modal from "../../../styles/Modal.module.scss";

const ModalDownloadYoutube = () => {

    return (
        <Box>
            <Typography
                variant="h4"
                component="h4"
                align="center"
                className={modal.download__subtitle}
            >
                Subscribe to Youtube
            </Typography>
            <Box className={modal.download__content}>
                <Box className={modal.subscribe__content}>
                    <img 
                        src={"./img/Logo_sm.png"} 
                        alt="Logo"
                        className={modal.download__logo}
                    />
                    <Typography
                        variant="body1"
                        component="span"
                        className={modal.download__text}
                    >
                        TuneBox: Free music for Content Creators   
                    </Typography>
                </Box>
                <a 
                    className={modal.subscribe__btn}
                    href={process.env.NEXT_PUBLIC_YOUTUBE}
                    target="_blank"
                >
                    Subscribe
                </a>
            </Box>
        </Box>
    )
}
export default ModalDownloadYoutube