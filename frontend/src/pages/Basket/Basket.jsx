import { use, useEffect, useState } from "react"
import styled from "styled-components"
import { getBasket } from "../../api"
import { Loader, BasketCard, BasketInfo } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { actionBasket, actionGlobalError } from "../../actions"
import { selectorBasket, selectorUser } from "../../selectors"
import { useNavigate } from "react-router"
import { useFetchData } from "../../hooks"

const BasketContainer = ({ className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectorUser) || JSON.parse(localStorage.getItem("user"))
    const basket = useSelector(selectorBasket)

    const { fetchData, isLoading } = useFetchData()

    useEffect(() => {
        if (user) {
            if (!Object.keys(basket).length) {
                fetchData(getBasket, actionGlobalError, actionBasket, [user._id])
            }
        } else {
            navigate("/login")
        }
    }, [user, basket])

    return (
        <div className={className}>
            <h2>Корзина</h2>
            {isLoading || !Object.keys(basket).length ? <Loader /> : <div className="block-products-info">
                <div className="products">
                    {basket.products.map(product => <BasketCard key={product._id} product={product} />)}
                    {!basket.products.length && <h3>Пусто. Добавьте товары</h3>}
                </div>

                <BasketInfo products={basket.products} />
            </div>}
        </div>
    )
}

export const Basket = styled(BasketContainer)`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    
    .block-products-info {
        display: flex;
        justify-content: space-between;
    }

    .products {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

`