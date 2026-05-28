// package
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
// components
import { Button } from "../Button/Button"
import { Loader } from "../Loader/Loader"
// actions
import { actionCategories, actionGlobalError, actionPage, actionSelectedCategory, actionSelectedSort, actionTextSearch } from "../../actions"
// selectors
import { selectorCategories, selectorSelectedCategory } from "../../selectors"
import { getCategories } from "../../api"

const SectionCategoryContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categories = useSelector(selectorCategories)
    const selectedCategory = useSelector(selectorSelectedCategory)

    const [isLoadedCategories, setIsloadedCategories] = useState(false)

    useEffect(() => {
        setIsloadedCategories(true)
        getCategories()
            .then(loaded => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }
                dispatch(actionCategories(data))
            })
            .finally(() => setIsloadedCategories(false))
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
            {isLoadedCategories ? <Loader /> :
                <select className="block-categories" value={selectedCategory} onChange={handleCategoryChange} >
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
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