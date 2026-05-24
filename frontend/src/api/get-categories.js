export const getCategories = () => (
    fetch("http://localhost:3000/categories", {credentials: 'include'}).then(loaded => loaded.json())
)