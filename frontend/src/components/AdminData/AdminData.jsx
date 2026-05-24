import styled from "styled-components"
import { Button } from "../Button/Button"
import { useDispatch, useSelector } from "react-redux"
import { selectorAdminData, selectorAdminDataType } from "../../selectors"
import { AdminEntity } from "../../components/AdminEntity/AdminEntity"
import { actionAdminData, actionAdminDataModal, actionMethodSaveModalAdminData, actionShowModalAdminData } from "../../actions"

const AdminDataContainer = ({ className }) => {

    const dispatch = useDispatch()

    const adminData = useSelector(selectorAdminData)
    const admindataType = useSelector(selectorAdminDataType)

    const handleClickCreate = () => {
        dispatch(actionShowModalAdminData(true))
        admindataType == "users" && dispatch(actionAdminDataModal({ id: "", name: "", login: "", password: "", role: "" }))
        admindataType == "products" && dispatch(actionAdminDataModal({ id: "", title: "", price: 0, image: "", count: 0, category: "", discount: 0 }))
        admindataType == "categories" && dispatch(actionAdminDataModal({ id: "", title: "", name: "" }))
        dispatch(actionMethodSaveModalAdminData("create"))
    }

    return (
        <div className={className}>
            <h2>{admindataType}</h2>
            <Button className="btn-add-user" onClick={handleClickCreate}>Добавить {admindataType}</Button>
            {adminData && adminData.map((data, index) => <AdminEntity key={data.id} data={data} index={index} />)}
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