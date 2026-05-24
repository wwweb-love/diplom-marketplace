export const sanitaizeProduct = (product) => ({
    "title": product.title,
    "price": product.price,
    "image_url": product.image_url,
    "count": product.count,
    "category": product.category.title,
    "discount": product.discount
})