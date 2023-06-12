import { Box } from "@mui/material";
import search from "../../styles/Search.module.scss";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Search = () => {
    const [text, setText] = useState("")
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(text);
        router.push({
            pathname: "/",
            query: {
                keywords: text
            }
        }, null, {scroll: false, shallow: false})
    }

    useEffect(() => {
        setText(router.query?.keywords || "")
    }, [router.query?.keywords])

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
                    aria-label="search"
                    type="submit"
                >
                    <ArrowForwardIcon fontSize="large"/>
                </button>
            </form>
        </Box>
    )
}
export default Search;