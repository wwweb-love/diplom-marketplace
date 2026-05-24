export const putSelectedCountProductOnBasket = (userId, productId, selected_count) => (
    fetch(`http://localhost:3000/basket/${userId}/${productId}/selected_count`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            selected_count: selected_count
        })
    }).then(loaded => loaded.json())
)