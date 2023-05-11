import { Box } from "@mui/material";
import Search from "../Search/Search";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import header from "../../styles/Header.module.scss";


const Header = () => {
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
        }
    }

    useEffect(() => {
        observer()
    }, [])

    return (
        <Box 
            ref={headerRef}
            className={header.header}
        >
            <Box className={header.header__body}>
                <div 
                    onClick={() => router.push({
                        pathname: "/"
                    }, null, {scroll: false})}
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
    )
}
export default Header;