export const actionGlobalError = (error) => {
    return {
        type: "SET_GLOBAL_ERROR",
        payload: error
    }
} 