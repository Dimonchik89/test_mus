import { useState } from "react";
import { sendEmail } from "../api/sendEmail";


const useSendMailHook = (handleClose) => {
    const [value, setValue] = useState("")

    const handleSubit = async (e) => {
        e.preventDefault()
        
        console.log("hookvalue", value);
        const response = await sendEmail(value)
        if(response.status === 200) {
            setValue("")
            handleClose()
        } else {
            setValue("")
            handleClose()
            // openError()
        }
    }

    const changeValue = (text) => {
        setValue(text)
    }

    return { value, handleSubit, changeValue }
}

export default useSendMailHook;