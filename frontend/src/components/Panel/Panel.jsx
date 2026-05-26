import styled from "styled-components"
import { ButtonPanel } from "../ButtonPanel/ButtonPanel"
import LoginSVG from "../../assets/svg/login.svg?react"
import BasketSVG from "../../assets/svg/basket.svg?react"
import LogoutSVG from "../../assets/svg/logout.svg?react"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { selectorUser } from "../../selectors"
import { actionGlobalError, actionUser } from "../../actions"

const PanelContainer = ({ className }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const user = useSelector(selectorUser)

    const handleClickLogout = () => {
        fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({})
        }).then(loaded => loaded.json()).then(loaded => dispatch(actionUser("")))
    }

    const handleClickBasket = () => {
        if (user) {
            navigate(`/basket/user/${user.id}`)
        } else {
            dispatch(actionGlobalError("Пользователь на авторизован. Авторизуйтесь!"))
            navigate("/errors")
        }
    }

    return (
        <div className={className}>
            {user ? <div className="block-logout">
                <p className="user-name">{user.name}</p>
                <ButtonPanel onClick={handleClickLogout} icon={<LogoutSVG />} >Выйти</ButtonPanel>
            </div> :
                <div className="block-login">
                    <p className="user-name">Гость</p>
                    <ButtonPanel onClick={() => navigate("/login")} icon={<LoginSVG />}>Войти</ButtonPanel>
                </div>}
            <ButtonPanel onClick={handleClickBasket} icon={<BasketSVG />}>Корзина</ButtonPanel>
        </div>
    )
}

export const Panel = styled(PanelContainer)`
    display: flex;
    gap: 20px;

    .block-logout {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .block-login {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .user-name {
        font-weight: 600;
    }
`