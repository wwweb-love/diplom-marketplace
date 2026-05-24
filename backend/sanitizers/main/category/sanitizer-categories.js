const sanitizerCategories = (categories) => {
    return categories.map(category => ({
        id: category._id,
        name: category.name,
    }))
}

module.exports = { sanitizerCategories }