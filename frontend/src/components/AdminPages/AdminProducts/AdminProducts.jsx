// import styled from "styled-components"
// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { selectorAdminProductsData, selectorShowModalAdmin } from "../../../selectors"
// import { AdminItem } from "../../AdminItem/AdminItem"
// import { Button } from "../../Button/Button"
// import { Loader } from "../../Loader/Loader"
// import { actionAdminProductsData, actionGlobalError, actionShowModalAdmin } from "../../../actions"
// import { useNavigate } from "react-router"
// import { ModalAdminItem } from "../../ModalAdminItem/ModalAdminItem"

// const AdminProductsContainer = ({ className }) => {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const adminProductsData = useSelector(selectorAdminProductsData)
//     const [isLoading, setIsLoading] = useState(false)
//     const showModalAdmin = useSelector(selectorShowModalAdmin)

//     const handleClickAddProduct = () => {
//         dispatch(actionShowModalAdmin(true))
//     }
    
//     return (
//         <div className={className}>
//             {isLoading ? <Loader /> : <>
//                 <h2>Продукты</h2>
//                 <Button onClick={handleClickAddProduct} className="btn-add-product">Добавить продукт</Button>
//                 {adminProductsData && adminProductsData.map((product, index) => <AdminItem key={index} type="products" data={product} name={product.title} index={index} />)}
//             </>}
//         </div>
//     )
// }

// export const AdminProducts = styled(AdminProductsContainer)`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;

//     .btn-add-product {
//         display: flex;
//         align-self: start;
//     }
// `