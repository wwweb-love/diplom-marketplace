import styled from "styled-components"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate, useLocation } from "react-router"
import { ErrorMessage } from "../ErrorMessage/ErrorMessage"
import { getBasket, postAuth, postRegistr } from "../../api"
import { useDispatch, useSelector } from "react-redux"
import { actionBasket, actionGlobalError, actionUser } from "../../actions"
import { useState } from "react"
import { selectorUser } from "../../selectors"


const AuthRegisterContainer = ({ className, htmlInfo, formHook }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { formTitle, btnTitle, pageToOtherForm, linkTitle } = htmlInfo

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = formHook

    const onSubmit = async (data) => {

        setIsLoading(true)
        let user = ""

        if (location.pathname == "/registration") {
            await postRegistr(data).then(async (loaded) => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    setIsLoading(false)
                    navigate("/errors")
                } else {
                    dispatch(actionUser(data))
                    localStorage.setItem("user", JSON.stringify(data));

                    await getBasket(data._id).then(loaded => {
                        const { error, data } = loaded
                        setIsLoading(true)
                        if (error) {
                            dispatch(actionGlobalError(error))
                            setIsLoading(false)
                            navigate("/errors")
                        } else {
                            dispatch(actionBasket(data))
                            setIsLoading(false)
                        }
                    })

                    setIsLoading(false)
                    navigate('/')
                }
            })
        } else {
            await postAuth(data).then(async (loaded) => {
                const { error, data } = loaded
                if (error) {
                    dispatch(actionGlobalError(error))
                    setIsLoading(false)
                    navigate("/errors")
                } else {
                    dispatch(actionUser(data))
                    localStorage.setItem("user", JSON.stringify(data));

                    await getBasket(data._id).then(loaded => {
                        const { error, data } = loaded
                        setIsLoading(true)
                        if (error) {
                            dispatch(actionGlobalError(error))
                            setIsLoading(false)
                            navigate("/errors")
                        } else {
                            dispatch(actionBasket(data))
                            setIsLoading(false)
                        }
                    })

                    setIsLoading(false)
                    navigate("/")
                }
            })
        }




    }

    return (
        <div className={className}>
            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <p className="form-title">{formTitle}</p>

                {location.pathname == "/registration" && <div className="block-label-inp">
                    <label>Имя</label>
                    <input type="text" {...register("name")} />
                    {errors.name && <ErrorMessage errorMessage={errors.name.message} />}
                </div>}


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
                    <button type="submit">{btnTitle}</button>
                    <p onClick={() => navigate(`/${pageToOtherForm}`)} className="link-redirect">{linkTitle}</p>
                </div>
            </form>
        </div>
    )
}

export const AuthRegister = styled(AuthRegisterContainer)`

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