export const getBasket = (userId) => (
    fetch(`http://localhost:3000/basket/${userId}`, {credentials: 'include'}).then(loaded => loaded.json())
)