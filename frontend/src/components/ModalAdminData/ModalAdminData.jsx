// package
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router"
// components
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
// selectors
import { selectorAdminDataModal, selectorAdminDataType, selectorMethodSaveModalAdminData } from "../../selectors"
// actions
import { actionAdminData, actionAdminDataModal, actionGlobalError, actionMethodSaveModalAdminData, actionNotificationMessage, actionShowModalAdminData } from "../../actions"
import { UserSchema, ProductSchema, CategorySchema } from "../../constants"
// utils
import { getValidationSchema } from "../../utils/get-validation-schema"
// api
import { postCreateAdminData, putEditAdminData, putEditUserPassAdminData } from "../../api"



const ModalAdminDataContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminDataModal = useSelector(selectorAdminDataModal)
    const methodSaveModalAdminData = useSelector(selectorMethodSaveModalAdminData)
    const adminDataType = useSelector(selectorAdminDataType)

    const validationSchema = getValidationSchema()

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm({
            defaultValues: adminDataModal,
            resolver: yupResolver(validationSchema)
        })

    const handleClickCancel = () => {
        dispatch(actionAdminDataModal(""))
        dispatch(actionMethodSaveModalAdminData(""))
        dispatch(actionShowModalAdminData(false))
    }

    const handleClickSave = (data) => {
        if (methodSaveModalAdminData == "create") {
            postCreateAdminData(adminDataType, data).then(loaded => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }

                dispatch(actionAdminData(data[adminDataType]))
                dispatch(actionNotificationMessage(data.notification))
                dispatch(actionShowModalAdminData(false))
            })



        } else if (methodSaveModalAdminData == "edit") {
            putEditAdminData(adminDataType, data).then(loaded => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }

                dispatch(actionAdminData(data[adminDataType]))
                dispatch(actionNotificationMessage(data.notification))
                dispatch(actionShowModalAdminData(false))
            })
        } else if (methodSaveModalAdminData == "edit-user-pass") {
            putEditUserPassAdminData(data).then(loaded => loaded.json()).then(loaded => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    navigate("/errors")
                }
                dispatch(actionAdminData(data.users))
                dispatch(actionNotificationMessage(data.notification))
                dispatch(actionShowModalAdminData(false))
            })
        }

    }

    return (
        <div className={className}>
            <form className="modal" onSubmit={handleSubmit(handleClickSave)}>
                <h2>{adminDataType}</h2>
                <div className="items">
                    {Object.keys(adminDataModal).map((keys, index) => (

                        <div className="block-key" key={index}>
                            <label>{keys}</label>
                            {keys == "id" ?
                                <input type="text" disabled="disabled" {...register(keys)} /> :
                                keys == "role" ?
                                    <select {...register("role")}>
                                        <option value="6a11dfe26980095835871fec">Admin</option>
                                        <option value="6a11e891e9e39217562455c8">Moderator</option>
                                        <option value="6a11e899e9e39217562455c9">User</option>
                                    </select> :
                                    keys == "category" ? <select {...register("category")}>
                                        <option value="6a11e0276980095835871fed">Одежда</option>
                                        <option value="6a11e86ce9e39217562455c6">Электроника</option>
                                        <option value="6a11e874e9e39217562455c7">Авто</option>
                                    </select> :
                                    <input type="text" {...register(keys)} />}
                            {errors[keys] && <ErrorMessage errorMessage={errors[keys].message} />}
                        </div>


                    ))}
                </div>

                <div className="block-btn">
                    <button type="button" onClick={handleClickCancel}>Отмена</button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export const ModalAdminData = styled(ModalAdminDataContainer)`
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: #02020269;    
    z-index: 20;    
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 150px;

    .modal {
        height: 300px;
        background-color: #fff;

        padding: 20px;
        border: 1px solid blue;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }

    .items {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;

    }

    .block-label-input {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input {
        border: 2px solid black;
        font-size: 16px;
        padding: 3px 5px;
    }

    select {
        border: 2px solid black;
        font-size: 16px;
        padding: 3px 5px;
    }

    .block-btn {
        width: 100%;
        display: flex;
        gap: 20px;
        // justify-content: space-between;
    }

    .block-key {
        display: flex;
        flex-direction: column;
        gap: 10px;

    }
`