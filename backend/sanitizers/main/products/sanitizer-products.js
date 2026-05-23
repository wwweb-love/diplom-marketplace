const sanitizerProducts = (products) => {
    return products.map(product => ({
        id: product._id,
        title: product.title,
        image: product.image,
        price: product.price
    }))
}

module.exports = { sanitizerProducts }