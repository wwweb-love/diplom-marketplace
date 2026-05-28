// package
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
// components
import { Loader, BasketCard, BasketInfo } from "../../components"
// selectors
import { selectorBasket } from "../../selectors"
// actions
import { actionBasket, actionGlobalError } from "../../actions"
// api
import { getBasket } from "../../api"

const BasketContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const basket = useSelector(selectorBasket)

    const [isLoadedBasket, setIsLoadedBasket] = useState(true)

    useEffect(() => {
        setIsLoadedBasket(true)
        getBasket()
        .then(loaded => {
            const { error, data } = loaded

            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
        .finally(() => setIsLoadedBasket(false))
    }, [])

    return (
        <div className={className}>
            <h2>Корзина</h2>
            {isLoadedBasket ? <Loader /> :
                <div className="block-products-info">
                    <div className="products">
                        {basket.products.length ? 
                        basket.products.map(product => <BasketCard key={product.id} product={product}/>) 
                        : 
                        <h3>Пусто. Добавьте товары</h3>}
                    </div>

                    <BasketInfo products={basket.products} />
                </div>
            }

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