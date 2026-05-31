import {server} from "../constants"

export const deleteProductOnBasket = (userId, productId) => (
    fetch(`http://${server.ip}:${server.port}/basket/products`, {
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