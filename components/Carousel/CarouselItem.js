import { Box } from "@mui/material";
import { useRouter } from "next/router";
import carousel from "../../styles/Carousel.module.scss";
import { useEffect } from "react";

const CarouselItem = ({title, link, img}) => {
    const router = useRouter()
    const activeCategory = router.query.categoryId
    const activeClass = activeCategory == link ? carousel.carousel__card_active : "";
    const {page, ...tailQuery} = router.query;

    return (
        <Box 
            className={`${carousel.carousel__card} ${activeClass}`}
            onClick={() => {
                router.push({
                    pathname: "/",
                    query: {...tailQuery, categoryId: link}
                }, null, {scroll: false, shallow: false})
            }}
        >
            <img src={`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}${img}`} alt="img"/>
            <p className={carousel.carousel__title}>{title}</p>
        </Box>
    )
}
export default CarouselItem;