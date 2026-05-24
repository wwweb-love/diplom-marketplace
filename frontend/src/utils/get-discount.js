export const getDiscount = (priceResult, priceDiscountResult) => {
    const discount = 100 - (priceDiscountResult / (priceResult / 100)) 
    return Math.floor(discount * 100) / 100
}