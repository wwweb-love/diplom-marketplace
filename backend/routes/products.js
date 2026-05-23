const express = require('express')
const router = express.Router({ mergeParams: true })

const { getProducts } = require("../controllers/Product")
const { sanitizerProducts } = require("../sanitizers/sanitizer-products")

router.get("/", async (req, res) => {
    try {
        const { textSearch, page, pageLimit, price, category } = req.query
        
        const productsController = await getProducts(textSearch, page, pageLimit, price, category)
        const prodcuctsSanitizer = await sanitizerProducts(productsController)

        res.send({ error: null, data: prodcuctsSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router

// fetch 
// http://localhost:3000/products?textSearch&page&pageLimit&price&category