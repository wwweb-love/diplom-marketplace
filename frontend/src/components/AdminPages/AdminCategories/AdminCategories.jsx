// import styled from "styled-components"
// import { useDispatch, useSelector } from "react-redux"
// import { selectorAdminCategoriesData } from "../../../selectors"
// import { AdminItem } from "../../AdminItem/AdminItem"
// import { Button } from "../../Button/Button"
// import { actionShowModalAdmin } from "../../../actions"

// const AdminCategoriesContainer = ({ className }) => {

//     const adminCategoriesData = useSelector(selectorAdminCategoriesData)
//     const dispatch = useDispatch()

//     const handleClickAddCategory = () => {
//             dispatch(actionShowModalAdmin(true))
//         }
//     return (
//         <div className={className}>
//             <h2>Категории</h2>
//             <Button className="btn-add-category" onClick={handleClickAddCategory}>Добавить категорию</Button>
//             {adminCategoriesData && adminCategoriesData.map((category, index) => <AdminItem key={index} type="categories" data={category} name={category.name} index={index} />)}
//         </div>
//     )
// }

// export const AdminCategories = styled(AdminCategoriesContainer)`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;

//     .btn-add-category {
//         display: flex;
//         align-self: start;
//     }
// `