import { Box, Button, Modal, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useSendMailHook from "../../hooks/useSendMailHook";
import { useState } from "react";
import { useRouter } from "next/router";
import { handleOpenAlert } from "../../store/alert";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import modal from "../../styles/Modal.module.scss";

const ModalContact = ({show, handleClose, handleOpenAlert}) => {
    const {value, changeValue, handleSubit} = useSendMailHook(handleClose)
    const router = useRouter()
    const [universalValue, setUniversalValue] = useState({email: "", textArea: ""})


    const submitForm = async (e) => {
        e.preventDefault()

        await handleSubit(e)
        handleClose()
        handleOpenAlert()
        setUniversalValue({email: "", textArea: ""})
    }

    const handleChangeValue = ({target}) => {
        setUniversalValue({...universalValue, [target.name]: target.value})
        changeValue(`Email: ${universalValue.email}; Message: ${universalValue.textArea}`)
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
                            value={universalValue.email}
                            onChange={e => handleChangeValue(e)}
                            placeholder="Your email"
                            className={modal.fix__input}
                            name="email"
                        />
                    </div>

                    <form
                        onSubmit={submitForm}
                        className={`${modal.form} ${modal.height__auto}`}
                    >

                        <textarea
                            type="text"
                            rows="4"
                            value={universalValue.textArea}
                            onChange={e => handleChangeValue(e)}
                            className={modal.textarea}
                            name="textArea"
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

const mapDispatchToProps = dispatch => ({
    handleOpenAlert: bindActionCreators(handleOpenAlert, dispatch)
})

export default connect(null, mapDispatchToProps)(ModalContact);