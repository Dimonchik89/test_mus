import { Box, Typography } from "@mui/material";

import helper from "../../styles/Helper.module.scss";
import main from "../../styles/Main.module.scss";

const Main = () => {

    return (
        <>
            <Box className={main.main__label}>
                <Box className="_container">
                    <Box className={main.label__wrapepr}>
                        <Typography
                            variant="h1"
                            component="h1"
                            className={`${helper._uppercase} ${helper._title} ${main.label__title}`}
                        >
                            ROYALTY FREE MUSIC FOR VIDEO WITHOUT CLAIMS
                        </Typography>
                        <Typography
                            variant="h1"
                            component="h1"
                            className={`${main.label__title}`}
                        >
                            100% Claim-Free for any Platforms
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export default Main;