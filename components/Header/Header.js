import { Box } from "@mui/material";
import Search from "../Search/Search";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { removeSelectTrack, stopAllTrack } from "../../store/tracks";
import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import header from "../../styles/Header.module.scss";


const Header = ({removeSelectTrack, stopAllTrack}) => {
    const router = useRouter()
    const headerRef = useRef(null)

    const observer = () => {
        const callback = (entries) => {
            if(entries[0].isIntersecting) {
                headerRef.current.className = header.header
            } else {
                headerRef.current.className = `${header.header} ${header._scroll}`
            }
        }
        if (typeof window !== "undefined") {
            const headerObserver = new IntersectionObserver(callback)
            headerObserver?.observe(headerRef.current)
            return () => headerObserver.unobserve(headerRef.current)
        }
    }

    useEffect(() => {
        if (!headerRef?.current) return
        observer()
    }, [headerRef])

    const handleClick = () => {
        router.push({
            pathname: "/"
        }, null, {scroll: false})
        removeSelectTrack()
        stopAllTrack()
    }

    return (
        <Box 
            ref={headerRef}
            className={header.header}
        >
            <Box className={header.header__body}>
                <Box className="_container">
                    <Box className={header.content}>

                    
                    <div 
                        onClick={handleClick}
                        className={header.header__logo}
                    >
                        <img 
                            src="/img/Logo.svg" 
                            alt="logo"
                        />
                    </div>
                    <Search/>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const mapDispatchToProps = dispatch => ({
    removeSelectTrack: bindActionCreators(removeSelectTrack, dispatch),
    stopAllTrack: bindActionCreators(stopAllTrack, dispatch)
})

export default connect(null, mapDispatchToProps)(Header);