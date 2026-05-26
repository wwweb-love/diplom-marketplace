const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares
const authenticated = require("../middlewares/authenticated")

// controllers
const { getBasket, createBasket, addProductOnBasket, deleteProductOnBasket, putSelectedCountProductOnBasket } = require("../controllers/Basket")

// sanitizers
const { sanitizerBasket } = require('../sanitizers/basket/sanitizer-basket')
const { sanitizerBasketOnProducts } = require("../sanitizers/product/sanitizer-basket-on-products")

// Get Basket on User
router.get("/", authenticated ,async (req, res) => {
    try {
        const id = req.user.id
        const basketController = await getBasket(id)
        const basketSanitizer = sanitizerBasket(basketController)

        res.send({ error: null, data: basketSanitizer })
    } catch(error) {

        res.send({ error: error.message, data: null })
    }
})

// create Basket on User
router.post("/", (req, res) => {
    try {
        const { user, products } = req.body

        const basketController = createBasket(user, products)

        res.send({ error: null, data: basketController })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})

// add Product on Basket
router.post("/products", async (req, res) => {
    try {
        const { userId, productId, selected_count } = req.body
        
        const basketController = await addProductOnBasket(userId, productId, selected_count)
        const basketSanitizer = sanitizerBasket(basketController)
        res.send({ error: null, data: basketSanitizer })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})

// delete Product on Basket
router.delete("/products", async (req, res) => {
    try {
        const { userId, productId } = req.body
        
        const basketController = await deleteProductOnBasket(userId, productId)
        const basketSanitizer = sanitizerBasket(basketController)
        res.send({ error: null, data: basketSanitizer })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})


router.put("/selected_count", authenticated, async (req, res) => {
    try {
        const userId = req.user.id
        const { productId, selected_count } = req.body
        const basketController = await putSelectedCountProductOnBasket(userId, productId, selected_count)
        const basketSanitizer = sanitizerBasket(basketController)
        res.send({ error: null, data: basketSanitizer })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

router.delete("/products", authenticated, async (req, res) => {
    try {

        res.send({ error: null, data: null })
    } catch (error) {
        res.send({ error: error.message, data: null })
    }
})

module.exports = router