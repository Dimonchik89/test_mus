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

import main from "../styles/Main.module.scss";
import Footer from "../components/Footer/Footer";
import ModalFix from "../components/Modal/ModalFix";

const Home = ({categories, setCategories, tracks, setTracks, setAllTracksQty, firstLoad, setSelectTrack, setTrackLoaded, selectTrack}) => {
  const router = useRouter()
  const [fixModal, setFixModal] = useState(false)

  const openFixModal = () => {
    setFixModal(true)
  }

  const closeFixModal = () => {
    setFixModal(false)
  }

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
    }
  }, [firstLoad])

  useEffect(() => {
    console.log("router.query?.sound0", router.query?.sound);
    if(router.query?.sound && tracks?.rows) {
      console.log("router.query?.sound", router.query?.sound);
        if(+router.query?.sound !== selectTrack?.id) {
          const track = tracks?.rows.find(item => item?.id == +router?.query?.sound)
          if(track) {
              setSelectTrack(track)
          }
        }
    }
  }, [tracks?.rows, router.query?.sound])

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
      <Player/>
      <ModalFix show={fixModal} handleClose={closeFixModal}/>
    </Box>
  )
}

Home.getInitialProps = async ({req, res, query}) => {
  const categories = await axios(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/category`)
  let firstLoad = true;
  let tracks;  
  if(!!req) {
    if(!query?.categoryId && !query?.page) {
      console.log("!query?.category && !query?.page1");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {sound: query?.sound}})
    } else if(query?.categoryId && !query?.page) {
      console.log("query?.category && !query?.page1");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, sound: query?.sound}})
    } else if(!query?.categoryId && query?.page) {
      console.log("!query?.category && query?.page1");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {page: query?.page, sound: query?.sound}})
    } else {
      console.log("all yes 1");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, page: query?.page, sound: query?.sound}})
    }
  } else {
    if(!query?.categoryId && !query?.page) {
      console.log('!query?.category && !query?.page2');
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`)
    } else if(query?.categoryId && !query?.page) {
      console.log("query?.category && !query?.page2");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId}})
    } else if(!query?.categoryId && query?.page) {
      console.log("!query?.category && query?.page2");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {page: query?.page}})
    } else {
      console.log("all yes 2");
      tracks = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}api/music`, {params: {categoryId: query?.categoryId, page: query?.page}})
    }
  }

  if(req && query.music) {
    firstLoad = false
  }
    
  return {
      categories: categories.data,
      tracks: tracks.data,
      firstLoad,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);

