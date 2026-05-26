const initialStateAll = {
    globalError: "", // сообщение с глобальной ошибкой от сервера 
}

export const all = (state = initialStateAll, action) => {
    switch (action.type) {

        // casses
        case "SET_GLOBAL_ERROR": {
            return {
                ...state,
                globalError: action.payload
            }
        }

        default: 
            return state
    }
}