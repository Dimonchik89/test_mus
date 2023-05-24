import MainLayout from "../components/Layout/MainLayout";
import Header from "../components/Header/Header";
import { Box } from "@mui/material";
import Main from "../components/Main/Main";
import Carousel from "../components/Carousel/Carousel";
import Tracks from "../components/Tracks/Tracks";
import Player from "../components/Player/Player";
import { useEffect, useState } from "react";
import axios from "axios";
import { setCategories } from "../store/categories/categoriesSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { setTracks, setAllTracksQty, setSelectTrack, setTrackLoaded, selectTrack } from "../store/tracks";
import { useRouter } from "next/router";
import { createStructuredSelector } from 'reselect';
import { setCookie, getCookie } from 'cookies-next';
import jwt_decode from "jwt-decode";
import { setUser } from "../store/user/userSlice";

import main from "../styles/Main.module.scss";
import Footer from "../components/Footer/Footer";
import ModalFix from "../components/Modal/ModalFix";
import ModalError from "../components/Modal/ModalError";
import useChangeModalHook from "../hooks/useChangeModalHook";

const Home = ({categories, setCategories, tracks, setTracks, setAllTracksQty, firstLoad, setSelectTrack, setTrackLoaded, selectTrack, checkRole, setUser}) => {
  const router = useRouter()
  const [firstLoading, setFirstLoading] = useState(true)
  const {fixModal, openFixModal, closeFixModal, errorModal, openErrorModal, closeErrorModal} = useChangeModalHook()

  useEffect(() => {
    setCategories(categories)
  }, [categories])

  useEffect(() =>{
    setTracks(tracks?.rows)
    setAllTracksQty(tracks?.count)
    setTrackLoaded(true)
  },[tracks])

  useEffect(() => {
    const {page, ...tailQuery} = router.query
    if(firstLoad) {
      const {page, ...tailQuery} = router.query
      router.push({
        pathname: "/",
        query: {...tailQuery}
      }, null, {scroll: false, shallow: true})
      setFirstLoading(false)
    }
  }, [firstLoad])

  useEffect(() => {
    if(router.query?.sound && tracks?.rows) {
        if(+router.query?.sound !== selectTrack?.id) {
          const track = tracks?.rows.find(item => item?.id == +router?.query?.sound)
          if(track) {
              setSelectTrack(track)
          }
        }
    }
  }, [tracks?.rows, router.query?.sound])

  const changeFirstLoad = () => {
    setFirstLoading(false)
  }

  useEffect(() => {
    if(checkRole?.token) {
      setCookie("accessToken", checkRole?.token)
      const user = jwt_decode(checkRole?.token)
      setUser(user)
    }
  }, [checkRole])

  useEffect(() => {
    if(router.query?.modal) {
      console.log("ok", router.query?.modal);
      openFixModal()
    } else {
      console.log("false");
    }
  }, [router.query?.modal])

  return (
    <Box>
      <Box className={main.main}>
        <Header/>
        <Main/>
        <Carousel/>
      </Box>
      <Box className={main.wrapper}>
        <Tracks/>
        <Footer
          openModal={openFixModal}
          closeModal={closeFixModal}
        />
      </Box>
      <Player 
        firstLoad={firstLoading}
        setFirstLoad={changeFirstLoad}
      />
      <ModalFix show={fixModal} handleClose={closeFixModal} openError={openErrorModal}/>
      <ModalError show={errorModal} handleClose={closeErrorModal}/>
    </Box>
  )
}

Home.getInitialProps = async ({req, res, query}) => {
  const categories = await axios(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/category`)
  let firstLoad = true;
  let tracks;  
  if(!!req) {
    // if(!query?.categoryId && !query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {sound: query?.sound}})
    // } else if(query?.categoryId && !query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, sound: query?.sound}})
    // } else if(!query?.categoryId && query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {page: query?.page, sound: query?.sound}})
    // } else {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, page: query?.page, sound: query?.sound}})
    // }
    tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {...query}})
  } else {
    const {sound, ...tailQuery} = query
    tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {...tailQuery}})
    // if(!query?.categoryId && !query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`)
    // } else if(query?.categoryId && !query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId}})
    // } else if(!query?.categoryId && query?.page) {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {page: query?.page}})
    // } else {
    //   tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, page: query?.page}})
    // }
  }
  
  const responseChekRole = await fetch(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/user/auth`, {
    headers: {
      'authorization': `${unescape(encodeURIComponent(`Bearer ${getCookie('accessToken', { req, res })}`))}`
    }
  })
  const checkRole = await responseChekRole.json()

  if(req && query.music) {
    firstLoad = false
  }
    
  return {
      categories: categories.data,
      tracks: tracks.data,
      firstLoad,
      checkRole
  }
}

const mapStateToProps = createStructuredSelector({
  selectTrack
})

const mapDispatchToProps = dispatch => ({
  setCategories: bindActionCreators(setCategories, dispatch),
  setTracks: bindActionCreators(setTracks, dispatch),
  setAllTracksQty: bindActionCreators(setAllTracksQty, dispatch),
  setSelectTrack: bindActionCreators(setSelectTrack, dispatch),
  setTrackLoaded: bindActionCreators(setTrackLoaded, dispatch),
  setUser: bindActionCreators(setUser, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

