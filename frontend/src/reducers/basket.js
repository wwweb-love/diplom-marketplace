const initialStateBasket = {
    basket: "",
    basketProducts: []
}

export const basket = (state = initialStateBasket, action) => {
    switch (action.type) {
        // cases

        case "SET_BASKET": {
            return {
                ...state,
                basket: action.payload
            }
        }

        case "SET_BASKET_PRODUCTS": {
            return {
                ...state,
                basketProducts: action.payload
            }
        }

        default: 
            return state
    }
}