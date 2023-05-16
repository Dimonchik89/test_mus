import { Box, Button, Container } from "@mui/material"
import HeaderAdmin from "../../components/Header/HeaderAdmin"
import { categories, setCategories } from "../../store/categories"
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useHttp from "../../hooks/useHttp";
import AdminCategoryItem from "../../components/Admin/AdminCategoryItem";
import ModalAdminCategory from "../../components/Modal/Admin/ModalAdminCategory";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

import admin from "../../styles/Admin.module.scss"
import helper from "../../styles/Helper.module.scss"

const AdminCategory = ({ categories, setCategories, serverCategories, errorCode }) => {
        const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const router = useRouter()
    const { postData } = useHttp('/category')

    useEffect(() => {
        setCategories(serverCategories)
    }, [serverCategories])

    if(errorCode) {
        return (
            <Button
                onClick={() => router.reload()}
            >
                Ups, Reload page
            </Button>
        )
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

    const handleOpen = () => {
        setShowModal(true)
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const content = categories?.map(category => <AdminCategoryItem key={category.id} category={category}/>)

    return (
        <Box>
            <HeaderAdmin/>
            <Box className={admin.container}>
                <Box 
                    className={helper.text__center}
                >
                    <Button 
                        variant="outlined"
                        onClick={handleOpen}  
                        className={helper.fz__16}
                    >
                        Create category
                    </Button>
                </Box>
                <Container className={admin.category__container}>
                    <Box className={admin.category__wrapper}>
                        {content}
                    </Box>
                </Container>
            </Box>
            <ModalAdminCategory
                open={showModal} 
                handleClose={handleClose} 
                handleOpenAlert={handleOpenAlert}
                nameValue=""
                imgValue=""
                serverFunc={postData}
                buttonTitle="create"
            />
            <AlertMessage 
                handleClose={handleCloseAlert} 
                open={showAlert.show} 
                status={showAlert.status} 
                text={showAlert.text}
            />
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    categories
})

const mapDispatchToProps = dispatch => ({
    setCategories: bindActionCreators(setCategories, dispatch)
})

export async function getServerSideProps() {
    const resposne = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/category`)
    const errorCode = await resposne.ok ? false : resposne.statusCode
    const categories = await resposne.json()

    return {
        props: {
            serverCategories: categories,
            errorCode
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategory)