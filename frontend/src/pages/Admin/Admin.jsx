// package
import styled from "styled-components"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
// components
import { AdminData, Notification, ModalAdminData, Loader } from "../../components"
// actions
import { actionAdminData, actionAdminDataType, actionGlobalError } from "../../actions"
// selectors
import { selectorAdminDataType, selectorNotificationMessage, selectorShowModalAdminData } from "../../selectors"
// api
import { getAdminData } from "../../api"

const AdminContainer = ({ className }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const notificationMessage = useSelector(selectorNotificationMessage)
    const adminDataType = useSelector(selectorAdminDataType)
    const showModalAdminData = useSelector(selectorShowModalAdminData)

    const [isLoadedAdminData, setIsLoadedAdminData] = useState(true)

    useEffect(() => {
        setIsLoadedAdminData(true)
        getAdminData(adminDataType)
        .then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionAdminData(data))
        })
        .finally(() => setIsLoadedAdminData(false))
    }, [adminDataType])


    return (
        <div className={className}>
            <div className="section-data">
                <button className={adminDataType == "users" ? "btn-active link-section" : "link-section"} onClick={() => dispatch(actionAdminDataType("users"))}>Пользователи</button>
                <button className={adminDataType == "products" ? "btn-active link-section" : "link-section"} onClick={() => dispatch(actionAdminDataType("products"))}>Продукты</button>
                <button className={adminDataType == "categories" ? "btn-active link-section" : "link-section"} onClick={() => dispatch(actionAdminDataType("categories"))}>Категории</button>
            </div>

            {isLoadedAdminData ? <Loader /> : <AdminData />}

            {showModalAdminData && <ModalAdminData />}
            {notificationMessage && <Notification >{notificationMessage}</Notification>}

        </div>
    )
}

export const Admin = styled(AdminContainer)`

    display: flex;
    flex-direction: column;
    gap: 20px;

    .section-data {
        display: flex;
        gap: 20px;
    }
    button {
        padding: 10px 15px;
        font-size: 16px;
        background-color: #ffffff;
        color: black;
        border: 1px solid #005bff;
        border-radius: 15px;
        cursor: pointer;
    }

    .btn-active {
        background-color: #005bff;
        color: #fff;
    }

    button:hover {
        opacity: 0.5;
    }
`