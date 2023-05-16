import { useRef, useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, TextField, Typography, CircularProgress } from "@mui/material"
import { useFormik, Field, FormikProvider } from "formik"
import { musicValidate } from '../../../validate/validate';
import { useRouter } from "next/router";
// import { allCategory } from "../../../store/category";
import { categories } from "../../../store/categories/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
// import { fetchMusic } from "../../../store/actualMusics/musicsSlice";
import { bindActionCreators } from "@reduxjs/toolkit";

import error from "../../../styles/Error.module.scss";
import modal from "../../../styles/Modal.module.scss";
import helper from "../../../styles/Helper.module.scss";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  height: "75%",
  overflowY: "scroll",
  p: 4,
};

const ModalAdminMusic = ({categories, open, handleClose, handleOpenAlert, nameValue, imgValue, descriptionValue, categoryIdValue, keywordsValue, audioValue, serverFunc, buttonTitle, modalTitle}) => {
    const imgRef = useRef(null)
    const audioRef = useRef(null)
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const query = router.query.page || 1

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
            description: descriptionValue,
            categoryId: categoryIdValue,
            keywords: keywordsValue,
            audio: audioValue,
            img: imgValue
        },
        validate: musicValidate,
        onSubmit: async (values) => {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", values.name.trim())
            formData.append("description", values.description.trim())
            formData.append("keywords", values.keywords)
            formData.append("categoryId", values.categoryId.join(", "))
            formData.append("img", values.img)
            formData.append("audio", values.audio)
            const response = await serverFunc(formData)
            console.log("admin modal response", response);
            if(response.status === 200) {
                setLoading(false)
                handleClose()
                handleOpenAlert({status: response.status, text: response.statusText})
                if(buttonTitle === "create") {
                    values.name = ""
                    values.description = ""
                    values.categoryId = "" 
                    values.keywords = null
                    values.audio = null
                    values.img = null
                } else {
                    values.audio = response.data?.audio
                    values.img = response.data?.img
                }

                //-----
                router.push({
                    pathname: router.pathname,
                    query: router.query
                }, null, {scroll: false, shallow: false})
                // fetchMusic(`/music?page=${query}`)
                // fetchMusic(`/music`)
            } else {
                setLoading(false)
                handleClose()
                handleOpenAlert({status: response.response.status, text: response.message})
            }
        }
    })

    return (
        <FormikProvider value={formik}>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <Typography 
                    variant="h4" 
                    component="h2" 
                    textAlign="center"
                    className={helper.fz__24}
                >
                    {modalTitle}
                </Typography>
                <Box>
                    <form
                        onSubmit={formik.handleSubmit}
                        className={modal.form__update}
                    >
                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="Track name"
                                variant="standard" 
                                name="name"
                                type="text"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 20}}}
                                InputLabelProps={{style: {fontSize: 14}}}
                            />
                            {(formik.errors.name && formik.touched.name) ? <div className={error.error}>{formik.errors.name}</div> : null}
                        </Box>

                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="description"
                                variant="standard" 
                                name="description"
                                type="text"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 16, lineHeight: 1.4}, maxLength: 100}}
                                InputLabelProps={{style: {fontSize: 14}}}
                                rows={6}
                                multiline
                            />
                            {(formik.errors.description && formik.touched.description) ? <div className={error.error}>{formik.errors.description}</div> : null}
                        </Box>

                        <Box className={modal.field__wrapper}>
                            <TextField
                                className={modal.category__field}
                                label="keywords"
                                variant="standard" 
                                name="keywords"
                                type="text"
                                value={formik.values.keywords}
                                onChange={formik.handleChange}
                                fullWidth
                                inputProps={{style: {fontSize: 16}, maxLength: 100}}
                                InputLabelProps={{style: {fontSize: 14}}}
                            />
                            {(formik.errors.keywords && formik.touched.keywords) ? <div className={error.error}>{formik.errors.keywords}</div> : null}
                        </Box>

                        <Box style={{marginTop: "2.5rem"}}>
                            <Typography
                                variant="h4"
                                component="h6"
                            >
                                Select Category
                            </Typography>
                            <FormGroup>
                                {categories?.map(category => <Field
                                                                type="checkbox"
                                                                name="categoryId"
                                                                value={category.id}
                                                                key={category.id}
                                                                as={FormControlLabel}
                                                                control={<Checkbox/>}
                                                                checked={formik.values.categoryId.includes(`${category.id}`)}
                                                                label={category.name}
                                                               />
                                )}
                            </FormGroup>
                        </Box>

                        <Box className={modal.img__wrapper}>
                            <Box className={helper.fz__24}>
                                Music: {formik.values?.audio?.name || formik.values?.audio}
                            </Box>
                            <input 
                                className={modal.file}
                                ref={audioRef}
                                type="file"
                                name="audio"
                                accept='audio/*'
                                onChange={(e) => {
                                    formik.setFieldValue('audio', e.currentTarget.files[0])
                                }}
                            />
                            {(formik.errors.audio && formik.touched.audio) ? <div className={error.error}>{formik.errors.audio}</div> : null}
                        </Box>

                        <Box className={modal.img__wrapper}>
                            <Box 
                                id="label__create"
                                className={modal.img}
                                style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${formik.values.img})`}}
                            ></Box>
                            <input 
                                className={modal.file}
                                ref={imgRef}
                                type="file"
                                name="img"
                                accept='image/*'
                                onChange={(e) => {
                                    changePreview(e)
                                    formik.setFieldValue('img', e.currentTarget.files[0])
                                }}
                            />
                            {(formik.errors.img && formik.touched.img) ? <div className={error.error}>{formik.errors.img}</div> : null}
                        </Box>

                        <Box className={`${helper.d__flex} ${helper.space__between}`}>
                            <Button
                                variant="outlined"
                                className={helper.fz__16}
                                onClick={() => imgRef.current.click()}
                            >
                                Select Photo
                            </Button>
                            <Button
                                variant="outlined"
                                className={helper.fz__16}
                                onClick={() => audioRef.current.click()}
                            >
                                Select Music
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
        </FormikProvider>
    )
}

const mapStateToProps = createStructuredSelector({
    categories
})

// const mapDispatchToProps = dispatch => ({

// })

export default connect(mapStateToProps)(ModalAdminMusic);