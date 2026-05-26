const initialStateProduct = {
    product: "" // данные продукта с сервера
}

export const product = (state = initialStateProduct, action) => {
    switch (action.type) {
        // cases

        case "SET_PRODUCT": {
            return {
                ...state,
                product: action.payload
            }
        }

        default: 
            return state
    }
}