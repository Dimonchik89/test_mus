import { Box } from "@mui/material";

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadWrapper = ({children}) => {

    return (
        <Box className={modal.download__wrapper}>
            {children}
        </Box>
    )
}
export default ModalDownloadWrapper;