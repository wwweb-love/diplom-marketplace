const CategoryModel = require("../models/Category")

const getCategories = async () => {
    const categories = await CategoryModel.find()
    return categories
}

const getCategory = async (id) => {
    const category = await CategoryModel.findOne({ _id: id })
    return category
}

const createCategory = async (title, name) => {
    const category = await CategoryModel.create({ title, name })
    const categories = await getCategories()
    return { category, categories }
}

const updateCategory = async (id, title, name) => {
    const category = await CategoryModel.findByIdAndUpdate({ _id: id }, { title, name })
    const categories = await getCategories()
    return { category, categories }
}

const deleteCategory = async (id) => {
    const category = await CategoryModel.findByIdAndDelete({ _id: id })
    const categories = await getCategories()
    return { category, categories }
}

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory }