import styled from "styled-components"

const ErrorMessageContainer = ({ className, errorMessage }) => {

    return (
        <span className={className}>{errorMessage}</span>
    )
}

export const ErrorMessage = styled(ErrorMessageContainer)`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    margin-left: 10px;
`