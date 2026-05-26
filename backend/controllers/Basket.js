const BasketModel = require("../models/Basket")
const User = require("../models/User")

const getBasket = async (userId) => {
    const basket = await BasketModel.find({ user: userId })
    return basket
}

const createBasket = async (user, products) => {
    const basket = await BasketModel.create({ user, products })
    return basket
}

const addProductOnBasket = async (userId, product, selected_count) => {
    console.log(userId, product, selected_count)
    await BasketModel.updateOne(
        { user: userId },
        { $push: { products: {product, selected_count} } }
    );
    const basket = await getBasket(userId)
    console.log(basket)
        
    return basket
}

// const updateBasket = async (userId, user, products) => {
//     const basket = await BasketModel.findByIdAndUpdate({user: userId}, { user, products })
//     const roles = await getRoles()
//     return { role, roles }
// }

// const deleteRole = async (id) => {
//     const role = await RoleModel.findByIdAndDelete({ _id: id })
//     const roles = await getRoles()
//     return { role, roles } 
// }

module.exports = { getBasket, createBasket, addProductOnBasket }