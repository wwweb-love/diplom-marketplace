const sanitizerAdminCategories = (categories) => {
    return categories.map(category => ({
        id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    }))
}

module.exports = { sanitizerAdminCategories }