import { Box } from "@mui/material";

import button from "../../styles/Button.module.scss";

const TimecodeBlock = ({openPatreonModal}) => {

    return (
        <Box className={button.times__block}>
            <button 
                onClick={openPatreonModal}
                className={button.time}
            >
                15
            </button>
            <button 
                onClick={openPatreonModal}
                className={button.time}
            >
                30
            </button>
            <button
                onClick={openPatreonModal} 
                className={button.time}
            >
                60
            </button>
            <button
                onClick={openPatreonModal} 
                className={`${button.time} ${button.loop}`}
            >
                loops
            </button>
        </Box>
    )
}
export default TimecodeBlock;