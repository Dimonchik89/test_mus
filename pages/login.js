import { Box } from "@mui/material";
import Header from "../components/Header/Header";
import axios from "axios";
import { useState } from "react";
import ModalUserError from "../components/Modal/ModalUserError";
import useChangeModalHook from "../hooks/useChangeModalHook";
import jwt_decode from "jwt-decode"
import { setUser } from "../store/user"
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from "react-redux";
import { setCookie } from "cookies-next";

import main from "../styles/Main.module.scss"
import login from "../styles/Login.module.scss"
import FormUser from "../components/Form/FormUser";


const Login = ({setUser}) => {
    const {errorModal, closeErrorModal, openErrorModal} = useChangeModalHook();
    const [errorMessage, setErrorMessage] = useState("")

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbnRpYmFudHVuZWJveEBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2ODM4ODg3NTQsImV4cCI6MTY4Mzk3NTE1NH0.NijI-EbvNqxYCxu1xAd9EqrpHzh_82OezBKiQJtG9jo
 
    const handleSubmit = async ({e, email, password}) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/user/login`, {
                email,
                password
            }) 
            const {token} = await response.data
            const user = jwt_decode(token)
            setUser(user)
            setCookie("accessToken", token)
        } catch(err) {
            setErrorMessage(err?.response?.data?.message)
            openErrorModal()
        }
    }

    return (
        <Box className={main.main}>
            <Box className={login.body}>
                <Header/>
                <Box className="_container">
                    <FormUser handleSubmit={handleSubmit}/>
                </Box>
            </Box>
            <ModalUserError
                show={errorModal}
                handleClose={closeErrorModal}
                title={errorMessage}
            />
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    setUser: bindActionCreators(setUser, dispatch)
})

export default connect(null, mapDispatchToProps)(Login);