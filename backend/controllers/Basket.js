const BasketModel = require("../models/Basket")
const User = require("../models/User")

const getBasket = async (userId) => {
    const basket = await BasketModel.findOne({ user: userId }).populate({ path: "products.product", populate: { path: "category" } })
    return basket
}

const createBasket = async (user) => {
    const basket = await BasketModel.create({ user, products: [] })
    return basket
}

const addProductOnBasket = async (userId, productId, selected_count) => {
    await BasketModel.updateOne(
        { user: userId },
        { $push: { products: { product: productId, selected_count } } }
    );
    const basket = await getBasket(userId)

    return basket
}

const deleteProductOnBasket = async (userId, productId) => {
    await BasketModel.updateOne(
        { user: userId },
        { $pull: { products: { product: productId } } }
    );

    const basket = await getBasket(userId)
    return basket
}

const putSelectedCountProductOnBasket = async (userId, productId, selected_count) => {
    const basketUpdate = await BasketModel.updateOne(
        {
            user: userId,
            'products.product': productId
        },
        {
            $set: { 'products.$.selected_count': Number(selected_count) }
        }
    );
    const basket = await getBasket(userId)
    return basket
}


module.exports = { getBasket, createBasket, addProductOnBasket, deleteProductOnBasket, putSelectedCountProductOnBasket }