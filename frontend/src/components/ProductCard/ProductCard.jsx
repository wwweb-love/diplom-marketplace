// package
import styled from "styled-components"
import { useNavigate } from "react-router"

const ProductCardContainer = ({ className, product }) => {
    const navigate = useNavigate()

    return (
        <div className={className}>
            <img className="image" src={product.image} alt="image" />
            <div className="block-title-info">
                <h3>{product.title}</h3>
                <div className="info">
                    <p>id товара: {product.id}</p>
                    <p>Стоимость: {product.price}</p>
                </div>
            </div>
            <button className="btn-open-card" onClick={() => navigate(`/product/${product.id}`)}>Открыть карточку</button>
        </div>
    )
}

export const ProductCard = styled(ProductCardContainer)`
    width: 100%;
    height: 200px;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 15px;
    padding: 25px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .image {
        width: 150px;
        height: 150px;
        object-fit: cover;  /* ключевое свойство */
    }

    .block-title-info {
        width: 60%;
        height: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .btn-open-card {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #005bff;
        color: #fff;
        border: 0;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-open-card:hover {
        opacity: 0.5;
    }
`