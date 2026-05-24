// import styled from "styled-components"
// import { useDispatch, useSelector } from "react-redux"
// import { selectorAdminUsersData } from "../../../selectors"
// import { AdminItem } from "../../AdminItem/AdminItem"
// import { Button } from "../../Button/Button"
// import { actionShowModalAdmin } from "../../../actions"

// const AdminUsersContainer = ({ className }) => {
//     const dispatch = useDispatch()

//     const adminUsersData = useSelector(selectorAdminUsersData)

//     const handleClickAddUser = () => {
//         dispatch(actionShowModalAdmin(true))
//     }
    
//     return (
//         <div className={className}>
//             <h2>Пользователи</h2>
//             <Button className="btn-add-user" onClick={handleClickAddUser}>Добавить пользователя</Button>
//             {adminUsersData && adminUsersData.map((user, index) => <AdminItem key={index} type="users" data={user} name={user.name} index={index} />)}
//         </div>
//     )
// }

// export const AdminUsers = styled(AdminUsersContainer)`
//     display: flex;
//     flex-direction: column;
//     gap: 20px;

//     .btn-add-user {
//         display: flex;
//         align-self: start;
//     }
// `