import { Box, Button, Container } from "@mui/material"
import HeaderAdmin from "../../components/Header/HeaderAdmin"
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"
import { userRole, setUser } from '../../store/user';
import { createStructuredSelector } from 'reselect';
import { tracks, allTracksQty, setTracks, setAllTracksQty } from "../../store/tracks";
import { setCategories } from "../../store/categories/categoriesSlice";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';
import AdminMusicItem from "../../components/Admin/AdminMusicItem";
import useHttp from "../../hooks/useHttp";
import { useRouter } from "next/router";
import Paginations from "../../components/Paginations/Paginations";

import helper from "../../styles/Helper.module.scss"
import admin from "../../styles/Admin.module.scss";
import ModalAdminMusic from '../../components/Modal/Admin/ModalAdminMusic';
import AlertMessage from "../../components/AlertMessage/AlertMessage";


const AdminSound = ({checkRole, music, categories, tracks, allTracksQty, setTracks, setAllTracksQty, setCategories, setUser}) => {
    const [showModalMusic, setShowModalMusic] = useState(false)
    const [showAlert, setShowAlert] = useState({show: false, status: null, text: ""})
    const {postData} = useHttp('api/music')
    const router = useRouter()


    useEffect(() => {
        setTracks(music?.rows);
        setAllTracksQty(music?.count)
        console.log(music);
    }, [music])

    useEffect(() => {
        setCategories(categories)
    }, [categories])

    // useEffect(() => {
    //     if(checkRole?.token && jwt_decode(checkRole?.token).role !== "ADMIN") {
    //         router.push('/')
    //     }
    // }, [])

    useEffect(() => {
        console.log('checkRole', checkRole);
        if(checkRole?.token) {
            setCookie("accessToken", checkRole.token)
            const user = jwt_decode(checkRole.token)
            setUser(user)
        } else if(checkRole.message) {
            router.push('/')
        }
    }, [checkRole])

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

    const content = tracks?.map(item => <AdminMusicItem key={item.id} music={item}/>)

    return (
        <Box>
            <HeaderAdmin/>
            <Container maxWidth="xl">
                <Box className={admin.container}>
                    <Box>
                        <Button 
                            variant="outlined"
                            onClick={handleOpenModalMusic}
                            className={helper.fz__16}
                        >
                            Add music
                        </Button>
                    </Box>
                    <Box className={admin.music__wrapper}>
                        {content}
                    </Box>
                </Box>
            </Container>
            <Box sx={{background: "#000", padding: "1rem 0"}}>
                <Paginations allTracksQty={allTracksQty}/>
            </Box>
            <ModalAdminMusic 
                open={showModalMusic}
                handleClose={handleCloseModalMusic}    
                handleOpenAlert={handleOpenAlert}
                nameValue=""
                descriptionValue=""
                categoryIdValue={[]}
                keywordsValue=""
                imgValue={null}
                audioValue={null}
                serverFunc={postData}
                buttonTitle="create"
                modalTitle="Add track"
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
    userRole,
    tracks,
    allTracksQty
})

const mapDispatchToProps = dispatch => ({
    setTracks: bindActionCreators(setTracks, dispatch),
    setAllTracksQty: bindActionCreators(setAllTracksQty, dispatch),
    setCategories: bindActionCreators(setCategories, dispatch),
    setUser: bindActionCreators(setUser, dispatch)
})

export async function getServerSideProps(appContext) {
    const {req, res, query} = appContext
    const responseChekRole = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/user/auth`, {
        headers: {
        'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('accessToken', { req, res })}`))}`
        }
    })
    const checkRole = await responseChekRole.json()

    const responseMusic = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music?` + new URLSearchParams({...query}))
    const music = await responseMusic.json()

    const resposne = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/category`)

    const errorCode = await resposne.ok ? false : resposne.statusCode
    const categories = await resposne.json()
    
    if(checkRole.role != "ADMIN") {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

  return {
    props: {
        checkRole,
        music,
        categories
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSound);