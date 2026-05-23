module.exports = (sort) => {
    let sortQuery = {};

    switch (sort) {
        case "price_asc":
            sortQuery.price = 1;
            break;
        case "price_desc":
            sortQuery.price = -1;
            break;
        case "date_new":
            sortQuery.createdAt = -1;
            break;
        case "date_old":
            sortQuery.createdAt = 1;
            break;
        default:
            sortQuery = {}; // без сортировки
    }

    return sortQuery
}