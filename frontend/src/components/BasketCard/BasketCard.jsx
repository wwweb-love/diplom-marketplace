// package
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
// svg
import CloseSVG from "../../assets/svg/close.svg?react"
import PlusSVG from "../../assets/svg/plus.svg?react"
import MinusSVG from "../../assets/svg/minus.svg?react"
import DeleteSVG from "../../assets/svg/delete.svg?react"
// components
import { Loader } from "../Loader/Loader"
// selectors
import { selectorUser } from "../../selectors"
// actions
import { actionBasket, actionGlobalError } from "../../actions"
// api
import { deleteProductOnBasket, putBasketSelectedCount } from "../../api"

const BasketCardContainer = ({ className, product }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(selectorUser)

    const handleClickPlusCountProductOnBasket = (product) => {

        putBasketSelectedCount(product.product.id, product.selected_count + 1).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
    }

    const handleClickMinusCountProductOnBasket = (product) => {

        putBasketSelectedCount(product.product.id, product.selected_count - 1).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionBasket(data))
        })
    }

    const handleClickDeleteProductOnBasket = (product) => {
        deleteProductOnBasket(user.id, product.product.id).then(loaded => {
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