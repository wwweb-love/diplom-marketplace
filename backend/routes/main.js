const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares
const authenticated = require("../middlewares/authenticated")

// controllers
const { getProductsFilter } = require("../controllers/Product")
const { getCategories } = require("../controllers/Category")

// sanitizers
const { sanitizerProducts } = require("../sanitizers/main/products/sanitizer-products")
const { sanitizerCategories } = require("../sanitizers/main/category/sanitizer-categories")

// Список продуктов 
// Возвращает по заданным query селекторам список, по поисковому слову, категории, цене, дате, странице
router.get("/products", async (req, res) => {
    try {
        const { textSearch, page, pageLimit, price, category, sort } = req.query
        const { products, count } = await getProductsFilter(textSearch, page, pageLimit, price, category, sort)
        const prodcuctsSanitizer = await sanitizerProducts(products)

        res.send({ error: null, data: { products: prodcuctsSanitizer, count } })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

// Список категорий
// Возвращает список категорий id, name для сортировки
router.get("/categories", async (req, res) => {
    try {
        const categoriesController = await getCategories()
        const categoriesSanitizer = await sanitizerCategories(categoriesController)
        res.send({ error: null, data: categoriesSanitizer })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router

// fetch 
// http://localhost:3000/products?textSearch&page=1&pageLimit&price&category=6a11e874e9e39217562455c7&sort