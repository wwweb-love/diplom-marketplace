import styled from "styled-components"
import { Logo } from "../Logo/Logo"
import { Panel } from "../Panel/Panel"

const HeaderContainer = ({ className }) => {
    return (
        <div className={className}>
            <Logo />            
            <Panel />
        </div>
    )
}

export const Header = styled(HeaderContainer)`
    position: fixed;
    z-index: 20;
    padding: 10px 20px;
    border-radius: 0 0 10px 10px; 
    width: 70%;    
    header: 65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
`