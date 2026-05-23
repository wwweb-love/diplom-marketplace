const sanitizerAdminProductEdit = (product) => ({
    title: product.title,
    price: product.price,
    discount: product.discount,
    image: product.image,
    count: product.count,
    category: {
        id: product.category.id,
        name: product.category.name,
    }
})

module.exports = { sanitizerAdminProductEdit }