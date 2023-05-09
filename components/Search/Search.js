import { Box } from "@mui/material";
import search from "../../styles/Search.module.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from "react";

const Search = () => {
    const [text, setText] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(text);
        setText("")
    }

    const handleChange = (value) => {
        setText(value)
    }

    return (
        <Box className={search.search}>
            <form 
                onSubmit={handleSubmit}
                className={search.search__form}
            >
                <input
                    className={search.search__input}
                    type="text"
                    placeholder="Search..."
                    value={text}
                    onChange={e => handleChange(e.target.value)}
                />
                <button 
                    className={search.search__submit}
                    type="submit"
                >
                    <ArrowForwardIcon sx={{color: "#fff"}} fontSize="large"/>
                </button>
            </form>
        </Box>
    )
}
export default Search;