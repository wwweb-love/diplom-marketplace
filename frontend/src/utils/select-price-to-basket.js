import { discountCalculation } from "./discount-calculation"

export const selectPriceToBasket = (products) => {
    let priceResult = 0
    let priceDiscountResult = 0
    
    products.map((product) => {
        let price = product.product.price
        let discount = product.product.discount
        let selected_count = product.selected_count

        priceResult += (price * selected_count)
        priceDiscountResult += (discountCalculation(price, discount) * selected_count)
    })

    return { priceResult, priceDiscountResult }
}