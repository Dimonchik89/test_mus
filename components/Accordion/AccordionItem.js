import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';

import accordion from "../../styles/Accordion.module.scss";

const AccordionItem = ({title, text, link, allowed, forbidden, handleOpen}) => {
    const allowedContainer = allowed?.map((item, i) => <Typography variant="h4" component="h5" key={i}>{item}</Typography>)
    const forbiddenContainer = forbidden?.map((item, i) => <Typography variant='h4' component="h5" key={i}>{item}</Typography>)

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Box>
                    <Typography
                        variant="h3"
                        component="h3"
                    >
                        {title}
                    </Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box className={accordion.content}>
                    <Typography
                        variant="h4"
                        component="span"
                    >
                        {text}
                    </Typography>
                    {!!link ? 
                        <button 
                            className={accordion.btn}
                            onClick={handleOpen}
                        >
                            form
                        </button> : 
                    null}
                    {allowedContainer}
                </Box>
                            
                {!!allowed ? <Typography
                    variant="h4"
                    component="span"
                >
                    Not Allowed:
                </Typography> : null}
                {forbiddenContainer}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionItem;