const express = require('express')
const router = express.Router({ mergeParams: true })

// middlewares

// controllers
const { getBasket, createBasket, addProductOnBasket } = require("../controllers/Basket")

// sanitizers

// Get Basket on User
router.get("/user/:id", (req, res) => {
    try {
        const { id } = req.params

        const basketController = getBasket(id)
        // const basketSanitizer = 
        
        

        res.send({ error: null, data: basketController })
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
        const { userId, product, selected_count } = req.body
        console.log(userId, product, selected_count)

        const basket = await addProductOnBasket(userId, product, selected_count)
        res.send({ error: error.message, data: basket })
    } catch(error) {
        res.send({ error: error.message, data: null })
    }
})


module.exports = router