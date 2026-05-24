import styled from "styled-components"
import { CategoryCard } from "../CategoryCard/CategoryCard"
import { Button, Loader } from "../../components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actionCategories, actionGlobalError, actionPage, actionSelectedCategory, actionSelectedSort, actionTextSearch } from "../../actions"
import { selectorCategories, selectorSelectedCategory } from "../../selectors"
import { getCategories } from "../../api"
import { useNavigate } from "react-router"

const SectionCategoryContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector(selectorCategories)
    const selectedCategory = useSelector(selectorSelectedCategory)

    useEffect(() => {
        getCategories().then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }
            dispatch(actionCategories(data))
        })
    }, [])

    const handleCategoryChange = ({ target }) => {
        dispatch(actionPage(1))
        dispatch(actionSelectedCategory(target.value))
    }

    const handleResetFilter = () => {
        dispatch(actionSelectedCategory(""))
        dispatch(actionPage(1))
        dispatch(actionTextSearch(""))
        dispatch(actionSelectedSort(""))
    }

    return (
        <div className={className}>
            <h2>Категории</h2>
            {!categories.length ? <Loader /> : 
            <select className="block-categories" value={selectedCategory} onChange={handleCategoryChange} >
                {[{ id: "", name: "Все категории"}, ...categories].map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>}
            <Button onClick={handleResetFilter}>Сбросить фильтр</Button>
        </div>
    )
}

export const SectionCategory = styled(SectionCategoryContainer)`
    width: 18%;
    display: flex;
    align-self: start;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 15px;
    position: relative;

    .block-categories {
        width: 100%;
        padding: 5px 10px;
        font-size: 16px;
    }
`