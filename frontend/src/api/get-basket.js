export const getBasket = () => (
    fetch(`http://localhost:3000/basket`, { credentials: 'include' }).then(loaded => loaded.json())
)