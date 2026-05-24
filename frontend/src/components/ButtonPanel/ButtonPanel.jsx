import styled from "styled-components"

const ButtonPanelContainer = ({ className, icon, children, onClick }) => {
    return (
        <button className={className} onClick={onClick}>
            {icon}
            {children}
        </button>
    )
}

export const ButtonPanel = styled(ButtonPanelContainer)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
`