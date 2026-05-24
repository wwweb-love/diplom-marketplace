export const getCountProducts = () => (
    fetch("http://localhost:3000/count_products", {credentials: 'include'}).then(loaded => loaded.json())
)