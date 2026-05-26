const sanitizerBasketOnProducts = (basket) => ([...basket.products.map(product => product.product)])

module.exports = { sanitizerBasketOnProducts }