const initialStateProducts = {
    categories: [], // все категории с БД
    selectedCategory: "", // выьранная категория для фильтра
    products: [], // все продукты с БД
    countProducts: 0, // количество продуктов с применением фильтра
    selectedSort: "", // выбранный метод сортировки 
    textSearch: "", // поисковое слово 
    page: 1, // страница
    pageLimit: 5, // лимит продуктов на страницу
}

export const products = (state = initialStateProducts, action) => {
    switch (action.type) {
        // cases
        case "SET_CATEGORIES": {
            return {
                ...state,
                categories: action.payload
            }
        }

        case "SET_SELECTED_CATEGORY": {
            return {
                ...state,
                selectedCategory: action.payload
            }
        }

        case "SET_PRODUCTS": {
            return {
                ...state,
                products: action.payload
            }
        }

        case "SET_COUNT_PRODUCTS": {
            return {
                ...state,
                countProducts: action.payload
            }
        }

        case "SET_SELECTED_SORT": {
            return {
                ...state,
                selectedSort: action.payload
            }
        }

        case "SET_TEXT_SEARCH": {
            return {
                ...state,
                textSearch: action.payload
            }
        }

        case "SET_PAGE": {
            return {
                ...state,
                page: action.payload
            }
        }

        case "SET_PAGE_LIMIT": {
            return {
                ...state,
                pageLimit: action.payload
            }
        }
        
        default: 
            return state
    }
}