import server from "../constants"

export const postProductOnBasket = (userId, productId) => (
    fetch(`http://${server.ip}:${server.port}/basket/products`, {
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