import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import CarouselItem from "./CarouselItem";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";
import { categories } from '../../store/categories';
import { createStructuredSelector } from "reselect"
import { connect } from "react-redux";

import carousel from "../../styles/Carousel.module.scss";

const arr = ["title 1", "title 2", "title 3", "title 4", "title 5", "title 6", "title 7", "title 8"]

const Carousel = ({categories}) => {
    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)
    const swiperRef = useRef(null)
    const router = useRouter()

    const saveCarouselPosition = () => {
        const position = +swiperRef.current.childNodes[0].style.transform.split("(").pop().split(",")[0].split("p")[0]
        localStorage.setItem("carouselScroll", position)
    }

    useEffect(() => {
        const currentPosition = localStorage.getItem("carouselScroll")
        if(router.query?.categoryId) {
            setTimeout(() => {
                swiperRef.current.childNodes[0].style.transform = "translate3d(" + currentPosition + "px, 0px, 0px"
            }, 1000)
        }
    }, [])

    const carouselContent = categories?.map((item, i) => (
        <SwiperSlide key={i}>
            <CarouselItem 
                title={item.name} 
                link={item.id}
                img={item.img}
            />
        </SwiperSlide>
    ))

    return (
        <Box className={carousel.carousel}>
            <Box className={`${carousel.carousel__container} _container`}>
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1.4}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                    breakpoints={{
                        375: {
                            slidesPerView: 1.7
                        },
                        479.98: {
                            slidesPerView: 2.8
                        },
                        767.98: {
                            slidesPerView: 3.2
                        },
                        952: {
                            slidesPerView: 4.2
                        }
                    }}
                    onSlideChange={saveCarouselPosition}
                >
                    {carouselContent}

                </Swiper>

                    <Box className={carousel.carousel__navigation}>
                        <div 
                            className={carousel.carousel__control}
                            ref={navigationPrevRef}  
                        >
                            <ArrowBackIosNewIcon fontSize="large" sx={{color: '#F2D22B'}}/>
                        </div>
                        <div 
                            className={carousel.carousel__control}
                            ref={navigationNextRef}  
                        >
                            <ArrowForwardIosIcon fontSize="large" sx={{color: '#F2D22B'}}/>
                        </div>
                    </Box>
            </Box>
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    categories
})

export default connect(mapStateToProps)(Carousel);