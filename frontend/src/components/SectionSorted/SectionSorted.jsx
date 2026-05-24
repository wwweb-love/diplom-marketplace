import styled from "styled-components"
import { SORT } from "../../constants"
import { useDispatch, useSelector } from "react-redux"
import { selectorSelectedSort } from "../../selectors"
import { actionSelectedSort } from "../../actions"

const SectionSortedContainer = ({ className }) => {
    const dispatch = useDispatch()

    const selectedSort = useSelector(selectorSelectedSort)

    const handleSortChange = ({ target }) => {
        dispatch(actionSelectedSort(target.value))
    }

    return (
        <div className={className}>
            <h2>Сортировка</h2>
            <select className="block-sort" value={selectedSort} onChange={handleSortChange} >
                {SORT.map((sortItem, index) => <option key={index} value={sortItem.id}>{sortItem.name}</option>)}
            </select>
        </div>
    )
}

export const SectionSorted = styled(SectionSortedContainer)`
    display: flex;
    align-items: center;
    gap: 20px;
    align-self: start;

    .block-option {
        cursor: pointer;
        background-color: #fff;
        padding: 10px 20px;
        border-radius: 15px;
    }

    .block-option:hover {
        opacity: 0.5;
    }

    .active {
        border: 2px solid #005bff;
    }

    .block-sort {
        width: 100%;
        padding: 5px 10px;
        font-size: 16px;
    }
`