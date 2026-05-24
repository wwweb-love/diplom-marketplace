import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { selectorCountProducts, selectorPage, selectorPageLimit } from "../../selectors"
import { Loader } from "../Loader/Loader"
import { actionPage } from "../../actions"


const PaginationContainer = ({ className }) => {
    const dispatch = useDispatch()

    const page = useSelector(selectorPage)
    const pageLimit = useSelector(selectorPageLimit)
    const countProducts = useSelector(selectorCountProducts)
    const countPage = Math.ceil(countProducts / pageLimit)

    return (
        <div className={className}>
            {!countProducts ? <Loader /> : 
            <div className="pagination-block">
                {[...Array(countPage).keys()].map(index => {
                    const element = index + 1
                    return (
                        <p 
                        key={index}
                        onClick={() => dispatch(actionPage(element))} 
                        className={page == element ? "active page" : "page"}>
                        {element}
                        </p>
                    )
                })}
            </div>}
        </div>
    )
}

export const Pagination = styled(PaginationContainer)`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px;

    .pagination-block {
        display: flex;
        gap: 10px;
    }

    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    .active {
        border-bottom: 1px solid black;
    }
  
`