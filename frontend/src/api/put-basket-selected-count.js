export const putBasketSelectedCount = (productId, selectedCount) => (
    fetch(`http://localhost:3000/basket/selected_count`, {
        method: "PUT",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            productId: productId,
            selected_count: selectedCount
        })
    }).then(loaded => loaded.json())
)
