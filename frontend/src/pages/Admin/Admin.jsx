import styled from "styled-components"
import { useState, useEffect } from "react"
import { Loader, Search, ModalAdminEntity, AdminData } from "../../components"
import { useDispatch, useSelector } from "react-redux"
import { actionAdminData, actionGlobalError } from "../../actions"
import { selectorAdminData, selectorShowModalAdmin } from "../../selectors"
import { useNavigate } from "react-router"
import { useFetchData } from "../../hooks"
import { getAdminData } from "../../api"

const AdminContainer = ({ className }) => {

    const [activeSection, setActiveSection] = useState("users")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const showModalAdmin = useSelector(selectorShowModalAdmin)
    const { fetchData, isLoading } = useFetchData()

    useEffect(() => {
        fetchData(getAdminData, actionGlobalError, actionAdminData, [activeSection])

    }, [activeSection])

    return (
        <div className={className}>

            <Search />

            <div className="section-data">
                <button onClick={() => setActiveSection("users")} className={activeSection == "users" ? "btn-active link-section" : "link-section"}>Пользователи</button>
                <button onClick={() => setActiveSection("products")} className={activeSection == "products" ? "btn-active link-section" : "link-section"}>Продукты</button>
                <button onClick={() => setActiveSection("categories")} className={activeSection == "categories" ? "btn-active link-section" : "link-section"}>Категории</button>
            </div>

            {isLoading ? <Loader /> : <AdminData type={activeSection} />}

            {showModalAdmin && <ModalAdminEntity type={activeSection} />}

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