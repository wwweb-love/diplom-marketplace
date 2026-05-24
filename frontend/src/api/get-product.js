export const getProduct = (id) => (
    fetch(`http://localhost:3000/product/${id}`, {credentials: 'include'}).then(loaded => loaded.json())
)