import { Box } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

import footer from "../../styles/Footer.module.scss";


const FooterSocial = () => {

    return (
        <Box className={footer.social__block}>
            <a 
                className={footer.social__link}
                href="https://www.npmjs.com/package/react-share" 
                target="_blank"
            >
                <InstagramIcon
                    sx={{color: "white", fontSize: "3.5rem"}}
                />
            </a>
            <a 
                className={footer.social__link}
                href="https://www.npmjs.com/package/react-share" 
                target="_blank"
            >
                <FacebookIcon
                    sx={{color: "white", fontSize: "3.5rem"}}
                />
            </a>
            <a 
                className={footer.social__link}
                href="https://www.npmjs.com/package/react-share" 
                target="_blank"
            >
                <TwitterIcon
                    sx={{color: "white", fontSize: "3.5rem"}}
                />
            </a>
            <a 
                className={footer.social__link}
                href="https://www.npmjs.com/package/react-share" 
                target="_blank"
            >
                <YouTubeIcon
                    sx={{color: "white", fontSize: "3.5rem"}}
                />
            </a>
        </Box>
    )
}
export default FooterSocial;