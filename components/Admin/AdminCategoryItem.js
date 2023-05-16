import { useState } from "react"
import useHttp from "../../hooks/useHttp"
import { Box, Button, Typography } from "@mui/material"
import AlertMessage from "../AlertMessage/AlertMessage"
import ModalUserError from "../Modal/ModalUserError";
import ModalAdminCategory from "../Modal/Admin/ModalAdminCategory";
import { useRouter } from "next/router";

import admin from "../../styles/Admin.module.scss";
import helper from "../../styles/Helper.module.scss";

const AdminCategoryItem = ({category}) => {
    const { deleteData, updateData } = useHttp(`api/category/${category.id}`)
    const [errorModal, setErrorModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const router = useRouter()

    const deleteCategory = async () => {
        const response = await deleteData()
        if(response.status === 200) {
            // removeCategory(category.id)
            router.push({
                pathname: router.pathname
            }, null, {scroll: false, shallow: false})
        } else {
            setErrorModal(true)
        }
    }

    // useEffect(() => {
    //     console.log("category", category);
    // }, [category])

    const handleOpenAlert = ({status, text}) => {
        setShowAlert(prev => ({status, show: true, text}))
    }

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(prev => ({...prev, show: false}));
    }

    const handleCloseErrorModal = () => {
        setErrorModal(false)
    }

    const handleOpenUpdateModal = () => {
        setUpdateModal(true)
    }

    const handleCloseUpdateModal = () => {
        setUpdateModal(false)
    }

    return (
        <>
            <Box className={admin.category__item}>
                <picture>
                    <img
                        className={admin.image}
                        src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${category.img}`}
                        alt={category.name}
                    />
                </picture>
                <Typography
                    variant="h6"
                    component="p"
                    className={admin.text}
                >
                    {category.name}
                </Typography>
                <Box style={{marginRight: "2rem"}}>
                    <Button 
                        variant="outlined"
                        onClick={handleOpenUpdateModal}
                        className={helper.fz__16}
                    >
                        Update
                    </Button>
                </Box>
                <Button 
                    variant="outlined"
                    color="error"
                    className={helper.fz__16}
                    onClick={deleteCategory}
                >
                    Delete
                </Button>
            </Box>
            {/* <ErrorModal 
                open={errorModal} 
                handleClose={handleCloseErrorModal} 
                text="category not deleted, try later"
            /> */}
            <ModalUserError 
                show={errorModal} 
                handleClose={handleCloseErrorModal} 
                title="category not deleted, try later"
            />
            <ModalAdminCategory 
                open={updateModal} 
                handleClose={handleCloseUpdateModal} 
                category={category} 
                handleOpenAlert={handleOpenAlert}
                nameValue={category.name}
                imgValue={category.img}
                serverFunc={updateData}
                buttonTitle="update"
            />
            <AlertMessage 
                handleClose={handleCloseAlert} 
                open={showAlert.show} 
                status={showAlert.status} 
                text={showAlert.text}/>
        </>

    )
}
export default AdminCategoryItem;