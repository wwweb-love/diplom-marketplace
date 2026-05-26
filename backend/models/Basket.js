const mongoose = require("mongoose")

const BasketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },

            selected_count: {
                type: Number,
                min: 1,
                default: 1
            }
        },
    ]
}, { timestamps: true })

const Basket = mongoose.model("Basket", BasketSchema)
module.exports = Basket