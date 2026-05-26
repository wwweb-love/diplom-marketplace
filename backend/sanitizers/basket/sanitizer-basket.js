const sanitizerBasket = (basket) => ({
    id: basket._id,
    user: basket.user,
    products: basket.products.map(product => {
        return {
            id: product._id,
            selected_count: product.selected_count,
            product: {
                id: product.product._id,
                title: product.product.title,
                category: product.product.category.name,
                price: product.product.price,
                discount: product.product.discount,
                count: product.product.count,
                image: product.product.image
            }
        }

    })
})

module.exports = { sanitizerBasket }