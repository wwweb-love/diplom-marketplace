export const actionCategories = (categories) => {
    return {
        type: "SET_CATEGORIES",
        payload: [{ id: "", name: "Все категории"}, ...categories]
    }
} 