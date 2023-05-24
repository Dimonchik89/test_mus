import { Box, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import modal from "../../../styles/Modal.module.scss";

const ModalDownloadSoundLink = ({trackId, trackName}) => {
    const router = useRouter()
    const soundQuery = router.asPath.replace("/", "")
    const {sound, ...tailQuery} = router.query
    const queryWithoutSound = new URLSearchParams(tailQuery).toString()
    const [copyText, setCopyText] = useState("")
    const [showSnack, setShowSnack] = useState(false)


    const copyLink = async (e) => {
        try {
            if(router.query?.sound && router.query?.sound == trackId) {
                await navigator.clipboard.writeText(`Song: ${trackName} \n Music provided by TuneBox \n ${process.env.NEXT_PUBLIC_SITE_PATH}?${soundQuery}`)
            } else {
                await navigator.clipboard.writeText(`Song: ${trackName} \n Music provided by TuneBox \n ${process.env.NEXT_PUBLIC_SITE_PATH}?${queryWithoutSound}&sound=${trackId}`)
            }
            setCopyText('Copied!');
            setShowSnack(true)

            setTimeout(() => {
                setShowSnack(false)
            }, 4000)
        } catch(e) {
            setCopyText('Failed to copy!');
            setShowSnack(true)

            setTimeout(() => {
                setShowSnack(false)
            }, 4000)
        }
    }

    const handleCloseSnack = () => {
        setShowSnack(false)
    }

    return (
        <Box>
            <Typography
                className={modal.download__subtitle}
                align="center"
            >
                Copy and paste this text into the description for your video
            </Typography>
            <Box className={modal.download__content}>
                <Box className={modal.download__links}>
                    <Typography
                        className={modal.download__text}
                    >
                        Song: {trackName}
                    </Typography>
                    <Typography
                        className={modal.download__text}
                    >
                        Music provided by TuneBox
                    </Typography>
                    <Box className={`d__flex align__center space__between ${modal.link__wrapper}`}>
                        <Typography
                            className={modal.download__text}
                        >
                            {router.query?.sound && router.query?.sound == trackId ?
                            `Free Download: ${process.env.NEXT_PUBLIC_SITE_PATH}?${soundQuery}` : 
                            `${process.env.NEXT_PUBLIC_SITE_PATH}?${queryWithoutSound}&sound=${trackId}`}
                        </Typography>

                        <IconButton
                            onClick={copyLink}
                        >
                            <ContentCopyIcon 
                                fontSize="large"
                                sx={{color: "#F2D22B"}}
                            />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Snackbar
                open={showSnack}
                autoHideDuration={3000}
                onClose={handleCloseSnack}
            >
                <Alert
                    severity={copyText === 'Copied!' ? "success" : "error"}
                    align="center"
                    sx={{alignSelf: "center", fontSize: "1.6rem"}}
                >
                    {copyText}
                </Alert>
            </Snackbar>
        </Box>
    )
}
export default ModalDownloadSoundLink;