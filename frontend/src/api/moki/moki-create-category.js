export const mokiCreateCategory = () => (
    fetch("/api/category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            category_id: 0,
            title: "clothes",
            name: "Одежда"
        })

    }).then(loaded => loaded.json()).then(loaded => console.log(loaded))
)