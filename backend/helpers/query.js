module.exports = (textSearch, price, category) => {
    const query = {};

    if (textSearch) {
        query.title = { $regex: textSearch, $options: "i" };
    }

    if (category) {
        query.category = category;
    }

    if (price) {
        query.price = { $gte: price.min, $lte: price.max };
    }

    return query;
};