import styled from "styled-components"

const BasketInfoContainer = ({ className }) => {
    return (
        <div className={className}>
            <div className="basket-result">
                <p>Итого: Цена</p>
                <p>Скидка: Скидка%</p>
                <p>Итоговая сумма: Цена - Скидка</p>
            </div>

            <button className="btn-order">Оформить заказ</button>
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