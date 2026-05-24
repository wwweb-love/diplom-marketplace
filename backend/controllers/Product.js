const ProductModel = require("../models/Product")
const CategoryModel = require("../models/Category")
const helperQuery = require("../helpers/query")
const helperSort = require("../helpers/sort")

const getProductsFilter = async (textSearch, page, pageLimit, price, category, sort) => {
    const query = helperQuery(textSearch, price, category)
    const sortResult = helperSort(sort)

    const [products, count] = await Promise.all([
        ProductModel.find(query)
            .populate({ path: "category" })
            .sort(sortResult)
            .skip((page - 1) * pageLimit)
            .limit(pageLimit),
        ProductModel.countDocuments(query)
    ]);

    return { products, count }
}

const getProducts = async (textSearch="", page=0, pageLimit=0, price="", category="") => {
    const products = await ProductModel
    .find({ title: { $regex: textSearch, $options: "i" } })
    .populate({ path: "category" })
    return products
}

const getProduct = async (id) => {
    const product = await ProductModel.findOne({ _id: id }).populate({ path: "category" })
    return product
}

const createProduct = async (title, price, discount, image, count, category) => {
    const createdProduct = await ProductModel.create({ title, price, discount, image, count, category })
    const product = await createdProduct.populate({ path: "category" })
    const products = await getProducts()
    return { product, products }
}

const updateProduct = async (id, title, price, discount, image, count, category) => {
    const updatedProduct = await ProductModel.findByIdAndUpdate({ _id: id }, { title, price, discount, image, count, category })
    const product = await updatedProduct.populate({ path: "category" })
    const products = await getProducts()
    return { product, products }
}

const deleteProduct = async (id) => {
    const deletedProduct = await ProductModel.findByIdAndDelete({ _id: id })
    const product = await deletedProduct.populate({ path: "category" })
    const products = await getProducts()
    return { product, products }
}

module.exports = { getProductsFilter, getProducts, getProduct, createProduct, updateProduct, deleteProduct }