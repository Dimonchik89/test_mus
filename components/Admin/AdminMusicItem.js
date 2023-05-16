import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { categories } from '../../store/categories/selectors';
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';
import useHttp from "../../hooks/useHttp";
import { bindActionCreators } from "@reduxjs/toolkit";
import { allTracksQty } from "../../store/tracks";
// import ModalMusicAdmin from "../Modal/ModalMusic/ModalMusicAdmin";
// import AlertMessage from "../AlertMessage/AlertMessage";
import { useRouter } from "next/router";

import helper from "../../styles/Helper.module.scss"
import admin from "../../styles/Admin.module.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import ModalAdminMusic from "../Modal/Admin/ModalAdminMusic";

const AdminMusicItem = ({music, categories}) => {
    const { deleteData, updateData } = useHttp(`api/music/${music.id}`)
    const [categoriesInSound, setCategoriesInSound] = useState([])
    const arrCategoriesId = music.categoryId.split(', ')
    const [showModalMusic, setShowModalMusic] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const router = useRouter()

    const query = router.query.page || 1

    useEffect(() => {
        setCategoriesInSound(categories.filter(item => arrCategoriesId.includes(`${item.id}`)))
    }, [categories])

    const handleDelete = () => {
        console.log("delete");
        deleteData()
            .then(data => {
                if(data.status === 200) {
                    router.push({
                        pathname: router.pathname,
                        query: router.query
                    }, null, {scroll: false, shalow: false})
                }
            })
    }

    const handleOpenAlert = ({status, text}) => {
        setShowAlert(prev => ({status, show: true, text}))
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(prev => ({...prev, show: false}));
    }

    const handleOpenModalMusic = () => {
        setShowModalMusic(true)
    }

    const handleCloseModalMusic = () => {
        setShowModalMusic(false)
    }

    const keywordsString = music?.keywords.join(", ")

    const categoryContent = categoriesInSound?.map(item => item.name).join(", ")

    return (
        <>
            <Box className={admin.music__item}>
                <picture>
                    <img
                        className={admin.music__img}
                        src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${music.img}`}
                        alt={music.name}
                    />
                </picture>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h4"
                        component="h4"
                    >
                        Name:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="span"
                        className={`${helper.text__capitalize} ${helper.fz__24}`}
                    >
                        {music.name}
                    </Typography>
                </Box>
                <Box className={admin.description__container}>
                    <Typography
                        variant="h4"
                        component="h4"
                        className={`${helper.text__capitalize} ${helper.fz__16}`}
                    >
                        Description:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        className={helper.fz__16}
                    >
                        {music.description}
                    </Typography>
                </Box>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h4"
                        component="h4"
                        className={helper.text__capitalize}
                    >
                        keywords:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        className={`${helper.text__capitalize} ${helper.fz__16}`}
                    >
                        {keywordsString}
                    </Typography>
                </Box>
                <Box className={admin.text__container}>
                    <Typography
                        variant="h4"
                        component="h4"
                        className={helper.text__capitalize}
                    >
                        category:
                    </Typography>
                    <Typography
                        variant="h5"
                        component="p"
                        className={`${helper.text__capitalize} ${helper.fz__16}`}
                    >
                        {categoryContent}
                    </Typography>
                </Box>

                <audio
                    controls
                    src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${music.audio}`}
                />
                <Box 
                    style={{padding: "0 .5rem"}}
                    className={`${helper.d__flex} ${helper.direction__column}`}
                >
                    <Button
                        variant="outlined"
                        className={helper.fz__16}
                        onClick={handleOpenModalMusic}
                    >
                        Update
                    </Button>
                    <Button
                        className={helper.fz__16}
                        variant="outlined"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
            <ModalAdminMusic 
                open={showModalMusic}
                handleClose={handleCloseModalMusic}    
                handleOpenAlert={handleOpenAlert}
                nameValue={music.name}
                descriptionValue={music.description}
                keywordsValue={music.keywords}
                categoryIdValue={music.categoryId.split(", ")}
                imgValue={music.img}
                audioValue={music.audio}
                serverFunc={updateData}
                buttonTitle="update"
                modalTitle="Update track"
            />
            <AlertMessage 
                handleClose={handleCloseAlert} 
                open={showAlert.show} 
                status={showAlert.status} 
                text={showAlert.text}
            /> 
        </>
    )
}

const mapStateToProps = createStructuredSelector({
    categories,
    allTracksQty
})


export default connect(mapStateToProps)(AdminMusicItem);