import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import header from "../../styles/Header.module.scss";

const HeaderAdminButton = ({path, title}) => {
    const [activeStyle, setActiveStyle] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if(router.pathname === path) {
            setActiveStyle(header._active)
        } else {
            setActiveStyle(null)
        }
    }, [router])

    return (
        <button 
            className={`${header.button} ${activeStyle}`}
            onClick={() => {
                router.push(path)
            }}
        >
            {title}
        </button>
    )
}
export default HeaderAdminButton