const initialStateProduct = {
    selectedProduct: {},
    statusProductOnBasket: false,
    globalError: "",
    user: null,
    adminData: null,
    showModalAdmin: false,
    activeEditableContent: null,
    priceFind: "more", // cheaper
}

export const all = (state = initialStateProduct, action) => {
    switch (action.type) {
        case "SET_GLOBAL_ERROR": {
            return {
                ...state,
                globalError: action.payload
            }
        }

        // ---------------------


        case "CREATE_PRODUCT": {
            return {
                ...state,
                selectedProduct: action.payload
            }
        }



        case "SET_USER": {
            return {
                ...state,
                user: action.payload
            }
        }


        case "SET_SHOW_MODAL_ADMIN": {
            return {
                ...state,
                showModalAdmin: action.payload
            }
        }

        case "SET_ACTIVE_EDITABLE_CONTENT": {
            return {
                ...state,
                activeEditableContent: action.payload
            }
        }

        case "SET_PRICE_FIND": {
            return  {
                ...state,
                priceFind: action.payload
            }
        }

        default: 
            return state
    }
}