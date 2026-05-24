export const postBasket = (basket, userId) => (
    fetch(`http://localhost:3000/basket/${userId}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(userId, basket)
    }).then(loaded => loaded.json())
)