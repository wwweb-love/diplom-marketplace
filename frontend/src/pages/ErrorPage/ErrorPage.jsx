import { useSelector } from "react-redux"
import styled from "styled-components"
import { selectorGlobalError } from "../../selectors"
import SadErrorsSVG from "../../assets/svg/sad-errors.svg?react"
import { ErrorMessage } from "../../components"
import { useNavigate } from "react-router"

const ErrorPageContainer = ({ className }) => {
    const navigate = useNavigate()
    const globalError = useSelector(selectorGlobalError)

    return (
        <div className={className}>
            <SadErrorsSVG />
            <div className="info">
                <h2>Ошибка</h2>
                <p>Проблемы на сервере. <span className="underline">Повторите попытку позже</span></p>
                <p>Сообщение от сервера: <ErrorMessage errorMessage={globalError} /></p>
                <button onClick={() => navigate("/")}>Перейти на главную страницу</button>
            </div>
        </div>
    )
}

export const ErrorPage = styled(ErrorPageContainer)`

    width: 100%;
    height: 80vh;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 200px;
        height: 300px;
    }

    .info {
        width: 500px;
        height: 200px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        gap: 20px;
    }

    .underline {
        text-decoration: underline;
    }

    button {
        display: flex;
        align-self: start;
        justify-self: start;
        padding: 10px 15px;
        font-size: 16px;
        background-color: #005bff;
        color: #fff;
        border: 0;
        border-radius: 15px;
        cursor: pointer;
    }
        
`