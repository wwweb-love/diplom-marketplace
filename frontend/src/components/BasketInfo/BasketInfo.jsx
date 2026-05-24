import styled from "styled-components"
import { selectPriceToBasket, getDiscount } from "../../utils"
import { useEffect } from "react"

const BasketInfoContainer = ({ className, products }) => {
    const { priceResult, priceDiscountResult } = selectPriceToBasket(products)
    const discount = getDiscount(priceResult, priceDiscountResult) 


    const handleClickPrice = () => {
        
    }

    return (
        <div className={className}>
            <div className="basket-result">
                <p>Итого: {priceResult}</p>
                <p>Скидка: {products.length ? discount : 0}%</p>
                <p>Итоговая сумма: {priceDiscountResult}</p>
            </div>

            <button onClick={handleClickPrice} className="btn-order">Оформить заказ</button>
        </div>
    )
}

export const BasketInfo = styled(BasketInfoContainer)`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-self: start;
    align-self: start;
    gap: 20px;

    background-color: #fff;
    padding: 20px;
    border-radius: 15px;

    .basket-result {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .btn-order {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #005bff;
        color: #fff;
        border: 0;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-order:hover {
        opacity: 0.5
    }
`