const sanitizerProduct = (product) => ({
        id: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        count: product.count,
        category: product.category.name
    })

module.exports = { sanitizerProduct }