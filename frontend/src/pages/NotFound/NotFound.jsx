// package
import styled from "styled-components"
// svg
import NotFoundSVG from "../../assets/svg/not-found.svg?react"

const NotFoundContainer = ({ className }) => {
    return (
        <div className={className}>
            <NotFoundSVG />
            <h2>Упс.. Ничего не найдено. Попробуйте перейти на другую страницу!</h2>
        </div>
    )
}

export const NotFound = styled(NotFoundContainer)`
    width: 100%;
    height: 80vh;
    display: flex;
    gap: 20px;
    
    align-items: center;
    justify-content: center;

    h2 {
        width: 500px;
    }
    svg {
        width: 200px;
        height: 200px;
    }
        
`