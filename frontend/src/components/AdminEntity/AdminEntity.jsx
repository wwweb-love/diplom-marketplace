import styled from "styled-components"
import { Button } from "../Button/Button"
import EditSVG from "../../assets/svg/edit.svg?react"
import DeleteSVG from "../../assets/svg/delete.svg?react"
import { useEffect, useState } from "react"
import { sanitaizeProduct } from "../../utils"
import IdSvg from "../../assets/svg/id.svg?react"
import { useDispatch, useSelector } from "react-redux"
import { selectorAdminDataType, selectorShowModalAdminData } from "../../selectors"
import { actionAdminData, actionAdminDataModal, actionAdminUsersData, actionGlobalError, actionMethodSaveModalAdminData, actionNotificationMessage, actionShowModalAdminData } from "../../actions"
import { deleteAdminData } from "../../api"
import { useNavigate } from "react-router"

const AdminEntityContainer = ({ className, data, index }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminDataType = useSelector(selectorAdminDataType)

    const handleClickEditPassword = (id) => {
        dispatch(actionMethodSaveModalAdminData("edit-user-pass"))
        dispatch(actionAdminDataModal({ id: id, password: "" }))
        dispatch(actionShowModalAdminData(true))
    }

    const handleClickEdit = (id) => {
        dispatch(actionMethodSaveModalAdminData("edit"))
        fetch(`http://localhost:3000/admin/${adminDataType}/${id}`, { credentials: 'include' }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded
            if (error) {
                dispatch(actionGlobalError(error))
                navigate("/errors")
            }

            dispatch(actionAdminDataModal(data))
            dispatch(actionShowModalAdminData(true))
        })

    }

    const handleClickDelete = (id) => {
        fetch(`http://localhost:3000/admin/${adminDataType}/${id}`, {
            credentials: 'include',
            method: "DELETE"
        })
            .then(loaded => loaded.json()).then(loaded => {
                const { error, data } = loaded

                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }

                dispatch(actionAdminData(data[adminDataType]))
                dispatch(actionNotificationMessage(data.notification))
            })
    }

    return (
        <div className={className}>
            <p className="index">{index + 1}</p>

            {Object.keys(data).map((keyData, index) => <div key={index} className="data-key">
                {keyData == "password" ? <>
                    <p className="data-key-title">{keyData}</p>
                    <button onClick={() => handleClickEditPassword(data.id)} className="data-key-btn" >Изменить пароль</button>
                </> : <>
                    <p className="data-key-title">{keyData}</p>
                    <p className="data-key-value">{data[keyData]}</p>
                </>}
            </div>)}
            <div>
                <EditSVG className="svg-edit" onClick={() => handleClickEdit(data.id)} />
                <DeleteSVG className="svg-edit" onClick={() => handleClickDelete(data.id)} />
            </div>
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

    .data-key {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: space-between;
        gap: 5px;
    }

    .data-key-title {
        border-left: 5px solid black;
        padding-left: 10px;
        font-weight: 600;
    }

    .data-key-value {
        padding-left: 15px;
    }

    .data-key-btn {
        width: 100%;
        padding: 10px 0px;
    }
`