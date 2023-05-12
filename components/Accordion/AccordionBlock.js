import Typography from '@mui/material/Typography';
import AccordionItem from './AccordionItem';
import { Box } from '@mui/material';

import accordion from "../../styles/Accordion.module.scss";

const AccordionBlock = ({title, accordionArray, handleOpen}) => {

    const content = accordionArray?.map((item, i) => {
        return <AccordionItem 
                    key={i} 
                    title={item.title} 
                    text={item.text} 
                    link={item.link} 
                    allowed={item?.allowed} 
                    forbidden={item?.forbidden}
                    handleOpen={handleOpen}
                />
    })

    return (
        <Box className={accordion.body}>
            <Typography
                variant='h2'
                component="h3"
                textAlign="center"
                className={accordion.title}
            >
                {title}
            </Typography>
            <div>
                {content}
            </div>
        </Box>
    )
}

export default AccordionBlock