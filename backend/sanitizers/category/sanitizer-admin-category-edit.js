const sanitizerAdminCategoryEdit = (category) => ({
    name: category.name,
    title: category.title
})

module.exports = { sanitizerAdminCategoryEdit }