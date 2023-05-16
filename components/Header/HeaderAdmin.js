import { Box } from "@mui/material"
import { useRouter } from "next/router";
import HeaderAdminButton from "../Buttons/HeaderAdminButton";

import header from "../../styles/Header.module.scss";

const HeaderAdmin = () => {
    const router = useRouter()

    return (
        <Box className={header.admin}>
            <Box className="_container">
                <Box className={header.admin__body}>
                    <HeaderAdminButton 
                        path="/admin" 
                        title="Music"
                    />
                    <HeaderAdminButton 
                        path="/admin/category" 
                        title="Category"
                    />
                </Box>
            </Box>
        </Box>
    )
}
export default HeaderAdmin