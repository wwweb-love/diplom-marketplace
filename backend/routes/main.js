const express = require('express')
const router = express.Router({ mergeParams: true })

const { getProductsFilter } = require("../controllers/Product")
const { sanitizerProducts } = require("../sanitizers/main/products/sanitizer-products")

router.get("/products", async (req, res) => {
    try {
        const { textSearch, page, pageLimit, price, category, sort } = req.query
        
        const productsController = await getProductsFilter(textSearch, page, pageLimit, price, category, sort)
        const prodcuctsSanitizer = await sanitizerProducts(productsController)

        res.send({ error: null, data: prodcuctsSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router

// fetch 
// http://localhost:3000/products?textSearch&page=1&pageLimit&price&category=6a11e874e9e39217562455c7&sort