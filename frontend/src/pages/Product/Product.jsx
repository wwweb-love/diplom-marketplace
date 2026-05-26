import styled from "styled-components"
import { Loader, Search, SectionPathToProduct } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { selectorProduct } from "../../selectors"
import { useEffect } from "react"
import { actionGlobalError, actionProduct } from "../../actions"
import { useNavigate, useParams } from "react-router"

const ProductContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { id } = useParams()
    const product = useSelector(selectorProduct)

    useEffect(() => {
        fetch(`http://localhost:3000/product/${id}`, { credentials: 'include' }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded

            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionProduct(data))
        })
    }, [])

    console.log("PRODUCT", product)

    return (
        <div className={className}>
            {!product ? <Loader /> : <>
                <div className="path-to-product">Товары - {product.category}</div>

                <div className="product">
                    <div className="block-image-info">
                        <img className="image" src={product.image} alt="image" />
                        <div className="block-info-title">
                            <h2>{product.title}</h2>
                            <div className="info">
                                <p>Количество: {product.count}</p>
                                <p>Стоимость: {product.price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="block-btn-id">
                        <button className="btn-buy-product">Добавить в корзину</button>
                        <p className="id-product">{product.id}</p>
                    </div>
                </div>
            </>}

        </div>
    )
}

export const Product = styled(ProductContainer)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .product {
        display: flex;
        justify-content: space-between;
    }

    .block-image-info {
        display: flex;
        gap: 20px;
    }

    .image {
        width: 500px;
        height: 500px;
        object-fit: cover;  /* ключевое свойство */
    }

    .block-info-title {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .block-btn-id {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: end;
    }

    .btn-buy-product {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #005bff;
        color: #fff;
        border: 0;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-buy-product:hover {
        opacity: 0.5;
    }

    .btn-unbuy-product {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #ffffff;
        color: black;
        border: 1px solid #005bff;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-unbuy-product:hover {
        opacity: 0.5;
    }

    .id-product {
    }
`