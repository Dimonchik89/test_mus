import { Box } from "@mui/material";
import Header from "../components/Header/Header";

import main from "../styles/Main.module.scss"
import faq from "../styles/Faq.module.scss"

const Faq = () => {

    return (
        <Box className={main.main}>
            <Box className={faq.body}>
                <Header/>
            </Box>
        </Box>
    )
}
export default Faq;