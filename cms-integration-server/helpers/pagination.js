function getPagination(page, size) {
    const limit = size;
    const offset = +page < 1 ? 0 : (+page - 1) * limit;

    return { limit, offset };
}

function getPagingData(data, page, limit) {
    const { count: totalItems, rows: products } = data;
    const currentPage = +page < 1 ? 1 : +page;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, totalPages, currentPage, products };
}

module.exports = { getPagination, getPagingData };
