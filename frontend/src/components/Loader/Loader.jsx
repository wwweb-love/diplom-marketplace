import styled, { keyframes } from "styled-components"

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const LoaderContainer = ({ className }) => {
    return (
        <div className={className}>
        </div>
    )
}

export const Loader = styled(LoaderContainer)`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 6px solid black;
        border-right: 6px solid transparent; 
        border-radius: 50%;
        margin-top: 40px;
        animation: ${spin} 1s linear infinite;
`