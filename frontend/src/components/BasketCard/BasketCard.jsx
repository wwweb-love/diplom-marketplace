import styled from "styled-components"
import CloseSVG from "../../assets/svg/close.svg?react"
import PlusSVG from "../../assets/svg/plus.svg?react"
import MinusSVG from "../../assets/svg/minus.svg?react"
import DeleteSVG from "../../assets/svg/delete.svg?react"
import { useDispatch, useSelector } from "react-redux"
import { selectorBasket, selectorUser } from "../../selectors"
import { actionBasket, actionGlobalError } from "../../actions"
import { useFetchData } from "../../hooks"
import { postBasket, deleteProductOnBasket, putSelectedCountProductOnBasket } from "../../api"
import { Loader } from "../Loader/Loader"
import { useNavigate } from "react-router"

const BasketCardContainer = ({ className, product }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectorUser)

    const handleClickPlusCountProductOnBasket = (product) => {

        fetch(`http://localhost:3000/basket/selected_count`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                productId: product.product.id,
                selected_count: product.selected_count + 1
            })
        }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
    }

    const handleClickMinusCountProductOnBasket = (product) => {

        fetch(`http://localhost:3000/basket/selected_count`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                productId: product.product.id,
                selected_count: product.selected_count - 1
            })
        }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
    }

    const handleClickDeleteProductOnBasket = (product) => {
        fetch(`http://localhost:3000/basket/products`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                userId: user.id,
                productId: product.product.id
            })
        }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded

            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }
            dispatch(actionBasket(data))
        })
    }

    return (

        <div className={className}>
            {!product ? <Loader /> : <>
                <img className="image" src={product.product.image} alt="image" />

                <div className="block-info-wrapper">
                    <p className="id">id товара: {product.product.id}</p>
                    <div className="block-info">
                        <p className="title">{product.product.title}</p>
                        <p className="count">На складе: {product.product.count}</p>

                        <p className="count">
                            Выбрали:
                            <PlusSVG onClick={() => handleClickPlusCountProductOnBasket(product)} />
                            {product.selected_count}
                            <MinusSVG onClick={() => handleClickMinusCountProductOnBasket(product)} />
                        </p>

                        <p className="price">Стоимость: {product.product.price}</p>
                    </div>
                </div>

                <DeleteSVG className="delete-product" onClick={() => handleClickDeleteProductOnBasket(product)} />
            </>}
        </div>
    )
}

export const BasketCard = styled(BasketCardContainer)`
    width: 1000px;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 10px 20px;
    border-radius: 15px;
    
    .image {
        width: 150px;
        height: 150px;
        fit-content: cover;
    }

    .block-info-wrapper {
        width: 700px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
    }

    .block-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        width: 250px;
        font-size: 18px;
        font-weight: 600;
    }

    .count {
        display: flex;
        gap: 5px;
        align-items: center;

        svg {
            border: 1px solid silver;
            cursor: pointer;
        }
    }

    .delete-product {
        cursor: pointer;
    }
    
`