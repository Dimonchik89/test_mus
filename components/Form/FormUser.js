import { Box } from "@mui/material";
import { useState } from "react";

import login from "../../styles/Login.module.scss"

const FormUser = ({handleSubmit}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Box className={login.wrapper}>
            <h1 className={login.title}>Log in</h1>
            <form
                className={login.form}
                onSubmit={(e) => handleSubmit({e, email, password})}
            >
                <input 
                    type="text" 
                    placeholder="Email"
                    className={login.input}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    autoComplete="false"
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className={login.input}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button 
                    className={login.submit}
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </Box>
    )
}

export default FormUser;