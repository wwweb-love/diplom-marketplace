import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { AdminEntity} from "../AdminEntity/AdminEntity"
import { Button } from "../Button/Button"
import { actionActiveEditableContent, actionShowModalAdmin } from "../../actions"

import { selectorAdminData } from "../../selectors"

const AdminDataContainer = ({ className, type }) => {
    const dispatch = useDispatch()

    const adminData = useSelector(selectorAdminData)
    const handleClickAddUser = () => {
        dispatch(actionShowModalAdmin(true))
        
        type == "users" && dispatch(actionActiveEditableContent({ name: "", login: "", password: "", role: "" }))
        type == "products" && dispatch(actionActiveEditableContent({ title: "", price: "", image_url: "", count: "", category: "", discount: "" }))
        type == "categories" && dispatch(actionActiveEditableContent({ title: "", name: "" }))
    }
    
    return (
        <div className={className}>
            <h2>{type}</h2>
            <Button className="btn-add-user" onClick={handleClickAddUser}>Добавить {type}</Button>
            {adminData && adminData.map((data, index) => <AdminEntity type={type} key={index} data={data} index={index} />)}
        </div>
    )
}

export const AdminData = styled(AdminDataContainer)`
    display: flex;
    flex-direction: column;
    gap: 20px;

    .btn-add-user {
        display: flex;
        align-self: start;
    }
`