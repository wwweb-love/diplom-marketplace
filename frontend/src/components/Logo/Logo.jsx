import styled from "styled-components"
import LogoSVG from "../../assets/svg/logo.svg?react"
import { useNavigate } from "react-router"

const LogoContainer = ({ className }) => {
    const navigate = useNavigate()
    return (
        <div className={className} onClick={() => navigate("/")}>
            <LogoSVG />
        </div>
    )
}

export const Logo = styled(LogoContainer)`
    cursor: pointer;
    display: flex;
    align-items: center;
`