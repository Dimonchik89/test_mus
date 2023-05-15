import { Box, Typography } from "@mui/material";
import FooterSocial from "./FooterSocial";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import helper from "../../styles/Helper.module.scss";
import footer from "../../styles/Footer.module.scss";

const Footer = ({openModal, closeModal}) => {
    const footerRef = useRef(null)
    const router = useRouter()

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
                            onClick={openModal}
                        >
                            Got a Claim? Fix it
                        </Typography>
                        <a 
                            href={process.env.NEXT_PUBLIC_PATREON} 
                            target="_blank" 
                            className={`${footer.link} ${footer.link__center}`}
                        >
                            Tarifs
                        </a>
                        <Typography
                            className={footer.link}
                            onClick={() => router.push("/faq")}
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