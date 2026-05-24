import styled from "styled-components"
import { Loader, Search, SectionPathToProduct } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { selectorBasket, selectorProduct, selectorProducts, selectorUser } from "../../selectors"
import { useEffect, useState } from "react"
import { getProduct, postProductOnBasket, deleteProductOnBasket, getBasket } from "../../api"
import { useParams, useNavigate } from "react-router"
import { actionProduct, actionGlobalError, actionBasket } from "../../actions"
import { useFetchData } from "../../hooks"

const ProductContainer = ({ className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { id } = useParams()
    const user = useSelector(selectorUser) || JSON.parse(localStorage.getItem("user"))
    const basket = useSelector(selectorBasket)
    const product = useSelector(selectorProduct)
    const products = useSelector(selectorProducts)
    const { fetchData, fetchMultiplyData, isLoading } = useFetchData()

    useEffect(() => {

        if (user) {
            if (!Object.keys(product).length || !Object.keys(basket).length) {
                // fetchData(getProduct, actionGlobalError, actionProduct, [id])
                fetchMultiplyData([getProduct, getBasket], actionGlobalError, [actionProduct, actionBasket], [[id], [user._id]])
            }
        } else {
            navigate("/login")
        }

    }, [user, basket])

    const { _id, category, image_url, title, count, price } = product

    const handleClickAddProductOnBasket = () => {
        if (!user) {
            navigate("/login")
        } else {
            fetchData(postProductOnBasket, actionGlobalError, actionBasket, [user._id, product._id])
        }
    }

    const handleClickDeleteProductOnBasket = () => {
        if (!user) {
            navigate("/login")
        } else {
            fetchData(deleteProductOnBasket, actionGlobalError, actionBasket, [user._id, product._id])
        }
    }

    return (
        <div className={className}>
            {isLoading || !Object.keys(product).length || !Object.keys(basket).length ? <Loader /> : <>
                <Search />
                <SectionPathToProduct _id={_id} category={category.title} />
                <div className="product">
                    <div className="block-image-info">
                        <img className="image" src={image_url} alt="" />
                        <div className="block-info-title">
                            <h2>{title}</h2>
                            <div className="info">
                                <p>Количество: {count}</p>
                                <p>Стоимость: {price}</p>
                            </div>
                        </div>
                    </div>
                    <div className="block-btn-id">
                        {basket.products.some(product => product.product._id == _id)
                            ? <button onClick={handleClickDeleteProductOnBasket} className="btn-unbuy-product">Удалить товар с корзины</button>
                            : <button onClick={handleClickAddProductOnBasket} className="btn-buy-product">Добавить в корзину</button>}
                        <p className="id-product">{_id}</p>
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