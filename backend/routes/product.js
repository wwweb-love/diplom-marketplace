const express = require('express')
const router = express.Router({ mergeParams: true })

const authenticated = require("../middlewares/authenticated")

const { getProduct } = require("../controllers/Product")

const { sanitizerProduct } = require("../sanitizers/product/product")

// Полная информация о выбранном продукте
// Возвращает информацию о продукте для редактирования
router.get("/:id", authenticated, async (req, res) => {
    try {
        const { id } = req.params
        const productController = await getProduct(id)
        const productSanitizer = await sanitizerProduct(productController)
        res.send({ error: null, data: productSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router