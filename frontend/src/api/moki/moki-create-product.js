export const mokiCreateProduct = () => (
    fetch("/api/product", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify({
            title: "Брюки классические",
            price: 763,
            image_url: "https://ir.ozone.ru/s3/multimedia-1-s/wc1000/7267442680.jpg",
            count: 22,
            categoryId: 3,
            discount: 20
        })
    }).then(loaded => loaded.json()).then(loaded => console.log(loaded))
)