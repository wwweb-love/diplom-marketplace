const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares
const authenticated = require("../middlewares/authenticated")

// controllers
const { getProduct } = require("../controllers/Product")
const { getBasket } = require("../controllers/Basket")

// sanitizers
const { sanitizerProduct } = require("../sanitizers/product/sanitizer-product")
const { sanitizerBasketOnProducts } = require("../sanitizers/product/sanitizer-basket-on-products")
const { sanitizerBasket } = require('../sanitizers/basket/sanitizer-basket')

// Полная информация о выбранном продукте
// Возвращает информацию о продукте для редактирования
router.get("/:id", authenticated, async (req, res) => {
    try {
        const { id } = req.params
        const productController = await getProduct(id)
        const productSanitizer = await sanitizerProduct(productController)

        const basketController = await getBasket(req.user.id)
        const basketSanitizer = await sanitizerBasket(basketController)

        res.send({ error: null, data: { product: productSanitizer, basket: basketSanitizer }})
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router