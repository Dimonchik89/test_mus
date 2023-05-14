import { Box } from "@mui/material";

import button from "../../styles/Button.module.scss";

const TimecodeBlock = () => {

    return (
        <Box className={button.times__block}>
            <a 
                href={process.env.NEXT_PUBLIC_PARTEON} 
                className={button.time}
                target="_blank"
            >
                15
            </a>
            <a 
                href={process.env.NEXT_PUBLIC_PARTEON} 
                className={button.time}
                target="_blank"
            >
                30
            </a>
            <a 
                href={process.env.NEXT_PUBLIC_PARTEON} 
                className={button.time}
                target="_blank"
            >
                60
            </a>
            <a 
                href={process.env.NEXT_PUBLIC_PARTEON} 
                className={`${button.time} ${button.loop}`}
                target="_blank"
            >
                loops
            </a>
        </Box>
    )
}
export default TimecodeBlock;