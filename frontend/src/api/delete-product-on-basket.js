
export const deleteProductOnBasket = (userId, productId) => (
    fetch(`http://localhost:3000/basket/products`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            userId: userId,
            productId: productId
        })
    }).then(loaded => loaded.json())
)