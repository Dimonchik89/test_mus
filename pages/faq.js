import { Box } from "@mui/material";
import Header from "../components/Header/Header";

import main from "../styles/Main.module.scss"
import faq from "../styles/Faq.module.scss"
import AccordionBlock from "../components/Accordion/AccordionBlock";
import ModalFix from "../components/Modal/ModalFix";
import ModalError from "../components/Modal/ModalError";
import useChangeModalHook from "../hooks/useChangeModalHook";

const accordionContent = [
    {
        title: "Why did I receive a copyright claim to my video?",
        text: "Don’t worry, this is perfectly normal. Copyright claims just mean that the copyright owner has decided to either monetize, track, or block your video in certain territories.",
        link: null,
    },
    {
        title: "How can I get the copyright claim removed?",
        text: `If you receive copyright claims, you can remove them following this `,
        link: `${process.env.NEXT_PUBLIC_PAGE_URL}?fix=fix`
    },
    {
        title: "Is this music Royalty Free?",
        text: `Yes. This means that you can use the tracks in any way you like online, without having to pay any royalties or fees.`,
        link: null,
    },
    {
        title: "Where can I use your music?",
        text: `Our free audio tracks can be used for YouTube, blogs, music videos, websites, social media, podcasts, and online ads. However, they cannot be used for CDs, DVDs, video games, or TV/radio broadcasts.`,
        link: null,
    },
    {
        title: "Where I can use my music?",
        text: `All music on ${process.env.NEXT_PUBLIC_SITE_NAME} can be used in your commercial and non-commercial projects for free, including but not limited to:`,
        link: null,
        allowed: ['✅ YouTube videos*', '✅ Short videos (YouTube Shorts, Instagram Reels, TikTok, etc)', '✅ Podcasts', '✅ Websites and social media', '✅ Educational purposes'],
        forbidden: ['❌ CD & DVDs', '❌ TV & Radio Broadcasts', '❌ Advertising', '❌ Video games', '❌ Remix or remake music', '❌ Claim music as your own']
    },
]

const Faq = () => {
    const {fixModal, openFixModal, closeFixModal, errorModal, openErrorModal, closeErrorModal} = useChangeModalHook()

    return (
        <Box className={main.main}>
            <Box className={faq.body}>
                <Header/>
                <Box className="_container">
                    <AccordionBlock 
                        title={"FAQ"} 
                        accordionArray={accordionContent}
                        handleOpen={openFixModal}
                    />
                    <ModalFix show={fixModal} handleClose={closeFixModal} openError={openErrorModal}/>
                    <ModalError show={errorModal} handleClose={closeErrorModal}/>
                </Box>
            </Box>
        </Box>
    )
}
export default Faq;