import { Box, Button, Modal, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useSendMailHook from "../../hooks/useSendMailHook";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import modal from "../../styles/Modal.module.scss";

const ModalContact = ({show, handleClose}) => {
    const [email, setEmail] = useState("")
    const [textArea, setTextArea] = useState("")
    const {value, changeValue, handleSubit} = useSendMailHook(handleClose)
    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault()
        changeValue(`Email: ${email}; Message: ${textArea}`)
        setTextArea("")
        setEmail("")
        await handleSubit(e)
        handleClose()
    }

    return (
        <Modal
            open={show}
            onClose={handleClose}
            >
            <Box className={modal.body}>
                <Box className={modal.content}>
                    <Typography
                        variant="h4" 
                        component="h2"
                        align="center"
                    >
                        Have a question? Feel free to ask
                    </Typography>
                    <div className={modal.form}>
                        <input
                            type="text"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Your email"
                            className={modal.fix__input}
                        />
                    </div>

                    <form
                        onSubmit={submitForm}
                        className={`${modal.form} ${modal.height__auto}`}
                    >

                        <textarea
                            type="text"
                            rows="4"
                            value={textArea}
                            onChange={e => setTextArea(e.target.value)}
                            className={modal.textarea}
                        />
                        <Button 
                            type="submit"
                            className={modal.submit}
                            endIcon={<ArrowForwardIcon />}
                        >
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalContact;