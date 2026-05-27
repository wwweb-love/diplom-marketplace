// package
import styled from "styled-components"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState } from "react"
import { useDispatch } from "react-redux"
// components
import { ErrorMessage } from "../../components"
// actions
import { actionUser } from "../../actions"

const AuthSchema = yup.object().shape({
    login: yup
        .string()
        .required("Заполните логин")
        .matches(/^\w+$/, "Неверный логин. Допускаются буквы и цифры")
        .min(3, "Неверный логин. Допускается минимум 3 символа")
        .max(20, "Неверный логин. Допускается максимум 20 символов"),
    password: yup
        .string()
        .required("Заполните пароль")
        .matches(/^\w+$/, "Неверный пароль. Допускаются буквы и цифры")
        .min(3, "Неверный пароль. Допускается минимум 3 символа")
        .max(20, "Неверный пароль. Допускается максимум 20 символов")
})

const LoginContainer = ({ className }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errorServer, setErrorServer] = useState(null)
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            login: "",
            password: ""
        },
        resolver: yupResolver(AuthSchema)
    })

    const onSubmit = async (data) => {
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },

            body: JSON.stringify(data)
        }).then(loaded => loaded.json()).then(loaded => {
            const { error, data } = loaded

            if (error) {
                setErrorServer(error)
            } else {
                dispatch(actionUser(data))
                navigate("/")
            }
        })
    }

    return (
        <div className={className}>


            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">Авторизация</p>
                <div className="block-label-inp">
                    <label>Логин</label>
                    <input type="text" {...register("login")} />
                    {errors.login && <ErrorMessage errorMessage={errors.login.message} />}
                </div>

                <div className="block-label-inp">
                    <label>Пароль</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <ErrorMessage errorMessage={errors.password.message} />}
                </div>

                <div className="block-action">
                    <button type="submit">Войти</button>
                    <p onClick={() => navigate(`/registration`)} className="link-redirect">Регистрация</p>
                </div>

                {errorServer && <ErrorMessage errorMessage={errorServer} />}
            </form>
        </div>
    )

}

export const Login = styled(LoginContainer)`
        width: 100%;
    height: 80vh;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    form {
        border-radius: 20px;
        padding: 20px 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px; 
        width: 450px;
        height: auto;
        background-color: white;
    }

    .form-title {
        font-size: 22px;
    }

    .block-label-inp {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    label {
        font-size: 18px;
        font-weight: 600;
    }
        
    input {
        margin: 0px 10px;
        font-size: 16px;
        padding: 5px 17px;
        border-radius: 10px;
        border: 2px solid silver;
    }

    input:focus {
        outline: 0;
        border: 2px solid white;
        box-shadow: 1px 1px 10px #005bff;
    }

    .block-action {
        padding: 0 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }

    button {
        width: 100%;
        background-color: #005bff;
        color: #fff;
        font-size: 18px;
        padding: 5px;
        border: 0;
        border-radius: 50px;
        cursor: pointer;
    }

    .link-redirect {
        text-decoration: underline;
        cursor: pointer;
    }
`