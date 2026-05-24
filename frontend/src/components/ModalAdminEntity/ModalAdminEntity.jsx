import styled from "styled-components"
import { Button } from "../Button/Button"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { postAdminData, postProduct, putAdminData } from "../../api"
import { actionAdminData, actionShowModalAdmin } from "../../actions"
import { selectorActiveEditableContent, selectorAdminData } from "../../selectors"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { Loader } from "../Loader/Loader"

const UserSchema = yup.object().shape({
    _id: yup
        .string()
        .optional()
        .transform(() => undefined),
    name: yup
        .string()
        .required("Заполните имя")
        .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Неверное имя. Допускаются буквы")
        .min(3, "Неверное имя. Допускается минимум 3 символа")
        .max(20, "Неверное имя. Допускается максимум 20 символов"),
    login: yup
        .string()
        .required("Заполните логин")
        .matches(/^[a-zA-Z0-9_]+$/, "Неверный логин. Допускаются буквы и цифры")
        .min(3, "Неверный логин. Допускается минимум 3 символа")
        .max(20, "Неверный логин. Допускается максимум 20 символов"),
    password: yup
        .string()
        .required("Заполните пароль")
        // .matches(/^[a-zA-Z0-9!@#$%^&*]+$/, "Неверный пароль. Допускаются буквы и цифры")
        .min(3, "Неверный пароль. Допускается минимум 3 символа")
        .max(60, "Неверный пароль. Допускается максимум 60 символов"),
    role: yup
        .number()
        .required("Заполните роль"),

    __v: yup
        .string()
        .optional()
        .transform(() => undefined),
})

const ProductSchema = yup.object().shape({
    _id: yup
        .string()
        .optional()
        .transform(() => undefined),
    title: yup
        .string()
        .required("Заполните заголовок")
        .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Неверный заголовок. Допускаются буквы")
        .min(3, "Неверный заголовок. Допускается минимум 3 символа")
        .max(50, "Неверный заголовок. Допускается максимум 50 символов"),
    price: yup
        .number()
        .required("Заполните цену")
        .min(3, "Неверная цена. Допускается минимум 3 символа")
        .max(1000000000, "Неверная цена. Допускается максимум 1000000000"),
    image_url: yup
        .string()
        .required("Заполните url картинки"),
    count: yup
        .number()
        .required("Заполните количество товара")
        .min(1, "Неверное количество. Допускается минимум 1 символ")
        .max(5000, "Неверное количество. Допускается максимум 5000"),
    category: yup
        .number()
        .required("Заполните категорию"),
    discount: yup
        .number()
        .required("Заполните скидку")
        .min(1, "Неверная скидка. Допускается минимум 1 символа")
        .max(100, "Неверная скидка. Допускается максимум 100"),
    __v: yup
        .string()
        .optional()
        .transform(() => undefined),

})

const CategorySchema = yup.object().shape({
    _id: yup
        .string()
        .optional()
        .transform(() => undefined),
    title: yup
        .string()
        .required("Заполните заголовок")
        .matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, "Неверный заголовок. Допускаются буквы")
        .min(3, "Неверный заголовок. Допускается минимум 3 символа")
        .max(50, "Неверный заголовок. Допускается максимум 50 символов"),
    name: yup
        .string()
        .required("Заполните имя")
        .min(3, "Неверное имя. Допускается минимум 3 символ")
        .max(15, "Неверное имя. Допускается максимум 15 символа"),
    __v: yup
        .string()
        .optional()
        .transform(() => undefined),
})

const ModalAdminEntityContainer = ({ className, type }) => {
    const activeEditableContent = useSelector(selectorActiveEditableContent)
    const [method, setMethod] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (activeEditableContent.name || activeEditableContent.title) {
            setMethod("PUT")
        } else {
            setMethod("POST")
        }
    }, [])

    const getValidationSchema = () => {
        if (type === "users") return UserSchema
        if (type === "products") return ProductSchema
        if (type === "categories") return CategorySchema
        return yup.object().shape({}) // Схема по умолчанию
    }

    const validationSchema = getValidationSchema()

    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            defaultValues: activeEditableContent,
            resolver: yupResolver(validationSchema)
        })

    const dispatch = useDispatch()

    const handleClickCancel = () => {
        dispatch(actionShowModalAdmin(false))
    }

    const handleClickFetch = async (data) => {

        setLoading(true)

        if (method == "POST") {
            await postAdminData(type, data).then(loaded => {
                const { error, data } = loaded
                dispatch(actionAdminData(data))
            }
            ).finally(() => setLoading(false))
        } else if (method == "PUT") {
            await putAdminData(type, { ...data, _id: activeEditableContent._id }).then(loaded => {
                const { error, data } = loaded
                dispatch(actionAdminData(data))
            }).finally(() => setLoading(false))
        }

        dispatch(actionShowModalAdmin(false))
    }

    return (
        <div className={className}>
            {loading ? <Loader /> :
                <form className="modal" onSubmit={handleSubmit(handleClickFetch)}>
                    <h2>{type}</h2>
                    <div className="items">
                        {Object.keys(activeEditableContent).map((keys, index) => (
                            <div className="block-label-input" key={index}>
                                {keys == "role"
                                    ?
                                    <>
                                        <label>{keys}</label>
                                        <select {...register("role")}>
                                            <option value="0">Admin</option>
                                            <option value="1">Moderator</option>
                                            <option value="2">Guest</option>
                                        </select>
                                    </>
                                    : keys == "category" ? <>
                                        <label>{keys}</label>
                                        <select {...register("category")}>
                                            <option value="69ee4ec7ecbf13178cad6a16">Одежда</option>
                                            <option value="69ee52e82c30ec2a57cdee76">Электроника</option>
                                            <option value="69ee530d2c30ec2a57cdee77">Недвижимость</option>
                                            <option value="69ee531a2c30ec2a57cdee78">Авто</option>
                                        </select>
                                    </> : keys == "_id" || keys == "createdAt" || keys == "updatedAt" ? <>
                                        <label>{keys}</label>
                                        <input disabled type="text" {...register(keys)} />
                                    </> : keys == "__v" ? <>
                                    </> : <>
                                        <label>{keys}</label>
                                        <input type="text" {...register(keys)} />
                                    </>}
                                {errors[keys] && <ErrorMessage errorMessage={errors[keys].message} />}
                            </div>

                        ))}
                    </div>

                    <div className="block-btn">
                        <button type="button" onClick={handleClickCancel}>Отмена</button>
                        <button type="submit">Сохранить</button>
                    </div>
                </form>
            }
        </div>
    )
}

export const ModalAdminEntity = styled(ModalAdminEntityContainer)`
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
`