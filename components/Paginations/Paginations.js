import { Box, PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import { allTracksQty } from "../../store/tracks";
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import paginations from "../../styles/Paginations.module.scss";

const Paginations = ({allTracksQty}) => {
    const router = useRouter()

    const allPages = Math.ceil(allTracksQty / +process.env.NEXT_PUBLIC_TRACKS_ON_PAGE)

    return (
        <Box className={paginations.wrapper}>
            <Pagination 
                count={allPages} 
                page={+router.query.page || 1} 
                color="primary"
                onChange={(_, num) => {
                    router.push({
                        pathname: "/",
                        query: {...router.query, page: num}
                    }, null, {scroll: true, shallow: false})
                }}
                renderItem={(item) => (
                    <PaginationItem
                        className={paginations.item}
                        to={`/?page=${item.page}`}
                        {...item}
                    />
                )}
            />
        </Box>
    )
}

const mapStateToProps = createStructuredSelector({
    allTracksQty
})

export default connect(mapStateToProps)(Paginations);