import styled from "styled-components"
import { Loader, BasketCard, BasketInfo } from "../../components"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { selectorBasket } from "../../selectors"
import { actionBasket, actionGlobalError } from "../../actions"

const BasketContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const basket = useSelector(selectorBasket)

    useEffect(() => {
        fetch(`http://localhost:3000/basket`, { credentials: 'include' }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded

            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
    }, [])

    return (
        <div className={className}>
            <h2>Корзина</h2>
            {!basket ? <Loader /> :
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