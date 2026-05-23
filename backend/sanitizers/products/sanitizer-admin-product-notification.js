const sanitizerAdminProductNotification = (product) => ({
    title: product.title,
    category: product.category.name
})

module.exports = { sanitizerAdminProductNotification }