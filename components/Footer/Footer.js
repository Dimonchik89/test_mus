import { Box, Typography } from "@mui/material";
import FooterSocial from "./FooterSocial";
import { useEffect, useRef } from "react";

import helper from "../../styles/Helper.module.scss";
import footer from "../../styles/Footer.module.scss";

const Footer = () => {
    const footerRef = useRef(null)

    // useEffect(() => {

    //     const callback = (entries) => {
    //         if(entries[0].isIntersecting) {
    //             footerRef.current.className = `${footer.body} ${footer._active}`
    //         } else {
    //             footerRef.current.className = footer.body 
    //         }
    //     }

    //     const footerObserver = new IntersectionObserver(callback)
    //     footerObserver?.observe(footerRef.current)
    // },[])

    return (
        <Box 
            ref={footerRef}
            className={footer.body}
        >
            <Box className="_container">
                <Box className={footer.content}>
                    <Box className={footer.top}>
                        <Typography
                            variant="h1"
                            component="h1"
                            className={helper._title}
                        >
                            Follow us:
                        </Typography>
                        <FooterSocial/>
                    </Box>

                    <Box className={footer.bottom}>
                        <Typography
                            className={footer.link}
                        >
                            Got a Claim? Fix it
                        </Typography>
                        <Typography
                            className={footer.link}
                        >
                            FAQ
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
export default Footer;