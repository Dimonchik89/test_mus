import { Box, Typography } from "@mui/material";

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadPatreon = () => {

    return (
        <Box className={modal.patreon}>
            <Typography
                className={modal.download__text}
                align="center"
            >
                Free plan allows you to release 1 claim per month.
            </Typography>
            <Typography
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
                className={modal.download__text}
                align="center"
            >
                <a className={modal.link} href={process.env.NEXT_PUBLIC_PATREON} target="_blank">here</a>
            </Typography>
        </Box>
    )
}
export default ModalDownloadPatreon;