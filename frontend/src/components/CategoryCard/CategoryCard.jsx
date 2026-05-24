import styled from "styled-components"

const CategoryCardContainer = ({ className }) => {
    return (
        <div className={className}>
            <input 
                className="checkbox" 
                type="checkbox"
            />
            <p className="category">Категория</p>
        </div>
    )
}

export const CategoryCard = styled(CategoryCardContainer)`
    display: flex;
    gap: 7px;

    .checkbox {
        cursor: pointer;
    }
`