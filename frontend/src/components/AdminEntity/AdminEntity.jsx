import styled from "styled-components"
import { Button } from "../Button/Button"
import EditSVG from "../../assets/svg/edit.svg?react"
import DeleteSVG from "../../assets/svg/delete.svg?react"
import { useEffect, useState } from "react"
import { sanitaizeProduct } from "../../utils"
import IdSvg from "../../assets/svg/id.svg?react"
import { useDispatch, useSelector } from "react-redux"
import { selectorShowModalAdmin } from "../../selectors"
import { actionActiveEditableContent, actionAdminData, actionGlobalError, actionShowModalAdmin } from "../../actions"
import { deleteAdminData } from "../../api"
import { useNavigate } from "react-router"

const AdminEntityContainer = ({ className, data, type, index }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleEditData = () => {
        dispatch(actionShowModalAdmin(true))   
        dispatch(actionActiveEditableContent(data))

        // type == "users" && dispatch(actionActiveEditableContent({ name: data.name, login: data.login, password: data.password, role: data.role }))
        // type == "products" && dispatch(actionActiveEditableContent({ title: data.title, price: data.price, image_url: data.image_url, count: data.count, categoty: data.category, discount: data.discount }))
        // type == "categories" && dispatch(actionActiveEditableContent({ title: data.title, name: data.name }))
    }

    const handleDeleteData = () => {
        deleteAdminData(type, data._id).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionAdminData(data))
        })

    }

    return (
        <div className={className}>
            <p className="index">{index + 1}</p>
            <p className="name">{data.name || data.title}</p>
            <div className="identificator">
                <IdSvg />
                {data._id}
            </div>
            <EditSVG onClick={handleEditData} className="svg-edit" />
            <DeleteSVG onClick={handleDeleteData} className="svg-edit" />
        </div>
    )
}

export const AdminEntity = styled(AdminEntityContainer)`

    display: flex;
    align-items: center;
    gap: 40px;

    .index {
        font-weight: 600;
    }

    .name {
        width: 500px;
    }

    .identificator {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .svg-edit {
        width: 35px;
        height: 35px;
        cursor: pointer;
        border: 1px solid black;
        padding: 5px;
        border-radius: 10px;
    }
`