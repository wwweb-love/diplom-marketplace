export const postProductOnBasket = (userId, productId) => (
    fetch(`http://localhost:3000/basket/products`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                selected_count: 1
            })
        }).then(loaded => loaded.json())
)