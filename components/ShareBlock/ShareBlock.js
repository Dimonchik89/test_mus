import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { FacebookShareButton, TelegramShareButton } from 'react-share';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';

import share from "../../styles/Share.module.scss"

const ShareBlock = ({trackId}) => {
    const router = useRouter()

    const url = new URLSearchParams({...router.query, sound: trackId})

    return (
        <div className={share.share__social}>
            <TelegramShareButton 
                url={`https://tuneboxmusic.org/?${url}`}
                className={share.social__item}
            >
                <TelegramIcon 
                    fontSize='large'
                />
                <Typography
                    variant="h6"
                    component="p"
                    className={share.social__title}
                >
                    Telegram
                </Typography>
            </TelegramShareButton>
            <FacebookShareButton 
                url={`https://tuneboxmusic.org/?${url}`}
                className={share.social__item}
            >
                <FacebookIcon fontSize='large'/>
                <Typography
                    variant="h6"
                    component="p"
                    className={share.social__title}
                >
                    Facebook
                </Typography>
            </FacebookShareButton>
        </div>
    )
}
export default ShareBlock;