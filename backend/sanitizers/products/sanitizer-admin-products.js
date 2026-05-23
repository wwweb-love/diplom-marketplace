const sanitizerAdminProducts = (products) => {
    return products.map(product => ({
        id: product._id,
        title: product.title,
        category: product.category.name,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
    }))
}

module.exports = { sanitizerAdminProducts }