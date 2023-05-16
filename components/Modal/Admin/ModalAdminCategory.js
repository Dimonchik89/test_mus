import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { categoryValidate } from "../../../validate/validate";
import { Box, Button, Modal, TextField, Typography, CircularProgress } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

import helper from "../../../styles/Helper.module.scss"
import modal from "../../../styles/Modal.module.scss"

const ModalAdminCategory = ({open, handleClose, handleOpenAlert, nameValue, imgValue, serverFunc, buttonTitle}) => {
    const file = useRef(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const changePreview = (e) => {
        const selectImg = e.target.files[0]
        if (selectImg) {
            let fr = new FileReader();

            fr.addEventListener("load", function () {
                document.querySelector("#label__create").style.backgroundImage = "url(" + fr.result + ")";
            }, false);

            fr.readAsDataURL(e.target.files[0]);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: nameValue,
            img: imgValue,

        },
        validate: categoryValidate,
        onSubmit: async (values) => {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", values.name.trim())
            formData.append("img", values.img)
            const response = await serverFunc(formData)
            if(response.status === 200) {
                setLoading(false)
                if(buttonTitle === "create") {
                    values.name = ""
                    values.img = ""
                } else {
                    values.img = response.data?.img
                }
                handleClose()
                handleOpenAlert({status: response.status, text: response.statusText})
                // fetchCategory('/category')
                router.push({
                    pathname: router.pathname
                }, null, {scroll: false, shallow: false})
            } else {
                setLoading(false)
                handleClose()
                handleOpenAlert({status: response.response.status, text: response.message})
                // values.name = ""
                // values.img = null
            }
        }
    })

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography 
                    id="modal-modal-title" 
                    variant="h4" 
                    component="h2" 
                    textAlign="center"
                    className={helper.fz__24}
                >
                    Create category
                </Typography>
                <Box>
                    <form
                        onSubmit={formik.handleSubmit}
                        className={modal.form__update}
                    >
                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="Name Category"
                                variant="standard" 
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 20}}}
                                InputLabelProps={{style: {fontSize: 14}}}
                            />
                            {formik.errors.name ? <div className={error.error}>{formik.errors.name}</div> : null}
                        </Box>

                        <Box className={modal.img__wrapper}>
                            <Box 
                                id="label__create"
                                className={modal.img}
                                style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${formik.values.img})`}}
                            ></Box>
                            <input 
                                className={modal.file}
                                ref={file}
                                type="file"
                                name="img"
                                accept='image/*'
                                onChange={(e) => {
                                    changePreview(e)
                                    formik.setFieldValue('img', e.currentTarget.files[0])
                                }}
                            />
                            {formik.errors.img ? <div className={error.error}>{formik.errors.img}</div> : null}
                        </Box>

                        <Box className={`d__flex space__between`}>
                            <Button
                                variant="outlined"
                                className={helper.fz__16}
                                onClick={() => file.current.click()}
                            >
                                Select Photo
                            </Button>
                            {
                                loading ?
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    color="success"
                                    disabled
                                >
                                    <CircularProgress size={16}/>
                                </Button> :
                                <Button
                                    variant="outlined"
                                    type="submit"
                                    color="success"
                                    className={helper.fz__16}
                                >
                                    {buttonTitle}
                                </Button>
                            }
                        </Box>
                    </form>
                </Box>
            </Box>
        </Modal>
    )
}
export default ModalAdminCategory;