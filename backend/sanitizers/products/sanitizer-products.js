const sanitizerProducts = (products) => {
    return products.map(product => ({
        id: product._id,
        title: product.title,
        price: product.price,
        image: product.image
    }))
}

module.exports = { sanitizerProducts }