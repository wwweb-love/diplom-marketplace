export const postProduct = (product) => (
    fetch("http://localhost:3000/product", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(product)
    }).then(loaded => loaded.json()).then(loaded => console.log(loaded))
    
)
