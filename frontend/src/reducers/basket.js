const initialStateBasket = {
    basket: "" // данные корзины с сервера
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

        default: 
            return state
    }
}