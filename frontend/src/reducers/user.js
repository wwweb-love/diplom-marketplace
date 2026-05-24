const initialStateUser = {
    user: ""
}

export const user = (state = initialStateUser, action) => {
    switch (action.type) {
        // cases
        case "SET_USER": {
            return {
                ...state,
                user: action.payload
            }
        }
        
        default: 
            return state
    }
}