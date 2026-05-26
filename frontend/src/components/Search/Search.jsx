// package
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
// svg
import SearchSVG from "../../assets/svg/search.svg?react"
// selectors
import { selectorTextSearch } from "../../selectors"
// actions
import { actionPage, actionTextSearch } from "../../actions"

const SearchContainer = ({ className }) => {
    const dispatch = useDispatch()

    const textSearch = useSelector(selectorTextSearch)
    
    const handleTextSearchChange = ({ target }) => {
        dispatch(actionPage(1))
        dispatch(actionTextSearch(target.value))
    }

    return (
        <div className={className}>
            <input 
            className="input-search" 
            type="text" 
            placeholder="Поиск товаров.." 
            value={textSearch} 
            onChange={handleTextSearchChange}/>
            <SearchSVG />
        </div>
    )
}

export const Search = styled(SearchContainer)`
    display: flex;
    width: 40%;
    height: 40px;
    margin: 0 auto;

    .input-search {
        width: 90%;
        border-left: 2px solid #005bff;
        border-bottom: 2px solid #005bff;
        border-top: 2px solid #005bff;
        border-right: 0;
        padding: 5px 10px;
        font-size: 18px;
    }

    .input-search:focus {
        outline: 0;
    }

    svg {
        width: 10%;
        background-color: #005bff;
        height: 40px;
        padding: 7px;
        border-radius: 0 10px 10px 0;
        cursor: pointer;
    }
`