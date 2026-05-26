import styled from "styled-components"
import { Loader, BasketCard, BasketInfo } from "../../components"
import { useEffect } from "react"
import { useParams } from "react-router"

const BasketContainer = ({ className }) => {

    const { id } = useParams()

    useEffect(() => {
        // fetch(`http://localhost:3000/basket/user/${id}`, {credentials: 'include'}).then(loaded => loaded.json()).then(loaded => console.log(loaded))
    }, [])

    return (
        <div className={className}>
            <h2>Корзина</h2>
            <div className="block-products-info">
                <div className="products">
                    <h3>Пусто. Добавьте товары</h3>
                    {/* {basket.products.map(product => <BasketCard key={product._id} product={product} />)}
                    {!basket.products.length && <h3>Пусто. Добавьте товары</h3>} */}
                </div>

                <BasketInfo />
            </div>
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